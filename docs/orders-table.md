# OrdersTable

`OrdersTable` mostra la tabella ordini compatta della dashboard.

## Fonte

- Markup reale: `Skillpress-frontend/dashboard/index.html`
- CSS reale: `Skillpress-frontend/dashboard/css/components/_tables.css`
- Catalogo elements-ui: `Skillpress-frontend/elements-ui/js/dashboard/orders-table.js`
- Pagina target: `dashboard`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/primitives/badge.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/dashboard-action-badge.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/orders-table.css">
```

Nessun JS richiesto in questa iterazione.

## Responsabilita

La libreria decide wrapper, bordo/radius, colonne compact, ellipsis titolo,
layout liste prodotto/azioni e responsive statico. Backend/app decidono righe,
status, action chip, dati ordine e routing.

## Reuse Audit

`Badge` copre gli status dot+testo. Usare `.badge badge--*`; non creare
`DashboardStatusBadge`.

`DashboardActionBadge` copre le azioni richieste dentro la tabella.

`SearchFilterBar` e `TablePagination` sono componenti separati da comporre
sopra e sotto la tabella.

`PriceTable` non basta: e' tabella pricing/configuratore, non lista ordini.

`Card` e `Button` non coprono semantica e layout tabellare.

## Markup Minimo

```html
<div class="table-wrapper table-wrapper--scroll">
    <table class="orders-table orders-table--compact" data-orders-table>
        <thead>
            <tr>
                <th class="th-id">#</th>
                <th class="th-title">Lavoro</th>
                <th class="th-mobile-hide">Prodotti</th>
                <th class="th-text-right th-mobile-hide">Pezzi</th>
                <th class="th-mobile-hide">Referente</th>
                <th class="th-mobile-hide">Spedito il</th>
                <th class="th-mobile-hide">Azioni richieste</th>
                <th class="th-status">Stato</th>
                <th class="th-mobile-hide th-simplified-show th-payment">Pagamento</th>
                <th class="th-mobile-hide">Spedizione</th>
                <th class="th-text-right th-total">Totale</th>
            </tr>
        </thead>
        <tbody>
            <tr data-order-id="ORD-001">
                <td class="td-id font-semibold text-dark-blue td-nowrap">110456</td>
                <td class="td-title">
                    <div class="table-title-cell">
                        <span class="table-title-cell__text" title="Catalogo Primavera Estate">Catalogo Primavera Estate</span>
                    </div>
                </td>
                <td class="td-prodotti td-mobile-hide">
                    <div class="product-list">
                        <span class="product-name">Brossura fresata</span>
                    </div>
                </td>
                <td class="td-pezzi td-text-right td-mobile-hide">200</td>
                <td class="td-mobile-hide">Lucia Marchetti</td>
                <td class="td-mobile-hide td-nowrap">05/02/2026</td>
                <td class="td-mobile-hide"></td>
                <td class="td-status"><span class="badge badge--info">In lavorazione</span></td>
                <td class="td-payment td-mobile-hide th-simplified-show"><span class="badge badge--warning">In sospeso</span></td>
                <td class="td-spedizione td-mobile-hide">Ritiro in sede<br><strong>12/03/2026</strong></td>
                <td class="td-total font-semibold td-text-right td-nowrap">&euro; 320,50</td>
            </tr>
        </tbody>
    </table>
</div>
```

## Classi

- `.table-wrapper`, `.table-wrapper--scroll`
- `.orders-table`, `.orders-table--compact`
- `.table-title-cell`, `.table-title-cell__text`, `.table-title-cell__actions`
- `.table-actions-list`
- `.product-list`, `.product-name`
- `.td-id`, `.td-title`, `.td-prodotti`, `.td-pezzi`, `.td-status`,
  `.td-payment`, `.td-spedizione`, `.td-total`
- `.td-text-right`, `.th-text-right`, `.td-nowrap`
- `.td-mobile-hide`, `.th-mobile-hide`, `.td-simplified-show`,
  `.th-simplified-show`

## Fuori Scope

- mobile expandable detail row;
- routing/detail ordine;
- upload o pagamento;
- filtri reali/API;
- paginazione;
- tabelle billing, quotes e fornitore.
