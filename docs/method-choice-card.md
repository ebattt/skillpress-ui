# MethodChoiceCard

`MethodChoiceCard` renderizza tile selezionabili per metodi checkout:
spedizione e pagamento condividono lo stesso presentation type.

## Fonte

- Shipping: `Skillpress-frontend/checkout/js/sections/shipping-section.js`
- Payment: `Skillpress-frontend/checkout/js/sections/payment-section.js`
- CSS: `checkout/css/components/_shipping.css` e `_payment.css`
- Pagina target: `checkout`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/method-choice-card.css">
```

## Responsabilita

La libreria decide grid, tile, tipografia, hover/focus, selected state e icone
CSS opzionali per payment. Il backend/applicativo decide opzioni, testi, stato
iniziale e cambio selezione.

## Reuse Audit

`OptionButtons` copre scelte testuali compatte del configuratore, ma non il tile
checkout con altezza 68px, detail/price e icona opzionale.

`FormControls` copre radio/checkbox nativi con label inline, non card/tile
centrati.

`Button` e `Card` sono primitive troppo generiche: non documentano il contratto
di gruppo, stato selected e sotto-elementi `name/detail/price/icon`.

## Markup

```html
<div class="method-choice" data-method-choice>
    <p class="method-choice__title" id="shipping-methods-title">Metodo di spedizione</p>
    <div class="method-choice__grid" role="group" aria-labelledby="shipping-methods-title">
        <button class="method-choice-card method-choice-card--selected"
                type="button"
                aria-pressed="true"
                data-method-choice-card>
            <span class="method-choice-card__name">Corriere Italia</span>
            <span class="method-choice-card__detail">GLS/MBE/BRT · 2-3 gg</span>
        </button>
        <button class="method-choice-card"
                type="button"
                aria-pressed="false"
                data-method-choice-card>
            <span class="method-choice-card__name">Ritiro in sede</span>
            <span class="method-choice-card__detail">Dalle 16:30</span>
        </button>
    </div>
</div>
```

## Payment Icon

```html
<button class="method-choice-card" type="button" aria-pressed="false" data-method-choice-card>
    <span class="method-choice-card__icon method-choice-card__icon--card" aria-hidden="true"></span>
    <span class="method-choice-card__name">Carta</span>
    <span class="method-choice-card__detail">Visa, MC, Amex</span>
</button>
```

## Classi

- `.method-choice`
- `.method-choice__title`
- `.method-choice__grid`
- `.method-choice-card`
- `.method-choice-card--selected`
- `.method-choice-card__icon`
- `.method-choice-card__icon--card`
- `.method-choice-card__icon--paypal`
- `.method-choice-card__icon--bank`
- `.method-choice-card__icon--cash`
- `.method-choice-card__icon--store`
- `.method-choice-card__name`
- `.method-choice-card__detail`
- `.method-choice-card__price`

## Attributi

- `[data-method-choice]`: root semantica del gruppo.
- `[data-method-choice-card]`: card cliccabile.
- `aria-pressed="true|false"`: stato accessibile della selezione.

## Fuori Scope

- validazione step;
- calcolo prezzi/spedizione;
- gateway pagamento;
- limiti metodo pagamento;
- multi-destination e allocazione copie.
