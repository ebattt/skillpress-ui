---
title: SearchFilterBar
description: Barra filtri della dashboard con select campo, input ricerca e bottone azione.
layer: components
strategy: css-only
package_path: components/search-filter-bar.css
---

# SearchFilterBar

Barra filtri della dashboard: select campo, input ricerca e bottone azione.
CSS-only: la libreria possiede griglia responsive e stile di select/input/button;
opzioni, testi, valori iniziali e behavior di filtro sono backend/app.

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/search-filter-bar.css">
```

Nessun JS richiesto.

## Markup minimo

```html
<div class="orders-filter-bar orders-filter-bar--orders" data-search-filter-bar>
    <select class="orders-filter-select">
        <option>Numero</option>
        <option>Lavoro</option>
        <option>Referente</option>
        <option>Stato</option>
    </select>
    <input type="text" placeholder="cerca" class="orders-filter-input">
    <button class="orders-filter-btn" type="button">Mostra</button>
</div>
```

## Variante quotes

```html
<div class="orders-filter-bar orders-filter-bar--quotes" data-search-filter-bar>
    <select class="orders-filter-select"><option>Numero</option></select>
    <input type="text" placeholder="cerca" class="orders-filter-input">
    <button class="orders-filter-btn" type="button">Mostra</button>
    <button class="orders-filter-btn orders-filter-btn--accent" type="button">
        <span class="orders-filter-btn__icon orders-filter-btn__icon--add" aria-hidden="true"></span>
        Richiedi Preventivo
    </button>
</div>
```

## Classi

- `.orders-filter-bar` + `--orders|quotes`
- `.orders-filter-select`
- `.orders-filter-input`
- `.orders-filter-btn` + `--accent|dashboard-primary`
- `.orders-filter-btn__icon` + `--add`

## Data hooks

- `[data-search-filter-bar]`: hook semantico opzionale; nessun behavior JS di libreria.

## Fuori scope

- ricerca reale, API, debounce, routing;
- OrdersTable, TablePagination, quote creation flow.
