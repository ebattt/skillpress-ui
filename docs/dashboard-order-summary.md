---
title: DashboardOrderSummary
description: Riepilogo ordine post-acquisto nella sidebar dashboard.
layer: components
strategy: css-only
package_path: components/dashboard-order-summary.css
---

# DashboardOrderSummary

Riepilogo ordine post-acquisto nella sidebar del dettaglio ordine dashboard: item, subtotale, imposta, totale e una CTA di download. CSS-only. La libreria possiede layout, sticky desktop, spacing, superficie e icona download; il backend possiede righe item, label, importi formattati e comportamento del download.

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

- `.order-summary`, `.order-detail-grid__summary`, `__title`
- `.order-summary__items`, `__item`, `__item-name`, `__item-qty`, `__item-price`
- `.order-summary__divider`
- `.order-summary__totals`, `__row`, `__label`, `__value`
- `.order-summary__total`, `__total-label`, `__total-value`
- `.order-summary__actions`, `__download-btn`, `__download-icon`

## Data hooks

Nessun `data-*` pubblico richiesto (CSS-only). `data-dashboard-order-summary` è un locator demo/app opzionale. Nessun modifier visuale dedicato.

## Out of scope

Calcoli fiscali, formattazione valuta, download reale, routing, payment/shipping dropdown e header dettaglio ordine.
