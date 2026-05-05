# RelatedProducts

Sezione "Potrebbe piacerti anche": griglia di card prodotto correlato (stile landing page) con titolo in alto e immagine sotto. Pattern CSS-only, niente JS libreria.

> Aggiornato 2026-04-29 post BEM standardization (prompt 19 Phase B). Root rinominato da `.related-section` -> `.related-products` (block name allineato al componente). Le classi `.catalog-card*` / `.catalog-grid*` sono vendor esterno (gia' BEM, invariate). Nessun hook `data-*` (componente CSS-only).

- Fonti:
  - `elements-ui/css/components/_layout-patterns.css#L1804-L1825` (`.related-products` wrapper + qualificazioni 1280px max-width).
  - `Skillpress-frontend/landing-page/css/components/_products.css` (PRODUCT CARD section aggiornata: section-label, grid responsive 5/3/2 colonne, card minimal con aspect-ratio + hover image scale).
  - `elements-ui/js/cards/card-image-text-below.js` (catalogo elements-ui con sandbox preview).
- Cartella: `components/` (composto: section > h2 + grid > N anchor card).
- Strategia JS demo: A — static snapshot. La libreria non aggiunge listener. Il pattern e' link statico, hover/focus sono CSS-only.

## Quando usarlo

- Sezione di prodotti correlati al fondo di una pagina prodotto (caso primario: Skillpress product-page-integration).
- Griglia prodotti landing-page con card click-anywhere (titolo + immagine senza CTA esplicita).
- Pattern card-link statiche titolo + immagine.

## Quando NON usarlo

- Card prodotto con prezzo: pattern diverso (`.card__price` esiste in catalogo per un'altra famiglia "Product card preview", non coperta qui).
- Card prodotto con CTA esplicita ("Aggiungi al carrello", "Compra ora"): usare `Card` neutra + `Button`.
- Slider/carousel orizzontale: il pattern v4 e' griglia CSS, niente carousel JS.

## Markup base

```html
<section class="related-products" aria-label="Prodotti correlati">
    <h2 class="catalog-section-label">Potrebbe piacerti anche</h2>
    <div class="catalog-grid catalog-grid--products">
        <a href="/products/carte-da-gioco" class="catalog-card catalog-card--product-equal">
            <h3 class="catalog-card__title">Carte da gioco</h3>
            <div class="catalog-card__image-wrap">
                <img class="catalog-card__image catalog-card__image--product"
                     src="img/prodotto.png" alt="Carte da gioco" loading="lazy">
            </div>
        </a>
        <!-- ...altre card... -->
    </div>
</section>
```

## Classi pubbliche

Wrapper:

- `.related-products` — section bianca, padding `0 20px 5px`, `overflow: visible`. Ha qualificazioni interne che limitano `.catalog-section-label` e `.catalog-grid--products` a `max-width: 1280px` con padding orizzontale 16px.
- `.catalog-section-label` — h2 sezione: Manrope 800, `clamp(1.15rem, 2vw, 1.7rem)`, `letter-spacing: -0.04em`, line-height 0.98, `margin-bottom: 1.2rem`.

Grid:

- `.catalog-grid` — base contenitore (vive solo qualificata via `.catalog-grid--products` nel pattern, inclusa per fedelta' al markup catalogo).
- `.catalog-grid--products` — grid responsive: 5 colonne >=1024px, 3 colonne <=1024px, 2 colonne <=640px. `gap: 1rem` (`0.75rem` mobile).

Card:

- `.catalog-card` — base card (vive solo qualificata via `.catalog-card--product-equal`, inclusa per fedelta').
- `.catalog-card--product-equal` — card link product:
  - `display: flex column`, `aspect-ratio: 5/5.5`, sfondo `#F7F7F8`, `border-radius: 1rem`, `padding: 1rem 1rem 0`, `text-decoration: none`;
  - hover/focus card: nessuna trasformazione/shadow sul wrapper.

Card content:

- `.catalog-card__title` — h3 titolo: Helvetica Neue, `clamp(0.9rem, 1.1vw, 1.1rem)`, weight 700, text-align left, `margin: 0 0 0.5rem`. Qualificato dentro `.catalog-grid--products`.
- `.catalog-card__image-wrap` — wrapper immagine: `flex: 1`, centrato, sfondo trasparente, padding 0.
- `.catalog-card__image` — base image (qualificata dentro `.catalog-grid--products`, reset `margin-top: 0`, `flex: none`).
- `.catalog-card__image--product` — img product: `width: 100%`, `object-fit: contain`. Hover: `transform: scale(1.05)`. Mobile (<640px): `width: min(100%, 150px)`.

## Stati e modifier

- `:hover` / `:focus-within` su `.catalog-card--product-equal`:
  - immagine scala 1.05;
  - card stessa: nessuna trasformazione (per evitare jitter sul layout grid).
- Nessun modifier toggleabile (`--selected`, `--active`): le card sono link statici. Il CMS gestisce stato attivo via routing pagina, non via classe.

## Cosa decide il CMS / backend

- Numero di card (la grid gestisce N item; il README di pagina dice di omettere l'intera `<section class="related-products">` se non ci sono correlati).
- Ordine prodotti correlati (DB query / regola di business).
- `href` di ogni `<a>`.
- `src` + `alt` + `loading="lazy"` di ogni `<img>`.
- Testo `<h3 class="catalog-card__title">`.
- Testo `<h2 class="catalog-section-label">` (default "Potrebbe piacerti anche").

## Cosa decide la libreria

- Layout grid responsive (5/3/2 colonne).
- `aspect-ratio` card (`5/5.5`) e proporzioni interne.
- Sfondo card, border-radius, padding interno.
- Hover scale image.
- Tipografia titolo sezione (Manrope) e titolo card (Helvetica Neue).
- Spaziatura tra card e larghezza max contenitore (1280px).

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.related-section` | `.related-products` |
| `.related-section-label` (eventuale) | `.related-products__label` |
| `.related-section-title` (eventuale) | `.related-products__title` |

Vendor esterno invariato (gia' BEM): `.catalog-card`, `.catalog-card--product-equal`, `.catalog-card__image`, `.catalog-card__image--product`, `.catalog-card__image-wrap`, `.catalog-card__title`, `.catalog-grid`, `.catalog-grid--products`, `.catalog-section-label`.

## Fuori scope

- Slider/scroll orizzontale (pattern v4 e' griglia CSS).
- Variante prezzo sotto titolo (`.card__price` di un'altra famiglia, non usata qui).
- Variante card con CTA esplicita.
- Promozione di `.catalog-card` / `.catalog-grid` come componente standalone riusabile in landing-page: per ora vivono qualificate dentro `.related-products`. Se in futuro un secondo consumer richiede la stessa famiglia in un contesto diverso, valutare lo split in `components/catalog-card.css` separato (no premature abstraction).
- Card vuota / loading skeleton.
