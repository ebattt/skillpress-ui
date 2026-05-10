---
title: Rating
description: Rating a stelle CSS-only con overlay clip data-rating-driven via width inline.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_feedback-status.css#L220-L228
  demo: product-page-integration/index.html#L408-L418
status: beta-contract
package_path: primitives/rating.css
---

# Rating

Primitiva CSS-only per il rating a stelle sovrapposte. Lo stato pieno e' un overlay clippato via `overflow: hidden` + `width` percentuale calcolata dal CMS come `(rating / 5) * 100`. Nessun behavior JS: il valore arriva come stile inline su `.sp-rating__filled`.

## Anatomy

```text
Rating
├── rating                  (wrapper relativo, inline-block)
│   ├── rating__empty       (riga base, color --color-bg-gray-200)
│   │   └── rating__star × 5  (carattere &#9733; o icona)
│   └── rating__filled      (overlay assoluto, overflow hidden, width inline)
│       └── rating__star × 5  (color --color-primary)
```

Le due righe contengono lo stesso numero di `.sp-rating__star` (5). La `.sp-rating__filled` e' posizionata assoluta sopra `.sp-rating__empty` e clippata dal `width` inline.

## Markup contract

Markup verbatim dalla pagina demo `product-page-integration/index.html#L408-L418` (hero prodotto, `4.85 / 5 = 97%`).

```html
<div class="sp-rating">
    <div class="sp-rating__empty">
        <span class="sp-rating__star">&#9733;</span>
        <span class="sp-rating__star">&#9733;</span>
        <span class="sp-rating__star">&#9733;</span>
        <span class="sp-rating__star">&#9733;</span>
        <span class="sp-rating__star">&#9733;</span>
    </div>
    <div class="sp-rating__filled" style="width: 97%;">
        <span class="sp-rating__star">&#9733;</span>
        <span class="sp-rating__star">&#9733;</span>
        <span class="sp-rating__star">&#9733;</span>
        <span class="sp-rating__star">&#9733;</span>
        <span class="sp-rating__star">&#9733;</span>
    </div>
</div>
```

Inline style data-rating-driven: lo `style="width: NN%;"` su `.sp-rating__filled` e' calcolato dal CMS come `(rating / 5) * 100`. Es. `4.85 / 5 = 0.97 -> 97%`. Tenere lo stile inline (non spostarlo in classe).

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.sp-rating` | wrapper relativo che contiene i due layer | yes | — |
| `.sp-rating__empty` | riga di stelle base, color `--color-bg-gray-200` | yes | — |
| `.sp-rating__filled` | overlay assoluto delle stelle piene, clippato via `overflow: hidden` + width inline | yes | — |
| `.sp-rating__star` | span singolo per stella, eredita colore dal layer | yes | — |

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

- calcolo width: `(rating / 5) * 100`, lasciato inline su `.sp-rating__filled` (es. `style="width: 97%;"`).
- composizione tipica: dentro `.product-hero__rating` (ProductHero), il widget Rating e' affiancato da `.product-hero__rating-value` (numero) e `.product-hero__review-count` (testo recensioni). Quel layout e' della Section, non del Rating.
- carattere stella: la libreria usa `&#9733;` (★) ma accetta qualsiasi contenuto inline (icona, SVG): la dimensione e' fissata via `font-size`.

## Mappatura nomi (demo product-page -> libreria)

Storico: prima della 0.2.0 il rating usava `.stars-outer` / `.stars-empty` / `.stars-filled` / `.star-icon` (catalog naming). Da 0.2.0 BEM strict:

| Vecchio (pre-0.2.0) | Nuovo (BEM) |
|---|---|
| `.stars-outer` | `.sp-rating` |
| `.stars-empty` | `.sp-rating__empty` |
| `.stars-filled` | `.sp-rating__filled` |
| `.star-icon` | `.sp-rating__star` |

## Classi pubbliche

`.sp-rating`, `.sp-rating__empty`, `.sp-rating__filled`, `.sp-rating__star`.

## Data hooks

Nessun hook `data-*` pubblico. `Rating` e' CSS-only.

## Modifier / stati

Lo stato visuale e' il `width` inline di `.sp-rating__filled`. Non ci sono modifier pubblici.

## Backend owns

Valore numerico del rating, percentuale inline, testo recensioni quando composto in `ProductHero` e validazione del range.

## Library owns

Layering stelle vuote/piene, clipping, colori e spaziatura interna.

## Demo-only

Valori rating e conteggi recensioni usati nelle stories/lab page.

## Out of scope

- rating interattivo (selezione utente).
- mezza stella via clip-path o icone diverse.
- variante dimensionale (small / large): per ora dimensione stella `16px` fissa.
- behavior JS (calcolo automatico della percentuale).
- validazione del rating fuori range.
