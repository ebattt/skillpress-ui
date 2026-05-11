#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * build-rename-map.cjs
 *
 * Trasforma i 3 inventory JSON (primitives, data-attrs, legacy) in
 * un'unica `rename-map.json` consumabile in fase 4 dal worker di apply.
 *
 * NON tocca CSS/JS/HTML. Crea solo il JSON.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INV_DIR = path.join(__dirname, 'inventory-out');
const PRIMITIVES_PATH = path.join(INV_DIR, 'primitives.json');
const DATA_ATTRS_PATH = path.join(INV_DIR, 'data-attrs.json');
const LEGACY_PATH = path.join(INV_DIR, 'legacy.json');
const OUT_PATH = path.join(INV_DIR, 'rename-map.json');

function fail(msg) {
  console.error('[build-rename-map] ERROR: ' + msg);
  process.exit(1);
}

function readJson(p) {
  if (!fs.existsSync(p)) {
    fail('inventory file mancante: ' + path.relative(ROOT, p) +
      '. Esegui prima `npm run inventory:all`.');
  }
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    fail('JSON invalido in ' + path.relative(ROOT, p) + ': ' + e.message);
  }
  return null;
}

// ------------------------------------------------------------
// Primitives
// ------------------------------------------------------------
function buildPrimitives(rawPrimitives) {
  // Le entry generate da subagent 02 hanno gia `new` valorizzato con il
  // prefisso `sp-`. Manteniamo idempotenza: se `new` e' null, lo deriviamo
  // applicando "sp-" al primo segmento del selettore.
  return rawPrimitives.map((entry) => {
    if (entry.new && typeof entry.new === 'string' && entry.new.length > 0) {
      return {
        old: entry.old,
        new: entry.new,
        file: entry.file,
        type: entry.type
      };
    }
    // Fallback: prepend sp- al primo segmento dopo il punto.
    // .button -> .sp-button
    // .button__icon -> .sp-button__icon
    // .button--primary -> .sp-button--primary
    let next = null;
    if (typeof entry.old === 'string' && entry.old.charAt(0) === '.') {
      next = '.sp-' + entry.old.slice(1);
    } else {
      next = entry.old;
    }
    return {
      old: entry.old,
      new: next,
      file: entry.file,
      type: entry.type
    };
  });
}

// ------------------------------------------------------------
// data-* split per contesto (eccezioni dichiarate dall'audit 04)
// ------------------------------------------------------------
const DATA_ATTR_OVERRIDES = {
  // data-order-id: split per contesto (audit 04)
  'data-order-id': {
    type: 'split',
    splits: [
      {
        new: 'data-recent-order-card-order-id',
        owner: 'recent-order-card',
        contextMatch: 'recent-order-card',
        filesHint: ['recent-order-card']
      },
      {
        new: 'data-orders-table-order-id',
        owner: 'orders-table',
        contextMatch: 'orders-table',
        filesHint: ['orders-table']
      }
    ]
  }
};

// Inferenza owner via file path. Se l'unico file di codice (non-story, non-doc)
// che contiene il data-attr e' chiaramente un componente, usiamo quel nome
// come owner. Le stories e i docs sono ignorati in fase di inferenza.
function inferOwnerFromFiles(files) {
  if (!Array.isArray(files) || files.length === 0) return null;
  // Prendi il basename senza estensione dei file js/css di componente.
  const candidates = new Set();
  for (const f of files) {
    if (typeof f !== 'string') continue;
    if (f.startsWith('js/') && f.endsWith('.js')) {
      candidates.add(path.basename(f, '.js'));
      continue;
    }
    if (f.startsWith('components/') && f.endsWith('.css')) {
      candidates.add(path.basename(f, '.css'));
      continue;
    }
    if (f.startsWith('primitives/') && f.endsWith('.css')) {
      candidates.add(path.basename(f, '.css'));
      continue;
    }
  }
  // Se non ci sono candidati da js/components/primitives, prova da stories.
  if (candidates.size === 0) {
    for (const f of files) {
      if (typeof f !== 'string') continue;
      if (f.startsWith('stories/') && f.endsWith('.stories.js')) {
        const name = path.basename(f, '.stories.js');
        candidates.add(name);
      }
    }
  }
  if (candidates.size === 1) {
    return Array.from(candidates)[0];
  }
  return null;
}

