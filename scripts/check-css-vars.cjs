/**
 * check-css-vars.cjs
 *
 * Scansiona `primitives/`, `components/`, `bundles/` e cerca occorrenze di
 * `var(--xxx)` la cui variabile non e' definita in `tokens/tokens.css` ne'
 * nello scope locale del file (definizione `--xxx:` su una riga del file
 * stesso o nel pattern `--xxx, fallback`).
 *
 * Note:
 *   - `var(--xxx, fallback)` con fallback NON viene considerata errore se
 *     la variabile e' usata anche con fallback (il fallback fornisce sicurezza).
 *     Tuttavia segnaliamo lo stesso con tag "[fallback-only]" come warning
 *     informativo (non conta verso exit 1).
 *   - Le custom-property locali del componente (es. `--accordion-header-icon-mask`
 *     in primitives/accordion.css) sono definite e usate nello stesso file
 *     -> trovate dallo scan locale.
 *
 * Output: file:line:variable, exit 1 se hit > 0 (variabile non definita E
 * senza fallback).
 *
 * Uso:
 *   node scripts/check-css-vars.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const TOKENS_FILE = path.join(REPO_ROOT, 'tokens', 'tokens.css');
const SCAN_DIRS = ['primitives', 'components', 'bundles'].map((d) =>
    path.join(REPO_ROOT, d),
);
const MAX_HITS = Number.isFinite(Number(process.env.CHECK_CSS_VARS_MAX))
    ? Number(process.env.CHECK_CSS_VARS_MAX)
    : 0;

const VAR_DEF_RE = /(--[a-zA-Z0-9_-]+)\s*:/g;
const VAR_USE_RE = /var\(\s*(--[a-zA-Z0-9_-]+)(\s*,\s*[^)]*)?\)/g;

function listCssFiles(dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...listCssFiles(full));
        else if (entry.isFile() && full.endsWith('.css')) out.push(full);
    }
    return out;
}

function collectDefinedVars(content) {
    const set = new Set();
    let m;
    VAR_DEF_RE.lastIndex = 0;
    while ((m = VAR_DEF_RE.exec(content)) !== null) {
        set.add(m[1]);
    }
    return set;
}

function main() {
    const tokensContent = fs.readFileSync(TOKENS_FILE, 'utf8');
    const globalDefs = collectDefinedVars(tokensContent);

    const files = SCAN_DIRS.flatMap(listCssFiles);

    const undefinedHits = [];
    const fallbackOnlyHits = [];

    for (const file of files) {
        const rel = path.relative(REPO_ROOT, file);
        const content = fs.readFileSync(file, 'utf8');
        const localDefs = collectDefinedVars(content);

        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            VAR_USE_RE.lastIndex = 0;
            let m;
            while ((m = VAR_USE_RE.exec(line)) !== null) {
                const name = m[1];
                const hasFallback = !!m[2];
                const defined =
                    globalDefs.has(name) || localDefs.has(name);
                if (defined) continue;
                const record = { file: rel, line: i + 1, variable: name };
                if (hasFallback) fallbackOnlyHits.push(record);
                else undefinedHits.push(record);
            }
        }
    }

    if (undefinedHits.length === 0) {
        process.stdout.write(
            `check-css-vars: 0 undefined (without fallback). ${fallbackOnlyHits.length} fallback-only references.\n`,
        );
        if (fallbackOnlyHits.length > 0) {
            for (const h of fallbackOnlyHits) {
                process.stdout.write(
                    `[fallback-only] ${h.file}:${h.line}:${h.variable}\n`,
                );
            }
        }
        process.exit(0);
    }

    process.stdout.write(
        `check-css-vars: ${undefinedHits.length} undefined var(--*) without fallback (max=${MAX_HITS}).\n`,
    );
    for (const h of undefinedHits) {
        process.stdout.write(`${h.file}:${h.line}:${h.variable}\n`);
    }
    if (fallbackOnlyHits.length > 0) {
        for (const h of fallbackOnlyHits) {
            process.stdout.write(
                `[fallback-only] ${h.file}:${h.line}:${h.variable}\n`,
            );
        }
    }
    if (undefinedHits.length > MAX_HITS) process.exit(1);
    process.exit(0);
}

main();
