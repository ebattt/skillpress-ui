# PriceTable

Tabella prezzi stile Google Flights: header data spedizione, righe quantita, intersezione = prezzo. Componente CSS-only senza behavior libreria.

- Fonte: `elements-ui/css/components/_layout-patterns.css#L918-L1236`, `elements-ui/js/layout-patterns/price-table.js`, `product-page-integration/js/sections/section-6.js#L355-L442`.
- Cartella: `components/` (composto: wrapper > nav arrows + table > thead/tbody con sub-element specializzati).
- Strategia JS demo: A — static snapshot. La libreria non aggiunge listener.

## Contratto data-driven

Il backend dichiara `N` colonne data (date di consegna). **Range raccomandato: 1..4 colonne** (`deliveryBaseDays = [2, 4, 6, 10]` nella pagina demo = 4 colonne, sconti progressivi 5%/30%/55%/79%). La libreria si adatta automaticamente: la tabella usa `display: table` e distribuisce le colonne via CSS senza modifier specifici per il numero.

| N colonne | Quando | Note |
|---|---|---|
| 1 | una sola opzione consegna | l'unica `<th>` riceve sia (implicitamente) la prima posizione che `.price-table__header-cell--corner` (ultima). |
| 2 | scelta veloce vs scontata | la seconda `<th>` riceve `.price-table__header-cell--corner`. |
| 3 | configurazione intermedia | la terza `<th>` riceve `.price-table__header-cell--corner`. |
| 4 (max racc.) | caso massimo demo | la quarta `<th>` riceve `.price-table__header-cell--corner`. Caso peggiore per il viewport mobile: la libreria gestisce con 3 breakpoint progressivi (640/480/380px) per mantenere tutto visibile senza scroll. |
| 5+ | sconsigliato | la libreria non lo blocca, ma su mobile <=640px il testo dei prezzi diventa illeggibile. |

Ogni riga `<tr>` contiene `1 + N` celle: una `<td class="price-table__cell--left">` (qty button) + `N` celle `<td class="price-table__cell--center">` (price button). Il backend genera esattamente `N` celle prezzo per riga; la libreria non valida la coerenza.

