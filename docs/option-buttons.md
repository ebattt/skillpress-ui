---
title: OptionButtons
description: Gruppo di bottoni per selezione singola nel configuratore (formati, grammature, finiture).
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_buttons.css#L129-L177
  demo: product-page-integration/js/configurator.js#L687-L693
status: post-bem-2026-04-29
package_path: primitives/option-buttons.css
---

# OptionButtons

Gruppo di bottoni inline per selezione esclusiva di un'opzione tra N (formati, grammature, finiture, ecc.). Usato nella modalita' "Veloce" del configuratore. Il CMS/JS consumer gestisce il toggle dei modifier `--selected`/`--default` al click.

> Aggiornato 2026-04-29 post BEM standardization (prompt 19 Phase B). Root rinominato da `.option-btns-wrap` -> `.option-buttons`; sub-element `option-btn` -> `option-buttons__btn`. Nessun hook `data-*` (componente CSS-only, toggle consumer-side).

## ChoiceGroup

`ChoiceGroup` e' il nome concettuale CMS per questo pattern: scelta testuale
mutuamente esclusiva. In codice runtime oggi si usa `OptionButtons` senza
nuovo CSS.

Formati, grammature, controllo file e altri gruppi di testo condividono lo
stesso elemento generico: cambia solo la label delle opzioni. Il CMS/backend
puo' aggiungere una preferenza di layout, ad esempio `equal`, quando il gruppo
deve occupare la riga con colonne uguali.

Esempi CMS:

| Dato CMS | Presentation type | Runtime |
|---|---|---|
| Grammatura | Choice group | `.option-buttons` |
| Controllo file | Choice group equal | `.option-buttons.option-buttons--equal` |
| Copia Green Si/No | Choice group | `.option-buttons` |

Non creare componenti dedicati come `GrammaturaButton` se cambia solo il nome
della variante CMS.

## Anatomy

```text
OptionButtons
└── option-buttons   (flex wrap, gap 0.375rem)
    └── option-buttons__btn × N   [--default | --selected | --borderless]

OptionButtons equal
└── option-buttons option-buttons--equal   (grid 2 colonne uguali)
    └── option-buttons__btn × 2
```

## Markup contract

Markup ricostruito da `product-page-integration/js/configurator.js#L687-L693`.

```html
<div class="option-buttons">
    <button class="option-buttons__btn option-buttons__btn--selected">A4</button>
    <button class="option-buttons__btn option-buttons__btn--default">A5</button>
    <button class="option-buttons__btn option-buttons__btn--default">A3</button>
    <button class="option-buttons__btn option-buttons__btn--default">Libro</button>
    <button class="option-buttons__btn option-buttons__btn--default">Personalizzato</button>
</div>
```

Per choice group a due opzioni che devono occupare tutta la riga, usare il
modifier di layout. Questo replica il look di `.controllo-btns` senza esporre
un componente domain-specific:

```html
<div class="option-buttons option-buttons--equal" role="group" aria-label="Controllo file">
    <button class="option-buttons__btn option-buttons__btn--selected">Standard - gratuito</button>
    <button class="option-buttons__btn option-buttons__btn--default">Plus - 11,90 euro</button>
</div>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.option-buttons` | container del gruppo | yes | `--equal` |
| `.option-buttons__btn` | singolo bottone opzione | yes | `--default`, `--selected`, `--borderless` |

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.option-btns-wrap` | `.option-buttons` |
| `.option-btn` | `.option-buttons__btn` |
| `.option-btn--default` | `.option-buttons__btn--default` |
| `.option-btn--selected` | `.option-buttons__btn--selected` |
| `.option-btn--borderless` | `.option-buttons__btn--borderless` |

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/option-buttons.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` (A4 selezionato) → `primitives-optionbuttons--default`
- `NoneSelected` (tutti default) → `primitives-optionbuttons--none-selected`
- `ManyOptions` (5 opzioni, terza selezionata) → `primitives-optionbuttons--many-options`
- `EqualColumns` (2 opzioni a larghezza piena) → `primitives-optionbuttons--equal-columns`
- `Borderless` (variante senza bordo) → `primitives-optionbuttons--borderless`
- `ReferenceFromElementsUI` (markup verbatim demo) → `primitives-optionbuttons--reference-from-elements-ui`

## Token usati

`--color-primary`, `--color-text`, `--color-bg-gray-200`, `--color-bg-gray-50`, `--radius-sm`, `--font-size-sm`, `--font-weight-medium`, `--transition-fast`.

Valori letterali mantenuti dal catalogo:
- `#ffffff` su `.option-buttons__btn--default` e `--borderless` (sfondo bianco).
- bordo trasparente sui bottoni default/selected: il look della product page
  non mostra un contorno grigio attorno alle opzioni testuali.

## Note CMS

- il CMS genera N bottoni in base alle opzioni disponibili per il campo (max 5 nella modalita' veloce).
- esattamente un bottone ha `--selected`, gli altri `--default`.
- testo del bottone: label breve dell'opzione.
- `--borderless` e' una variante visiva per contesti dove il bordo non serve.
- `--equal` e' una variante di layout per due opzioni che devono riempire la
  riga, ad esempio `Controllo file`. Non usarla automaticamente per tutti i
  choice group a due opzioni: e' una scelta di presentation/layout.

## Out of scope

- behavior toggle JS (il consumer gestisce il click → swap modifier).
- stato disabled.
- icone dentro i bottoni.
- layout verticale (il wrap e' sempre row).
