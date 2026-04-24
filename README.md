# @ebattt/skillpress-ui

Skillpress UI e la libreria UI interna per token, reset, utility e componenti riusabili del sistema Skillpress.
Fornisce markup, classi, stati e behavior riusabili senza imporre modelli dati CMS.

## Stato

Bootstrap minimale per validare packaging e consumo npm.

Perimetro attuale:
- token
- reset/base
- utility
- Accordion Section CSS
- Accordion Section behavior JS
- demo HTML minimale

Fuori dal perimetro attuale:
- product-card
- button
- card-base
- componenti composti
- demo ricche con contenuti applicativi

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
      <span class="material-symbols-outlined accordion__icon" data-accordion-icon aria-hidden="true">add</span>
    </button>

    <div class="accordion__content">
      <div class="accordion__inner"></div>
    </div>
  </section>
</div>
```

## Nota

Questa versione deve restare volutamente piccola. Nuovi componenti vanno aggiunti solo dopo aver validato il flusso GitHub Packages con questa alpha tecnica.
