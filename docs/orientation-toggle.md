---
title: OrientationToggle
description: Toggle compatto Verticale/Orizzontale con icona preview formato.
layer: primitives
strategy: css-only
package_path: primitives/orientation-toggle.css
---

# OrientationToggle

Toggle compatto a due stati (Verticale/Orizzontale) con icona SVG che mostra la
preview del formato. Il container ha sfondo grigio semitrasparente; il bottone
attivo ha sfondo bianco con ombra. CSS-only: il consumer gestisce il toggle del
modifier `--active`.

## Anatomy

```text
sp-orientation-toggle            (flex row, bg grigio, border-radius, fit-content)
└── sp-orientation-toggle__btn × 2   [--active]
    ├── <svg>   (icona rettangolo verticale/orizzontale)
    └── testo
```

## Markup contract

```html
<div class="sp-orientation-toggle">
    <button class="sp-orientation-toggle__btn sp-orientation-toggle__btn--active">
        <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
            <rect x="0.5" y="0.5" width="9" height="13" rx="1" stroke-width="1" fill="white"/>
        </svg>
        Verticale
    </button>
    <button class="sp-orientation-toggle__btn">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <rect x="0.5" y="0.5" width="13" height="9" rx="1" stroke-width="1" fill="white"/>
        </svg>
        Orizzontale
    </button>
</div>
```

## Classi pubbliche

| Class | Role | Modifiers |
|---|---|---|
| `.sp-orientation-toggle` | container compatto con sfondo grigio | — |
| `.sp-orientation-toggle__btn` | singolo bottone toggle | `--active` |

## Data hooks

Nessun `data-*` pubblico. Il componente e' CSS-only.

## Modifier / stati

- `.sp-orientation-toggle__btn--active`: orientamento selezionato. Esattamente un
  bottone deve avere `--active` in ogni momento.
- Le SVG inline usano `stroke: currentColor` dalla regola `.sp-orientation-toggle__btn svg`.

## Ownership

- Consumer: stato iniziale, toggle al click e aggiornamento di formato/preview
  dipendenti.
- Libreria: layout compatto, spacing, stato attivo, hover/focus, styling SVG via
  `currentColor`.

## Out of scope

- behavior toggle JS (il consumer swappa il modifier al click);
- piu' di 2 opzioni (pattern binario verticale/orizzontale);
- stato disabled.
