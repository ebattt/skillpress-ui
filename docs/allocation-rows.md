---
title: AllocationRows
description: Righe checkout per allocare copie/prodotti su destinazioni multiple.
layer: components
strategy: css-only
sources:
  checkout_js: checkout/js/sections/shipping-section.js
  checkout_css: checkout/css/components/_shipping.css
status: local-link-dev
package_path: components/allocation-rows.css
---

# AllocationRows

Righe compatte per allocazione copie in checkout multi-spedizione. Il componente
copre gerarchia prodotto/copertine, input quantità e badge stato. Non calcola
totali, residui o validazione.

## Anatomy

```text
AllocationRows
├── .allocation-summary-box
│   ├── .allocation-summary-box__title
│   └── .allocation-summary-box__rows
│       └── .allocation-rows
│           ├── .allocation-rows__group
│           │   ├── .allocation-rows__row [--parent]
│           │   └── .allocation-rows__children
│           │       └── .allocation-rows__row [--child]
│           └── .allocation-rows__row
└── .allocation-badge [--success | --warning | --error]
```

## Markup contract

Righe input per una destinazione:

```html
<div class="allocation-rows" data-allocation-rows>
  <div class="allocation-rows__group">
    <div class="allocation-rows__row allocation-rows__row--parent">
      <div class="allocation-rows__info">
        <span class="allocation-rows__name">Libri brossura fresata</span>
        <span class="allocation-rows__qty">(100)</span>
      </div>
    </div>
    <div class="allocation-rows__children">
      <div class="allocation-rows__row allocation-rows__row--child">
        <div class="allocation-rows__info">
          <span class="allocation-rows__name">Copertina A</span>
          <span class="allocation-rows__qty">(50)</span>
        </div>
        <input class="form-input allocation-rows__input" type="number" min="0" max="50" value="25">
      </div>
    </div>
  </div>
</div>
```

Riepilogo con badge:

```html
<div class="allocation-summary-box">
  <p class="allocation-summary-box__title">Riepilogo allocazione copie</p>
  <div class="allocation-summary-box__rows">
    <div class="allocation-rows">
      <div class="allocation-rows__row">
        <div class="allocation-rows__info">
          <span class="allocation-rows__name">Libro con copertina rigida</span>
          <span class="allocation-rows__qty">(120/120)</span>
        </div>
        <span class="allocation-badge allocation-badge--success">Tutte assegnate</span>
      </div>
    </div>
  </div>
</div>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.allocation-summary-box` | contenitore riepilogo globale | no | — |
| `.allocation-summary-box__title` | titolo riepilogo | no | — |
| `.allocation-summary-box__rows` | slot righe riepilogo | no | — |
| `.allocation-rows` | root lista righe | yes | — |
| `.allocation-rows__group` | gruppo prodotto con children | no | — |
| `.allocation-rows__children` | righe figlie indentate | no | — |
| `.allocation-rows__label` | label opzionale sopra lista, es. "Copie" | no | — |
| `.allocation-rows__row` | riga prodotto/copertina | yes | `--parent`, `--child` |
| `.allocation-rows__info` | wrapper nome + quantità | yes | — |
| `.allocation-rows__name` | nome prodotto/copertina | yes | — |
| `.allocation-rows__qty` | quantità o progresso | no | — |
| `.allocation-rows__input` | input quantità, da comporre con `.form-input` | no | — |
| `.allocation-badge` | badge stato allocazione | no | `--success`, `--warning`, `--error` |

Modifier root:

| Class | Role |
|---|---|
| `.allocation-rows--section` | aggiunge gap quando la lista segue un titolo/eyebrow nello stesso slot |

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/components/allocation-rows.css" />
```

Nessun JavaScript di libreria richiesto.

## Examples

- `DestinationInputs` → `components-allocationrows--destination-inputs`
- `AllocationSummary` → `components-allocationrows--allocation-summary`
- `ReferenceFromCheckout` → `components-allocationrows--reference-from-checkout`

## Note CMS

- Il backend decide elenco righe, quantità, min/max/value degli input e badge.
- `allocation-badge--success|warning|error` sono stati presentazionali.
- Per gli input usare sempre `form-input allocation-rows__input`.
- La libreria non aggiorna badge o totali al cambio input.

## Out of scope

- calcolo copie residue;
- validazione allocation;
- aggiunta/rimozione destinazioni;
- sync con carrello o prezzi;
- submit/salvataggio checkout.
