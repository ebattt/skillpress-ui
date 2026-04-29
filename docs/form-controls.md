---
title: FormControls
description: Primitive CSS-only per radio group, radio option, checkbox option e stato disabled (radio-option--disabled).
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_form-inputs.css (L491-550, L811-825)
  catalog_radio: elements-ui/js/buttons/radio-group.js
  catalog_checkbox: elements-ui/js/buttons/checkbox-option.js
status: implemented-local
package_path: primitives/form-controls.css
---

# FormControls

Pattern radio + checkbox riusabili. La famiglia condivide il container
`.radio-group` e l'item `.radio-option`: cambia solo il tipo di `<input>` interno.

`:checked` e `:disabled` sono nativi del browser. La libreria fornisce solo
lo styling (custom radio con pallino animato, accent-color checkbox, stato
spento via `.radio-option--disabled`).

## Avvertenza fonte

Questi pattern **non compaiono** nelle pagine demo (`product-page-integration`
usa `form-select` per Si/No anche dove un radio sarebbe ovvio). La fonte
canonica e' SOLO il catalogo `elements-ui` (preview pages
`buttons/radio-group.js` + `buttons/checkbox-option.js`).

Coperti per uso futuro: `checkout` (filtri, opzioni cart), `dashboard`
(form preferenze), eventuali estensioni del configuratore.

## Classi pubbliche

### Container

| Classe | Note |
|---|---|
| `.radio-group` | flex column gap `--spacing-sm`. Per layout orizzontale: `style="flex-direction: row; gap: 1rem"` inline. |

### Item

| Classe | Note |
|---|---|
| `.radio-option` | flex inline label + input + label-text, cursor pointer |
| `.radio-option-label` | testo dell'opzione, font sm |

### Input radio (custom CSS)

| Selettore | Note |
|---|---|
| `.radio-option input[type="radio"]` | 1.25rem, bordo gray-200 2px, radius 50%, sfondo bianco |
| `.radio-option input[type="radio"]::after` | pallino primary 0.625rem, scale(0) di default |
| `.radio-option input[type="radio"]:checked` | bordo primary |
| `.radio-option input[type="radio"]:checked::after` | pallino primary scale(1) |

### Input checkbox (native)

| Selettore | Note |
|---|---|
| `.radio-option input[type="checkbox"]` | 1rem, accent-color primary (browser native styling) |

### Stato disabled

| Classe | Note |
|---|---|
| `.radio-option--disabled` | opacity 0.5, cursor not-allowed, pointer-events none |
| `label.radio-option--disabled` | testo gray-400 |
| `label.radio-option--disabled input[type="radio"]` | opacity 0.5 |

## Markup contract

Radio group verticale:

```html
<div class="form-field">
    <div class="label-row">
        <label class="label-text">Tipo rilegatura</label>
    </div>
    <div class="radio-group">
        <label class="radio-option">
            <input type="radio" name="rilegatura" value="brossura" checked>
            <span class="radio-option-label">Brossura fresata PUR</span>
        </label>
        <label class="radio-option">
            <input type="radio" name="rilegatura" value="non-rilegata">
            <span class="radio-option-label">Non rilegata, tagliata</span>
        </label>
    </div>
</div>
```

Radio group orizzontale (`flex-direction: row` inline):

```html
<div class="radio-group" style="flex-direction: row; gap: 1rem;">
    <label class="radio-option">
        <input type="radio" name="orient" value="vertical" checked>
        <span class="radio-option-label">Verticale</span>
    </label>
    <label class="radio-option">
        <input type="radio" name="orient" value="horizontal">
        <span class="radio-option-label">Orizzontale</span>
    </label>
</div>
```

Gruppo di checkbox (selezione non-esclusiva):

```html
<div class="form-field">
    <div class="label-row">
        <label class="label-text">Opzioni aggiuntive</label>
    </div>
    <div class="radio-group">
        <label class="radio-option">
            <input type="checkbox" checked>
            <span class="radio-option-label">Certificazione FSC</span>
        </label>
        <label class="radio-option">
            <input type="checkbox">
            <span class="radio-option-label">Cellophane singolo</span>
        </label>
    </div>
</div>
```

Opzione disabled (radio o checkbox):

```html
<label class="radio-option radio-option--disabled">
    <input type="radio" name="rileg" value="spirale" disabled>
    <span class="radio-option-label">Spirale metallica (non disponibile)</span>
</label>
```

## Cosa decide il CMS / backend

- contenuti label, valori `value`, attributi `name`/`id`/`required`/`checked`/`disabled`;
- group binding via `name` shared (radio mutualmente esclusivi);
- aggiungere `.radio-option--disabled` sull'`<label>` quando l'opzione non e' disponibile;
- handler `onchange` (lato consumer/applicativo);
- layout vertical / horizontal (style inline o classe consumer).

## Cosa decide la libreria

- spacing colonna (gap `--spacing-sm`);
- styling custom radio (cerchio + pallino animato con scale transition);
- accent color checkbox;
- font/colore label;
- stato disabled (opacity, pointer-events).

## Composizione con altri pattern

- Per il titolo del gruppo, usare `.form-field > .label-row > .label-text`
  da `FormPrimitives`.
- Per messaggi inline sotto il gruppo, usare `.error-inline` / `.success-inline`
  da `FormPrimitives`.
- `.radio-option-label` (14px) e' diverso da `.label-text` (15px): non sono
  intercambiabili, hanno ruoli semantici diversi (label gruppo vs etichetta
  singola opzione).

## Fuori scope

- `.delivery-option*` family (radio-card pattern): iterazione separata. Pattern
  con card cliccabile, prezzo, hover state -- markup e stili distinti.
- Variante checkbox "con descrizione" (`align-items: flex-start` + descrizione
  sotto la label): markup specifico, pattern catalogo, presente come story
  Storybook ma non come modifier libreria (no premature abstraction).
- Validation summary block-level (`.validation-errors`).
- Group binding programmatico: resta nativo HTML via `name` shared.
- Toggle programmatico stato: resta consumer/applicativo.
