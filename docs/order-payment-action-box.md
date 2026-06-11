---
title: OrderPaymentActionBox
description: Banner azione pagamento nella vista dettaglio ordine dashboard.
layer: components
strategy: css-only
package_path: components/order-payment-action-box.css
---

# OrderPaymentActionBox

Banner azione sopra i prodotti nel dettaglio ordine dashboard, usato quando una
contabile e' richiesta o in revisione. CSS-only: la libreria possiede look,
stati visuali, focus e icone chrome; il backend decide presenza, stato, testo,
nome file, apertura modal, upload e verifica.

## Markup contract

```html
<div class="order-action-box" data-order-payment-action-box>
    <div class="order-action-box__icon-wrap">
        <span class="order-action-box__icon order-action-box__icon--receipt" aria-hidden="true"></span>
    </div>
    <div class="order-action-box__body">
        <p class="order-action-box__title">Contabile da caricare</p>
    </div>
    <button class="order-action-box__btn" type="button" data-orders-table-action="open-receipt-modal">
        <span class="order-action-box__icon order-action-box__icon--upload" aria-hidden="true"></span>
        Carica
    </button>
</div>
```

Stato in revisione: aggiungere `order-action-box--done` (+ `__icon-wrap--done`,
`__body--done`, `__done-label`, `__done-file`). Badge verificato:
`.order-action-box__verified-badge` o `.order-payment-status--verified`.

## Classi pubbliche

- `.order-action-box`, `--uploaded`, `--done`
- `.order-action-box__icon-wrap` (+`--uploaded`, `--done`)
- `.order-action-box__icon` (+`--receipt`, `--upload`, `--schedule`, `--verified`, `--check`)
- `.order-action-box__body` (+`--done`)
- `.order-action-box__title` (+`--uploaded`)
- `.order-action-box__detail`
- `.order-action-box__btn` (+`--demo`)
- `.order-action-box__done-label`, `__done-file`, `__done-sep`, `__done-notice`
- `.order-action-box__verified-badge`
- `.order-payment-status` (+`--verified`)

## Data hooks

Nessun `data-*` pubblico richiesto (componente CSS-only).
`data-order-payment-action-box` e `data-orders-table-action` sono locator/wiring
app, non API della libreria.

## Fuori scope

Modal contabile, upload reale, validazione file, eventi submit, simulazione
verifica, aggiornamento pagamento/sidebar/header e business logic.
