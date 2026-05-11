---
title: FormatCard
description: Selection card per formati prodotto con preview proporzionata.
layer: components
strategy: css-only
package_path: components/format-card.css
---

# FormatCard

Selection card per scegliere il formato del prodotto. Card a 1 colonna su mobile (sotto 480px) e 4 colonne da 480px in su, dentro un container `.format-cards`. CSS-only: lo stato selezionato e' applicato dal CMS aggiungendo `.format-card--selected` alla card scelta. Coerente con le altre primitive del configuratore (mode-switcher, option-buttons, orientation-toggle): la libreria fornisce solo markup + look, il toggle e' consumer-side.

Implementazione minima della famiglia SelectionCard: solo `.format-card*`. Le varianti `paper-card`, `visual-card`, `effect-card`, `angolo-card` restano fuori scope finche' non vengono richieste sulla consumer.

## Anatomy

```text
.format-cards                       (grid 4 col / 2 col <480px)
└── .format-card  [--selected]      (button)
    ├── .format-card__preview        (relative; width/height inline dal CMS)
    │   ├── .format-card__preview-label  [--faded]
    │   ├── .format-card__preview-dashed     (opzionale: bordo tratteggiato di sfondo)
    │   └── one of:
    │       ├── .format-card__preview-box        (full preview, varianti tipo A4 = stesso formato)
    │       ├── .format-card__preview-inner  (proporzionato dentro dashed, varianti tipo Libro/A5; width/height inline)
    │       └── .format-card__preview-custom     (slot icona, variante Libero; width/height inline)
    └── .format-card__text
        ├── .format-card__name           (nome formato)
        └── .format-card__dims           (dimensioni in mm o "Custom")
```

## Markup contract

Markup contract corrente.js#L199-L266` con `state.orientation === 'vertical'` (preview 56x79).

### Variante "stesso formato" (es. A4)

```html
<button type="button" class="format-card format-card--selected" data-format-card-format="a4">
    <div class="format-card__preview" style="width: 56px; height: 79px;">
        <span class="format-card__preview-label">A4</span>
        <div class="format-card__preview-box">
            <span>A4</span>
        </div>
    </div>
    <div class="format-card__text">
        <div class="format-card__name">A4</div>
        <div class="format-card__dims">210 × 297 mm</div>
    </div>
</button>
```

### Variante "comparativa" (es. Libro / A5)

```html
<button type="button" class="format-card" data-format-card-format="libro">
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

### Variante "custom" (es. Libero)

```html
<button type="button" class="format-card" data-format-card-format="libero">
    <div class="format-card__preview" style="width: 56px; height: 79px;">
        <div class="format-card__preview-dashed"></div>
        <span class="format-card__preview-label format-card__preview-label--faded">A4</span>
        <div class="format-card__preview-custom" style="width: 40px; height: 52px;">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
                 fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M3 9h18 M3 15h18 M9 3v18 M15 3v18"></path>
            </svg>
        </div>
    </div>
    <div class="format-card__text">
        <div class="format-card__name">Libero</div>
        <div class="format-card__dims">Custom</div>
    </div>
</button>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.format-cards` | grid container 4 col / 2 col <480px | yes | — |
| `.format-card` | card button | yes | `--selected` |
| `.format-card__preview` | wrapper preview, position relative | yes | — |
| `.format-card__preview-label` | etichetta tipo formato in alto-sx | no | `--faded` |
| `.format-card__preview-box` | full preview (stesso formato) | no | — |
| `.format-card__preview-inner` | preview proporzionato dentro dashed | no | — |
| `.format-card__preview-dashed` | bordo tratteggiato di sfondo | no | — |
| `.format-card__preview-custom` | slot icona per formato libero | no | — |
| `.format-card__text` | wrapper testo center | yes | — |
| `.format-card__name` | nome formato | yes | — |
| `.format-card__dims` | dimensioni testuali | yes | — |

Geometria preview: la libreria non impone width/height su `.format-card__preview` / `box-inner` / `custom`. Il CMS passa lo `style` inline in funzione di orientamento e proporzioni del formato (vertical 56x79, horizontal 79x56 nella demo).

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.format-card-preview` | `.format-card__preview` |
| `.format-card-preview-label` | `.format-card__preview-label` |
| `.format-card-preview-box` | `.format-card__preview-box` |
| `.format-card-preview-custom` | `.format-card__preview-custom` |
| `.format-card-preview-inner` | `.format-card__preview-inner` |
| `.format-card-preview-dashed` | `.format-card__preview-dashed` |
| `.format-card-text` | `.format-card__text` |
| `.format-card-name` | `.format-card__name` |
| `.format-card-dims` | `.format-card__dims` |

`.format-cards` (container), `.format-card` (block), `.format-card--selected` (modifier) sono invariati.

