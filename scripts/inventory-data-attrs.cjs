/**
 * inventory-data-attrs.cjs
 *
 * Cerca occorrenze di `data-*` nei sorgenti `js/`, `primitives/`,
 * `components/`, `stories/`, `demo-pages/` e produce una mappa di rename
 * (vedi audit 04-js-runtime-accessibility.md sezione "Tabella rename
 * data-* generici").
 *
 * Output: scripts/inventory-out/data-attrs.json
 *
 * NON modifica alcun file. E' read-only e idempotente: due esecuzioni
 * producono lo stesso JSON (eccetto `generatedAt`).
 *
 * Per ogni `data-*` distinto:
 *   {
 *     name: "data-...",
 *     files: ["..."],
 *     componentScoped: bool,        // inizia con il nome di un block
 *     thirdParty: bool,             // whitelist Feedaty in contesto widget
 *     demoOnly: bool,               // appare solo in demo-pages/
 *     owner: "<component>" | null,
 *     new: "data-..." | null,
 *     context: "..." | null,
 *     needsReview: bool             // ambiguo, da decidere a mano
 *   }
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(__dirname, 'inventory-out');
const OUT_FILE = path.join(OUT_DIR, 'data-attrs.json');

const SCAN_DIRS = ['js', 'primitives', 'components', 'stories', 'demo-pages'];
const SCAN_EXTS = new Set(['.js', '.cjs', '.mjs', '.ts', '.html', '.css']);

// Whitelist Feedaty: nomi attributo 3rd party.
// L'audit 04 elenca: data-id, data-ver, data-type, data-variant, data-lang,
// data-gui — ma SOLO in contesto Feedaty (file feedaty-widget.*).
const FEEDATY_ATTRS = new Set([
    'data-id',
    'data-ver',
    'data-type',
    'data-variant',
    'data-lang',
    'data-gui'
]);

// Tabella rename `data-*` generici -> component-scoped (audit 04).
// Per ambiguità (data-order-id) impostiamo needsReview e lasciamo new=null.
const RENAME_TABLE = [
    {
        old: 'data-action',
        owner: 'orders-table',
        new: 'data-orders-table-action',
        context: 'rows in orders-table'
    },
    {
        old: 'data-filter',
        owner: 'search-filter-bar',
        new: 'data-search-filter-bar-filter',
        context: 'search-filter-bar.stories.js'
    },
    {
        old: 'data-step',
        owner: 'step-indicator',
        new: 'data-step-indicator-step',
        context: 'step-indicator.stories.js'
    },
    {
        old: 'data-step-id',
        owner: 'order-status-steps',
        new: 'data-order-status-steps-step-id',
        context: 'order-status-steps.js'
    },
    {
        old: 'data-record-id',
        owner: 'billing-form-card',
        new: 'data-billing-form-card-record-id',
        context: 'billing-form-card.js'
    },
    {
        old: 'data-initial-rows',
        owner: 'catalog-product-grid',
        new: 'data-catalog-product-grid-initial-rows',
        context: 'catalog-product-grid.js'
    },
    {
        old: 'data-collapse-label',
        owner: 'catalog-product-grid',
        new: 'data-catalog-product-grid-collapse-label',
        context: 'catalog-product-grid.js'
    },
    {
        old: 'data-expand-label',
        owner: 'catalog-product-grid',
        new: 'data-catalog-product-grid-expand-label',
        context: 'catalog-product-grid.js'
    },
    {
        old: 'data-card-link',
        owner: 'catalog-interstitial',
        new: 'data-catalog-interstitial-link',
        context: 'catalog-interstitial.js'
    },
    {
        old: 'data-card-link-label',
        owner: 'catalog-interstitial',
        new: 'data-catalog-interstitial-link-label',
        context: 'catalog-interstitial.js'
    },
    {
        old: 'data-card-href',
        owner: 'article-card',
        new: 'data-article-card-href',
        context: 'article-card.stories.js'
    },
    // Ambiguo: vive sia in recent-order-card che in orders-table.
    {
        old: 'data-order-id',
        owner: null,
        new: null,
        context: 'ambiguous: recent-order-card vs orders-table',
        needsReview: true
    }
];

const RENAME_MAP = new Map();
for (const r of RENAME_TABLE) RENAME_MAP.set(r.old, r);

function listFilesRecursive(dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    const stack = [dir];
    while (stack.length) {
        const cur = stack.pop();
        const entries = fs.readdirSync(cur, { withFileTypes: true });
        for (const ent of entries) {
            const full = path.join(cur, ent.name);
            if (ent.isDirectory()) {
                if (ent.name === 'node_modules' || ent.name.startsWith('.')) continue;
                stack.push(full);
            } else if (ent.isFile()) {
                const ext = path.extname(ent.name).toLowerCase();
                if (SCAN_EXTS.has(ext)) out.push(full);
            }
        }
    }
    return out;
}

function discoverBlockNames() {
    // Block names = nome del file primitive (senza estensione) +
    // nome del file component (senza estensione). Sono i nomi candidati
    // di "componente" ai fini del prefisso component-scoped.
    const blocks = new Set();
    for (const sub of ['primitives', 'components']) {
        const dir = path.join(REPO_ROOT, sub);
        if (!fs.existsSync(dir)) continue;
        for (const f of fs.readdirSync(dir)) {
            if (!f.endsWith('.css')) continue;
            blocks.add(f.replace(/\.css$/, ''));
        }
    }
    // Aggiunte note dall'audit 04 (block multipli per file o alias storico).
    blocks.add('accordion');
    blocks.add('preview');
    blocks.add('orders-table');
    blocks.add('billing-form-card');
    blocks.add('cart-product-card');
    blocks.add('catalog-stage');
    blocks.add('catalog-product-grid');
    blocks.add('catalog-interstitial');
    blocks.add('dashboard-shell');
    blocks.add('dashboard-settings-form');
    blocks.add('dashboard-dropdown-box');
    blocks.add('file-upload-box');
    blocks.add('info-dropdown');
    blocks.add('order-product-dropdown');
    blocks.add('order-status-steps');
    blocks.add('order-step-detail');
    blocks.add('toggle-switch');
    blocks.add('supplier-activity-table');
    blocks.add('feedaty-widget');
    return blocks;
}

function isComponentScoped(attrName, blockNames) {
    // attrName = "data-foo-bar". Confronto la parte dopo "data-" con i nomi
    // di block possibili: l'attributo e' component-scoped se inizia con uno
    // dei nomi block seguito da "-" (o coincide con il nome block, hook root).
    const stripped = attrName.replace(/^data-/, '');
    for (const block of blockNames) {
        if (stripped === block) return true;
        if (stripped.startsWith(block + '-')) return true;
    }
    return false;
}

function feedatyContext(filePaths) {
    // Restituisce { thirdParty, mixed } dove:
    //   thirdParty = almeno una occorrenza in contesto Feedaty (path o
    //                story che embedda il widget feedaty_widget);
    //   mixed      = l'attributo appare anche fuori dal contesto Feedaty,
    //                quindi va marcato per review (3rd party + uso interno).
    // Heuristic: trattiamo come Feedaty i file con "feedaty" nel path.
    // Gli altri stories che embeddano il markup Feedaty (es. catalog-stage)
    // contano come "outside" e fanno scattare il flag mixed -> needsReview.
    if (filePaths.length === 0) return { thirdParty: false, mixed: false };
    let inFeedaty = 0;
    let outside = 0;
    for (const p of filePaths) {
        if (p.indexOf('feedaty') !== -1) inFeedaty++;
        else outside++;
    }
    return {
        thirdParty: inFeedaty > 0,
        mixed: inFeedaty > 0 && outside > 0
    };
}

function isDemoOnly(filePaths) {
    if (filePaths.length === 0) return false;
    return filePaths.every(function (p) {
        return p.indexOf('/demo-pages/') !== -1 || p.startsWith('demo-pages/');
    });
}

function main() {
    const blockNames = discoverBlockNames();
    const occurrences = new Map(); // name -> Set(files)

    for (const sub of SCAN_DIRS) {
        const dir = path.join(REPO_ROOT, sub);
        if (!fs.existsSync(dir)) {
            console.error('ERROR: missing directory ' + dir);
            process.exit(1);
        }
        const files = listFilesRecursive(dir);
        for (const f of files) {
            let content;
            try {
                content = fs.readFileSync(f, 'utf8');
            } catch (e) {
                continue;
            }
            const re = /\bdata-([a-z][a-z0-9-]*)/g;
            let m;
            const seen = new Set();
            while ((m = re.exec(content)) !== null) {
                seen.add('data-' + m[1]);
            }
            const rel = path.relative(REPO_ROOT, f);
            for (const name of seen) {
                if (!occurrences.has(name)) occurrences.set(name, new Set());
                occurrences.get(name).add(rel);
            }
        }
    }

    const data = [];
    let total = 0;
    let componentScoped = 0;
    let generic = 0;
    let thirdParty = 0;
    let demoOnly = 0;

    const sortedNames = Array.from(occurrences.keys()).sort();
    for (const name of sortedNames) {
        const files = Array.from(occurrences.get(name)).sort();
        const scoped = isComponentScoped(name, blockNames);
        const fctx = FEEDATY_ATTRS.has(name)
            ? feedatyContext(files)
            : { thirdParty: false, mixed: false };
        const feedaty = fctx.thirdParty;
        const demo = isDemoOnly(files);

        let owner = null;
        let newName = null;
        let context = null;
        let needsReview = false;

        const rename = RENAME_MAP.get(name);
        if (rename) {
            owner = rename.owner;
            newName = rename.new;
            context = rename.context;
            needsReview = !!rename.needsReview;
        }

        // Se l'attributo Feedaty appare anche fuori dal contesto Feedaty,
        // ha bisogno di review (collisione namespace).
        if (fctx.mixed) needsReview = true;

        const record = {
            old: name,
            files: files,
            componentScoped: scoped,
            thirdParty: feedaty,
            demoOnly: demo,
            owner: owner,
            new: newName,
            context: context,
            needsReview: needsReview
        };
        data.push(record);

        total++;
        if (feedaty) thirdParty++;
        else if (scoped) componentScoped++;
        else if (demo) demoOnly++;
        else generic++;
    }

    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

    const out = {
        generatedAt: new Date().toISOString(),
        stats: {
            total: total,
            componentScoped: componentScoped,
            generic: generic,
            thirdParty: thirdParty,
            demoOnly: demoOnly
        },
        data: data
    };

    fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
    console.log('inventory-data-attrs: wrote ' + OUT_FILE);
    console.log('  total:           ' + total);
    console.log('  componentScoped: ' + componentScoped);
    console.log('  generic:         ' + generic);
    console.log('  thirdParty:      ' + thirdParty);
    console.log('  demoOnly:        ' + demoOnly);
}

main();
