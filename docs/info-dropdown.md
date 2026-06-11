---
title: InfoDropdown
description: Pannello collapsible inline per aiuto contestuale accanto a una label, con titolo auto-derivato e behavior toggle.
layer: primitives
strategy: css-js
package_path: primitives/info-dropdown.css
js_path: js/info-dropdown.js
---

# InfoDropdown

Disclosure inline per pannelli di aiuto contestuale: un bottone con icona info
(`.sp-info-btn`) accanto a una label apre un pannello collapsible
(`.sp-info-dropdown`) con titolo, body HTML libero e bottone close. Contratto
semplificato: il CMS scrive solo il body; la libreria auto-deriva il titolo
dalla `.sp-label-text` adiacente e auto-inietta header e wrapper body al primo
init.

## Anatomy

```text
label-row
├── label-text                          (testo label, fonte del titolo)
└── info-btn[data-info-dropdown-info-trigger][aria-controls=ID]   (trigger)

info-dropdown#ID  [data-info-dropdown] [info-dropdown--hidden]
├── info-dropdown__header               (auto-iniettato)
│   ├── info-dropdown__title            (auto da label-text)
│   └── info-dropdown__close            (auto-creato)
└── info-dropdown__body                 (auto-wrappato attorno al contenuto CMS)
    └── info-note (opzionale) → info-note__title + <p>
```

## Markup contract

Il consumer fornisce solo il body:

```html
<div class="sp-form-field">
    <div class="sp-label-row">
        <label class="sp-label-text">Formato (mm)</label>
        <button type="button" class="sp-info-btn" data-info-dropdown-info-trigger
                aria-controls="info-formato" aria-expanded="false" aria-label="Mostra informazioni"></button>
    </div>
    <div id="info-formato" class="sp-info-dropdown sp-info-dropdown--hidden"
         data-info-dropdown role="region" aria-hidden="true">
        <p>Il <strong>formato</strong> indica le dimensioni del prodotto finito.</p>
        <div class="sp-info-note">
            <p class="sp-info-note__title">Nota tolleranze</p>
            <p>Riduzione fino al 99% possibile per stampa.</p>
        </div>
    </div>
</div>
```

Richiesto:
- `data-info-dropdown-info-trigger` su `.sp-info-btn`.
- `data-info-dropdown` su `.sp-info-dropdown`.
- `aria-controls` del trigger = `id` del dropdown.
- `.sp-info-dropdown--hidden` per stato chiuso iniziale.
- Niente SVG/immagini dentro `.sp-info-btn`: l'icona e' generata via CSS.

## Data hooks

| Hook | Ruolo |
|---|---|
| `[data-info-dropdown-info-trigger]` | trigger (combinato con `[aria-controls]`) |
| `[data-info-dropdown]` | pannello collapsible |

Le classi `.sp-info-dropdown__header/__title/__close/__body` sono usate dalla
libreria come relazione DOM BEM stabile (auto-injection + delegated close), non
come hook entry.

## API JS / Eventi

```js
window.SkillpressUI.InfoDropdown.init(rootOrSelector?)
```

Auto-eseguito su `DOMContentLoaded` con scope `document`. Idempotente. Per
markup montato dinamicamente, richiamare `init(root)` sul container.

Eventi (bubbling, sul `.sp-info-dropdown`):
- `sp:info-dropdown:open`
- `sp:info-dropdown:close`

## Behavior

- Click trigger → toggle `.sp-info-dropdown--hidden` + sync `aria-expanded`/`aria-hidden`.
- Click `.sp-info-dropdown__close` → chiudi.
- ESC → chiudi tutti i dropdown aperti.
- Click outside → chiudi tutti.
- Apertura singola: aprire un dropdown chiude gli altri.

## Override esplicito

Se il consumer scrive gia' `.sp-info-dropdown__header` come primo figlio,
l'auto-injection viene saltata (idem per `.sp-info-dropdown__body` esplicito).

## Fuori scope

Modal overlay, focus trap / focus restore.
