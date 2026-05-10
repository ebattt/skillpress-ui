# @ebattt/skillpress-ui

Skillpress UI e la libreria UI interna per token, reset, utility e componenti riusabili del sistema Skillpress.
Fornisce markup, classi, stati e behavior riusabili senza imporre modelli dati CMS.

Manrope e servito dal package. Material Symbols non e una dipendenza runtime globale: le icone funzionali dei componenti sono gestite dalla libreria con CSS/SVG dedicati.

## Stato

Versione corrente: `0.3.0-beta.1`.

Perimetro attuale:
- Manrope self-hosted nel package
- token
- reset/base
- utility
- primitive CSS/JS: Button, Badge, Card, Accordion, Breadcrumb, Rating,
  ToggleSwitch, DownloadButtons, ModeSwitcher, OptionButtons,
  OrientationToggle, FormPrimitives, FormControls, ValidationIndicator,
  IvaBanner, InfoDropdown
- componenti composti: FeatureBox, ImageGallery, ProductHero, StepIndicator,
  FormatCard, Preview, MediaChoiceCard, PriceTable, SidebarTotals,
  RelatedProducts, MobileTotalBar, runtime dashboard inclusi nella versione corrente
  incluso `BillingFormCard`, runtime dashboard shell `DashboardShell`
- bundle runtime production `bundles/product-page.css`, `bundles/checkout.css`,
  `bundles/dashboard.css`, `bundles/landing.css`, `bundles/blog.css`;
  `bundles/demo-minimal.css` resta disponibile per compatibilita' lab/demo
- Storybook nel repository per visualizzazione e documentazione tecnica

Fuori dal perimetro attuale:
- product-card
- ContentTabs / schede editoriali "Descrizione / Info tecniche"
- demo ricche con contenuti applicativi

## Backend/CMS contract

La libreria non legge JSON direttamente. Il backend/CMS deve renderizzare HTML
con classi pubbliche e hook `data-*` documentati.

```text
dati CMS -> presentation type -> markup skillpress-ui
```

Esempi:

| Presentation type | Componente |
|---|---|
| `select` | `FormPrimitives` / `.sp-form-select` |
| `choice-group` | `OptionButtons` |
| `preview` | `Preview` |
| `dependent-select` | `Preview` + `.sp-form-select` + `.sp-form-select`/`OptionButtons` |
| `media-choice` | `MediaChoiceCard` |
| `format-choice` | `FormatCard` + `OrientationToggle` |
| `validation-indicator` | `ValidationIndicator` |

Demo consumer utile per il team backend:

```text
Skillpress-frontend/consumer-libreria/demo-pages/backend-contract/
```

## Storybook

Storybook e incluso solo nel repository, non nel package pubblicato.
Serve per visualizzare componenti, stati, varianti e markup ufficiale.

```bash
npm install
npm run storybook
```

URL locale:

```text
http://localhost:6006
```

Build statica:

```bash
npm run build-storybook
```

Dettagli: [`docs/storybook.md`](https://github.com/ebattt/skillpress-ui/blob/main/docs/storybook.md).

## Installazione

```bash
npm install @ebattt/skillpress-ui
```

## Import

```css
@import '@ebattt/skillpress-ui/bundles/product-page.css';
@import '@ebattt/skillpress-ui/bundles/checkout.css';
@import '@ebattt/skillpress-ui/bundles/dashboard.css';
@import '@ebattt/skillpress-ui/bundles/landing.css';
```

```html
<script src="node_modules/@ebattt/skillpress-ui/js/accordion.js"></script>
```

## Markup minimo

Button:

```html
<button class="sp-button sp-button--primary" type="button">
  Aggiungi al carrello
</button>
```

Badge:

```html
<span class="sp-badge sp-badge--success">Consegnato</span>
```

Card:

```html
<article class="sp-card">
  <div class="sp-card__body">
    <h3 class="sp-card__title">Card base</h3>
    <p class="sp-card__description">Contenuto sintetico popolato dal consumer.</p>
  </div>
</article>
```

Breadcrumb:

```html
<nav class="sp-breadcrumb" aria-label="Breadcrumb">
  <ol class="sp-breadcrumb__list">
    <li class="sp-breadcrumb__item">
      <a class="sp-breadcrumb__link" href="/">Homepage</a>
    </li>
    <li class="sp-breadcrumb__item sp-breadcrumb__item--current">Pagina corrente</li>
  </ol>
</nav>
```

Feature Box:

```html
<div class="feature-grid">
  <div class="feature-box">
    <div class="feature-box__content">
      <div class="feature-box__icon" style="background:#E8F5F3;">
        <img src="/assets/icons/fast.svg" alt="" />
      </div>
      <div class="feature-box__text">
        <h3 class="feature-box__title">Veloce</h3>
        <p class="feature-box__description">Stampa rapida</p>
      </div>
    </div>
  </div>
</div>
```

Accordion:

```html
<div class="sp-accordion" data-accordion>
  <section class="sp-accordion__section" data-accordion-section>
    <button class="sp-accordion__header" type="button" data-accordion-trigger aria-expanded="false">
      <span class="sp-accordion__header-left">
        <span class="sp-accordion__badge">1</span>
        <span class="sp-accordion__title">Accordion Section</span>
      </span>
      <span class="sp-accordion__icon" aria-hidden="true"></span>
    </button>

    <div class="sp-accordion__content">
      <div class="sp-accordion__inner"></div>
    </div>
  </section>
</div>
```

## Versioning policy

L'API pubblica della libreria e' descritta in `dist/public-api.json` ed e'
derivata dalle annotazioni `@public` nei sorgenti (script
`scripts/build-public-api.cjs`). Il file `public-api.json` contiene quattro
sezioni:

- `css.primitives` -- classi BEM primitive prefissate `sp-*` (block + element + modifier).
- `css.components` -- nomi dei componenti CSS domain-scoped.
- `data` -- attributi `data-*` letti dal runtime JS pubblico.
- `events` -- custom events emessi (`sp:{component}:{action}`).
- `js` -- moduli esposti su `window.SkillpressUI.<Component>`.

| Tipo modifica | Bump |
|---|---|
| Look (colori, spaziature, tipografia, transizioni) | patch / minor |
| Aggiunta classe/variante `@public` | minor |
| Rimozione/rename classe `@public`, `data-*`, evento `sp:*` | major |
| Modifica markup minimo richiesto al backend | major |

Il `CHANGELOG.md` distingue **visual change** (look-only, sicuro) da
**contract change** (breaking, richiede coordinamento backend).

Lo script `npm run check:contract` confronta `dist/public-api.json` con la
versione precedente committata e fallisce se vengono rimosse voci pubbliche
senza bump major (vedi `scripts/check-contract.cjs`).

## Nota

Questa beta deve restare focalizzata sul contratto pubblico esistente. Nuovi componenti o cambi di markup backend-owned vanno aggiunti solo con aggiornamento di docs, Storybook e public-api.
