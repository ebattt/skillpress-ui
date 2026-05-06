# InvoiceTable

Dashboard invoices table for downloadable invoices and DDT documents.

## When To Use

Use `InvoiceTable` for the dashboard billing `Fatture` table when each row
contains invoice number, DDT, date and total, with inline download actions.

Do not use it for:
- billing registry/anagrafiche tables;
- orders lists;
- quote request rows;
- supplier activity rows;
- real filtering, pagination or PDF download logic.

## Markup Contract

```html
<section class="invoice-table-section" id="billing-fatture-section">
    <h2 class="invoice-table-section__title">Fatture</h2>
    <div class="invoice-table-section__filters" aria-label="Filtri fatture">
        <select class="orders-filter-select" data-filter="invoice-status">
            <option>Tutte le fatture</option>
            <option>Pagate</option>
            <option>In sospeso</option>
        </select>
        <select class="orders-filter-select" data-filter="invoice-year">
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
        </select>
    </div>
    <div class="table-wrapper">
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>Fattura</th>
                    <th>DDT</th>
                    <th>Data</th>
                    <th>Totale</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <button class="dash-link--download" type="button">
                            <span class="font-semibold">FT-2025-024</span>
                            <span class="dash-link--download__icon dash-link--download__icon--download" aria-hidden="true"></span>
                        </button>
                    </td>
                    <td>
                        <button class="dash-link--download" type="button">
                            <span class="font-semibold">1042</span>
                            <span class="dash-link--download__icon dash-link--download__icon--download" aria-hidden="true"></span>
                        </button>
                    </td>
                    <td>10/09/25</td>
                    <td class="font-semibold">&euro; 98,42</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>
```

## Composition

The invoice filters use the compact `.invoice-table-section__filters` row with
`SearchFilterBar` select controls. Pagination is covered by `TablePagination`.
Keep pagination outside `InvoiceTable`.

## Backend/CMS Owns

- Invoice rows and formatted values.
- Download URLs, action attributes and handlers.
- Status/year filters.
- Pagination state and routing.
- PDF availability and permissions.

## Library Owns

- Table spacing, borders, typography and hover.
- Download link styling inside table cells.
- CSS-owned download icon replacing Material Symbols.
- Basic responsive spacing.

## Accessibility

- Use `<a>` when the action is a direct document URL.
- Use `<button type="button">` when the app opens or generates a download.
- Add `aria-label` when the visible number is not enough context for screen
  readers, for example `aria-label="Scarica fattura FT-2025-024"`.
