---
title: FormatCard
description: Selection card per formati prodotto con preview proporzionata.
layer: components
strategy: css-only
package_path: components/format-card.css
---

# FormatCard

Selection card per scegliere il formato del prodotto, dentro un container
`.format-cards` (1 colonna `<480px`, 4 colonne da 480px). CSS-only: lo stato
selezionato e' applicato dal CMS aggiungendo `.format-card--selected` alla card
scelta; il toggle e' consumer-side. La libreria fornisce solo markup + look.

## Anatomy

```text
.format-cards                       (grid 4 col / 2 col <480px)
└── .format-card  [--selected]      (button)
    ├── .format-card__preview        (relative; width/height inline dal CMS)
    │   ├── .format-card__preview-label  [--faded]
    │   ├── .format-card__preview-dashed     (opzionale: bordo tratteggiato)
    │   └── one of:
    │       ├── .format-card__preview-box        (full preview, stesso formato)
    │       ├── .format-card__preview-inner      (proporzionato dentro dashed)
    │       └── .format-card__preview-custom     (slot icona, formato libero)
    └── .format-card__text
        ├── .format-card__name
        └── .format-card__dims
```

## Markup contract

Variante "stesso formato" (es. A4):

```html
<button type="button" class="format-card format-card--selected">
    <div class="format-card__preview" style="width: 56px; height: 79px;">
        <span class="format-card__preview-label">A4</span>
        <div class="format-card__preview-box"><span>A4</span></div>
    </div>
    <div class="format-card__text">
        <div class="format-card__name">A4</div>
        <div class="format-card__dims">210 × 297 mm</div>
    </div>
</button>
```

Variante "comparativa" (es. Libro):

```html
<button type="button" class="format-card">
    <div class="format-card__preview" style="width: 56px; height: 79px;">
        <div class="format-card__preview-dashed"></div>
        <span class="format-card__preview-label format-card__preview-label--faded">A4</span>
        <div class="format-card__preview-inner" style="width: 44px; height: 62px;">
            <span style="font-size: 10px;">Libro</span>
        </div>
    </div>
    <div class="format-card__text">
        <div class="format-card__name">Libro</div>
        <div class="format-card__dims">165 × 235 mm</div>
    </div>
</button>
```

Variante "custom" (es. Libero): come sopra ma con `.format-card__preview-custom`
contenente uno slot icona SVG e dims "Custom".

## Classi pubbliche

| Classe | Ruolo | Required | Modifiers |
|---|---|---|---|
| `.format-cards` | grid container 4 col / 2 col <480px | yes | — |
| `.format-card` | card button | yes | `--selected` |
| `.format-card__preview` | wrapper preview (position relative) | yes | — |
| `.format-card__preview-label` | etichetta tipo formato | no | `--faded` |
| `.format-card__preview-box` | full preview (stesso formato) | no | — |
| `.format-card__preview-inner` | preview proporzionato dentro dashed | no | — |
| `.format-card__preview-dashed` | bordo tratteggiato di sfondo | no | — |
| `.format-card__preview-custom` | slot icona per formato libero | no | — |
| `.format-card__text` / `__name` / `__dims` | wrapper testo + nome + dimensioni | yes | — |

La libreria non impone width/height su preview/box/inner/custom: lo `style`
inline e' passato dal CMS in funzione di orientamento e proporzioni.

## Stati

- default → border gray-200, bg white.
- `:hover` → border `--color-border`; preview-box bg `#374151`.
- `.format-card--selected` → bg `--selection-highlight-bg`, border + name
  `--color-primary`, preview-box/inner bg primary, preview-custom bg
  `rgba(240,138,0,0.2)`.

## Data hooks

Nessun `data-*` funzionale di libreria. Un eventuale `data-format-card-format`
e' hook consumer/backend: la libreria non lo legge.

## Installation

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/format-card.css" />
```

Anche via bundle `bundles/demo-minimal.css`. Nessun JS richiesto.

## Note CMS

- la geometria della preview (`width`/`height` inline) e' decisione del CMS.
- il modifier `.format-card--selected` va mosso in coppia tra le card del gruppo.
- per la variante Libero, l'icona dentro `.format-card__preview-custom` e' uno
  slot SVG scelto dal CMS. Niente Material Symbols.

## Fuori scope

Scroll orizzontale/frecce (`.format-cards-scroll`/`-arrow`), espansione card
aggiuntive (`--show-more`), stato disabled condiviso, behavior toggle
`--selected`, famiglia SelectionCard estesa (`.paper-card`, `.visual-card`,
`.effect-card`, `.angolo-card`), input `.sp-custom-dims*`.
