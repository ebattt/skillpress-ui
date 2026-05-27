# @ebattt/skillpress-ui

Libreria UI Skillpress per pagine renderizzate dal backend/CMS. Il backend
genera markup HTML con classi pubbliche e hook `data-*` documentati, poi
carica CSS e JS dal package.

## Cosa Contiene

- `tokens/`, `base/`, `utilities/`: fondazioni CSS.
- `primitives/`, `components/`: primitive `sp-*` e componenti di pagina.
- `js/`: behavior progressivo dei componenti interattivi.
- `bundles/`: entrypoint CSS per area (`landing`, `checkout`, `dashboard`, ...).
- `dist/`: CSS flatten + `public-api.json` (contract pubblico).

## Install

Due canali equivalenti, stessa codebase. Scegliere uno solo.

**Git dependency** (consigliato, no PAT npm):

```json
"@ebattt/skillpress-ui": "git+https://github.com/ebattt/skillpress-ui.git#v0.4.0-gitdep.1"
```

Pin sempre a un tag esatto (`#vX.Y.Z` o `#vX.Y.Z-gitdep.N`). Niente `#main`,
niente range mobili. Auth: collaborator del repo + SSH key o PAT con scope
`repo`.

**GitHub Packages** (canale storico):

```bash
npm install @ebattt/skillpress-ui
```

`.npmrc`:

```ini
@ebattt:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

PAT classic con scope `read:packages`. L'invito alla repo deve essere
accettato prima.

## CSS Da Caricare

Un bundle per area di pagina:

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/landing.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/checkout.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/dashboard.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/product-page.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/blog.css">
```

In alternativa `dist/<area>.css` (flatten senza `@import`). Non mischiare le
due varianti nella stessa pagina.

## JS Da Caricare

```html
<script src="/node_modules/@ebattt/skillpress-ui/js/_helpers.js"></script>
<script src="/node_modules/@ebattt/skillpress-ui/js/accordion.js"></script>
<script src="/node_modules/@ebattt/skillpress-ui/js/index.js"></script>
<script>window.SkillpressUI?.init(document);</script>
```

Caricare solo i moduli usati. Re-init dopo render parziali / Ajax:

```js
window.SkillpressUI?.init(container);
```

Gli `init()` sono idempotenti.

## Contract Pubblico

`dist/public-api.json` elenca classi CSS pubbliche, attributi `data-*`,
eventi `sp:{component}:{action}` e moduli `window.SkillpressUI`. Solo questi
nomi sono API: classi interne, Storybook e markup demo non lo sono.

## Release

Lo script `scripts/release.sh` automatizza check + build + commit artefatti +
tag locale (push manuale):

```bash
./scripts/release.sh v0.4.0-gitdep.2
```

Per il canale Packages: `npm publish` (esegue `prepublishOnly`).

Regole tag git: pin immutabile, mai spostare. Nuovo fix = nuovo tag patch
(`v0.4.0-gitdep.2`). Niente `prepare`/`postinstall` nel package.
