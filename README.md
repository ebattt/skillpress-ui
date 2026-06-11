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
"@ebattt/skillpress-ui": "git+https://github.com/ebattt/skillpress-ui.git#v0.4.1-gitdep.1"
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

## Shell Del Sito (navbar + footer)

`bundles/shell.css` (flatten: `dist/shell.css`) è il **telaio condiviso del
sito**: top-bar, main navbar, barra categorie, mega/mobile menu, carrello,
popup utente e footer. Sorgente in `shell/` + `footer.css`.

**Fonte canonica.** Il CSS della shell è stato importato in origine *verbatim*
dal componente navbar/footer del CMS; **da `0.5` la sola sorgente di verità è
questa libreria**. Il backend **consuma `shell.css` dal package** e **non
mantiene più una copia locale** (`navbar/css`): ogni modifica al look di
navbar/footer si fa in `shell/`, non nel backend.

**Confine di ownership:**

| | Possiede | Cosa |
|---|---|---|
| **Libreria** | il **CSS** | `shell.css` + font self-hostati |
| **Backend/CMS** | **markup + JS** | template HTML + `navbar.js` / `cart.js` (comportamento app-owned, NON in libreria) |

Il markup di riferimento della shell (slot `nav.*`/`footer.*` + ITEM ripetibili)
è la contract page `static-pages/shell/index.html` del consumer.

**Caricamento:** un `<link>` a `shell.css`, in aggiunta (al massimo) al bundle
d'area della pagina. Nella dashboard la navbar sta SOPRA la sidebar.

**Font:** self-hostati nel package (`fonts/manrope/`, `fonts/material-symbols/`
= subset delle icone usate dalla shell) — **nessun Google Fonts, nessuna
richiesta esterna**.

**De-conflitto:** `shell.css` è isolato (token condivisi da `tokens/`, reset
unico da `base/`, namespace `--shell-*`); caricato insieme a un bundle d'area
le duplicazioni sono byte-identiche → sovrascritture innocue. Verifica lato
consumer: `check-shell-leakage` + test di coesistenza.

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
./scripts/release.sh v0.4.1-gitdep.1
```

Per il canale Packages: `npm publish` (esegue `prepublishOnly`).

Regole tag git: pin immutabile, mai spostare. Nuovo fix = nuovo tag patch
(`v0.4.1-gitdep.1`). Niente `prepare`/`postinstall` nel package.
