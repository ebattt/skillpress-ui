# CatalogInterstitial

Card editoriali intermedie della landing catalogo: split foto/testo, card wide overlay e trio di feature card.

## Markup contract

```html
<section class="catalog-interstitial" data-catalog-interstitial aria-label="Approfondimento catalogo">
    <div class="catalog-interstitial__card catalog-interstitial__card--photo" data-catalog-interstitial-card data-catalog-interstitial-link="#prodotti" data-catalog-interstitial-link-label="Vai alla sezione prodotti">
        <img src="/assets/landing/stampa.jpg" alt="Stampa di qualita">
        <span class="catalog-interstitial__label">Scopri le nostre rilegature</span>
    </div>
    <div class="catalog-interstitial__card catalog-interstitial__card--text" data-catalog-interstitial-card data-catalog-interstitial-link="/prodotti" data-catalog-interstitial-link-label="Apri la pagina prodotto Skillpress">
        <h3 class="catalog-interstitial__heading">Qualita professionale,<br>prezzi accessibili</h3>
        <p class="catalog-interstitial__text">Carta certificata, colori fedeli e finiture curate in ogni dettaglio.</p>
    </div>
</section>
```

## Classi pubbliche

- `.catalog-interstitial`: root max-width, padding sezione compatta e grid responsive.
- `.catalog-interstitial--full`: variante a una card wide.
- `.catalog-interstitial--trio`: variante a tre feature card.
- `.catalog-interstitial__card`: card navigabile.
- `.catalog-interstitial__card--photo|--text|--text-dark|--wide|--feature`: varianti reali della landing.
- `.catalog-interstitial__heading`, `.catalog-interstitial__heading--light`.
- `.catalog-interstitial__text`, `.catalog-interstitial__text--light`.
- `.catalog-interstitial__label`, `.catalog-interstitial__label--primary|--secondary`.
- `.catalog-interstitial__overlay-content`.
- `.catalog-interstitial__image--contained`.
- `.catalog-overlay-link`, `.catalog-overlay-link__text`: overlay link generato o renderizzabile server-side.

## Data hooks

- `[data-catalog-interstitial]`: root inizializzato dal runtime.
- `[data-catalog-interstitial-card]`: card da rendere click-anywhere.
- `data-catalog-interstitial-link`: href usato per generare l'overlay link.
- `data-catalog-interstitial-link-label`: label accessibile opzionale.

## Modifier / stati

- `.catalog-interstitial--full`: layout 1 colonna.
- `.catalog-interstitial--trio`: layout 3 colonne, 1 colonna su mobile.
- `.catalog-interstitial__card--photo|--text|--text-dark|--wide|--feature`: look della card.
- `.catalog-interstitial__heading--light` e `.catalog-interstitial__text--light`: copy su immagine scura.
- `.catalog-interstitial__label--primary|--secondary`: label accent opzionali.
- Focus: `.catalog-overlay-link:focus-visible` disegna l'anello accessibile.

## Backend owns

- Numero card, ordine e variante.
- `src`, `alt`, heading, label e copy.
- Href e label accessibile.
- Routing, analytics e tracking.

## Library owns

- Max-width, padding sezione compatta e grid responsive.
- Immagini full-bleed/contained, overlay, radius, background e tipografia.
- Runtime idempotente `window.SkillpressUI.CatalogInterstitial.init(root)`.
- Overlay link accessibile se il backend rende `data-catalog-interstitial-link`.

## Demo-only

- URL asset della landing originale.
- Valori `data-catalog-interstitial-link` verso le demo locali.

## Out of scope

- CatalogProductGrid, CatalogStage, TextBlock, navbar, footer e Feedaty.
- Query prodotti, tracking click e routing applicativo.
