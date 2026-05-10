---
title: Badge
description: Badge di stato minimale con dot colorato e testo, sei varianti semantiche.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_badges.css
  demo: dashboard/index.html
status: beta-contract
package_path: primitives/badge.css
---

# Badge

Badge inline che rappresenta uno stato breve con dot colorato e label testuale. La libreria controlla allineamento, dimensione, colore della variante e dot decorativo (`::before`). Non interpreta il significato business dello stato.

## Anatomy

```text
Badge
└── .sp-badge   [--success | --warning | --error | --info | --cancelled | --neutral]
    ├── ::before   (dot 0.4375rem, currentColor)
    └── <text>     (label visibile)
```

## Markup contract

```html
<span class="sp-badge sp-badge--success">Consegnato</span>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.sp-badge` | shell inline-flex, dot decorativo via `::before` | yes | `--success`, `--warning`, `--error`, `--info`, `--cancelled`, `--neutral` |

Nessun attributo obbligatorio.

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/badge.css" />
```

Oppure via bundle (gia' include `badge.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` → `primitives-badge--default`
- `Variants` → `primitives-badge--variants`
- `ReferenceFromOriginal` → `primitives-badge--reference-from-original`

## Token usati

`--badge-color` (custom property locale), `--color-text-secondary`, `--color-text-muted`, `--color-success`, `--color-warning`, `--color-error`, `--color-info`, `--color-success-badge-text`, `--color-warning-badge-text`, `--color-error-badge-text`, `--color-info-badge-text`, `--color-cancelled-badge-text`, `--font-weight-semibold`, `--radius-full`.

## Note CMS

- testo del badge e mapping fra stato applicativo e variante visuale.
- visibilita' del badge.
- nessuna classe interna fuori contratto.

## Classi pubbliche

`.sp-badge` e i modifier `.sp-badge--success`, `.sp-badge--warning`, `.sp-badge--error`, `.sp-badge--info`, `.sp-badge--cancelled`, `.sp-badge--neutral`.

## Data hooks

Nessun hook `data-*` pubblico. `Badge` e' CSS-only.

## Modifier / stati

Varianti semantiche visuali. Il significato applicativo dello stato non e' interpretato dalla libreria.

## Backend owns

Mapping stato dominio -> variante visuale, testo visibile, visibilita' del badge e ordine nel markup.

## Library owns

Layout inline, dot decorativo, colore variante, tipografia e radius.

## Demo-only

Label e stati dimostrativi nelle stories/lab page.

## Out of scope

- badge solidi con background pieno.
- action badge con icona.
- topic pill, chip selezionabili o tag checkout.
- stati animati (pulse, bounce).
- icone Material Symbols.
