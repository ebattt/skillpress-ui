#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * validate-rename-map.cjs
 *
 * Verifica integrita di scripts/inventory-out/rename-map.json:
 *   1. ogni primitives[].new !=null e prefissato `.sp-`;
 *   2. ogni dataAttrs[].new !=null per voci non-3rd-party non-componentScoped
 *      con action == "rename";
 *   3. nessun conflitto: due voci con stesso `new` ma `old` differenti;
 *   4. nessuna classe cz-* con action == null;
 *   5. dash-X non collide con dashboard-X gia esistente;
 *   6. bigComponents ha tutte le 6 entry attese;
 *   7. ambiguous vuoto, oppure ogni entry ha reason + review.
 *
 * Exit 0 se pass, 1 con report dettagliato se fail.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MAP_PATH = path.join(__dirname, 'inventory-out', 'rename-map.json');

function readMap() {
  if (!fs.existsSync(MAP_PATH)) {
    console.error('[validate-rename-map] ERROR: rename-map.json non trovato. Esegui prima `npm run rename-map:build`.');
    process.exit(1);
  }
  try {
    return JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
  } catch (e) {
    console.error('[validate-rename-map] ERROR: rename-map.json invalido: ' + e.message);
    process.exit(1);
  }
  return null;
}

const REQUIRED_BIG_COMPONENTS = [
  'sidebar-totals',
  'order-step-detail',
  'orders-table',
  'related-products',
  'mobile-bar',
  'quote-request-table'
];

function main() {
  const m = readMap();
  const errors = [];
  const warnings = [];

  // 1) primitives
  const primitives = Array.isArray(m.primitives) ? m.primitives : [];
  if (primitives.length === 0) {
    errors.push('primitives[]: array vuoto');
  }
  primitives.forEach((p, i) => {
    if (!p.new || typeof p.new !== 'string') {
      errors.push('primitives[' + i + ']: new mancante per old=' + JSON.stringify(p.old));
      return;
    }
    if (!p.new.startsWith('.sp-')) {
      errors.push('primitives[' + i + ']: new non prefissato `.sp-`: ' + p.new + ' (old=' + p.old + ')');
    }
  });

  // 2) dataAttrs: voci con action == "rename" devono avere new
  const dataAttrs = Array.isArray(m.dataAttrs) ? m.dataAttrs : [];
  dataAttrs.forEach((d, i) => {
    if (d.action === 'rename') {
      if (!d.new || typeof d.new !== 'string') {
        errors.push('dataAttrs[' + i + ']: action=rename ma new mancante per old=' + JSON.stringify(d.old));
      }
    } else if (d.action === 'keep') {
      // keep: new dovrebbe essere uguale a old
      if (d.new !== d.old) {
        warnings.push('dataAttrs[' + i + ']: action=keep ma new!=old (old=' + d.old + ', new=' + d.new + ')');
      }
    } else if (d.action == null) {
      errors.push('dataAttrs[' + i + ']: action mancante per old=' + JSON.stringify(d.old));
    }
  });

  // 3) conflitti new duplicati
  const newToOlds = {};
  function track(map, oldName, newName, scope) {
    if (!newName) return;
    const key = scope + '::' + newName;
    if (!map[key]) map[key] = new Set();
    map[key].add(oldName);
  }
  primitives.forEach((p) => track(newToOlds, p.old, p.new, 'css'));
  // dataAttrs in scope dataset (non collidono con classi CSS)
  const dataAttrConflicts = {};
  dataAttrs.forEach((d) => {
    if (d.action === 'rename') track(dataAttrConflicts, d.old, d.new, 'data');
  });
  // legacy cz/td/dash/riepilogo/dashboard contribuiscono anche al namespace CSS
  const legacy = m.legacy || {};
  ['cz', 'td', 'dash', 'dashboard', 'riepilogo'].forEach((bucket) => {
    (legacy[bucket] || []).forEach((entry) => {
      if (entry.action === 'rename' && entry.new) {
        track(newToOlds, entry.old, entry.new, 'css');
      }
    });
  });

  Object.keys(newToOlds).forEach((key) => {
    const olds = Array.from(newToOlds[key]);
    if (olds.length > 1) {
      errors.push('conflict (' + key + '): piu old mappano sullo stesso new -> ' + JSON.stringify(olds));
    }
  });
  Object.keys(dataAttrConflicts).forEach((key) => {
    const olds = Array.from(dataAttrConflicts[key]);
    if (olds.length > 1) {
      // data-order-id split su due new -> non e' conflitto sullo stesso new,
      // ma due old diversi su stesso new sarebbe.
      errors.push('conflict (' + key + '): piu data-attrs old mappano sullo stesso new -> ' + JSON.stringify(olds));
    }
  });

  // 4) cz-* nessuna con action null
  (legacy.cz || []).forEach((entry, i) => {
    if (!entry.action) {
      errors.push('legacy.cz[' + i + ']: action mancante per ' + entry.old);
    }
    if (entry.action !== 'delete' && entry.action !== 'rename') {
      errors.push('legacy.cz[' + i + ']: action invalido (' + entry.action + ') per ' + entry.old);
    }
    if (entry.action === 'rename' && !entry.new) {
      errors.push('legacy.cz[' + i + ']: action=rename ma new mancante per ' + entry.old);
    }
  });

  // 5) dash-X non collide con dashboard-X esistente
  if (Array.isArray(m.dashConflicts) && m.dashConflicts.length > 0) {
    m.dashConflicts.forEach((c) => {
      errors.push('dash conflict: .dash-X collide con .dashboard-X esistente -> old=' + c.old + ' new=' + c.new);
    });
  }

  // 6) bigComponents ha tutte le 6 entry
  const bc = m.bigComponents || {};
  REQUIRED_BIG_COMPONENTS.forEach((name) => {
    if (!bc[name]) {
      errors.push('bigComponents: entry mancante per ' + name);
    }
  });

  // 7) ambiguous vuoto o con motivazione + review
  const ambiguous = Array.isArray(m.ambiguous) ? m.ambiguous : [];
  ambiguous.forEach((a, i) => {
    if (!a.reason) {
      errors.push('ambiguous[' + i + ']: reason mancante per ' + JSON.stringify(a.old));
    }
    if (!a.review) {
      errors.push('ambiguous[' + i + ']: review/placeholder mancante per ' + JSON.stringify(a.old));
    }
  });

  // ------------------ report ------------------
  const summary = {
    primitives: primitives.length,
    dataAttrs: dataAttrs.length,
    dataAttrsRename: dataAttrs.filter((x) => x.action === 'rename').length,
    cz: (legacy.cz || []).length,
    czRename: (legacy.cz || []).filter((x) => x.action === 'rename').length,
    czDelete: (legacy.cz || []).filter((x) => x.action === 'delete').length,
    td: (legacy.td || []).length,
    dash: (legacy.dash || []).length,
    riepilogo: (legacy.riepilogo || []).length,
    bigComponents: Object.keys(bc).length,
    ambiguous: ambiguous.length,
    errors: errors.length,
    warnings: warnings.length
  };

  console.log('[validate-rename-map] summary: ' + JSON.stringify(summary, null, 2));

  if (warnings.length > 0) {
    console.log('[validate-rename-map] warnings:');
    warnings.forEach((w) => console.log('  - ' + w));
  }

  if (errors.length > 0) {
    console.error('[validate-rename-map] FAIL — ' + errors.length + ' errori:');
    errors.forEach((e) => console.error('  - ' + e));
    process.exit(1);
  }

  console.log('[validate-rename-map] PASS');
  process.exit(0);
}

main();
