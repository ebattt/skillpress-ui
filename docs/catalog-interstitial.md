---
title: CatalogInterstitial
description: Card editoriali intermedie della landing catalogo (split foto/testo, wide overlay, trio feature).
layer: components
strategy: css-js
package_path: components/catalog-interstitial.css
js_path: js/catalog-interstitial.js
---

# CatalogInterstitial

Card editoriali intermedie della landing catalogo: split foto/testo, card wide con overlay e trio di feature card. La libreria possiede max-width, padding, grid responsive, immagini, overlay e tipografia, oltre all'overlay link accessibile generato dal runtime; il backend possiede numero/ordine/varianti card, asset, copy e href.

## Markup contract

```html
<section class="catalog-interstitial" data-catalog-interstitial aria-label="Approfondimento catalogo">
    <div class="catalog-interstitial__card catalog-interstitial__card--photo" data-catalog-interstitial-card
         data-catalog-interstitial-link="#prodotti" data-catalog-interstitial-link-label="Vai alla sezione prodotti">
        <img src="/assets/landing/stampa.jpg" alt="Stampa di qualità" loading="lazy" decoding="async">
        <span class="catalog-interstitial__label">Scopri le nostre rilegature</span>
    </div>
    <div class="catalog-interstitial__card catalog-interstitial__card--text" data-catalog-interstitial-card>
        <h3 class="catalog-interstitial__heading">Qualità professionale,<br>prezzi accessibili</h3>
        <p class="catalog-interstitial__text">Carta certificata, colori fedeli e finiture curate.</p>
    </div>
</section>
```

## Classi pubbliche

- `.catalog-interstitial`: root con max-width, padding e grid responsive.
- `.catalog-interstitial--full`: una card wide. `.catalog-interstitial--trio`: tre feature card.
- `.catalog-interstitial__card` con varianti `--photo`, `--text`, `--text-dark`, `--wide`, `--feature`.
- `.catalog-interstitial__heading`, `--light`.
- `.catalog-interstitial__text`, `--light`.
- `.catalog-interstitial__label`, `--primary`, `--secondary`.
- `.catalog-interstitial__overlay-content`, `.catalog-interstitial__image--contained`.
- `.catalog-overlay-link`, `.catalog-overlay-link__text`: overlay link generato dal runtime.

## Data hooks

- `[data-catalog-interstitial]`: root inizializzato dal runtime.
- `[data-catalog-interstitial-card]`: card da rendere click-anywhere.
- `data-catalog-interstitial-link`: href usato per generare l'overlay link.
- `data-catalog-interstitial-link-label`: label accessibile opzionale.

## JS

`window.SkillpressUI.CatalogInterstitial.init(root)`, idempotente. Se il backend rende `data-catalog-interstitial-link`, il runtime genera l'overlay link accessibile (`.catalog-overlay-link`).

## Out of scope

- CatalogProductGrid, CatalogStage, TextBlock, navbar, footer, Feedaty;
- query prodotti, tracking click e routing applicativo.
