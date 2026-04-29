---
title: ProductHero
description: Hero prodotto a 2 colonne con galleria immagine, titolo, rating, descrizione e feature grid.
layer: sections
strategy: static-snapshot-A
sources:
  catalog_css: elements-ui/css/components/_layout-patterns.css#L764-L888
  demo: product-page-integration/index.html#L400-L499
status: verified-local-link-dev
package_path: components/product-hero.css
---

# ProductHero

Section hero del prodotto: layout 2 colonne (35/65 da 1024px) che compone ImageGallery a sinistra e a destra titolo, Rating, descrizione e FeatureGrid. Strategia A: static snapshot — la libreria non implementa il cambio immagine, non calcola il rating e non emette eventi. I bottoni `prev`/`next` restano nel markup per visual parity.

## Strategia JS demo

Strategia A — static snapshot. Il behavior galleria vive in `product-page-integration/js/page-init.js#L54-L86` (lato consumer). La libreria fornisce solo CSS di layout. Per l'eventuale modulo `js/product-hero.js` (Strategia C) sara' valutata una futura iterazione.

## Anatomy

```text
ProductHero
├── product-hero                         (section wrapper, max-width --page-max-width, padding)
│   └── hero-grid                        (grid 1 col mobile / 35fr+65fr >=1024px, gap 1.5rem)
│       ├── hero-image-gallery           (ImageGallery — vedi doc dedicato)
│       │   └── hero-image-container     [product-shadow]
│       │       ├── <img>
│       │       ├── hero-nav-btn--prev
│       │       └── hero-nav-btn--next
│       └── hero-info                    (flex column, contenuto destra)
│           ├── hero-title               (h1, font-size 3xl, bold)
│           ├── hero-rating              (flex row, gap 0.625rem)
│           │   ├── hero-rating-value    (numero, semibold)
│           │   ├── rating               (Rating — vedi doc dedicato)
│           │   └── hero-review-count    (testo recensioni, text-light)
│           ├── hero-description         (p, font-size sm, text-secondary)
│           └── feature-grid             (FeatureBox — vedi doc dedicato)
```

## Markup contract

Markup verbatim dalla pagina demo `product-page-integration/index.html#L400-L499` (sezione hero).

```html
<div id="product-hero" class="product-hero">
    <div class="hero-grid">
        <div class="hero-image-gallery">
            <div class="hero-image-container product-shadow" data-images='[{"src":"assets/brossura_fresata/brossurafresata2.png","alt":"Brossura fresata vista frontale"}]'>
                <img id="mainProductImage" src="assets/brossura_fresata/brossurafresata2.png" alt="Brossura fresata vista frontale">
                <button id="prevImageBtn" class="hero-nav-btn hero-nav-btn--prev" aria-label="Immagine precedente">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
                <button id="nextImageBtn" class="hero-nav-btn hero-nav-btn--next" aria-label="Immagine successiva">
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </button>
            </div>
        </div>
        <div class="hero-info">
            <h1 class="hero-title">Brossura fresata</h1>
            <div class="hero-rating">
                <span class="hero-rating-value">4.85</span>
                <div class="rating">
                    <div class="rating__empty"><span class="rating__star">&#9733;</span><span class="rating__star">&#9733;</span><span class="rating__star">&#9733;</span><span class="rating__star">&#9733;</span><span class="rating__star">&#9733;</span></div>
                    <div class="rating__filled" style="width: 97%;"><span class="rating__star">&#9733;</span><span class="rating__star">&#9733;</span><span class="rating__star">&#9733;</span><span class="rating__star">&#9733;</span><span class="rating__star">&#9733;</span></div>
                </div>
                <span class="hero-review-count">52 recensioni</span>
            </div>
            <p class="hero-description">Descrizione prodotto.</p>
            <div class="feature-grid">
                <!-- ripetere .feature-box × N secondo contratto FeatureBox -->
            </div>
        </div>
    </div>
</div>
```

Inline style data-driven:
- `style="width: 97%;"` su `.rating__filled` calcolato come `(rating / 5) * 100`.
- `data-images` su `.hero-image-container`: array JSON, consumato dal behavior demo, non dalla libreria.

## API Reference

ProductHero espone le sole classi di sezione. Le classi di galleria, rating e feature box appartengono ai componenti dipendenti (vedi sezione Installation).

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.product-hero` | section wrapper, applica `--page-max-width` e padding | yes | — |
| `.hero-grid` | grid 1 col mobile / 35fr + 65fr da 1024px, gap 1.5rem | yes | — |
| `.hero-info` | flex column con il contenuto della colonna destra | yes | — |
| `.hero-title` | titolo h1 prodotto, font-size 3xl, bold | yes | — |
| `.hero-rating` | riga di layout flex (value + stars + review-count), gap 0.625rem | yes | — |
| `.hero-rating-value` | numero rating (es. `4.85`), semibold | yes | — |
| `.hero-review-count` | testo "N recensioni", color text-light | yes | — |
| `.hero-description` | paragrafo descrizione, font-size sm, color text-secondary | yes | — |

Per `.hero-image-gallery`, `.hero-image-container`, `.product-shadow`, `.hero-nav-btn*` vedi `image-gallery.md`.
Per `.rating`, `.rating__empty`, `.rating__filled`, `.rating__star` vedi `rating.md`.
Per `.feature-grid`, `.feature-box*` vedi `feature-box.md`.

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `id="product-hero"` | `.product-hero` | no | Ancora di pagina opzionale, preservata dalla demo. |
| `id="mainProductImage"` | `<img>` | no | Compatibilita' con behavior demo. |
| `id="prevImageBtn"` / `id="nextImageBtn"` | bottoni nav | no | Compatibilita' con behavior demo. |
| `data-images` | `.hero-image-container` | no | Array JSON CMS, non letto dalla libreria. |
| `style="width: NN%;"` | `.rating__filled` | yes | Percentuale calcolata `(rating / 5) * 100`. |

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
- `ReferenceFromElementsUI` → `sections-producthero--reference-from-elements-ui`
- `ComposedForCMS` → `sections-producthero--composed-for-cms`
- `Anatomy` → `sections-producthero--anatomy`

## Token usati

`--page-max-width`, `--page-padding-x`, `--color-text`, `--color-text-secondary`, `--color-text-light`, `--font-size-3xl`, `--font-size-base`, `--font-size-sm`, `--font-weight-bold`, `--font-weight-semibold`, `--line-height-tight`.

## Note CMS

- titolo prodotto: contenuto di `.hero-title`.
- rating: settare `.hero-rating-value` (numero), `style="width: NN%;"` su `.rating__filled` e `.hero-review-count` (testo).
- descrizione: contenuto di `.hero-description`.
- feature grid: ripetere `.feature-box` × N dentro `.feature-grid` secondo contratto FeatureBox.
- immagini: settare `src`/`alt` dell'`<img>` principale e popolare `data-images` con l'array JSON delle immagini disponibili.
- la `.feature-grid` deve restare dentro `.hero-info`: e' parte del layout della section.

## Out of scope

- nessun cambio immagine prev/next (Strategia A).
- nessuna thumbnail gallery, zoom, lazy loading.
- nessuna variante marketing / landing.
- nessun calcolo automatico della percentuale stelle.
- nessuna dipendenza Material Symbols / Google Fonts.
- nessuna emissione di eventi.
- spostare la `.feature-grid` fuori da `.hero-info` non e' supportato.
