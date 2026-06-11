---
title: CatalogStage
description: Stage fotografico della landing catalogo con slider, overlay e CTA.
layer: components
strategy: css-js
package_path: components/catalog-stage.css
js_path: js/catalog-stage.js
---

# CatalogStage

Stage fotografico della landing catalogo: slider immagini, overlay titolo/testo, CTA assoluta e slot opzionale per recensioni. La libreria possiede max-width, aspect ratio, fade slider, dot controls, pause su hover/focus e overlay; il backend possiede immagini, copy, CTA, intervallo e contenuto dello slot reviews.

## Markup contract

```html
<section class="catalog-intro">
    <div class="catalog-stage catalog-stage--image-only" id="categorie" data-catalog-stage data-catalog-stage-interval="4500">
        <div class="catalog-stage__image-box">
            <div class="catalog-stage__slide catalog-stage__slide--active" data-catalog-stage-slide>
                <img src="/assets/landing/stampa-1.jpg" alt="Stampa Skillpress" fetchpriority="high" decoding="async">
            </div>
            <div class="catalog-stage__slide" data-catalog-stage-slide aria-hidden="true">
                <img src="/assets/landing/stampa-2.jpg" alt="Dettaglio stampa" loading="lazy" decoding="async">
            </div>
            <div class="catalog-stage__overlay">
                <h1 class="catalog-stage__overlay-title">Stampa la tua idea, con qualità professionale</h1>
                <p class="catalog-stage__overlay-text">Dal file alla consegna: carta certificata e finiture curate.</p>
            </div>
            <a class="catalog-stage__image-button" href="#prodotti">Vedi prodotti</a>
            <div class="catalog-stage__dots" aria-label="Immagini intro">
                <button class="catalog-stage__dot catalog-stage__dot--active" type="button" data-catalog-stage-dot aria-label="Mostra immagine 1" aria-current="true"></button>
                <button class="catalog-stage__dot" type="button" data-catalog-stage-dot aria-label="Mostra immagine 2" aria-current="false"></button>
            </div>
        </div>
        <div class="catalog-stage__reviews-inline feedaty-widget feedaty-widget--inline" data-catalog-stage-reviews data-feedaty-widget>
            <!-- slot recensioni, tipicamente FeedatyWidget -->
        </div>
    </div>
</section>
```

## Classi pubbliche

- `.catalog-intro`: fascia introduttiva.
- `.catalog-stage`, `--image-only`: root e variante fotografica.
- `.catalog-stage__image-box`: slider container con gradient overlay.
- `.catalog-stage__slide`, `--active`: immagini slider.
- `.catalog-stage__overlay`, `__overlay-title`, `__overlay-text`.
- `.catalog-stage__image-button`: CTA pill.
- `.catalog-stage__dots`, `__dot`, `__dot--active`: controlli slider.
- `.catalog-stage__reviews-inline`: slot recensioni, composto con `FeedatyWidget`.

## Data hooks

- `[data-catalog-stage]`: root inizializzato dal runtime slider.
- `[data-catalog-stage-slide]`: slide immagine.
- `[data-catalog-stage-dot]`: dot control.
- `data-catalog-stage-interval`: intervallo autoplay in ms (default `4500`).
- `data-catalog-stage-autoplay="false"`: disabilita autoplay.
- `data-catalog-stage-reviews`: marker semantico opzionale dello slot reviews, non letto dal runtime.

Stati: `aria-hidden` sulle slide, `aria-current` sui dot.

## JS

`window.SkillpressUI.CatalogStage.init(root)`. Gestisce fade slider, dot controls e pause su hover/focus.

## Out of scope

- policy consenso/privacy del caricamento Feedaty;
- tracking click, routing reale, dati remoti;
- catalog grid, interstitial, text block, navbar e footer.
