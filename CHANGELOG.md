# Changelog

Questo file registra solo cambiamenti utili al contract o al runtime.

## Corrente (0.5.1)

- **Versione: 0.5.1**
- **Contract HTML cambiato: sì** (categoria prodotti e pagina tema espongono
  ora un `<h1>` esplicito dopo le breadcrumb; le dashboard mantengono un solo
  `<main>` top-level).

- Contract change: aggiunte le classi `public-page-layout__header` e
  `public-page-layout__title` al componente `public-page-layout`, usate per un
  titolo pagina semplice nelle pagine CMS pubbliche senza reintrodurre box o
  hero introduttivi.
- Contract change: il contenitore interno `dashboard-shell__main` deve essere
  un `div`/layout container, non un secondo `<main>`. Il landmark `main` resta
  solo `sp-page__main`.
- Hardening: i check del consumer falliscono se una static page ha piu' di un
  `<main>`, se manca l'unico `<h1>` richiesto o se contiene ID HTML duplicati.
- Docs: il markup contract backend documenta esplicitamente la regola "un solo
  main + un solo H1" per le pagine production.

## 0.5.0

- **Versione: 0.5.0**
- **Contract HTML cambiato: sì** (la shell del sito — navbar + footer — è
  diventata bundle di libreria con markup canonico, e sono stati aggiunti
  componenti come `LandingInfoTabs` e `ConfirmDialog`; vedi i `Contract change`
  qui sotto).

- Infra/CDN: artefatto pubblico allineato al link stabile
  `https://skillpress-ui.pages.dev/skillpress-ui`, superficie pubblica
  `css/*.css`, `js/*.js`, `fonts/**`, `manifest.json` e `public-api.json`.
  Il backend carica gli asset direttamente dal CDN con il link stabile.
- Infra/CDN: `npm run build:cdn` aggiorna anche
  `public/cdn-deploy/skillpress-ui`, la cartella stabile da deployare su
  Cloudflare Pages. Il versionamento resta interno (`package.json`,
  `CHANGELOG.md`, `manifest.json`, artefatto `public/skillpress-ui-<version>/`);
  gli URL CDN restano senza versione.
- Infra/CDN: documentato il flusso release in `docs/cdn-release.md`: niente
  cartella `/latest`, niente versione nel path CDN, deploy sempre di
  `public/cdn-deploy`.
- Contract change: aggiunto il bundle `css/public.css` per le pagine pubbliche
  CMS miste. Il caricamento atteso diventa `css/shell.css` + `css/public.css`
  per categoria prodotti, pagina tema, pagina testo/FAQ/contatti ed errore
  404.
- Contract change: aggiunto il componente unico `blog-linear-nav` al bundle
  `css/blog.css` e al bundle `css/public.css`, sostituendo i riferimenti
  separati `article-nav` e `blog-pagination`. Le pagine blog pubbliche caricano
  `css/shell.css` + `css/blog.css`; la navigazione e' server-rendered con link
  lineari "Post piu recenti" / "Post piu vecchi" nelle categorie e "Articolo
  precedente" / "Articolo successivo" negli articoli. Il blocco va omesso
  quando non ci sono link precedenti o successivi.
- Contract change: aggiunto `blog-feed-header` al bundle `css/blog.css` per
  allineare titolo e intro di home/categoria blog alla stessa griglia del feed.
- Contract change: aggiunto `blog-page-layout` al bundle `css/blog.css` per
  dare alle pagine blog un respiro finale coerente prima del footer, senza
  dipendere da wrapper consumer ad hoc.
- Visual change: `blog-page-layout`, `blog-feed-header` e la card featured del
  blog riallineano distanza da navbar, posizione H1 e ritmo verticale al
  riferimento attuale montato da Katia.
- Contract change: la navigazione articolo precedente/successivo viene
  renderizzata sotto al corpo articolo, come nel frontend storico.
- Contract change: il riferimento articolo blog include anche una sezione
  correlati larga sotto al corpo articolo, cosi' top navigation e corpo articolo
  mantengono larghezze prevedibili anche quando ci sono contenuti correlati.
- Contract change: `css/auth.css` e' ora un bundle auth autonomo: include font,
  Material Symbols, token/reset e stili auth, ma non importa piu' `shell.css`.
  Login, registrazione e password dimenticata devono caricare solo `css/auth.css`.
- Visual change: i trigger delle categorie nella barra grigia usano
  `font-weight: 600` per maggiore leggibilita', senza aumentare la dimensione
  del testo.
- Contract change: aggiunto il componente pubblico `error-state` al bundle
  `css/public.css`, usato per la pagina errore 404 con immagine sostituibile da
  CMS/backend.
- Contract change: aggiunto `public-page-layout` per uniformare l'allineamento
  e la distanza tra breadcrumb e contenuto nelle pagine pubbliche CMS miste.
- Visual change: le pagine testo pubbliche CMS usano lo stesso container base
  di categoria/tema; `text-block` non aggiunge piu' padding sopra al titolo
  dentro `public-page-layout`, cosi' breadcrumb e H1 risultano allineati.
- Visual change: categoria prodotti e pagina tema non renderizzano piu' un box
  intro/hero tra breadcrumb e titolo della sezione; resta solo uno slot editor
  opzionale non visibile nel markup di riferimento.
- Infra/CDN: `dist/demo-minimal.css` viene generato e pubblicato come
  `css/demo-minimal.css` per le `demo-pages` e `lab`; non è un bundle backend
  production.
- Hardening: aggiunto `npm run verify:cdn` per verificare manifest, asset
  principali, header CDN e hash `sha384` dopo il deploy.
- Hardening: `npm run verify:cdn` verifica anche `css/shell.css`,
  `css/public.css` e `css/auth.css`, cioè i bundle minimi che Katia deve poter
  caricare dal CDN stabile.
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
