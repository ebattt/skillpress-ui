---
title: SidebarTotals
description: Sidebar configuratore desktop con box totale, promo, toggle riepilogo e CTA carrello.
layer: components
strategy: css-only
package_path: components/sidebar-totals.css
---

# SidebarTotals

Sidebar configuratore desktop: box totale (qty, miglior prezzo, imposta,
spedizione, totale evidenziato), input codice promo, toggle riepilogo
configurazione e bottone "Aggiungi al carrello". CSS-only: la libreria possiede
layout e stile; valori, riepilogo iniettato, validazione promo e click carrello
sono CMS/consumer. Sticky desktop >=1024px, `display: none !important` sotto.

## Markup base

```html
<div class="configurator-sidebar">
    <div class="sidebar-total-box">
        <div>
            <h3 class="sidebar-title">Totale</h3>
            <div class="sidebar-rows">
                <div class="sidebar-row">
                    <span class="sidebar-row__label">Quantità</span>
                    <span class="sidebar-row__value">50</span>
                </div>
                <div class="sidebar-row">
                    <span class="sidebar-row__label">Miglior prezzo</span>
                    <span class="sidebar-row__value">-</span>
                </div>
                <div class="sidebar-row">
                    <span class="sidebar-row__label">Imposta</span>
                    <span class="sidebar-row__value">-</span>
                </div>
                <div class="sidebar-row sidebar-row--success">
                    <span class="sidebar-row__label">Spedizione</span>
                    <span class="sidebar-row__value">Gratuita</span>
                </div>
            </div>
            <div class="sidebar-divider"></div>
            <div class="sidebar-total-row">
                <span class="sidebar-total-label">Totale</span>
                <span class="sidebar-total-value">-</span>
            </div>
        </div>
        <div class="promo-section">
            <label for="promo-id">Hai un codice promo?</label>
            <input id="promo-id" type="text" placeholder="Inserisci codice" class="promo-input"/>
        </div>
        <div class="sidebar-totals__section">
            <label>Vuoi visualizzare il riepilogo?</label>
            <button class="sidebar-totals__btn" aria-expanded="false" aria-controls="riepilogo-id">
                <svg aria-hidden="true">...</svg> Mostra riepilogo <svg aria-hidden="true">...</svg>
            </button>
            <div id="riepilogo-id" class="sidebar-totals__content"></div>
        </div>
        <button class="add-to-cart-btn"><svg aria-hidden="true">...</svg> Aggiungi al carrello</button>
    </div>
</div>
```

## Classi pubbliche

Layout configuratore:

- `.configurator-section`, `.configurator-grid`, `.config-column`, `.config-section-title`
- `.configurator-sidebar` (sticky >=1024px, hidden <1024px), `.sidebar-total-box`

Riepilogo righe totale:

- `.sidebar-title`, `.sidebar-rows`, `.sidebar-row`, `.sidebar-row__label`, `.sidebar-row__value`
- `.sidebar-row--success` (evidenzia il valore in verde), `.sidebar-row--green` (legacy, evidenzia la riga)
- `.sidebar-divider`, `.sidebar-total-row`, `.sidebar-total-label`, `.sidebar-total-value`

Promo e toggle:

- `.promo-section`, `.promo-input`
- `.sidebar-totals__btn`, `.sidebar-totals__content`

Utility per il riepilogo iniettato dal CMS:

- `.sidebar-totals__container`, `.sidebar-totals__section`, `.sidebar-totals__header`
- `.sidebar-totals__row` + `--indent`, `.sidebar-totals__error`, `.sidebar-totals__empty`, `.sidebar-totals__placeholder`, `.sidebar-totals__muted`
- Alias legacy: `.sidebar-totals__section-header` (-> `__header`), `.sidebar-totals__indent` (-> `__row--indent`)

CTA carrello:

- `.add-to-cart-btn`

## Data hooks / accessibilita'

Nessun `data-*` pubblico: CSS-only. Il toggle riepilogo e' wire-up consumer. Per
accessibilita' il consumer DEVE:

- mantenere `aria-controls` sul `.sidebar-totals__btn` con l'`id` di `.sidebar-totals__content`;
- aggiornare `aria-expanded` su click e rendere visibile `.sidebar-totals__content`.

## Ownership

- CMS/backend: testi e valori delle righe, presenza riga spedizione, promo,
  contenuto HTML del riepilogo, testo e azione del bottone carrello.
- Libreria: layout sticky/hidden, spacing, tipografia/colori righe e totale,
  focus/radius input promo, aspetto bottoni riepilogo e carrello, scroll del content.

## Fuori scope

- behavior toggle riepilogo e aggiornamento valori (business logic consumer);
- generazione del riepilogo (HTML iniettato dal CMS);
- validazione promo, click carrello;
- componenti download (`primitives/download-buttons.css`).
