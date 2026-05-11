---
title: StepIndicator
description: Tracker orizzontale di step con badge numerati e linea di connessione.
layer: components
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_cards.css#L1037-L1178
  catalog_js: elements-ui/js/cards/card-step.js
  demo: product-page-integration/index.html#L512-L564
status: post-bem-2026-04-29
package_path: components/step-indicator.css
---

# StepIndicator

Tracker orizzontale di step con badge numerati e linea di connessione orizzontale visibile da desktop. Lo stato di avanzamento e' controllato dal CMS spostando i modifier `--active` / `--inactive` / `--completed` sui sub-element. Nessun behavior JS della libreria: il rendering riflette quel che il backend imposta in HTML.

## Anatomy

```text
StepIndicator
├── step-indicator                    (page wrapper, max-width: --page-max-width)
│   └── step-indicator__wrapper       (margin-bottom 1rem)
│       └── step-indicator__container (relative, max-width 64rem)
│           ├── steps-line            (visibile >=1024px, height 1px, color #D1D5DB)
│           └── steps-grid            (2 col mobile / 4 col >=1024px, z-index 10)
│               └── step-indicator__item × N    [--active]
│                   └── step-card-content (flex row, gap 0.625rem)
│                       ├── step-indicator__badge    [--active | --inactive | --completed]
│                       │   └── <span>N</span>
│                       └── step-info     (flex 1, min-width 0 per ellipsis)
│                           ├── step-indicator__title  (h3) [--active | --inactive]
│                           └── step-indicator__status (span) [--active | --inactive]
```

Cardinalita' tipica: 2 / 3 / 4 step. La grid resta `repeat(4, 1fr)` da 1024px anche con meno step (le celle non occupate restano vuote).

## Markup contract

Markup verbatim dalla pagina demo `product-page-integration/index.html#L512-L564`. Step 1 attivo, step 2-4 inattivi.

```html
<div id="step-cards" class="step-indicator">
    <div class="step-indicator__wrapper">
        <div class="step-indicator__container">
            <div class="steps-line"></div>
            <div class="steps-grid">
                <div class="step-indicator__item step-indicator__item--active" data-step-indicator-step="1">
                    <div class="step-card-content">
                        <div class="step-indicator__badge step-indicator__badge--active">
                            <span>1</span>
                        </div>
                        <div class="step-info">
                            <h3 class="step-indicator__title step-indicator__title--active">Configura</h3>
                            <span class="step-indicator__status step-indicator__status--active">In corso</span>
                        </div>
                    </div>
                </div>
                <div class="step-indicator__item" data-step-indicator-step="2">
                    <div class="step-card-content">
                        <div class="step-indicator__badge step-indicator__badge--inactive">
                            <span>2</span>
                        </div>
                        <div class="step-info">
                            <h3 class="step-indicator__title step-indicator__title--inactive">Carrello</h3>
                            <span class="step-indicator__status step-indicator__status--inactive">In attesa</span>
                        </div>
                    </div>
                </div>
                <!-- step 3 e 4 identici a step 2 con index e label diversi -->
            </div>
        </div>
    </div>
</div>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.step-indicator` | page wrapper, applica `--page-max-width` e padding | yes | — |
| `.step-indicator__wrapper` | wrapper interno con `margin-bottom: 1rem` | yes | — |
| `.step-indicator__container` | contesto `position: relative` per la `.steps-line` | yes | — |
| `.steps-line` | linea orizzontale di connessione, visibile >=1024px | yes | — |
| `.steps-grid` | grid responsive 2 col mobile / 4 col desktop | yes | — |
| `.step-indicator__item` | card del singolo step | yes | `--active` |
| `.step-card-content` | flex row interno (badge + info) | yes | — |
| `.step-indicator__badge` | cerchio 1.75rem con numero | yes | `--active`, `--inactive`, `--completed` |
| `.step-info` | wrapper testo, applica ellipsis | yes | — |
| `.step-indicator__title` | titolo h3 dello step | yes | `--active`, `--inactive` |
| `.step-indicator__status` | label stato testuale | yes | `--active`, `--inactive` |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `data-step-indicator-step="N"` | `.step-indicator__item` | no | Riferimento numerico. Usato dal CMS, non dalla libreria. |
| `id="step-cards"` | `.step-indicator` | no | Ancora di pagina opzionale. |

### Modifiers in catalog non in demo

