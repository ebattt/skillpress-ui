---
title: Card
description: Superficie contenitore generica con slot media/header/body/footer, niente card CMS specifiche.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_cards.css
  demo: product-page-integration/index.html
status: published-0.2.0-alpha.0
package_path: primitives/card.css
---

# Card

Superficie contenitore generica per blocchi informativi o selezionabili: bordo, radius, background, padding interno, gerarchia base titolo/testo e stati visuali semplici. Non sostituisce `feature-box`, `visual-card`, `paper-card`, `format-card`, `step-indicator__item`: quelle restano da estrarre come componenti dedicati.

## Anatomy

```text
Card
└── .card   [--interactive | --selected | --disabled | --control-row | --surface-muted]
    ├── .card__media     (opzionale, immagine/picture full-width)
    ├── .card__header    (opzionale, eyebrow + titolo)
    │   ├── .card__eyebrow
    │   └── .card__title
    ├── .card__body      (slot principale, flex 1)
    │   ├── .card__title
    │   └── .card__description
    └── .card__footer    (opzionale, eyebrow + actions)
        ├── .card__eyebrow
        └── .card__actions   (slot ripetibile per Button/link)
```

## Markup contract

Markup minimo:

```html
<article class="card">
  <div class="card__body">
    <h3 class="card__title">Titolo card</h3>
    <p class="card__description">Descrizione breve del contenuto.</p>
  </div>
</article>
```

Con slot opzionali (header, body, footer):

```html
<article class="card">
  <div class="card__header">
    <div>
      <span class="card__eyebrow">Eyebrow</span>
      <h3 class="card__title">Titolo tecnico</h3>
    </div>
  </div>
  <div class="card__body">
    <p class="card__description">Descrizione tecnica dello slot.</p>
  </div>
  <div class="card__footer">
    <span class="card__eyebrow">Footer</span>
    <div class="card__actions">
      <!-- Slot azioni opzionale -->
    </div>
  </div>
</article>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.card` | shell della superficie, applica bordo/radius/background | yes | `--interactive`, `--selected`, `--disabled`, `--control-row`, `--surface-muted` |
| `.card__media` | wrapper immagine full-width | no | — |
| `.card__header` | header flex con eyebrow + titolo | no | — |
| `.card__body` | slot principale, flex 1 | no | — |
| `.card__footer` | footer flex con border-top | no | — |
| `.card__title` | titolo (h3) | no | — |
| `.card__description` | descrizione testuale, color secondary | no | — |
| `.card__eyebrow` | label sopra-testo, font-size xs | no | — |
| `.card__actions` | slot ripetibile per Button o link | no | — |
| `.card--surface-muted` | superficie grigia per pannelli interni checkout/dashboard | no | — |
| `.card--control-row` | superficie per righe controllo checkout-like con radius xl, titolo 14px/600 e subtitle xs | no | — |

Almeno uno tra `.card__body`, `.card__header` o contenuto equivalente deve essere presente.

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `aria-disabled="true"` | `.card` | no | Da usare quando una card interattiva non e' disponibile. |

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/card.css" />
```

Oppure via bundle (gia' include `card.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` → `primitives-card--default`
- `InteractiveStates` → `primitives-card--interactive-states`
- `SurfaceMuted` → `primitives-card--surface-muted`
- `ControlRow` → `primitives-card--control-row`
- `ReferenceFromElementsUI` → `primitives-card--reference-from-elements-ui`

## Token usati

`--color-bg-white`, `--color-bg-gray-100`, `--color-bg-gray-200`, `--color-text`, `--color-text-secondary`, `--color-text-light`, `--color-border`, `--color-border-focus`, `--radius-lg`, `--font-size-base`, `--font-size-sm`, `--font-size-xs`, `--font-weight-bold`, `--font-weight-semibold`, `--line-height-snug`, `--line-height-normal`, `--spacing-md`, `--spacing-sm`, `--spacing-xs`, `--shadow-md`, `--transition-fast`, `--selection-highlight-bg`, `--selection-highlight-border`.

## Note CMS

- elemento HTML usato (`article`, `section`, `div`, `a` quando semanticamente corretto).
- contenuto degli slot.
- stato iniziale `selected` o `disabled`.
- variante `card--control-row` per righe compatte con toggle/azione laterale,
  radius xl e allineamento coerente con la riga `shipping-toggle-row`.
- superficie `card--surface-muted` quando la pagina reale richiede un box grigio
  con bordo e padding ampio.
- composizione con primitive esistenti come Button e Badge.
- eventuali immagini o URL editoriali dentro lo slot media.

## Out of scope

- product-card o catalog-card.
- feature-box, step-card, paper-card o format-card.
- layout griglia.
- varianti decorative senza fonte `elements-ui`.
- hover image swap.
- behavior JS (selezione, routing, tracking).
- icone Material Symbols.
