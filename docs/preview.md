---
title: Preview
description: Controllo selezionabile + trigger anteprima + pannello inline per dati CMS.
layer: components
strategy: css-js
sources:
  demo: product-page-integration/js/sections/section-1.js, js/sections/helpers.js
  catalog_css: elements-ui/css/components/_buttons.css, _cards.css
status: public-contract
package_path: components/preview.css
---

# Preview

`Preview` copre il pattern generico del configuratore: una select o un gruppo di
bottoni/card, bottone Anteprima e pannello inline con immagine e testo.

## Markup ufficiale

```html
<div class="preview" data-preview>
    <div class="preview__row">
        <div class="preview__select">
            <select class="sp-form-select">
                <option data-preview-title="Patinata Opaca"
                        data-preview-description="Descrizione carta dal CMS."
                        data-preview-image="paper.jpg">
                    Patinata Opaca
                </option>
            </select>
        </div>
        <button class="preview__trigger" type="button"
                data-preview-trigger
                aria-controls="preview-panel"
                aria-expanded="false">
            <span>Anteprima</span>
        </button>
    </div>
    <div id="preview-panel" class="preview__panel"
         data-preview-panel aria-hidden="true">
        <div class="preview__content">
            <div class="preview__image-wrap">
                <div class="preview__image">
                    <img class="preview__image-media" src="paper.jpg" alt="Patinata Opaca">
                </div>
            </div>
            <div class="preview__info">
                <div class="preview__header">
                    <h4 class="preview__title">Patinata Opaca</h4>
                    <button class="preview__close" type="button" data-preview-close
                            aria-label="Chiudi anteprima"></button>
                </div>
                <p class="preview__description">Descrizione carta dal CMS.</p>
            </div>
        </div>
    </div>
</div>
```

## Classi pubbliche

| Classe | Ruolo |
|---|---|
| `.preview` | root |
| `.preview--open` | stato aperto |
| `.preview__row` | controllo + trigger |
| `.preview__select` | wrapper select o gruppo controlli |
| `.preview__trigger` | bottone anteprima |
| `.preview__panel` | pannello inline |
| `.preview__content` | layout immagine + testo |
| `.preview__image-wrap` | wrapper media |
| `.preview__image` | cornice immagine |
| `.preview__image-media` | immagine |
| `.preview__placeholder` | fallback immagine |
| `.preview__info` | contenuti testuali |
| `.preview__header` | titolo + close |
| `.preview__title` | titolo carta |
| `.preview__close` | chiusura |
| `.preview__description` | descrizione |

## Hook JS

| Hook | Ruolo |
|---|---|
| `[data-preview]` | root init |
| `[data-preview-trigger]` | toggle open/close |
| `[data-preview-panel]` | pannello controllato |
| `[data-preview-close]` | chiusura |
| `data-preview-title` | titolo da sincronizzare da option/card |
| `data-preview-description` | descrizione da sincronizzare da option/card |
| `data-preview-image` | immagine da sincronizzare da option/card |
| `data-preview-alt` | alt immagine opzionale |

Eventi: `sp:preview:open`, `sp:preview:close`,
`sp:preview:sync`.

## Integrazione CMS

Il CMS decide label, opzioni, immagine, alt, descrizione e stato iniziale.
Eventuali metadati come FSC o certificazioni vanno inseriti nel testo
descrittivo.
La libreria decide layout, stati visuali, ARIA base, comportamento open/close,
sincronizzazione del pannello con la selezione corrente e icona chrome del
bottone trigger/close. Il consumer non deve inserire SVG o immagini dentro
`.preview__trigger` e `.preview__close`.

La sorgente puo' essere:

- una `<option>` della select;
- un bottone/card dentro la root, per esempio `.media-choice-card`.

La sorgente espone i dati tramite `data-preview-*`. Se una `.media-choice-card`
non espone `data-preview-image` ma contiene `.media-choice-card__preview`, la
libreria genera un placeholder SVG coerente con il colore della preview.

Fuori scope: cataloghi prodotto, calcolo prezzi/spessori, mapping variante/prezzo, API.