function buildDataAttrs(rawData) {
  const items = rawData.data || [];
  const out = [];
  const ambiguous = [];

  items.forEach((entry) => {
    // 3rd party: lasciare invariato, marcato keep
    if (entry.thirdParty) {
      out.push({
        old: entry.old,
        new: entry.old,
        owner: entry.owner || null,
        files: entry.files,
        keep: true,
        thirdParty: true,
        componentScoped: !!entry.componentScoped,
        action: 'keep'
      });
      return;
    }

    // gia component-scoped -> keep (no rename necessario)
    if (entry.componentScoped) {
      out.push({
        old: entry.old,
        new: entry.old,
        owner: entry.owner || null,
        files: entry.files,
        keep: true,
        thirdParty: false,
        componentScoped: true,
        action: 'keep'
      });
      return;
    }

    // override per attributi che vanno splittati per contesto
    if (DATA_ATTR_OVERRIDES[entry.old]) {
      const ovr = DATA_ATTR_OVERRIDES[entry.old];
      if (ovr.type === 'split') {
        ovr.splits.forEach((sp) => {
          out.push({
            old: entry.old,
            new: sp.new,
            owner: sp.owner,
            files: entry.files,
            keep: false,
            thirdParty: false,
            componentScoped: false,
            action: 'rename',
            context: 'split: ' + sp.contextMatch
          });
        });
        return;
      }
    }

    // mappa pre-popolata dall'inventory (owner + new gia decisi in audit)
    if (entry.new && typeof entry.new === 'string' && entry.new.length > 0) {
      out.push({
        old: entry.old,
        new: entry.new,
        owner: entry.owner || null,
        files: entry.files,
        keep: false,
        thirdParty: false,
        componentScoped: false,
        action: 'rename',
        context: entry.context || null
      });
      return;
    }

    // needsReview esplicito -> non tentare inferenza, lascia in ambiguous
    if (entry.needsReview) {
      ambiguous.push({
        kind: 'data-attr',
        old: entry.old,
        reason: entry.context || 'needsReview flag set',
        files: entry.files,
        review: 'manual: needsReview flag dall\'inventory'
      });
      return;
    }

    // Tentativo di inferenza owner dai file (quando l\'owner e\' univoco).
    const inferredOwner = inferOwnerFromFiles(entry.files);
    if (inferredOwner) {
      // costruisci nuovo nome: data-{owner}-{rest senza prefisso "data-"}
      const restOld = entry.old.replace(/^data-/, '');
      const inferredNew = 'data-' + inferredOwner + '-' + restOld;
      // Se il nuovo nome ripete owner (es. data-rating-rating), ottimizza.
      const ownerSlug = inferredOwner.replace(/[^a-z0-9]+/gi, '-');
      let finalNew = inferredNew;
      if (restOld.startsWith(ownerSlug + '-') || restOld === ownerSlug) {
        finalNew = 'data-' + restOld;
      }
      out.push({
        old: entry.old,
        new: finalNew,
        owner: inferredOwner,
        files: entry.files,
        keep: false,
        thirdParty: false,
        componentScoped: false,
        action: 'rename',
        context: 'inferred owner from files'
      });
      return;
    }

    // ambiguo: owner non univoco
    ambiguous.push({
      kind: 'data-attr',
      old: entry.old,
      reason: 'owner non definito; inventory ha new=null e file owner non univoco',
      files: entry.files,
      review: 'manual: assegnare owner + new prima di apply (fase 4)'
    });
  });

  return { dataAttrs: out, ambiguous: ambiguous };
}

// ------------------------------------------------------------
// Legacy: cz / td / dash / dashboard / riepilogo
// ------------------------------------------------------------

// dash -> dashboard rename, audit decisione: vincitore = dashboard-
function buildDashRename(rawDash, rawDashboard) {
  const dashboardClasses = new Set((rawDashboard || []).map((e) => e.class));
  const out = [];
  const conflicts = [];
  (rawDash || []).forEach((entry) => {
    const oldName = entry.class; // es. .dash-action-badge
    const newName = oldName.replace(/^\.dash-/, '.dashboard-');
    if (dashboardClasses.has(newName)) {
      conflicts.push({ old: oldName, new: newName });
    }
    out.push({
      old: oldName,
      new: newName,
      action: 'rename',
      files: entry.files
    });
  });
  return { entries: out, conflicts: conflicts };
}

