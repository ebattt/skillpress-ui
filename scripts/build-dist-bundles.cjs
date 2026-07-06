/**
 * build-dist-bundles.cjs
 *
 * Genera i bundle CSS flatten e (opzionalmente) minified in `dist/` per i
 * consumer backend classico (CMS che richiede una sola URL CSS):
 *
 *   bundles/blog.css           -> dist/blog.css
 *   bundles/checkout.css       -> dist/checkout.css
 *   bundles/dashboard.css      -> dist/dashboard.css
 *   bundles/landing.css        -> dist/landing.css
 *   bundles/product-page.css   -> dist/product-page.css
 *   bundles/public.css         -> dist/public.css
 *   bundles/demo-minimal.css   -> dist/demo-minimal.css
 *
 * Strategia:
 *   - implementiamo un flattener `@import 'path.css';` ricorsivo, robusto
 *     ai commenti `/ * ... * /` ma non ai conditional CSS rules nested.
 *     Risolve solo `@import` con path relativi. URL `@import url("https://...")`
 *     sono lasciati intatti.
 *   - se `cssnano` + `postcss` + `postcss-import` sono disponibili come
 *     devDependencies, esegue minification post-flatten. Altrimenti il
 *     bundle e' "flattened only" (pretty), comunque adatto al consumer.
 *
 * Genera inoltre `dist/skillpress-ui.js`: bundle JS unico con tutti i
 * componenti, per il consumer che carica un solo script su tutte le pagine.
 * Ordine di concatenazione (contratto documentato in js/index.js):
 *   js/_helpers.js -> js/<componente>.js (alfabetico) -> js/index.js
 * Ogni modulo e' un IIFE autonomo con auto-init via data-attribute, quindi
 * la concatenazione non cambia il comportamento rispetto ai file singoli.
 *
 * NON modifica i sorgenti. Idempotente.
 *
 * Uso:
 *   node scripts/build-dist-bundles.cjs
 *   BUILD_DIST_VERBOSE=1 node scripts/build-dist-bundles.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const BUNDLES_DIR = path.join(REPO_ROOT, 'bundles');
const DIST_DIR = path.join(REPO_ROOT, 'dist');

const BUNDLE_NAMES = [
    'blog.css',
    'checkout.css',
    'dashboard.css',
    'landing.css',
    'product-page.css',
    'public.css',
    'shell.css',
    'auth.css',
    'demo-minimal.css',
];

const VERBOSE = process.env.BUILD_DIST_VERBOSE === '1';

function log(msg) { if (VERBOSE) process.stdout.write(msg + '\n'); }

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * Flatten ricorsivo: legge un file CSS e sostituisce ogni `@import 'rel.css';`
 * con il contenuto del file referenziato. Supporta:
 *   - quoting con ' o "
 *   - eventuale `url('..')` (lo trattiamo come import locale solo se NON
 *     contiene "://")
 * Ignora @import che puntano a URL remoti, lasciandoli inline.
 */
const VISITED = new Set();
function flatten(filePath, depth) {
    depth = depth || 0;
    if (depth > 20) {
        throw new Error('flatten: profondita @import > 20, ciclo? ' + filePath);
    }
    const abs = path.resolve(filePath);
    if (VISITED.has(abs)) {
        log('skip already-imported: ' + path.relative(REPO_ROOT, abs));
        return ''; // dedup
    }
    VISITED.add(abs);
    const dir = path.dirname(abs);
    const content = fs.readFileSync(abs, 'utf8');
    return content.replace(
        /@import\s+(?:url\(\s*)?['"]([^'"]+)['"]\s*\)?\s*;/g,
        function (match, importPath) {
            if (/^[a-z]+:\/\//i.test(importPath)) {
                // remote import, lascialo intatto
                return match;
            }
            const target = path.resolve(dir, importPath);
            if (!fs.existsSync(target)) {
                log('warn: import non risolto: ' + importPath + ' (in ' + path.relative(REPO_ROOT, abs) + ')');
                return match;
            }
            log('inline ' + path.relative(REPO_ROOT, target));
            return '\n/* === inline ' +
                path.relative(REPO_ROOT, target) +
                ' === */\n' + flatten(target, depth + 1);
        }
    );
}

