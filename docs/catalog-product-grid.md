---
title: CatalogProductGrid
description: Griglia catalogo prodotti per landing, con toggle "Mostra altri prodotti".
layer: components
strategy: css-js
package_path: components/catalog-product-grid.css
js_path: js/catalog-product-grid.js
---

# CatalogProductGrid

Griglia catalogo prodotti per landing page: titolo sezione, card prodotto titolo+immagine e toggle opzionale show-more. Si compone con il primitive `catalog-grid` (`.sp-catalog-grid`, `.sp-catalog-grid__section-label`). La libreria possiede layout, grid responsive, slot immagine e runtime show-more; il backend possiede numero/ordine prodotti, asset, href e presenza del toggle.

## Markup contract

```html
<section class="catalog-product-grid" data-catalog-product-grid aria-label="Prodotti">
    <h2 class="sp-catalog-grid__section-label sp-catalog-grid__section-label--orange">Prodotti</h2>
    <div class="sp-catalog-grid sp-catalog-grid--products" id="prodotti-grid"
         data-catalog-product-grid-items data-catalog-product-grid-initial-rows="2">
        <a class="catalog-card catalog-card--product-equal" href="/prodotti/brossura-fresata" data-catalog-product-grid-card>
            <h3 class="catalog-card__title">Brossura fresata</h3>
            <div class="catalog-card__image-wrap">
                <img class="catalog-card__image catalog-card__image--product" src="/assets/book.png" alt="Brossura fresata" loading="lazy" decoding="async">
            </div>
        </a>
    </div>
    <div class="catalog-products-toggle">
        <button class="catalog-products-toggle__button" type="button" data-catalog-product-grid-toggle aria-controls="prodotti-grid" aria-expanded="false">
            Mostra altri prodotti
        </button>
    </div>
</section>
```

## Classi pubbliche

- `.catalog-product-grid`: root della sezione (container landing). `.catalog-product-grid--compact`: senza spacing verticale aggiuntivo.
- `.sp-catalog-grid`, `.sp-catalog-grid--products`: grid responsive (primitive `catalog-grid`).
- `.sp-catalog-grid__section-label` con `--orange`, `--teal`, `--dark`: titolo sezione.
- `.catalog-card`, `--product-equal`, `--product-hidden`.
- `.catalog-card__title`, `__image-wrap`, `__image`, `__image--product`.
- `.catalog-products-toggle`, `__button`.

Custom property: `--catalog-card-bg` (override sfondo card, fallback `--color-tile-bg`).

Lo slot immagine è `1 / 1` con `object-fit: contain`; `.catalog-card__title` occupa sempre 2 righe.

## Data hooks

- `[data-catalog-product-grid]`: root inizializzato dal runtime.
- `[data-catalog-product-grid-items]`: grid con le card.
- `[data-catalog-product-grid-card]`: card conteggiata dal runtime show-more.
- `[data-catalog-product-grid-toggle]`: bottone show-more/collapse.
- `data-catalog-product-grid-initial-rows`: righe visibili in stato collapsed (default `2`).
- `data-catalog-product-grid-expand-label` / `data-catalog-product-grid-collapse-label`: override testo toggle.

Il runtime applica `.catalog-card--product-hidden` alle card fuori conteggio, sincronizza `aria-expanded` e nasconde `.catalog-products-toggle` (`hidden`) quando non ci sono card extra.

## JS

`window.SkillpressUI.CatalogProductGrid.init(root)`, idempotente. Evento `sp:catalog-product-grid:toggle` con `expanded` e `visibleCount`.

## Out of scope

- Stage hero, interstitial, blocco testo SEO, navbar, footer, Feedaty;
- prezzi, badge promo, CTA card esplicite;
- query prodotto, ordinamento business e tracking click.
