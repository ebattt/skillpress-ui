---
title: Button
description: Primitiva clic Skillpress con varianti, dimensioni e slot icona opzionale.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_buttons.css
  demo: product-page-integration/index.html
status: post-bem-2026-04-29
package_path: primitives/button.css
---

# Button

Primitiva di comandi cliccabili: dimensioni, colori, stati hover/focus/disabled, varianti visive e allineamento testo + icona opzionale. Nessun behavior JS della libreria; il consumer gestisce click, submit, navigazione e loading state.

## Anatomy

```text
Button
├── .sp-button   [--primary | --secondary | --outline | --ghost | --dashed | --sm | --full]
│   ├── .sp-button__icon   (opzionale, slot SVG inline)
│   └── <text>          (label visibile o aria-label equivalente)
```

Tag accettati: `<button type="button">` o `<a href="...">`. Per link disabilitati usare classe `.sp-button--disabled` + `aria-disabled="true"`.

## Markup contract

Markup base con variante primary:

```html
<button class="sp-button sp-button--primary" type="button">
  Aggiungi al carrello
</button>
```

Link con stesso stile:

```html
<a class="sp-button sp-button--outline" href="/preventivi">
  Vedi preventivi
</a>
```

Con icona inline (SVG, no Material Symbols):

```html
<button class="sp-button sp-button--secondary" type="button">
  <span class="sp-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5v14" stroke-width="2" stroke-linecap="round" />
    </svg>
  </span>
  Aggiungi
</button>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.sp-button` | shell del bottone, applica padding/radius/font/transition | yes | `--primary`, `--secondary`, `--outline`, `--ghost`, `--dashed`, `--sm`, `--full`, `--disabled` |
| `.sp-button__icon` | wrapper inline 1.125rem per SVG icon | no | — |
| `.sp-button--disabled` | stato disabilitato per `<a>` o controlli non disabilitabili nativamente | no | — |

Modifier aggiuntivo:

| Class | Role |
|---|---|
| `.sp-button--dashed` | comando full-width con bordo tratteggiato, usato per aggiungere destinazioni/righe |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `type="button"` | `<button>` | no | Raccomandato quando il button non e' un submit. |
| `disabled` | `<button>` | no | Stato disabilitato nativo. |
| `aria-disabled="true"` | `<a>` o `.sp-button--disabled` | no | Necessario per link disabilitati (no `disabled` su `<a>`). |
| `href` | `<a>` | yes (se tag `<a>`) | Target di navigazione. |

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.sp-button.is-disabled` (compound) | `.sp-button.sp-button--disabled` |
| `.is-disabled` (standalone) | `.sp-button--disabled` (sempre namespacato) |

`.sp-button[aria-disabled="true"]` resta invariato (attributo ARIA nativo).

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/button.css" />
```

Oppure via bundle (gia' include `button.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` → `primitives-button--default`
- `Variants` → `primitives-button--variants`
- `WithIcon` → `primitives-button--with-icon`
- `FullWidth` → `primitives-button--full-width`
- `Dashed` → `primitives-button--dashed`
- `Disabled` → `primitives-button--disabled`
- `ReferenceFromOriginal` → `primitives-button--reference-from-original`

## Token usati

`--radius-full`, `--radius-xl`, `--radius-sm`, `--font-size-sm`, `--font-weight-semibold`, `--font-weight-medium`, `--line-height-normal`, `--transition-fast`, `--color-border-focus`, `--color-primary`, `--color-primary-dark`, `--color-secondary`, `--color-secondary-dark`, `--color-secondary-light`, `--color-bg-white`, `--color-bg-gray-50`, `--color-bg-gray-200`, `--color-text`, `--color-text-light`, `--color-border`, `--shadow-lg`, `--shadow-xl`.

Valori letterali mantenuti dal catalogo:
- `rgba(28, 114, 100, 0.08)` su hover di `.sp-button--ghost`.

## Note CMS

- testo del bottone e attributi nativi (`type`, `href`, `disabled`).
- elemento HTML usato (`<button>` vs `<a>`).
- stato iniziale disabled quando necessario.
- eventuale icona inline SVG nello slot `.sp-button__icon`.

## Classi pubbliche

`.sp-button`, `.sp-button__icon` e i modifier `.sp-button--primary`, `.sp-button--secondary`, `.sp-button--outline`, `.sp-button--ghost`, `.sp-button--dashed`, `.sp-button--sm`, `.sp-button--full`, `.sp-button--disabled`.

## Data hooks

Nessun hook `data-*` pubblico. `Button` e' CSS-only.

## Modifier / stati

Varianti visuali, dimensione small/full-width e stato disabled. Gli stati hover/focus sono gestiti dal CSS; loading e pressed state non fanno parte del contratto.

## Backend owns

Testo, destinazione link, tipo submit/button, stato disabled iniziale, eventuale SVG inline e gestione click/submit/routing.

## Library owns

Spaziatura, colori, radius, focus ring, allineamento icona/testo e resa disabled.

## Demo-only

Eventuali handler di click, analytics, label di esempio e URL dimostrativi nelle lab page.

## Out of scope

- icon-only button.
- bottoni specifici dashboard, checkout o landing.
- loading spinner.
- gestione submit, routing o tracking.
- Material Symbols come dipendenza runtime globale.
