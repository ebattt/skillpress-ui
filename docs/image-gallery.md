# ImageGallery

Componente CSS-only per la galleria immagine prodotto: un container quadrato con immagine principale + due bottoni nav `prev/next` posizionati assoluti.

## Strategia JS demo

Strategia A — static snapshot. La libreria fornisce solo CSS. La pagina demo (`product-page-integration/js/page-init.js`) implementa il behavior prev/next leggendo `data-images`. Il consumer monta lo stato iniziale statico con i bottoni visibili ma non funzionanti.

Una eventuale versione `js/image-gallery.js` (Strategia C) potra' arrivare in futuro con lo stesso pattern di `accordion.js` / `toggle-switch.js`.

## Contratto markup verbatim

```html
<div class="hero-image-gallery">
    <div class="hero-image-container product-shadow"
         data-images='[{"src":"...","alt":"..."}, ...]'>
        <img id="mainProductImage" src="..." alt="..." />
        <button id="prevImageBtn"
                class="hero-nav-btn hero-nav-btn--prev"
                aria-label="Immagine precedente">
            <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
        </button>
        <button id="nextImageBtn"
                class="hero-nav-btn hero-nav-btn--next"
                aria-label="Immagine successiva">
            <svg viewBox="0 0 24 24" aria-hidden="true">...</svg>
        </button>
    </div>
</div>
```

## Classi BEM

- `.hero-image-gallery` — colonna esterna (centra l'immagine sotto 1024px, allinea sinistra sopra).
- `.hero-image-container` — wrapper relativo, aspect-ratio 1:1, max-width 400px, border-radius `--radius-xl`. Porta `data-images` (array JSON CMS).
- `.product-shadow` — modifier opzionale (box-shadow `--shadow-product`).
- `.hero-nav-btn` — bottone tondo 40x40, posizionato assoluto su top 50%.
- `.hero-nav-btn--prev` / `.hero-nav-btn--next` — modifier laterali (left / right `0.75rem`).

Nota: il prefisso `hero-` e' verbatim dalla pagina demo. Una futura generalizzazione (es. alias `.image-gallery`) e' possibile se un'altra section usera' lo stesso pattern.

## Asset

- Le frecce vanno fornite come SVG inline `aria-hidden="true"`. Nessuna dipendenza Material Symbols.
- L'immagine principale ha `object-fit: cover`.
- `data-images` e' un attributo per il behavior CMS-side. La libreria non lo legge.

## Out of scope

- Behavior prev/next (vedi Strategia A sopra).
- Thumbnail gallery, zoom, lazy loading, carousel.
- Indicatori (dot pagination).
- Varianti carousel landing / blog.

## Token usati

- `--radius-xl`, `--radius-full`
- `--color-bg-gray-100`, `--color-bg-white`
- `--color-text-strong`, `--color-border-focus`
- `--shadow-product`, `--shadow-md`
- `--transition-fast`
