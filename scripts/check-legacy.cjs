/**
 * check-legacy.cjs
 *
 * Verifica assenza di classi/marker legacy nel codice della libreria
 * (vedi audit 03-css-bem-tokens.md):
 *
 *   - 0 occorrenze `.cz-*`        in *.css/*.js/*.html/*.md
 *   - 0 occorrenze `.dash-*`      (escluso `.dashboard-*`) in *.css
 *   - 0 occorrenze `.td-*`        in *.css (rename map li prevede tutti)
 *   - 0 occorrenze `riepilogo-`   in *.css
 *
 * NON modifica file. Idempotente.
 *
 * Uso:
 *   node scripts/check-legacy.cjs
 *   CHECK_LEGACY_MAX=10 node scripts/check-legacy.cjs   # warn-only override
 *
 * Exit:
 *   0 = sotto soglia (default 0)
 *   1 = oltre soglia
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = [
    'primitives', 'components', 'utilities', 'base', 'tokens', 'bundles',
    'js', 'stories',
];
const CSS_DIRS = ['primitives', 'components', 'utilities', 'base', 'tokens', 'bundles'];
const ALL_EXTS = new Set(['.css', '.js', '.cjs', '.mjs', '.ts', '.html', '.md']);

const MAX_HITS = Number.isFinite(Number(process.env.CHECK_LEGACY_MAX))
    ? Number(process.env.CHECK_LEGACY_MAX)
    : 0;

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
                if (ent.name === 'inventory-out' || ent.name === 'visual-diff-out') continue;
                if (ent.name === 'storybook-static') continue;
                stack.push(full);
            } else if (ent.isFile()) {
                const ext = path.extname(ent.name).toLowerCase();
                if (extSet.has(ext)) out.push(full);
            }
        }
    }
    return out;
}

function scanPattern(files, regex) {
    const hits = [];
    for (const f of files) {
        let content;
        try { content = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const re = new RegExp(regex.source, regex.flags);
            let m;
            while ((m = re.exec(line)) !== null) {
                hits.push({
                    file: path.relative(REPO_ROOT, f),
                    line: i + 1,
                    match: m[0],
                });
            }
        }
    }
    return hits;
}

function main() {
    // 1) `.cz-` in tutti i file estensione standard
    const allFiles = SCAN_DIRS
        .map(function (s) { return path.join(REPO_ROOT, s); })
        .flatMap(function (d) { return listFilesRecursive(d, ALL_EXTS); });
    const cssFiles = CSS_DIRS
        .map(function (s) { return path.join(REPO_ROOT, s); })
        .flatMap(function (d) { return listFilesRecursive(d, new Set(['.css'])); });

    const buckets = [
        { key: 'cz', regex: /\.(cz-[a-z][a-z0-9-]*)/g, files: allFiles },
        { key: 'dash', regex: /\.(dash-(?!board)[a-z][a-z0-9-]*)/g, files: cssFiles },
        { key: 'td', regex: /\.(td-[a-z][a-z0-9-]*)/g, files: cssFiles },
        { key: 'riepilogo', regex: /(riepilogo-[a-z][a-z0-9-]*)/g, files: cssFiles },
    ];

    let total = 0;
    const allHits = {};
    for (const b of buckets) {
        const hits = scanPattern(b.files, b.regex);
        allHits[b.key] = hits;
        total += hits.length;
    }

    if (total === 0) {
        process.stdout.write('check-legacy: 0 hit (cz/dash/td/riepilogo).\n');
        process.exit(0);
    }

    process.stdout.write(
        `check-legacy: ${total} hit totali (max=${MAX_HITS}).\n`
    );
    for (const key of Object.keys(allHits)) {
        const hits = allHits[key];
        if (hits.length === 0) continue;
        process.stdout.write(`  [${key}] ${hits.length}\n`);
        for (const h of hits.slice(0, 50)) {
            process.stdout.write(`    ${h.file}:${h.line}:${h.match}\n`);
        }
        if (hits.length > 50) {
            process.stdout.write(`    ... (+${hits.length - 50} altre)\n`);
        }
    }
    if (total > MAX_HITS) process.exit(1);
    process.exit(0);
}

main();
