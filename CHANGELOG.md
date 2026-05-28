# Changelog

Questo file registra solo cambiamenti utili al contract o al runtime.

## Corrente

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
  configurabile via `--image-gallery-aspect-ratio`; il consumer puo' passare
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

Usare:

- `Contract change` per modifiche a classi, markup minimo, hook `data-*`,
  eventi o moduli JS pubblici.
- `Visual change` per modifiche solo estetiche.
- `Hardening` per fix interni senza cambio di contract.
