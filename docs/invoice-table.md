---
title: InvoiceTable
description: Tabella fatture/DDT della dashboard billing con download inline per riga.
layer: components
strategy: css-only
package_path: components/invoice-table.css
---

# InvoiceTable

Tabella per la sezione `Fatture` della dashboard billing: ogni riga contiene
numero fattura, DDT, data e totale, con azioni di download inline. La libreria
decide spacing, bordi, tipografia, hover e lo styling dei link download (icona
CSS). Il backend decide righe, valori, URL download, filtri e paginazione.
CSS-only.

## Markup contract

```html
<section class="invoice-table-section" id="billing-fatture-section">
    <h2 class="invoice-table-section__title">Fatture</h2>
    <div class="invoice-table-section__filters" aria-label="Filtri fatture">
        <select class="orders-filter-select" data-search-filter-bar-filter="invoice-status">
            <option>Tutte le fatture</option>
        </select>
        <select class="orders-filter-select" data-search-filter-bar-filter="invoice-year">
            <option>2025</option>
        </select>
    </div>
    <div class="table-wrapper">
        <table class="invoice-table">
            <thead>
                <tr><th>Fattura</th><th>DDT</th><th>Data</th><th>Totale</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <button class="dashboard-link--download" type="button">
                            <span class="font-semibold">FT-2025-024</span>
                            <span class="dashboard-link--download__icon dashboard-link--download__icon--download" aria-hidden="true"></span>
                        </button>
                    </td>
                    <td>...</td>
                    <td>10/09/25</td>
                    <td class="font-semibold">&euro; 98,42</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>
```

## Classi pubbliche

- `.invoice-table-section`, `__title`, `__filters`
- `.table-wrapper`, `.invoice-table`
- `.dashboard-link--download`, `__icon`, `__icon--download` (definite in
  `invoice-table.css`)

`.orders-filter-select` e' definita in `components/search-filter-bar.css`; la
paginazione e' coperta da `TablePagination` (`components/table-pagination.css`)
e va tenuta fuori da `InvoiceTable`.

## Accessibilita

- Usare `<a>` quando l'azione e' una URL documento diretta.
- Usare `<button type="button">` quando l'app apre/genera il download.
- Aggiungere `aria-label` quando il numero visibile non basta come contesto,
  es. `aria-label="Scarica fattura FT-2025-024"`.

## Fuori scope

Righe e valori fattura, URL/handler download, filtri, stato paginazione,
disponibilita' PDF e permessi.
