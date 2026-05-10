---
title: MediaChoiceCard
description: Card generica selezionabile con immagine per presentation type CMS "media choice".
layer: components
strategy: css-only
sources:
  demo: product-page-integration/js/sections/section-2.js, section-3.js, section-4.js
  catalog_css: elements-ui/css/components/_cards.css
status: beta-contract
package_path: components/media-choice-card.css
---

# MediaChoiceCard

Card generica per varianti CMS con layout "Immagine": verniciatura,
laminazione 3D, verniciatura sovracoperta e casi futuri analoghi.

Non creare componenti separati come `EffectCard`, `AletteCard` o `AngoloCard`
quando cambia solo il contenuto.

## Markup ufficiale

```html
<div class="media-choice-cards">
    <button class="media-choice-card media-choice-card--selected" type="button">
        <span class="media-choice-card__image-wrap">
            <img class="media-choice-card__image" src="effect.jpg" alt="3D Spessorata">
        </span>
        <span class="media-choice-card__label">3D Spessorata</span>
    </button>
</div>
```

Variante preview non fotografica:

```html
<button class="media-choice-card media-choice-card--selected" type="button">
    <span class="media-choice-card__preview" style="border-radius: 8px;">
        <span class="media-choice-card__label">R8</span>
    </span>
    <span class="media-choice-card__meta">8mm</span>
</button>
```

## Classi pubbliche

| Classe | Ruolo |
|---|---|
| `.media-choice-cards` | wrapper flex |
| `.media-choice-cards--grid` | wrapper grid 3/6 colonne |
| `.media-choice-card` | card opzione 6.5rem x min 7.75rem |
| `.media-choice-card--selected` | stato selezionato |
| `.media-choice-card--disabled` | stato disabilitato |
| `.media-choice-card__image-wrap` | cornice immagine 5rem x 5rem |
| `.media-choice-card__image` | immagine |
| `.media-choice-card__preview` | preview disegnata / geometrica 4rem x 4rem |
| `.media-choice-card__label` | label |
| `.media-choice-card__meta` | sottotesto/meta |

## Integrazione CMS

Il backend mappa `Layout = Immagine` a `MediaChoiceCard`. I nomi variante
(`Verniciatura`, `Laminazione 3D`, `Angoli arrotondati`) restano dati CMS, non
nomi componente.

Fuori scope: prezzi, regole carta compatibile, limitazioni opzioni, anteprima
ingrandita e scroll/frecce.
