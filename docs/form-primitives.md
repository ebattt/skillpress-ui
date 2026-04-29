---
title: FormPrimitives
description: Primitive CSS-only per form-field, label, input testo/numero, select, messaggi inline + griglie helper (custom-dims, nome-ref-row).
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_form-inputs.css
  demo: product-page-integration/js/sections/section-1.js, section-6.js
status: post-bem-2026-04-29
package_path: primitives/form-primitives.css
---

# FormPrimitives

Set di primitive form fondamentali: contenitore `.form-field`, label (con varianti
`required` / `optional` / `hint` / `info-btn`), input testo/numero (`.form-input` +
`--error`/`:disabled`), select nativo con freccia SVG embedded (`.form-select`),
messaggi inline (`.error-msg`, `.error-inline`, `.success-inline`) e due griglie
helper specifiche del configuratore (`.custom-dims` + `.custom-dims__grid/field/label`, `.nome-ref-row`).

Strategia A (CSS-only). Validazione, swap modifier `--error`, render messaggi
sono responsabilita' del consumer / backend.

> Aggiornato 2026-04-29 post BEM standardization (prompt 19 Phase B). Sub-element di `.custom-dims` rinominati con doppio underscore. Eccezioni italiane (`.facciate-row`, `.spessore-display`, `.qty-iva-row`, `.nome-lavoro-input`, `.nome-ref-row`) mantenute come block name. Nessun hook `data-*` (componente CSS-only).

## Classi pubbliche

### Container

| Classe | Note |
|---|---|
| `.form-field` | wrapper generico (`position: relative`) per ogni campo |

### Label

| Classe | Note |
|---|---|
| `.label-row` | flex inline label + info-btn + hint, gap 4px |
| `.label-text` | testo label 15px medium |
| `.label-text__required` | asterisco rosso `--color-error` |
| `.label-text__optional` | testo "(opzionale)" piccolo grigio |
| `.label-hint` | hint piccolo grigio nello stesso row |

### Input testo / numero / textarea

| Classe | Note |
|---|---|
| `.form-input` | input full-width, padding 6/10, border 1px, radius sm |
| `.form-input--error` | bordo `--color-error-light` |
| `.form-input:focus` | bordo `--color-border-focus` |
| `.form-input:disabled` | background gray-100, cursor not-allowed |
| `textarea.form-input` | resize disabilitato |

### Select

| Classe | Note |
|---|---|
| `.form-select` | dropdown nativo full-width, freccia SVG embedded |
| `.form-select:focus` | bordo `--color-border-focus` |
| `.form-select:disabled` | opacity 0.5, background gray-100 |

### Messaggi inline

| Classe | Note |
|---|---|
| `.error-msg` | flex con icona, font xs, colore error, margin-top xs |
| `.error-inline` | variante alternativa (catalogo equivalente) |
| `.success-inline` | flex con icona, font xs, colore success, gap 2px |

### Griglie helper

| Classe | Note |
|---|---|
| `.custom-dims` | wrapper flex column gap sm |
| `.custom-dims__grid` | grid 2 col, single col `<= 640px` |
| `.custom-dims__field` | colonna grid (label + input) |
| `.custom-dims__label` | label 15px medium (alias di `.label-text` per nome semantico) |
| `.nome-ref-row` | grid 2 col per nome + referente, single col `<= 640px` |
| `.qty-iva-row` | grid wrapper Step 6 (qty + IVA), gap 0.625rem |
| `.qty-iva-row--single` | 1 colonna |
| `.qty-iva-row--double` | 2 colonne, single col `<= 640px` |

### Facciate row + spessore display

Layout flex per Step 1 "Facciate" del configuratore: input numerico + callout
spessore mm calcolato.

