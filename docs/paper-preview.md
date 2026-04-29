---
title: PaperPreview
description: Select carta + trigger anteprima + pannello inline per dati carta CMS.
layer: components
strategy: css-js
sources:
  demo: product-page-integration/js/sections/section-1.js, js/sections/helpers.js
  catalog_css: elements-ui/css/components/_buttons.css, _cards.css
status: local
package_path: components/paper-preview.css
---

# PaperPreview

`PaperPreview` copre il pattern carta del configuratore: select carta, bottone
Anteprima e pannello inline con immagine, testo e badge.

## Markup ufficiale

```html
<div class="paper-preview" data-paper-preview>
    <div class="paper-preview__row">
        <div class="paper-preview__select">
            <select class="form-select">
                <option>Patinata Opaca</option>
            </select>
        </div>
        <button class="paper-preview__trigger" type="button"
                data-paper-preview-trigger
                aria-controls="paper-preview-panel"
                aria-expanded="false">
            <!-- SVG visibility -->
            Anteprima
        </button>
    </div>
    <div id="paper-preview-panel" class="paper-preview__panel"
         data-paper-preview-panel aria-hidden="true">
        <div class="paper-preview__content">
            <div class="paper-preview__image-wrap">
                <div class="paper-preview__image">
                    <img class="paper-preview__image-media" src="paper.jpg" alt="Patinata Opaca">
                </div>
            </div>
            <div class="paper-preview__info">
                <div class="paper-preview__header">
                    <h4 class="paper-preview__title">Patinata Opaca</h4>
                    <button class="paper-preview__close" type="button" data-paper-preview-close>
                        <!-- SVG close -->
                    </button>
                </div>
                <p class="paper-preview__description">Descrizione carta dal CMS.</p>
                <div class="paper-preview__badges">
                    <span class="paper-preview__badge">FSC</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Classi pubbliche

| Classe | Ruolo |
|---|---|
| `.paper-preview` | root |
| `.paper-preview--open` | stato aperto |
| `.paper-preview__row` | select + trigger |
| `.paper-preview__select` | wrapper select |
| `.paper-preview__trigger` | bottone anteprima |
| `.paper-preview__panel` | pannello inline |
| `.paper-preview__content` | layout immagine + testo |
| `.paper-preview__image-wrap` | wrapper media |
| `.paper-preview__image` | cornice immagine |
| `.paper-preview__image-media` | immagine |
| `.paper-preview__placeholder` | fallback immagine |
| `.paper-preview__info` | contenuti testuali |
| `.paper-preview__header` | titolo + close |
| `.paper-preview__title` | titolo carta |
| `.paper-preview__close` | chiusura |
| `.paper-preview__description` | descrizione |
| `.paper-preview__badges` | lista badge |
| `.paper-preview__badge` | badge/metadato |

## Hook JS

| Hook | Ruolo |
|---|---|
| `[data-paper-preview]` | root init |
| `[data-paper-preview-trigger]` | toggle open/close |
| `[data-paper-preview-panel]` | pannello controllato |
| `[data-paper-preview-close]` | chiusura |

Eventi: `sp:paper-preview:open`, `sp:paper-preview:close`.

## Integrazione CMS

Il CMS decide label, option, immagine, alt, descrizione, badge e stato iniziale.
La libreria decide layout, stati visuali, ARIA base e comportamento open/close.

Fuori scope: catalogo carte, calcolo spessore, mapping variante/prezzo, API.
