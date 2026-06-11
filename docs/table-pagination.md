---
title: TablePagination
description: Controlli di paginazione usati sotto le tabelle dashboard.
layer: components
strategy: css-only
package_path: components/table-pagination.css
---

# TablePagination

Controlli di paginazione sotto le tabelle dashboard. CSS-only: la libreria
possiede layout, bottoni circolari, stati active/disabled/hover/focus e icone
freccia CSS. Pagina corrente, numero pagine e click sono backend/app.

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/table-pagination.css">
```

Nessun JS richiesto.

## Markup minimo

```html
<nav class="table-pagination" aria-label="Paginazione ordini" data-table-pagination>
    <div class="table-pagination__list">
        <button class="pagination-btn" type="button" disabled aria-label="Pagina precedente">
            <span class="pagination-btn__icon pagination-btn__icon--prev" aria-hidden="true"></span>
        </button>
        <button class="pagination-btn pagination-btn--active" type="button" aria-current="page">1</button>
        <button class="pagination-btn" type="button">2</button>
        <button class="pagination-btn" type="button" aria-label="Pagina successiva">
            <span class="pagination-btn__icon pagination-btn__icon--next" aria-hidden="true"></span>
        </button>
    </div>
</nav>
```

## Classi

- `.table-pagination`, `.table-pagination__list`
- `.pagination-btn` + `--active`
- `.pagination-btn__icon` + `--prev|next`

## Data hooks / attributi

- `[data-table-pagination]`: hook semantico opzionale (nessun behavior JS di libreria).
- `aria-current="page"`: raccomandato sul bottone active.
- `disabled`: stato nativo prev/next quando non disponibili.

## Fuori scope

- fetch righe, routing, calcolo pagine;
- OrdersTable, BillingTable, Quotes table.
