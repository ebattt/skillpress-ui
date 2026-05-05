# CheckoutSummary

`CheckoutSummary` renderizza il riepilogo ordine della pagina checkout: lista articoli, totali, CTA di avanzamento e blocchi di supporto.

## Fonte

- Posizione pagina: `Skillpress-frontend/checkout/index.html`
- Markup: `Skillpress-frontend/checkout/js/sections/sidebar-section.js`
- CSS: `Skillpress-frontend/checkout/css/components/_sidebar.css`
- Pagina target: `checkout`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/checkout-summary.css">
```

## Responsabilita

La libreria decide markup BEM, layout interno, spacing, colori, hover/focus, stato disabled della CTA e icona info della nota.

Il backend/CMS decide item, label, importi gia' formattati, CTA `href`/testo, nota, link assistenza, `id` e `data-*` applicativi.

## Reuse Audit

`SidebarTotals` non basta: e' specifico del configuratore prodotto, include promo/riepilogo configurazione e CTA "Aggiungi al carrello", usa root `.configurator-sidebar` e viene nascosto sotto 1024px. Il checkout summary reale e' una card ordine nella sidebar checkout, con lista articoli, subtotale/imposta/spedizione, CTA "Avanti" e note/help.

`MobileTotalBar` non basta: e' una barra fixed mobile del configuratore prodotto, non una sidebar checkout.

## Markup Minimo

```html
<aside class="checkout-summary checkout-summary--sticky" aria-labelledby="checkout-summary-title">
    <div class="checkout-summary__card">
        <div>
            <h3 class="checkout-summary__title" id="checkout-summary-title">Riepilogo ordine</h3>
            <div class="checkout-summary__items">
                <div class="checkout-summary__item">
                    <div class="checkout-summary__item-info">
                        <p class="checkout-summary__item-name">Libri brossura fresata</p>
                        <p class="checkout-summary__item-qty">500 copie</p>
                    </div>
                    <span class="checkout-summary__item-price">919,99 &euro;</span>
                </div>
            </div>
            <hr class="checkout-summary__divider">
            <div class="checkout-summary__totals">
                <div class="checkout-summary__total-row">
                    <span class="checkout-summary__total-label">Subtotale</span>
                    <span class="checkout-summary__total-value">2.219,98 &euro;</span>
                </div>
            </div>
            <hr class="checkout-summary__divider">
            <div class="checkout-summary__grand-total">
                <span class="checkout-summary__grand-label">Totale</span>
                <span class="checkout-summary__grand-value">2.708,38 &euro;</span>
            </div>
        </div>
        <a class="checkout-summary__cta" href="/checkout/spedizione">Avanti</a>
    </div>
    <div class="checkout-summary__note">
        <span class="checkout-summary__note-icon" aria-hidden="true"></span>
        <p class="checkout-summary__note-text">Il caricamento dei file per la stampa sara' disponibile dopo aver completato il pagamento.</p>
    </div>
    <div class="checkout-summary__help">
        <p class="checkout-summary__help-text">Hai bisogno di aiuto?</p>
        <a href="/assistenza" class="checkout-summary__help-link">Contatta l'assistenza</a>
    </div>
</aside>
```

## Classi

- `.checkout-summary`
- `.checkout-summary--sticky`
- `.checkout-summary__card`
- `.checkout-summary__title`
- `.checkout-summary__items`
- `.checkout-summary__item`
- `.checkout-summary__item-info`
- `.checkout-summary__item-name`
- `.checkout-summary__item-qty`
- `.checkout-summary__item-price`
- `.checkout-summary__divider`
- `.checkout-summary__totals`
- `.checkout-summary__total-row`
- `.checkout-summary__total-label`
- `.checkout-summary__total-value`
- `.checkout-summary__grand-total`
- `.checkout-summary__grand-label`
- `.checkout-summary__grand-value`
- `.checkout-summary__cta`
- `.checkout-summary__note`
- `.checkout-summary__note-icon`
- `.checkout-summary__note-text`
- `.checkout-summary__help`
- `.checkout-summary__help-text`
- `.checkout-summary__help-link`

## Stati

- `.checkout-summary--sticky`: sticky desktop/tablet quando il summary vive nella colonna laterale.
- `.checkout-summary__cta:disabled` o `[aria-disabled="true"]`: stato non cliccabile.

## Fuori Scope

- calcolo subtotale, IVA, spedizione e totale;
- coupon, carrello, rimozione prodotti;
- navigazione step checkout;
- API, servlet, sessione o stato pagamento;
- componente `OrderSummary` generico.
