---
title: ImageGallery
description: Container immagine prodotto 1:1 con bottoni nav prev/next assoluti (snapshot statico).
layer: components
strategy: css-only
package_path: components/image-gallery.css
---

# ImageGallery

Galleria immagine prodotto: container quadrato 1:1 con immagine principale `object-fit: cover` e due bottoni nav `prev`/`next` posizionati assoluti su `top: 50%`. Il behavior prev/next non e' implementato in libreria (CSS-only snapshot): la consumer legge `data-image-gallery-images` e ruota le immagini lato consumer.

## Strategia JS demo

La libreria fornisce solo CSS. La consumer (`product-page-integration/js/page-init.js#L54-L86`) implementa il behavior prev/next leggendo l'attributo `data-image-gallery-images`. Il consumer monta lo stato iniziale statico con i bottoni visibili ma senza listener.

Una eventuale versione `js/image-gallery.js` (runtime JS) potra' arrivare in futuro con lo stesso pattern di `accordion.js` / `toggle-switch.js`.

## Anatomy

```text
ImageGallery
├── image-gallery                               (column wrapper, center mobile, left-align >=1024px)
│   └── image-gallery__container                (relative, aspect-ratio 1:1, max-width 400px, radius xl)   [product-shadow]
│       ├── <img>                               (object-fit: cover, width/height 100%)
│       ├── image-gallery__nav-btn--prev        (button assoluto top 50%, left 0.75rem)
│       │   └── <svg>                           (chevron prev, aria-hidden)
│       └── image-gallery__nav-btn--next        (button assoluto top 50%, right 0.75rem)
│           └── <svg>                           (chevron next, aria-hidden)
```

## Markup contract

Markup contract corrente.

```html
<div class="image-gallery">
    <div class="image-gallery__container product-shadow"
         data-image-gallery-images='[{"src":"...","alt":"..."}, ...]'>
        <img id="mainProductImage" src="..." alt="..." />
        <button id="prevImageBtn"
                class="image-gallery__nav-btn image-gallery__nav-btn--prev"
                aria-label="Immagine precedente">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button id="nextImageBtn"
                class="image-gallery__nav-btn image-gallery__nav-btn--next"
                aria-label="Immagine successiva">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
</div>
```

Inline data-rating-driven: `data-image-gallery-images` su `.image-gallery__container` e' un array JSON con `src`/`alt` per ogni immagine. La libreria non lo legge: lo consuma il behavior demo.

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.image-gallery` | colonna esterna; centra l'immagine sotto 1024px, allinea sinistra sopra | yes | — |
| `.image-gallery__container` | wrapper relativo, aspect-ratio 1:1, max-width 400px, radius xl, overflow hidden | yes | `product-shadow` |
| `.product-shadow` | modifier opzionale, applica `box-shadow: var(--shadow-product)` | no | — |
| `.image-gallery__nav-btn` | bottone tondo 2.5rem, posizionato assoluto top 50%, background semitrasparente | yes | `--prev`, `--next` |
| `.image-gallery__nav-btn--prev` | posiziona il bottone a sinistra (`left: 0.75rem`) | yes (per prev) | — |
| `.image-gallery__nav-btn--next` | posiziona il bottone a destra (`right: 0.75rem`) | yes (per next) | — |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `data-image-gallery-images` | `.image-gallery__container` | no | Array JSON `[{src, alt}]`. La libreria non lo legge; usato dal behavior demo. |
| `id="mainProductImage"` | `<img>` | no | Compatibilita' con behavior demo. |
| `id="prevImageBtn"` / `id="nextImageBtn"` | bottoni | no | Compatibilita' con behavior demo. |
| `aria-label` | `.image-gallery__nav-btn` | yes | Stringa descrittiva ("Immagine precedente" / "Immagine successiva"). |
| `aria-hidden="true"` | `<svg>` | yes | Chevron decorativo. |

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.hero-image-gallery` | `.image-gallery` |
| `.hero-image-container` | `.image-gallery__container` |
| `.hero-nav-btn` | `.image-gallery__nav-btn` |
| `.hero-nav-btn--prev` | `.image-gallery__nav-btn--prev` |
| `.hero-nav-btn--next` | `.image-gallery__nav-btn--next` |

`.product-shadow` (utility globale) resta invariata.

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/components/image-gallery.css" />
```

Oppure via bundle (gia' include `image-gallery.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto dalla libreria. Il behavior prev/next va implementato dal consumer .

## Examples

- `Default` → `components-imagegallery--default`
- `ContractReference` → `components-imagegallery--contract-reference`
- `WithoutShadow` → `components-imagegallery--without-shadow`
- `WithoutNav` → `components-imagegallery--without-nav`

## Token usati

`--radius-xl`, `--radius-full`, `--color-bg-gray-100`, `--color-bg-white`, `--color-text-strong`, `--color-border-focus`, `--shadow-product`, `--shadow-md`, `--transition-fast`.

Valori letterali: max-width 400px del container, dimensione bottone 2.5rem, offset laterale 0.75rem, background bottone `rgba(255, 255, 255, 0.8)`.

## Note CMS

- `data-image-gallery-images`: array JSON con `src`/`alt` di ogni immagine. La libreria non lo legge; il consumer (consumer) lo usa per il cambio.
- `<img>` principale: `src`/`alt` per l'immagine inizialmente visibile.
- frecce: SVG inline `aria-hidden="true"`. Nessuna dipendenza Material Symbols.
- variante senza shadow: rimuovere il modifier `.product-shadow`.
- variante senza nav: omettere i due bottoni `.image-gallery__nav-btn`.

## Out of scope

- behavior prev/next (vedi CSS-only snapshot).
- thumbnail bar, zoom, lazy loading, carousel.
- indicatori (dot pagination).
- varianti carousel landing / blog.
- emissione di eventi galleria.
