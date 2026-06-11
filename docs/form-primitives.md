---
title: FormPrimitives
description: Primitive CSS-only per form-field, label, input testo/numero, select, messaggi inline e griglie helper.
layer: primitives
strategy: css-only
package_path: primitives/form-primitives.css
---

# FormPrimitives

Set di primitive form: contenitore `.sp-form-field`, label (con varianti
`required`/`optional`/`hint`/`info-btn`), input testo/numero (`.sp-form-input`),
select nativo con freccia SVG embedded (`.sp-form-select`), messaggi inline e
alcune griglie helper specifiche del configuratore. CSS-only: validazione, swap
del modifier `--error` e render dei messaggi sono responsabilita' del consumer.

## Classi pubbliche

### Container e label

| Classe | Note |
|---|---|
| `.sp-form-field` | wrapper generico (`position: relative`) per ogni campo |
| `.sp-label-row` | flex inline label + info-btn + hint, gap 4px |
| `.sp-label-text` | testo label 15px medium |
| `.sp-label-text__required` | asterisco rosso `--color-error` |
| `.sp-label-text__optional` | testo "(opzionale)" piccolo grigio |
| `.sp-label-hint` | hint piccolo grigio |
| `.sp-info-btn` | bottone icona info (vedi InfoDropdown) |

### Input / select

| Classe | Note |
|---|---|
| `.sp-form-input` | input full-width; `--error`, `:focus`, `:disabled`; `textarea.sp-form-input` con resize off |
| `.sp-form-select` | dropdown nativo, freccia SVG embedded; `:focus`, `:disabled` |

### Messaggi inline

| Classe | Note |
|---|---|
| `.sp-error-msg` | flex con icona, font xs, colore error |
| `.sp-error-inline` | variante alternativa |
| `.sp-success-inline` | flex con icona, font xs, colore success |

### Griglie helper

| Classe | Note |
|---|---|
| `.sp-custom-dims` (+`__grid`/`__field`/`__label`) | wrapper + grid 2 col (single col `<= 640px`) |
| `.sp-nome-ref-row` | grid 2 col nome + referente (single col `<= 640px`) |
| `.sp-qty-iva-row` (+`--single`/`--double`) | wrapper qty + IVA |
| `.sp-facciate-row`, `.sp-facciate-input-wrap` | riga input numerico + callout |
| `.sp-spessore-display`, `.sp-spessore-label`, `.sp-spessore-value` | callout spessore calcolato |

(`.sp-nome-lavoro-input` e `--error` esistono come alias di `.sp-form-input`.)

## Markup contract

Form-field con label-row + select:

```html
<div class="sp-form-field">
    <div class="sp-label-row"><label class="sp-label-text">Stampa interna</label></div>
    <select class="sp-form-select">
        <option>4/4 Colori fronte e retro</option>
    </select>
</div>
```

Input con info-btn, hint ed errore:

```html
<div class="sp-form-field">
    <div class="sp-label-row">
        <label class="sp-label-text">Facciate</label>
        <span class="sp-label-hint">(comprese le 4 di copertina)</span>
        <button type="button" class="sp-info-btn" aria-controls="facciate-info"></button>
    </div>
    <input type="number" class="sp-form-input sp-form-input--error" value="23" min="24" step="4"/>
    <div class="sp-error-msg">Il minimo e' 24 facciate</div>
</div>
```

Nome-ref-row con required + optional:

```html
<div class="sp-nome-ref-row">
    <div>
        <label class="sp-label-text">Nome del lavoro <span class="sp-label-text__required">*</span></label>
        <input type="text" class="sp-form-input"/>
    </div>
    <div>
        <label class="sp-label-text">Referente <span class="sp-label-text__optional">(opzionale)</span></label>
        <input type="text" class="sp-form-input"/>
    </div>
</div>
```

## Cosa decide il CMS / backend

Contenuti label/placeholder/`value`/`<option>`, attributi HTML
(`name`/`id`/`min`/`max`/`step`/`pattern`/`required`/`disabled`), presenza del
modifier `--error`, testo dei messaggi inline e handler `onchange`/`oninput`.

## Cosa decide la libreria

Spacing label-row, padding/border/radius di input/select, colori
bordo/focus/error, font-size 14-15px, freccia select embedded, responsive grid
`<= 640px`, focus visibile e disabled cursor.

## Dipendenze interne

`primitives/info-dropdown.css` consuma `.sp-label-row` + `.sp-label-text` da
`form-primitives.css`. Nel bundle `bundles/demo-minimal.css`, `form-primitives.css`
va importato PRIMA di `info-dropdown.css`.

## Fuori scope

`.sp-radio-group`/`.sp-radio-option` (FormControls), `.delivery-option*`
(radio-card), `.qty-input*`/`.qty-btn*`, `.iva-toggle`/`.iva-btn`,
`.multicop-*` (parzialmente ToggleSwitch), `.validation-errors`.