Il consumer/CMS posiziona i modifier `.price-table__header-cell--selected` (colonna selezionata, max 1), `.price-table__row--active` (riga qty selezionata, max 1), `.price-table__cell-btn--selected` (intersezione, max 1), `.price-table__cell-btn--row-active` (celle nella riga attiva ma non l'intersezione) coerentemente con lo stato applicativo.

## Responsive

| Breakpoint | Comportamento |
|---|---|
| `>= 768px` (desktop / tablet) | `min-width: 500px` sulla `<table>`, scroll orizzontale via `.price-table__section { overflow-x: auto }` se la viewport e' piu' stretta del contenuto. Frecce orizzontali (`.price-table__nav-arrow-horizontal`) gestite dal JS consumer (mostrate via `style="display: flex"` solo se serve scrollare). |
| `<= 767px` (mobile) | Le frecce orizzontali diventano sempre `display: flex !important` (regola CSS). Il consumer JS le nasconde via inline `style="display: none"` quando la tabella entra senza scroll. Frecce verticali ridotte a 24x24. |

## Quando usarlo

- Configuratore prodotto con scelta combinata `quantita` x `data spedizione` (caso d'uso primario: Skillpress configuratore step 6).
- Qualsiasi UI che richieda matrice di pricing con intersezione attiva selezionabile.

## Quando NON usarlo

- Singolo elenco prezzi (usa `Card` + lista). Una colonna sola = la table e' overkill.
- Tabella generica non-prezzo: questo blocco e' specializzato (token `--color-secondary` per stato selected, `--font-size-xs`).

## Markup base (snapshot consumer)

```html
<div class="price-table__wrapper">
    <!-- freccia su -->
    <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
        <button type="button" class="price-table__nav-arrow" aria-label="Quantita precedenti">
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
            </svg>
        </button>
    </div>

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
                <!-- altre .price-table__row (qty inattive) con .price-table__cell-btn--default -->
            </tbody>
        </table>
    </div>

    <!-- freccia giu -->
    <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
        <button type="button" class="price-table__nav-arrow" aria-label="Quantita successive">
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
            </svg>
        </button>
    </div>
</div>
```

## Classi pubbliche

### Wrapper / contenitore

| Classe | Ruolo |
|---|---|
| `.price-table__wrapper` | Flex column, contiene frecce verticali e contenitore tabella. |
| `.price-table__section` | Wrapper tabella con `overflow-x: auto`. Sostituisce `id="priceTableContainer"` della demo. |

### Tabella

| Classe | Ruolo |
|---|---|
| `.price-table` | `<table>` base. `width: 100%`, `min-width: 500px` (forza scroll orizzontale su viewport stretti), `font-size: var(--font-size-xs)`, `border-collapse`. |

### Header cells

| Classe | Ruolo |
|---|---|
| `.price-table__header-cell` | Base header cell: padding, border-bottom, font-weight semibold. |
| `.price-table__header-cell--left` | Header sinistra (`Copie`): bg gray-100, radius top-left. |
| `.price-table__header-cell--center` | Header centrale (data): bg gray-100, allineamento centrato. |
| `.price-table__header-cell--selected` | Colonna selezionata: bg `--color-secondary` (teal), testo bianco. |
| `.price-table__header-cell--corner` | Ultima colonna: radius top-right. |
| `.price-table__header-day` | Riga giorno settimana dentro l'header. |
| `.price-table__header-date` | Riga data dentro l'header (font 10px, colore text-light). |
| `.price-table__header-date--light` | Date su sfondo `--selected`: colore `rgba(255,255,255,0.8)`. |

### Body rows + cells

| Classe | Ruolo |
|---|---|
| `.price-table__row` | Riga base con transizione hover (bg gray-50). |
| `.price-table__row--active` | Riga quantita attiva: bg `#e8f5f3` (verde chiaro teal). |
| `.price-table__cell` | Cell base: padding 0.5rem, border-bottom. |
| `.price-table__cell--left` | Cell sinistra qty: testo a sinistra, font-weight medium. |
| `.price-table__cell--center` | Cell centrale prezzo: padding 0.375rem, allineamento centrato. |

### Quantity button

| Classe | Ruolo |
|---|---|
| `.price-table__qty-btn` | Bottone qty trasparente full-width. |
| `.price-table__qty-btn--active` | Stato attivo: bold + colore `--color-secondary`. |

### Price cell button

| Classe | Ruolo |
|---|---|
| `.price-table__cell-btn` | Bottone prezzo base: radius sm, font xs. |
| `.price-table__cell-btn--default` | Bg bianco, bordo gray-200; hover bordo secondary. |
| `.price-table__cell-btn--row-active` | Bg `#e8f5f3`, bordo `rgba(28,114,100,0.3)`; hover bordo secondary. |
| `.price-table__cell-btn--selected` | Bg `--color-secondary`, testo bianco, `--shadow-md`. |

### Navigation arrows

| Classe | Ruolo |
|---|---|
| `.price-table__nav-arrow` | Bottone verticale (su / giu): trasparente, padding 4px 16px. SVG figlio renderizzato a 28x28 (24x24 sotto 767px). |
| `.price-table__nav-arrow--disabled` | Stato disabled: opacity 0.25, pointer-events none. |
| `.price-table__nav-arrow-horizontal` | Overlay assoluto per scroll mobile: 28x28 round button. Va dentro un wrapper `position: relative`. |
| `.price-table__nav-arrow-horizontal--left` | Posiziona a `left: -6px`. |
| `.price-table__nav-arrow-horizontal--right` | Posiziona a `right: -6px`. |

## Stati combinati

L'interazione tipica nella demo:

1. il CMS sceglie una colonna data → applica `.price-table__header-cell--selected` (e `.price-table__header-date--light` sul `<div class="price-table__header-date">` interno);
2. il CMS sceglie una riga qty → applica `.price-table__row--active` su `<tr>`, `.price-table__qty-btn--active` su `<button>` qty, `.price-table__cell-btn--row-active` su tutte le `.price-table__cell-btn` della riga;
3. all'intersezione (riga active + colonna selected), la `.price-table__cell-btn` riceve `--selected` (sostituisce `--row-active`).

## Cosa decide il CMS/backend

- numero di righe qty e di colonne data;
- testi: numero qty, giorno settimana, data, prezzo formattato (incluso conversione IVA);
- quale colonna data e' `--selected`;
- quale riga qty e' `--active`;
- quale `.price-table__cell-btn` e' `--selected`;
- handler click: la libreria non aggiunge listener;
- visibilita' frecce orizzontali mobile (`display: none` quando non serve scroll);
- stato `--disabled` delle frecce verticali (primo / ultimo pagina).

## Cosa decide la libreria

- 24 classi pubbliche + relative regole layout/colore/hover/transizione;
- min-width tabella 500px;
- breakpoint mobile 767px (icone vert da 28px a 24px, freccia orizzontale `display: flex` forzato);
- token CSS riferiti (color, radius, spacing, font, transition, shadow).

## Fuori scope

- behavior selezione cella + nav verticale + scroll orizzontale mobile (vive in `section-6.js`);
- calcolo prezzo IVA (`displayPrice = price.value * ivaRate`);
- paginazione qty (`vStart`, `vCount`), ricerca `closestDisplayedQty`;
- animazione `@keyframes cellSelect` (esiste in catalogo ma usata solo da JS feedback);
- variante doppio-underscore legacy `.price-table` / `.price-table__row` / `.price-table__cell` (non referenziata da nessuna pagina demo);
- regola `#priceTableContainer table tbody tr { transition }` legata all'id (duplicato della transition di `.price-table__row`).

## Sostituzione Material Symbols

Il catalogo usa `<span class="material-symbols-outlined">keyboard_arrow_up</span>` etc. La libreria non importa Material Symbols. Il consumer/CMS rende le icone con SVG inline, e la regola CSS `.price-table__nav-arrow svg` gia' applica le dimensioni corrette.

Conversione mantenuta:
- vertical 28px → SVG 28x28; mobile <= 767px → 24x24 (gia' nel media query).
- horizontal 18px → SVG 18x18.