// td-* (orders-table)
const TD_RENAME_MAP = {
  '.td-id': '.orders-table__cell--id',
  '.td-mobile-chevron': '.orders-table__cell--mobile-chevron',
  '.td-mobile-hide': '.orders-table__cell--mobile-hide',
  '.td-nowrap': '.orders-table__cell--nowrap',
  '.td-payment': '.orders-table__cell--payment',
  '.td-pezzi': '.orders-table__cell--pezzi',
  '.td-prodotti': '.orders-table__cell--prodotti',
  '.td-simplified-show': '.orders-table__cell--simplified-show',
  '.td-spedizione': '.orders-table__cell--spedizione',
  '.td-status': '.orders-table__cell--status',
  '.td-text-center': '.orders-table__cell--text-center',
  '.td-text-right': '.orders-table__cell--text-right',
  '.td-title': '.orders-table__cell--title',
  '.td-total': '.orders-table__cell--total'
};

function buildTdRename(rawTd) {
  const out = [];
  (rawTd || []).forEach((entry) => {
    const newName = TD_RENAME_MAP[entry.class] || null;
    out.push({
      old: entry.class,
      new: newName,
      action: newName ? 'rename' : null,
      files: entry.files
    });
  });
  return out;
}

// riepilogo-* (sidebar-totals)
const RIEPILOGO_RENAME_MAP = {
  '.riepilogo-btn': '.sidebar-totals__btn',
  '.riepilogo-container': '.sidebar-totals__container',
  '.riepilogo-content': '.sidebar-totals__content',
  '.riepilogo-content--visible': '.sidebar-totals__content--visible',
  '.riepilogo-empty': '.sidebar-totals__empty',
  '.riepilogo-error': '.sidebar-totals__error',
  '.riepilogo-header': '.sidebar-totals__header',
  '.riepilogo-indent': '.sidebar-totals__indent',
  '.riepilogo-muted': '.sidebar-totals__muted',
  '.riepilogo-placeholder': '.sidebar-totals__placeholder',
  '.riepilogo-row': '.sidebar-totals__row',
  '.riepilogo-row--indent': '.sidebar-totals__row--indent',
  '.riepilogo-section': '.sidebar-totals__section',
  '.riepilogo-section-header': '.sidebar-totals__section-header'
};

function buildRiepilogoRename(rawRiep) {
  const out = [];
  (rawRiep || []).forEach((entry) => {
    const newName = RIEPILOGO_RENAME_MAP[entry.class] || null;
    out.push({
      old: entry.class,
      new: newName,
      action: newName ? 'rename' : null,
      files: entry.files
    });
  });
  return out;
}

// cz-* — verifica usage reale; audit confermato che non sono usate fuori
// dal CSS sorgente (ricerca grep in lab/, stories/, js/,
// components/ ha 0 match per ognuna). Verifica double-check al runtime.
function searchClassUsage(className, scopeDirs) {
  // Ricerca semplice: leggi tutti i file di testo nei dir e cerca la
  // stringa class senza il punto iniziale.
  const needle = className.replace(/^\./, '');
  const exts = new Set(['.html', '.js', '.css', '.md', '.cjs', '.mjs', '.json', '.svg']);
  const hits = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    let stat;
    try {
      stat = fs.statSync(dir);
    } catch (e) {
      return;
    }
    if (!stat.isDirectory()) return;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const ent of entries) {
      if (ent.name === 'node_modules' || ent.name.startsWith('.')) continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (ent.isFile()) {
        const ext = path.extname(ent.name).toLowerCase();
        if (!exts.has(ext)) continue;
        let txt;
        try {
          txt = fs.readFileSync(full, 'utf8');
        } catch (e) {
          continue;
        }
        if (txt.indexOf(needle) !== -1) {
          hits.push(path.relative(ROOT, full));
        }
      }
    }
  }

  scopeDirs.forEach(walk);
  return hits;
}

