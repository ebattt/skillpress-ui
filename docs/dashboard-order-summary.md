---
title: DashboardOrderSummary
description: Riepilogo ordine post-acquisto nella sidebar dashboard.
layer: components
strategy: css-only
sources:
  demo_html: dashboard/index.html#L428-L450
  demo_js: dashboard/js/order-detail.js#L292-L307
  demo_css: dashboard/css/components/_order-detail.css#L562-L670
status: public-contract
package_path: components/dashboard-order-summary.css
---

# DashboardOrderSummary

`DashboardOrderSummary` renderizza il riepilogo ordine nella sidebar del
dettaglio ordine dashboard. E' un componente post-acquisto: mostra item,
subtotale, imposta, totale e una CTA di download.

## Reuse Audit

`CheckoutSummary` non viene riusato perche' rappresenta il riepilogo checkout
pre-acquisto, con root `.checkout-summary`, CTA di avanzamento, note e help.
`SidebarTotals` e' specifico del configuratore prodotto. `Card` non copre il
contratto item/totali/CTA della fonte reale.

## Markup contract

```html
<article class="order-summary order-detail-grid__summary" data-dashboard-order-summary>
    <h3 class="order-summary__title">Riepilogo ordine</h3>
    <div class="order-summary__items">
        <div class="order-summary__item">
            <div>
                <p class="order-summary__item-name">Articoli totali</p>
                <p class="order-summary__item-qty">1 prodotto</p>
            </div>
            <span class="order-summary__item-price">320,50 &euro;</span>
        </div>
    </div>
    <hr class="order-summary__divider">
    <div class="order-summary__totals">
        <div class="order-summary__row">
            <span class="order-summary__label">Subtotale</span>
            <span class="order-summary__value">262,70 &euro;</span>
        </div>
        <div class="order-summary__row">
            <span class="order-summary__label">Imposta</span>
            <span class="order-summary__value">57,80 &euro;</span>
        </div>
    </div>
    <div class="order-summary__total">
        <span class="order-summary__total-label">Totale</span>
        <span class="order-summary__total-value">320,50 &euro;</span>
    </div>
    <div class="order-summary__actions">
        <button class="order-summary__download-btn" type="button">
            <span class="order-summary__download-icon" aria-hidden="true"></span>
            Scarica riepilogo
        </button>
    </div>
</article>
```

## Classi pubbliche

- `.order-summary`
- `.order-detail-grid__summary`
- `.order-summary__title`
- `.order-summary__items`
- `.order-summary__item`
- `.order-summary__item-name`
- `.order-summary__item-qty`
- `.order-summary__item-price`
- `.order-summary__divider`
- `.order-summary__totals`
- `.order-summary__row`
- `.order-summary__label`
- `.order-summary__value`
- `.order-summary__total`
- `.order-summary__total-label`
- `.order-summary__total-value`
- `.order-summary__actions`
- `.order-summary__download-btn`
- `.order-summary__download-icon`

## Data hooks

Nessun data-* pubblico richiesto. Il componente e CSS-only.

`data-dashboard-order-summary` puo' essere usato come locator demo/app, ma non e'
richiesto dalla libreria.

## Modifier / stati

Nessun modifier visuale pubblico dedicato. Gli stati derivano da contenuti e CTA
renderizzati dal backend/app.

## Backend owns

Il backend/app decide righe item, label, importi formattati, presenza della CTA
e comportamento del download.

## Library owns

La libreria decide layout, sticky desktop, spacing, typography, superficie e
icona download.

## Demo-only

`data-dashboard-order-summary` se usato come locator. Eventuali `data-section`,
toolbar scenari, renderer didattici e fixture appartengono alla demo/app.

## Differenze dalla demo

- Material Symbols `download` viene sostituita da icona CSS library-owned.
- `.dashboard-btn--outline` della demo viene ricondotto a
  `.order-summary__download-btn`, elemento BEM del componente.

## Out of scope

Calcoli fiscali, formattazione valuta, download reale, routing, payment/shipping
dropdown e header dettaglio ordine.
