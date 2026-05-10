/**
 * check-data-attrs.cjs
 *
 * Verifica che ogni `data-*` usato nel codice della libreria
 * (`primitives/`, `components/`, `js/`, `stories/`) sia uno tra:
 *
 *   1. component-scoped: inizia con `data-{block}` dove `{block}` corrisponde
 *      a un block dichiarato nei primitives o components.
 *   2. third-party Feedaty:
 *        data-id, data-ver, data-type, data-variant, data-lang, data-gui
 *      Ammessi quando la riga (o entro 6 righe) referenzia un block Feedaty
 *      (`feedaty_widget`, `feedaty-widget`).
 *   3. demo-only: data-section, data-consumer-page, data-page-init,
 *      data-order-detail-demo-controls. Ammessi solo in `demo-pages/` o
 *      `stories/`. Nessun primitive/component/js puo' usarli.
 *
 * Lo script:
 *   - rimuove block comments `/ * ... * /` e line comments `//` prima dello scan
 *     per evitare hit dentro JSDoc;
 *   - tratta i match dentro stringhe JS (es. `'data-id'` come default
 *     getAttribute) come uso "passive" e accetta solo se l'attributo e'
 *     in whitelist Feedaty/component-scoped/demo-only.
 *
 * Output: lista violazioni (attr, file:line). Exit 1 se hits > soglia
 * (env CHECK_DATA_ATTRS_MAX, default 0).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = ['primitives', 'components', 'js', 'stories'];
const SCAN_EXTS = new Set(['.css', '.js', '.cjs', '.mjs', '.ts', '.html']);

const MAX_HITS = Number.isFinite(Number(process.env.CHECK_DATA_ATTRS_MAX))
    ? Number(process.env.CHECK_DATA_ATTRS_MAX)
    : 0;

const FEEDATY_ATTRS = new Set([
    'data-id', 'data-ver', 'data-type', 'data-variant', 'data-lang', 'data-gui',
]);
const DEMO_ONLY_ATTRS = new Set([
    'data-section',
    'data-consumer-page',
    'data-page-init',
    'data-order-detail-demo-controls',
]);

// data-attr/data-attribute ricorrono dentro JSDoc/commenti come metafora
// dell'attributo "data-attr" generico (es. helpers.validateAttrName(name)).
// Li ignoriamo come noise.
const NOISE_ATTRS = new Set([
    'data-attr',
    'data-attribute',
    'data-attrs',
    'data-attributes',
]);

function discoverBlocks() {
    const blocks = new Set();
    for (const sub of ['primitives', 'components']) {
        const dir = path.join(REPO_ROOT, sub);
        if (!fs.existsSync(dir)) continue;
        for (const f of fs.readdirSync(dir)) {
            if (!f.endsWith('.css')) continue;
            const name = f.replace(/\.css$/, '');
            blocks.add(name);
            if (name.indexOf('sp-') === 0) {
                blocks.add(name.replace(/^sp-/, ''));
            }
        }
    }
    var EXTRA = [
        'accordion', 'allocation-rows', 'allocation-summary-box',
        'address-preview', 'article-card', 'article-grid',
        'article-hero', 'article-nav', 'article-body', 'badge', 'breadcrumb',
        'billing-form-card', 'billing-table', 'button', 'card',
        'cart-list', 'cart-product-card', 'catalog-grid', 'catalog-card',
        'catalog-interstitial', 'catalog-product-grid', 'catalog-stage',
        'catalog-intro', 'checkout-summary', 'configurator-section',
        'configurator-grid', 'config-column', 'dashboard-action-badge',
        'dashboard-dropdown-box', 'dashboard-greeting-banner',
        'dashboard-recent-orders-grid', 'dashboard-order-card',
        'dashboard-order-detail-layout', 'dashboard-order-summary',
        'dashboard-settings-form', 'dashboard-shell', 'dashboard-welcome-box',
        'download-buttons', 'feature-box', 'feature-grid', 'feedaty-widget',
        'file-modal', 'file-upload-box',
        'form-controls', 'form-layout', 'form-primitives', 'format-card',
        'format-cards',
        'image-gallery', 'info-dropdown', 'info-trigger', 'info-btn',
        'invoice-table', 'invoice-table-section', 'iva-banner',
        'media-choice-card', 'media-choice-cards', 'method-choice',
        'method-choice-card', 'mobile-bar', 'mobile-total-bar',
        'mode-switcher',
        'option-buttons', 'order-action-box', 'order-detail-header',
        'order-detail-grid', 'order-detail-view',
        'order-payment-action-box', 'order-product-dropdown',
        'order-status-steps', 'order-step-detail',
        'order-summary',
        'orders-table', 'orders-filter-bar', 'orientation-toggle',
        'pagination-btn',
        'preview', 'price-table', 'product-hero', 'product-step-card',
        'product-step-detail', 'product-stepper',
        'quote-request-section', 'quote-request-table',
        'rating', 'recent-order-card',
        'related-products', 'search-filter-bar', 'sidebar-totals',
        'step-card', 'step-indicator', 'step-status-banner',
        'supplier-activity-section', 'supplier-activity-table',
        'table-pagination', 'table-wrapper',
        'text-block', 'text-input', 'toggle-switch', 'topic-nav',
        'validation-indicator', 'validation-total',
    ];
    for (const e of EXTRA) blocks.add(e);
    return blocks;
}

function listFilesRecursive(dir, extSet) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    const stack = [dir];
    while (stack.length) {
        const cur = stack.pop();
        for (const ent of fs.readdirSync(cur, { withFileTypes: true })) {
            const full = path.join(cur, ent.name);
            if (ent.isDirectory()) {
                if (ent.name === 'node_modules' || ent.name.startsWith('.')) continue;
                stack.push(full);
            } else if (ent.isFile()) {
                const ext = path.extname(ent.name).toLowerCase();
                if (extSet.has(ext)) out.push(full);
            }
        }
    }
    return out;
}

function stripComments(content, ext) {
    // Strip /* ... */ block comments globally
    var out = content.replace(/\/\*[\s\S]*?\*\//g, function (m) {
        // Preserva i \n per non sfasare le righe
        return m.replace(/[^\n]/g, ' ');
    });
    // For JS-like extensions, also strip line comments `// ...` (simple).
    // Avoid touching `//` inside strings: heuristic OK for stories/js.
    if (ext === '.js' || ext === '.cjs' || ext === '.mjs' || ext === '.ts') {
        out = out.split('\n').map(function (line) {
            // Find `//` outside of obvious string boundaries: skip URLs `://`
            var idx = -1;
            var inSingle = false, inDouble = false, inBack = false;
            for (var i = 0; i < line.length; i++) {
                var ch = line[i];
                var prev = i > 0 ? line[i - 1] : '';
                if (ch === "'" && !inDouble && !inBack && prev !== '\\') inSingle = !inSingle;
                else if (ch === '"' && !inSingle && !inBack && prev !== '\\') inDouble = !inDouble;
                else if (ch === '`' && !inSingle && !inDouble && prev !== '\\') inBack = !inBack;
                else if (!inSingle && !inDouble && !inBack &&
                    ch === '/' && line[i + 1] === '/' && prev !== ':') {
                    idx = i;
                    break;
                }
            }
            if (idx < 0) return line;
            return line.slice(0, idx);
        }).join('\n');
    }
    return out;
}

