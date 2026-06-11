---
title: RelatedProducts
description: Sezione "Potrebbe piacerti anche" con griglia di card prodotto correlato.
layer: components
strategy: css-only
package_path: components/related-products.css
---

# RelatedProducts

Sezione "Potrebbe piacerti anche": griglia di card prodotto correlato (titolo in
alto, immagine sotto). CSS-only, link statici, hover/focus CSS. La libreria
possiede grid responsive, layout card e tipografia; numero/ordine prodotti, href
e immagini sono CMS/backend.

## Markup base

```html
<section class="related-products" aria-label="Prodotti correlati">
    <h2 class="sp-catalog-grid__section-label">Potrebbe piacerti anche</h2>
    <div class="sp-catalog-grid sp-catalog-grid--products">
        <a href="/products/carte-da-gioco" class="catalog-card catalog-card--product-equal">
            <h3 class="catalog-card__title">Carte da gioco</h3>
            <div class="catalog-card__image-wrap">
                <img class="catalog-card__image catalog-card__image--product"
                     src="img/prodotto.png" alt="Carte da gioco" loading="lazy" decoding="async">
            </div>
        </a>
        <!-- ...altre card... -->
    </div>
</section>
```

## Classi pubbliche

- `.related-products` — section wrapper; limita internamente label e grid a `max-width: 1280px`.
- `.sp-catalog-grid__section-label` — h2 della sezione.
- `.sp-catalog-grid` / `.sp-catalog-grid--products` — grid responsive: 5 col >=1024px, 3 col <=1024px, 2 col <=640px.
- `.catalog-card` / `.catalog-card--product-equal` — card link prodotto.
- `.catalog-card__title` — h3 titolo, 2 righe con ellipsis.
- `.catalog-card__image-wrap` — slot immagine `aspect-ratio: 1 / 1`.
- `.catalog-card__image` / `.catalog-card__image--product` — img: `object-fit: contain`, hover `scale(1.05)`.

`.catalog-card` e `.sp-catalog-grid` vivono qualificate dentro i rispettivi
modifier nel pattern.

## Data hooks / modifier

Nessun `data-*` pubblico e nessun modifier toggleabile: le card sono link
statici. `:hover` / `:focus-within` su `.catalog-card--product-equal` scala solo
l'immagine.

## Ownership

- CMS/backend: numero e ordine card, `href`, `src`/`alt`/`loading`/`decoding`,
  testo titolo card e label sezione. Omettere l'intera `<section>` se non ci sono
  correlati.
- Libreria: grid responsive, titolo a 2 righe, slot immagine 1:1, sfondo/radius
  card, hover scale, tipografia e max-width 1280px.

## Fuori scope

- slider/carousel orizzontale;
- variante con prezzo o CTA esplicita;
- card vuota / loading skeleton.
