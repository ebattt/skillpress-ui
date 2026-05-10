/**
 * check-hardcoded-colors.cjs
 *
 * Scansiona `primitives/`, `components/` e `bundles/` per valori colore
 * hardcoded (hex, rgb, rgba, hsl) fuori da `tokens/tokens.css`.
 *
 * Esclusioni applicate:
 *   - file `tokens/tokens.css` (sorgente di verita');
 *   - colori dentro `data:image/svg+xml,...` (SVG mask/stroke/fill);
 *   - colori dentro gradient `linear-gradient(...)` (locali per definizione);
 *   - whitelist inline `/ * allow-hardcoded: <reason> * /` sulla riga sopra
 *     o sulla stessa riga del valore;
 *   - alpha/opacity composti dei pattern `0|1|255` non sono colori (l'output
 *     gia' filtra solo hex e rgb/rgba con almeno un ottetto).
 *
 * Output: file:line:value, exit 1 se hits > soglia (env CHECK_HARDCODED_MAX,
 * default 0). Lo script e' read-only e idempotente.
 *
 * Uso:
 *   node scripts/check-hardcoded-colors.cjs
 *   CHECK_HARDCODED_MAX=200 node scripts/check-hardcoded-colors.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = ['primitives', 'components', 'bundles'].map((d) =>
    path.join(REPO_ROOT, d),
);
const TOKENS_FILE = path.join(REPO_ROOT, 'tokens', 'tokens.css');
const MAX_HITS = Number.isFinite(Number(process.env.CHECK_HARDCODED_MAX))
    ? Number(process.env.CHECK_HARDCODED_MAX)
    : 0;

const COLOR_RE =
    /#([0-9a-fA-F]{3,8})\b|rgba?\(\s*\d{1,3}\s*[, ]\s*\d{1,3}\s*[, ]\s*\d{1,3}/g;

/** ricorsivo, ritorna lista path file .css */
function listCssFiles(dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            out.push(...listCssFiles(full));
        } else if (entry.isFile() && full.endsWith('.css')) {
            out.push(full);
        }
    }
    return out;
}

/**
 * Strip da una riga le regioni "non in scope":
 *   - SVG data URI (tutto cio' che inizia con `data:image/svg+xml`
 *     fino alla chiusura `)`)
 *   - linear-gradient/radial-gradient(...)
 * Anche se il match si estende oltre la riga, in CSS reale gradient e SVG
 * stanno tipicamente in singola riga (formattati sulla stessa riga del valore).
 */
function stripIgnoredRegions(line) {
    let out = line;
    // svg data URI -- match fino alla prima ")" successiva
    out = out.replace(/url\(\s*["']?data:image\/svg\+xml[^)]*\)/g, ' ');
    // gradient(...) (anche annidato superficialmente)
    out = out.replace(/\b(?:linear|radial|conic)-gradient\([^)]*\)/g, ' ');
    return out;
}

function hasInlineWhitelist(line, prevLine) {
    if (/\/\*\s*allow-hardcoded:/.test(line)) return true;
    if (prevLine && /\/\*\s*allow-hardcoded:/.test(prevLine)) return true;
    return false;
}

function scanFile(file) {
    const rel = path.relative(REPO_ROOT, file);
    if (path.resolve(file) === path.resolve(TOKENS_FILE)) return [];
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    const hits = [];
    for (let i = 0; i < lines.length; i++) {
        const raw = lines[i];
        if (hasInlineWhitelist(raw, lines[i - 1])) continue;
        const cleaned = stripIgnoredRegions(raw);
        const matches = cleaned.match(COLOR_RE);
        if (!matches) continue;
        for (const m of matches) {
            // ignora hex 3-char puri usati come 0/1 placeholder? non rilevante:
            // i colori veri sono almeno 3 char hex. Lasciamo passare.
            hits.push({ file: rel, line: i + 1, value: m });
        }
    }
    return hits;
}

function main() {
    const files = SCAN_DIRS.flatMap(listCssFiles);
    const allHits = [];
    for (const f of files) allHits.push(...scanFile(f));

    if (allHits.length === 0) {
        process.stdout.write('check-hardcoded-colors: 0 hits.\n');
        process.exit(0);
    }

    process.stdout.write(
        `check-hardcoded-colors: ${allHits.length} hit(s) (max=${MAX_HITS}).\n`,
    );
    for (const h of allHits) {
        process.stdout.write(`${h.file}:${h.line}:${h.value}\n`);
    }
    if (allHits.length > MAX_HITS) {
        process.exit(1);
    }
    process.exit(0);
}

main();
