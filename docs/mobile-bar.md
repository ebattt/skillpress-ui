---
title: MobileTotalBar
description: Barra fixed in basso (<=1023px) con prezzo totale, CTA carrello, sezione espandibile e toggle riepilogo configurazione.
layer: components
strategy: css-only
package_path: components/mobile-bar.css
---

# MobileTotalBar

Barra fixed in basso, visibile su mobile/tablet (`<=1023px`): mostra prezzo
totale + CTA carrello in compact, una sezione espandibile con i dettagli e un
toggle del riepilogo configurazione. Sostituisce `SidebarTotals` sotto 1024px.
CSS-only: i toggle (`--expanded`, `--active`, `--visible`) sono wire-up
consumer-side; nessuna libreria JS.

## Markup contract

```html
<div id="mobile-total-bar" class="mobile-total-bar">
    <div id="mobile-bar-overlay" class="mobile-total-bar__overlay"></div>
    <div class="mobile-total-bar__container">
        <div id="mobile-bar-handle" class="mobile-total-bar__handle" role="button" tabindex="0"
             aria-label="Espandi dettagli totale" aria-expanded="false">
            <svg class="mobile-total-bar__handle-arrow" aria-hidden="true">...</svg>
        </div>
        <div class="mobile-total-bar__compact">
            <div class="mobile-total-bar__price-section">
                <span class="mobile-total-bar__label">Totale</span>
                <span id="mobile-total-price" class="mobile-total-bar__price">-</span>
            </div>
            <button id="mobile-add-cart-btn" class="mobile-total-bar__cart-btn">Aggiungi al carrello</button>
        </div>
        <div id="mobile-bar-expanded" class="mobile-total-bar__expanded-section">
            <div class="mobile-total-bar__divider"></div>
            <div class="mobile-total-bar__details">
                <div class="mobile-total-bar__detail-row"><span>Quantità</span><span>50</span></div>
                <div class="mobile-total-bar__detail-row mobile-total-bar__detail-shipping">
                    <span>Spedizione</span><span>Gratuita</span>
                </div>
            </div>
            <button id="mobile-config-toggle" class="mobile-config-toggle"
                    aria-expanded="false" aria-controls="mobile-config-content">
                Vedi configurazione
            </button>
            <div id="mobile-config-content" class="mobile-config-content"
                 role="region" aria-label="Riepilogo configurazione"></div>
        </div>
    </div>
</div>
```

## Classi pubbliche

Container fixed:

- `.mobile-total-bar` — root: `display: none` desktop, `block` `<=1023px`,
  `position: fixed; bottom: 0`, `z-index: var(--z-mobile-bar)`, `pointer-events: none`.
- `.mobile-total-bar__overlay` — `display: none` di default, slot overlay opzionale.
- `.mobile-total-bar__container` — flex column, sfondo bianco, border-top + radius
  alto, `padding-bottom: env(safe-area-inset-bottom)`, `max-height: 85vh`, `pointer-events: auto`.

Handle, compact, espansa, toggle:

- `.mobile-total-bar__handle`, `__handle-arrow` (ruota 180° con `--expanded`).
- `.mobile-total-bar__compact`, `__price-section`, `__label`, `__price`, `__iva` (slot opzionale).
- `.mobile-total-bar__cart-btn` — full width.
- `.mobile-total-bar__expanded-section` — `max-height: 0; opacity: 0`; con `--expanded`: aperta.
- `.mobile-total-bar__divider` (placeholder DOM, `display: none`).
- `.mobile-total-bar__details`, `__detail-row`, `__detail-shipping` (modifier, value success).
- `.mobile-config-toggle` (+`--active`, ruota chevron `#mobile-config-icon`).
- `.mobile-config-content` (+`--visible`: aperto, sfondo gray-50).

Le classi `.sidebar-totals__*` iniettate dal consumer dentro
`.mobile-config-content` sono definite in `components/sidebar-totals.css`: importare
entrambi i CSS (il bundle `bundles/demo-minimal.css` lo fa).

## Stati e modifier

- `.mobile-total-bar--expanded` → espande la barra (toggle handle/overlay).
- `.mobile-config-toggle--active` + `.mobile-config-content--visible` → espande il
  riepilogo configurazione (toggle indipendente).
- `aria-expanded` su `.mobile-total-bar__handle` e `.mobile-config-toggle`
  aggiornati dal consumer.

## Responsive

- `<=374px`: padding e font ridotti.
- `>=640px <=1023px`: `max-width: 480px` centrato.
- `>=1024px`: `display: none` (usare `SidebarTotals`).

## Cosa decide il CMS / backend

Testi, valori formattati, contenuto HTML iniettato in `.mobile-config-content`,
click carrello, presenza di `.mobile-total-bar__detail-shipping`. Gli `id` del
markup sono opzionali (hook consumer); la libreria stila solo `#mobile-config-icon`.

## Cosa decide la libreria

Visibility responsive, z-index/pointer-events/safe-area, aspetto handle/compact/
config-toggle, rotazione chevron e transizioni `max-height`/`opacity`.

## Fuori scope

Behavior toggle, generazione HTML del riepilogo, aggiornamento valori, push
checkout.
