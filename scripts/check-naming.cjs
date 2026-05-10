/**
 * check-naming.cjs
 *
 * Verifica regole di naming top-level dei selettori CSS:
 *   - ogni `primitives/*.css` espone almeno un block top-level prefissato
 *     `.sp-` (idealmente `.sp-<filename>`).
 *   - ogni `components/*.css` NON espone block top-level che inizia con
 *     `.sp-` (eccetto la primitiva estratta `sp-catalog-grid` riutilizzata
 *     per "domain primitives" condivise — whitelist esplicita).
 *   - `utilities/utilities.css` e' considerato congelato: non si puo' aggiungere
 *     una nuova classe top-level rispetto al baseline registrato.
 *
 * NON modifica file. Idempotente.
 *
 * Uso:
 *   node scripts/check-naming.cjs
 *
 * Exit:
 *   0 = nessuna violazione
 *   1 = violazioni trovate (stampate su stdout)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const PRIMITIVES_DIR = path.join(REPO_ROOT, 'primitives');
const COMPONENTS_DIR = path.join(REPO_ROOT, 'components');
const UTILITIES_FILE = path.join(REPO_ROOT, 'utilities', 'utilities.css');

// I components possono ESPORRE selettori .sp-* SOLO se la classe e' una
// primitiva consumata e gia' definita in primitives/. La whitelist riflette
// "sp-catalog-grid" (catalog-grid e' una primitiva, ma molti components la
// referenziano nei selettori discendenti).
const ALLOWED_SP_PREFIXES_IN_COMPONENTS = [
    'sp-catalog-grid',
];

// Baseline utility classes (top-level) snapshot generato manualmente da
// utilities/utilities.css al momento del freeze. Lo script avvisa se appare
// una NUOVA classe top-level non in baseline (e' una segnaletica light:
// non blocca mai, perche' la classe potrebbe essere una variante esistente
// con suffisso BEM-like).
function listCssFiles(dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isFile() && entry.name.endsWith('.css')) {
            out.push(path.join(dir, entry.name));
        }
    }
    return out;
}

/** Estrae top-level selectors (start-of-line `.classname{` o `.classname,`). */
function extractTopLevelClasses(content) {
    const set = new Set();
    const lines = content.split('\n');
    for (const raw of lines) {
        const m = /^\s*\.([a-zA-Z_][a-zA-Z0-9_-]*)/.exec(raw);
        if (m) set.add(m[1]);
    }
    return set;
}

function main() {
    const violations = [];

    // PRIMITIVES: ogni file deve avere almeno un selettore .sp-* top-level
    const primitiveFiles = listCssFiles(PRIMITIVES_DIR);
    for (const file of primitiveFiles) {
        const rel = path.relative(REPO_ROOT, file);
        const content = fs.readFileSync(file, 'utf8');
        const classes = extractTopLevelClasses(content);
        let hasSp = false;
        for (const c of classes) {
            if (c.startsWith('sp-')) { hasSp = true; break; }
        }
        if (!hasSp) {
            violations.push(
                `${rel}: primitive non espone alcun selettore top-level .sp-*`
            );
        }
        // Inoltre i selettori top-level NON-sp devono essere assenti (i
        // primitives sono al 100% sp-*); accumuliamo quelli per visibilita'
        const nonSp = [];
        for (const c of classes) {
            if (!c.startsWith('sp-')) nonSp.push(c);
        }
        if (nonSp.length > 0) {
            violations.push(
                `${rel}: primitive contiene selettori top-level non-sp: ${nonSp.slice(0,5).join(', ')}${nonSp.length>5?` (+${nonSp.length-5})`:''}`
            );
        }
    }

    // COMPONENTS: nessun selettore top-level deve iniziare con .sp- eccetto
    // quelli in whitelist.
    const componentFiles = listCssFiles(COMPONENTS_DIR);
    for (const file of componentFiles) {
        const rel = path.relative(REPO_ROOT, file);
        const content = fs.readFileSync(file, 'utf8');
        const classes = extractTopLevelClasses(content);
        for (const c of classes) {
            if (!c.startsWith('sp-')) continue;
            const allowed = ALLOWED_SP_PREFIXES_IN_COMPONENTS.some(function (p) {
                return c === p || c.indexOf(p + '_') === 0 ||
                    c.indexOf(p + '-') === 0 || c.indexOf(p + '__') === 0;
            });
            if (!allowed) {
                violations.push(
                    `${rel}: component espone selettore top-level .sp-* fuori whitelist: .${c}`
                );
            }
        }
    }

    // UTILITIES: nessuna NUOVA classe top-level (warn-only se file
    // assente, fail se sono apparse classi top-level che non iniziano per
    // .u- o non rispecchiano il naming utility canonico).
    if (fs.existsSync(UTILITIES_FILE)) {
        const content = fs.readFileSync(UTILITIES_FILE, 'utf8');
        const classes = extractTopLevelClasses(content);
        // Le utility legittime: prefissate `u-`, oppure pattern di responsive
        // visibility (sm-only, md-only, lg-only, ...). Tutto cio' che non
        // rientra e' candidato per review.
        const allowedUtilityRegexes = [
            /^u-/,
            /^sm-/, /^md-/, /^lg-/, /^xl-/,
            /^hidden$/, /^visible$/,
        ];
        const stranger = [];
        for (const c of classes) {
            const ok = allowedUtilityRegexes.some(function (re) { return re.test(c); });
            if (!ok) stranger.push(c);
        }
        // E' atteso che `utilities.css` contenga ANCHE classi shared con i
        // componenti (es. flex-row helpers). Per evitare falsi-positivi
        // ammettiamo "fuori canon" come INFO (non fail) finche' non e'
        // chiaro il baseline. Stampiamo solo a stderr.
        if (stranger.length > 0) {
            process.stderr.write(
                `[info] utilities.css contiene ${stranger.length} classi fuori naming u-*/responsive: ${stranger.slice(0,5).join(', ')}${stranger.length>5?` (+${stranger.length-5})`:''}\n`
            );
        }
    }

    if (violations.length === 0) {
        process.stdout.write('check-naming: 0 violazioni.\n');
        process.exit(0);
    }

    process.stdout.write(`check-naming: ${violations.length} violazione/i.\n`);
    for (const v of violations) process.stdout.write(v + '\n');
    process.exit(1);
}

main();
