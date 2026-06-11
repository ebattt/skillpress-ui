---
title: Preview
description: Controllo selezionabile + trigger anteprima + pannello inline per dati CMS.
layer: components
strategy: css-js
status: public-contract
package_path: components/preview.css
js_path: js/preview.js
---

# Preview

Pattern generico del configuratore: una select o un gruppo di bottoni/card, un
bottone Anteprima e un pannello inline con immagine e testo. La libreria gestisce
layout, stati visuali, ARIA e sincronizzazione del pannello con la selezione
corrente; opzioni, immagini e testi sono CMS/consumer.

## Markup contract

```html
<div class="preview" data-preview>
    <div class="preview__row">
        <div class="preview__select">
            <select class="sp-form-select">
                <option data-preview-option
                        data-preview-title="Patinata Opaca"
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

## Data hooks

| Hook | Ruolo |
|---|---|
| `data-preview` | root init |
| `data-preview-trigger` | toggle open/close |
| `data-preview-panel` | pannello controllato |
| `data-preview-close` | chiusura |
| `data-preview-option` | sorgente (option/card) da cui leggere i dati |
| `data-preview-title` | titolo da sincronizzare |
| `data-preview-description` | descrizione da sincronizzare |
| `data-preview-image` | immagine da sincronizzare |
| `data-preview-alt` | alt immagine opzionale |

Eventi: `sp:preview:open`, `sp:preview:close`, `sp:preview:sync`.

La sorgente puo' essere una `<option>` della select o un bottone/card dentro la
root (es. `.media-choice-card`). Espone i dati tramite `data-preview-*`.

## Ownership

- CMS/consumer: label, opzioni, immagine, alt, descrizione, stato iniziale.
- Libreria: layout, stati visuali, ARIA base, open/close, sincronizzazione del
  pannello, icona chrome di trigger/close (non inserire SVG/immagini in
  `.preview__trigger` e `.preview__close`).

## Out of scope

Cataloghi prodotto, calcolo prezzi/spessori, mapping variante/prezzo, API.