async function maybeMinify(css) {
    // Tenta postcss + cssnano se disponibili.
    let postcss;
    let cssnano;
    try {
        postcss = require('postcss');
        cssnano = require('cssnano');
    } catch (e) {
        return null;
    }
    try {
        const res = await postcss([cssnano({ preset: 'default' })])
            .process(css, { from: undefined });
        return res.css;
    } catch (e) {
        log('warn: minify fallita: ' + (e && e.message));
        return null;
    }
}

function stripNonLicenseComments(css) {
    return css
        .replace(/\/\*(?!\!)[\s\S]*?\*\//g, '')
        .replace(/[ \t]+$/gm, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

async function buildOne(bundleName) {
    const src = path.join(BUNDLES_DIR, bundleName);
    if (!fs.existsSync(src)) {
        return { bundle: bundleName, status: 'skip', reason: 'sorgente assente' };
    }
    VISITED.clear();
    const flat = flatten(src);
    const out = path.join(DIST_DIR, bundleName);
    let final = stripNonLicenseComments(flat);
    let minified = false;
    const m = await maybeMinify(flat);
    if (m) { final = m; minified = true; }
    fs.writeFileSync(out, final + (minified ? '' : '\n'), 'utf8');
    return {
        bundle: bundleName,
        status: 'ok',
        bytes: Buffer.byteLength(final, 'utf8'),
        minified: minified,
    };
}

const JS_DIR = path.join(REPO_ROOT, 'js');
const JS_BUNDLE_NAME = 'skillpress-ui.js';

function buildJsBundle() {
    const all = fs.readdirSync(JS_DIR).filter(function (f) { return f.endsWith('.js'); });
    const components = all
        .filter(function (f) { return f !== '_helpers.js' && f !== 'index.js'; })
        .sort();
    const ordered = ['_helpers.js'].concat(components, ['index.js']);
    for (const f of ordered) {
        if (!all.includes(f)) throw new Error('js bundle: file atteso mancante: js/' + f);
    }
    const version = JSON.parse(
        fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')
    ).version;
    const banner = '/*! @ebattt/skillpress-ui ' + version + ' -- bundle JS unico (' +
        ordered.length + ' moduli). Auto-init via data-attribute; per markup ' +
        'iniettato dopo il load usare window.SkillpressUI.init(scope). */\n';
    const body = ordered.map(function (f) {
        return '\n/* === js/' + f + ' === */\n' +
            fs.readFileSync(path.join(JS_DIR, f), 'utf8').trim() + '\n;\n';
    }).join('');
    const out = path.join(DIST_DIR, JS_BUNDLE_NAME);
    fs.writeFileSync(out, banner + body, 'utf8');
    return { bundle: JS_BUNDLE_NAME, bytes: Buffer.byteLength(banner + body, 'utf8'), modules: ordered.length };
}

(async function main() {
    ensureDir(DIST_DIR);
    const results = [];
    for (const b of BUNDLE_NAMES) {
        try {
            const r = await buildOne(b);
            results.push(r);
        } catch (err) {
            results.push({ bundle: b, status: 'error', error: String(err) });
        }
    }
    let failed = 0;
    try {
        const js = buildJsBundle();
        process.stdout.write(`dist/${js.bundle}: ${js.bytes} bytes (${js.modules} moduli)\n`);
    } catch (err) {
        failed++;
        process.stderr.write(`dist/${JS_BUNDLE_NAME}: ERROR ${String(err)}\n`);
    }
    for (const r of results) {
        if (r.status === 'ok') {
            process.stdout.write(
                `dist/${r.bundle}: ${r.bytes} bytes (minified=${r.minified})\n`
            );
        } else if (r.status === 'skip') {
            process.stdout.write(`dist/${r.bundle}: skip (${r.reason})\n`);
        } else {
            failed++;
            process.stderr.write(`dist/${r.bundle}: ERROR ${r.error}\n`);
        }
    }
    process.exit(failed > 0 ? 1 : 0);
})();
