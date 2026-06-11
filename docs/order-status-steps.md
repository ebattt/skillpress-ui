---
title: OrderStatusSteps
description: Stepper stato prodotto nel dettaglio ordine dashboard.
layer: components
strategy: css-js
status: public-contract
package_path: components/order-status-steps.css
js_path: js/order-status-steps.js
---

# OrderStatusSteps

Stepper prodotto della dashboard ordine: step selezionabili con cerchi numerati,
icona check CSS e connettori. La libreria gestisce layout e behavior di selezione;
numero step, label, stato iniziale e contenuti applicativi sono backend/app.

## Markup contract

```html
<div class="product-stepper" data-order-status-steps>
    <button class="product-stepper__step product-stepper__step--completed product-stepper__step--selected"
            type="button"
            aria-pressed="true"
            data-order-status-steps-item
            data-order-status-steps-step-id="files">
        <span class="product-stepper__circle">
            <span class="product-stepper__icon product-stepper__icon--check" aria-hidden="true"></span>
        </span>
        <span class="product-stepper__label">File</span>
    </button>
    <span class="product-stepper__connector product-stepper__connector--completed" aria-hidden="true"></span>
    <button class="product-stepper__step product-stepper__step--active"
            type="button"
            aria-pressed="false"
            data-order-status-steps-item
            data-order-status-steps-step-id="production">
        <span class="product-stepper__circle"><span class="product-stepper__num">2</span></span>
        <span class="product-stepper__label">Produzione</span>
    </button>
</div>
```

## Classi pubbliche

| Class | Role |
|---|---|
| `.product-stepper` | Root flex dello stepper. |
| `.product-stepper__step` | Bottone step. |
| `.product-stepper__step--completed` | Step completato. |
| `.product-stepper__step--active` | Step corrente. |
| `.product-stepper__step--pending` | Step futuro. |
| `.product-stepper__step--rejected` | Step con problema. |
| `.product-stepper__step--selected` | Step selezionato per pannello applicativo. |
| `.product-stepper__circle` | Cerchio numero/check. |
| `.product-stepper__num` | Numero step. |
| `.product-stepper__icon--check` | Check CSS. |
| `.product-stepper__label` | Label step. |
| `.product-stepper__connector` | Connettore tra step. |
| `.product-stepper__connector--completed` | Connettore completato. |

## Data hooks

| Hook | Obbligatorio | Elemento | Ruolo |
|---|---:|---|---|
| `data-order-status-steps` | si | root | init componente |
| `data-order-status-steps-item` | si | step button | item selezionabile |
| `data-order-status-steps-step-id` | no | step button | id applicativo incluso nel dettaglio evento |

## Behavior

`window.SkillpressUI.OrderStatusSteps.init(root)` inizializza in modo idempotente.
Al click:

- imposta `.product-stepper__step--selected` sullo step scelto;
- sincronizza `aria-pressed`;
- emette `sp:order-status-steps:change` con `{ stepId, item }`.

La libreria non apre pannelli e non decide l'avanzamento reale.

## Ownership

- Backend/app: numero step, label, stato iniziale, step selezionato, contenuti
  applicativi.
- Libreria: layout, spacing, responsive, hover/focus, icona check,
  sincronizzazione `aria-pressed`, behavior di selezione.
