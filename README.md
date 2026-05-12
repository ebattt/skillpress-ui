# @ebattt/skillpress-ui

Libreria UI Skillpress per pagine renderizzate dal backend/CMS.

Il backend non deve ricostruire stili o behavior: genera markup HTML con le
classi pubbliche e gli hook `data-*` documentati, poi carica CSS e JS dal
package.

## Cosa Contiene

- `tokens/`, `base/`, `utilities/`: fondazioni CSS.
- `primitives/`: primitive riusabili prefissate `sp-*`.
- `components/`: componenti di pagina e dashboard.
- `js/`: behavior progressivo per componenti interattivi.
- `bundles/`: entrypoint CSS modulari con `@import`.
- `dist/`: CSS flatten e `public-api.json`.
- `stories/` e `docs/`: riferimenti tecnici per sviluppo e review.

## Installazione Backend

```bash
npm install @ebattt/skillpress-ui
```

Il dist-tag `latest` punta alla release pubblicata corrente. Usare una versione
pin nel consumer/app backend quando serve riproducibilita'. Evitare `file:`,
`link:`, path assoluti locali e modifiche a `node_modules`.

## Accesso Al Package Privato

Il package e' privato su GitHub Packages. Per permettere al backend di
installarlo:

- invitare lo sviluppatore backend o un account tecnico come collaborator nella
  repo privata `skillpress-ui`;
- attendere che l'invito sia accettato;
- usare un PAT classic creato da quell'account; per installare la libreria basta
  lo scope `read:packages`;
- configurare npm con il registry GitHub Packages.

Percorso per creare il token:

```text
GitHub -> Settings -> Developer settings -> Personal access tokens ->
Tokens (classic) -> Generate new token (classic)
```

Impostazioni consigliate:

- `Expiration`: usare una scadenza nota al team;
- `Scopes`: per il solo download/install basta `read:packages`;
- `write:packages`, `delete:packages`, `workflow` o scope `admin:*` non sono
  necessari per usare questa libreria.

Esempio `.npmrc` lato backend:

```ini
@ebattt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

`write:packages`, `delete:packages` o permessi admin non sono necessari per
leggere la libreria. Se l'installazione fallisce con
`403 permission_denied: read_package`, l'account del token non ha ancora accesso
effettivo alla repo/package.

Nota: questa repo e' sotto un account personale. Per le repo private personali,
GitHub non permette collaborator read-only: un collaborator della repo ha anche
permesso di push.

## CSS Da Caricare

Usare il bundle della pagina o area applicativa:

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/product-page.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/checkout.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/dashboard.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/landing.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/blog.css">
```

Se il backend preferisce un singolo CSS senza `@import`, usare `dist/`:

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/dist/product-page.css">
```

Non mischiare `bundles/<area>.css` e `dist/<area>.css` nella stessa pagina.

## JS Da Caricare

Per inizializzare tutti i componenti JS pubblici, caricare prima gli helper,
poi i moduli componente necessari e infine l'aggregator:

```html
<script src="/node_modules/@ebattt/skillpress-ui/js/_helpers.js"></script>
<script src="/node_modules/@ebattt/skillpress-ui/js/accordion.js"></script>
<script src="/node_modules/@ebattt/skillpress-ui/js/checkout-mobile-summary.js"></script>
<script src="/node_modules/@ebattt/skillpress-ui/js/confirm-dialog.js"></script>
<script src="/node_modules/@ebattt/skillpress-ui/js/index.js"></script>
<script>
  window.SkillpressUI?.init(document);
</script>
```

Caricare solo i moduli usati dalla pagina. `js/index.js` non contiene i
componenti: invoca gli `init()` dei moduli gia' presenti in `window.SkillpressUI`.

Dopo render parziali, Ajax, HTMX o aggiornamenti DOM:

```js
window.SkillpressUI?.init(container);
```

Ogni init deve essere idempotente: il backend puo' richiamarlo dopo ogni
render senza duplicare listener.

## Contract Markup

Il contract pubblico vive in:

```text
dist/public-api.json
```

Contiene:

- classi CSS pubbliche;
- attributi `data-*` letti dalla libreria;
- eventi custom `sp:{component}:{action}`;
- moduli disponibili in `window.SkillpressUI`.

Le pagine backend devono usare solo nomi presenti nel contract o documentati in
`docs/`. Classi interne, helper di Storybook e markup demo non sono API.

## Responsabilita Backend

Il backend possiede:

- dati, testi, prezzi, date e formattazione locale;
- URL, `href`, `src`, `alt`, id e attributi applicativi;
- stato iniziale (`aria-*`, selected/active, disabled, expanded);
- submit, persistenza, validazione business e analytics;
- autorizzazioni e visibilita' dei blocchi.

La libreria possiede:

- layout, token, spacing, colori e tipografia;
- stati visuali pubblici;
- behavior UI locale documentato;
- eventi `sp:*` emessi dai componenti JS.

## Storybook

Storybook serve per vedere componenti, varianti e markup supportato. Non entra
nel package npm.

```bash
npm install
npm run storybook
```

Build statica:

```bash
npm run build-storybook
```

## Check Prima Di Consegnare

```bash
npm run prepublishOnly
```

Questo esegue check di naming, legacy leakage, data attrs, init contract,
colori, CSS variables, breakpoint, build CSS, pack check e contract check.

## Regole Per Nuovi Cambiamenti

- Aggiungere o cambiare markup pubblico richiede aggiornamento di CSS/JS, docs,
  Storybook e `dist/public-api.json`.
- Rimuovere o rinominare classi, `data-*`, eventi o moduli pubblici e' breaking
  per il backend.
- Non pubblicare senza passare `npm run prepublishOnly`.
- Non usare asset o path locali del consumer dentro la libreria.
