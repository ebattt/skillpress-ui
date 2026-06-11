---
title: ConfirmDialog
description: Dialog modale di conferma per azioni distruttive o cambi di stato con perdita di impostazioni.
layer: primitives
strategy: css-js
package_path: primitives/sp-confirm-dialog.css
js_path: js/confirm-dialog.js
---

# ConfirmDialog

Primitive per conferme bloccanti. La libreria gestisce apertura, chiusura, Escape, backdrop, focus restore ed eventi; il consumer possiede testi, azione finale e stato applicativo.

## Markup contract

```html
<button class="sp-button sp-button--primary" type="button" data-confirm-dialog-open="#mode-change-confirm-dialog">
    Apri conferma
</button>

<div id="mode-change-confirm-dialog" class="sp-confirm-dialog" data-confirm-dialog role="presentation" aria-hidden="true" hidden>
    <div class="sp-confirm-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="mode-change-confirm-dialog-title" tabindex="-1">
        <div class="sp-confirm-dialog__header">
            <div class="sp-confirm-dialog__heading">
                <span class="sp-confirm-dialog__icon" aria-hidden="true"></span>
                <h3 id="mode-change-confirm-dialog-title" class="sp-confirm-dialog__title">Conferma cambio modalità</h3>
            </div>
            <button class="sp-confirm-dialog__close" type="button" data-confirm-dialog-role="close" aria-label="Chiudi"></button>
        </div>
        <div class="sp-confirm-dialog__body">
            <p class="sp-confirm-dialog__text">Testo della conferma.</p>
        </div>
        <div class="sp-confirm-dialog__actions">
            <button class="sp-button sp-button--outline" type="button" data-confirm-dialog-role="cancel">Annulla</button>
            <button class="sp-button sp-button--primary" type="button" data-confirm-dialog-role="confirm">Conferma</button>
        </div>
    </div>
</div>
```

## Classi pubbliche

`.sp-confirm-dialog`, `__panel`, `__header`, `__heading`, `__icon`, `__title`, `__close`, `__body`, `__text`, `__actions`.

## Data hooks

- `data-confirm-dialog`: root.
- `data-confirm-dialog-open="#id"`: opener esterno.
- `data-confirm-dialog-role="close|cancel|confirm"`: ruolo dei button interni.

## JS

`window.SkillpressUI.ConfirmDialog`:

- `init(scope)`
- `open(root, triggerEl, detail)`
- `close(root, detail)`
- `confirm(root, detail)`
- `cancel(root, detail)`

Eventi: `sp:confirm-dialog:open`, `sp:confirm-dialog:close`, `sp:confirm-dialog:confirm`, `sp:confirm-dialog:cancel`.

## Backend owns

Titolo, copy, label dei bottoni e azione da eseguire su `sp:confirm-dialog:confirm` (reset configurazione, chiamate API).
