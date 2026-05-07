# CatalogProductGrid

Griglia catalogo prodotti per landing page: titolo sezione, card prodotto titolo+immagine e toggle opzionale "Mostra altri prodotti".

## Markup contract

```html
<section class="catalog-product-grid" data-catalog-product-grid aria-label="Prodotti">
    <h2 class="catalog-section-label catalog-section-label--orange">Prodotti</h2>
    <div class="catalog-grid catalog-grid--products" id="prodotti-grid" data-catalog-product-grid-items data-initial-rows="2">
        <a class="catalog-card catalog-card--product-equal" href="/prodotti/brossura-fresata" data-catalog-product-grid-card>
            <h3 class="catalog-card__title">Brossura fresata</h3>
            <div class="catalog-card__image-wrap">
                <img class="catalog-card__image catalog-card__image--product" src="/assets/book.png" alt="Brossura fresata" loading="lazy">
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

- `.catalog-product-grid` root della sezione catalogo, con lo stesso container landing della demo originale (`max-width: 1200px` + padding orizzontale responsive).
- `.catalog-product-grid--compact` variante senza spacing verticale aggiuntivo.
- `.catalog-section-label`, `.catalog-section-label--orange|--teal|--dark` titolo sezione.
- `.catalog-grid`, `.catalog-grid--products` grid responsive.
- `.catalog-card`, `.catalog-card--product-equal`, `.catalog-card--product-hidden`.
- `.catalog-card__title`, `.catalog-card__image-wrap`, `.catalog-card__image`, `.catalog-card__image--product`.
- `.catalog-products-toggle`, `.catalog-products-toggle__button`.

## Data hooks

- `[data-catalog-product-grid]`: root inizializzato dal runtime.
- `[data-catalog-product-grid-items]`: grid contenente le card gia' renderizzate.
- `[data-catalog-product-grid-card]`: card conteggiata dal runtime show-more.
- `[data-catalog-product-grid-toggle]`: bottone show-more/collapse.
- `data-initial-rows`: numero righe visibili nello stato collapsed, default `2`.
- `data-expand-label` / `data-collapse-label`: override testo toggle opzionale.

## Modifier / stati

- `.catalog-card--product-hidden`: applicato dal runtime alle card fuori dal conteggio visibile.
- `aria-expanded="true|false"` su `[data-catalog-product-grid-toggle]`.
- `hidden` su `.catalog-products-toggle` quando non ci sono card extra.

## Backend owns

- Numero e ordine prodotti.
- `href`, titoli, immagini, `alt`, `loading`.
- Titolo sezione e modifier colore label.
- Presenza del toggle e valore `data-initial-rows`.
- Routing, tracking, analytics e dati reali.

## Library owns

- Layout della sezione e max-width landing.
- Grid responsive 5/4/3/2 colonne.
- Aspect ratio, background, radius e hover image scale delle card.
- Stile del toggle catalogo.
- Runtime idempotente `window.SkillpressUI.CatalogProductGrid.init(root)`.
- Evento `sp:catalog-product-grid-toggle` con `expanded` e `visibleCount`.

## Demo-only

- Fixture JSON del consumer landing.
- Rendering card da `window.SkillpressLandingProducts`.
- Qualsiasi adapter CMS/API.

## Out of scope

- Stage hero, interstitial, blocco testo SEO, navbar, footer e widget Feedaty.
- Prezzi, badge promo, CTA card esplicite.
- Query prodotto, ordinamento business e tracking click.