function buildCzRename(rawCz) {
  // scope di ricerca usage (esclude il CSS sorgente in components/order-step-detail.css)
  const SCOPES = [
    path.join(ROOT, 'stories'),
    path.join(ROOT, 'js'),
    path.join(ROOT, 'components'),
    // consumer-libreria/lab live fuori dal repo libreria. Lo aggiungiamo se esiste.
    path.resolve(ROOT, '..', 'Skillpress-frontend', 'consumer-libreria', 'lab')
  ];
  // Mappatura proposta per i casi d'uso (applicata solo se classe risulta usata).
  const RENAME_HINTS = {
    '.cz-action-btn': '.order-step-detail__action-btn',
    '.cz-action-btn--change': '.order-step-detail__action-btn--change',
    '.cz-action-btn--confirm': '.order-step-detail__action-btn--confirm',
    '.cz-action-btn--upload': '.order-step-detail__action-btn--upload',
    '.cz-choice-btn': '.order-step-detail__choice-btn',
    '.cz-choice-btn--change': '.order-step-detail__choice-btn--change',
    '.cz-choice-btn--confirm': '.order-step-detail__choice-btn--confirm',
    '.cz-choice-group': '.order-step-detail__choice-group',
    '.cz-file-actions': '.order-step-detail__file-actions',
    '.cz-file-actions--stack': '.order-step-detail__file-actions--stack',
    '.cz-pending-count': '.order-step-detail__pending-count',
    '.cz-status-badge': '.order-step-detail__status-badge',
    '.cz-status-badge--confirmed': '.order-step-detail__status-badge--confirmed',
    '.cz-status-badge--neutral': '.order-step-detail__status-badge--neutral',
    '.cz-status-badge--replaced': '.order-step-detail__status-badge--replaced',
    '.cz-status-badge--tochange': '.order-step-detail__status-badge--tochange'
  };

  const out = [];
  let renameCount = 0;
  let deleteCount = 0;
  (rawCz || []).forEach((entry) => {
    // Cerca usage al di fuori del CSS sorgente in `components/order-step-detail.css`.
    const hits = searchClassUsage(entry.class, SCOPES)
      .filter((p) => p !== 'components/order-step-detail.css');
    const used = hits.length > 0;
    if (used) {
      renameCount++;
      out.push({
        old: entry.class,
        new: RENAME_HINTS[entry.class] || null,
        action: 'rename',
        files: entry.files,
        usageFound: hits
      });
    } else {
      deleteCount++;
      out.push({
        old: entry.class,
        new: null,
        action: 'delete',
        files: entry.files,
        usageFound: []
      });
    }
  });

  return { entries: out, renameCount: renameCount, deleteCount: deleteCount };
}

// ------------------------------------------------------------
// Big components: mappa esplicita di ownership
// (Audit 03 sezione "Componenti grandi")
// ------------------------------------------------------------
function buildBigComponents() {
  return {
    'sidebar-totals': {
      file: 'components/sidebar-totals.css',
      keep: [
        '.sidebar-totals',
        '.sidebar-totals__section',
        '.sidebar-totals__row',
        '.sidebar-totals__row--indent'
      ],
      rename: [
        { old: '.configurator-section', new: '.configurator__section', note: 'spostare in nuovo file configurator' },
        { old: '.sidebar-section', new: '.sidebar-totals__section', note: 'unifica con BEM block' },
        { old: '.riepilogo-row', new: '.sidebar-totals__row', note: 'legacy italiano -> BEM' },
        { old: '.riepilogo-row--indent', new: '.sidebar-totals__row--indent', note: 'legacy italiano -> BEM' }
      ],
      move: [
        { class: '.promo-field', to: 'components/promo-field.css', note: 'estrarre come componente autonomo' }
      ],
      replace: [
        { class: '.add-to-cart-btn', with: '.sp-button--primary', note: 'sostituire con primitive' }
      ]
    },
    'order-step-detail': {
      file: 'components/order-step-detail.css',
      keep: [
        '.order-step-detail',
        '.order-step-detail__banner'
      ],
      rename: [
        { old: '.step-status-banner', new: '.order-step-detail__banner', note: 'block annidato -> BEM element' }
      ],
      move: [
        { class: '.product-file-box', to: 'components/product-file-box.css', note: 'estrarre come componente autonomo' },
        { class: '.demo-step-btn', to: 'lab/demo-only', note: 'demo-only, non includere in bundle' }
      ],
      delete: [
        { prefix: '.cz-*', note: 'tutte le cz-* sono unused (vedi sezione legacy.cz)' }
      ]
    },
    'orders-table': {
      file: 'components/orders-table.css',
      keep: [
        '.orders-table',
        '.orders-table__row',
        '.orders-table__cell',
        '.orders-table__actions'
      ],
      rename: Object.keys(TD_RENAME_MAP).map((k) => ({
        old: k, new: TD_RENAME_MAP[k], note: 'td-* -> __cell--*'
      })),
      move: [],
      notes: 'celle dettaglio mobile -> normalizzare prefisso BEM in fase 4'
    },
    'related-products': {
      file: 'components/related-products.css',
      keep: [
        '.related-products'
      ],
      rename: [],
      move: [
        { class: '.catalog-grid--products', to: 'primitives/catalog-grid.css', note: 'shared con catalog-product-grid.css' },
        { class: '.catalog-section-label', to: 'primitives/catalog-grid.css', note: 'shared, leakage globale' }
      ],
      notes: 'fase 4: estrarre primitive sp-catalog-grid condivisa'
    },
    'mobile-bar': {
      file: 'components/mobile-bar.css',
      keep: [
        '.mobile-bar'
      ],
      rename: Object.keys(RIEPILOGO_RENAME_MAP).map((k) => ({
        old: k, new: RIEPILOGO_RENAME_MAP[k], note: 'riepilogo-* -> sidebar-totals__*'
      })),
      move: [],
      notes: 'mobile-bar embedda copie delle classi riepilogo-*; rinominate via mappa sidebar-totals'
    },
    'quote-request-table': {
      file: 'components/quote-request-table.css',
      keep: [
        '.quote-request-table',
        '.quote-request-table__row',
        '.quote-request-table__cell'
      ],
      rename: [],
      move: [],
      notes: 'estrarre mappa puntuale in fase 4 quando i selettori sono enumerati'
    }
  };
}

