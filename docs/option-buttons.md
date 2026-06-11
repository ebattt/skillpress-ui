---
title: OptionButtons
description: Gruppo di bottoni per selezione singola nel configuratore (formati, grammature, finiture).
layer: primitives
strategy: css-only
package_path: primitives/option-buttons.css
---

# OptionButtons

Gruppo di bottoni inline per selezione esclusiva di un'opzione tra N (formati,
grammature, finiture). Il CMS/JS consumer gestisce il toggle dei modifier
`--selected`/`--default` al click. Lo stesso elemento copre piu' gruppi testuali:
cambia solo la label delle opzioni. CSS-only.

## Anatomy

```text
OptionButtons
└── sp-option-buttons   (flex wrap)
    └── sp-option-buttons__btn × N   [--default | --selected | --borderless]

OptionButtons equal
└── sp-option-buttons sp-option-buttons--equal   (grid 2 colonne uguali)
    └── sp-option-buttons__btn × 2
```

## Markup contract

```html
<div class="sp-option-buttons">
    <button class="sp-option-buttons__btn sp-option-buttons__btn--selected">A4</button>
    <button class="sp-option-buttons__btn sp-option-buttons__btn--default">A5</button>
    <button class="sp-option-buttons__btn sp-option-buttons__btn--default">A3</button>
</div>
```

Due opzioni a larghezza piena (modifier di layout `--equal`):

```html
<div class="sp-option-buttons sp-option-buttons--equal" role="group" aria-label="Controllo file">
    <button class="sp-option-buttons__btn sp-option-buttons__btn--selected">Standard - gratuito</button>
    <button class="sp-option-buttons__btn sp-option-buttons__btn--default">Plus - 11,90 euro</button>
</div>
```

## Classi pubbliche

| Classe | Ruolo | Modifiers |
|---|---|---|
| `.sp-option-buttons` | container del gruppo | `--equal` |
| `.sp-option-buttons__btn` | singolo bottone opzione | `--default`, `--selected`, `--borderless` |

## Installation

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/primitives/option-buttons.css" />
```

Nessun JS richiesto.

## Note CMS

- il CMS genera N bottoni in base alle opzioni disponibili.
- esattamente un bottone ha `--selected`, gli altri `--default`.
- `--borderless` e' una variante visiva senza bordo.
- `--equal` e' una variante di layout per due opzioni che riempiono la riga: non
  usarla automaticamente per tutti i gruppi a due opzioni.

## Fuori scope

Behavior toggle JS, stato disabled, icone nei bottoni, layout verticale (il wrap
e' sempre row).
