/**
 * inventory-primitives.cjs
 *
 * Legge i file `primitives/*.css` e produce una mappa di rename verso il
 * prefisso `sp-` (Convenzione naming C, vedi audit 03-css-bem-tokens.md).
 *
 * Output: scripts/inventory-out/primitives.json
 *
 * NON modifica alcun file CSS della libreria. E' un audit read-only,
 * idempotente: due esecuzioni consecutive producono lo stesso JSON
 * (eccetto il campo `generatedAt`).
 *
 * Per ogni classe top-level definita in un file `primitives/*.css`
 * emette un record:
 *   {
 *     old:  ".classe",
 *     new:  ".sp-classe",
 *     file: "primitives/<file>.css",
 *     type: "block" | "element" | "modifier" | "element-modifier"
 *   }
 *
 * Eccezioni: nessuna. Anche `.dashboard-nav-icon` riceve il prefisso
 * (vedi audit 03 sezione "Casi speciali nel renaming").
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const PRIMITIVES_DIR = path.join(REPO_ROOT, 'primitives');
const OUT_DIR = path.join(__dirname, 'inventory-out');
const OUT_FILE = path.join(OUT_DIR, 'primitives.json');

function readPackageVersion() {
    try {
        const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8'));
        return pkg.version || null;
    } catch (e) {
        return null;
    }
}

function classifyClass(name) {
    // BEM:
    //   block               => "block"
    //   block__elem         => "element"
    //   block--mod          => "modifier"
    //   block__elem--mod    => "element-modifier"
    const hasElem = name.indexOf('__') !== -1;
    const hasMod = name.indexOf('--') !== -1;
    if (hasElem && hasMod) return 'element-modifier';
    if (hasElem) return 'element';
    if (hasMod) return 'modifier';
    return 'block';
}

function extractClassesFromCss(content) {
    // Strip comments (block-level /* ... */).
    const stripped = content.replace(/\/\*[\s\S]*?\*\//g, '');
    // Match class selectors: .name where name = [a-zA-Z_-][\w-]*
    // Avoid catching properties or attribute selectors. Use a regex that
    // requires the class to begin with a letter (no escape sequences expected
    // in this codebase).
    const re = /\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
    const set = new Set();
    let m;
    while ((m = re.exec(stripped)) !== null) {
        const cls = m[1];
        // Skip pseudo classes (e.g. :hover) — already excluded by leading '.'.
        // Skip known helpers that are not real classes (none today).
        set.add(cls);
    }
    return Array.from(set).sort();
}

function listCssFiles(dir) {
    if (!fs.existsSync(dir)) {
        console.error('ERROR: missing directory ' + dir);
        process.exit(1);
    }
    return fs.readdirSync(dir)
        .filter(function (n) { return n.endsWith('.css'); })
        .sort();
}

function main() {
    const files = listCssFiles(PRIMITIVES_DIR);
    if (files.length === 0) {
        console.error('ERROR: no CSS file found in ' + PRIMITIVES_DIR);
        process.exit(1);
    }

    const primitives = [];
    let totalClasses = 0;

    for (const file of files) {
        const fullPath = path.join(PRIMITIVES_DIR, file);
        const content = fs.readFileSync(fullPath, 'utf8');
        const classes = extractClassesFromCss(content);
        for (const cls of classes) {
            primitives.push({
                old: '.' + cls,
                new: '.sp-' + cls,
                file: 'primitives/' + file,
                type: classifyClass(cls)
            });
            totalClasses++;
        }
    }

    // Stable sort: by file, then by old class name.
    primitives.sort(function (a, b) {
        if (a.file < b.file) return -1;
        if (a.file > b.file) return 1;
        if (a.old < b.old) return -1;
        if (a.old > b.old) return 1;
        return 0;
    });

    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

    const out = {
        generatedAt: new Date().toISOString(),
        sourceVersion: readPackageVersion(),
        primitives: primitives,
        stats: {
            totalFiles: files.length,
            totalClasses: totalClasses
        }
    };

    fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
    console.log('inventory-primitives: wrote ' + OUT_FILE);
    console.log('  files:   ' + files.length);
    console.log('  classes: ' + totalClasses);
}

main();
