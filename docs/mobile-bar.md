# MobileTotalBar

Barra fixed in basso visibile su mobile/tablet (`<=1023px`). Mostra prezzo totale + CTA carrello in compact + sezione espandibile con dettagli + toggle riepilogo configurazione. Componente CSS-only senza behavior libreria.

- Fonti:
  - `elements-ui/css/components/_layout-patterns.css#L490-L758` (MOBILE BAR section: container fixed, handle, compact, expanded, details, config-toggle, config-content + responsive 374px / 640-1023px).
  - `elements-ui/css/components/_buttons.css#L58-L84` (`.mobile-bar-cart-btn` definito separatamente).
  - `elements-ui/js/layout-patterns/mobile-bar.js` (catalogo elements-ui con sandbox preview interattiva).
- Cartella: `components/` (composto: container fixed > overlay + container > 4 sezioni innestate).
- Strategia JS demo: A — static snapshot. La libreria non aggiunge listener. Toggle (`.expanded`, `.active`, `.visible`) sono wire-up consumer-side.

## Quando usarlo

- Pagina prodotto con configuratore: la barra mobile sostituisce la sidebar desktop (`SidebarTotals`) sotto 1024px.
- Pagine con CTA primaria persistente (carrello, ordine) che deve restare visibile durante lo scroll su mobile.
- Pagine dove serve un riepilogo dettagliato accessibile via "expand handle" senza occupare schermo.

## Quando NON usarlo

- Layout desktop-first: usa `SidebarTotals` desktop.
- Pagine senza CTA persistente: la barra fixed e' invasiva (occupa `~80px` di schermo permanenti).
- Mini summary stile shopping cart drawer: pattern diverso (overlay laterale, non bottom bar).

## Markup base

```html
<div id="mobile-total-bar" class="mobile-total-bar">
    <div id="mobile-bar-overlay" class="mobile-bar-overlay"></div>
    <div class="mobile-bar-container">
        <div id="mobile-bar-handle" class="mobile-bar-handle" role="button" tabindex="0"
             aria-label="Espandi dettagli totale" aria-expanded="false">
            <svg class="handle-arrow" aria-hidden="true">...</svg>
        </div>
        <div class="mobile-bar-compact">
            <div class="mobile-bar-price-section">
                <span class="mobile-bar-label">Totale</span>
                <span id="mobile-total-price" class="mobile-bar-price">-</span>
            </div>
            <button id="mobile-add-cart-btn" class="mobile-bar-cart-btn">Aggiungi al carrello</button>
            <div id="mobileValidationErrors"></div>
        </div>
        <div id="mobile-bar-expanded" class="mobile-bar-expanded">
            <div class="mobile-bar-divider"></div>
            <div class="mobile-bar-details">
                <div class="mobile-detail-row"><span>Quantità</span><span id="mobile-qty">50</span></div>
                <div class="mobile-detail-row"><span>Prezzo unitario</span><span id="mobile-unit-price">-</span></div>
                <div class="mobile-detail-row"><span>Subtotale</span><span id="mobile-subtotal">-</span></div>
                <div class="mobile-detail-row"><span>IVA</span><span id="mobile-iva">-</span></div>
                <div class="mobile-detail-row mobile-detail-shipping">
                    <span>Spedizione</span><span class="text-green-600">Gratuita *</span>
                </div>
            </div>
            <button id="mobile-config-toggle" class="mobile-config-toggle"
                    aria-expanded="false" aria-controls="mobile-config-content">
                <svg aria-hidden="true">...</svg>
                Vedi configurazione
                <svg id="mobile-config-icon" aria-hidden="true">...</svg>
            </button>
            <div id="mobile-config-content" class="mobile-config-content"
                 role="region" aria-label="Riepilogo configurazione"></div>
        </div>
    </div>
</div>
```

## Classi pubbliche

Container fixed:

