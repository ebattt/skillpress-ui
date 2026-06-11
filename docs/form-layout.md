---
title: FormLayout
description: Helper di layout per form checkout (righe a 2/3 colonne, divider azioni, area azioni).
layer: primitives
strategy: css-only
package_path: primitives/form-layout.css
---

# FormLayout

Helper di layout per i form checkout: righe a 2/3 colonne, riga azione "copia
dati" e area azioni. La libreria decide spacing, griglie responsive e
allineamento. I campi restano `FormPrimitives`, i bottoni `Button`; il
backend/app decide validazione, copy, submit e campi condizionali. CSS-only.

## Markup contract

```html
<div class="sp-form-layout sp-form-layout--compact" data-form-layout>
    <div class="sp-form-layout__copy-row">
        <button class="sp-button sp-button--ghost sp-button--sm" type="button">
            Copia dati dalla spedizione
        </button>
    </div>
    <div class="sp-form-layout__row sp-form-layout__row--2">
        <div class="sp-form-field">
            <label class="sp-label-text" for="billing-type">Tipologia</label>
            <select class="sp-form-select" id="billing-type" name="billingType">
                <option>Persona fisica</option>
            </select>
        </div>
        <div class="sp-form-field">
            <label class="sp-label-text" for="billing-name">Nome</label>
            <input class="sp-form-input" id="billing-name" type="text">
        </div>
    </div>
</div>
```

## Classi pubbliche

- `.sp-form-layout`
- `.sp-form-layout--compact` (label interne a 14px per form densi; non cambia
  `FormPrimitives` globalmente)
- `.sp-form-layout__row`, `__row--2`, `__row--3`
- `.sp-form-layout__copy-row` (azione opzionale sopra i campi)
- `.sp-form-layout__actions`, `__actions--end`

## Fuori scope

Validazione, show/hide campi societa, copy shipping-to-billing, submit/API,
componenti form field.
