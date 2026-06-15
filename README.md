# @ebattt/skillpress-ui

Libreria UI Skillpress per pagine renderizzate dal backend/CMS. Il backend
genera markup HTML con classi pubbliche e hook `data-*` documentati, poi carica
CSS e JS dal CDN pubblico Skillpress o da un `ASSET_BASE` locale equivalente.

## Cosa contiene

- `tokens/`, `base/`, `utilities/`: fondazioni CSS.
- `primitives/`, `components/`: primitive `sp-*` e componenti di pagina.
- `shell/`: CSS canonico di navbar/footer.
- `js/`: behavior progressivo dei componenti interattivi.
- `bundles/`: entrypoint CSS sorgente per area.
- `dist/`: CSS flatten e `public-api.json`.
- `public/`: artefatto CDN generato da `npm run build:cdn`.

## Superficie CDN

Il comando canonico per generare l'artefatto CDN e':

```bash
npm run build:cdn
```

L'artefatto pubblicabile contiene solo:

- `css/*.css`;
- `js/*.js`;
- `fonts/**`;
- `manifest.json`;
- `public-api.json`.

`manifest.json` espone `basePath: /skillpress-ui`, URL senza versione, versione
come campo interno, hash `sha384` per verifica operativa e policy
`Cache-Control: no-cache`.

Il backend non usa npm e non carica asset da `node_modules`. In produzione il
browser puo' usare direttamente il CDN:

```html
<link rel="stylesheet" href="https://skillpress-ui.pages.dev/skillpress-ui/css/dashboard.css">
<script src="https://skillpress-ui.pages.dev/skillpress-ui/js/_helpers.js"></script>
<script src="https://skillpress-ui.pages.dev/skillpress-ui/js/expandable-table.js"></script>
<script src="https://skillpress-ui.pages.dev/skillpress-ui/js/index.js"></script>
```

Oppure un `ASSET_BASE` locale/proxy equivalente:

```html
<link rel="stylesheet" href="${ASSET_BASE}/css/dashboard.css">
<script src="${ASSET_BASE}/js/_helpers.js"></script>
<script src="${ASSET_BASE}/js/expandable-table.js"></script>
<script src="${ASSET_BASE}/js/index.js"></script>
```

Non aggiungere `integrity` nei template con link stabile mutabile. Il modello
production completo, incluse alternative WAR/Tomcat e proxy/cache, e' documentato in
`../Skillpress-frontend/consumer-libreria/CDN-HANDOFF.md`.

## CSS da caricare

Una pagina backend carica al massimo:

- `css/shell.css` se include navbar/footer Skillpress;
- un solo CSS d'area (`css/landing.css`, `css/checkout.css`,
  `css/dashboard.css`, `css/product-page.css`, `css/blog.css`, ...).

`bundles/*.css` e `dist/*.css` sono output/sorgenti di libreria, non URL
production backend. `css/demo-minimal.css` serve solo ai materiali di demo/lab.

## Shell del sito

`shell.css` e' il telaio condiviso del sito: top-bar, main navbar, barra
categorie, mega/mobile menu, carrello, popup utente e footer. Sorgente in
`shell/` e `footer.css`.

La libreria possiede il CSS della shell e i font self-hostati. Il backend/CMS
possiede markup, dati e JavaScript applicativo della navbar/footer. Il markup di
riferimento e' la contract page
`../Skillpress-frontend/consumer-libreria/static-pages/shell/index.html`.

Font: self-hostati in `fonts/manrope/` e `fonts/material-symbols/`; nessuna
richiesta a Google Fonts nel runtime production.

## JS da caricare

Ordine runtime:

1. `js/_helpers.js`;
2. moduli pagina richiesti dal contract;
3. `js/index.js`;
4. `window.SkillpressUI.init(document);`.

Caricare solo i moduli usati. Re-init dopo render parziali o Ajax:

```js
window.SkillpressUI.init(container);
```

Gli `init()` sono idempotenti.

## Contract pubblico

`public-api.json` elenca classi CSS pubbliche, attributi `data-*`, eventi
`sp:{component}:{action}` e moduli `window.SkillpressUI`. Solo questi nomi sono
API: classi interne e markup demo/lab non lo sono.

Il mapping pagina -> CSS/JS/dati per il backend e' generato in
`../Skillpress-frontend/consumer-libreria/BACKEND-CONTRACT-MATRIX.md`.

## Release

Prima della pubblicazione:

```bash
npm run check
npm run build:cdn
npm run verify:cdn
```

Ogni release aggiorna `CHANGELOG.md` includendo il campo obbligatorio
`Contract HTML cambiato: sì/no`. Se il campo e' `no`, il backend non deve
modificare i template HTML.