function isComponentScoped(name, blocks) {
    const stripped = name.replace(/^data-/, '');
    for (const b of blocks) {
        if (stripped === b) return true;
        if (stripped.startsWith(b + '-')) return true;
    }
    return false;
}

function isFeedatyContextLine(lines, idx) {
    // Cerca "feedaty" entro 6 righe sopra o sulla riga stessa.
    for (var j = Math.max(0, idx - 6); j <= idx; j++) {
        if (/feedaty/i.test(lines[j])) return true;
    }
    return false;
}

function main() {
    const blocks = discoverBlocks();

    const occurrences = new Map(); // name -> [{file,line,feedatyCtx}]
    for (const sub of SCAN_DIRS) {
        const dir = path.join(REPO_ROOT, sub);
        const files = listFilesRecursive(dir, SCAN_EXTS);
        for (const f of files) {
            let raw;
            try { raw = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
            const content = stripComments(raw, path.extname(f).toLowerCase());
            const lines = content.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const re = /\bdata-([a-z][a-z0-9-]*)/g;
                let m;
                while ((m = re.exec(lines[i])) !== null) {
                    const name = 'data-' + m[1];
                    if (NOISE_ATTRS.has(name)) continue;
                    if (!occurrences.has(name)) occurrences.set(name, []);
                    occurrences.get(name).push({
                        file: path.relative(REPO_ROOT, f),
                        line: i + 1,
                        feedatyCtx: isFeedatyContextLine(lines, i) ||
                            f.indexOf('feedaty') !== -1,
                    });
                }
            }
        }
    }

    const violations = [];
    for (const name of occurrences.keys()) {
        const records = occurrences.get(name);
        if (DEMO_ONLY_ATTRS.has(name)) {
            const usedInLibrary = records.filter(function (r) {
                return r.file.indexOf('primitives/') === 0 ||
                    r.file.indexOf('components/') === 0 ||
                    r.file.indexOf('js/') === 0;
            });
            if (usedInLibrary.length > 0) {
                violations.push({
                    name: name,
                    reason: 'demo-only attribute usato fuori da demo-pages/stories',
                    records: usedInLibrary,
                });
            }
            continue;
        }
        if (FEEDATY_ATTRS.has(name)) {
            // I 6 attributi Feedaty sono brevi (data-id, data-type ecc.) e
            // collidono naturalmente con default `getAttribute('data-id')` in
            // codice JS della libreria. Considera violazioni solo le
            // occorrenze HTML/CSS fuori contesto Feedaty.
            const outside = records.filter(function (r) {
                if (r.feedatyCtx) return false;
                if (r.file.endsWith('.js') || r.file.endsWith('.cjs') ||
                    r.file.endsWith('.mjs') || r.file.endsWith('.ts')) {
                    return false;
                }
                return true;
            });
            if (outside.length > 0) {
                violations.push({
                    name: name,
                    reason: 'attributo Feedaty 3rd party fuori dal contesto feedaty (in HTML/CSS)',
                    records: outside,
                });
            }
            continue;
        }
        if (isComponentScoped(name, blocks)) continue;
        violations.push({
            name: name,
            reason: 'data-* generico, deve essere prefissato con il block',
            records: records,
        });
    }

    if (violations.length === 0) {
        process.stdout.write('check-data-attrs: 0 violazioni.\n');
        process.exit(0);
    }

    process.stdout.write(
        `check-data-attrs: ${violations.length} violazione/i (max=${MAX_HITS}).\n`
    );
    violations.sort(function (a, b) { return a.name.localeCompare(b.name); });
    for (const v of violations) {
        process.stdout.write(`  ${v.name}: ${v.reason}\n`);
        for (const r of v.records.slice(0, 5)) {
            process.stdout.write(`    ${r.file}:${r.line}\n`);
        }
        if (v.records.length > 5) {
            process.stdout.write(`    ... (+${v.records.length - 5})\n`);
        }
    }
    if (violations.length > MAX_HITS) process.exit(1);
    process.exit(0);
}

main();
