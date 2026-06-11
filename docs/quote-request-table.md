---
title: QuoteRequestTable
description: Tabella editabile "Crea richiesta di preventivo" della dashboard.
layer: components
strategy: css-only
package_path: components/quote-request-table.css
---

# QuoteRequestTable

Tabella della dashboard "Crea richiesta di preventivo": righe esistenti piu' una
riga editabile in tabella compatta. CSS-only: la libreria possiede layout, input
compatti e bottoni add/remove; righe, valori, behavior e submit sono backend/app.

## Markup contract

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
                    <td class="quote-col-hide orders-table__cell--text-right">-</td>
                    <td class="quote-col-hide orders-table__cell--text-right">-</td>
                    <td class="quote-col-hide orders-table__cell--text-right">-</td>
                    <td class="quote-col-hide orders-table__cell--text-right">-</td>
                    <td class="quote-td-action">
                        <button class="quote-row-btn quote-row-btn--remove" type="button" title="Rimuovi">
                            <span class="quote-row-btn__icon quote-row-btn__icon--remove" aria-hidden="true"></span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <button class="quote-submit-btn" type="button">Invia richiesta</button>
</section>
```

## Classi pubbliche

- `.quote-request-section`, `.quote-request-section__title`
- `.quote-table`
- `.quote-th-num`, `.quote-th-qty`, `.quote-th-action`
- `.quote-td-num`, `.quote-td-qty`, `.quote-td-action`
- `.quote-col-hide`
- `.quote-product-name`, `.quote-product-meta`
- `.quote-form-fields`, `.quote-footer-cell`
- `.quote-input` + `--qty|textarea`
- `.quote-row-btn` + `--add|remove`, `.quote-row-btn__icon` + `--add|remove`
- `.quote-submit-btn`

## Data hooks

Nessun `data-*` di libreria: CSS-only. Eventuali `data-orders-table-action`
nel markup demo sono hook applicativi, non API del componente.

## Ownership

- Backend/app: righe, valori, id, input name; add/remove behavior; totali e
  calcoli; validazione ed errori; submit, API e permessi.
- Libreria: layout tabella, responsive hiding di `.quote-col-hide`, input
  compatti e focus, bottoni circolari add/remove, icone CSS, look del submit.

## Accessibilita'

- `type="button"` sulle azioni di riga non-submit.
- `title` o `aria-label` sui bottoni icona-only add/remove.
- Associare i campi alle label nei form di produzione.
