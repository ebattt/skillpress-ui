/**
 * build-public-api.cjs
 *
 * Estrae il contratto pubblico della libreria e produce
 * `dist/public-api.json`.
 *
 * Sorgenti:
 *   - primitives/*.css     -> classi annotate `/** @public *\/` (block-level).
 *                             Il sotto-albero BEM (block__elem, block--mod,
 *                             block__elem--mod) viene incluso automaticamente.
 *                             Annotazioni `/** @internal *\/` su classi
 *                             specifiche le escludono dal contratto.
 *   - components/*.css     -> ogni componente domain-scoped e' identificato
 *                             dal nome file (no prefisso sp-).
 *   - js/<comp>.js         -> blocchi `/** @public-data ... *\/` e
 *                             `/** @public-event ... *\/` nell'header del file.
 *                             Il modulo JS pubblico e' rilevato dal nome
 *                             dell'export `(ns|namespace).<Component> = ...`.
 *
 * Output: dist/public-api.json.
 *
 * Idempotente: due esecuzioni su sorgenti invariati producono lo stesso JSON.
 *
 * Exit 0 sempre (errore solo se qualche file e' illeggibile).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const PRIMITIVES_DIR = path.join(REPO_ROOT, 'primitives');
const PAGE_DIR = path.join(REPO_ROOT, 'page');
const COMPONENTS_DIR = path.join(REPO_ROOT, 'components');
const JS_DIR = path.join(REPO_ROOT, 'js');
const BUNDLES_DIR = path.join(REPO_ROOT, 'bundles');
const OUT_DIR = path.join(REPO_ROOT, 'dist');
const OUT_FILE = path.join(OUT_DIR, 'public-api.json');

function readPackageVersion() {
    const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8'));
    return pkg.version || null;
}

function listCssFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((n) => n.endsWith('.css')).sort();
}

function listJsFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((n) => n.endsWith('.js') && n !== 'index.js' && n !== '_helpers.js').sort();
}

/**
 * Estrae i selettori top-level dei block annotati `@public` da un file CSS.
 * Per ogni block emesso include: il block, gli element (block__elem),
 * i modifier (block--mod) e gli element-modifier (block__elem--mod) che
 * compaiono nello stesso file. Le classi annotate `@internal` sono escluse.
 */
function extractPublicCssClasses(content) {
    // Tutte le classi del file (per derivare la sotto-gerarchia BEM).
    const classRe = /\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
    const allClasses = new Set();
    let m;
    while ((m = classRe.exec(content)) !== null) {
        allClasses.add(m[1]);
    }

    // Trova le annotazioni @public seguite dal selettore `.classe`.
    // Pattern accettato:
    //   /** @public */<spazio/newline>.classe { ... }
    const publicBlocks = new Set();
    const publicAnnotationRe = /\/\*\*\s*@public\s*\*\/\s*\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
    while ((m = publicAnnotationRe.exec(content)) !== null) {
        publicBlocks.add(m[1]);
    }

    // Annotazioni @internal: escludono classi specifiche.
    const internalClasses = new Set();
    const internalAnnotationRe = /\/\*\*\s*@internal\s*\*\/\s*\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
    while ((m = internalAnnotationRe.exec(content)) !== null) {
        internalClasses.add(m[1]);
    }

    // Espandi: per ogni block pubblico, includi tutte le classi del file
    // che sono block, block__elem, block--mod, block__elem--mod (stessa
    // famiglia BEM). Non includere classi prefissate diverse.
    const publicClasses = new Set();
    for (const block of publicBlocks) {
        publicClasses.add(block);
        const prefixElem = block + '__';
        const prefixMod = block + '--';
        for (const cls of allClasses) {
            if (cls === block) continue;
            if (cls.indexOf(prefixElem) === 0 || cls.indexOf(prefixMod) === 0) {
                publicClasses.add(cls);
            }
        }
    }

    // Rimuovi @internal.
    for (const cls of internalClasses) {
        publicClasses.delete(cls);
    }

    return Array.from(publicClasses).sort().map((c) => '.' + c);
}

function extractFromCommentTag(content, tag) {
    // Estrae da blocchi /** ... @<tag> a, b, c ... */ il testo dopo `@<tag>`
    // e prima del prossimo @ o */ (single line).
    const re = new RegExp('@' + tag + '\\s+([^\\n\\r]+)', 'g');
    const items = new Set();
    let m;
    while ((m = re.exec(content)) !== null) {
        const line = m[1];
        // Stop al primo `*/` o `@` successivo nella stessa linea.
        const stopAt = Math.min(
            line.indexOf('*/') === -1 ? Infinity : line.indexOf('*/'),
            line.indexOf(' @') === -1 ? Infinity : line.indexOf(' @')
        );
        const payload = (stopAt === Infinity ? line : line.slice(0, stopAt)).trim();
        if (!payload || /^\(none\)$/i.test(payload)) continue;
        payload.split(',').forEach((p) => {
            const v = p.trim().replace(/^\*\s*/, '');
            if (v && v !== '(none)') items.add(v);
        });
    }
    return Array.from(items).sort();
}

