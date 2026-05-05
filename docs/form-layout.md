# FormLayout

`FormLayout` fornisce helper di layout per form checkout: righe a 2/3 colonne,
divider per azioni "copia dati" e area azioni.

## Fonte

- Markup: `Skillpress-frontend/checkout/js/sections/payment-section.js`
- CSS: `Skillpress-frontend/checkout/css/components/_payment.css`
- Fonte correlata: `checkout/js/sections/shipping-section.js`
- Pagina target: `checkout`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/primitives/form-layout.css">
```

## Responsabilita

La libreria decide spacing, griglie responsive e allineamento. I campi restano
`FormPrimitives`; i bottoni restano `Button`; il backend/applicativo decide
validazione, copy, submit, salvataggio e campi condizionali.

## Reuse Audit

`FormPrimitives` copre field, label, input e select, ma non la griglia checkout
2/3 colonne del nuovo profilo.

`Button` copre le CTA, ma non il layout del form.

Non viene creato `BillingForm`: il pattern e' un helper generico di layout form.

## Markup

```html
<div class="form-layout" data-form-layout>
    <div class="form-layout__copy-row">
        <button class="button button--ghost button--sm" type="button">
            Copia dati dalla spedizione
        </button>
    </div>

    <div class="form-layout__row form-layout__row--2">
        <div class="form-field">
            <label class="label-text" for="billing-type">Tipologia</label>
            <select class="form-select" id="billing-type" name="billingType">
                <option>Persona fisica</option>
            </select>
        </div>
        <div class="form-field">
            <label class="label-text" for="billing-name">Nome</label>
            <input class="form-input" id="billing-name" type="text">
        </div>
    </div>
</div>
```

## Classi

- `.form-layout`
- `.form-layout__row`
- `.form-layout__row--2`
- `.form-layout__row--3`
- `.form-layout__copy-row`
- `.form-layout__actions`
- `.form-layout__actions--end`

## Fuori Scope

- validazione;
- show/hide campi societa;
- copy shipping to billing;
- submit/API;
- componenti form field.
