# QuoteRequestTable

Dashboard editable quote request table.

## When To Use

Use `QuoteRequestTable` for the dashboard `Crea richiesta di preventivo` table
where existing rows and one editable row are shown in a compact table.

Do not use it for:
- read-only quote lists;
- orders lists;
- invoice or billing registry tables;
- supplier activity tables;
- quote business logic, validation, totals or API submission.

## Markup Contract

```html
<section class="quote-request-section">
    <h2 class="quote-request-section__title">Crea richiesta di preventivo</h2>
    <div class="table-wrapper">
        <table class="quote-table">
            <thead>
                <tr>
                    <th class="quote-th-num">#</th>
                    <th>Prodotto</th>
                    <th class="quote-col-hide">Spedito il</th>
                    <th class="quote-th-qty">Qt.</th>
                    <th class="quote-col-hide">Imponibile</th>
                    <th class="quote-col-hide">Iva</th>
                    <th class="quote-col-hide">Imposta</th>
                    <th class="quote-col-hide">Totale</th>
                    <th class="quote-th-action"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="quote-td-num">115124</td>
                    <td>
                        <div class="quote-product-name">Catalogo A4 - 32 pagine</div>
                        <div class="quote-product-meta"><strong>Nome lavoro:</strong> Catalogo Primavera 2026</div>
                        <div class="quote-product-meta"><strong>Referente:</strong> Marco Bianchi</div>
                    </td>
                    <td class="quote-col-hide"></td>
                    <td class="quote-td-qty">500</td>
                    <td class="quote-col-hide td-text-right">-</td>
                    <td class="quote-col-hide td-text-right">-</td>
                    <td class="quote-col-hide td-text-right">-</td>
                    <td class="quote-col-hide td-text-right">-</td>
                    <td class="quote-td-action">
                        <button class="quote-row-btn quote-row-btn--remove" type="button" data-action="remove-quote-row" title="Rimuovi">
                            <span class="quote-row-btn__icon quote-row-btn__icon--remove" aria-hidden="true"></span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button class="quote-submit-btn" type="button" data-action="submit-quote">Invia richiesta</button>
</section>
```

## Backend/App Owns

- Rows, values, ids and input names.
- Add/remove behavior.
- Totals and price calculations.
- Validation and error messages.
- Submit action, API calls and permissions.

## Library Owns

- Table layout, spacing and responsive hiding of `.quote-col-hide`.
- Compact quote inputs and focus states.
- Circular add/remove row buttons.
- CSS-owned add/remove icons.
- Full-width submit button look.

## Accessibility

- Add `type="button"` to non-submit row actions.
- Use `title` or `aria-label` on icon-only add/remove buttons.
- Associate fields with labels when rendering production forms.
