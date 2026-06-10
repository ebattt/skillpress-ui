/**
 * check-shell-isolation.cjs
 *
 * Garantisce che i partial in `shell/` non possano contaminare le altre
 * pagine quando `bundles/shell.css` coesiste con un bundle d'area. Due regole:
 *
 *   (a) NESSUN partial in shell/ definisce un nome di custom property gia'
 *       presente in tokens/tokens.css. (I token condivisi hanno UNA sola fonte
 *       di verita': tokens.css. La shell usa --shell-* per i suoi valori.)
 *
 *   (b) NESSUN selettore di ELEMENTO globale non scopato nei partial shell:
 *       top-level `*`, `html`, `body`, `a`, `button`, `img`, `svg`, `video`,
 *       `ul`, `ol`, `li`, `p`, `h1`-`h6`, `input`, `select`, `textarea`,
 *       `table`, `[role=...]`, o un selettore che inizia con uno pseudo
 *       (`:focus`, `::before`, ...) — a meno che il selettore sia scopato a
 *       un contenitore shell (contiene una classe `.` o un id `#`).
 *       `:root` / `:host` (sole custom properties, nessuna proprieta' visiva)
 *       sono ammessi. Eccezioni motivate: marcatore `shell-isolation:
 *       allow-global` in un commento immediatamente precedente.
 *
 * Output: `path:line: messaggio`. Exit 1 se viola, 0 se pulito.
 *
 * Uso:  node scripts/check-shell-isolation.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const SHELL_DIR = path.join(REPO_ROOT, 'shell');
const TOKENS_FILE = path.join(REPO_ROOT, 'tokens', 'tokens.css');

const ALLOW_MARKER = 'shell-isolation: allow-global';

// Elementi globali vietati come SUBJECT non scopato.
const GLOBAL_ELEMENTS = [
  '\\*', 'html', 'body', 'a', 'button', 'img', 'svg', 'video',
  'ul', 'ol', 'li', 'p', 'h[1-6]', 'input', 'select', 'textarea',
  'table', 'form', 'label', 'abbr', 'hr', 'figure', 'blockquote', 'menu',
];
// Un combinatore o inizio-stringa, poi l'elemento, poi un confine.
const ELEMENT_RE = new RegExp(
  '(^|[\\s>+~])(' + GLOBAL_ELEMENTS.join('|') + ')([\\s>+~.:#\\[]|$)',
);
const ROLE_RE = /(^|[\s>+~])\[role/;
const LEADING_PSEUDO_RE = /^::?[a-z-]/;

function collectTokenVars() {
  const t = fs.readFileSync(TOKENS_FILE, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const set = new Set();
  const re = /(--[a-zA-Z0-9_-]+)\s*:/g;
  let m;
  while ((m = re.exec(t)) !== null) set.add(m[1]);
  return set;
}

function listShellCss() {
  return fs
    .readdirSync(SHELL_DIR)
    .filter((f) => f.endsWith('.css'))
    .map((f) => path.join(SHELL_DIR, f));
}

/** Sostituisce i commenti con spazi/newline preservando offset e righe. */
function blankComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

function lineAt(src, idx) {
  let line = 1;
  for (let i = 0; i < idx && i < src.length; i++) if (src[i] === '\n') line++;
  return line;
}

/** Righe (1-based) che contengono il marcatore di whitelist, nel sorgente raw. */
function allowLines(rawSrc) {
  const set = new Set();
  rawSrc.split('\n').forEach((ln, i) => {
    if (ln.includes(ALLOW_MARKER)) set.add(i + 1);
  });
  return set;
}

/** Estrae le prelude dei blocchi { ... }, con riga di inizio. */
function extractPreludes(src) {
  const out = [];
  let start = 0;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === '{' || c === '}' || c === ';') {
      if (c === '{') {
        const prelude = src.slice(start, i);
        out.push({ prelude, startIdx: start });
      }
      start = i + 1;
    }
  }
  return out;
}

function isScoped(part) {
  return /[.#]/.test(part); // contiene una classe o un id -> scopato
}

function isAtRule(prelude) {
  return /(^|[\s])@[a-z]/i.test(prelude.trim());
}

function violatesB(part) {
  const p = part.trim();
  if (p === '') return false;
  if (/^:root\b/.test(p) || /^:host\b/.test(p)) return false;
  if (isScoped(p)) return false;
  if (ELEMENT_RE.test(p)) return true;
  if (ROLE_RE.test(p)) return true;
  if (LEADING_PSEUDO_RE.test(p)) return true;
  return false;
}

function main() {
  const tokenVars = collectTokenVars();
  const files = listShellCss();
  const violations = [];

  for (const file of files) {
    const rel = path.relative(REPO_ROOT, file);
    const raw = fs.readFileSync(file, 'utf8');
    const src = blankComments(raw);
    const allow = allowLines(raw);

    // (a) custom property che ombreggia un token condiviso
    const defRe = /(--[a-zA-Z0-9_-]+)\s*:/g;
    let dm;
    while ((dm = defRe.exec(src)) !== null) {
      const name = dm[1];
      if (tokenVars.has(name)) {
        violations.push({
          file: rel,
          line: lineAt(src, dm.index),
          msg: `(a) ridefinisce token condiviso ${name} (fonte unica: tokens/tokens.css)`,
        });
      }
    }

    // (b) selettori di elemento globali non scopati
    for (const { prelude, startIdx } of extractPreludes(src)) {
      if (isAtRule(prelude)) continue;
      // whitelist a livello di regola: marcatore nelle 3 righe che precedono
      // l'inizio della prelude (o dentro la prelude stessa).
      const preludeStartLine = lineAt(src, startIdx);
      const preludeEndLine = lineAt(src, startIdx + prelude.length);
      let whitelisted = false;
      for (let l = preludeStartLine - 3; l <= preludeEndLine; l++) {
        if (l >= 1 && allow.has(l)) whitelisted = true;
      }
      if (whitelisted) continue;
      const parts = prelude.split(',');
      let offset = startIdx;
      for (const part of parts) {
        if (violatesB(part)) {
          const line = lineAt(src, offset + (part.length - part.trimStart().length));
          violations.push({
            file: rel,
            line,
            msg: `(b) selettore globale non scopato: "${part.trim()}"`,
          });
        }
        offset += part.length + 1; // +1 per la virgola
      }
    }
  }

  if (violations.length === 0) {
    process.stdout.write(
      `check-shell-isolation: 0 violazioni (${files.length} partial shell).\n`,
    );
    process.exit(0);
  }
  process.stdout.write(`check-shell-isolation: ${violations.length} violazioni.\n`);
  for (const v of violations) process.stdout.write(`${v.file}:${v.line}: ${v.msg}\n`);
  process.exit(1);
}

main();
