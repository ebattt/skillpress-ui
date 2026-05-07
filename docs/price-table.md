# PriceTable

Tabella prezzi stile Google Flights: header data spedizione, righe quantita, intersezione = prezzo. Componente CSS-only senza behavior libreria.

> Aggiornato 2026-05-05: responsive production pass. La tabella usa scrollbar orizzontale nativa visibile quando il contenuto eccede il contenitore; le vecchie frecce orizzontali overlay sono legacy e nascoste dal CSS.

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
| 4 | caso massimo demo | la quarta `<th>` riceve `.price-table__header-cell--corner`. Se il contenitore e' stretto, la tabella mantiene una larghezza minima leggibile e mostra scrollbar orizzontale. |
| 5+ | supportato con cautela | la libreria non lo blocca; su mobile viene gestito tramite scrollbar orizzontale. Valutare se troppe date rendono il confronto poco chiaro. |

Ogni riga `<tr>` contiene `1 + N` celle: una `<td class="price-table__cell--left">` (qty button) + `N` celle `<td class="price-table__cell--center">` (price button). Il backend genera esattamente `N` celle prezzo per riga; la libreria non valida la coerenza.

Il consumer/CMS posiziona i modifier `.price-table__header-cell--selected` (colonna selezionata, max 1), `.price-table__row--active` (riga qty selezionata, max 1), `.price-table__cell-btn--selected` (intersezione, max 1), `.price-table__cell-btn--row-active` (celle nella riga attiva ma non l'intersezione) coerentemente con lo stato applicativo.

## Responsive

| Breakpoint | Comportamento |
|---|---|
| Browser senza `:has()` | fallback leggibile: `min-width: 500px`, scrollbar orizzontale quando serve via `.price-table__section { overflow-x: auto }`. |
| Browser con `:has()` | min-width ottimizzata in base alle colonne data: 1 colonna `min(100%, 18rem)`, 2 colonne `min(100%, 24rem)`, 3 colonne `28rem`, 4+ colonne fallback `500px`. |
| `<= 767px` (mobile) | Scrollbar orizzontale nativa visibile quando la tabella eccede il contenitore; frecce verticali ridotte a 24x24; touch target celle prezzo/qty almeno 40px. |
| `<= 480px` (small mobile) | padding e font leggermente ridotti per aumentare la densita senza sacrificare leggibilita. |

## Quando usarlo

- Configuratore prodotto con scelta combinata `quantita` x `data spedizione` (caso d'uso primario: Skillpress configuratore step 6).
- Qualsiasi UI che richieda matrice di pricing con intersezione attiva selezionabile.

## Quando NON usarlo

- Singolo elenco prezzi senza asse quantita x consegna (usa `Card` + lista). Una sola colonna data e' supportata quando la scelta resta comunque una matrice quantita/prezzo.
- Tabella generica non-prezzo: questo blocco e' specializzato (token `--color-secondary` per stato selected, `--font-size-xs`).

## Markup contract

Snapshot consumer base della tabella prezzi.

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
| `.price-table__section` | Wrapper tabella con `overflow-x: auto`, quindi scrollbar orizzontale quando il contenuto eccede il contenitore. Sostituisce `id="priceTableContainer"` della demo. |
| `.price-table__section--scrollable` | Modifier applicato dal consumer quando `scrollWidth > clientWidth`. Nasconde la scrollbar nativa e disegna una barra orizzontale custom sempre visibile, evitando doppioni sui sistemi con scrollbar overlay. |

### Tabella

| Classe | Ruolo |
|---|---|
| `.price-table` | `<table>` base. `width: 100%`, fallback `min-width: 500px`, `table-layout: fixed`, `font-size: var(--font-size-xs)`, `border-collapse`. Nei browser moderni la min-width si riduce automaticamente per 1/2/3 colonne. |

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
| `.price-table__nav-arrow-horizontal` | Legacy overlay per vecchio markup di scroll laterale. Il CSS corrente lo nasconde con `display: none !important`; usare scrollbar nativa. |
| `.price-table__nav-arrow-horizontal--left` | Legacy. |
| `.price-table__nav-arrow-horizontal--right` | Legacy. |

## Stati combinati

L'interazione tipica nella demo:

1. il CMS sceglie una colonna data → applica `.price-table__header-cell--selected` (e `.price-table__header-date--light` sul `<div class="price-table__header-date">` interno);
2. il CMS sceglie una riga qty → applica `.price-table__row--active` su `<tr>`, `.price-table__qty-btn--active` su `<button>` qty, `.price-table__cell-btn--row-active` su tutte le `.price-table__cell-btn` della riga;
3. all'intersezione (riga active + colonna selected), la `.price-table__cell-btn` riceve `--selected` (sostituisce `--row-active`).

## Data hooks

Nessun `data-*` pubblico. Il componente e' CSS-only; eventuali hook per
selezione prezzo, tracking o analytics restano consumer/backend.

## Modifier / stati

- `.price-table__header-cell--selected`: colonna data selezionata.
- `.price-table__header-date--light`: data leggibile su header selezionato.
- `.price-table__row--active`: riga quantita selezionata.
- `.price-table__qty-btn--active`: bottone quantita attivo.
- `.price-table__cell-btn--row-active`: prezzo nella riga attiva, ma non
  intersezione selezionata.
- `.price-table__cell-btn--selected`: cella prezzo selezionata.
- `.price-table__section--scrollable`: indicatore scroll orizzontale custom.
- `.price-table__nav-arrow--disabled`: freccia verticale disabilitata.

## Backend owns

- numero di righe qty e di colonne data;
- testi: numero qty, giorno settimana, data, prezzo formattato (incluso conversione IVA);
- quale colonna data e' `--selected`;
- quale riga qty e' `--active`;
- quale `.price-table__cell-btn` e' `--selected`;
- handler click: la libreria non aggiunge listener;
- applicazione di `.price-table__section--scrollable` quando il container e' realmente scrollabile;
- aggiornamento di `--price-table-scroll-thumb-width` e `--price-table-scroll-thumb-left` durante scroll/resize;
- stato `--disabled` delle frecce verticali (primo / ultimo pagina).

## Library owns

- 24 classi pubbliche + relative regole layout/colore/hover/transizione;
- min-width tabella e ottimizzazione automatica 1/2/3 colonne con `:has()`;
- indicatore orizzontale stabile `.price-table__section--scrollable` quando serve; la scrollbar nativa viene nascosta in quello stato per evitare doppioni;
- breakpoint mobile 767px (icone verticali da 28px a 24px, touch target 40px) e 480px (densita extra);
- token CSS riferiti (color, radius, spacing, font, transition, shadow).

## Demo-only

- Fixture prezzi/date della product page e calcolo sconti demo.
- Script demo che aggiorna selezione, paginazione quantita e thumb scroll.
- Markup legacy delle frecce orizzontali overlay, mantenuto solo per
  retrocompatibilita' visuale e nascosto dal CSS corrente.

## Out of scope

- behavior selezione cella + nav verticale (vive in `section-6.js` o consumer equivalente);
- calcolo prezzo IVA (`displayPrice = price.value * ivaRate`);
- paginazione qty (`vStart`, `vCount`), ricerca `closestDisplayedQty`;
- animazione `@keyframes cellSelect` (esiste in catalogo ma usata solo da JS feedback);
- variante doppio-underscore legacy `.price-table` / `.price-table__row` / `.price-table__cell` (non referenziata da nessuna pagina demo);
- regola `#priceTableContainer table tbody tr { transition }` legata all'id (duplicato della transition di `.price-table__row`).

## Mappatura nomi (demo product-page -> libreria)

La demo originale usava prefissi non-BEM (`.price-th`, `.price-td`, `.price-tr`, `.price-cell-btn`, ecc.) con modifier come classi separate (`.disabled`, `.left`, `.right`). La libreria post-prompt-19 usa BEM strict.

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.price-table-full` | `.price-table` |
| `.price-table-wrapper` | `.price-table__wrapper` |
| `.price-table-scroll-wrap` | `.price-table__scroll-wrap` |
| `.price-table-section` | `.price-table__section` |
| `.price-th` | `.price-table__header-cell` |
| `.price-th--left` | `.price-table__header-cell--left` |
| `.price-th--center` | `.price-table__header-cell--center` |
| `.price-th--selected` | `.price-table__header-cell--selected` |
| `.price-th--corner` | `.price-table__header-cell--corner` |
| `.price-th-day` | `.price-table__header-day` |
| `.price-th-date` | `.price-table__header-date` |
| `.price-th-date--light` | `.price-table__header-date--light` |
| `.price-tr` | `.price-table__row` |
| `.price-tr--active` | `.price-table__row--active` |
| `.price-td` | `.price-table__cell` |
| `.price-td--left` | `.price-table__cell--left` |
| `.price-td--center` | `.price-table__cell--center` |
| `.price-qty-btn` | `.price-table__qty-btn` |
| `.price-qty-btn--active` | `.price-table__qty-btn--active` |
| `.price-cell-btn` | `.price-table__cell-btn` |
| `.price-cell-btn--default` | `.price-table__cell-btn--default` |
| `.price-cell-btn--row-active` | `.price-table__cell-btn--row-active` |
| `.price-cell-btn--selected` | `.price-table__cell-btn--selected` |
| `.price-nav-arrow` | `.price-table__nav-arrow` |
| `.price-nav-arrow.disabled` (compound) | `.price-table__nav-arrow--disabled` |
| `.price-nav-arrow-horizontal` | `.price-table__nav-arrow-horizontal` |
| `.price-nav-arrow-horizontal.left` (compound) | `.price-table__nav-arrow-horizontal--left` |
| `.price-nav-arrow-horizontal.right` (compound) | `.price-table__nav-arrow-horizontal--right` |

La interaction `js/interactions/price-table.js` (~25 selettori) e' stata aggiornata coerentemente in Wave 1.

## Sostituzione Material Symbols

Il catalogo usa `<span class="material-symbols-outlined">keyboard_arrow_up</span>` etc. La libreria non importa Material Symbols. Il consumer/CMS rende le icone con SVG inline, e la regola CSS `.price-table__nav-arrow svg` gia' applica le dimensioni corrette.

Conversione mantenuta:
- vertical 28px → SVG 28x28; mobile <= 767px → 24x24 (gia' nel media query).
- horizontal 18px → SVG 18x18 solo per markup legacy; la classe e' nascosta dal CSS corrente.
