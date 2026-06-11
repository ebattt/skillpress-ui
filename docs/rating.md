---
title: Rating
description: Rating a stelle CSS-only con overlay clip data-driven via width inline.
layer: primitives
strategy: css-only
status: public-contract
package_path: primitives/rating.css
---

# Rating

Primitiva CSS-only per il rating a stelle sovrapposte. Lo stato pieno e' un
overlay clippato via `overflow: hidden` + `width` percentuale calcolata dal CMS
come `(rating / 5) * 100`. Nessun behavior JS: il valore arriva come stile inline
su `.sp-rating__filled`.

## Anatomy

```text
sp-rating                  (wrapper relativo, inline-block)
├── sp-rating__empty       (riga base)
│   └── sp-rating__star × 5
└── sp-rating__filled      (overlay assoluto, overflow hidden, width inline)
    └── sp-rating__star × 5
```

## Markup contract

```html
<div class="sp-rating">
    <div class="sp-rating__empty">
        <span class="sp-rating__star">&#9733;</span><!-- x5 -->
    </div>
    <div class="sp-rating__filled" style="width: 97%;">
        <span class="sp-rating__star">&#9733;</span><!-- x5 -->
    </div>
</div>
```

Lo `style="width: NN%;"` su `.sp-rating__filled` e' calcolato dal CMS come
`(rating / 5) * 100` (es. `4.85 / 5 = 97%`). Va tenuto inline (non spostato in
classe). Le due righe contengono lo stesso numero di `.sp-rating__star` (5).

## Classi pubbliche

| Class | Role |
|---|---|
| `.sp-rating` | wrapper relativo dei due layer |
| `.sp-rating__empty` | riga stelle base |
| `.sp-rating__filled` | overlay stelle piene, clippato via width inline |
| `.sp-rating__star` | span singolo per stella |

## Data hooks

Nessun `data-*` pubblico. CSS-only.

## Modifier / stati

Lo stato visuale e' il `width` inline di `.sp-rating__filled`. Nessun modifier.

## Ownership

- Backend/CMS: valore rating, percentuale inline, testo recensioni (quando
  composto in ProductHero).
- Libreria: layering stelle vuote/piene, clipping, colori e spaziatura.

## Out of scope

- rating interattivo (selezione utente);
- mezza stella via clip-path;
- variante dimensionale;
- calcolo automatico della percentuale.
