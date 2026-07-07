# Changelog

Questo file registra solo cambiamenti utili al contract o al runtime.

## Corrente (0.5.4)

- **Versione: 0.5.4**
- **Contract HTML cambiato: no** (solo CSS; il markup resta invariato,
  nessuna azione richiesta lato backend oltre a ricaricare i bundle).

- Fix: `sp-form-input--error` ora vince sempre sui bordi dei componenti.
  La regola storica (0,1,0) veniva superata dagli shorthand `border:` delle
  famiglie campo importate dopo nei bundle (`.quote-input`,
  `.billing-form__input`, ...). Aggiunte in `form-primitives.css` le regole
  qualificate `input/textarea/select.sp-form-input--error` (0,1,1) e la
  variante `:focus` (0,2,1): il bordo rosso resta anche sul campo attivo,
  sopra i `:focus` (0,2,0) dei componenti. Nessun glow/fondo aggiunto: il
  contract del modifier resta "colora il bordo". Il bundle auth non importa
  form-primitives, quindi la stessa resa e' replicata in `shell/_auth.css`
  scoped ai campi auth (li' il focus mantiene il glow, virato in rosso,
  coerente col linguaggio focus di quelle pagine).
- Nuovo: bordo rosso automatico sui campi required non validi dopo
  interazione/submit, via `:user-invalid` su tutte le famiglie di campi
  (stessa resa dello stato errore manuale, zero JS, validazione nativa del
  browser). Regole sempre separate dalle classi errore (i browser senza
  supporto scartano l'intera selector list) e posizionate dopo i `:focus`
  di famiglia. `sp-form-input--error` resta per gli errori applicativi /
  server-side. Form con `novalidate` esclusi per natura.
- Fix/visual change: stato `:disabled` canonico su tutte le famiglie di
  campi: `background-color: --color-bg-gray-100`, `color: --color-text-muted`,
  `cursor: not-allowed`, `opacity: 1` (annulla lo sbiadimento UA di
  Safari/iOS). Aggiunto dove mancava (`quote-input`, `billing-form__input`
  e select, `orders-filter-input/-select`, `promo-input`,
  `auth-form__input`/`custom-input`) e allineate le due rese divergenti:
  `dashboard-settings-form__input` (era gray-50 con testo pieno) e
  `sp-form-select` (era opacity 0.5). Sui select si usa `background-color`,
  la freccia SVG in `background-image` resta visibile. `readonly` escluso
  di proposito.
- Nuovo (bundle): `dashboard.css` ora include `sp-confirm-dialog.css`. Il
  dialogo di conferma generico (gia' incluso nel bundle JS unico:
  `data-confirm-dialog`, eventi `sp:confirm-dialog:confirm/cancel`) e' cosi'
  utilizzabile su tutte le pagine private: conferme distruttive e notifiche
  di azione conclusa (markup con solo bottone `confirm`). Variante
  "alert OK-only" dedicata pianificata per la 0.6.
- Docs: commento chiarificatore su `.th-mobile-hide` in `orders-table.css`:
  colonne nascoste by design a ogni larghezza, i dati vivono nel pannello
  della riga espandibile; alias `th-detail-only` pianificato per la 0.6.

Fix da audit pre-produzione (stessa release):

- Fix JS: `SkillpressUI.init()` non e' piu' no-op alla seconda chiamata
  sullo stesso scope — rimosso il flag sull'aggregator (index.js);
  l'idempotenza resta garantita dai flag per-elemento dei componenti. Era
  il caso d'uso documentato "chiama init dopo ogni iniezione di markup".
- Fix: lock scroll a overlay aperto anche su iOS per `sp-confirm-dialog`
  (il solo overflow sul body via JS non blocca il touch scroll) e per
  `file-modal` (non lockava affatto, su nessun browser): garanzia CSS con
  `body:has(...)` + `touch-action`, pattern del menu mobile shell.
- Fix JS: `ExpandableTable.init(nodo)` ora inizializza anche il nodo
  stesso se e' la tabella (prima solo i discendenti); i listener
  document-level di confirm-dialog e file-upload-box restano unici anche
  con bundle incluso due volte (flag sul namespace); `info-dropdown` non
  lancia piu' SyntaxError con `aria-controls` che iniziano per cifra;
  `catalog-stage` con `data-catalog-stage-interval` non numerico usa il
  default 4500ms invece di impazzire (setInterval NaN).
- Fix contract: badge "File non conforme" nelle pagine ordine-dettaglio
  usava il modifier legacy `dash-action-badge--error` (inesistente nel
  CSS): corretto in `dashboard-action-badge--error` nelle static pages e
  nei renderer demo.
- Nuovo (utility): `.th-text-center` (usata dalle tabelle contract di
  preventivi e fatturazione, finora senza definizione CSS: intestazioni
  non centrate).
- Fix cascata (stessa famiglia del bug sp-form-input--error): 
  `sp-nome-lavoro-input--error` ora ha la forma qualificata + variante
  `:focus` (prima il focus rimetteva il bordo teal) e `:user-invalid`;
  `.sp-form-select:user-invalid` spostata dopo il suo `:focus` (pari
  specificità, vinceva il teal sul campo attivo); `.sp-card.text-gray-500`
  (le etichette dei box bonifico in ordine-dettaglio rendevano scure:
  .sp-card riscriveva il color della utility); `.orders-table
  .text-red-600` scopata come gia' .text-dark-blue (la scadenza preventivo
  in rosso non rendeva dentro le tabelle); la card selezionata
  (`--selected`) non perde piu' bordo e anello al hover quando e' anche
  `--interactive`.

