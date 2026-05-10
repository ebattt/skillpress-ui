/**
 * check-contract.cjs
 *
 * Verifica che il contratto pubblico in `dist/public-api.json` sia
 * coerente con i sorgenti correnti e che nessun bundle leakino
 * classi non-pubbliche.
 *
 * Esiti:
 *   exit 0 se tutto pass.
 *   exit 1 se anomalie gravi (voci fantasma, leakage, classi legacy residue,
 *           rimozione voci senza bump major).
 *
 * Verifiche:
 *   1. Ogni voce in `public-api.json` esiste effettivamente nei sorgenti.
 *   2. Bundle in `bundles/` non contengono classi `sp-*` non-`@public`.
 *      Le classi non `sp-*` in `bundles/` sono "domain-scoped" (component
 *      classes) e sono accettate solo se il componente CSS esiste in
 *      `components/`.
 *   3. Nessuna classe `cz-*`, `dash-*`, `td-*` legacy presente nei sorgenti
 *      (primitives + components + bundles).
 *   4. Diff con la versione precedente di `public-api.json` (se disponibile
 *      nel git log o in un backup): se voci pubbliche sono state rimosse,
 *      `package.json` deve avere bump major. Stub: oggi non abbiamo
 *      previous-snapshot committato; il check resta avvisato.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const PRIMITIVES_DIR = path.join(REPO_ROOT, 'primitives');
const COMPONENTS_DIR = path.join(REPO_ROOT, 'components');
const JS_DIR = path.join(REPO_ROOT, 'js');
const BUNDLES_DIR = path.join(REPO_ROOT, 'bundles');
const PUBLIC_API = path.join(REPO_ROOT, 'dist', 'public-api.json');

function readJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function listFiles(dir, ext) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((n) => n.endsWith(ext)).map((n) => path.join(dir, n));
}

function readAll(files) {
    return files.map((f) => ({ file: f, content: fs.readFileSync(f, 'utf8') }));
}

function classesInContent(content) {
    const re = /\.([a-zA-Z][a-zA-Z0-9_-]*)/g;
    const set = new Set();
    let m;
    while ((m = re.exec(content)) !== null) set.add(m[1]);
    return set;
}

function dataAttrsInContent(content) {
    const re = /data-[a-z][a-z0-9-]*/g;
    const set = new Set();
    let m;
    while ((m = re.exec(content)) !== null) set.add(m[0]);
    return set;
}

function eventsInContent(content) {
    const re = /sp:[a-z][a-z0-9-]*:[a-z][a-z0-9-]*/g;
    const set = new Set();
    let m;
    while ((m = re.exec(content)) !== null) set.add(m[0]);
    return set;
}

function getPreviousPublicApi() {
    // Tenta di leggere la versione precedente di dist/public-api.json
    // committata nel git tree corrente (HEAD). Se non esiste o non
    // siamo in un repo git, ritorna null.
    try {
        const out = execSync('git show HEAD:dist/public-api.json', {
            cwd: REPO_ROOT,
            stdio: ['ignore', 'pipe', 'ignore']
        }).toString('utf8');
        return JSON.parse(out);
    } catch (e) {
        return null;
    }
}

function bumpKind(prev, curr) {
    // Restituisce 'major' | 'minor' | 'patch' | 'same' | 'unknown'.
    if (!prev || !curr) return 'unknown';
    const pa = String(prev).split(/[.-]/).map(Number);
    const ca = String(curr).split(/[.-]/).map(Number);
    if (ca[0] > pa[0]) return 'major';
    if (ca[1] > pa[1]) return 'minor';
    if (ca[2] > pa[2]) return 'patch';
    return 'same';
}

