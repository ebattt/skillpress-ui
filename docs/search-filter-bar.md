# SearchFilterBar

`SearchFilterBar` mostra la barra filtri della dashboard con select campo,
input ricerca e bottone azione.

## Fonte

- Markup reale: `Skillpress-frontend/dashboard/index.html`
- CSS reale: `Skillpress-frontend/dashboard/css/components/_tables.css`
- Catalogo elements-ui: `Skillpress-frontend/elements-ui/js/dashboard/search-filter-bar.js`
- Pagina target: `dashboard`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/search-filter-bar.css">
```

Nessun JS richiesto.

## Responsabilita

La libreria decide griglia responsive, stile select/input/button, focus e hover.
Il backend decide opzioni, testi, valori iniziali e behavior di filtro.

## Reuse Audit

`FormPrimitives` non basta per parity: la fonte dashboard usa sizing, radius,
focus shadow e griglia specifici.

`Button` non basta per parity: il bottone filtro e' compatto, radius lg e
dimensionato dalla griglia.

`Card`, `Badge`, `DashboardActionBadge` e `RecentOrderCard` non coprono questo
pattern.

## Markup Minimo

```html
<div class="orders-filter-bar orders-filter-bar--orders" data-search-filter-bar>
    <select class="orders-filter-select" data-filter="field">
        <option>Numero</option>
        <option>Lavoro</option>
        <option>Referente</option>
        <option>Stato</option>
    </select>
    <input type="text" placeholder="cerca" class="orders-filter-input" data-filter="search">
    <button class="orders-filter-btn" type="button" data-action="filter-orders">Mostra</button>
</div>
```

## Variante Quotes

```html
<div class="orders-filter-bar orders-filter-bar--quotes" data-search-filter-bar>
    <select class="orders-filter-select">
        <option>Numero</option>
    </select>
    <input type="text" placeholder="cerca" class="orders-filter-input">
    <button class="orders-filter-btn" type="button">Mostra</button>
    <button class="orders-filter-btn orders-filter-btn--accent" type="button">
        <span class="orders-filter-btn__icon orders-filter-btn__icon--add" aria-hidden="true"></span>
        Richiedi Preventivo
    </button>
</div>
```

## Classi

- `.orders-filter-bar`
- `.orders-filter-bar--orders`
- `.orders-filter-bar--quotes`
- `.orders-filter-select`
- `.orders-filter-input`
- `.orders-filter-btn`
- `.orders-filter-btn--accent`
- `.orders-filter-btn__icon`
- `.orders-filter-btn__icon--add`

## Attributi

- `[data-search-filter-bar]`: hook semantico opzionale. Non esiste behavior JS
  di libreria associato.

## Fuori Scope

- ricerca reale;
- API;
- debounce;
- routing;
- OrdersTable;
- TablePagination;
- quote creation flow.
