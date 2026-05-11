---
title: TextInput
description: Showcase delle 7 varianti del catalog Text Input (Skillpress UI). Composizione di selettori gia' presenti in FormPrimitives + alias .sp-nome-lavoro-input.
layer: primitives
strategy: css-only
status: public-contract
package_path: primitives/form-primitives.css
---

# TextInput

`TextInput` non e' un nuovo componente: e' la **vista showcase** delle 7 varianti
di campo testo descritte dal catalog interno (preview "Text Input"), tutte
ottenibili componendo selettori gia' presenti in [FormPrimitives](./form-primitives.md).

Lo scopo di questa pagina e' fornire al backend un riferimento puntuale alle
combinazioni autorizzate di label, hint, info-btn, modifier d'errore e disabled,
piu' la classe alternativa `.sp-nome-lavoro-input`.

## Le 7 varianti

| # | Variante | Selettori usati |
|---|---|---|
| 1 | Default | `.sp-form-field`, `.sp-label-row`, `.sp-label-text`, `.sp-form-input` |
| 2 | Con Label e Info Button | + `.sp-label-text__required`, `.sp-info-btn` |
| 3 | Con Label Hint | + `.sp-label-hint`, `.sp-info-btn` |
| 4 | Stato Errore | + `.sp-form-input--error`, `.sp-error-msg` |
| 5 | Disabled | `.sp-form-input` con attributo `disabled` |
| 6 | Classe alternativa | `.sp-nome-lavoro-input` (alias di `.sp-form-input`) |
| 7 | Layout Griglia (2 colonne) | `.sp-nome-ref-row` come wrapper |

Tutte le combinazioni si possono incrociare (es. variante 2+4 = "Required con
errore", variante 7 con un campo `--error` e l'altro disabled, ecc.).

## La variante 6: `.sp-nome-lavoro-input`

`.sp-nome-lavoro-input` e' un **alias semantico** di `.sp-form-input`. Le regole CSS
sono identiche (stesso padding, stesso radius, stesso font, stesso focus). La
classe esiste come hook dedicato per la sezione "Nome del lavoro" del
configuratore: il backend la sceglie quando vuole una classe distinta su quel
campo, utile per CSS-targeting / e2e tests / domande di analytics, senza dover
modificare il contratto base di `.sp-form-input`.

`.sp-nome-lavoro-input--error` e' il modifier d'errore parallelo a `.sp-form-input--error`.

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
        <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">
            Campo Esempio <span class="sp-label-text__required">*</span>
        </label>
        <input type="text" class="sp-form-input" placeholder="Inserisci valore...">
    </div>
    <div>
        <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">
            Campo Esempio <span class="sp-label-text__optional">(opzionale)</span>
        </label>
        <input type="text" class="sp-form-input" placeholder="Inserisci valore...">
    </div>
</div>
```

`.sp-nome-ref-row` collassa a 1 colonna sotto `640px` (regola gia' nella primitiva).

## Cosa decide il CMS / backend

- testo della label, valori `required` / `optional`, testo della hint
- placeholder dell'input
- valore iniziale (`value="..."`)
- attributi standard (`disabled`, `min`, `max`, `step`, `type`, `pattern`, ...)
- presenza/assenza dell'`.sp-info-btn` e relativo `aria-controls` (per agganciare un `InfoDropdown`)
- nessun SVG dentro `.sp-info-btn`: l'icona info e' CSS della libreria
- testo del messaggio di errore in `.sp-error-msg`
- swap del modifier `--error` in base alla validazione

## Cosa decide la libreria

- aspetto visivo (padding, radius, font, colore bordi, focus ring)
- transizione `border-color`
- responsive del `.sp-nome-ref-row` (1 col `<= 640px`)
- equivalenza visiva tra `.sp-form-input` e `.sp-nome-lavoro-input`

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
| `ContractReference` | replica selezionata dal preview catalog |

## Fonte

- catalog CSS: `elements-ui/css/components/_form-inputs.css#L33-L184` (selettori gia' migrati in `primitives/form-primitives.css`)
- catalog preview: `elements-ui/js/components-form-inputs.js#L1-L127` (markup HTML delle 7 varianti)

## Vedi anche

- [FormPrimitives](./form-primitives.md) — primitive form di riferimento
- [InfoDropdown](./info-dropdown.md) — `.sp-info-btn` + dropdown info contestuale
- [FormControls](./form-controls.md) — radio/checkbox affini
