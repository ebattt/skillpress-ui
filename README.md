# @ebattt/skillpress-ui

Libreria UI Skillpress per pagine renderizzate dal backend/CMS. Il backend
genera markup HTML con classi pubbliche e hook `data-*` documentati, poi carica
CSS e JS dal CDN pubblico Skillpress.

## Cosa contiene

- `tokens/`, `base/`, `utilities/`: fondazioni CSS.
- `primitives/`, `components/`: primitive `sp-*` e componenti di pagina.
- `shell/`: CSS canonico di navbar/footer.
- `js/`: behavior progressivo dei componenti interattivi.
- `bundles/`: entrypoint CSS sorgente per area.
- `dist/`: CSS flatten e `public-api.json`.
- `public/`: artefatto CDN generato da `npm run build:cdn`.

## Superficie CDN

Il CDN espone sempre un path stabile senza versione:

```text
https://skillpress-ui.pages.dev/skillpress-ui/...
```

Non esiste una cartella `/latest` e non si pubblicano URL come
`/skillpress-ui-0.5.1/...`. La "latest" è semplicemente il contenuto corrente
di `/skillpress-ui`. Il versionamento resta interno a `package.json`,
`CHANGELOG.md`, `manifest.json` e agli artefatti generati.

Il comando canonico è:

```bash
npm run build:cdn
```

Produce tre output:

- `public/skillpress-ui-<version>/`: artefatto versionato interno;
- `public/skillpress-ui-<version>.zip`: archivio della stessa release;
- `public/cdn-deploy/skillpress-ui/`: copia stabile da pubblicare su
  Cloudflare Pages.

La directory da deployare è quindi:

```text
public/cdn-deploy
```

Il contenuto pubblico contiene solo:

- `css/*.css`;
- `js/*.js`;
- `fonts/**`;
- `manifest.json`;
- `public-api.json`.

`manifest.json` espone `basePath: /skillpress-ui`, URL senza versione, versione
come campo interno, hash `sha384` per verifica operativa e policy
`Cache-Control: no-cache`.

Il backend può consumare gli asset direttamente dal CDN stabile o mirrorarli su
un proprio path locale. La cosa importante è che la struttura interna resti la
stessa: `css/`, `js/`, `fonts/`, `manifest.json`, `public-api.json`.

```html
<link rel="stylesheet" href="https://skillpress-ui.pages.dev/skillpress-ui/css/shell.css">
<link rel="stylesheet" href="https://skillpress-ui.pages.dev/skillpress-ui/css/public.css">
```

Se il backend decide di servire una copia locale, il path può diventare ad
esempio `/static/skillpress-ui/css/public.css`; gli hash in `manifest.json`
servono a validare che la copia locale corrisponda alla release pubblicata.

Per il flusso completo di release e rollback vedi
[`docs/cdn-release.md`](docs/cdn-release.md).

## CSS da caricare

Una pagina backend carica al massimo:

- `css/shell.css` se include navbar/footer Skillpress;
- un solo CSS d'area (`css/landing.css`, `css/checkout.css`,
  `css/dashboard.css`, `css/product-page.css`, `css/blog.css`, ...).

Eccezione: le pagine auth (`login`, `registrazione`, `password dimenticata`)
caricano solo `css/auth.css`. Il bundle auth e' autonomo e non importa
navbar/footer.

`bundles/*.css` e `dist/*.css` sono output/sorgenti di libreria, non URL
production backend. `css/demo-minimal.css` serve solo ai materiali di demo/lab.

## Shell del sito

`shell.css` è il telaio condiviso del sito: top-bar, main navbar, barra
categorie, mega/mobile menu, carrello, popup utente e footer. Sorgente in
`shell/` (incluso `shell/footer.css`).

La libreria possiede il CSS della shell e i font self-hostati. Il backend/CMS
possiede markup, dati e JavaScript applicativo della navbar/footer. Il markup di
riferimento è la contract page
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

Il mapping pagina -> CSS/JS/dati per il backend è generato dalle static page
del consumer in `../Skillpress-frontend/consumer-libreria/`.

## Release

Prima della pubblicazione:

```bash
npm run check
npm run build:cdn
deploy public/cdn-deploy su Cloudflare Pages
npm run verify:cdn
```

`npm run build:cdn` aggiorna sia l'artefatto versionato interno sia
`public/cdn-deploy/skillpress-ui`, quindi non serve una copia manuale prima del
deploy.

Ogni release aggiorna `package.json` e `CHANGELOG.md` includendo il campo
obbligatorio `Contract HTML cambiato: sì/no`. Se il campo è `no`, il backend
non deve modificare i template HTML.