## 0.5.3

- **Versione: 0.5.3**
- **Contract HTML cambiato: sì, solo dashboard** (nuovi modifier opzionali
  `dashboard-shell--nav-hub` / `dashboard-shell--nav-page` + link
  `dashboard-shell__mobile-back`; il resto del contract e' invariato e il
  popup utente era gia' presente nei template production).

- Nuovo: varianti multipagina server-side per la dashboard. La dashboard
  production naviga con pagine reali, quindi senza il routing JS il menu
  mobile restava impilato sopra il contenuto. Ora: l'indice usa
  `dashboard-shell--nav-hub` (sotto i 1024px mostra solo il menu, come la
  demo), le pagine vista usano `dashboard-shell--nav-page` (mostrano solo il
  contenuto) con `<a class="dashboard-shell__mobile-back" href="...">Menu</a>`
  per tornare all'indice; le pagine ordine-dettaglio mantengono il loro back
  verso Ordini senza doppioni. Desktop invariato (sidebar sempre visibile).

- Visual change: le tab testuali (`landing-info-tabs`) non scrollano MAI:
  le voci vanno a capo (flex-wrap). Su desktop restano tab con indicatore,
  leggermente piu' piccole (-10%); sotto i 640px diventano pillole su piu'
  righe con la voce attiva evidenziata (fondo `--color-primary-alpha-12` +
  testo primary). Risolto anche l'hover che scuriva la voce attiva.
- Fix: menu mobile shell, la pagina sotto non scrolla piu' mentre il menu e'
  aperto: `overscroll-behavior: contain` su `.mobile-menu` e
  `.category-products__scroll`, piu' lock via `:has` su `body` E su `html`
  quando `#mobileMenu` o l'overlay prodotti (livello 2) sono visibili. Il
  lock a livello `html` e' necessario per iOS Safari, che ignora
  `overflow: hidden` impostato sul solo body per lo scroll touch.
- Fix: il menu mobile e l'overlay prodotti sono full-viewport ("come una
  nuova pagina"): coprono sempre l'intera pagina anche se questa era stata
  scrollata, con il contenuto che parte sotto la navbar via padding-top e
  z-index sotto lo sticky dell'header. A menu aperto l'header e' forzato
  `position: fixed`, cosi' logo e bottone X restano sempre visibili.
  Rimosso il lock `overflow: hidden` su `html` (rompeva lo sticky
  dell'header): su html resta solo `overscroll-behavior: none`.
- Fix: lo scroll dentro il menu mobile (e overlay prodotti) resta SEMPRE nel
  menu, anche con poche voci: il contenuto ha `min-height: calc(100% + 1px)`
  cosi' il gesto si aggancia al menu (non al documento) e
  `overscroll-behavior: contain` ferma il chaining; scrollbar nascosta
  (`scrollbar-width: none` + `::-webkit-scrollbar`).
- Contract page shell: aggiunto il markup del popup accesso utente
  (`#userLoginPopup`, gia' presente in produzione backend: nessuna modifica
  richiesta ai template) — mancava dal riferimento, quindi il bottone utente
  mobile nelle static pages non aveva nulla da aprire.
- Fix: niente piu' zoom automatico di iOS Safari al focus dei campi: tutti i
  campi testo/select della libreria sotto i 16px (auth, ricerca navbar,
  billing, settings dashboard, filtri ordini, preventivi, promo, primitives
  `sp-form-*`) passano a `1rem` sui soli dispositivi touch
  (`hover: none` + `pointer: coarse`); la resa desktop resta invariata.
- Fix: dentro `.public-page-layout` le tab testuali riacquistano il
  padding-top previsto (il reset `padding-top: 0` dei text-block vinceva per
  ordine nel bundle) e il box `public-page-editorial` usato dopo la griglia
  prodotti ha ora margine sopra (pagina tema con testo sotto i prodotti).
- Hardening: `public-page-editorial` supporta la variante solo testo: senza
  `__media` la colonna immagine collassa e `__text` usa tutta la larghezza;
  `__text` puo' essere un `div` con HTML ricco dal CMS (paragrafi e liste
  ricevono i margini corretti). La static page pagina-tema mostra il blocco
  editoriale opzionale dopo la griglia (slot `topic.outro`).
- Nuovo: bundle JS unico `js/skillpress-ui.js` (generato da `build:dist`:
  `_helpers.js` + tutti i componenti + `index.js`). Regola operativa per il
  backend: un solo `<script defer>` nel template condiviso di tutte le pagine
  con shell; ogni componente si auto-inizializza dai suoi `data-*` e non fa
  nulla se il markup non c'e' (~20 KiB gzip). I singoli `js/<componente>.js`
  restano pubblicati; non vanno mischiati col bundle sulla stessa pagina.
  Le static-pages e la matrice pagina->CSS/JS sono allineate al bundle unico.
- Nuovo (richiesta backend): la primitive `sp-validation-indicator` (e
  `sp-validation-total`), prima solo in product-page.css, e' ora inclusa
  anche in `auth.css`, `checkout.css`, `dashboard.css` e `public.css` per
  gestire gli errori dei form su tutte le pagine. Nessun cambio di markup:
  stessa classe, `<span class="sp-validation-indicator">testo</span>`.
- Docs: nuova guida eventi `docs/backend/06-js-events.md` nel consumer (34
  eventi `sp:*` con condizioni, target e payload, mappa per pagina),
  verificata contro i sorgenti e blindata da `check-events-doc.cjs`
  (confronto automatico con `public-api.json` e con i `data-*` delle static
  pages).

## 0.5.2

- **Versione: 0.5.2**
- **Contract HTML cambiato: sì** (categoria prodotti e pagina tema usano il
  blocco editoriale opzionale `public-page-editorial`, che contiene l'unico
  `<h1>` della pagina quando renderizzato).

- Contract change: aggiunto il componente `public-page-editorial` al
  `public-page-layout` per gestire un box CMS grigio opzionale con titolo,
  testo e immagine nelle pagine categoria prodotti e pagina tema.
- Visual change: la scala dei token testo e il testo shell sono allineati al
  nero editoriale del blog live (`#111418`) mantenendo `#374151` per corpo
  lungo e testo terziario.
- Visual change: il box editoriale pubblico e' piu' compatto, senza bordo, con
  immagine a destra piu' ampia e contenuto responsivo.
- Hardening: `public-api.json` espone le nuove classi
  `public-page-editorial*` per il contract backend.

## 0.5.1

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
