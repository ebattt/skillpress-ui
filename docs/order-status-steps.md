---
title: OrderStatusSteps
description: Stepper stato prodotto nel dettaglio ordine dashboard.
layer: components
strategy: css-js
sources:
  demo_js: dashboard/js/order-products.js#L471-L513
  demo_css: dashboard/css/components/_order-detail.css#L252-L386
status: local-link-dev
package_path: components/order-status-steps.css
js_path: js/order-status-steps.js
---

# OrderStatusSteps

`OrderStatusSteps` copre lo stepper prodotto della dashboard ordine. Mantiene la
famiglia reale `.product-stepper*`, sostituisce Material Symbols con icona CSS
library-owned e converte gli stati generici della demo in modifier BEM strict.

## Fonte e reuse audit

Fonte reale: `dashboard/js/order-products.js`, funzione `renderTabButtons`, e
`dashboard/css/components/_order-detail.css`.

`StepIndicator` non viene riusato perche' e' il tracker configuratore della
product page: card grid non cliccabile, root `.step-indicator`, stati e
semantica diversi. `OrderProductDropdown` copre la card prodotto e lo slot dove
questo stepper puo' vivere, ma non il tracking. `Badge`, `Button`, `Card` e
`OrdersTable` non coprono connettori, cerchi numerati e selezione step.

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
| `.product-stepper__icon--check` | Check CSS library-owned. |
| `.product-stepper__label` | Label step. |
| `.product-stepper__connector` | Connettore tra step. |
| `.product-stepper__connector--completed` | Connettore completato. |

## Data hooks

| Hook | Obbligatorio | Elemento | Ruolo |
|---|---:|---|---|
| `data-order-status-steps` | si | root | init componente |
| `data-order-status-steps-item` | si | step button | item selezionabile |
| `data-order-status-steps-step-id` | no | step button | id applicativo incluso nel dettaglio evento |

## Modifier / stati

Modifier pubblici: `.product-stepper__step--completed`,
`.product-stepper__step--active`, `.product-stepper__step--pending`,
`.product-stepper__step--rejected`, `.product-stepper__step--selected` e
`.product-stepper__connector--completed`.

`window.SkillpressUI.OrderStatusSteps.init(root)` inizializza il componente in
modo idempotente. Al click:

- imposta `.product-stepper__step--selected` sullo step scelto;
- sincronizza `aria-pressed`;
- emette `sp:order-status-steps-change` con `{ stepId, item }`.

La libreria non apre pannelli e non decide l'avanzamento reale.

## Backend owns

Il backend/app decide numero step, label, stato iniziale, step selezionato e
associazione con eventuali contenuti applicativi.

## Library owns

La libreria decide layout, spacing, responsive, hover/focus, icona check,
sincronizzazione `aria-pressed` e behavior UI di selezione.

## Demo-only

Eventuali `data-section`, `data-orders-table-action`, toolbar scenari, renderer didattici e
fixture appartengono alla demo/app e non sono API pubbliche del componente.

## Out of scope

Upload file, controllo file, report, produzione, spedizione, tracking corriere,
stato ordine reale e pannelli `step-status-banner`.