// ------------------------------------------------------------
// Build & Write
// ------------------------------------------------------------
function main() {
  const rawPrimitives = readJson(PRIMITIVES_PATH);
  const rawDataAttrs = readJson(DATA_ATTRS_PATH);
  const rawLegacy = readJson(LEGACY_PATH);

  const primitives = buildPrimitives(rawPrimitives.primitives || []);
  const da = buildDataAttrs(rawDataAttrs);
  const dashRes = buildDashRename(rawLegacy.dash, rawLegacy.dashboard);
  const tdEntries = buildTdRename(rawLegacy.td);
  const riepilogoEntries = buildRiepilogoRename(rawLegacy.riepilogo);
  const czRes = buildCzRename(rawLegacy.cz);

  const out = {
    generatedAt: new Date().toISOString(),
    sourceVersion: rawPrimitives.sourceVersion ||
      rawDataAttrs.sourceVersion ||
      rawLegacy.sourceVersion ||
      'unknown',
    decisions: {
      dashWinner: 'dashboard-',
      czRenameVsDelete: {
        rename: czRes.renameCount,
        delete: czRes.deleteCount
      }
    },
    primitives: primitives,
    dataAttrs: da.dataAttrs,
    legacy: {
      cz: czRes.entries,
      td: tdEntries,
      dash: dashRes.entries,
      dashboard: (rawLegacy.dashboard || []).map((e) => ({
        old: e.class,
        new: e.class,
        action: 'keep',
        files: e.files
      })),
      riepilogo: riepilogoEntries
    },
    bigComponents: buildBigComponents(),
    ambiguous: da.ambiguous,
    dashConflicts: dashRes.conflicts
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + '\n', 'utf8');

  const summary = {
    primitives: primitives.length,
    dataAttrs: da.dataAttrs.length,
    dataAttrsRename: da.dataAttrs.filter((x) => x.action === 'rename').length,
    legacyCzTotal: czRes.entries.length,
    legacyCzRename: czRes.renameCount,
    legacyCzDelete: czRes.deleteCount,
    legacyTd: tdEntries.length,
    legacyDash: dashRes.entries.length,
    legacyRiepilogo: riepilogoEntries.length,
    bigComponents: Object.keys(out.bigComponents).length,
    ambiguous: da.ambiguous.length,
    dashConflicts: dashRes.conflicts.length
  };

  console.log('[build-rename-map] OK');
  console.log('[build-rename-map] output: ' + path.relative(ROOT, OUT_PATH));
  console.log('[build-rename-map] summary: ' + JSON.stringify(summary, null, 2));
}

main();
