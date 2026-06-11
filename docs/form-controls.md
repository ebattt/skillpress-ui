---
title: FormControls
description: Primitive CSS-only per radio group, radio/checkbox option e stato disabled.
layer: primitives
strategy: css-only
package_path: primitives/form-controls.css
---

# FormControls

Pattern radio + checkbox riusabili. La famiglia condivide il container
`.sp-radio-group` e l'item `.sp-radio-option`: cambia solo il tipo di `<input>`
interno. `:checked` e `:disabled` sono nativi del browser; la libreria fornisce
solo lo styling (custom radio con pallino animato, accent-color checkbox, stato
spento via `.sp-radio-option--disabled`). CSS-only.

## Classi pubbliche

| Classe | Note |
|---|---|
| `.sp-radio-group` | flex column gap `--spacing-sm`. Layout orizzontale: `style="flex-direction: row; gap: 1rem"` inline. |
| `.sp-radio-option` | label cliccabile (input + testo), cursor pointer |
| `.sp-radio-option-label` | testo opzione, font sm |
| `.sp-radio-option--disabled` | opacity 0.5, cursor not-allowed, pointer-events none |

Input radio custom: `.sp-radio-option input[type="radio"]` (1.25rem, bordo
gray-200, pallino primary animato con `::after` scale 0→1 su `:checked`).
Input checkbox nativo: `.sp-radio-option input[type="checkbox"]` (accent-color
primary).

## Markup contract

Radio group verticale:

```html
<div class="sp-form-field">
    <div class="sp-label-row"><label class="sp-label-text">Tipo rilegatura</label></div>
    <div class="sp-radio-group">
        <label class="sp-radio-option">
            <input type="radio" name="rilegatura" value="brossura" checked>
            <span class="sp-radio-option-label">Brossura fresata PUR</span>
        </label>
        <label class="sp-radio-option">
            <input type="radio" name="rilegatura" value="non-rilegata">
            <span class="sp-radio-option-label">Non rilegata, tagliata</span>
        </label>
    </div>
</div>
```

Layout orizzontale: `<div class="sp-radio-group" style="flex-direction: row; gap: 1rem;">`.
Checkbox: stesso markup con `<input type="checkbox">`.
Disabled: aggiungere `.sp-radio-option--disabled` sull'`<label>` + `disabled` sull'input.

## Cosa decide il CMS / backend

Label, `value`, attributi `name`/`id`/`required`/`checked`/`disabled`, group
binding via `name` shared, presenza di `.sp-radio-option--disabled`, layout
vertical/horizontal e handler `onchange`.

## Cosa decide la libreria

Spacing colonna, styling custom radio, accent color checkbox, font/colore label,
stato disabled.

## Composizione

- Titolo del gruppo: `.sp-form-field > .sp-label-row > .sp-label-text` (FormPrimitives).
- Messaggi inline: `.sp-error-inline` / `.sp-success-inline` (FormPrimitives).
- `.sp-radio-option-label` (14px) e' diverso da `.sp-label-text` (15px): ruoli
  semantici distinti (etichetta opzione vs label gruppo).

## Fuori scope

Radio-card pattern (`.delivery-option*`), variante checkbox "con descrizione",
validation summary block-level, toggle programmatico dello stato.