| Classe | Note |
|---|---|
| `.facciate-row` | flex inline align-items center, gap 0.75rem, `min-width: 0` per evitare overflow |
| `.facciate-input-wrap` | flex 1 (lo spazio rimanente lo prende l'input) |
| `.spessore-display` | flex inline icon + label + value, `flex-shrink: 0`, `white-space: nowrap` |
| `.spessore-display svg` | icona 1rem, colore `--color-text` (replica catalog `.spessore-display .material-symbols-outlined`) |
| `.spessore-label` | font sm medium |
| `.spessore-value` | font sm bold (e' il dato calcolato) |

## Markup contract

Form-field con label-row + select:

```html
<div class="form-field">
    <div class="label-row">
        <label class="label-text">Stampa interna</label>
    </div>
    <select class="form-select">
        <option>4/4 Colori fronte e retro</option>
        <option>1/1 Nero fronte e retro</option>
    </select>
</div>
```

Form-field con info-btn + label-hint + input + error:

```html
<div class="form-field">
    <div class="label-row">
        <label class="label-text">Facciate</label>
        <span class="label-hint">(comprese le 4 di copertina)</span>
        <button type="button" class="info-btn" aria-controls="facciate-info">
            <!-- SVG info icon -->
        </button>
    </div>
    <input type="number" class="form-input form-input--error" value="23" min="24" step="4"/>
    <div class="error-msg">
        <!-- SVG error icon -->
        Il minimo è 24 facciate
    </div>
</div>
```

Custom dims grid:

```html
<div class="custom-dims">
    <label class="label-text">Dimensioni personalizzate (mm)</label>
    <div class="custom-dims__grid">
        <div class="custom-dims__field">
            <label class="label-text">Larghezza</label>
            <input type="number" class="form-input" min="100" max="330"/>
        </div>
        <div class="custom-dims__field">
            <label class="label-text">Altezza</label>
            <input type="number" class="form-input" min="100" max="480"/>
        </div>
    </div>
</div>
```

Facciate row + spessore display (Step 1 configuratore):

```html
<div class="form-field">
    <div class="label-row">
        <label class="label-text">Facciate</label>
        <span class="label-hint">(comprese le 4 di copertina)</span>
    </div>
    <div class="facciate-row">
        <div class="facciate-input-wrap">
            <input type="number" class="form-input" value="48" min="24" step="4"/>
        </div>
        <div class="spessore-display">
            <!-- SVG vertical-align-center icon 16x16 -->
            <span class="spessore-label">Spessore</span>
            <span class="spessore-value">5.5 mm</span>
        </div>
    </div>
</div>
```

Il valore di `.spessore-value` e' calcolato lato business logic (in funzione di
numero facciate, grammatura, carta). Il backend rende il numero finale; la
libreria fornisce solo lo stile.

Nome-ref-row con required + optional:

```html
<div class="nome-ref-row">
    <div>
        <label class="label-text">
            Nome del lavoro <span class="label-text__required">*</span>
        </label>
        <input type="text" class="form-input" placeholder="Es. Catalogo primavera"/>
    </div>
    <div>
        <label class="label-text">
            Referente <span class="label-text__optional">(opzionale)</span>
        </label>
        <input type="text" class="form-input" placeholder="Es. Mario Rossi"/>
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

`primitives/info-dropdown.css` consuma `.label-row` + `.label-text` da
`form-primitives.css`. Il bundle `bundles/demo-minimal.css` deve quindi importare
`form-primitives.css` PRIMA di `info-dropdown.css`.

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.custom-dims-grid` | `.custom-dims__grid` |
| `.custom-dims-field` | `.custom-dims__field` |
| `.custom-dims-label` | `.custom-dims__label` |

Eccezioni italiane mantenute (block name singoli, non rinominati): `.facciate-row`, `.facciate-input-wrap`, `.spessore-display`, `.spessore-label`, `.spessore-value`, `.qty-iva-row` (+`--single`/`--double`), `.nome-lavoro-input` (+`--error`), `.nome-ref-row`. Tutto il resto (`.form-field`, `.form-input`, `.form-select`, `.label-row`, `.label-text`, `.label-text__required`, `.label-text__optional`, `.label-hint`, `.error-msg`, `.error-inline`, `.success-inline`) e' invariato.

## Fuori scope

- `.radio-group`, `.radio-option`, `input[type="radio"]/[type="checkbox"]`: iterazione
  separata.
- `.delivery-option*`: iterazione separata (radio-card pattern).
- `.qty-input*`, `.qty-btn*`, `.qty-presets*`, `.qty-iva-row*`: iterazione separata.
- `.iva-toggle`, `.iva-btn`, `.iva-banner*`: iterazione separata.
- `.multicop-toggle`, `.multicop-switch*`, `.multicop-label`: gia' parzialmente
  coperto da `ToggleSwitch`.
- `.facciate-row`, `.spessore-display*`: layout step-1-specifico.
- `.nome-lavoro-section`, `.nome-lavoro-input*`: alias step-6-specifici di
  `.form-input`.
- `.plastificazione-*`: layout finitura-specifico.
- `.radio-option--disabled`: appartiene al pattern radio/checkbox.
- `.validation-errors`: block-level error summary, edge case bassa priorita'.
