/**
 * build-public.cjs
 *
 * Assembla l'artefatto statico scaricabile della libreria skillpress-ui.
 * Produce:
 *   - public/skillpress-ui-<version>/        (cartella distribuibile)
 *       css/            <- dist/*.css         (bundle self-contained, gia con sp-page__*)
 *       js/             <- js/*.js
 *       fonts/          <- fonts/
 *       public-api.json <- dist/public-api.json (contract)
 *       manifest.json   <- generato qui (inventario file + hash sha384 per
 *                          verifica interna; url SENZA versione, no SRI)
 *   - public/skillpress-ui-<version>.zip      (zip della cartella sopra)
 *
 * La versione e' letta da package.json.
 *
 * Prerequisito: dist/*.css + dist/public-api.json devono esistere e essere
 * aggiornati (rigenerati dall'Agent Layout via build:dist + build:public-api).
 * Se mancano, lo script li rigenera eseguendo i build relativi.
 *
 * Idempotente: pulisce e ricrea solo PKG_DIR + PKG_ZIP della versione corrente
 * a ogni esecuzione. Non cancella versioni precedenti sotto public/.
 * Nessuna dipendenza runtime/dev nuova: solo Node core + `zip` di sistema.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// Link stabile del CDN pubblico: un solo path SENZA versione. Il versionamento
// vive SOLO nel campo `version` / CHANGELOG / nome cartella archivio, mai negli
// URL. Il backend puo' usare questo path direttamente oppure sostituirlo con un
// ASSET_BASE locale/proxy mantenendo invariati i path relativi.
const BASE_PATH = '/skillpress-ui';

// hash sha384 per la VERIFICA INTERNA post-deploy (NON per SRI nei tag).
function sha384(filePath) {
  const buf = fs.readFileSync(filePath);
  return 'sha384-' + crypto.createHash('sha384').update(buf).digest('base64');
}

// Elenca ricorsivamente i file di una cartella, con path relativi POSIX.
function listFilesRel(dir, baseDir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFilesRel(abs, baseDir));
    } else if (entry.isFile()) {
      out.push(path.relative(baseDir, abs).split(path.sep).join('/'));
    }
  }
  return out;
}

const ROOT = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const VERSION = pkg.version;

const DIST_DIR = path.join(ROOT, 'dist');
const JS_DIR = path.join(ROOT, 'js');
const FONTS_DIR = path.join(ROOT, 'fonts');
const PUBLIC_DIR = path.join(ROOT, 'public');
const PKG_NAME = `skillpress-ui-${VERSION}`;
const PKG_DIR = path.join(PUBLIC_DIR, PKG_NAME);
const PKG_ZIP = path.join(PUBLIC_DIR, `${PKG_NAME}.zip`);

function log(msg) {
  process.stdout.write(`[build:public] ${msg}\n`);
}

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else if (entry.isFile()) {
      fs.copyFileSync(s, d);
    }
  }
}

// 1. Assicura che dist/*.css + dist/public-api.json siano aggiornati.
const distCss = fs.existsSync(DIST_DIR)
  ? fs.readdirSync(DIST_DIR).filter((f) => f.endsWith('.css'))
  : [];
if (distCss.length === 0) {
  log('dist/*.css mancante -> eseguo build:dist');
  execSync('npm run build:dist', { cwd: ROOT, stdio: 'inherit' });
}
if (!fs.existsSync(path.join(DIST_DIR, 'public-api.json'))) {
  log('dist/public-api.json mancante -> eseguo build:public-api');
  execSync('npm run build:public-api', { cwd: ROOT, stdio: 'inherit' });
}

// 2. Pulisci e ricrea PKG_DIR + PKG_ZIP (idempotente).
log(`versione: ${VERSION}`);
rmrf(PKG_DIR);
rmrf(PKG_ZIP);
fs.mkdirSync(PKG_DIR, { recursive: true });

// 3. css/ <- dist/*.css
const cssDest = path.join(PKG_DIR, 'css');
fs.mkdirSync(cssDest, { recursive: true });
const cssFiles = fs.readdirSync(DIST_DIR).filter((f) => f.endsWith('.css'));
for (const f of cssFiles) {
  fs.copyFileSync(path.join(DIST_DIR, f), path.join(cssDest, f));
}
log(`css/: ${cssFiles.length} bundle (${cssFiles.join(', ')})`);

// 4. js/ <- js/*.js
const jsDest = path.join(PKG_DIR, 'js');
fs.mkdirSync(jsDest, { recursive: true });
const jsFiles = fs.readdirSync(JS_DIR).filter((f) => f.endsWith('.js'));
for (const f of jsFiles) {
  fs.copyFileSync(path.join(JS_DIR, f), path.join(jsDest, f));
}
log(`js/: ${jsFiles.length} file`);

// 5. fonts/ <- fonts/
const fontsDest = path.join(PKG_DIR, 'fonts');
copyDir(FONTS_DIR, fontsDest);
log('fonts/: copiati');

// 6. public-api.json <- dist/public-api.json
fs.copyFileSync(
  path.join(DIST_DIR, 'public-api.json'),
  path.join(PKG_DIR, 'public-api.json')
);
log('public-api.json: copiato');

// 6b. manifest.json <- generato qui (riproducibile, non orfano).
//   Modello CDN stabile: basePath SENZA versione, url SENZA versione, hash
//   sha384 solo per verifica interna (NON SRI), cachePolicy no-cache.
//   Scelta: il manifest elenca tutti i file dell'artefatto (incluso
//   public-api.json) ma NON se stesso (manifest.json), per evitare il problema
//   del fixpoint (l'hash del manifest cambierebbe ogni volta che lo si scrive).
const manifestFiles = {};
const allRel = listFilesRel(PKG_DIR, PKG_DIR).sort();
for (const rel of allRel) {
  if (rel === 'manifest.json') continue; // il manifest non elenca se stesso
  const abs = path.join(PKG_DIR, rel);
  manifestFiles[rel] = {
    path: rel,
    url: `${BASE_PATH}/${rel}`,
    bytes: fs.statSync(abs).size,
    sha384: sha384(abs),
  };
}
const manifest = {
  name: pkg.name,
  version: VERSION,
  basePath: BASE_PATH,
  layout: {
    css: 'css/*.css',
    js: 'js/*.js',
    fonts: 'fonts/**',
    publicApi: 'public-api.json',
  },
  cachePolicy: 'Cache-Control: no-cache',
  files: manifestFiles,
};
fs.writeFileSync(
  path.join(PKG_DIR, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n'
);
log(`manifest.json: generato (${Object.keys(manifestFiles).length} file elencati)`);

// 7. zip dell'artefatto (zip di sistema, percorsi relativi a public/).
log(`creo zip: ${PKG_ZIP}`);
execSync(`zip -r -q "${PKG_NAME}.zip" "${PKG_NAME}"`, {
  cwd: PUBLIC_DIR,
  stdio: 'inherit',
});

const zipSize = fs.statSync(PKG_ZIP).size;
log(`fatto. PKG_DIR=${PKG_DIR}`);
log(`fatto. PKG_ZIP=${PKG_ZIP} (${(zipSize / 1024).toFixed(1)} KiB)`);
