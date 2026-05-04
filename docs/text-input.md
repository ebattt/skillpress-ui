---
title: TextInput
description: Showcase delle 7 varianti del catalog Text Input (Skillpress UI). Composizione di selettori gia' presenti in FormPrimitives + alias .nome-lavoro-input.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_form-inputs.css
  catalog_preview: elements-ui/js/components-form-inputs.js (text-input panel, righe 1-127)
status: implemented-local
package_path: primitives/form-primitives.css
---

# TextInput

`TextInput` non e' un nuovo componente: e' la **vista showcase** delle 7 varianti
di campo testo descritte dal catalog `elements-ui` (preview "Text Input"), tutte
ottenibili componendo selettori gia' presenti in [FormPrimitives](./form-primitives.md).

Lo scopo di questa pagina e' fornire al backend un riferimento puntuale alle
combinazioni autorizzate di label, hint, info-btn, modifier d'errore e disabled,
piu' la classe alternativa `.nome-lavoro-input`.

## Le 7 varianti

| # | Variante | Selettori usati |
|---|---|---|
| 1 | Default | `.form-field`, `.label-row`, `.label-text`, `.form-input` |
| 2 | Con Label e Info Button | + `.label-text__required`, `.info-btn` |
| 3 | Con Label Hint | + `.label-hint`, `.info-btn` |
| 4 | Stato Errore | + `.form-input--error`, `.error-msg` |
| 5 | Disabled | `.form-input` con attributo `disabled` |
| 6 | Classe alternativa | `.nome-lavoro-input` (alias di `.form-input`) |
| 7 | Layout Griglia (2 colonne) | `.nome-ref-row` come wrapper |

Tutte le combinazioni si possono incrociare (es. variante 2+4 = "Required con
errore", variante 7 con un campo `--error` e l'altro disabled, ecc.).

## La variante 6: `.nome-lavoro-input`

`.nome-lavoro-input` e' un **alias semantico** di `.form-input`. Le regole CSS
sono identiche (stesso padding, stesso radius, stesso font, stesso focus). La
classe esiste come hook dedicato per la sezione "Nome del lavoro" del
configuratore: il backend la sceglie quando vuole una classe distinta su quel
campo, utile per CSS-targeting / e2e tests / domande di analytics, senza dover
modificare il contratto base di `.form-input`.

`.nome-lavoro-input--error` e' il modifier d'errore parallelo a `.form-input--error`.

## Markup verbatim

### Variante 1 — Default

```html
<div class="form-field">
    <div class="label-row">
        <label class="label-text">Campo Esempio</label>
    </div>
    <input type="text" class="form-input" placeholder="Inserisci valore...">
</div>
```

### Variante 2 — Con Label e Info Button

```html
<div class="form-field">
    <div class="label-row">
        <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
        <button type="button" class="info-btn" aria-label="Info Campo Esempio"></button>
    </div>
    <input type="text" class="form-input" placeholder="Inserisci valore...">
</div>
```

### Variante 6 — `.nome-lavoro-input`

```html
<div class="form-field">
    <div class="label-row">
        <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
    </div>
    <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore...">
</div>
```

### Variante 7 — Layout Griglia 2 colonne

```html
<div class="nome-ref-row">
    <div>
        <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
            Campo Esempio <span class="label-text__required">*</span>
        </label>
        <input type="text" class="form-input" placeholder="Inserisci valore...">
    </div>
    <div>
        <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
            Campo Esempio <span class="label-text__optional">(opzionale)</span>
        </label>
        <input type="text" class="form-input" placeholder="Inserisci valore...">
    </div>
</div>
```

`.nome-ref-row` collassa a 1 colonna sotto `640px` (regola gia' nella primitiva).

## Cosa decide il CMS / backend

- testo della label, valori `required` / `optional`, testo della hint
- placeholder dell'input
- valore iniziale (`value="..."`)
- attributi standard (`disabled`, `min`, `max`, `step`, `type`, `pattern`, ...)
- presenza/assenza dell'`.info-btn` e relativo `aria-controls` (per agganciare un `InfoDropdown`)
- nessun SVG dentro `.info-btn`: l'icona info e' CSS della libreria
- testo del messaggio di errore in `.error-msg`
- swap del modifier `--error` in base alla validazione

## Cosa decide la libreria

- aspetto visivo (padding, radius, font, colore bordi, focus ring)
- transizione `border-color`
- responsive del `.nome-ref-row` (1 col `<= 640px`)
- equivalenza visiva tra `.form-input` e `.nome-lavoro-input`

## Strategia

A static snapshot. Niente JS UI. Validazione e swap modifier `--error` sono
business logic consumer-side.

## Storybook

| Story | Note |
|---|---|
| `Default` | variante 1 + play test focus |
| `WithLabelAndInfoButton` | variante 2 |
| `WithLabelHint` | variante 3 |
| `ErrorState` | variante 4 + play test `--error` |
| `Disabled` | variante 5 + play test `disabled` |
| `NomeLavoroInput` | variante 6 + play test classe |
| `TwoColumnLayout` | variante 7 |
| `AllVariants` | le 7 varianti in colonna |
| `ReferenceFromElementsUI` | replica selezionata dal preview catalog |

## Fonte

- catalog CSS: `elements-ui/css/components/_form-inputs.css#L33-L184` (selettori gia' migrati in `primitives/form-primitives.css`)
- catalog preview: `elements-ui/js/components-form-inputs.js#L1-L127` (markup HTML delle 7 varianti)

## Vedi anche

- [FormPrimitives](./form-primitives.md) — primitive form di riferimento
- [InfoDropdown](./info-dropdown.md) — `.info-btn` + dropdown info contestuale
- [FormControls](./form-controls.md) — radio/checkbox affini
