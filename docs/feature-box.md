---
title: FeatureBox
description: Griglia 2 colonne di feature highlight con icona slot, titolo e descrizione.
layer: components
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_cards.css#L982-L1030
  catalog_js: elements-ui/js/cards/card-feature.js
  demo: product-page-integration/index.html
status: post-bem-2026-04-29
package_path: components/feature-box.css
---

# FeatureBox

Griglia di feature box a 2 colonne, ciascuna con contenitore icona, titolo e descrizione. La libreria controlla layout, padding e tipografia; l'icona e' uno slot editoriale (SVG inline o `<img>` da URL CMS) e il colore di sfondo dell'icona si imposta inline dal consumer.

## Anatomy

```text
FeatureBox
├── feature-grid                       (grid 2 col, gap 0.75rem)
│   └── feature-box × N                (background, radius, padding 0.875rem)
│       └── feature-box__content       (flex row, align-items: flex-start, gap 0.75rem)
│           ├── feature-box__icon      (2.25rem quadrato, slot SVG/img 1.25rem)
│           └── <div>                  (wrapper testo)
│               ├── feature-box__title          (h3, font-size sm, semibold)
│               └── feature-box__description    (p, font-size xs, text-light)
```

Cardinalita' tipica nella demo: 4 feature box (2 righe × 2 col).

## Markup contract

Markup verbatim dalla pagina demo `product-page-integration` (dentro `.product-hero__info` del ProductHero). Una feature box; ripetere `.feature-box` × N dentro `.feature-grid`.

```html
<div class="feature-grid">
    <div class="feature-box">
        <div class="feature-box__content">
            <div class="feature-box__icon" style="background-color: #E8F5F3;">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
                    <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
                </svg>
            </div>
            <div>
                <h3 class="feature-box__title">Veloce</h3>
                <p class="feature-box__description">Stampa brossura fresata con ciclo rapido</p>
            </div>
        </div>
    </div>
</div>
```

Inline style data-rating-driven: `style="background-color: #...;"` su `.feature-box__icon` e' editoriale (CMS sceglie un colore brand per ogni feature). La libreria fornisce solo contenitore stabile.

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.feature-grid` | grid 2 colonne, gap 0.75rem | yes | — |
| `.feature-box` | card singola, background gray-50, radius lg, padding 0.875rem; hover cambia background | yes | — |
| `.feature-box__content` | flex row interno (icona + testo), gap 0.75rem | yes | — |
| `.feature-box__icon` | contenitore icona quadrato 2.25rem, radius md; SVG/img figli ridimensionati a 1.25rem | yes | — |
| `.feature-box__title` | h3, font-size sm, semibold | yes | — |
| `.feature-box__description` | p, font-size xs, color text-light | yes | — |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `style="background-color: #...;"` | `.feature-box__icon` | no | Colore di sfondo icona, editoriale CMS. |
| `aria-hidden="true"` | `<svg>` icona | no | Da impostare se l'icona e' decorativa. |
| `alt=""` | `<img>` icona | no | Alt vuoto se l'icona e' decorativa. |

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.feature-box-content` | `.feature-box__content` |
| `.feature-box-icon` | `.feature-box__icon` |
| `.feature-box-title` | `.feature-box__title` |
| `.feature-box-description` | `.feature-box__description` |

`.feature-grid` (utility container) e `.feature-box` (block) sono invariati.

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/components/feature-box.css" />
```

Oppure via bundle (gia' include `feature-box.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` → `components-featurebox--default`
- `ReferenceFromElementsUI` → `components-featurebox--reference-from-elements-ui`
- `ComposedForCMS` → `components-featurebox--composed-for-cms`

## Token usati

`--color-bg-gray-50`, `--color-bg-gray-100`, `--color-text`, `--color-text-light`, `--radius-lg`, `--radius-md`, `--font-size-sm`, `--font-size-xs`, `--font-weight-semibold`, `--line-height-snug`, `--transition-fast`.

## Note CMS

- testo titolo: contenuto di `.feature-box__title`.
- testo descrizione: contenuto di `.feature-box__description`.
- icona: SVG inline o `<img src="...">` dentro `.feature-box__icon`. La libreria ridimensiona figli a 1.25rem.
- colore di sfondo icona: `style="background-color: #...;"` inline su `.feature-box__icon`.
- numero di feature: ripetere `.feature-box` × N dentro `.feature-grid` (tipicamente 4 nella demo prodotto).

## Out of scope

- variante a 3 colonne.
- layout colonna su mobile diverso da 2 colonne (la fonte mantiene 2 colonne).
- badge dentro la card.
- CTA dentro la card (non presente nella fonte).
- dipendenza da Material Symbols o Google Fonts.
- non sostituisce `step-indicator__item`, `paper-card`, `format-card` o `catalog-card`.
