---
title: BillingTable
description: Tabella anagrafiche di fatturazione dashboard con colonne preferenze compatte.
layer: components
strategy: css-only
package_path: components/billing-table.css
---

# BillingTable

Tabella delle anagrafiche di fatturazione dashboard: colonne preferenze compatte, indirizzo mobile sotto al nome e azioni edit/download. CSS-only. La libreria possiede spacing, bordi, hover, presentazione mobile e icone chrome CSS; il backend possiede righe, valori, stato preferenze e attributi azione.

## Markup contract

```html
<div class="table-wrapper table-wrapper--scroll">
    <table class="billing-table">
        <thead>
            <tr>
                <th>Nome</th>
                <th class="th-mobile-hide">P.I.V.A.</th>
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
                <td class="font-semibold orders-table__cell--nowrap">
                    Giacomo Battiston
                    <span class="billing-table__mobile-address">Viale Trieste 54, Fossalta di Portogruaro (VE)</span>
                </td>
                <td class="orders-table__cell--mobile-hide">-</td>
                <td class="orders-table__cell--text-center billing-table__pref-col">
                    <span class="billing-table__icon billing-table__icon--check" aria-label="Preferito"></span>
                </td>
                <td class="orders-table__cell--text-center billing-table__pref-col">
                    <span class="billing-table__icon billing-table__icon--check" aria-label="Preferito"></span>
                </td>
                <td class="orders-table__cell--text-center">
                    <button class="dashboard-link--download" type="button" data-orders-table-action="edit-billing" title="Modifica">
                        <span class="dashboard-link--download__icon dashboard-link--download__icon--edit" aria-hidden="true"></span>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

## Classi pubbliche

- `.billing-table`
- `.billing-table__pref-col`: colonna preferenze compatta.
- `.billing-table__mobile-address`: indirizzo mostrato sotto al nome su mobile.
- `.billing-table__icon` con `--receipt`, `--shipping`, `--check`.

Si compone con `.table-wrapper` e gli helper cella `orders-table__cell--*`; l'azione edit usa `.dashboard-link--download`.

## Accessibilità

- Usare `title` o `aria-label` sui button azione icon-only.
- Usare `aria-label="Preferito"` sulle icone check quando significative.
- `data-orders-table-action` è un hook applicativo (demo/app), non API della libreria.
