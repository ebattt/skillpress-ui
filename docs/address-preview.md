# AddressPreview

`AddressPreview` mostra un indirizzo o profilo fatturazione in formato compatto
dentro la checkout.

## Fonte

- Markup shipping: `Skillpress-frontend/reference-pages/static/checkout/js/sections/shipping-section.js`
- CSS shipping: `Skillpress-frontend/reference-pages/static/checkout/css/components/_shipping.css`
- Markup billing correlato: `Skillpress-frontend/reference-pages/static/checkout/js/sections/payment-section.js`
- Pagina target: `checkout`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/address-preview.css">
```

## Responsabilita

La libreria decide layout compatto, tipografia, spacing, colori e icona location
CSS. Il backend decide contenuto delle righe, ordine, label secondaria opzionale
e stato del select esterno.

## Reuse Audit

`FormPrimitives` copre select, input e label, ma non la preview indirizzo
compatta con icona e righe.

`FormControls`, `OptionButtons` e `ToggleSwitch` coprono controlli di scelta,
non un riepilogo read-only.

`Card` fornisce una superficie generica, ma non il contratto visuale compatto
di indirizzo/fatturazione usato dal checkout.

`CheckoutSummary` e `CartProductCard` sono organismi commerce diversi.

## Markup Minimo

```html
<div class="address-preview" data-address-preview>
    <span class="address-preview__icon" aria-hidden="true"></span>
    <div class="address-preview__lines">
        <p class="address-preview__name">Mario Rossi</p>
        <p>Via Roma 123</p>
        <p>20121 Milano (MI)</p>
        <p>Italia</p>
        <p>+39 02 1234567</p>
        <p>mario.rossi@email.com</p>
    </div>
</div>
```

## Billing

Per un profilo fatturazione usare la stessa root e aggiungere una riga
secondaria quando serve.

```html
<div class="address-preview" data-address-preview>
    <span class="address-preview__icon" aria-hidden="true"></span>
    <div class="address-preview__lines">
        <p class="address-preview__name">Rossi Editore Srl</p>
        <p class="address-preview__secondary">Societa</p>
        <p>CF: 12345678901</p>
        <p>P.IVA: IT12345678901</p>
        <p>Via Manzoni 45, Piano 3</p>
        <p>20121 Milano (MI)</p>
    </div>
</div>
```

## Classi

- `.address-preview`
- `.address-preview--field-follow`
- `.address-preview__icon`
- `.address-preview__lines`
- `.address-preview__name`
- `.address-preview__secondary`

## Attributi

- `[data-address-preview]`: hook semantico opzionale per il backend. Non esiste
  behavior JS di libreria associato.

## Modifier

- `.address-preview--field-follow`: replica il gap reale della demo quando la
  preview segue una dropdown indirizzo/profilo.

## Fuori Scope

- dropdown indirizzi salvati;
- form nuovo indirizzo;
- edit/create/delete;
- validazione;
- multi-destination;
- metodi spedizione/pagamento.
