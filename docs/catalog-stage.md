# CatalogStage

Stage fotografico della landing catalogo: slider immagini editoriale, overlay titolo/testo, CTA assoluta e slot opzionale per recensioni app-owned.

## Markup contract

```html
<section class="catalog-intro">
    <div class="catalog-stage catalog-stage--image-only" id="categorie" data-catalog-stage data-catalog-stage-interval="4500">
        <div class="catalog-stage__image-box">
            <div class="catalog-stage__slide catalog-stage__slide--active" data-catalog-stage-slide>
                <img src="/assets/landing/stampa-1.jpg" alt="Stampa Skillpress">
            </div>
            <div class="catalog-stage__slide" data-catalog-stage-slide aria-hidden="true">
                <img src="/assets/landing/stampa-2.jpg" alt="Dettaglio stampa Skillpress">
            </div>
            <div class="catalog-stage__overlay">
                <h1 class="catalog-stage__overlay-title">Stampa la tua idea, con qualità professionale</h1>
                <p class="catalog-stage__overlay-text">Dal file alla consegna: carta certificata, colori fedeli e finiture curate in ogni dettaglio.</p>
            </div>
            <a class="catalog-stage__image-button" href="#prodotti">Vedi prodotti</a>
            <div class="catalog-stage__dots" aria-label="Immagini intro">
                <button class="catalog-stage__dot catalog-stage__dot--active" type="button" data-catalog-stage-dot aria-label="Mostra immagine 1" aria-current="true"></button>
                <button class="catalog-stage__dot" type="button" data-catalog-stage-dot aria-label="Mostra immagine 2" aria-current="false"></button>
            </div>
        </div>
        <div class="catalog-stage__reviews-inline feedaty-widget feedaty-widget--inline" data-catalog-stage-reviews data-feedaty-widget>
            <div class="feedaty_widget" data-ver="2021" data-id="69d773285807d" data-type="merchant" data-variant="Striscia-2" data-lang="all" data-gui="all"></div>
        </div>
    </div>
</section>
```

## Classi pubbliche

- `.catalog-intro`: fascia introduttiva bianca.
- `.catalog-stage`: root max-width 1200px con padding orizzontale.
- `.catalog-stage--image-only`: variante fotografica usata dalla landing reale.
- `.catalog-stage__image-box`: media slider container con gradient overlay.
- `.catalog-stage__slide`, `.catalog-stage__slide--active`: immagini slider.
- `.catalog-stage__overlay`, `.catalog-stage__overlay-title`, `.catalog-stage__overlay-text`.
- `.catalog-stage__image-button`: CTA pill.
- `.catalog-stage__dots`, `.catalog-stage__dot`, `.catalog-stage__dot--active`: controlli slider.
- `.catalog-stage__reviews-inline`: slot per widget recensioni, tipicamente composto con `FeedatyWidget`.

## Data hooks

- `[data-catalog-stage]`: root inizializzato dal runtime slider.
- `[data-catalog-stage-slide]`: slide immagine.
- `[data-catalog-stage-dot]`: dot control.
- `data-catalog-stage-interval`: intervallo autoplay in ms, default `4500`.
- `data-catalog-stage-autoplay="false"`: disabilita autoplay.
- `[data-catalog-stage-reviews]` e' solo un marker semantico opzionale per lo slot recensioni.

## Modifier / stati

- `.catalog-stage--image-only`: layout a immagine singola.
- `.catalog-stage__slide--active`: slide corrente.
- `.catalog-stage__dot--active`: dot corrente.
- `aria-hidden="true|false"` sulle slide.
- `aria-current="true|false"` sui dot.
- Hover/focus su `.catalog-stage__image-button`.
- Mobile: testo descrittivo nascosto, CTA e overlay riposizionati.

## Backend owns

- Immagini `src`/`alt` e numero slide.
- Titolo, testo overlay, CTA `href` e label.
- ID/anchor.
- Presenza e contenuto dello slot reviews, inclusi attributi Feedaty.
- Intervallo e scelta autoplay.

## Library owns

- Max-width, padding, aspect ratio e radius.
- Gradient overlay, object-fit/object-position.
- Fade slider, dot controls, pause su hover/focus.
- Tipografia e posizionamento dell'overlay.
- Look CTA e responsive.

## Demo-only

- URL asset demo.
- Configurazione Feedaty demo.

## Out of scope

- Policy consenso/privacy del caricamento Feedaty.
- Tracking click, routing reale, dati remoti.
- Catalog grid, interstitial, text block, navbar e footer.
