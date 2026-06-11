---
title: OrdersTable
description: Tabella ordini compatta della dashboard, con riga dettagli espandibile.
layer: components
strategy: css-js
status: public-contract
package_path: components/orders-table.css
js_path: js/expandable-table.js
---

# OrdersTable

Tabella ordini compatta della dashboard. La libreria fornisce le classi CSS
(`orders-table__*`, celle, riga dettagli mobile, chevron). L'espansione riga e'
gestita dal modulo condiviso `ExpandableTable` (`js/expandable-table.js`):
chevron e detail-row vivono nel markup, il JS fa solo wiring. Backend/app
decidono righe, status, action chip, dati ordine e routing.

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/primitives/badge.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/dashboard-action-badge.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/orders-table.css">
<script defer src="/node_modules/@ebattt/skillpress-ui/js/expandable-table.js"></script>
```

## Markup minimo

```html
<div class="table-wrapper table-wrapper--scroll">
    <table class="orders-table orders-table--compact" data-expandable-table>
        <thead>
            <tr>
                <th class="th-id">#</th>
                <th class="th-title">Lavoro</th>
                <th class="th-mobile-hide">Prodotti</th>
                <th class="th-text-right th-mobile-hide">Pezzi</th>
                <th class="th-mobile-hide">Referente</th>
                <th class="th-mobile-hide">Spedito il</th>
                <th class="th-status">Stato</th>
                <th class="th-mobile-hide th-simplified-show th-payment">Pagamento</th>
                <th class="th-mobile-hide">Spedizione</th>
                <th class="th-text-right th-total">Totale</th>
            </tr>
        </thead>
        <tbody>
            <tr data-expandable-table-row aria-controls="orders-detail-110456" aria-expanded="false" tabindex="0">
                <td class="orders-table__cell--id font-semibold text-dark-blue orders-table__cell--nowrap">110456</td>
                <td class="orders-table__cell--title">
                    <div class="table-title-cell">
                        <span class="table-title-cell__text" title="Catalogo Primavera Estate">Catalogo Primavera Estate</span>
                    </div>
                </td>
                <td class="orders-table__cell--prodotti orders-table__cell--mobile-hide">
                    <div class="product-list"><span class="product-name">Brossura fresata</span></div>
                </td>
                <td class="orders-table__cell--pezzi orders-table__cell--text-right orders-table__cell--mobile-hide">200</td>
                <td class="orders-table__cell--mobile-hide">Lucia Marchetti</td>
                <td class="orders-table__cell--mobile-hide orders-table__cell--nowrap">05/02/2026</td>
                <td class="orders-table__cell--status"><span class="sp-badge sp-badge--info">Aperto</span></td>
                <td class="orders-table__cell--payment orders-table__cell--mobile-hide th-simplified-show"><span class="sp-badge sp-badge--warning">In sospeso</span></td>
                <td class="orders-table__cell--spedizione orders-table__cell--mobile-hide">Ritiro in sede<br><strong>12/03/2026</strong></td>
                <td class="orders-table__cell--total font-semibold orders-table__cell--text-right orders-table__cell--nowrap">&euro; 320,50</td>
            </tr>
            <tr id="orders-detail-110456" hidden>
                <td colspan="10"><!-- contenuto dettaglio --></td>
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
- `.orders-table__cell--id|title|prodotti|pezzi|status|payment|spedizione|total`
- `.orders-table__cell--text-right`, `.th-text-right`, `.orders-table__cell--nowrap`
- `.orders-table__cell--mobile-hide`, `.th-mobile-hide`, `.orders-table__cell--simplified-show`, `.th-simplified-show`
- `.orders-table__cell--mobile-chevron`, `.tr-mobile-details`, `.mobile-details-grid`

## Data hooks

L'espansione riga usa i hook di `ExpandableTable`:

| Hook | Elemento | Ruolo |
|---|---|---|
| `data-expandable-table` | `<table>` | root da inizializzare |
| `data-expandable-table-row` | `<tr>` riga | riga espandibile (`aria-controls` -> id detail-row, `aria-expanded`, `tabindex="0"`) |
| `data-expandable-table-toggle` | `<button>` | chevron toggle dentro la riga |

Evento: `sp:expandable-table:row-toggle`.

## Token

- `--color-focus-ring`: colore outline keyboard focus delle righe interattive.

## Fuori scope

- routing/detail ordine, upload, pagamento;
- filtri reali/API, paginazione;
- tabelle billing, quotes e fornitore.
