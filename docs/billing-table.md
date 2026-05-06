# BillingTable

Dashboard billing records table for the `Anagrafiche` area.

## When To Use

Use `BillingTable` for the dashboard billing registry table with compact
preference columns, mobile address text under the name and edit/download action
links.

Do not use it for:
- billing forms;
- invoices table behavior;
- quote request rows;
- supplier activity rows;
- generic data table abstraction.

## Markup Contract

```html
<div class="table-wrapper table-wrapper--scroll">
    <table class="billing-table">
        <thead>
            <tr>
                <th>Nome</th>
                <th class="th-mobile-hide">P.I.V.A.</th>
                <th class="th-mobile-hide">Cod. Fiscale</th>
                <th class="th-mobile-hide">Indirizzo</th>
                <th class="th-mobile-hide">E-mail</th>
                <th class="th-mobile-hide">SDI</th>
                <th class="th-mobile-hide">Preferito per fatturazione</th>
                <th class="th-mobile-hide">Preferito per spedizione</th>
                <th class="th-text-center billing-table__pref-col" title="Preferito fatturazione">
                    <span class="billing-table__icon billing-table__icon--receipt" aria-hidden="true"></span>
                </th>
                <th class="th-text-center billing-table__pref-col" title="Preferito spedizione">
                    <span class="billing-table__icon billing-table__icon--shipping" aria-hidden="true"></span>
                </th>
                <th class="th-actions"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="font-semibold td-nowrap">
                    Giacomo Battiston
                    <span class="billing-table__mobile-address">Viale Trieste 54, Fossalta di Portogruaro (VE)</span>
                </td>
                <td class="td-mobile-hide">-</td>
                <td class="td-nowrap td-mobile-hide">BTTGCM85M01H501Z</td>
                <td class="td-mobile-hide">Viale Trieste 54, 30025 Fossalta di Portogruaro (VE)</td>
                <td class="td-mobile-hide">giacomo.battiston@example.com</td>
                <td class="td-mobile-hide">M5UXCR1</td>
                <td class="td-mobile-hide">Si</td>
                <td class="td-mobile-hide">Si</td>
                <td class="td-text-center billing-table__pref-col">
                    <span class="billing-table__icon billing-table__icon--check" aria-label="Preferito"></span>
                </td>
                <td class="td-text-center billing-table__pref-col">
                    <span class="billing-table__icon billing-table__icon--check" aria-label="Preferito"></span>
                </td>
                <td class="td-text-center">
                    <button class="dash-link--download" type="button" data-action="edit-billing" title="Modifica">
                        <span class="dash-link--download__icon dash-link--download__icon--edit" aria-hidden="true"></span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

## Backend/CMS Owns

- Rows and column values.
- Preference state.
- Action attributes, links and handlers.
- Download/edit availability.

## Library Owns

- Table spacing, borders and hover.
- Mobile address presentation.
- Compact preference columns.
- CSS-owned chrome icons for receipt, shipping, check, edit and download.

## Accessibility

- Use `title` or `aria-label` on icon-only action buttons.
- Use `aria-label="Preferito"` on check icons when the icon is meaningful.
- Keep table headers textual on desktop; compact icon headers are decorative
  alternates for the dashboard layout.
