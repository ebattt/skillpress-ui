/**
 * check-breakpoints.cjs
 *
 * Scansiona `primitives/`, `components/`, `utilities/`, `base/`, `bundles/`
 * e verifica che ogni `@media (...-width: Npx)` usi una soglia canonica:
 *
 *   - min-width: 640 / 1024 / 1280
 *   - max-width: 639 / 1023 / 1279
 *
 * Le soglie non canoniche (es. 480, 768, 1200, 1440) sono ammesse SOLO
 * se nelle ~12 righe sopra esiste un commento contenente la stringa
 * `breakpoint-exception` (puo' essere su una sola riga `/ * ... * /`
 * oppure all'interno di un block comment multi-riga).
 *
 * Output: file:line:media-query, exit 1 se hits > soglia (env
 * CHECK_BREAKPOINTS_MAX, default 0).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SCAN_DIRS = ['primitives', 'components', 'utilities', 'base', 'bundles'];

const CANONICAL_MIN = new Set([640, 1024, 1280]);
const CANONICAL_MAX = new Set([639, 1023, 1279]);

const MAX_HITS = Number.isFinite(Number(process.env.CHECK_BREAKPOINTS_MAX))
    ? Number(process.env.CHECK_BREAKPOINTS_MAX)
    : 0;

function listCssFiles(dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    const stack = [dir];
    while (stack.length) {
        const cur = stack.pop();
        for (const ent of fs.readdirSync(cur, { withFileTypes: true })) {
            const full = path.join(cur, ent.name);
            if (ent.isDirectory()) {
                if (ent.name.startsWith('.') || ent.name === 'node_modules') continue;
                stack.push(full);
            } else if (ent.isFile() && full.endsWith('.css')) {
                out.push(full);
            }
        }
    }
    return out;
}

/**
 * Determina se il commento "breakpoint-exception" e' presente nelle ~12
 * righe sopra l'idx, anche dentro un block comment `/ * ... * /` multi-riga.
 */
function hasExceptionAbove(lines, idx) {
    const text = [];
    let k = idx - 1;
    while (k >= 0) {
        const line = lines[k];
        const s = line.trim();
        if (s === '') { text.push(s); k--; continue; }
        if (s.endsWith('*/') || s.indexOf('*/') !== -1) {
            text.push(s);
            k--;
            // continue scanning until /* found
            while (k >= 0) {
                const inner = lines[k];
                text.push(inner.trim());
                if (inner.indexOf('/*') !== -1) break;
                k--;
            }
            k--;
            continue;
        }
        // line non-comment -> stop
        break;
    }
    const full = text.reverse().join(' ');
    return full.indexOf('breakpoint-exception') !== -1;
}

function main() {
    const violations = [];
    for (const sub of SCAN_DIRS) {
        const dir = path.join(REPO_ROOT, sub);
        const files = listCssFiles(dir);
        for (const f of files) {
            const rel = path.relative(REPO_ROOT, f);
            const lines = fs.readFileSync(f, 'utf8').split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (!/@media\s*\(/.test(line)) continue;
                const tokens = [];
                const re = /(max|min)-width:\s*(\d+)px/g;
                let m;
                while ((m = re.exec(line)) !== null) {
                    tokens.push({ kind: m[1], n: Number(m[2]) });
                }
                if (tokens.length === 0) continue;
                let allCanonical = true;
                for (const t of tokens) {
                    if (t.kind === 'min' && CANONICAL_MIN.has(t.n)) continue;
                    if (t.kind === 'max' && CANONICAL_MAX.has(t.n)) continue;
                    allCanonical = false; break;
                }
                if (allCanonical) continue;
                if (hasExceptionAbove(lines, i)) continue;
                violations.push({ file: rel, line: i + 1, content: line.trim() });
            }
        }
    }

    if (violations.length === 0) {
        process.stdout.write('check-breakpoints: 0 violazioni.\n');
        process.exit(0);
    }
    process.stdout.write(
        `check-breakpoints: ${violations.length} violazione/i (max=${MAX_HITS}).\n`
    );
    for (const v of violations) {
        process.stdout.write(`  ${v.file}:${v.line}: ${v.content}\n`);
    }
    if (violations.length > MAX_HITS) process.exit(1);
    process.exit(0);
}

main();
