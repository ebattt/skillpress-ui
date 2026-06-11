---
title: CheckoutSummary
description: Riepilogo ordine sidebar della pagina checkout (pre-acquisto).
layer: components
strategy: css-only
package_path: components/checkout-summary.css
---

# CheckoutSummary

Riepilogo ordine della sidebar checkout: lista articoli, totali, CTA di avanzamento, nota e blocco assistenza. CSS-only. La libreria possiede markup BEM, layout, sticky opt-in, colori, stato disabled CTA e icona info; il backend possiede item, importi già formattati, CTA `href`/testo, nota e link assistenza.

## Markup contract

```html
<aside class="checkout-summary checkout-summary--sticky checkout-summary--mobile-hidden" aria-labelledby="checkout-summary-title">
    <div class="checkout-summary__card">
        <div>
            <h3 class="checkout-summary__title" id="checkout-summary-title">Riepilogo ordine</h3>
            <div class="checkout-summary__items">
                <div class="checkout-summary__item">
                    <div class="checkout-summary__item-info">
                        <p class="checkout-summary__item-name">Libri brossura fresata</p>
                        <p class="checkout-summary__item-qty">500 copie</p>
                    </div>
                    <span class="checkout-summary__item-price">919,99 &euro;</span>
                </div>
            </div>
            <hr class="checkout-summary__divider">
            <div class="checkout-summary__totals">
                <div class="checkout-summary__total-row checkout-summary__total-row--success">
                    <span class="checkout-summary__total-label">Spedizione</span>
                    <span class="checkout-summary__total-value">Gratuita</span>
                </div>
            </div>
            <hr class="checkout-summary__divider">
            <div class="checkout-summary__grand-total">
                <span class="checkout-summary__grand-label">Totale</span>
                <span class="checkout-summary__grand-value">2.708,38 &euro;</span>
            </div>
        </div>
        <a class="checkout-summary__cta" href="/checkout/spedizione">Avanti</a>
    </div>
    <div class="checkout-summary__note">
        <span class="checkout-summary__note-icon" aria-hidden="true"></span>
        <p class="checkout-summary__note-text">Il caricamento dei file sarà disponibile dopo il pagamento.</p>
    </div>
    <div class="checkout-summary__help">
        <p class="checkout-summary__help-text">Hai bisogno di aiuto?</p>
        <a href="/assistenza" class="checkout-summary__help-link">Contatta l'assistenza</a>
    </div>
</aside>
```

## Classi pubbliche

- `.checkout-summary`, `--sticky`, `--mobile-hidden`
- `.checkout-summary__card`, `__title`
- `.checkout-summary__items`, `__item`, `__item-info`, `__item-name`, `__item-qty`, `__item-price`, `__empty`
- `.checkout-summary__divider`
- `.checkout-summary__totals`, `__total-row`, `__total-row--success`, `__total-label`, `__total-value`
- `.checkout-summary__grand-total`, `__grand-label`, `__grand-value`
- `.checkout-summary__cta`
- `.checkout-summary__note`, `__note-icon`, `__note-text`
- `.checkout-summary__help`, `__help-text`, `__help-link`

## Modifier / stati

- `--sticky`: sticky desktop/tablet nella colonna laterale.
- `--mobile-hidden`: nasconde la card sotto `1024px` quando la pagina monta `CheckoutMobileSummary`.
- `__total-row--success`: valore riga in verde (es. `Spedizione: Gratuita`).
- `.checkout-summary__cta:disabled` o `[aria-disabled="true"]`: CTA non cliccabile.
- `.checkout-summary__empty`: messaggio empty cart nello slot lista.

Nessun `data-*` pubblico.

## Out of scope

- calcolo subtotale/IVA/spedizione/totale;
- coupon, carrello, rimozione prodotti;
- navigazione step checkout;
- componente `OrderSummary` generico.
