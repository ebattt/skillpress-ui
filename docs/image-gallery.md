---
title: ImageGallery
description: Container immagine prodotto con ratio configurabile e bottoni nav prev/next assoluti (CSS-only).
layer: components
strategy: css-only
package_path: components/image-gallery.css
---

# ImageGallery

Galleria immagine prodotto: container con default 1:1, ratio configurabile via
`--image-gallery-aspect-ratio`, immagine principale `object-fit: contain`
centrata e due bottoni nav `prev`/`next` posizionati assoluti su `top: 50%`.
CSS-only: il behavior prev/next non e' implementato in libreria, lo gestisce il
consumer leggendo `data-image-gallery-images`. Con 0 o 1 immagine, applicare
`.image-gallery--single` al root per nascondere i controlli.

## Anatomy

```text
ImageGallery
├── image-gallery                               (column wrapper)
│   └── image-gallery__container                (relative, aspect-ratio var/1:1, max-width 400px)   [product-shadow]
│       ├── <img>                               (object-fit: contain, centered)
│       ├── image-gallery__nav-btn--prev        (button assoluto, left 0.75rem)
│       └── image-gallery__nav-btn--next        (button assoluto, right 0.75rem)
```

## Markup contract

```html
<div class="image-gallery">
    <div class="image-gallery__container product-shadow"
         style="--image-gallery-aspect-ratio: 600 / 800;"
         data-image-gallery-images='[{"src":"...","alt":"...","width":600,"height":800}]'>
        <img id="mainProductImage" src="..." alt="..." width="600" height="800" fetchpriority="high" decoding="async" />
        <button id="prevImageBtn" class="image-gallery__nav-btn image-gallery__nav-btn--prev" aria-label="Immagine precedente">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button id="nextImageBtn" class="image-gallery__nav-btn image-gallery__nav-btn--next" aria-label="Immagine successiva">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
</div>
```

Per una singola immagine: aggiungere `.image-gallery--single` al root.

## Classi pubbliche

| Classe | Ruolo | Required | Modifiers |
|---|---|---|---|
| `.image-gallery` | colonna esterna | yes | `--single` |
| `.image-gallery__container` | wrapper relativo, aspect-ratio via var (fallback 1:1), max-width 400px | yes | `product-shadow` |
| `.product-shadow` | applica `box-shadow: var(--shadow-product)` (definita in image-gallery.css) | no | — |
| `.image-gallery--single` | nasconde i bottoni con 0/1 immagine | no | — |
| `.image-gallery__nav-btn` | bottone tondo 2.5rem, assoluto top 50% | yes (>1 img) | `--prev`, `--next` |

## Attributi

| Attributo | Elemento | Required | Note |
|---|---|---|---|
| `data-image-gallery-images` | `.image-gallery__container` | no | Array JSON `[{src, alt, width, height}]`. La libreria non lo legge: lo usa il consumer. |
| `style="--image-gallery-aspect-ratio: W / H;"` | `.image-gallery__container` | no | Ratio iniziale (default 1:1). |
| `id="mainProductImage"` / `id="prevImageBtn"` / `id="nextImageBtn"` | img / bottoni | no | Compatibilita' con behavior consumer. |
| `loading` / `decoding` / `fetchpriority` | `<img>` | no | Backend/CMS owned. |
| `aria-label` | `.image-gallery__nav-btn` | yes | Stringa descrittiva. |
| `aria-hidden="true"` | `<svg>` | yes | Chevron decorativo. |

## Installation

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/image-gallery.css" />
```

Anche via bundle `bundles/demo-minimal.css`. Nessun JS di libreria; il behavior
prev/next va implementato dal consumer.

## Token usati

`--image-gallery-aspect-ratio` (default `1 / 1`), `--radius-xl`, `--radius-full`,
`--color-bg-gray-100`, `--color-bg-white`, `--color-text-strong`,
`--color-border-focus`, `--shadow-product`, `--shadow-md`, `--transition-fast`.

## Fuori scope

Behavior prev/next, thumbnail bar, zoom, policy lazy/eager, carousel, indicatori
dot, eventi galleria.
