# Changelog

Tutte le modifiche degne di nota sono documentate in questo file. Il formato
distingue **contract change** (breaking, richiede coordinamento backend) da
**visual change** (look-only, sicuro). Vedi `README.md` -> Versioning policy.

## 0.3.0-beta.1 -- 2026-05-08

Prima versione beta consolidata: chiude la roadmap "production readiness"
2026-05-08 (10 prompt), prepara handoff backend, blocca il contratto pubblico
in `dist/public-api.json`.

### Contract change (breaking)

- Primitives prefissate `sp-` (renaming big-bang dei 149 selettori
  catalogati nell'inventory). Pre-bump: `.button` -> `.sp-button`,
  `.accordion` -> `.sp-accordion`, etc.
- `data-*` component-scoped (133 attributi mappati). Pre-bump:
  `data-toggle` (generico) -> `data-orders-table-toggle`,
  `data-cart-product-card-toggle`, etc.
- Custom events normalizzati a `sp:{component}:{action}` (29 eventi pubblici).
  Esempi: `sp:accordion:open`, `sp:orders-table:row-toggle`,
  `sp:toggle-switch:change`. Per la transizione gli alias legacy senza
  prefisso `sp:` sono **deprecati e rimossi in v0.3**.
- Classi legacy `cz-*`, `dash-*` (eccetto `dashboard-*`), `td-*` rimosse o
  rinominate. La cella mobile tabella usa ora
  `.orders-table__cell--mobile-chevron` e relativi elementi BEM.

### Visual change

- Token semantici aggiunti: `--color-warning-soft`, `--color-danger-soft`,
  `--color-success-soft` (vedi `tokens/tokens.css`).
- Breakpoint canon mobile-first: 640 / 1024 / 1280 px.
- A11y: focus restore in `Preview`, `InfoDropdown`, `FileUploadBox`.
- Tastiera: `OrdersTable` row-toggle ora supporta Enter/Space.

### Hardening

- `window.SkillpressUI.init(scope)` aggregator: invoca tutti gli init dei
  componenti registrati, idempotente per scope.
- Helper `_helpers.js`: `safeUrl`, `escapeHtml`, `dispatch`, `autoInit`,
  `validateAttrName`.
- Fix XSS potenziale in `orders-table` mobile detail rendering (escape su
  attributi e label).
- Tutti i 19 componenti JS espongono `Component.init(scope)` idempotente.

### Tooling

- `dist/public-api.json` derivato da annotazioni `@public`,
  `@public-data`, `@public-event` nei sorgenti
  (`scripts/build-public-api.cjs`).
- `scripts/check-contract.cjs`: verifica che ogni voce nel public-api esista
  nei sorgenti, che i bundle non leakino classi non-pubbliche, e che
  rimozioni di voci pubbliche siano accompagnate da bump major.
- `npm run check` aggregato (naming + legacy + data-attrs + init-contract +
  colori + css-vars + breakpoints + build:dist + pack:check).
- I gate `check:legacy`, `check:hardcoded-colors`, `check:css-vars`,
  `check:breakpoints` e consumer shell leakage girano senza soglie nel percorso
  standard.
- `prepublishOnly` hook: `check` + `build:public-api` + `check:contract`.
- `.npmignore` complementare a `package.json#files` (defense in depth).
- `package.json`: `license: UNLICENSED`, `engines.node >=18`,
  `sideEffects: false`.