- `.mobile-total-bar` — root: `display: none` desktop, `display: block` `<=1023px`, `position: fixed; bottom: 0`, `z-index: var(--z-mobile-bar)` (999), `pointer-events: none`.
- `.mobile-bar-overlay` — `display: none` di default. Slot opzionale per overlay scuro (la demo non lo attiva, ma il consumer puo' farlo via override).
- `.mobile-bar-container` — flex column, sfondo bianco, `border-top` + `border-radius: 1rem 1rem 0 0`, box-shadow lift, `padding-bottom: calc(0.625rem + env(safe-area-inset-bottom, 0px))` per iPhone notch, `max-height: 85vh; overflow-y: auto`, `pointer-events: auto`.

Handle (chevron espansione):

- `.mobile-bar-handle` — `order: 0`, flex centrato.
- `.handle-arrow` — colore muted, `1.25rem`. `.mobile-total-bar.expanded .handle-arrow` -> `transform: rotate(180deg)`.

Sezione compatta (sempre visibile):

- `.mobile-bar-compact` — `order: 2`, flex column, gap 0.375rem.
- `.mobile-bar-price-section` — flex space-between.
- `.mobile-bar-label` — 1.125rem semibold primary.
- `.mobile-bar-price` — 1.125rem bold text.
- `.mobile-bar-iva` — 0.6875rem muted (slot opzionale).
- `.mobile-bar-cart-btn` — full width, `--color-secondary-dark`, testo bianco semibold, `padding: 0.8125rem 1rem`, `border-radius: 0.625rem`. `:active { opacity: 0.9 }`.

Sezione espansa:

- `.mobile-bar-expanded` — `order: 1`, `max-height: 0; opacity: 0` di default. Quando `.mobile-total-bar.expanded`: `max-height: 60vh; opacity: 1; padding-bottom: var(--spacing-xl)`. Transizione `var(--transition-section)` per max-height + `var(--transition-slow)` per opacity.
- `.mobile-bar-divider` — `display: none` (placeholder DOM, mai visibile).
- `.mobile-bar-details` — flex column, gap 0.5rem.
- `.mobile-detail-row` — flex space-between, font-size sm. Label muted, value semibold 0.9375rem.
- `.mobile-detail-shipping` — modifier su `.mobile-detail-row`. Value colore success.

Toggle riepilogo:

- `.mobile-config-toggle` — full width, transparent, semibold. Icone `svg` 1rem.
- `#mobile-config-icon` — selettore id-based catalogo. Quando `.mobile-config-toggle.active`: `transform: rotate(180deg)`. Mantiene l'id originale del catalogo.
- `.mobile-config-content` — `max-height: 0; opacity: 0` di default. Quando `.visible`: `max-height: 400px; padding: 1rem` (bottom 6rem), sfondo gray-50, border, `border-radius: var(--radius-lg)`.

Utility classes per il content iniettato dal CMS:

Il backend chiama `generateRiepilogo()` (vedi `product-page-integration/js/riepilogo.js` v3.0.0) e inietta l'HTML risultante dentro `.mobile-config-content`. Le classi prodotte sono:

- `.riepilogo-container` — wrapper flex column gap 0.75rem.
- `.riepilogo-section` — gruppo (Dettagli, Generali, ...): flex column gap 0.25rem.
- `.riepilogo-header` — titolo gruppo bold (`Dettagli`, `1. Generali`, ...).
- `.riepilogo-row` — riga "label: value" con `padding-left: 0.75rem`.
- `.riepilogo-row--indent` — riga indentata `padding-left: 1.5rem`.
- `.riepilogo-error` — valore in rosso (`#ef4444`) per errori (es. "Non valido").
- `.riepilogo-empty` / `.riepilogo-placeholder` / `.riepilogo-muted` — stati vuoti.

Queste classi sono **definite in `components/sidebar-totals.css`** e si applicano automaticamente quando il consumer importa entrambi i CSS. Il bundle `bundles/demo-minimal.css` lo fa di default.

## Stati e modifier

- `.mobile-total-bar.expanded` -> espande la barra (toggle con click sull'handle o sull'overlay).
- `.mobile-config-toggle.active` + `.mobile-config-content.visible` -> espande il riepilogo configurazione dentro la barra (toggle indipendente dal primo).
- ARIA: `aria-expanded` sul `.mobile-bar-handle` e `.mobile-config-toggle` aggiornati dal consumer.

## Responsive

- `<=374px` (small phones): padding ridotto, font-size cart 0.8125rem, label/price 1rem.
- `>=640px <=1023px` (tablet): `max-width: 480px` centrato su `.mobile-bar-compact`, `.mobile-bar-details`, `.mobile-config-toggle`, `.mobile-config-content.visible`. Padding container 0.5rem 1.5rem.
- `>=1024px` (desktop): `display: none`. Usare `SidebarTotals` desktop.

## Cosa decide il CMS / backend

- testi ("Totale", "Aggiungi al carrello", "Vedi configurazione", etc);
- valori formattati di prezzo, qty, subtotale, IVA, spedizione;
- contenuto HTML iniettato in `.mobile-config-content` (uso delle utility `.font-bold`, `.font-semibold`);
- click bottone carrello -> push checkout (business logic);
- presenza/assenza `.mobile-detail-shipping` (rimuovibile se non gratuita);
- gli id del markup sono *opzionali*: utili al consumer per agganciare JS. La libreria stila SOLO `#mobile-config-icon` (rotazione chevron toggle).

## Cosa decide la libreria

- visibility responsive (display none/block sotto/sopra 1024px);
- z-index, pointer-events, safe-area-inset-bottom;
- aspetto handle + rotazione chevron quando expanded;
- aspetto compact (label, price, cart button);
- transizioni `max-height` + `opacity` per espansione;
- aspetto config-toggle + rotazione chevron quando active;
- aspetto config-content quando `.visible`;
- responsive 374px / 640-1023px.

## Fuori scope

- behavior toggle (consumer wire-up `js/interactions/mobile-bar.js`);
- generazione HTML riepilogo configurazione (`generateRiepilogo()` business logic);
- aggiornamento valori (consumer-side con dati prodotto);
- click bottone carrello -> push checkout (`handleAddToCart()` business logic);
- promozione a primitiva `js/disclosure.js` riusabile (no premature abstraction);
- variante `id="mobileValidationErrors"` -> consumer-side errore di validazione promo (CSS della libreria non lo stila).

## Pairing tipico

- `SidebarTotals` (desktop `>=1024px`) + `MobileTotalBar` (mobile `<=1023px`): coppia mutuamente esclusiva via media query, stesso ruolo (riepilogo totale + CTA carrello).
- `Accordion` configuratore: la barra mobile riepiloga lo stato calcolato dal configuratore.
