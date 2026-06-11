---
title: SupplierActivityTable
description: Tabella attività fornitore della dashboard con righe espandibili.
layer: components
strategy: css-js
status: public-contract
package_path: components/supplier-activity-table.css
js_path: js/expandable-table.js
---

# SupplierActivityTable

Tabella "Attività fornitore" della dashboard: ogni riga si espande in un pannello
con riepilogo, azienda, preview prodotto e specifiche. La libreria fornisce le
classi CSS (`supplier-activity-table__*`); l'espansione riga e' gestita dal
modulo condiviso `ExpandableTable` (`js/expandable-table.js`). Estende la shell di
`OrdersTable` (`orders-table.css`). Righe, dati, filtri e workflow fornitore sono
backend/app.

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/orders-table.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/supplier-activity-table.css">
<script defer src="/node_modules/@ebattt/skillpress-ui/js/expandable-table.js"></script>
```

## Markup contract

```html
<div class="table-wrapper table-wrapper--scroll">
    <table class="orders-table orders-table--compact supplier-activity-table" data-expandable-table>
        <thead>
            <tr>
                <th class="th-id">#</th>
                <th class="th-title">Lavoro</th>
                <th class="th-mobile-hide">Attività</th>
                <th class="th-mobile-hide">Messaggio</th>
                <th class="th-mobile-hide">Azienda</th>
                <th class="th-mobile-hide">Data</th>
                <th class="th-status">Stato</th>
            </tr>
        </thead>
        <tbody>
            <tr class="supplier-activity-table__row"
                tabindex="0"
                data-expandable-table-row
                aria-controls="supplier-detail-47298"
                aria-expanded="false">
                <td class="orders-table__cell--id font-semibold text-dark-blue orders-table__cell--nowrap">47298</td>
                <td class="orders-table__cell--title">
                    <div class="table-title-cell">
                        <span class="table-title-cell__text">Invio Cartonato - Cartonato Brossura Filo Refe</span>
                    </div>
                </td>
                <td class="orders-table__cell--mobile-hide">
                    <span class="supplier-activity-table__activity-label">In attesa</span>
                </td>
                <td class="orders-table__cell--mobile-hide">
                    <span class="supplier-activity-table__message">Verrai notificato appena Skillpress ti invierà il semilavorato</span>
                </td>
                <td class="orders-table__cell--mobile-hide">
                    <div class="supplier-activity-table__company">
                        <strong>SKILLPRESS di Battiston Maurizio e Marco snc</strong>
                        <span>Viale Kennedy 17</span>
                        <span>30025 - Fossalta di Portogruaro (VE) - Italia</span>
                    </div>
                </td>
                <td class="orders-table__cell--nowrap orders-table__cell--mobile-hide"><strong>07/05/2021</strong></td>
                <td class="orders-table__cell--status"><span class="sp-badge sp-badge--info">Aperto</span></td>
            </tr>
            <tr class="supplier-activity-table__detail-row" id="supplier-detail-47298" hidden>
                <td colspan="7">
                    <div class="supplier-activity-table__detail"><!-- summary, product e specs --></div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

## Classi pubbliche

- `.supplier-activity-table`, `.supplier-activity-table__row`, `.supplier-activity-table__detail-row`, `.supplier-activity-table__detail`
- `.supplier-activity-table__activity-label`, `.supplier-activity-table__message`
- `.supplier-activity-table__company`, `.supplier-activity-table__name`, `.supplier-activity-table__type`
- `.supplier-activity-table__summary`, `.supplier-activity-table__summary-item`
- `.supplier-activity-table__product`, `.supplier-activity-table__info`
- `.supplier-activity-table__image`, `.supplier-activity-table__image-placeholder`
- `.supplier-activity-table__specs`, `.supplier-activity-table__specs-col`
- `.supplier-activity-table__chevron`, `.supplier-activity-table__chevron-button`, `.supplier-activity-table__chevron-cell`

Riusa anche le classi shell di `orders-table.css` (vedi `orders-table.md`).

## Data hooks

L'espansione riga usa i hook di `ExpandableTable`:

| Hook | Elemento | Ruolo |
|---|---|---|
| `data-expandable-table` | `<table>` | root da inizializzare |
| `data-expandable-table-row` | `<tr>` riga | riga espandibile (`aria-controls` -> id detail-row, `aria-expanded`, `tabindex="0"`) |
| `data-expandable-table-toggle` | `<button>` | chevron toggle dentro la riga |

Evento: `sp:expandable-table:row-toggle`. Una sola riga aperta alla volta; click
e Enter/Space supportati; il modulo non recupera dati.

## Ownership

- Backend/app: righe, id, status e variante badge; valori del dettaglio; filtri
  e paginazione; workflow, permessi, notifiche, API.
- Libreria: layout tabella/dettaglio, spacing, bordi, pannello responsive, icone
  CSS (chevron e placeholder immagine), disclosure e stato di accessibilita'.

## Accessibilita'

- Ogni riga ha `aria-controls` verso l'`id` della detail-row.
- Righe focusabili con `tabindex="0"` quando l'intera riga e' un toggle.
- Testo reale nel pannello dettaglio; i placeholder icona sono decorativi.
