---
title: Breadcrumb
description: Navigazione gerarchica statica con markup Schema.org BreadcrumbList.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_layout-patterns.css#L1989-L2025
  catalog_js: elements-ui/js/layout-patterns/breadcrumb.js
  demo: product-page-integration/index.html
status: published-0.2.0-alpha.0
package_path: primitives/breadcrumb.css
---

# Breadcrumb

Navigazione gerarchica statica con separatore `/` generato via `::after`. La libreria controlla layout flex, wrapping, separatore, colori di link e voce corrente, hover e focus. Il backend genera l'albero di navigazione (testo, URL, ordine, voce corrente) e il markup Schema.org `BreadcrumbList` richiesto dal contratto.

## Anatomy

```text
Breadcrumb
└── nav.breadcrumb   [aria-label="Breadcrumb"]
    └── ol.breadcrumb__list   (Schema.org BreadcrumbList)
        └── li.breadcrumb__item × N   [--current sull'ultima voce]
            ├── a.breadcrumb__link   (omessa sulla voce corrente)
            │   └── <span itemprop="name">
            └── <meta itemprop="position" content="N">
```

## Markup contract

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
    <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a class="breadcrumb__link" itemprop="item" href="/homepage">
        <span itemprop="name">Homepage</span>
      </a>
      <meta itemprop="position" content="1"/>
    </li>
    <li class="breadcrumb__item breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Pagina corrente</span>
      <meta itemprop="position" content="2"/>
    </li>
  </ol>
</nav>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.breadcrumb` | wrapper `<nav>` con `aria-label` | yes | — |
| `.breadcrumb__list` | `<ol>` flex wrap, container Schema.org | yes | — |
| `.breadcrumb__item` | `<li>` voce, separatore `/` via `::after` (tranne ultima) | yes | `--current` |
| `.breadcrumb__link` | `<a>` link delle voci non correnti | no | — |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `aria-label="Breadcrumb"` | `<nav>` | yes | Etichetta accessibile della navigazione. |
| `itemscope` + `itemtype="https://schema.org/BreadcrumbList"` | `.breadcrumb__list` | yes | Schema.org root. |
| `itemprop="itemListElement"` + `itemscope` + `itemtype="https://schema.org/ListItem"` | `.breadcrumb__item` | yes | Schema.org item. |
| `itemprop="item"` | `.breadcrumb__link` | yes | Schema.org link target. |
| `itemprop="name"` | `<span>` interno | yes | Testo della voce. |
| `itemprop="position"` + `content="N"` | `<meta>` | yes | Posizione numerica (1-based). |

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/breadcrumb.css" />
```

Oppure via bundle (gia' include `breadcrumb.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` → `primitives-breadcrumb--default`
- `TwoLevels` → `primitives-breadcrumb--two-levels`
- `ReferenceFromElementsUI` → `primitives-breadcrumb--reference-from-elements-ui`

## Token usati

`--spacing-xs`, `--font-size-sm`, `--font-weight-medium`, `--line-height-normal`, `--color-text`, `--color-text-secondary`, `--color-text-muted`, `--color-primary`, `--color-border-focus`, `--radius-sm`, `--transition-fast`.

## Note CMS

- testo di ogni voce.
- URL dei link (su voci non correnti).
- numero di livelli e ordine delle voci.
- quale voce e' corrente (classe `--current` + omissione `<a>`).
- markup Schema.org richiesto dal contratto (`itemscope`, `itemtype`, `itemprop`, `<meta itemprop="position">`).

## Classi pubbliche

`.breadcrumb`, `.breadcrumb__list`, `.breadcrumb__item`, `.breadcrumb__item--current`, `.breadcrumb__link`.

## Data hooks

Nessun hook `data-*` pubblico. `Breadcrumb` e' CSS-only.

## Modifier / stati

Voce corrente tramite `.breadcrumb__item--current` e omissione del link. Non ci sono stati runtime.

## Backend owns

Albero navigazione, URL, ordine, voce corrente, traduzioni e markup Schema.org.

## Library owns

Layout flex/wrap, separatore `/`, colori, hover/focus link e spaziatura.

## Demo-only

Gerarchie e URL di esempio nelle lab page.

## Out of scope

- icone home o chevron al posto di `/` (variante non presente in `elements-ui`).
- troncamento o ellipsis automatico delle voci troppo lunghe.
- versione "compressed" mobile a soli due livelli con menu intermedio.
- JS di gestione overflow (il list usa `flex-wrap: wrap`).
- generazione link, categorie o traduzioni (responsabilita' del backend/CMS).
