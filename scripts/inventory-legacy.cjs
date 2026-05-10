/**
 * inventory-legacy.cjs
 *
 * Cerca classi e marker legacy nel codice della libreria (vedi audit
 * 03-css-bem-tokens.md e 04-js-runtime-accessibility.md):
 *
 *   - cz-*           Configuratore Zen legacy
 *   - riepilogo-*    legacy carrello/sidebar
 *   - td-*           orders-table cells legacy
 *   - dash-*         vs dashboard-* (disambiguazione)
 *   - dashboard-*    namespace canonico per confronto
 *   - markers       link-dev, LOCAL, picsum, placehold, 127.0.0.1
 *
 * Output: scripts/inventory-out/legacy.json
 *
 * NON modifica alcun file. E' read-only e idempotente.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(__dirname, 'inventory-out');
const OUT_FILE = path.join(OUT_DIR, 'legacy.json');

const SCAN_DIRS = ['js', 'primitives', 'components', 'stories', 'demo-pages',
    'base', 'utilities', 'tokens', 'bundles', 'docs'];
const SCAN_EXTS = new Set(['.js', '.cjs', '.mjs', '.ts', '.html', '.css', '.md', '.json']);

const CLASS_PATTERNS = [
    { key: 'cz', re: /\.(cz-[a-z][a-z0-9-]*)/g },
    { key: 'riepilogo', re: /\.(riepilogo-[a-z][a-z0-9-]*)/g },
    { key: 'td', re: /\.(td-[a-z][a-z0-9-]*)/g },
    // dash-* ma non dashboard-*: usa lookahead negativo.
    { key: 'dash', re: /\.(dash-(?!board)[a-z][a-z0-9-]*)/g },
    { key: 'dashboard', re: /\.(dashboard-[a-z][a-z0-9-]*)/g }
];

const MARKER_PATTERNS = [
    { key: 'link-dev', re: /link-dev/g },
    { key: 'LOCAL', re: /\bLOCAL\b/g },
    { key: 'picsum', re: /picsum/gi },
    { key: 'placehold', re: /placehold/gi },
    { key: '127.0.0.1', re: /127\.0\.0\.1/g }
];

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
                if (ent.name === 'storybook-static') continue;
                if (ent.name === 'inventory-out') continue;
                if (ent.name === 'visual-diff-out') continue;
                stack.push(full);
            } else if (ent.isFile()) {
                const ext = path.extname(ent.name).toLowerCase();
                if (SCAN_EXTS.has(ext)) out.push(full);
            }
        }
    }
    return out;
}

function collectAllFiles() {
    const out = [];
    for (const sub of SCAN_DIRS) {
        const dir = path.join(REPO_ROOT, sub);
        if (!fs.existsSync(dir)) continue;
        const files = listFilesRecursive(dir);
        for (const f of files) out.push(f);
    }
    return out;
}

function scanClasses(files) {
    // bucket[key] = Map(class -> Set(file))
    const buckets = {};
    for (const p of CLASS_PATTERNS) buckets[p.key] = new Map();

    for (const file of files) {
        let content;
        try { content = fs.readFileSync(file, 'utf8'); }
        catch (e) { continue; }
        const rel = path.relative(REPO_ROOT, file);
        for (const p of CLASS_PATTERNS) {
            const re = new RegExp(p.re.source, 'g');
            const seen = new Set();
            let m;
            while ((m = re.exec(content)) !== null) {
                seen.add(m[1]);
            }
            for (const cls of seen) {
                if (!buckets[p.key].has(cls)) buckets[p.key].set(cls, new Set());
                buckets[p.key].get(cls).add(rel);
            }
        }
    }

    const result = {};
    for (const key of Object.keys(buckets)) {
        const list = [];
        const sorted = Array.from(buckets[key].keys()).sort();
        for (const cls of sorted) {
            list.push({
                class: '.' + cls,
                files: Array.from(buckets[key].get(cls)).sort()
            });
        }
        result[key] = list;
    }
    return result;
}

function scanMarkers(files) {
    const markers = {};
    for (const p of MARKER_PATTERNS) markers[p.key] = new Map();

    for (const file of files) {
        let content;
        try { content = fs.readFileSync(file, 'utf8'); }
        catch (e) { continue; }
        const rel = path.relative(REPO_ROOT, file);
        for (const p of MARKER_PATTERNS) {
            const re = new RegExp(p.re.source, p.re.flags);
            let m;
            let count = 0;
            while ((m = re.exec(content)) !== null) {
                count++;
                if (count > 10000) break; // safety
            }
            if (count > 0) {
                markers[p.key].set(rel, count);
            }
        }
    }

    const result = {};
    for (const key of Object.keys(markers)) {
        const arr = [];
        const sorted = Array.from(markers[key].keys()).sort();
        for (const file of sorted) {
            arr.push({ file: file, count: markers[key].get(file) });
        }
        result[key] = arr;
    }
    return result;
}

function main() {
    const files = collectAllFiles();
    if (files.length === 0) {
        console.error('ERROR: no source file scanned (missing dirs?)');
        process.exit(1);
    }
    const classes = scanClasses(files);
    const markers = scanMarkers(files);

    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

    const out = {
        generatedAt: new Date().toISOString(),
        cz: classes.cz,
        riepilogo: classes.riepilogo,
        td: classes.td,
        dash: classes.dash,
        dashboard: classes.dashboard,
        markers: markers,
        stats: {
            cz: classes.cz.length,
            riepilogo: classes.riepilogo.length,
            td: classes.td.length,
            dash: classes.dash.length,
            dashboard: classes.dashboard.length
        }
    };

    fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
    console.log('inventory-legacy: wrote ' + OUT_FILE);
    console.log('  cz:        ' + classes.cz.length);
    console.log('  riepilogo: ' + classes.riepilogo.length);
    console.log('  td:        ' + classes.td.length);
    console.log('  dash:      ' + classes.dash.length);
    console.log('  dashboard: ' + classes.dashboard.length);
}

main();
