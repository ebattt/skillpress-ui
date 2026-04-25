# @ebattt/skillpress-ui

Skillpress UI e la libreria UI interna per token, reset, utility e componenti riusabili del sistema Skillpress.
Fornisce markup, classi, stati e behavior riusabili senza imporre modelli dati CMS.

Manrope e servito dal package. Material Symbols non e una dipendenza runtime globale: le icone funzionali dei componenti sono gestite dalla libreria con CSS/SVG dedicati.

## Stato

Bootstrap minimale per validare packaging e consumo npm.

Perimetro attuale:
- Manrope self-hosted nel package
- token
- reset/base
- utility
- Accordion Section CSS
- Accordion Section behavior JS
- demo HTML minimale
- Storybook nel repository per visualizzazione e documentazione tecnica

Fuori dal perimetro attuale:
- product-card
- button
- card-base
- componenti composti
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
