---
title: TextInput
description: Vista showcase delle 7 varianti di campo testo, composte da FormPrimitives + alias .sp-nome-lavoro-input.
layer: primitives
strategy: css-only
status: public-contract
package_path: primitives/form-primitives.css
---

# TextInput

`TextInput` non e' un componente a se': e' la vista showcase delle 7 varianti di
campo testo, tutte ottenibili componendo selettori gia' presenti in
[FormPrimitives](./form-primitives.md). Fornisce al backend un riferimento alle
combinazioni autorizzate di label, hint, info-btn, modifier d'errore e disabled,
piu' la classe alternativa `.sp-nome-lavoro-input`.

## Le 7 varianti

| # | Variante | Selettori usati |
|---|---|---|
| 1 | Default | `.sp-form-field`, `.sp-label-row`, `.sp-label-text`, `.sp-form-input` |
| 2 | Con Label e Info Button | + `.sp-label-text__required`, `.sp-info-btn` (da InfoDropdown) |
| 3 | Con Label Hint | + `.sp-label-hint`, `.sp-info-btn` |
| 4 | Stato Errore | + `.sp-form-input--error`, `.sp-error-msg` |
| 5 | Disabled | `.sp-form-input` con attributo `disabled` |
| 6 | Classe alternativa | `.sp-nome-lavoro-input` (alias di `.sp-form-input`) |
| 7 | Layout Griglia (2 colonne) | `.sp-nome-ref-row` come wrapper |

Le combinazioni si possono incrociare (es. 2+4, 7 con un campo `--error` e l'altro disabled).

## Variante 6: `.sp-nome-lavoro-input`

Alias semantico di `.sp-form-input`: regole CSS identiche (padding, radius, font,
focus). Esiste come hook dedicato per la sezione "Nome del lavoro" del
configuratore (CSS-targeting / e2e / analytics) senza toccare il contratto base.
`.sp-nome-lavoro-input--error` e' il modifier d'errore parallelo a
`.sp-form-input--error`.

## Markup contract

### Variante 1 — Default

```html
<div class="sp-form-field">
    <div class="sp-label-row">
        <label class="sp-label-text">Campo Esempio</label>
    </div>
    <input type="text" class="sp-form-input" placeholder="Inserisci valore...">
</div>
```

### Variante 2 — Con Label e Info Button

```html
<div class="sp-form-field">
    <div class="sp-label-row">
        <label class="sp-label-text">Campo Esempio <span class="sp-label-text__required">*</span></label>
        <button type="button" class="sp-info-btn" aria-label="Info Campo Esempio"></button>
    </div>
    <input type="text" class="sp-form-input" placeholder="Inserisci valore...">
</div>
```

### Variante 6 — `.sp-nome-lavoro-input`

```html
<div class="sp-form-field">
    <div class="sp-label-row">
        <label class="sp-label-text">Campo Esempio <span class="sp-label-text__optional">(opzionale)</span></label>
    </div>
    <input type="text" class="sp-nome-lavoro-input" placeholder="Inserisci valore...">
</div>
```

### Variante 7 — Layout Griglia 2 colonne

```html
<div class="sp-nome-ref-row">
    <div>
        <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">Campo A <span class="sp-label-text__required">*</span></label>
        <input type="text" class="sp-form-input" placeholder="Inserisci valore...">
    </div>
    <div>
        <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">Campo B <span class="sp-label-text__optional">(opzionale)</span></label>
        <input type="text" class="sp-form-input" placeholder="Inserisci valore...">
    </div>
</div>
```

`.sp-nome-ref-row` collassa a 1 colonna sotto `640px`.

## Data hooks

Nessun hook JS: CSS-only. Validazione e swap del modifier `--error` sono business
logic consumer-side.

## Ownership

- CMS/backend: testo label e valori required/optional, hint, placeholder, valore
  iniziale, attributi standard (`disabled`, `type`, `pattern`, ...), presenza
  dell'`.sp-info-btn`, testo del messaggio d'errore, swap del modifier `--error`.
  Nessun SVG dentro `.sp-info-btn` (icona CSS della libreria).
- Libreria: aspetto visivo (padding, radius, font, bordi, focus ring),
  transizione `border-color`, responsive del `.sp-nome-ref-row`, equivalenza
  visiva `.sp-form-input` / `.sp-nome-lavoro-input`.

## Vedi anche

- [FormPrimitives](./form-primitives.md)
- [InfoDropdown](./info-dropdown.md) — `.sp-info-btn` + dropdown info contestuale
- [FormControls](./form-controls.md) — radio/checkbox affini
