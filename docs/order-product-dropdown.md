---
title: OrderProductDropdown
description: Dashboard order detail product card con disclosure e dettagli prodotto.
layer: components
strategy: css-js
sources:
  demo_js: dashboard/js/order-products.js
  demo_css: dashboard/css/components/_order-detail.css
status: local-link-dev-dashboard-2026-05-05
package_path: components/order-product-dropdown.css
js_path: js/order-product-dropdown.js
---

# OrderProductDropdown

`OrderProductDropdown` copre la card prodotto espandibile del dettaglio ordine
dashboard. La libreria gestisce la shell prodotto e i disclosure UI; stepper,
upload reale e stato ordine restano fuori scope.

## Markup contract

```html
<article class="product-step-card" data-order-product-dropdown>
    <button class="product-step-card__row"
            type="button"
            aria-expanded="false"
            data-order-product-dropdown-trigger>
        <div class="product-step-card__image-wrap">
            <img class="product-step-card__image" src="/image.png" alt="Brossura fresata">
        </div>
        <div class="product-step-card__body">
            <div class="product-step-card__header">
                <div class="product-step-card__info">
                    <p class="product-step-card__name">Brossura fresata</p>
                    <p class="product-step-card__meta">200 copie</p>
                </div>
                <div class="product-step-card__price-block">
                    <span class="product-step-card__price">&euro; 320,50</span>
                    <span class="product-step-card__expand-icon" aria-hidden="true"></span>
                </div>
            </div>
        </div>
    </button>
    <div class="product-step-card__expanded-content" data-order-product-dropdown-content hidden>
        <div class="product-step-card__actions-bar">
            <button class="product-step-card__details-toggle"
                    type="button"
                    aria-expanded="false"
                    data-order-product-dropdown-details-trigger>
                <span class="product-step-card__details-toggle-label">Dettagli prodotto</span>
                <span class="product-step-card__details-chevron" aria-hidden="true"></span>
            </button>
            <!-- action slot -->
        </div>
        <div class="product-step-card__details-section">
            <div class="product-step-card__details" data-order-product-dropdown-details hidden>
                <div class="product-step-card__details-inner">
                    <div class="detail-section">
                        <span class="detail-heading">1. Generali:</span>
                        <span class="detail-label">Formato: </span><span>A4</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>
```

## Classi pubbliche

| Class | Role |
|---|---|
| `.product-step-card` | root card |
| `.product-step-card__row` | disclosure trigger principale |
| `.product-step-card__image-wrap` | wrapper immagine |
| `.product-step-card__body` | contenuto header |
| `.product-step-card__header` | nome/prezzo |
| `.product-step-card__name` | nome prodotto |
| `.product-step-card__meta` | meta prodotto |
| `.product-step-card__price-block` | prezzo + chevron |
| `.product-step-card__expand-icon` | chevron CSS |
| `.product-step-card__expanded-content` | contenuto espanso |
| `.product-step-card__actions-bar` | action slot |
| `.product-step-card__details-toggle` | trigger dettagli |
| `.product-step-card__details` | dettagli prodotto |
| `.detail-section`, `.detail-heading`, `.detail-label`, `.detail-sep` | helper contenuto dettagli |

## Data hooks

| Hook | Obbligatorio | Elemento | Ruolo |
|---|---:|---|---|
| `data-order-product-dropdown` | si | root | init componente |
| `data-order-product-dropdown-trigger` | si | trigger principale | toggle disclosure card |
| `data-order-product-dropdown-content` | si | contenuto espanso | pannello da mostrare/nascondere |
| `data-order-product-dropdown-details-trigger` | no | trigger dettagli | toggle dettagli prodotto |
| `data-order-product-dropdown-details` | no | contenuto dettagli | pannello dettagli prodotto |

JS:

```js
window.SkillpressUI.OrderProductDropdown.init();
```

## Modifier / stati

Nessun modifier visuale pubblico richiesto per l'apertura: il JS sincronizza
`hidden` e `aria-expanded`.

## Backend owns

- nome, meta, prezzo, immagine;
- badge e action slot;
- contenuto dettagli;
- stato iniziale expanded/collapsed.

## Library owns

- layout card e responsive;
- disclosure UI e ARIA;
- hover/focus;
- chevron CSS.

## Demo-only

Eventuali `data-action`, `data-section`, toolbar scenari, renderer didattici e
fixture appartengono alla demo/app e non sono API pubbliche del componente.

## Out of scope

- stepper tracking;
- upload reale;
- calcoli ordine/prodotto;
- routing e reorder business logic.
