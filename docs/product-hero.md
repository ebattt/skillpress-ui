---
title: ProductHero
description: Hero prodotto a 2 colonne con galleria immagine, titolo, rating, descrizione e feature grid.
layer: sections
strategy: static-snapshot-A
package_path: components/product-hero.css
---

# ProductHero

Section hero del prodotto: layout 2 colonne (35/65 da 1024px) che compone ImageGallery a sinistra e a destra titolo, Rating, descrizione e FeatureGrid. CSS-only snapshot: static snapshot — la libreria non implementa il cambio immagine, non calcola il rating e non emette eventi. I bottoni `prev`/`next` restano nel markup per visual parity.

## Strategia JS demo

Il behavior galleria vive in `product-page-integration/js/page-init.js#L54-L86` (lato consumer). La libreria fornisce solo CSS di layout. Per l'eventuale modulo `js/product-hero.js` (runtime JS) sara' valutata una futura iterazione.

## Anatomy

```text
ProductHero
├── product-hero                              (section wrapper, max-width --page-max-width, padding)
│   └── product-hero__grid                    (grid 1 col mobile / 35fr+65fr >=1024px, gap 1.5rem)
│       ├── image-gallery                     (ImageGallery — vedi doc dedicato)
│       │   └── image-gallery__container      [product-shadow]
│       │       ├── <img>
│       │       ├── image-gallery__nav-btn--prev
│       │       └── image-gallery__nav-btn--next
│       └── product-hero__info                (flex column, contenuto destra)
│           ├── product-hero__title           (h1, font-size 3xl, bold)
│           ├── product-hero__rating          (flex row, gap 0.625rem)
│           │   ├── product-hero__rating-value    (numero, semibold)
│           │   ├── rating                    (Rating — vedi doc dedicato)
│           │   └── product-hero__review-count    (testo recensioni, text-light)
│           ├── product-hero__description     (p, font-size sm, text-secondary)
│           └── feature-grid                  (FeatureBox — vedi doc dedicato)
```

## Markup contract

Markup contract corrente.html#L400-L499` (sezione hero).

```html
<div id="product-hero" class="product-hero">
    <div class="product-hero__grid">
        <div class="image-gallery">
            <div class="image-gallery__container product-shadow" data-image-gallery-images='[{"src":"assets/brossura_fresata/brossurafresata2.png","alt":"Brossura fresata vista frontale"}]'>
                <img id="mainProductImage" src="assets/brossura_fresata/brossurafresata2.png" alt="Brossura fresata vista frontale">
                <button id="prevImageBtn" class="image-gallery__nav-btn image-gallery__nav-btn--prev" aria-label="Immagine precedente">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
                <button id="nextImageBtn" class="image-gallery__nav-btn image-gallery__nav-btn--next" aria-label="Immagine successiva">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
            </div>
        </div>
        <div class="product-hero__info">
            <h1 class="product-hero__title">Brossura fresata</h1>
            <div class="product-hero__rating">
                <span class="product-hero__rating-value">4.85</span>
                <div class="sp-rating">
                    <div class="sp-rating__empty"><span class="sp-rating__star">&#9733;</span><span class="sp-rating__star">&#9733;</span><span class="sp-rating__star">&#9733;</span><span class="sp-rating__star">&#9733;</span><span class="sp-rating__star">&#9733;</span></div>
                    <div class="sp-rating__filled" style="width: 97%;"><span class="sp-rating__star">&#9733;</span><span class="sp-rating__star">&#9733;</span><span class="sp-rating__star">&#9733;</span><span class="sp-rating__star">&#9733;</span><span class="sp-rating__star">&#9733;</span></div>
                </div>
                <span class="product-hero__review-count">52 recensioni</span>
            </div>
            <p class="product-hero__description">Descrizione prodotto.</p>
            <div class="feature-grid">
                <!-- ripetere .feature-box × N secondo contratto FeatureBox -->
            </div>
        </div>
    </div>
</div>
```

Inline style data-rating-driven:
- `style="width: 97%;"` su `.sp-rating__filled` calcolato come `(rating / 5) * 100`.
- `data-image-gallery-images` su `.image-gallery__container`: array JSON, consumato dal behavior demo, non dalla libreria.

## API Reference

