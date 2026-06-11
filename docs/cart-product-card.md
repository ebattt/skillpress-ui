---
title: CartProductCard
description: Riga prodotto del carrello checkout con pannello dettagli espandibile.
layer: components
strategy: css-js
package_path: components/cart-product-card.css
js_path: js/cart-product-card.js
---

# CartProductCard

Riga prodotto del carrello checkout con immagine, titolo, prezzo, azione rimuovi e pannello "Dettagli prodotto" espandibile. La libreria decide layout, responsive, icone chrome del toggle e disclosure del pannello dettagli; il backend possiede lista prodotti, contenuti, prezzo già formattato, immagine, `id`/`aria-controls` e azione di rimozione.

## Markup contract

```html
<div class="cart-list">
    <div class="cart-product-card" data-cart-product-card>
        <div class="cart-product-card__row">
            <div class="cart-product-card__image-wrap">
                <img src="/assets/prodotto.png" alt="Nome prodotto" class="cart-product-card__image">
            </div>
            <div class="cart-product-card__body">
                <div class="cart-product-card__header">
                    <div class="cart-product-card__info">
                        <h3 class="cart-product-card__title">Nome prodotto</h3>
                        <div class="cart-product-card__specs"></div>
                    </div>
                    <div class="cart-product-card__price-wrap">
                        <div class="cart-product-card__price">919,99 &euro;</div>
                    </div>
                </div>
                <div class="cart-product-card__actions">
                    <button class="cart-product-card__remove-btn" type="button">Rimuovi</button>
                </div>
            </div>
        </div>
        <div class="cart-product-card__details-section">
            <button class="cart-product-card__details-toggle" type="button" aria-expanded="false" aria-controls="cart-product-1-details" data-cart-product-card-toggle>
                <span class="cart-product-card__details-toggle-label">Dettagli prodotto</span>
                <span class="cart-product-card__details-chevron" aria-hidden="true"></span>
            </button>
            <div id="cart-product-1-details" class="cart-product-card__details" aria-hidden="true" data-cart-product-card-details>
                <div class="cart-product-card__details-inner">
                    <div class="cart-details-inline">
                        <div class="cart-details-inline__section">
                            <span class="cart-details-inline__heading">1. Generali:</span>
                            <span class="cart-details-inline__label">Formato: </span><span>A4 (210 x 297 mm)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Classi pubbliche

- `.cart-list`, `.cart-product-card`, `.cart-product-card__row`
- `.cart-product-card__image-wrap`, `__image`
- `.cart-product-card__body`, `__header`, `__info`, `__title`, `__specs`
- `.cart-product-card__price-wrap`, `__price`
- `.cart-product-card__actions`, `__remove-btn`
- `.cart-product-card__details-section`, `__details-toggle`, `__details-toggle-label`, `__details-chevron`, `__details`, `__details-inner`
- `.cart-details-inline`, `__section`, `__heading`, `__label`, `__sep`

## Data hooks

- `data-cart-product-card`: root, inizializzata dal runtime.
- `data-cart-product-card-toggle`: trigger del pannello dettagli.
- `data-cart-product-card-details`: pannello dettagli (sync ARIA).

## JS

`window.SkillpressUI.CartProductCard.init(scope)` inizializza tutti i `[data-cart-product-card]` sotto `scope`, idempotente. Il toggle sincronizza `aria-expanded` (sul toggle) e `aria-hidden` (sul pannello). Eventi: `sp:cart-product-card:open`, `sp:cart-product-card:close`. Non gestisce rimozione articolo, calcoli prezzo, IVA o stato carrello.

## Out of scope

- pricing e formattazione valuta, rimozione prodotto;
- persistenza carrello, validazioni checkout;
- shell accordion della pagina checkout.