- `.step-indicator__badge--completed`: documentato in `_cards.css#L1105` (background `--color-success`, testo bianco). Non esibito nella pagina `product-page-integration` perche' lo step 1 e' sempre quello attivo. Implementato in libreria, visibile in story `MidProgress`. Nessuna icona check al posto del numero.

## Mappatura nomi (demo product-page -> libreria)

La demo originale usava prefisso `step-*` con root `.steps-section`. La libreria post-prompt-19 usa BEM strict `.step-indicator__*`.

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.steps-section` | `.step-indicator` |
| `.steps-wrapper` | `.step-indicator__wrapper` |
| `.steps-container` | `.step-indicator__container` |
| `.step-card-item` | `.step-indicator__item` |
| `.step-card-item--active` | `.step-indicator__item--active` |
| `.step-badge` | `.step-indicator__badge` |
| `.step-badge--active` | `.step-indicator__badge--active` |
| `.step-badge--inactive` | `.step-indicator__badge--inactive` |
| `.step-badge--completed` | `.step-indicator__badge--completed` |
| `.step-title` | `.step-indicator__title` |
| `.step-title--active` | `.step-indicator__title--active` |
| `.step-title--inactive` | `.step-indicator__title--inactive` |
| `.step-status` | `.step-indicator__status` |

Utility/helper di layout invariati (block separati): `.step-card`, `.step-card-content`, `.step-info`, `.steps-grid`, `.steps-line`.

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/components/step-indicator.css" />
```

Oppure via bundle (gia' include `step-indicator.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` → `components-stepindicator--default`
- `ReferenceFromElementsUI` (markup verbatim demo) → `components-stepindicator--reference-from-elements-ui`
- `MidProgress` (mostra `--completed` verde) → `components-stepindicator--mid-progress`
- `ThreeSteps` (variante CMS a 3 step) → `components-stepindicator--three-steps`
- `Mobile` (viewport 390, grid a 2 colonne) → `components-stepindicator--mobile`

## Token usati

`--color-primary`, `--color-bg-white`, `--color-bg-gray-200`, `--color-text`, `--color-text-secondary`, `--color-text-light`, `--color-success`, `--radius-lg`, `--radius-full`, `--font-size-xs`, `--font-weight-bold`, `--font-weight-semibold`, `--font-weight-medium`, `--transition-slow`, `--page-max-width`.

Valori letterali mantenuti dal catalogo:
- `#374151` su `.step-indicator__title--inactive`.
- `#D1D5DB` su `.steps-line`.
- gradient `linear-gradient(135deg, #F08A00 0%, #FFB149 100%)` su `.step-indicator__badge--active`.

## Note CMS

- spostare i modifier `--active`/`--inactive`/`--completed` sui sub-element corretti in coppia: badge + titolo + status devono restare coerenti.
- testo dei titoli/status: l'overflow e' troncato con ellipsis su `.step-indicator__title`. Mantenere stringhe brevi (max ~20 char per cella desktop).
- `data-step-indicator-step` e' libero: la libreria non lo legge, ma e' utile per query CMS-side e analytics.

## Classi pubbliche

`.step-indicator`, `.step-indicator__wrapper`, `.step-indicator__container`, `.steps-line`, `.steps-grid`, `.step-indicator__item`, `.step-card-content`, `.step-indicator__badge`, `.step-info`, `.step-indicator__title`, `.step-indicator__status` e i modifier documentati `--active`, `--inactive`, `--completed`.

## Data hooks

Nessun hook `data-*` richiesto dalla libreria. `data-step-indicator-step` e' opzionale e consumer/backend-owned.

## Modifier / stati

Step attivo, inattivo e completato tramite modifier sui sub-element. La libreria non sincronizza automaticamente gli stati.

## Backend owns

Numero step, label, stato corrente/completato, coerenza dei modifier, `data-step-indicator-step` opzionale e analytics.

## Library owns

Layout responsive, connettore desktop, badge, colori stato, ellipsis dei titoli e spaziatura.

## Demo-only

Titoli degli step configuratore prodotto e progressione statica usata nelle stories/lab page.

## Out of scope

- icona check dentro `.step-indicator__badge--completed` (resta solo numero).
- wrapper `.step-card` con hover translateY (la pagina demo non lo usa).
- step verticali.
- step cliccabili (resta `<div>`).
- animazioni sequenziali sul badge.
- progress fill sulla `.steps-line`.
- sticky positioning della section.
- scroll spy / sync con il configuratore.
- auto-fit della grid (con 2 o 3 step le celle desktop restano vuote).
