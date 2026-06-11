---
title: StepIndicator
description: Tracker orizzontale di step con badge numerati e linea di connessione.
layer: components
strategy: css-only
package_path: components/step-indicator.css
---

# StepIndicator

Tracker orizzontale di step con badge numerati e linea di connessione (visibile
da desktop). CSS-only: lo stato di avanzamento e' controllato dal CMS spostando i
modifier `--active` / `--inactive` / `--completed` sui sub-element. Nessun
behavior JS: il rendering riflette ciò che il backend imposta in HTML.

## Anatomy

```text
step-indicator                        (page wrapper, max-width: --page-max-width)
└── step-indicator__wrapper
    └── step-indicator__container     (relative)
        ├── steps-line                (visibile >=1024px)
        └── steps-grid                (2 col mobile / 4 col >=1024px)
            └── step-indicator__item × N   [--active]
                └── step-card-content
                    ├── step-indicator__badge   [--active | --inactive | --completed]
                    └── step-info
                        ├── step-indicator__title   [--active | --inactive]
                        └── step-indicator__status  [--active | --inactive]
```

Cardinalita' tipica 2/3/4 step. La grid resta `repeat(4, 1fr)` da 1024px anche
con meno step (celle non occupate restano vuote).

## Markup contract

```html
<div class="step-indicator">
    <div class="step-indicator__wrapper">
        <div class="step-indicator__container">
            <div class="steps-line"></div>
            <div class="steps-grid">
                <div class="step-indicator__item step-indicator__item--active" data-step-indicator-step="1">
                    <div class="step-card-content">
                        <div class="step-indicator__badge step-indicator__badge--active"><span>1</span></div>
                        <div class="step-info">
                            <h3 class="step-indicator__title step-indicator__title--active">Configura</h3>
                            <span class="step-indicator__status step-indicator__status--active">In corso</span>
                        </div>
                    </div>
                </div>
                <div class="step-indicator__item" data-step-indicator-step="2">
                    <div class="step-card-content">
                        <div class="step-indicator__badge step-indicator__badge--inactive"><span>2</span></div>
                        <div class="step-info">
                            <h3 class="step-indicator__title step-indicator__title--inactive">Carrello</h3>
                            <span class="step-indicator__status step-indicator__status--inactive">In attesa</span>
                        </div>
                    </div>
                </div>
                <!-- step 3 e 4 come step 2 -->
            </div>
        </div>
    </div>
</div>
```

## Classi pubbliche

| Class | Role | Modifiers |
|---|---|---|
| `.step-indicator` | page wrapper, `--page-max-width` e padding | — |
| `.step-indicator__wrapper` | wrapper interno | — |
| `.step-indicator__container` | contesto `relative` per la linea | — |
| `.steps-line` | linea di connessione, visibile >=1024px | — |
| `.steps-grid` | grid 2 col mobile / 4 col desktop | — |
| `.step-indicator__item` | card singolo step | `--active` |
| `.step-card-content` | flex row badge + info | — |
| `.step-indicator__badge` | cerchio con numero | `--active`, `--inactive`, `--completed` |
| `.step-info` | wrapper testo (ellipsis) | — |
| `.step-indicator__title` | titolo h3 | `--active`, `--inactive` |
| `.step-indicator__status` | label stato | `--active`, `--inactive` |

`.step-indicator__badge--completed`: background success, testo bianco, mantiene il
numero (nessuna icona check).

## Data hooks

Nessun hook `data-*` richiesto dalla libreria. `data-step-indicator-step` e'
opzionale e consumer/backend-owned.

## Modifier / stati

Step attivo, inattivo e completato tramite modifier sui sub-element (badge +
titolo + status devono restare coerenti). La libreria non sincronizza
automaticamente gli stati.

## Ownership

- Backend: numero step, label, stato corrente/completato, coerenza dei modifier.
- Libreria: layout responsive, connettore desktop, badge, colori stato, ellipsis,
  spaziatura.

## Out of scope

- icona check nel badge completato (resta solo numero);
- step verticali o cliccabili;
- progress fill sulla linea;
- scroll spy / sync con il configuratore.
