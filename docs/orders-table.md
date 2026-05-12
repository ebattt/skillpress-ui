# OrdersTable

`OrdersTable` mostra la tabella ordini compatta della dashboard.

## Fonte

- Markup reale: `Skillpress-frontend/reference-pages/static/dashboard/index.html`
- CSS reale: `Skillpress-frontend/reference-pages/static/dashboard/css/components/_tables.css`
- Fonte catalogo storico: `Skillpress-frontend/elements-ui/js/dashboard/orders-table.js`
- Pagina target: `dashboard`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/primitives/badge.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/dashboard-action-badge.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/orders-table.css">
<script defer src="/node_modules/@ebattt/skillpress-ui/js/orders-table.js"></script>
```

Il JS e' opzionale e abilita le righe dettagli mobile:

```html
<script>
window.addEventListener('DOMContentLoaded', function () {
    window.SkillpressUI.OrdersTable.init();
});
</script>
```

## Responsabilita

La libreria decide wrapper, bordo/radius, colonne compact, ellipsis titolo,
layout liste prodotto/azioni, responsive statico e, quando inizializzata, la
riga dettagli mobile generata dalle celle `.orders-table__cell--mobile-hide`.
Nella shell dashboard mobile (`<=1023px`) la riga compatta mantiene solo le
colonne principali e sposta `Pagamento` e `Totale` nella riga dettagli, evitando
overflow laterale su tablet/mobile larghi. Backend/app decidono righe, status,
action chip, dati ordine e routing.

## Reuse Audit

`Badge` copre gli status dot+testo. Usare `.sp-badge badge--*`; non creare
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
            <tr data-recent-order-card-order-id="ORD-001">
                <td class="orders-table__cell--id font-semibold text-dark-blue orders-table__cell--nowrap">110456</td>
                <td class="orders-table__cell--title">
                    <div class="table-title-cell">
                        <span class="table-title-cell__text" title="Catalogo Primavera Estate">Catalogo Primavera Estate</span>
                    </div>
                </td>
                <td class="orders-table__cell--prodotti orders-table__cell--mobile-hide">
                    <div class="product-list">
                        <span class="product-name">Brossura fresata</span>
                    </div>
                </td>
                <td class="orders-table__cell--pezzi orders-table__cell--text-right orders-table__cell--mobile-hide">200</td>
                <td class="orders-table__cell--mobile-hide">Lucia Marchetti</td>
                <td class="orders-table__cell--mobile-hide orders-table__cell--nowrap">05/02/2026</td>
                <td class="orders-table__cell--mobile-hide"></td>
                <td class="orders-table__cell--status"><span class="sp-badge sp-badge--info">Aperto</span></td>
                <td class="orders-table__cell--payment orders-table__cell--mobile-hide th-simplified-show"><span class="sp-badge sp-badge--warning">In sospeso</span></td>
                <td class="orders-table__cell--spedizione orders-table__cell--mobile-hide">Ritiro in sede<br><strong>12/03/2026</strong></td>
                <td class="orders-table__cell--total font-semibold orders-table__cell--text-right orders-table__cell--nowrap">&euro; 320,50</td>
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
- `.orders-table__cell--id`, `.orders-table__cell--title`, `.orders-table__cell--prodotti`, `.orders-table__cell--pezzi`, `.orders-table__cell--status`,
  `.orders-table__cell--payment`, `.orders-table__cell--spedizione`, `.orders-table__cell--total`
- `.orders-table__cell--text-right`, `.th-text-right`, `.orders-table__cell--nowrap`
- `.orders-table__cell--mobile-hide`, `.th-mobile-hide`, `.orders-table__cell--simplified-show`,
  `.th-simplified-show`

## Mobile Details

`SkillpressUI.OrdersTable.init()`:

- aggiunge `.orders-table__cell--mobile-chevron`;
- marca le righe con `[data-orders-table-row]`;
- genera una riga `.tr-mobile-details[hidden][data-orders-table-detail]`;
- sincronizza `aria-expanded` e `hidden`;
- non aggiunge CTA di routing o dettaglio ordine.

Sotto `1024px`, `Pagamento` e `Totale` non sono visibili nella riga compatta
di `orders-table--compact`; i valori restano disponibili nella riga dettagli
generata dal JS a partire dalle celle `.orders-table__cell--mobile-hide`.

## Token

- `--color-focus-ring`: colore outline keyboard focus delle righe interattive.

## Fuori Scope

- routing/detail ordine;
- upload o pagamento;
- filtri reali/API;
- paginazione;
- tabelle billing, quotes e fornitore.
