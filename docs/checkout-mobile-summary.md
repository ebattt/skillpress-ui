---
title: CheckoutMobileSummary
description: Riepilogo ordine fixed bottom per checkout mobile/tablet con pannello espandibile.
layer: components
strategy: css-js
package_path: components/checkout-mobile-summary.css
js_path: js/checkout-mobile-summary.js
---

# CheckoutMobileSummary

Riepilogo ordine fixed bottom per checkout mobile/tablet (`<=1023px`): totale, CTA e pannello espandibile con dettagli ordine. La libreria gestisce layout fixed, safe area, stato espanso, overlay e toggle accessibile; il backend possiede item, importi formattati, testi e `href`/stato CTA.

## Markup contract

```html
<div class="checkout-mobile-summary" data-checkout-mobile-summary>
    <div class="checkout-mobile-summary__overlay" data-checkout-mobile-summary-overlay></div>
    <div class="checkout-mobile-summary__container">
        <button class="checkout-mobile-summary__handle" type="button" aria-label="Espandi riepilogo ordine" aria-expanded="false" data-checkout-mobile-summary-toggle>
            <svg class="checkout-mobile-summary__handle-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>
        </button>
        <div class="checkout-mobile-summary__compact">
            <div class="checkout-mobile-summary__total-line">
                <span class="checkout-mobile-summary__label">Totale</span>
                <span class="checkout-mobile-summary__price">2.708,38 &euro;</span>
            </div>
            <a class="checkout-mobile-summary__cta" href="#shipping">Avanti</a>
        </div>
        <div class="checkout-mobile-summary__expanded">
            <div class="checkout-mobile-summary__details">
                <div class="checkout-mobile-summary__detail-row checkout-mobile-summary__detail-row--success">
                    <span class="checkout-mobile-summary__detail-label">Spedizione</span>
                    <span class="checkout-mobile-summary__detail-value">Gratuita</span>
                </div>
            </div>
            <div class="checkout-mobile-summary__items">
                <div class="checkout-mobile-summary__item">
                    <div class="checkout-mobile-summary__item-info">
                        <p class="checkout-mobile-summary__item-name">Libri brossura fresata</p>
                        <p class="checkout-mobile-summary__item-qty">500 copie</p>
                    </div>
                    <span class="checkout-mobile-summary__item-price">919,99 &euro;</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Classi pubbliche

- `.checkout-mobile-summary`, `--expanded`
- `.checkout-mobile-summary__overlay`, `__container`, `__handle`, `__handle-icon`
- `.checkout-mobile-summary__compact`, `__total-line`, `__label`, `__price`, `__cta`
- `.checkout-mobile-summary__expanded`, `__details`, `__detail-row`, `__detail-row--success`, `__detail-label`, `__detail-value`
- `.checkout-mobile-summary__items`, `__item`, `__item-info`, `__item-name`, `__item-qty`, `__item-price`

## Data hooks

- `[data-checkout-mobile-summary]`, `[data-checkout-mobile-summary-toggle]`, `[data-checkout-mobile-summary-overlay]`

## JS

Eventi: `sp:checkout-mobile-summary:open`, `sp:checkout-mobile-summary:close`.

## Out of scope

calcolo totali, validazione checkout, navigazione step, gestione carrello e coupon.
