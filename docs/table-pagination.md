# TablePagination

`TablePagination` mostra i controlli di paginazione usati sotto le tabelle
dashboard.

## Fonte

- Markup reale: `Skillpress-frontend/dashboard/index.html`
- CSS reale: `Skillpress-frontend/dashboard/css/components/_tables.css`
- Catalogo elements-ui: `Skillpress-frontend/elements-ui/js/dashboard/table-pagination.js`
- Pagina target: `dashboard`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/table-pagination.css">
```

Nessun JS richiesto.

## Responsabilita

La libreria decide layout, bottoni circolari, active/disabled/hover/focus e
icone freccia CSS. Il backend/app decide pagina corrente, numero pagine e
behavior click.

## Reuse Audit

`Button` non basta: la fonte usa bottoni circolari da 2rem con active dedicato
e disabled opacity.

`SearchFilterBar` condivide solo il sizing icona nella fonte, ma non il pattern.

`Badge`, `Card` e `DashboardActionBadge` non c'entrano.

## Markup Minimo

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

- `.table-pagination`
- `.table-pagination__list`
- `.pagination-btn`
- `.pagination-btn--active`
- `.pagination-btn__icon`
- `.pagination-btn__icon--prev`
- `.pagination-btn__icon--next`

## Attributi

- `[data-table-pagination]`: hook semantico opzionale.
- `aria-current="page"`: raccomandato sul bottone active.
- `disabled`: stato nativo prev/next quando non disponibili.

## Fuori Scope

- fetch righe;
- routing;
- calcolo pagine;
- OrdersTable;
- BillingTable;
- Quotes table.
