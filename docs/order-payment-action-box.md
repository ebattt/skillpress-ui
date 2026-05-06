---
title: OrderPaymentActionBox
description: Banner azione pagamento nella vista dettaglio ordine dashboard.
layer: components
strategy: css-only
sources:
  demo_html: dashboard/index.html#L421-L423
  demo_js: dashboard/js/order-detail.js#L374-L470
  demo_css: dashboard/css/components/_order-detail.css#L676-L887
status: local-link-dev
package_path: components/order-payment-action-box.css
---

# OrderPaymentActionBox

`OrderPaymentActionBox` copre il banner azione sopra i prodotti nel dettaglio
ordine dashboard, usato quando una contabile e' richiesta o in revisione. La
libreria possiede solo look, stati visuali e icone chrome.

## Reuse Audit

`DashboardActionBadge` e `Badge` sono chip inline e non coprono il banner con
icona, corpo e CTA. `Button` copre azioni generiche ma non il sizing pill interno
e gli stati del banner. `Card` non copre bordo tratteggiato, layout e stati.
`FileUploadBox` copre modal/dropzone file, non il banner pagamento.
`DashboardDropdownBox` copre la disclosure Pagamento nella sidebar.

## Markup

```html
<div class="order-action-box" data-order-payment-action-box>
    <div class="order-action-box__icon-wrap">
        <span class="order-action-box__icon order-action-box__icon--receipt" aria-hidden="true"></span>
    </div>
    <div class="order-action-box__body">
        <p class="order-action-box__title">Contabile da caricare</p>
    </div>
    <button class="order-action-box__btn" type="button" data-action="open-receipt-modal">
        <span class="order-action-box__icon order-action-box__icon--upload" aria-hidden="true"></span>
        Carica
    </button>
</div>
```

Stato in revisione:

```html
<div class="order-action-box order-action-box--done" data-order-payment-action-box>
    <div class="order-action-box__icon-wrap order-action-box__icon-wrap--done">
        <span class="order-action-box__icon order-action-box__icon--schedule" aria-hidden="true"></span>
    </div>
    <div class="order-action-box__body order-action-box__body--done">
        <span class="order-action-box__done-label">Contabile in revisione, procedi a caricare i file</span>
        <span class="order-action-box__done-file" title="contabile-bonifico.pdf">contabile-bonifico.pdf</span>
    </div>
    <button class="order-action-box__btn order-action-box__btn--demo" type="button" data-action="demo-verify-receipt">
        <span class="order-action-box__icon order-action-box__icon--verified" aria-hidden="true"></span>
        Emula verifica
    </button>
</div>
```

Badge verificato:

```html
<div class="order-action-box__verified-badge">
    <span class="order-action-box__icon order-action-box__icon--check" aria-hidden="true"></span>
    <span>Pagamento verificato</span>
</div>

<span class="order-payment-status order-payment-status--verified">
    <span class="order-action-box__icon order-action-box__icon--check" aria-hidden="true"></span>
    Verificato
</span>
```

## Classi

- `.order-action-box`
- `.order-action-box--uploaded`
- `.order-action-box--done`
- `.order-action-box__icon-wrap`
- `.order-action-box__icon-wrap--uploaded`
- `.order-action-box__icon-wrap--done`
- `.order-action-box__icon`
- `.order-action-box__icon--receipt`
- `.order-action-box__icon--upload`
- `.order-action-box__icon--schedule`
- `.order-action-box__icon--verified`
- `.order-action-box__icon--check`
- `.order-action-box__body`
- `.order-action-box__body--done`
- `.order-action-box__title`
- `.order-action-box__title--uploaded`
- `.order-action-box__detail`
- `.order-action-box__btn`
- `.order-action-box__btn--demo`
- `.order-action-box__done-label`
- `.order-action-box__done-file`
- `.order-action-box__done-sep`
- `.order-action-box__done-notice`
- `.order-action-box__verified-badge`
- `.order-payment-status`
- `.order-payment-status--verified`

Hook opzionale:

- `[data-order-payment-action-box]`

## Responsabilita'

Il backend/app decide presenza del box, stato, testo, nome file, attributi
`data-action`, apertura modal, upload, verifica e aggiornamenti dati. La
libreria decide layout, spacing, bordo, stati visuali, focus e icone.

## Import

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/order-payment-action-box.css">
```

## Fuori Scope

Modal contabile, upload reale, validazione file, eventi submit, simulazione
verifica, aggiornamento pagamento/sidebar/header e business logic.
