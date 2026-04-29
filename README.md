# @ebattt/skillpress-ui

Skillpress UI e la libreria UI interna per token, reset, utility e componenti riusabili del sistema Skillpress.
Fornisce markup, classi, stati e behavior riusabili senza imporre modelli dati CMS.

Manrope e servito dal package. Material Symbols non e una dipendenza runtime globale: le icone funzionali dei componenti sono gestite dalla libreria con CSS/SVG dedicati.

## Stato

Versione corrente: `0.2.0-alpha.0`.

Perimetro attuale:
- Manrope self-hosted nel package
- token
- reset/base
- utility
- primitive CSS/JS: Button, Badge, Card, Accordion, Breadcrumb, Rating,
  ToggleSwitch, DownloadButtons, ModeSwitcher, OptionButtons,
  OrientationToggle, FormPrimitives, FormControls, IvaBanner, InfoDropdown
- componenti composti: FeatureBox, ImageGallery, ProductHero, StepIndicator,
  FormatCard, PriceTable, SidebarTotals, RelatedProducts, MobileTotalBar
- bundle runtime `bundles/demo-minimal.css`
- Storybook nel repository per visualizzazione e documentazione tecnica

Fuori dal perimetro attuale:
- product-card
- demo ricche con contenuti applicativi

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

Dettagli: [`docs/storybook.md`](./docs/storybook.md).

## Installazione

```bash
npm install @ebattt/skillpress-ui
```

## Import

```css
@import '@ebattt/skillpress-ui/bundles/demo-minimal.css';
```

```html
<script src="node_modules/@ebattt/skillpress-ui/js/accordion.js"></script>
```

## Markup minimo

Button:

```html
<button class="button button--primary" type="button">
  Aggiungi al carrello
</button>
```

Badge:

```html
<span class="badge badge--success">Consegnato</span>
```

Card:

```html
<article class="card">
  <div class="card__body">
    <h3 class="card__title">Card base</h3>
    <p class="card__description">Contenuto sintetico popolato dal consumer.</p>
  </div>
</article>
```

Breadcrumb:

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item">
      <a class="breadcrumb__link" href="/">Homepage</a>
    </li>
    <li class="breadcrumb__item breadcrumb__item--current">Pagina corrente</li>
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
<div class="accordion" data-accordion>
  <section class="accordion__section" data-accordion-section>
    <button class="accordion__header" type="button" data-accordion-trigger aria-expanded="false">
      <span class="accordion__header-left">
        <span class="accordion__badge">1</span>
        <span class="accordion__title">Accordion Section</span>
      </span>
      <span class="accordion__icon" aria-hidden="true"></span>
    </button>

    <div class="accordion__content">
      <div class="accordion__inner"></div>
    </div>
  </section>
</div>
```

## Nota

Questa versione deve restare volutamente piccola. Nuovi componenti vanno aggiunti solo dopo aver validato il flusso GitHub Packages con questa alpha tecnica.
