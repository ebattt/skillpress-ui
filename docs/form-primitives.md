---
title: FormPrimitives
description: Primitive CSS-only per form-field, label, input testo/numero, select, messaggi inline + griglie helper (custom-dims, nome-ref-row).
layer: primitives
strategy: css-only
package_path: primitives/form-primitives.css
---

# FormPrimitives

Set di primitive form fondamentali: contenitore `.sp-form-field`, label (con varianti
`required` / `optional` / `hint` / `info-btn`), input testo/numero (`.sp-form-input` +
`--error`/`:disabled`), select nativo con freccia SVG embedded (`.sp-form-select`),
messaggi inline (`.sp-error-msg`, `.sp-error-inline`, `.sp-success-inline`) e due griglie
helper specifiche del configuratore (`.sp-custom-dims` + `.sp-custom-dims__grid/field/label`, `.sp-nome-ref-row`).

CSS-only. Validazione, swap modifier `--error`, render messaggi
sono responsabilita' del consumer / backend.

## Classi pubbliche

### Container

| Classe | Note |
|---|---|
| `.sp-form-field` | wrapper generico (`position: relative`) per ogni campo |

### Label

| Classe | Note |
|---|---|
| `.sp-label-row` | flex inline label + info-btn + hint, gap 4px |
| `.sp-label-text` | testo label 15px medium |
| `.sp-label-text__required` | asterisco rosso `--color-error` |
| `.sp-label-text__optional` | testo "(opzionale)" piccolo grigio |
| `.sp-label-hint` | hint piccolo grigio nello stesso row |

### Input testo / numero / textarea

| Classe | Note |
|---|---|
| `.sp-form-input` | input full-width, padding 6/10, border 1px, radius sm |
| `.sp-form-input--error` | bordo `--color-error-light` |
| `.sp-form-input:focus` | bordo `--color-border-focus` |
| `.sp-form-input:disabled` | background gray-100, cursor not-allowed |
| `textarea.sp-form-input` | resize disabilitato |

### Select

| Classe | Note |
|---|---|
| `.sp-form-select` | dropdown nativo full-width, freccia SVG embedded |
| `.sp-form-select:focus` | bordo `--color-border-focus` |
| `.sp-form-select:disabled` | opacity 0.5, background gray-100 |

### Messaggi inline

| Classe | Note |
|---|---|
| `.sp-error-msg` | flex con icona, font xs, colore error, margin-top xs |
| `.sp-error-inline` | variante alternativa (catalogo equivalente) |
| `.sp-success-inline` | flex con icona, font xs, colore success, gap 2px |

### Griglie helper

| Classe | Note |
|---|---|
| `.sp-custom-dims` | wrapper flex column gap sm |
| `.sp-custom-dims__grid` | grid 2 col, single col `<= 640px` |
| `.sp-custom-dims__field` | colonna grid (label + input) |
| `.sp-custom-dims__label` | label 15px medium (alias di `.sp-label-text` per nome semantico) |
| `.sp-nome-ref-row` | grid 2 col per nome + referente, single col `<= 640px` |
| `.sp-qty-iva-row` | grid wrapper Step 6 (qty + IVA), gap 0.625rem |
| `.sp-qty-iva-row--single` | 1 colonna |
| `.sp-qty-iva-row--double` | 2 colonne, single col `<= 640px` |

### Facciate row + spessore display

Layout flex per Step 1 "Facciate" del configuratore: input numerico + callout
spessore mm calcolato.

