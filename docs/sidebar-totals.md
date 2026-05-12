# SidebarTotals

Sidebar configuratore desktop: box totale (qty, miglior prezzo, imposta, spedizione, totale evidenziato), input codice promo, toggle riepilogo configurazione, bottone "Aggiungi al carrello". Componente CSS-only senza behavior libreria.

- Fonte: `Skillpress-frontend/elements-ui/css/components/_layout-patterns.css#L189-L246, L249-L272, L324-L341, L344-L365, L367-L418` + `Skillpress-frontend/elements-ui/css/components/_buttons.css#L29-L55, L261-L285` + `Skillpress-frontend/elements-ui/js/layout-patterns/sidebar-summary.js`.
- Cartella: `components/` (composto: container > box gray-50 con righe + divider + totale + input promo + button + content + cart button).
- Strategia JS demo: A — static snapshot. La libreria non aggiunge listener.

## Quando usarlo

- Pannello laterale di configuratore prodotto con riepilogo economico in tempo reale (caso d'uso primario: Skillpress configuratore product-page).
- Sticky desktop sopra 1024px, automaticamente nascosta sotto (per mobile usare il pattern `MobileTotalBar` -- non ancora coperto).

## Quando NON usarlo

- Sidebar generica dashboard / blog: usa una `Card` neutra. Questo blocco e' specializzato (token `--color-secondary-dark` per CTA carrello, `display: none !important` sotto 1024px).
- Cassa/checkout summary: pattern simile ma diverso (`order-summary-sidebar`), non coperto qui.

## Markup base (snapshot consumer: qty 50, valori `-` come prima dell'avvio configuratore)

```html
<div class="configurator-sidebar">
    <div class="sidebar-total-box">
        <div>
            <h3 class="sidebar-title">Totale</h3>
            <div class="sidebar-rows">
                <div class="sidebar-row">
                    <span class="sidebar-row__label">Quantità</span>
                    <span class="sidebar-row__value">50</span>
                </div>
                <div class="sidebar-row">
                    <span class="sidebar-row__label">Miglior prezzo</span>
                    <span class="sidebar-row__value">-</span>
                </div>
                <div class="sidebar-row">
                    <span class="sidebar-row__label">Imposta</span>
                    <span class="sidebar-row__value">-</span>
                </div>
                <div class="sidebar-row sidebar-row--success">
                    <span class="sidebar-row__label">Spedizione</span>
                    <span class="sidebar-row__value">Gratuita</span>
                </div>
            </div>
            <div class="sidebar-divider"></div>
            <div class="sidebar-total-row">
                <span class="sidebar-total-label">Totale</span>
                <span class="sidebar-total-value">-</span>
            </div>
        </div>
        <div class="promo-section">
            <label for="promo-id">Hai un codice promo?</label>
            <input id="promo-id" type="text" placeholder="Inserisci codice" class="promo-input"/>
        </div>
        <div class="sidebar-totals__section">
            <label>Vuoi visualizzare il riepilogo?</label>
            <button class="sidebar-totals__btn" aria-expanded="false" aria-controls="riepilogo-id">
                <svg aria-hidden="true">...</svg>
                Mostra riepilogo
                <svg aria-hidden="true">...</svg>
            </button>
            <div id="riepilogo-id" class="sidebar-totals__content"></div>
        </div>
        <button class="add-to-cart-btn">
            <svg aria-hidden="true">...</svg>
            Aggiungi al carrello
        </button>
    </div>
</div>
```

## Classi pubbliche

Container/layout:

- `.configurator-section` — wrapper del configuratore, max-width pagina e padding coerenti con `product-page-integration`.
- `.configurator-grid` — griglia responsive `1fr` mobile, `1fr 380px` desktop >=1024px.
- `.config-column` — colonna sinistra configuratore, flex column, spacing verticale `--spacing-lg`.
- `.config-section-title` — titolo "Modalità di configurazione", 1.375rem bold.
- `.configurator-sidebar` — sticky a `top: 250px; margin-top: 100px` >=1024px, `display: none !important` <1024px.
- `.sidebar-total-box` — box `bg-gray-50`, `radius-xl` 0.75rem, padding 1rem, `> * + * { margin-top: 0.75rem }`.

Riepilogo righe totale:

- `.sidebar-title` — h3, font-size lg, bold, letter-spacing -0.025em.
- `.sidebar-rows` — wrapper, font 0.9375rem, `> * + * { margin-top: 0.375rem }`.
- `.sidebar-row` — flex space-between.
- `.sidebar-row__label` — colore `text-secondary`.
- `.sidebar-row__value` — semibold, colore `text`.
- `.sidebar-row--green` — modifier legacy per evidenziare tutta la riga spedizione in verde.
- `.sidebar-row--success` — modifier preferito per evidenziare solo il valore in verde success, usato per `Spedizione: Gratuita`.
- `.sidebar-divider` — linea `1px solid #D1D5DB`, margin 0.75rem 0.

Totale evidenziato:

- `.sidebar-total-row` — flex space-between baseline.
- `.sidebar-total-label` — 1.0625rem bold.
- `.sidebar-total-value` — `font-size-2xl`, bold, colore `--color-primary`.

Promo input:

- `.promo-section` — wrapper. La label figlia diventa primary medium.
- `.promo-input` — bordo grey, radius lg, padding 0.5rem 0.75rem. Focus: shadow primary 0 0 0 2px.

Riepilogo toggle:

- `.sidebar-totals__section` — flex column gap 0.25rem. La label figlia diventa primary medium.
- `.sidebar-totals__btn` — full width, bg teal soft `rgba(28, 114, 100, 0.08)`, color `--color-secondary`, semibold, radius lg. Hover: bg teal piu' denso. Le icone interne `svg` hanno larghezza 1.125rem.
- `.sidebar-totals__content` — `display: none` di default. `max-height: 300px; overflow-y: auto`. `> * + * { margin-top: 0.5rem }`. Il consumer/CMS toglie `display:none` (es. inline `style="display:block"` o classe utility) quando il bottone passa a `aria-expanded="true"`.

Riepilogo utility classes (per il content iniettato dal CMS):

Il backend chiama `generateRiepilogo()` (vedi `product-page-integration/js/riepilogo.js` v3.0.0) e inietta l'HTML risultante dentro `.sidebar-totals__content` (sidebar desktop) o `.mobile-config-content` (mobile bar). Le classi prodotte sono:

- `.sidebar-totals__container` — wrapper flex column, gap 0.75rem.
- `.sidebar-totals__section` — gruppo (Dettagli, Generali, Copertina, ...): flex column gap 0.25rem.
- `.sidebar-totals__header` — titolo gruppo bold, color `#1f2937` (es. `Dettagli`, `1. Generali`, `2. Copertina`).
- `.sidebar-totals__row` — riga "label: value" con `padding-left: 0.75rem`.
- `.sidebar-totals__row--indent` — riga indentata `padding-left: 1.5rem`, color `text-secondary`.
- `.sidebar-totals__error` — valore in rosso (`#ef4444`) per errori (es. "Non valido"), font-weight medium.
- `.sidebar-totals__empty` — stato "Non selezionato": text-align center, color text-light, padding 1rem.
- `.sidebar-totals__placeholder` — placeholder generico ("Configura il prodotto..."): stessa formattazione di `.sidebar-totals__empty`.
- `.sidebar-totals__muted` — color text-light per testo secondario inline.

Alias legacy mantenuti per backward-compat (consumer pre-stepwise 14 li usano):

- `.sidebar-totals__section-header` -> alias di `.sidebar-totals__header`.
- `.sidebar-totals__indent` -> alias di `.sidebar-totals__row--indent`.

I generatori canonici v3.0.0+ usano le forme nuove (doppio dash / nome senza suffisso `-header`).

CTA carrello:

- `.add-to-cart-btn` — full width, bg `--color-secondary-dark`, testo bianco semibold, padding 0.75rem 1rem, `radius-full`, shadow lg. Hover: bg `--color-secondary-light`, shadow xl. Icona interna `svg` 1.125rem.

## Stati e modifier

- `.sidebar-row--success` su `.sidebar-row` per evidenziare il valore "Gratuita" in verde success.
- `.sidebar-row--green` resta supportato come modifier legacy quando serve evidenziare tutta la riga.
- `.sidebar-totals__btn[aria-expanded="true"]` -> il consumer rende visibile `.sidebar-totals__content` (non c'e' un modifier CSS dichiarato in libreria). Nessun lock visivo del button quando aperto: l'unico cambiamento e' la presenza del content.

Per accessibilita' il consumer DEVE:

- mantenere `aria-controls="..."` sul `.sidebar-totals__btn` con il valore dell'`id` di `.sidebar-totals__content`;
- aggiornare `aria-expanded` `false`/`true` su click;
- (opzionale) ruotare l'icona chevron quando aperta.

## Cosa decide il CMS / backend

- testi delle righe (label + value);
- valore `Quantita` (numero), valore `Miglior prezzo`, `Imposta`, `Totale` (formattati);
- presenza/assenza della riga "Spedizione gratuita";
- testo dell'input promo (placeholder + valore corrente) + gestione errore;
- contenuto HTML dentro `.sidebar-totals__content` (uso delle utility classes `.sidebar-totals__row`, `.sidebar-totals__indent`, `.sidebar-totals__section-header`, `.sidebar-totals__empty`);
- testo bottone carrello e cosa succede al click;
- gli `id` HTML mostrati negli esempi della demo (`#totaleQuantita`, `#promoCodeInput`, `#riepilogoToggle`, `#riepilogoContent`, `#riepilogoIcon`, `#addToCartBtn`, `#validationErrors`) sono **opzionali**: la libreria non li impone. Sono utili al consumer per agganciare il proprio JS al markup.

## Cosa decide la libreria

- layout sticky desktop / hidden mobile sotto 1024px;
- spacing verticale tra figli del box (cascade `> * + *`);
- tipografia/colori righe e totale evidenziato;
- focus + radius input promo;
- aspetto bottone riepilogo (teal soft + radius lg + hover);
- aspetto bottone carrello (full width, secondary-dark, radius full, shadow lg);
- container scroll del riepilogo content.

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.sidebar-row-label` | `.sidebar-row__label` |
| `.sidebar-row-value` | `.sidebar-row__value` |
| `.sidebar-totals__content.visible` (compound) | `.sidebar-totals__content.sidebar-totals__content--visible` |
| `.visible` (standalone, su riepilogo-content) | `.sidebar-totals__content--visible` |

Foglie composte (DownloadButtons): vedi `download-buttons.md` (rename `.config-download-btns/-btn`, `.sidebar-download-divider`).

Eccezioni italiane mantenute (block name singoli, non rinominati): `.configurator-sidebar`, `.sidebar-total-box`, `.sidebar-rows`, `.sidebar-row` (+`--green`, `--success`), `.sidebar-divider`, `.sidebar-title`, `.sidebar-total-row`, `.sidebar-total-label`, `.sidebar-total-value`, `.promo-section`, `.promo-input`, `.sidebar-totals__section`, `.sidebar-totals__btn`, `.sidebar-totals__content`, `.sidebar-totals__container`, `.sidebar-totals__header`, `.sidebar-totals__row` (+`--indent`), `.sidebar-totals__error`, `.sidebar-totals__muted`, `.sidebar-totals__placeholder`, `.sidebar-totals__empty`, `.sidebar-totals__indent` (alias legacy), `.sidebar-totals__section-header` (alias legacy), `.add-to-cart-btn`.

## Fuori scope

- behavior toggle riepilogo (consumer-side wire-up);
- aggiornamento valori (business logic configuratore);
- generazione del riepilogo configurazione (HTML iniettato dal CMS);
- validazione promo + errori;
- click bottone carrello;
- variante BEM `.sidebar-box*` del catalogo (non usata dalla demo);
- alias `.sidebar-total-price`;
- `.sidebar-total-iva` (slot CMS-injected, non statico);
- `.product-sidebar` (sticky generica);
- componenti download (`primitives/download-buttons.css`).
