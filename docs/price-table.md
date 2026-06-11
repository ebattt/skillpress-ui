---
title: PriceTable
description: Tabella prezzi a matrice quantita x data spedizione (stile Google Flights).
layer: components
strategy: css-only
package_path: components/price-table.css
---

# PriceTable

Tabella prezzi a matrice: header con date di consegna, righe quantita,
intersezione = prezzo selezionabile. CSS-only: la libreria non aggiunge listener;
il consumer applica i modifier di stato e gestisce selezione, paginazione qty e
scroll.

## Struttura

`.price-table__wrapper` contiene frecce verticali (`.price-table__nav-arrow`) e
`.price-table__section` (overflow-x auto) con la `<table class="price-table">`.
Il backend dichiara `N` colonne data (range consigliato 1..4): l'ultima `<th>`
riceve `.price-table__header-cell--corner`. Ogni `<tr>` ha `1 + N` celle: una
`.price-table__cell--left` (qty) + `N` `.price-table__cell--center` (prezzo).

## Markup contract

```html
<div class="price-table__wrapper">
    <button type="button" class="price-table__nav-arrow" aria-label="Quantita precedenti"><svg aria-hidden="true">...</svg></button>
    <div class="price-table__section">
        <table class="price-table">
            <thead>
                <tr>
                    <th class="price-table__header-cell price-table__header-cell--left">Copie</th>
                    <th class="price-table__header-cell price-table__header-cell--center price-table__header-cell--selected">
                        <div class="price-table__header-day">lunedi</div>
                        <div class="price-table__header-date price-table__header-date--light">09/03</div>
                    </th>
                    <th class="price-table__header-cell price-table__header-cell--center">
                        <div class="price-table__header-day">mercoledi</div>
                        <div class="price-table__header-date">11/03</div>
                    </th>
                    <th class="price-table__header-cell price-table__header-cell--center price-table__header-cell--corner">
                        <div class="price-table__header-day">lunedi</div>
                        <div class="price-table__header-date">16/03</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="price-table__row price-table__row--active">
                    <td class="price-table__cell price-table__cell--left">
                        <button type="button" class="price-table__qty-btn price-table__qty-btn--active">50</button>
                    </td>
                    <td class="price-table__cell price-table__cell--center">
                        <button type="button" class="price-table__cell-btn price-table__cell-btn--selected">325,53 euro</button>
                    </td>
                    <td class="price-table__cell price-table__cell--center">
                        <button type="button" class="price-table__cell-btn price-table__cell-btn--row-active">239,86 euro</button>
                    </td>
                    <td class="price-table__cell price-table__cell--center">
                        <button type="button" class="price-table__cell-btn price-table__cell-btn--row-active">154,20 euro</button>
                    </td>
                </tr>
                <!-- altre .price-table__row con .price-table__cell-btn--default -->
            </tbody>
        </table>
    </div>
    <button type="button" class="price-table__nav-arrow" aria-label="Quantita successive"><svg aria-hidden="true">...</svg></button>
</div>
```

## Classi pubbliche

Wrapper / contenitore:

- `.price-table__wrapper`, `.price-table__section`, `.price-table__section--scrollable`, `.price-table__scroll-wrap`

Tabella e header:

- `.price-table`
- `.price-table__header-cell` + `--left|center|selected|corner`
- `.price-table__header-day`, `.price-table__header-date`, `.price-table__header-date--light`

Righe e celle:

- `.price-table__row` + `--active`
- `.price-table__cell` + `--left|center`
- `.price-table__qty-btn` + `--active`
- `.price-table__cell-btn` + `--default|row-active|selected`

Frecce:

- `.price-table__nav-arrow` + `--disabled`
- `.price-table__nav-arrow-horizontal` + `--left|--right` (legacy, nascosto dal CSS)

## Stati combinati

1. colonna data selezionata -> `.price-table__header-cell--selected` (+ `.price-table__header-date--light` sul `.price-table__header-date` interno);
2. riga qty selezionata -> `.price-table__row--active` su `<tr>`, `.price-table__qty-btn--active` sul qty button, `.price-table__cell-btn--row-active` sulle celle prezzo della riga;
3. all'intersezione, la `.price-table__cell-btn` riceve `--selected` (sostituisce `--row-active`).

## Data hooks

Nessun `data-*` pubblico. CSS-only.

## Ownership

- Backend/consumer: numero righe/colonne, testi e prezzi formattati, scelta di
  quale colonna/riga/cella e' selezionata, handler click, applicazione di
  `.price-table__section--scrollable` e stato `--disabled` delle frecce.
- Libreria: layout, colori, hover/transizioni, min-width tabella con
  ottimizzazione automatica 1/2/3 colonne via `:has()`, breakpoint mobile
  (767px, 480px), indicatore scroll orizzontale.

## Out of scope

- behavior selezione cella e nav verticale (consumer);
- calcolo prezzo/IVA, paginazione qty;
- la libreria non importa Material Symbols: il consumer rende le frecce con SVG inline.
