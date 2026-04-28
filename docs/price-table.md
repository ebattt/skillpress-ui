# PriceTable

Tabella prezzi stile Google Flights: header data spedizione, righe quantita, intersezione = prezzo. Componente CSS-only senza behavior libreria.

- Fonte: `elements-ui/css/components/_layout-patterns.css#L918-L1236`, `elements-ui/js/layout-patterns/price-table.js`, `product-page-integration/js/sections/section-6.js#L355-L442`.
- Cartella: `components/` (composto: wrapper > nav arrows + table > thead/tbody con sub-element specializzati).
- Strategia JS demo: A — static snapshot. La libreria non aggiunge listener.

## Quando usarlo

- Configuratore prodotto con scelta combinata `quantita` x `data spedizione` (caso d'uso primario: Skillpress configuratore step 6).
- Qualsiasi UI che richieda matrice di pricing con intersezione attiva selezionabile.

## Quando NON usarlo

- Singolo elenco prezzi (usa `Card` + lista). Una colonna sola = la table e' overkill.
- Tabella generica non-prezzo: questo blocco e' specializzato (token `--color-secondary` per stato selected, `--font-size-xs`).

## Markup base (snapshot consumer)

```html
<div class="price-table-wrapper">
    <!-- freccia su -->
    <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
        <button type="button" class="price-nav-arrow" aria-label="Quantita precedenti">
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 15-6-6-6 6"/>
            </svg>
        </button>
    </div>

    <div class="price-table-section">
        <table class="price-table-full">
            <thead>
                <tr>
                    <th class="price-th price-th--left">Copie</th>
                    <th class="price-th price-th--center price-th--selected">
                        <div class="price-th-day">lunedi</div>
                        <div class="price-th-date price-th-date--light">09/03</div>
                    </th>
                    <th class="price-th price-th--center">
                        <div class="price-th-day">mercoledi</div>
                        <div class="price-th-date">11/03</div>
                    </th>
                    <th class="price-th price-th--center price-th--corner">
                        <div class="price-th-day">lunedi</div>
                        <div class="price-th-date">16/03</div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="price-tr price-tr--active">
                    <td class="price-td price-td--left">
                        <button type="button" class="price-qty-btn price-qty-btn--active">50</button>
                    </td>
                    <td class="price-td price-td--center">
                        <button type="button" class="price-cell-btn price-cell-btn--selected">325,53 euro</button>
                    </td>
                    <td class="price-td price-td--center">
                        <button type="button" class="price-cell-btn price-cell-btn--row-active">239,86 euro</button>
                    </td>
                    <td class="price-td price-td--center">
                        <button type="button" class="price-cell-btn price-cell-btn--row-active">154,20 euro</button>
                    </td>
                </tr>
                <!-- altre .price-tr (qty inattive) con .price-cell-btn--default -->
            </tbody>
        </table>
    </div>

    <!-- freccia giu -->
    <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
        <button type="button" class="price-nav-arrow" aria-label="Quantita successive">
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
| `.price-table-wrapper` | Flex column, contiene frecce verticali e contenitore tabella. |
| `.price-table-section` | Wrapper tabella con `overflow-x: auto`. Sostituisce `id="priceTableContainer"` della demo. |

### Tabella

| Classe | Ruolo |
|---|---|
| `.price-table-full` | `<table>` base. `width: 100%`, `min-width: 500px` (forza scroll su viewport stretti), `font-size: var(--font-size-xs)`, `border-collapse`. |

### Header cells

| Classe | Ruolo |
|---|---|
| `.price-th` | Base header cell: padding, border-bottom, font-weight semibold. |
| `.price-th--left` | Header sinistra (`Copie`): bg gray-100, radius top-left. |
| `.price-th--center` | Header centrale (data): bg gray-100, allineamento centrato. |
| `.price-th--selected` | Colonna selezionata: bg `--color-secondary` (teal), testo bianco. |
| `.price-th--corner` | Ultima colonna: radius top-right. |
| `.price-th-day` | Riga giorno settimana dentro l'header. |
| `.price-th-date` | Riga data dentro l'header (font 10px, colore text-light). |
| `.price-th-date--light` | Date su sfondo `--selected`: colore `rgba(255,255,255,0.8)`. |

### Body rows + cells

| Classe | Ruolo |
|---|---|
| `.price-tr` | Riga base con transizione hover (bg gray-50). |
| `.price-tr--active` | Riga quantita attiva: bg `#e8f5f3` (verde chiaro teal). |
| `.price-td` | Cell base: padding 0.5rem, border-bottom. |
| `.price-td--left` | Cell sinistra qty: testo a sinistra, font-weight medium. |
| `.price-td--center` | Cell centrale prezzo: padding 0.375rem, allineamento centrato. |

### Quantity button

| Classe | Ruolo |
|---|---|
| `.price-qty-btn` | Bottone qty trasparente full-width. |
| `.price-qty-btn--active` | Stato attivo: bold + colore `--color-secondary`. |

### Price cell button

| Classe | Ruolo |
|---|---|
| `.price-cell-btn` | Bottone prezzo base: radius sm, font xs. |
| `.price-cell-btn--default` | Bg bianco, bordo gray-200; hover bordo secondary. |
| `.price-cell-btn--row-active` | Bg `#e8f5f3`, bordo `rgba(28,114,100,0.3)`; hover bordo secondary. |
| `.price-cell-btn--selected` | Bg `--color-secondary`, testo bianco, `--shadow-md`. |

### Navigation arrows

| Classe | Ruolo |
|---|---|
| `.price-nav-arrow` | Bottone verticale (su / giu): trasparente, padding 4px 16px. SVG figlio renderizzato a 28x28 (24x24 sotto 767px). |
| `.price-nav-arrow.disabled` | Stato disabled: opacity 0.25, pointer-events none. |
| `.price-nav-arrow-horizontal` | Overlay assoluto per scroll mobile: 28x28 round button. Va dentro un wrapper `position: relative`. |
| `.price-nav-arrow-horizontal.left` | Posiziona a `left: -6px`. |
| `.price-nav-arrow-horizontal.right` | Posiziona a `right: -6px`. |

## Stati combinati

L'interazione tipica nella demo:

1. il CMS sceglie una colonna data → applica `.price-th--selected` (e `.price-th-date--light` sul `<div class="price-th-date">` interno);
2. il CMS sceglie una riga qty → applica `.price-tr--active` su `<tr>`, `.price-qty-btn--active` su `<button>` qty, `.price-cell-btn--row-active` su tutte le `.price-cell-btn` della riga;
3. all'intersezione (riga active + colonna selected), la `.price-cell-btn` riceve `--selected` (sostituisce `--row-active`).

## Cosa decide il CMS/backend

- numero di righe qty e di colonne data;
- testi: numero qty, giorno settimana, data, prezzo formattato (incluso conversione IVA);
- quale colonna data e' `--selected`;
- quale riga qty e' `--active`;
- quale `.price-cell-btn` e' `--selected`;
- handler click: la libreria non aggiunge listener;
- visibilita' frecce orizzontali mobile (`display: none` quando non serve scroll);
- stato `disabled` delle frecce verticali (primo / ultimo pagina).

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
- variante doppio-underscore `.price-table` / `.price-table__row` / `.price-table__cell` (non referenziata da nessuna pagina demo);
- regola `#priceTableContainer table tbody tr { transition }` legata all'id (duplicato della transition di `.price-tr`).

## Sostituzione Material Symbols

Il catalogo usa `<span class="material-symbols-outlined">keyboard_arrow_up</span>` etc. La libreria non importa Material Symbols. Il consumer/CMS rende le icone con SVG inline, e la regola CSS `.price-nav-arrow svg` gia' applica le dimensioni corrette.

Conversione mantenuta:
- vertical 28px → SVG 28x28; mobile <= 767px → 24x24 (gia' nel media query).
- horizontal 18px → SVG 18x18.
