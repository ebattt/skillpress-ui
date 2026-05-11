# Changelog

Tutte le modifiche degne di nota sono documentate in questo file. Il formato
distingue **contract change** (breaking, richiede coordinamento backend) da
**visual change** (look-only, sicuro). Vedi `README.md` -> Versioning policy.

## 0.3.0-beta.3 -- 2026-05-11

### Visual change

- `--z-modal` elevato sopra `--z-mobile-bar` per garantire che i dialog
  intercettino correttamente i click anche con barre mobile fixed.
- Fix `ConfirmDialog` mobile: i bottoni cancel/confirm/close restano sopra la
  mobile bar nella product page.

## 0.3.0-beta.2 -- 2026-05-11

### Contract change

- `ConfirmDialog` pubblicato come contract pubblico installabile, con CSS, JS,
  data hook/eventi e voce in `dist/public-api.json`.

## 0.3.0-beta.1 -- 2026-05-10

Prima versione beta consolidata: chiude la roadmap "production readiness",
prepara handoff backend, blocca il contratto pubblico in
`dist/public-api.json` e mantiene gli shell di pagina nel consumer come
scaffold/reference, non come componenti libreria.

### Contract change (breaking)

- Primitives prefissate `sp-` (renaming big-bang dei 149 selettori
  catalogati nell'inventory). Pre-bump: `.button` -> `.sp-button`,
  `.accordion` -> `.sp-accordion`, etc.
- `data-*` component-scoped (133 attributi mappati). Pre-bump:
  `data-toggle` (generico) -> `data-orders-table-toggle`,
  `data-cart-product-card-toggle`, etc.
- Custom events normalizzati a `sp:{component}:{action}` (29 eventi pubblici).
  Esempi: `sp:accordion:open`, `sp:orders-table:row-toggle`,
  `sp:toggle-switch:change`. Gli alias legacy pre-beta con trattino
  (`sp:file-upload-box-open`) o senza formato `sp:{component}:{action}`
  (`toggle-switch:change`) sono rimossi.
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
