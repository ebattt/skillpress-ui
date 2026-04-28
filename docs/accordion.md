---
title: Accordion
description: Contenitore espandibile con badge numerato opzionale e toggle locale single-open.
layer: primitives
strategy: css+js
sources:
  catalog_css: elements-ui/css/components/_layout-patterns.css
  demo: product-page-integration/index.html
status: published-alpha-3
package_path: primitives/accordion.css
js_path: js/accordion.js
---

# Accordion

Contenitore espandibile per sezioni di configurazione o contenuto strutturato. La libreria controlla markup interno, stati visuali, aria e toggle locale del pannello (single-open per container). L'icona `+/-` e' disegnata dal CSS via `::before/::after` e non richiede Material Symbols.

## Anatomy

```text
Accordion
└── .accordion   [data-accordion]
    └── .accordion__section   [data-accordion-section] [.expanded]
        ├── .accordion__header   [data-accordion-trigger] [aria-expanded]
        │   ├── .accordion__header-left
        │   │   ├── .accordion__badge   (opzionale, numero step)
        │   │   └── .accordion__title
        │   └── .accordion__icon         (icona +/- decorativa, aria-hidden)
        └── .accordion__content
            └── .accordion__inner        (slot consumer)
```

Default state: `collapsed`. Stato `expanded` aggiunge la classe `expanded` su `.accordion__section` e flippa `aria-expanded="true"` sul trigger.

## Markup contract

```html
<div class="accordion" data-accordion>
  <section class="accordion__section" data-accordion-section>
    <button class="accordion__header" type="button" data-accordion-trigger aria-expanded="false">
      <span class="accordion__header-left">
        <span class="accordion__badge">1</span>
        <span class="accordion__title">Formato e supporto</span>
      </span>
      <span class="accordion__icon" aria-hidden="true"></span>
    </button>
    <div class="accordion__content">
      <div class="accordion__inner">
        <p>Contenuto della sezione.</p>
      </div>
    </div>
  </section>
</div>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.accordion` | container, `data-accordion` per auto-init | yes | — |
| `.accordion__section` | sezione singola, ripetibile | yes | `expanded` |
| `.accordion__header` | trigger cliccabile (`<button>`) | yes | — |
| `.accordion__header-left` | wrapper flex per badge + title | yes | — |
| `.accordion__badge` | badge numerato opzionale | no | — |
| `.accordion__title` | titolo della sezione | yes | — |
| `.accordion__icon` | icona +/- decorativa (CSS pseudo-elements) | yes | — |
| `.accordion__content` | wrapper collassato (max-height/opacity) | yes | — |
| `.accordion__inner` | slot consumer con padding e border-top | yes | — |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `data-accordion` | `.accordion` | yes | Marker per auto-init su `DOMContentLoaded`. |
| `data-accordion-section` | `.accordion__section` | yes | Marker della sezione. |
| `data-accordion-trigger` | `.accordion__header` | yes | Marker del trigger cliccabile. |
| `aria-expanded` | `.accordion__header` | yes | Sincronizzato dal JS (`true` / `false`). |
| `type="button"` | `.accordion__header` | yes | Necessario perche' il trigger e' un `<button>`. |
| `aria-hidden="true"` | `.accordion__icon` | yes | L'icona e' decorativa. |

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/accordion.css" />
<script src="../node_modules/@ebattt/skillpress-ui/js/accordion.js"></script>
```

Oppure via bundle (gia' include `accordion.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
<script src="../node_modules/@ebattt/skillpress-ui/js/accordion.js"></script>
```

## Behavior JS

```text
Init: auto-init su DOMContentLoaded per ogni [data-accordion]
      esplicita: window.SkillpressUI.Accordion.init(container) — idempotente (flag __skillpressAccordionInit)
Event: sp:accordion:open  (bubbles: true)  emesso quando una sezione viene aperta
       sp:accordion:close (bubbles: true)  emesso quando una sezione viene chiusa
Cosa NON fa:
  - non gestisce logica business o dipendenze fra sezioni
  - non definisce payload JSON o nomi campo CMS
  - non crea markup delle card interne (popola solo gli slot documentati)
  - non persiste lo stato aperto fra refresh o navigazioni
```

Comportamento: click su `[data-accordion-trigger]` apre o chiude la sezione associata. Quando una sezione si apre, le altre sezioni dello stesso container vengono chiuse (single-open). Il JS aggiorna `aria-expanded` e la classe `expanded`; l'icona `+/-` reagisce via CSS.

Namespace globale: `window.SkillpressUI.Accordion`.

## Examples

- `Collapsed` → `primitives-accordion--collapsed`
- `Expanded` → `primitives-accordion--expanded`
- `MultipleSections` → `primitives-accordion--multiple-sections`
- `WithoutBadge` → `primitives-accordion--without-badge`
- `PopulatedContentSlot` → `primitives-accordion--populated-content-slot`

## Token usati

`--section-gap`, `--section-bg`, `--section-bg-expanded`, `--section-border`, `--section-radius`, `--section-number-size`, `--section-number-bg`, `--section-number-color`, `--color-bg-gray-50`, `--color-bg-gray-200`, `--color-text`, `--color-text-muted`, `--font-weight-semibold`, `--font-weight-bold`, `--font-size-base`, `--radius-full`, `--spacing-md`, `--transition-fast`, `--transition-slow`, `--transition-section`.

## Note CMS

- decide quali sezioni rendere visibili.
- decide il contenuto degli slot `header` e `content`.
- decide se una sezione parte `collapsed` o `expanded` (classe `expanded` + `aria-expanded` coerenti).
- decide se mostrare o omettere il badge numerato.
- non deve cambiare il markup interno della sezione, ne' aggiungere classi custom fuori contratto, ne' duplicare il behavior JS.

## Out of scope

- accordion come contenitore arbitrario con gerarchie diverse.
- stati non documentati.
- persistenza stato aperto fra refresh o navigazioni.
- dipendenze fra sezioni.
- payload JSON / nomi campo CMS.
