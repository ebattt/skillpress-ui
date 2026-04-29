---
title: OptionButtons
description: Gruppo di bottoni per selezione singola nel configuratore (formati, grammature, finiture).
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_buttons.css#L129-L177
  demo: product-page-integration/js/configurator.js#L687-L693
status: verified-local-link-dev
package_path: primitives/option-buttons.css
---

# OptionButtons

Gruppo di bottoni inline per selezione esclusiva di un'opzione tra N (formati, grammature, finiture, ecc.). Usato nella modalita' "Veloce" del configuratore. Il CMS/JS consumer gestisce il toggle dei modifier `--selected`/`--default` al click.

## Anatomy

```text
OptionButtons
└── option-buttons   (flex wrap, gap 0.375rem)
    └── option-buttons__btn × N   [--default | --selected | --borderless]
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

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.option-buttons` | flex container del gruppo | yes | — |
| `.option-buttons__btn` | singolo bottone opzione | yes | `--default`, `--selected`, `--borderless` |

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
- `Borderless` (variante senza bordo) → `primitives-optionbuttons--borderless`
- `ReferenceFromElementsUI` (markup verbatim demo) → `primitives-optionbuttons--reference-from-elements-ui`

## Token usati

`--color-primary`, `--color-text`, `--color-bg-gray-200`, `--color-bg-gray-50`, `--radius-sm`, `--font-size-sm`, `--font-weight-medium`, `--transition-fast`.

Valori letterali mantenuti dal catalogo:
- `#ffffff` su `.option-buttons__btn--default` e `--borderless` (sfondo bianco).
- `#d1d5db` su `.option-buttons__btn--default:hover` (border hover).

## Note CMS

- il CMS genera N bottoni in base alle opzioni disponibili per il campo (max 5 nella modalita' veloce).
- esattamente un bottone ha `--selected`, gli altri `--default`.
- testo del bottone: label breve dell'opzione.
- `--borderless` e' una variante visiva per contesti dove il bordo non serve.

## Out of scope

- behavior toggle JS (il consumer gestisce il click → swap modifier).
- stato disabled.
- icone dentro i bottoni.
- layout verticale (il wrap e' sempre row).
