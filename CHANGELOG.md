# Changelog

Questo file registra solo cambiamenti utili al contract o al runtime.

## Corrente (0.5.0)

- **Versione: 0.5.0**
- **Contract HTML cambiato: sì** (la shell del sito — navbar + footer — è
  diventata bundle di libreria con markup canonico, e sono stati aggiunti
  componenti come `LandingInfoTabs` e `ConfirmDialog`; vedi i `Contract change`
  qui sotto).

- Infra/CDN: artefatto pubblico allineato al link stabile
  `https://skillpress-ui.pages.dev/skillpress-ui`, superficie pubblica
  `css/*.css`, `js/*.js`, `fonts/**`, `manifest.json` e `public-api.json`.
  Il backend carica gli asset direttamente dal CDN con il link stabile.
- Infra/CDN: `dist/demo-minimal.css` viene generato e pubblicato come
  `css/demo-minimal.css` per le `demo-pages` e `lab`; non è un bundle backend
  production.
- Hardening: aggiunto `npm run verify:cdn` per verificare manifest, asset
  principali, header CDN e hash `sha384` dopo il deploy.
- Contract change: la **shell del sito** (navbar + footer: top-bar, main navbar,
  categorie, mega/mobile menu, cart, footer) è ora un bundle di libreria
  (`bundles/shell.css` → `dist/shell.css`), **fonte canonica** del CSS del telaio:
  il backend lo consuma dal package e droppa la copia locale. Font self-hostati
  (Manrope + subset Material Symbols, nessun Google Fonts). De-conflittato per
  coesistere con i bundle d'area (token/reset da una sola fonte, namespace
  `--shell-*`). Vedi sezione "Shell Del Sito" del README.
- Hardening: reset globale aggiornato da `body { overflow-x: hidden; }` a
  `html, body { overflow-x: clip; }` per mantenere lo scroll verticale
  naturale nelle integrazioni con navbar/footer e prevenire overflow
  orizzontale senza creare scroll container sul `body`.
- Contract change: aggiunto `LandingInfoTabs`, componente tab per dividere i
  testi landing in pannelli CMS (`Presentazione`, `Vision`, `Mission`,
  `Servizi`, `Consegna`, `Pagamento`) con keyboard navigation.
- Visual change: `CatalogCard--product-equal` usa uno slot immagine
  `1 / 1` e titolo clampato a 2 righe; l'altezza card deriva da titolo,
  padding e slot immagine invece che da un ratio fisso della card.
- Hardening: `ImageGallery` espone il modifier CSS `.image-gallery--single`
  per nascondere i controlli quando il CMS/consumer ha 0 o 1 immagine.
- Contract change: `ImageGallery` usa `object-fit: contain` e supporta ratio
  configurabile via `--image-gallery-aspect-ratio`; il consumer può passare
  `width`/`height` per slide mantenendo fallback 1:1.
- Contract change: gli attributi immagine backend-owned includono
  `decoding` e `fetchpriority` accanto a `loading` nei componenti immagine.
- Hardening: reset CSS e input numerici allineati ai warning editor
  `appearance` mantenendo i prefissi browser necessari; rimosso
  `vertical-align` non efficace dai media block-level del reset.
- Visual change: `OrdersTable` compatta meglio la dashboard mobile/tablet
  nascondendo `Pagamento` e `Totale` dalla riga principale fino a `1023px`;
  i valori restano nella riga dettagli mobile.
- Hardening: `OrdersTable` evita min-width rigide del titolo e overflow della
  riga dettagli sotto `640px`.
- `ConfirmDialog` pubblicato nel contract pubblico con CSS, JS, hook `data-*`,
  eventi e voce in `dist/public-api.json`.
- `--z-modal` elevato sopra `--z-mobile-bar` per evitare che barre mobile fixed
  intercettino i click dei dialog.
- Public API consolidata per classi CSS, attributi `data-*`, eventi `sp:*` e
  moduli JS esposti da `window.SkillpressUI`.
- Gate di publish: naming, legacy leakage, data attrs, init contract, colori,
  CSS variables, breakpoint, build dist, pack check e contract check.

## Regola

Ogni release DEVE aprire con due righe obbligatorie:

- `**Versione: <x.y.z>**`
- `**Contract HTML cambiato: sì/no**` — `sì` se cambia markup/classi/hook
  `data-*`/eventi che il backend deve aggiornare; `no` se è solo
  estetica/hardening/infra.

Per i singoli punti usare:

- `Contract change` per modifiche a classi, markup minimo, hook `data-*`,
  eventi o moduli JS pubblici.
- `Visual change` per modifiche solo estetiche.
- `Hardening` per fix interni senza cambio di contract.
