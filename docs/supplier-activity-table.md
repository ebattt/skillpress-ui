# SupplierActivityTable

Dashboard supplier activity table with expandable product/detail rows.

## When To Use

Use `SupplierActivityTable` for the dashboard `Attività fornitore` table where
each supplier activity row expands into a product summary and specification
panel.

Do not use it for:
- normal orders lists;
- quote lists;
- invoice or billing registry tables;
- quote request form rows;
- supplier filtering, pagination or API state.

## Source

- Real markup: `Skillpress-frontend/reference-pages/static/dashboard/index.html` view `fornitore`
- Real CSS: `Skillpress-frontend/reference-pages/static/dashboard/css/components/_fornitore.css`
- Real JS: `Skillpress-frontend/reference-pages/static/dashboard/js/order-tables.js`
- Target page: `dashboard`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/orders-table.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/supplier-activity-table.css">
<script defer src="/node_modules/@ebattt/skillpress-ui/js/supplier-activity-table.js"></script>
```

Initialize after render:

```html
<script>
window.SkillpressUI.SupplierActivityTable.init();
</script>
```

## Reuse Audit

`OrdersTable` is reused for the base dashboard table shell and compact title
cells, but it is not enough: supplier rows have persistent detail rows with
summary, company, product preview and specifications. `OrdersTable` only
generates mobile details from hidden cells.

`BillingTable`, `InvoiceTable` and `QuoteRequestTable` cover different table
contracts. `SearchFilterBar` and `TablePagination` are composed around this
table for filters and pagination.

## Markup Contract

```html
<div class="table-wrapper table-wrapper--scroll">
    <table class="orders-table orders-table--compact supplier-activity-table" data-supplier-activity-table>
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
                data-supplier-activity-table-row
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
            <tr class="supplier-activity-table__detail-row"
                id="supplier-detail-47298"
                data-supplier-activity-table-detail
                hidden>
                <td colspan="8">
                    <div class="supplier-activity-table__detail">
                        <!-- summary, product and specs slots -->
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

## Behavior

`SkillpressUI.SupplierActivityTable.init(root)`:

- injects the chevron header/cell when missing;
- toggles one detail row open at a time;
- syncs `aria-expanded`, `aria-label` and `hidden`;
- supports click and keyboard Enter/Space on rows;
- does not fetch data or run supplier workflow logic.

## Backend/App Owns

- Rows, ids, status text and badge variant.
- Detail summary/product/spec values.
- Filters and pagination state.
- Supplier workflow, permissions, notifications and API calls.

## Library Owns

- Table/detail layout, spacing, borders and responsive detail panel.
- Compact supplier filter row layout when rendered as
  `.supplier-activity-section__filters` with `SearchFilterBar` controls.
- CSS-owned chevron and image placeholder icons.
- Disclosure behavior and accessibility state.

## Accessibility

- Each row needs `aria-controls` pointing at its detail row `id`.
- Rows should be focusable with `tabindex="0"` when the whole row is a toggle.
- Use real text in the detail panel; icon placeholders are decorative.
