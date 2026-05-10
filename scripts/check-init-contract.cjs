/**
 * check-init-contract.cjs
 *
 * Verifica che ogni file in `js/` (eccetto `_helpers.js` e `index.js`)
 * registri il proprio Component sul namespace `window.SkillpressUI` con
 * almeno un metodo `init`. La regola e' formale: deve esistere
 *   <ns>.<Pascal> = { ..., init: ... }
 * dove `<ns>` e' window.SkillpressUI o un alias locale (`var ns = ...`,
 * `var namespace = ...`).
 *
 * NON modifica file. Idempotente.
 *
 * Uso:
 *   node scripts/check-init-contract.cjs
 *
 * Exit:
 *   0 = tutti i js/* esportano init
 *   1 = file non conformi (lista stampata)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const JS_DIR = path.join(REPO_ROOT, 'js');

function toPascalCase(name) {
    return name.split('-').map(function (s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }).join('');
}

function listJsFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(function (f) {
        return f.endsWith('.js');
    });
}

function main() {
    const files = listJsFiles(JS_DIR);
    const violations = [];

    for (const file of files) {
        if (file === '_helpers.js' || file === 'index.js') continue;
        const base = file.replace(/\.js$/, '');
        const pascal = toPascalCase(base);
        const full = path.join(JS_DIR, file);
        const content = fs.readFileSync(full, 'utf8');
        // Pattern accettati:
        //   ns.<Pascal> = { ..., init: <fn>, ... }
        //   namespace.<Pascal> = { ... }
        //   window.SkillpressUI.<Pascal> = { ... }
        // Verifica:
        //   1. esiste assegnazione del Component sul namespace
        //   2. tale assegnazione contiene `init:` come property
        const assignRe = new RegExp(
            '(?:ns|namespace|window\\.SkillpressUI|global\\.SkillpressUI)\\.' +
            pascal + '\\s*=\\s*{([^}]*)}',
            's'
        );
        const m = assignRe.exec(content);
        if (!m) {
            violations.push({
                file: 'js/' + file,
                reason: 'no <ns>.' + pascal + ' assignment found',
            });
            continue;
        }
        if (!/\binit\s*:/.test(m[1])) {
            violations.push({
                file: 'js/' + file,
                reason: '<ns>.' + pascal + ' definito ma senza property `init:`',
            });
            continue;
        }
    }

    if (violations.length === 0) {
        process.stdout.write('check-init-contract: ' + files.length + ' js scanned, 0 violazioni.\n');
        process.exit(0);
    }

    process.stdout.write(`check-init-contract: ${violations.length} violazione/i.\n`);
    for (const v of violations) {
        process.stdout.write(`  ${v.file}: ${v.reason}\n`);
    }
    process.exit(1);
}

main();