| Classe | Note |
|---|---|
| `.sp-facciate-row` | flex inline align-items center, gap 0.75rem, `min-width: 0` per evitare overflow |
| `.sp-facciate-input-wrap` | flex 1 (lo spazio rimanente lo prende l'input) |
| `.sp-spessore-display` | flex inline icon + label + value, `flex-shrink: 0`, `white-space: nowrap` |
| `.sp-spessore-display svg` | icona 1rem, colore `--color-text` (replica catalog `.sp-spessore-display .material-symbols-outlined`) |
| `.sp-spessore-label` | font sm medium |
| `.sp-spessore-value` | font sm bold (e' il dato calcolato) |

## Markup contract

Form-field con label-row + select:

```html
<div class="sp-form-field">
    <div class="sp-label-row">
        <label class="sp-label-text">Stampa interna</label>
    </div>
    <select class="sp-form-select">
        <option>4/4 Colori fronte e retro</option>
        <option>1/1 Nero fronte e retro</option>
    </select>
</div>
```

Form-field con info-btn + label-hint + input + error:

```html
<div class="sp-form-field">
    <div class="sp-label-row">
        <label class="sp-label-text">Facciate</label>
        <span class="sp-label-hint">(comprese le 4 di copertina)</span>
        <button type="button" class="sp-info-btn" aria-controls="facciate-info">
            <!-- SVG info icon -->
        </button>
    </div>
    <input type="number" class="sp-form-input sp-form-input--error" value="23" min="24" step="4"/>
    <div class="sp-error-msg">
        <!-- SVG error icon -->
        Il minimo è 24 facciate
    </div>
</div>
```

Custom dims grid:

```html
<div class="sp-custom-dims">
    <label class="sp-label-text">Dimensioni personalizzate (mm)</label>
    <div class="sp-custom-dims__grid">
        <div class="sp-custom-dims__field">
            <label class="sp-label-text">Larghezza</label>
            <input type="number" class="sp-form-input" min="100" max="330"/>
        </div>
        <div class="sp-custom-dims__field">
            <label class="sp-label-text">Altezza</label>
            <input type="number" class="sp-form-input" min="100" max="480"/>
        </div>
    </div>
</div>
```

Facciate row + spessore display (Step 1 configuratore):

```html
<div class="sp-form-field">
    <div class="sp-label-row">
        <label class="sp-label-text">Facciate</label>
        <span class="sp-label-hint">(comprese le 4 di copertina)</span>
    </div>
    <div class="sp-facciate-row">
        <div class="sp-facciate-input-wrap">
            <input type="number" class="sp-form-input" value="48" min="24" step="4"/>
        </div>
        <div class="sp-spessore-display">
            <!-- SVG vertical-align-center icon 16x16 -->
            <span class="sp-spessore-label">Spessore</span>
            <span class="sp-spessore-value">5.5 mm</span>
        </div>
    </div>
</div>
```

Il valore di `.sp-spessore-value` e' calcolato lato business logic (in funzione di
numero facciate, grammatura, carta). Il backend rende il numero finale; la
libreria fornisce solo lo stile.

Nome-ref-row con required + optional:

```html
<div class="sp-nome-ref-row">
    <div>
        <label class="sp-label-text">
            Nome del lavoro <span class="sp-label-text__required">*</span>
        </label>
        <input type="text" class="sp-form-input" placeholder="Es. Catalogo primavera"/>
    </div>
    <div>
        <label class="sp-label-text">
            Referente <span class="sp-label-text__optional">(opzionale)</span>
        </label>
        <input type="text" class="sp-form-input" placeholder="Es. Mario Rossi"/>
    </div>
</div>
```

## Cosa decide il CMS / backend

- contenuti label, placeholder, valori `value`, options `<option>`;
- attributi HTML (`name`, `id`, `min`, `max`, `step`, `pattern`, `required`, `disabled`);
- presenza modifier `--error` in base a validazione applicativa;
- testo dei messaggi inline;
- handler `onchange` / `oninput`.

## Cosa decide la libreria

- spacing label-row, padding/border/radius input/select;
- colori bordo, focus, error;
- font-size 14-15px, line-height 1.5;
- transition border-color;
- freccia select embedded come `data:image/svg+xml`;
- responsive grid `<= 640px`;
- accessibilita base (focus visibile, disabled cursor not-allowed).

## Dipendenze interne

`primitives/info-dropdown.css` consuma `.sp-label-row` + `.sp-label-text` da
`form-primitives.css`. Il bundle `bundles/demo-minimal.css` deve quindi importare
`form-primitives.css` PRIMA di `info-dropdown.css`.

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.custom-dims-grid` | `.sp-custom-dims__grid` |
| `.custom-dims-field` | `.sp-custom-dims__field` |
| `.custom-dims-label` | `.sp-custom-dims__label` |

Eccezioni italiane mantenute (block name singoli, non rinominati): `.sp-facciate-row`, `.sp-facciate-input-wrap`, `.sp-spessore-display`, `.sp-spessore-label`, `.sp-spessore-value`, `.sp-qty-iva-row` (+`--single`/`--double`), `.sp-nome-lavoro-input` (+`--error`), `.sp-nome-ref-row`. Tutto il resto (`.sp-form-field`, `.sp-form-input`, `.sp-form-select`, `.sp-label-row`, `.sp-label-text`, `.sp-label-text__required`, `.sp-label-text__optional`, `.sp-label-hint`, `.sp-error-msg`, `.sp-error-inline`, `.sp-success-inline`) e' invariato.

## Fuori scope

- `.sp-radio-group`, `.sp-radio-option`, `input[type="radio"]/[type="checkbox"]`: iterazione
  separata.
- `.delivery-option*`: iterazione separata (radio-card pattern).
- `.qty-input*`, `.qty-btn*`, `.qty-presets*`, `.sp-qty-iva-row*`: iterazione separata.
- `.iva-toggle`, `.iva-btn`, `.sp-iva-banner*`: iterazione separata.
- `.multicop-toggle`, `.multicop-switch*`, `.multicop-label`: gia' parzialmente
  coperto da `ToggleSwitch`.
- `.sp-facciate-row`, `.sp-spessore-display*`: layout step-1-specifico.
- `.nome-lavoro-section`, `.sp-nome-lavoro-input*`: alias step-6-specifici di
  `.sp-form-input`.
- `.plastificazione-*`: layout finitura-specifico.
- `.sp-radio-option--disabled`: appartiene al pattern radio/checkbox.
- `.validation-errors`: block-level error summary, edge case bassa priorita'.
