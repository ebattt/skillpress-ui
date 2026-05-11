# CheckoutMobileSummary

`CheckoutMobileSummary` renderizza il riepilogo ordine fixed bottom per checkout mobile/tablet (`<=1023px`): totale, CTA e pannello espandibile con dettagli ordine.

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/checkout-mobile-summary.css">
<script src="/node_modules/@ebattt/skillpress-ui/js/checkout-mobile-summary.js" defer></script>
```

Il bundle `bundles/checkout.css` include gia' il CSS.

## Responsabilita

La libreria gestisce layout fixed, safe area, stato espanso, focus/disabled, overlay e toggle accessibile.

Il backend/CMS gestisce item, importi formattati, testi, `href`/stato CTA e sincronizzazione con gli step checkout.

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
                <div class="checkout-mobile-summary__detail-row">
                    <span class="checkout-mobile-summary__detail-label">Subtotale</span>
                    <span class="checkout-mobile-summary__detail-value">2.219,98 &euro;</span>
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

- `.checkout-mobile-summary`
- `.checkout-mobile-summary--expanded`
- `.checkout-mobile-summary__overlay`
- `.checkout-mobile-summary__container`
- `.checkout-mobile-summary__handle`
- `.checkout-mobile-summary__handle-icon`
- `.checkout-mobile-summary__compact`
- `.checkout-mobile-summary__total-line`
- `.checkout-mobile-summary__label`
- `.checkout-mobile-summary__price`
- `.checkout-mobile-summary__cta`
- `.checkout-mobile-summary__expanded`
- `.checkout-mobile-summary__details`
- `.checkout-mobile-summary__detail-row`
- `.checkout-mobile-summary__detail-row--success`
- `.checkout-mobile-summary__detail-label`
- `.checkout-mobile-summary__detail-value`
- `.checkout-mobile-summary__items`
- `.checkout-mobile-summary__item`
- `.checkout-mobile-summary__item-info`
- `.checkout-mobile-summary__item-name`
- `.checkout-mobile-summary__item-qty`
- `.checkout-mobile-summary__item-price`

## Data hooks

- `[data-checkout-mobile-summary]`
- `[data-checkout-mobile-summary-toggle]`
- `[data-checkout-mobile-summary-overlay]`

## Eventi

- `sp:checkout-mobile-summary:open`
- `sp:checkout-mobile-summary:close`

## Out of scope

- calcolo totali;
- validazione checkout;
- navigazione step;
- gestione carrello e coupon.
