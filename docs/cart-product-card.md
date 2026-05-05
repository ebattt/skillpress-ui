# CartProductCard

`CartProductCard` renderizza una riga prodotto del carrello checkout con immagine, titolo, prezzo, azione rimuovi e pannello "Dettagli prodotto" espandibile.

## Fonte

- Markup: `Skillpress-frontend/checkout/js/sections/cart-section.js`
- CSS: `Skillpress-frontend/checkout/css/components/_cart.css`
- Pagina target: `checkout`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/cart-product-card.css">
<script defer src="/node_modules/@ebattt/skillpress-ui/js/cart-product-card.js"></script>
```

## Responsabilita

La libreria decide layout, responsive, colori, hover/focus, icone chrome del toggle e apertura/chiusura del pannello dettagli.

Il backend/CMS decide lista prodotti, contenuti, prezzo gia' formattato, immagine, `alt`, contenuto dettagli, `id`/`aria-controls` e azione di rimozione articolo.

## Behavior

`window.SkillpressUI.CartProductCard.init(scope)` inizializza tutti gli elementi `[data-cart-product-card]` sotto `scope`. Il binding e' idempotente.

Il toggle usa:

- `[data-cart-product-card-toggle]`
- `[data-cart-product-card-details]`
- `aria-expanded`
- `aria-hidden`

Non gestisce rimozione articolo, calcoli prezzo, IVA o stato carrello.

## Markup minimo

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

## Classi

- `.cart-list`
- `.cart-product-card`
- `.cart-product-card__row`
- `.cart-product-card__image-wrap`
- `.cart-product-card__image`
- `.cart-product-card__body`
- `.cart-product-card__header`
- `.cart-product-card__info`
- `.cart-product-card__title`
- `.cart-product-card__specs`
- `.cart-product-card__price-wrap`
- `.cart-product-card__price`
- `.cart-product-card__actions`
- `.cart-product-card__remove-btn`
- `.cart-product-card__details-section`
- `.cart-product-card__details-toggle`
- `.cart-product-card__details-toggle-label`
- `.cart-product-card__details-chevron`
- `.cart-product-card__details`
- `.cart-product-card__details-inner`
- `.cart-details-inline`
- `.cart-details-inline__section`
- `.cart-details-inline__heading`
- `.cart-details-inline__label`
- `.cart-details-inline__sep`

## Fuori Scope

- pricing e formattazione valuta;
- rimozione prodotto;
- persistenza carrello;
- validazioni checkout;
- shell accordion della pagina checkout.
