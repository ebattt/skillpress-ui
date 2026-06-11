---
title: ProductHero
description: Hero prodotto a 2 colonne con galleria immagine, titolo, rating, descrizione e feature grid.
layer: sections
strategy: css-only
package_path: components/product-hero.css
---

# ProductHero

Section hero del prodotto: layout 2 colonne (35/65 da 1024px) che compone
ImageGallery a sinistra e a destra titolo, Rating, descrizione e FeatureGrid.
CSS-only: la libreria fornisce solo il layout di sezione; cambio immagine,
calcolo rating ed eventi sono consumer/CMS. ProductHero espone le sole classi di
sezione; galleria, rating e feature box appartengono ai componenti dipendenti.

## Anatomy

```text
product-hero                          (section wrapper, max-width --page-max-width)
└── product-hero__grid                (1 col mobile / 35fr+65fr >=1024px)
    ├── image-gallery                 (vedi image-gallery.md)
    └── product-hero__info            (flex column)
        ├── product-hero__title       (h1)
        ├── product-hero__rating
        │   ├── product-hero__rating-value
        │   ├── sp-rating             (vedi rating.md)
        │   └── product-hero__review-count
        ├── product-hero__description
        └── feature-grid              (vedi feature-box.md)
```

## Markup contract

```html
<div id="product-hero" class="product-hero">
    <div class="product-hero__grid">
        <div class="image-gallery">
            <div class="image-gallery__container product-shadow"
                 style="--image-gallery-aspect-ratio: 1024 / 1024;"
                 data-image-gallery-images='[{"src":"img.png","alt":"Brossura fresata","width":1024,"height":1024}]'>
                <img src="img.png" alt="Brossura fresata" width="1024" height="1024" fetchpriority="high" decoding="async">
                <button class="image-gallery__nav-btn image-gallery__nav-btn--prev" aria-label="Immagine precedente"><svg>...</svg></button>
                <button class="image-gallery__nav-btn image-gallery__nav-btn--next" aria-label="Immagine successiva"><svg>...</svg></button>
            </div>
        </div>
        <div class="product-hero__info">
            <h1 class="product-hero__title">Brossura fresata</h1>
            <div class="product-hero__rating">
                <span class="product-hero__rating-value">4.85</span>
                <div class="sp-rating">
                    <div class="sp-rating__empty"><span class="sp-rating__star">&#9733;</span><!-- x5 --></div>
                    <div class="sp-rating__filled" style="width: 97%;"><span class="sp-rating__star">&#9733;</span><!-- x5 --></div>
                </div>
                <span class="product-hero__review-count">52 recensioni</span>
            </div>
            <p class="product-hero__description">Descrizione prodotto.</p>
            <div class="feature-grid"><!-- .feature-box x N --></div>
        </div>
    </div>
</div>
```

## Classi pubbliche (sezione)

| Class | Role |
|---|---|
| `.product-hero` | section wrapper, `--page-max-width` e padding |
| `.product-hero__grid` | grid 1 col mobile / 35fr+65fr da 1024px |
| `.product-hero__info` | flex column colonna destra |
| `.product-hero__title` | titolo h1 prodotto |
| `.product-hero__rating` | riga flex (value + stars + review-count) |
| `.product-hero__rating-value` | numero rating |
| `.product-hero__review-count` | testo "N recensioni" |
| `.product-hero__description` | paragrafo descrizione |

Per le classi composte vedi `image-gallery.md`, `rating.md`, `feature-box.md`.

## Attributi data-driven

- `style="width: NN%;"` su `.sp-rating__filled`: calcolato dal CMS come `(rating / 5) * 100`.
- `data-image-gallery-images` su `.image-gallery__container`: array JSON consumato dal behavior consumer, non dalla libreria.
- `--image-gallery-aspect-ratio` su `.image-gallery__container`: ratio iniziale (default 1:1).

## Dipendenze

- `components/image-gallery.css`
- `primitives/rating.css`
- `components/feature-box.css`

Nessuno script JS richiesto dalla libreria.

## Out of scope

- cambio immagine prev/next (CSS-only), thumbnail, zoom;
- calcolo automatico della percentuale stelle;
- emissione di eventi;
- spostare la `.feature-grid` fuori da `.product-hero__info`.
