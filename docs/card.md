---
title: Card
description: Superficie contenitore generica con slot media/header/body/footer.
layer: primitives
strategy: css-only
package_path: primitives/card.css
---

# Card

Superficie contenitore generica per blocchi informativi o selezionabili: bordo, radius, background, padding, gerarchia base titolo/testo e stati visuali. CSS-only. Non sostituisce `feature-box`, `format-card`, `step-indicator__item` o le card CMS specifiche.

## Anatomy

```text
Card
└── .sp-card   [--interactive | --selected | --disabled | --control-row | --surface-muted]
    ├── .sp-card__media     (opzionale, immagine full-width)
    ├── .sp-card__header    (opzionale)
    │   ├── .sp-card__eyebrow
    │   └── .sp-card__title
    ├── .sp-card__body      (slot principale, flex 1)
    │   ├── .sp-card__title
    │   └── .sp-card__description
    └── .sp-card__footer    (opzionale)
        ├── .sp-card__eyebrow
        └── .sp-card__actions   (slot ripetibile per Button/link)
```

## Markup contract

```html
<article class="sp-card">
  <div class="sp-card__body">
    <h3 class="sp-card__title">Titolo card</h3>
    <p class="sp-card__description">Descrizione breve del contenuto.</p>
  </div>
</article>
```

Almeno uno tra `.sp-card__body`, `.sp-card__header` o contenuto equivalente deve essere presente.

## Classi pubbliche

| Class | Ruolo | Modifiers |
|---|---|---|
| `.sp-card` | shell della superficie | `--interactive`, `--selected`, `--disabled`, `--control-row`, `--surface-muted` |
| `.sp-card__media` | wrapper immagine full-width | — |
| `.sp-card__header` | header flex eyebrow + titolo | — |
| `.sp-card__body` | slot principale | — |
| `.sp-card__footer` | footer flex con border-top | — |
| `.sp-card__title` | titolo | — |
| `.sp-card__description` | descrizione testuale | — |
| `.sp-card__eyebrow` | label sopra-testo | — |
| `.sp-card__actions` | slot ripetibile per Button/link | — |

- `.sp-card--surface-muted`: superficie grigia per pannelli interni checkout/dashboard.
- `.sp-card--control-row`: righe controllo checkout-like (radius xl, titolo 14px/600, subtitle xs).

Attributo: `aria-disabled="true"` quando una card interattiva non è disponibile. Nessun hook `data-*`. La libreria non applica/rimuove i modifier a runtime.

## Out of scope

- product-card/catalog-card, feature-box, format-card;
- layout griglia;
- behavior JS (selezione, routing, tracking);
- hover image swap.