function main() {
    const errors = [];
    const warnings = [];

    if (!fs.existsSync(PUBLIC_API)) {
        console.error('check-contract: dist/public-api.json mancante. Esegui prima `npm run build:public-api`.');
        process.exit(1);
    }

    const api = readJson(PUBLIC_API);
    const pkg = readJson(path.join(REPO_ROOT, 'package.json'));

    // ---- 1. Voci API esistono nei sorgenti ----
    const primitiveFiles = readAll(listFiles(PRIMITIVES_DIR, '.css'));
    const componentFiles = readAll(listFiles(COMPONENTS_DIR, '.css'));
    const jsFiles = readAll(listFiles(JS_DIR, '.js'));

    const allCssClasses = new Set();
    for (const f of primitiveFiles.concat(componentFiles)) {
        for (const cls of classesInContent(f.content)) allCssClasses.add(cls);
    }
    const allDataAttrs = new Set();
    for (const f of jsFiles.concat(primitiveFiles).concat(componentFiles)) {
        for (const a of dataAttrsInContent(f.content)) allDataAttrs.add(a);
    }
    const allEvents = new Set();
    for (const f of jsFiles) {
        for (const e of eventsInContent(f.content)) allEvents.add(e);
    }
    const allJsExports = new Set();
    for (const f of jsFiles) {
        const re = /\b(?:ns|namespace)\.([A-Z][A-Za-z0-9]+)\s*=\s*\{/g;
        let m;
        while ((m = re.exec(f.content)) !== null) allJsExports.add(m[1]);
    }

    for (const cls of api.css.primitives) {
        const bare = cls.replace(/^\./, '');
        if (!allCssClasses.has(bare)) {
            errors.push('Classe primitive nel public-api ma assente nei sorgenti: ' + cls);
        }
    }
    const componentNamesInDir = new Set(
        listFiles(COMPONENTS_DIR, '.css').map((p) => path.basename(p, '.css'))
    );
    for (const c of api.css.components) {
        if (!componentNamesInDir.has(c)) {
            errors.push('Component nel public-api ma assente in components/: ' + c);
        }
    }
    for (const a of api.data) {
        if (!allDataAttrs.has(a)) {
            errors.push('Data-attr nel public-api ma assente nei sorgenti: ' + a);
        }
    }
    for (const e of api.events) {
        if (!allEvents.has(e)) {
            errors.push('Event nel public-api ma assente nei sorgenti: ' + e);
        }
    }
    for (const j of api.js) {
        if (!allJsExports.has(j)) {
            errors.push('JS module nel public-api ma assente nei sorgenti: ' + j);
        }
    }

    // ---- 2. Bundles non leakano classi sp-* non-pubbliche ----
    const publicCssSet = new Set(api.css.primitives.map((c) => c.replace(/^\./, '')));
    const componentClassesByFile = {};
    for (const cf of componentFiles) {
        componentClassesByFile[path.basename(cf.file, '.css')] = classesInContent(cf.content);
    }

    const bundleFiles = readAll(listFiles(BUNDLES_DIR, '.css'));
    for (const bundle of bundleFiles) {
        const bundleName = path.basename(bundle.file);
        const bundleClasses = classesInContent(bundle.content);
        for (const cls of bundleClasses) {
            if (cls.indexOf('sp-') === 0) {
                if (!publicCssSet.has(cls)) {
                    errors.push('Bundle ' + bundleName + ' contiene classe sp-* non-pubblica: .' + cls);
                }
                continue;
            }
            // Non-sp class: deve essere domain-scoped, ovvero appartenere
            // ad almeno un component file pubblico.
            let foundIn = null;
            for (const compName of Object.keys(componentClassesByFile)) {
                if (componentClassesByFile[compName].has(cls)) {
                    foundIn = compName;
                    break;
                }
            }
            if (!foundIn) {
                // Eccezioni: classi note di base/utility/tokens (es. utility
                // helpers, body class). Ignorate se prefissate `u-` o se
                // sono classi pseudo-stato come `is-`, `has-`.
                if (/^(u-|is-|has-|js-)/.test(cls)) continue;
                // Skip classi tipiche del browser/test (es. `material-symbols-outlined`).
                warnings.push('Bundle ' + bundleName + ' contiene classe domain non riconducibile a un component pubblico: .' + cls);
            }
        }
    }

    // ---- 3. Classi legacy residue ----
    // Allineato con `check-legacy.cjs` (tolleranza max via CHECK_LEGACY_MAX,
    // default 0). Nessuna classe legacy deve essere presente nei bundle.
    const legacyMax = Number.isFinite(Number(process.env.CHECK_LEGACY_MAX))
        ? Number(process.env.CHECK_LEGACY_MAX)
        : 0;
    // Pattern: cz-* (banned), dash-* eccetto dashboard- (banned), td-* (banned).
    const legacyChecks = [
        { re: /\.cz-[a-zA-Z0-9_-]+/g, label: 'cz-' },
        { re: /\.dash-(?!board)[a-zA-Z0-9_-]+/g, label: 'dash-' },
        { re: /\.td-[a-zA-Z0-9_-]+/g, label: 'td-' }
    ];
    const scanRoots = primitiveFiles.concat(componentFiles).concat(bundleFiles);
    let legacyCount = 0;
    const legacyHits = [];
    for (const f of scanRoots) {
        for (const lc of legacyChecks) {
            let m;
            const re = new RegExp(lc.re.source, lc.re.flags);
            while ((m = re.exec(f.content)) !== null) {
                legacyCount++;
                legacyHits.push(path.relative(REPO_ROOT, f.file) + ': ' + m[0]);
            }
        }
    }
    if (legacyCount > legacyMax) {
        errors.push(
            'Classi legacy residue: ' + legacyCount + ' (max=' + legacyMax + '). ' +
            'Esempi: ' + legacyHits.slice(0, 5).join(', ')
        );
    } else if (legacyCount > 0) {
        warnings.push(
            'Classi legacy tollerate (' + legacyCount + '/' + legacyMax + '): documentate nel rename-map.'
        );
    }

    // ---- 4. Diff con versione precedente ----
    const prev = getPreviousPublicApi();
    if (prev && prev.css) {
        const prevPrim = new Set(prev.css.primitives || []);
        const currPrim = new Set(api.css.primitives);
        const prevData = new Set(prev.data || []);
        const currData = new Set(api.data);
        const prevEvents = new Set(prev.events || []);
        const currEvents = new Set(api.events);
        const prevJs = new Set(prev.js || []);
        const currJs = new Set(api.js);

        const removedPrim = [...prevPrim].filter((x) => !currPrim.has(x));
        const removedData = [...prevData].filter((x) => !currData.has(x));
        const removedEvents = [...prevEvents].filter((x) => !currEvents.has(x));
        const removedJs = [...prevJs].filter((x) => !currJs.has(x));
        const totalRemoved = removedPrim.length + removedData.length + removedEvents.length + removedJs.length;

        const addedPrim = [...currPrim].filter((x) => !prevPrim.has(x));
        const addedData = [...currData].filter((x) => !prevData.has(x));
        const addedEvents = [...currEvents].filter((x) => !prevEvents.has(x));
        const addedJs = [...currJs].filter((x) => !prevJs.has(x));
        const totalAdded = addedPrim.length + addedData.length + addedEvents.length + addedJs.length;

        if (totalRemoved > 0) {
            const kind = bumpKind(prev.version, api.version);
            if (kind !== 'major') {
                errors.push(
                    'Voci pubbliche rimosse (' + totalRemoved + ') ma version bump non e\' major. ' +
                    'prev=' + prev.version + ' curr=' + api.version + ' (kind=' + kind + ')'
                );
            }
        } else if (totalAdded > 0) {
            const kind = bumpKind(prev.version, api.version);
            if (kind === 'patch' || kind === 'same') {
                warnings.push(
                    'Voci pubbliche aggiunte (' + totalAdded + ') con bump ' + kind +
                    '. Atteso minor o major.'
                );
            }
        }
    } else {
        warnings.push('Nessuno snapshot precedente di public-api.json in git HEAD: skip diff semver.');
    }

    // ---- Output ----
    if (warnings.length) {
        console.log('check-contract: WARNINGS:');
        for (const w of warnings) console.log('  - ' + w);
    }
    if (errors.length) {
        console.error('check-contract: FAILED');
        for (const e of errors) console.error('  - ' + e);
        process.exit(1);
    }
    console.log('check-contract: OK');
    console.log('  primitives: ' + api.css.primitives.length);
    console.log('  components: ' + api.css.components.length);
    console.log('  data:       ' + api.data.length);
    console.log('  events:     ' + api.events.length);
    console.log('  js:         ' + api.js.length);
}

main();