function extractJsExportName(content) {
    // (ns|namespace).<Component> = { ... }
    const re = /\b(?:ns|namespace)\.([A-Z][A-Za-z0-9]+)\s*=\s*\{/;
    const m = re.exec(content);
    return m ? m[1] : null;
}

function extractBundleContract(file) {
    const content = fs.readFileSync(path.join(BUNDLES_DIR, file), 'utf8');
    const components = new Set();
    const primitives = new Set();
    const importRe = /@import\s+["'][^"']*\/(components|primitives|page)\/([^/"']+)\.css["']/g;
    let m;
    while ((m = importRe.exec(content)) !== null) {
        if (m[1] === 'components') {
            components.add(m[2]);
            continue;
        }
        const dir = m[1] === 'page' ? PAGE_DIR : PRIMITIVES_DIR;
        const css = fs.readFileSync(path.join(dir, `${m[2]}.css`), 'utf8');
        for (const selector of extractPublicCssClasses(css)) {
            const name = selector.replace(/^\./, '');
            primitives.add(name.split('__')[0].split('--')[0]);
        }
    }
    return {
        components: Array.from(components).sort(),
        primitives: Array.from(primitives).sort()
    };
}

function main() {
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

    const version = readPackageVersion();

    // CSS primitives (publicly annotated classes).
    // `page/` ospita lo scheletro di layout di pagina (sp-page__*): le sue
    // classi @public sono trattate come primitives a tutti gli effetti.
    const primitives = [];
    const primitiveSources = [
        { dir: PRIMITIVES_DIR, files: listCssFiles(PRIMITIVES_DIR) },
        { dir: PAGE_DIR, files: listCssFiles(PAGE_DIR) }
    ];
    for (const src of primitiveSources) {
        for (const file of src.files) {
            const content = fs.readFileSync(path.join(src.dir, file), 'utf8');
            const classes = extractPublicCssClasses(content);
            for (const cls of classes) primitives.push(cls);
        }
    }

    // CSS components: domain-scoped, identificati per nome file (senza .css).
    const componentFiles = listCssFiles(COMPONENTS_DIR);
    const components = componentFiles.map((f) => f.replace(/\.css$/, ''));
    const componentClasses = {};
    for (const file of componentFiles) {
        const content = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf8');
        const classes = new Set();
        const classRe = /\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
        let match;
        while ((match = classRe.exec(content)) !== null) classes.add(match[1]);
        componentClasses[file.replace(/\.css$/, '')] = [...classes].sort();
    }

    // JS files.
    const jsExports = [];
    const runtime = {};
    const dataAttrs = new Set();
    const events = new Set();
    const jsFiles = listJsFiles(JS_DIR);
    for (const file of jsFiles) {
        const content = fs.readFileSync(path.join(JS_DIR, file), 'utf8');

        // Solo se il file ha l'annotazione @public (di norma sopra l'init):
        const hasPublicInit = /\/\*\*\s*@public\b/.test(content);
        if (!hasPublicInit) continue;

        const exportName = extractJsExportName(content);
        if (exportName) jsExports.push(exportName);

        const fileComponents = extractFromCommentTag(content, 'public-component');
        const fileDataAttrs = extractFromCommentTag(content, 'public-data');
        for (const a of fileDataAttrs) dataAttrs.add(a);

        const fileEvents = extractFromCommentTag(content, 'public-event');
        for (const e of fileEvents) events.add(e);

        if (exportName) {
            runtime[file] = {
                module: exportName,
                components: fileComponents,
                data: fileDataAttrs,
                events: fileEvents
            };
        }
    }

    const bundles = {};
    for (const file of listCssFiles(BUNDLES_DIR)) {
        bundles[file] = extractBundleContract(file);
    }

    const apiSorted = {
        version: version,
        css: {
            primitives: Array.from(new Set(primitives)).sort(),
            components: components.sort(),
            componentClasses: componentClasses
        },
        bundles: bundles,
        runtime: runtime,
        data: Array.from(dataAttrs).sort(),
        events: Array.from(events).sort(),
        js: jsExports.sort()
    };

    fs.writeFileSync(OUT_FILE, JSON.stringify(apiSorted, null, 2) + '\n');
    console.log('build-public-api: wrote ' + path.relative(REPO_ROOT, OUT_FILE));
    console.log('  css primitives: ' + apiSorted.css.primitives.length);
    console.log('  css components: ' + apiSorted.css.components.length);
    console.log('  data attrs:     ' + apiSorted.data.length);
    console.log('  events:         ' + apiSorted.events.length);
    console.log('  js modules:     ' + apiSorted.js.length);
}

main();