## Stati

- default → border `--color-bg-gray-200`, bg white.
- `:hover` → border `--color-border`, preview-box bg `#374151`, preview-custom bg `--color-bg-gray-200`.
- `.format-card--selected` → bg `--selection-highlight-bg` (`#FFF4E6`), border + name `--color-primary`, preview-box / box-inner bg `--color-primary`, preview-custom bg `rgba(240,138,0,0.2)`.
- `.format-card--selected:hover` → mantiene stato selezionato, preview-custom resta `rgba(240,138,0,0.2)`.

## Classi pubbliche

- `.format-cards`
- `.format-card`
- `.format-card--selected`
- `.format-card__preview`
- `.format-card__preview-label`
- `.format-card__preview-label--faded`
- `.format-card__preview-box`
- `.format-card__preview-inner`
- `.format-card__preview-dashed`
- `.format-card__preview-custom`
- `.format-card__text`
- `.format-card__name`
- `.format-card__dims`

## Data hooks

Nessun `data-*` funzionale pubblico. Attributi come `data-format-card-format` sono ammessi
come hook consumer/backend, ma la libreria non li legge e non li stabilizza come
API.

## Modifier / stati

- `.format-card--selected`: formato selezionato.
- `.format-card__preview-label--faded`: label formato base attenuata nelle
  preview comparative/custom.
- Hover/focus sono gestiti dal CSS della libreria.

## Backend owns

- Lista formati, label, dimensioni, orientamento e proporzioni.
- Geometria preview via inline style (`width`/`height`) coerente con il formato.
- Stato selezionato iniziale e toggle tra card.
- Eventuali hook consumer come `data-format-card-format`.

## Library owns

- Grid `.format-cards`, styling della card, stato selected, hover/focus e
  responsive 2/4 colonne.
- Styling degli slot preview e del testo, senza leggere dati dominio.

## Demo-only

- Calcolo fixture delle dimensioni demo e script del configuratore product-page.
- SVG custom di esempio per `Libero` e qualsiasi selector non documentato.

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/components/format-card.css" />
```

Oppure via bundle (gia' include `format-card.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto.

## Examples (Storybook)

- `Default` → `components-formatcard--default` (4 card vertical, A4 selezionata).
- `Reference` → `components-formatcard--reference-from-elements-ui` (markup verbatim demo).
- `Horizontal` → `components-formatcard--horizontal` (orientamento orizzontale 79x56).
- `LiberoSelected` → `components-formatcard--libero-selected` (variante custom con stato selected).
- `SinglePreviewBox` → `components-formatcard--single-preview-box` (preview-box senza dashed).

## Token usati

`--color-primary`, `--color-text`, `--color-text-light`, `--color-text-muted`, `--color-bg-white`, `--color-bg-gray-100`, `--color-bg-gray-200`, `--color-border`, `--selection-highlight-bg`, `--radius-lg`, `--spacing-xs`, `--spacing-sm`, `--font-size-xs`, `--font-weight-semibold`, `--font-weight-bold`, `--transition-fast`.

Valori letterali mantenuti dal catalogo:
- `#374151` su `.format-card:hover .format-card__preview-box` e `.format-card:hover .format-card__preview-inner`.
- `rgba(240, 138, 0, 0.2)` su `.format-card--selected .format-card__preview-custom`.
- `7px` font-size su `.format-card__preview-label`.
- `11px` font-size su preview-box span (testo formato).
- `0.625rem` padding su `.format-card`.
- `0.125rem` border-radius interno (preview-box, dashed, custom).

## Note CMS

- la geometria della preview (`width`/`height` inline) e' decisione del CMS, in base a `state.orientation` e proporzioni del formato.
- il modifier `.format-card--selected` deve essere mosso in coppia tra le card del gruppo.
- l'attributo `data-format-card-format` (o equivalente) e' libero: la libreria non lo legge, ma e' utile per query CMS-side e analytics.
- per la variante Libero, l'icona dentro `.format-card__preview-custom` e' uno slot: il CMS sceglie quale SVG inline usare. Niente Material Symbols.

## Out of scope

- `.format-cards-scroll`, `.format-cards-arrow(--left|--right)` (scroll orizzontale e frecce nav).
- `.format-card--show-more`, `.format-cards-hidden` (espansione card aggiuntive).
- stato disabilitato condiviso (vedere `.sp-radio-option--disabled` in FormControls; non implementato qui ne' nella famiglia `.paper-card`).
- famiglia SelectionCard estesa: `.paper-card`, `.visual-card`, `.effect-card`, `.angolo-card`.
- behavior toggle `--selected` (resta consumer-side).
- gestione dinamica orientamento (geometria via inline style del CMS).
- input `.sp-custom-dims*` per inserire larghezza/altezza personalizzate (separato).
