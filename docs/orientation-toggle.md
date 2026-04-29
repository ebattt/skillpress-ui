---
title: OrientationToggle
description: Toggle compatto Verticale/Orizzontale con icona preview formato.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_buttons.css#L444-L487
  demo: product-page-integration/js/sections/section-1.js#L158-L173
status: verified-local-link-dev
package_path: primitives/orientation-toggle.css
---

# OrientationToggle

Toggle compatto a due stati (Verticale/Orizzontale) con icona SVG che mostra la preview del formato. Il container ha sfondo grigio semitrasparente; il bottone attivo ha sfondo bianco con ombra. Il CMS/JS consumer gestisce il toggle del modifier `--active`.

## Anatomy

```text
OrientationToggle
└── orientation-toggle   (flex row, bg grigio, border-radius, fit-content)
    └── orientation-toggle__btn × 2   [--active]
        ├── <svg>             (icona rettangolo verticale/orizzontale)
        └── testo
```

## Markup contract

Markup verbatim da `product-page-integration/js/sections/section-1.js#L158-L173`.

```html
<div class="orientation-toggle">
    <button class="orientation-toggle__btn orientation-toggle__btn--active">
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <rect x="0.5" y="0.5" width="9" height="13" rx="1" stroke-width="1" fill="white"/>
        </svg>
        Verticale
    </button>
    <button class="orientation-toggle__btn">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <rect x="0.5" y="0.5" width="13" height="9" rx="1" stroke-width="1" fill="white"/>
        </svg>
        Orizzontale
    </button>
</div>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.orientation-toggle` | container compatto con sfondo grigio | yes | — |
| `.orientation-toggle__btn` | singolo bottone toggle | yes | `--active` |

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/orientation-toggle.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` (Verticale attivo) → `primitives-orientationtoggle--default`
- `HorizontalActive` (Orizzontale attivo) → `primitives-orientationtoggle--horizontal-active`
- `ReferenceFromElementsUI` (markup verbatim demo) → `primitives-orientationtoggle--reference-from-elements-ui`

## Token usati

`--spacing-xs`, `--spacing-sm`, `--radius-sm`, `--font-size-xs`, `--font-weight-medium`, `--color-text`, `--color-text-light`, `--color-text-secondary`, `--color-bg-white`, `--shadow-sm`, `--transition-fast`.

Valore letterale mantenuto dal catalogo:
- `rgba(229, 231, 235, 0.6)` su `.orientation-toggle` (sfondo grigio semitrasparente).

## Note CMS

- esattamente un bottone deve avere `--active` in ogni momento.
- le SVG inline usano `stroke: currentColor` dalla regola `.orientation-toggle__btn svg`; nella demo il colore e' forzato con `style="stroke: ..."` inline che puo' essere omesso se la regola CSS e' sufficiente.

## Out of scope

- behavior toggle JS (il consumer gestisce il click → swap modifier).
- piu' di 2 opzioni (il pattern e' binario: verticale/orizzontale).
- stato disabled.
- animazione di transizione tra stati (il catalogo usa solo `transition: all`).
