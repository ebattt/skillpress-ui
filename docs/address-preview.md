---
title: AddressPreview
description: Riepilogo compatto read-only di indirizzo o profilo fatturazione per la checkout.
layer: components
strategy: css-only
package_path: components/address-preview.css
---

# AddressPreview

Mostra un indirizzo o un profilo fatturazione in formato compatto con icona location. La libreria decide layout, tipografia, spacing, colori e icona CSS; il backend decide contenuto delle righe, ordine e label secondaria opzionale. Componente CSS-only, nessun behavior JS.

## Markup contract

```html
<div class="address-preview" data-address-preview>
    <span class="address-preview__icon" aria-hidden="true"></span>
    <div class="address-preview__lines">
        <p class="address-preview__name">Mario Rossi</p>
        <p>Via Roma 123</p>
        <p>20121 Milano (MI)</p>
    </div>
</div>
```

Per un profilo fatturazione usare la stessa root e aggiungere `.address-preview__secondary` per la riga secondaria quando serve.

## Classi pubbliche

- `.address-preview`
- `.address-preview--field-follow`: gap quando la preview segue una dropdown indirizzo/profilo.
- `.address-preview__icon`
- `.address-preview__lines`
- `.address-preview__name`
- `.address-preview__secondary`

## Data hooks

- `[data-address-preview]`: hook semantico opzionale per il backend. Nessun behavior JS associato.

## Out of scope

- dropdown indirizzi salvati, form nuovo/edit indirizzo, validazione;
- multi-destination;
- metodi spedizione/pagamento.
