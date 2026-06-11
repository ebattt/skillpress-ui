---
title: ModeSwitcher
description: Gruppo di bottoni pill per selezione esclusiva tra modalita' (es. Veloce/Avanzata).
layer: primitives
strategy: css-only
package_path: primitives/mode-switcher.css
---

# ModeSwitcher

Gruppo di bottoni pill per selezione esclusiva tra due o piu' modalita'. Il
CMS/JS consumer gestisce il toggle dei modifier `--active`/`--inactive` e
l'attributo `aria-pressed`. La libreria fornisce solo lo stile. CSS-only.

## Anatomy

```text
ModeSwitcher
└── sp-mode-switcher   (flex row, role="group")
    └── sp-mode-switcher__btn × N   [--active | --inactive]
        └── <svg>?      (icona opzionale, 1rem)
        └── testo
```

## Markup contract

```html
<div class="sp-mode-switcher" role="group" aria-label="Seleziona modalità di configurazione">
    <button class="sp-mode-switcher__btn sp-mode-switcher__btn--active" aria-pressed="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><!-- icona opzionale --></svg>
        Veloce
    </button>
    <button class="sp-mode-switcher__btn sp-mode-switcher__btn--inactive" aria-pressed="false">
        Avanzata
    </button>
</div>
```

## Classi pubbliche

| Classe | Ruolo | Modifiers |
|---|---|---|
| `.sp-mode-switcher` | flex container del gruppo | — |
| `.sp-mode-switcher__btn` | singolo bottone pill | `--active`, `--inactive` |

Attributi richiesti: `role="group"` + `aria-label` sul container; `aria-pressed`
su ogni bottone (`"true"` sull'attivo, `"false"` sugli altri).

## Installation

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/primitives/mode-switcher.css" />
```

Anche via bundle `bundles/demo-minimal.css`. Nessun JS richiesto: il toggle
`--active`/`--inactive` + `aria-pressed` e' responsabilita' del consumer.

## Note CMS

- esattamente un bottone deve avere `--active` + `aria-pressed="true"`.
- N bottoni supportati (tipicamente 2, anche 3+).
- le icone SVG sono opzionali.

## Fuori scope

Behavior toggle JS, variante segmented `.iva-toggle` (Lordo/Netto), animazione
di transizione tra stati, stato disabled.