ProductHero espone le sole classi di sezione. Le classi di galleria, rating e feature box appartengono ai componenti dipendenti (vedi sezione Installation).

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.product-hero` | section wrapper, applica `--page-max-width` e padding | yes | — |
| `.product-hero__grid` | grid 1 col mobile / 35fr + 65fr da 1024px, gap 1.5rem | yes | — |
| `.product-hero__info` | flex column con il contenuto della colonna destra | yes | — |
| `.product-hero__title` | titolo h1 prodotto, font-size 3xl, bold | yes | — |
| `.product-hero__rating` | riga di layout flex (value + stars + review-count), gap 0.625rem | yes | — |
| `.product-hero__rating-value` | numero rating (es. `4.85`), semibold | yes | — |
| `.product-hero__review-count` | testo "N recensioni", color text-light | yes | — |
| `.product-hero__description` | paragrafo descrizione, font-size sm, color text-secondary | yes | — |

Per `.image-gallery`, `.image-gallery__container`, `.product-shadow`, `.image-gallery__nav-btn*` vedi `image-gallery.md`.
Per `.sp-rating`, `.sp-rating__empty`, `.sp-rating__filled`, `.sp-rating__star` vedi `rating.md`.
Per `.feature-grid`, `.feature-box*` vedi `feature-box.md`.

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `id="product-hero"` | `.product-hero` | no | Ancora di pagina opzionale, preservata dalla demo. |
| `id="mainProductImage"` | `<img>` | no | Compatibilita' con behavior demo. |
| `id="prevImageBtn"` / `id="nextImageBtn"` | bottoni nav | no | Compatibilita' con behavior demo. |
| `data-image-gallery-images` | `.image-gallery__container` | no | Array JSON CMS, non letto dalla libreria. |
| `style="width: NN%;"` | `.sp-rating__filled` | yes | Percentuale calcolata `(rating / 5) * 100`. |

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.hero-grid` | `.product-hero__grid` |
| `.hero-info` | `.product-hero__info` |
| `.hero-title` | `.product-hero__title` |
| `.hero-rating` | `.product-hero__rating` |
| `.hero-rating-value` | `.product-hero__rating-value` |
| `.hero-review-count` | `.product-hero__review-count` |
| `.hero-description` | `.product-hero__description` |

`.product-hero` (block root) e' invariato. Per le foglie composte vedi `image-gallery.md` (rename `.hero-image-gallery/-container/-nav-btn`), `feature-box.md` e `rating.md` (gia' BEM strict).

## Installation

Dipende da:
- components/image-gallery.css
- primitives/rating.css
- components/feature-box.css

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/components/image-gallery.css" />
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/rating.css" />
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/components/feature-box.css" />
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/components/product-hero.css" />
```

Oppure via bundle (gia' include tutte le dipendenze):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto dalla libreria.

## Examples

- `Default` → `sections-producthero--default`
- `Reference` → `sections-producthero--reference-from-elements-ui`
- `ComposedForCMS` → `sections-producthero--composed-for-cms`
- `Anatomy` → `sections-producthero--anatomy`

## Token usati

`--page-max-width`, `--page-padding-x`, `--color-text`, `--color-text-secondary`, `--color-text-light`, `--font-size-3xl`, `--font-size-base`, `--font-size-sm`, `--font-weight-bold`, `--font-weight-semibold`, `--line-height-normal`.

## Note CMS

- titolo prodotto: contenuto di `.product-hero__title`.
- rating: settare `.product-hero__rating-value` (numero), `style="width: NN%;"` su `.sp-rating__filled` e `.product-hero__review-count` (testo).
- descrizione: contenuto di `.product-hero__description`.
- feature grid: ripetere `.feature-box` × N dentro `.feature-grid` secondo contratto FeatureBox.
- immagini: settare `src`/`alt` dell'`<img>` principale e popolare `data-image-gallery-images` con l'array JSON delle immagini disponibili.
- la `.feature-grid` deve restare dentro `.product-hero__info`: e' parte del layout della section.

## Out of scope

- nessun cambio immagine prev/next (CSS-only snapshot).
- nessuna thumbnail gallery, zoom, lazy loading.
- nessuna variante marketing / landing.
- nessun calcolo automatico della percentuale stelle.
- nessuna dipendenza Material Symbols / Google Fonts.
- nessuna emissione di eventi.
- spostare la `.feature-grid` fuori da `.product-hero__info` non e' supportato.
