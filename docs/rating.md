---
title: Rating
description: Rating a stelle CSS-only con overlay clip data-driven via width inline.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_feedback-status.css#L220-L228
  demo: product-page-integration/index.html#L408-L418
status: implemented-local
package_path: primitives/rating.css
---

# Rating

Primitiva CSS-only per il rating a stelle sovrapposte. Lo stato pieno e' un overlay clippato via `overflow: hidden` + `width` percentuale calcolata dal CMS come `(rating / 5) * 100`. Nessun behavior JS: il valore arriva come stile inline su `.stars-filled`.

## Anatomy

```text
Rating
├── stars-outer            (wrapper relativo, inline-block)
│   ├── stars-empty        (riga base, color --color-bg-gray-200)
│   │   └── star-icon × 5  (carattere &#9733; o icona)
│   └── stars-filled       (overlay assoluto, overflow hidden, width inline)
│       └── star-icon × 5  (color --color-primary)
```

Le due righe contengono lo stesso numero di `.star-icon` (5). La `.stars-filled` e' posizionata assoluta sopra `.stars-empty` e clippata dal `width` inline.

## Markup contract

Markup verbatim dalla pagina demo `product-page-integration/index.html#L408-L418` (hero prodotto, `4.85 / 5 = 97%`).

```html
<div class="stars-outer">
    <div class="stars-empty">
        <span class="star-icon">&#9733;</span>
        <span class="star-icon">&#9733;</span>
        <span class="star-icon">&#9733;</span>
        <span class="star-icon">&#9733;</span>
        <span class="star-icon">&#9733;</span>
    </div>
    <div class="stars-filled" style="width: 97%;">
        <span class="star-icon">&#9733;</span>
        <span class="star-icon">&#9733;</span>
        <span class="star-icon">&#9733;</span>
        <span class="star-icon">&#9733;</span>
        <span class="star-icon">&#9733;</span>
    </div>
</div>
```

Inline style data-driven: lo `style="width: NN%;"` su `.stars-filled` e' calcolato dal CMS come `(rating / 5) * 100`. Es. `4.85 / 5 = 0.97 -> 97%`. Tenere lo stile inline (non spostarlo in classe).

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.stars-outer` | wrapper relativo che contiene i due layer | yes | — |
| `.stars-empty` | riga di stelle base, color `--color-bg-gray-200` | yes | — |
| `.stars-filled` | overlay assoluto delle stelle piene, clippato via `overflow: hidden` + width inline | yes | — |
| `.star-icon` | span singolo per stella, eredita colore dal layer | yes | — |

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/rating.css" />
```

Oppure via bundle (gia' include `rating.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` → `primitives-rating--default`
- `Scale` → `primitives-rating--scale`
- `Empty` → `primitives-rating--empty`
- `Full` → `primitives-rating--full`

## Token usati

- `--color-bg-gray-200` per stelle vuote.
- `--color-primary` per stelle piene.

Valori letterali: dimensione stella `font-size: 16px`, gap inter-stella `2px`.

## Note CMS

- calcolo width: `(rating / 5) * 100`, lasciato inline su `.stars-filled` (es. `style="width: 97%;"`).
- composizione tipica: dentro `.hero-rating` (ProductHero), il widget Rating e' affiancato da `.hero-rating-value` (numero) e `.hero-review-count` (testo recensioni). Quel layout e' della Section, non del Rating.
- carattere stella: la libreria usa `&#9733;` (★) ma accetta qualsiasi contenuto inline (icona, SVG): la dimensione e' fissata via `font-size`.

## Out of scope

- rating interattivo (selezione utente).
- mezza stella via clip-path o icone diverse.
- variante dimensionale (small / large): per ora dimensione stella `16px` fissa.
- behavior JS (calcolo automatico della percentuale).
- validazione del rating fuori range.
