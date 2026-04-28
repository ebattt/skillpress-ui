# SidebarTotals

Sidebar configuratore desktop: box totale (qty, miglior prezzo, imposta, spedizione, totale evidenziato), input codice promo, toggle riepilogo configurazione, bottone "Aggiungi al carrello". Componente CSS-only senza behavior libreria.

- Fonte: `elements-ui/css/components/_layout-patterns.css#L189-L246, L249-L272, L324-L341, L344-L365, L367-L418` + `elements-ui/css/components/_buttons.css#L29-L55, L261-L285` + `elements-ui/js/layout-patterns/sidebar-summary.js`.
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
                    <span class="sidebar-row-label">Quantità</span>
                    <span class="sidebar-row-value">50</span>
                </div>
                <div class="sidebar-row">
                    <span class="sidebar-row-label">Miglior prezzo</span>
                    <span class="sidebar-row-value">-</span>
                </div>
                <div class="sidebar-row">
                    <span class="sidebar-row-label">Imposta</span>
                    <span class="sidebar-row-value">-</span>
                </div>
                <div class="sidebar-row sidebar-row--green">
                    <span class="sidebar-row-label">Spedizione gratuita *</span>
                    <span class="sidebar-row-value">-</span>
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
        <div class="riepilogo-section">
            <label>Vuoi visualizzare il riepilogo?</label>
            <button class="riepilogo-btn" aria-expanded="false" aria-controls="riepilogo-id">
                <svg aria-hidden="true">...</svg>
                Mostra riepilogo
                <svg aria-hidden="true">...</svg>
            </button>
            <div id="riepilogo-id" class="riepilogo-content"></div>
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

- `.configurator-sidebar` — sticky a `top: 250px; margin-top: 100px` >=1024px, `display: none !important` <1024px.
- `.sidebar-total-box` — box `bg-gray-50`, `radius-xl` 0.75rem, padding 1rem, `> * + * { margin-top: 0.75rem }`.

Riepilogo righe totale:

- `.sidebar-title` — h3, font-size lg, bold, letter-spacing -0.025em.
- `.sidebar-rows` — wrapper, font 0.9375rem, `> * + * { margin-top: 0.375rem }`.
- `.sidebar-row` — flex space-between.
- `.sidebar-row-label` — colore `text-secondary`.
- `.sidebar-row-value` — semibold, colore `text`.
- `.sidebar-row--green` — modifier per la riga "spedizione gratuita" (override colore `#16A34A` su row, label, value; label diventa medium).
- `.sidebar-divider` — linea `1px solid #D1D5DB`, margin 0.75rem 0.

Totale evidenziato:

- `.sidebar-total-row` — flex space-between baseline.
- `.sidebar-total-label` — 1.0625rem bold.
- `.sidebar-total-value` — `font-size-2xl`, bold, colore `--color-primary`.

Promo input:

- `.promo-section` — wrapper. La label figlia diventa primary medium.
- `.promo-input` — bordo grey, radius lg, padding 0.5rem 0.75rem. Focus: shadow primary 0 0 0 2px.

Riepilogo toggle:

- `.riepilogo-section` — flex column gap 0.25rem. La label figlia diventa primary medium.
- `.riepilogo-btn` — full width, bg teal soft `rgba(28, 114, 100, 0.08)`, color `--color-secondary`, semibold, radius lg. Hover: bg teal piu' denso. Le icone interne `svg` hanno larghezza 1.125rem.
- `.riepilogo-content` — `display: none` di default. `max-height: 300px; overflow-y: auto`. `> * + * { margin-top: 0.5rem }`. Il consumer/CMS toglie `display:none` (es. inline `style="display:block"` o classe utility) quando il bottone passa a `aria-expanded="true"`.

Riepilogo utility classes (per il content iniettato dal CMS):

- `.riepilogo-row` — `padding-left: 0.75rem`.
- `.riepilogo-indent` — `padding-left: 1.5rem`, color `text-secondary`.
- `.riepilogo-section-header` — bold, color `#1f2937`.
- `.riepilogo-empty` — text-align center, color `text-light`, padding 1rem.

CTA carrello:

- `.add-to-cart-btn` — full width, bg `--color-secondary-dark`, testo bianco semibold, padding 0.75rem 1rem, `radius-full`, shadow lg. Hover: bg `--color-secondary-light`, shadow xl. Icona interna `svg` 1.125rem.

## Stati e modifier

- `.sidebar-row--green` su `.sidebar-row` per evidenziare la riga "spedizione gratuita" (verde success).
- `.riepilogo-btn[aria-expanded="true"]` -> il consumer rende visibile `.riepilogo-content` (non c'e' un modifier CSS dichiarato in libreria). Nessun lock visivo del button quando aperto: l'unico cambiamento e' la presenza del content.

Per accessibilita' il consumer DEVE:

- mantenere `aria-controls="..."` sul `.riepilogo-btn` con il valore dell'`id` di `.riepilogo-content`;
- aggiornare `aria-expanded` `false`/`true` su click;
- (opzionale) ruotare l'icona chevron quando aperta.

## Cosa decide il CMS / backend

- testi delle righe (label + value);
- valore `Quantita` (numero), valore `Miglior prezzo`, `Imposta`, `Totale` (formattati);
- presenza/assenza della riga "Spedizione gratuita";
- testo dell'input promo (placeholder + valore corrente) + gestione errore;
- contenuto HTML dentro `.riepilogo-content` (uso delle utility classes `.riepilogo-row`, `.riepilogo-indent`, `.riepilogo-section-header`, `.riepilogo-empty`);
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
