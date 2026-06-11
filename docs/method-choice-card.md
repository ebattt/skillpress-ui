---
title: MethodChoiceCard
description: Tile selezionabili per metodi checkout (spedizione e pagamento), con icone CSS opzionali.
layer: components
strategy: css-only
package_path: components/method-choice-card.css
---

# MethodChoiceCard

Tile selezionabili per metodi checkout: spedizione e pagamento condividono lo
stesso pattern. CSS-only: la libreria decide grid, tile, tipografia,
hover/focus, selected state e icone CSS opzionali; il backend decide opzioni,
testi, stato iniziale e cambio selezione.

## Markup contract

```html
<div class="method-choice" data-method-choice-card-method-choice>
    <p class="method-choice__title" id="shipping-methods-title">Metodo di spedizione</p>
    <div class="method-choice__grid" role="group" aria-labelledby="shipping-methods-title">
        <button class="method-choice-card method-choice-card--selected" type="button"
                aria-pressed="true" data-method-choice-card>
            <span class="method-choice-card__name">Corriere Italia</span>
            <span class="method-choice-card__detail">GLS/MBE/BRT · 2-3 gg</span>
        </button>
        <button class="method-choice-card" type="button" aria-pressed="false" data-method-choice-card>
            <span class="method-choice-card__name">Ritiro in sede</span>
            <span class="method-choice-card__detail">Dalle 16:30</span>
        </button>
    </div>
</div>
```

Variante con icona (payment):

```html
<button class="method-choice-card" type="button" aria-pressed="false" data-method-choice-card>
    <span class="method-choice-card__icon method-choice-card__icon--card" aria-hidden="true"></span>
    <span class="method-choice-card__name">Carta</span>
    <span class="method-choice-card__detail">Visa, MC, Amex</span>
</button>
```

## Classi pubbliche

- `.method-choice`, `--flat`
- `.method-choice__title`, `__grid`
- `.method-choice-card`, `--selected`
- `.method-choice-card__icon`, `__icon--{card,paypal,bank,cash,store}`
- `.method-choice-card__name`, `__detail`, `__price`

## Data hooks (consumer)

Hook semantici opzionali, NON letti dalla libreria (componente CSS-only):

- `data-method-choice-card-method-choice`: root del gruppo.
- `data-method-choice-card`: card cliccabile.

## Modifier / stati

- `.method-choice--flat`: rimuove separatore/margine quando il gruppo vive gia'
  in una sezione incorniciata.
- `.method-choice-card--selected` + `aria-pressed="true"`: opzione selezionata.
- `disabled` o `aria-disabled="true"`: opzione non selezionabile.

## Cosa decide il backend

Opzioni, label, detail, price, stato iniziale, toggle al click, validazione step
e sync spedizione/pagamento.

## Fuori scope

Validazione step, calcolo prezzi/spedizione, gateway pagamento, limiti metodo,
multi-destination e allocazione copie.
