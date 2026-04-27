# Rating

Primitiva CSS-only per il rating a stelle sovrapposte. Lo stato pieno e' un overlay clip via `width` percentuale, calcolata dal CMS come `(rating / 5) * 100`.

## Quando usarla

- Hero prodotto (`product-page-integration`).
- Catalog card / related products.
- Recensioni in pagine blog o dashboard.

## Contratto markup verbatim

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

## Classi BEM

- `.stars-outer` — wrapper relativo che contiene i due layer.
- `.stars-empty` — riga di stelle base (color `--color-bg-gray-200`).
- `.stars-filled` — riga di stelle piene sovrapposta (color `--color-primary`), clipped via `overflow: hidden` + `width` inline.
- `.star-icon` — span singolo per stella (carattere `&#9733;` o icona). Heredita colore dal layer.

## Calcolo width

```text
width = (rating / 5) * 100  -> 4.85 / 5 = 0.97 -> 97%
```

Tenere lo stile inline `style="width: NN%;"` su `.stars-filled`: il valore arriva dal CMS, non da una classe.

## Composizione tipica

In `ProductHero`, il rating vive dentro `.hero-rating`:

```html
<div class="hero-rating">
    <span class="hero-rating-value">4.85</span>
    <!-- markup .stars-outer ... -->
    <span class="hero-review-count">52 recensioni</span>
</div>
```

`hero-rating*` non e' Rating: e' la riga di layout della Section. Rating e' il widget stelle puro.

## Out of scope

- Rating interattivo (selezione utente).
- Mezza stella via clip path o icone diverse.
- Variante grande / piccola (per ora dimensione stella `16px` fissa via `font-size`).
- Behavior JS.

## Token usati

- `--color-bg-gray-200` per stelle vuote.
- `--color-primary` per stelle piene.
