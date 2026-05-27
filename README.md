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

## Install Via Git Dependency

In alternativa a GitHub Packages, la libreria puo' essere installata
direttamente dal repo git, pinnata a un tag. Le due modalita' di distribuzione
coesistono: lo stesso codice e' pubblicato su Packages e disponibile via git.

Modello: npm clona il repo al tag dichiarato e installa il contenuto come se
fosse un package del registry. Niente registry-scoped auth, niente `.npmrc`.
Il rispetto di `.npmignore` e' garantito da npm anche per git install: lo
sviluppatore consumer riceve solo gli stessi file che riceverebbe via tarball
(escluso `node_modules/`, `stories/`, `docs/`, `scripts/`, eccetera).

Riga `package.json` lato consumer:

```json
{
  "dependencies": {
    "@ebattt/skillpress-ui": "git+https://github.com/ebattt/skillpress-ui.git#v0.4.0-gitdep.1"
  }
}
```

I path runtime in HTML/CSS/JS sono **identici** a quelli della modalita'
GitHub Packages: continuano a essere
`node_modules/@ebattt/skillpress-ui/bundles/...` e
`node_modules/@ebattt/skillpress-ui/js/...`. Non serve toccare i template.

### Differenza Di Autenticazione

| Modalita' | Cosa serve sul consumer |
|---|---|
| GitHub Packages | PAT classic con scope `read:packages` + `.npmrc` registry-scoped |
| Git dependency | Accesso `git clone` al repo (SSH key GitHub oppure PAT con scope `repo`) |

Il consumer git dep deve essere collaborator del repo `ebattt/skillpress-ui`
(stesso vincolo di accesso del canale Packages, ma su un canale diverso).
Non e' necessario nessun token configurato per npm: l'autenticazione la
gestisce git tramite SSH agent o credential helper.

### Limitazioni Operative

- **Pin esplicito al tag.** Solo `#vX.Y.Z` o `#vX.Y.Z-gitdep.N` (es.
  `#v0.4.0-gitdep.1`). **Vietati**: `#main`, `#master`, branch mobili,
  `#semver:^0.4.0`, range npm. Senza un tag immutabile non c'e' garanzia che
  il consumer riceva sempre lo stesso codice.
- **Artefatti committati.** `bundles/` e `dist/` devono essere committati nel
  tag (lo fa `scripts/release.sh`). Con git install npm non rigenera nulla:
  il consumer riceve esattamente il contenuto del tag.
- **Nuovo bug = nuovo tag.** I tag rilasciati non si spostano mai. Per un fix
  serve un nuovo tag patch (`v0.4.0-gitdep.2`).
- **Niente `prepare` / `postinstall`** nella libreria: girerebbero sulla
  macchina del consumer e romperebbero install riproducibili.

### Release Da Git Dep

Lo script `scripts/release.sh` automatizza i passaggi:

```bash
./scripts/release.sh v0.4.0-gitdep.1
```

Lo script esegue `npm run check`, `npm run build:dist`, `npm run build:public-api`,
committa `bundles/` e `dist/` aggiornati e crea il tag locale. Il push del
branch e del tag e' manuale (lo script stampa il comando da eseguire).

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
