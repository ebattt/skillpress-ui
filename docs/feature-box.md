---
title: FeatureBox
description: Griglia 2 colonne di feature highlight con icona slot, titolo e descrizione.
layer: components
strategy: css-only
package_path: components/feature-box.css
---

# FeatureBox

Griglia di feature box a 2 colonne, ciascuna con contenitore icona, titolo e
descrizione. La libreria controlla layout, padding e tipografia; l'icona e' uno
slot editoriale (SVG inline o `<img>` da URL CMS) e il colore di sfondo
dell'icona si imposta inline dal consumer. CSS-only.

## Anatomy

```text
FeatureBox
├── feature-grid                       (grid 2 col, gap 0.75rem)
│   └── feature-box × N                (background, radius, padding 0.875rem)
│       └── feature-box__content       (flex row, align-items: flex-start, gap 0.75rem)
│           ├── feature-box__icon      (2.25rem quadrato, slot SVG/img 1.25rem)
│           └── <div>
│               ├── feature-box__title
│               └── feature-box__description
```

## Markup contract

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

## Classi pubbliche

| Classe | Ruolo | Required |
|---|---|---|
| `.feature-grid` | grid 2 colonne, gap 0.75rem | yes |
| `.feature-box` | card singola, hover cambia background | yes |
| `.feature-box__content` | flex row interno (icona + testo) | yes |
| `.feature-box__icon` | contenitore icona 2.25rem; figli SVG/img a 1.25rem | yes |
| `.feature-box__title` | h3 | yes |
| `.feature-box__description` | p | yes |

`style="background-color: #...;"` su `.feature-box__icon` e' editoriale (CMS).

## Installation

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/feature-box.css" />
```

Anche via bundle `bundles/demo-minimal.css`. Nessun JS richiesto.

## Note CMS

- testo titolo/descrizione: contenuto di `__title` / `__description`.
- icona: SVG inline o `<img>` dentro `.feature-box__icon`.
- colore sfondo icona: `style="background-color: #...;"` inline.
- numero feature: ripetere `.feature-box` × N dentro `.feature-grid`.

## Fuori scope

Variante a 3 colonne, layout colonna su mobile, badge o CTA nella card,
Material Symbols / Google Fonts.
