---
title: AllocationRows
description: Righe checkout per allocare copie/prodotti su destinazioni multiple.
layer: components
strategy: css-only
package_path: components/allocation-rows.css
---

# AllocationRows

Righe compatte per allocazione copie in checkout multi-spedizione: gerarchia prodotto/copertine, input quantità e badge stato. CSS-only. La libreria non calcola totali, residui o validazione e non aggiorna badge/totali al cambio input.

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
        <input class="sp-form-input allocation-rows__input" type="number" min="0" max="50" value="25">
      </div>
    </div>
  </div>
</div>
```

Riepilogo con badge: avvolgere `.allocation-rows` in `.allocation-summary-box` (+ `__title`, `__rows`) e usare `.allocation-badge` nella riga.

## Classi pubbliche

| Class | Ruolo | Modifiers |
|---|---|---|
| `.allocation-summary-box` | contenitore riepilogo | — |
| `.allocation-summary-box__title` | titolo riepilogo | — |
| `.allocation-summary-box__rows` | slot righe riepilogo | — |
| `.allocation-rows` | root lista righe | `--section` (gap quando segue un titolo/eyebrow) |
| `.allocation-rows__group` | gruppo prodotto con children | — |
| `.allocation-rows__children` | righe figlie indentate | — |
| `.allocation-rows__label` | label opzionale sopra lista | — |
| `.allocation-rows__row` | riga prodotto/copertina | `--parent`, `--child` |
| `.allocation-rows__info` | wrapper nome + quantità | — |
| `.allocation-rows__name` | nome prodotto/copertina | — |
| `.allocation-rows__qty` | quantità o progresso | — |
| `.allocation-rows__input` | input quantità, da comporre con `.sp-form-input` | — |
| `.allocation-badge` | badge stato | `--success`, `--warning`, `--error` |

## Note

- Righe top-level semibold, righe child più leggere per gerarchia.
- Desktop: badge allineato a destra; mobile: badge sotto al nome.

## Out of scope

- calcolo copie residue, validazione allocation;
- aggiunta/rimozione destinazioni;
- sync con carrello o prezzi;
- submit/salvataggio checkout.
