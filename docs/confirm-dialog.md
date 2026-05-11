---
title: ConfirmDialog
description: Dialog modale di conferma per azioni distruttive o cambi di stato con perdita di impostazioni.
layer: primitives
strategy: css-js
status: beta
package_path: primitives/sp-confirm-dialog.css
---

# ConfirmDialog

Primitive per conferme bloccanti. La libreria gestisce apertura, chiusura, Escape, backdrop, focus restore ed eventi; il consumer possiede testi, azione finale e stato applicativo.

## Markup contract

```html
<button class="sp-button sp-button--primary" type="button" data-confirm-dialog-open="#mode-change-confirm-dialog">
    Apri conferma
</button>

<div id="mode-change-confirm-dialog"
     class="sp-confirm-dialog"
     data-confirm-dialog
     role="presentation"
     aria-hidden="true"
     hidden>
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

## API

Classi pubbliche:

- `.sp-confirm-dialog`
- `.sp-confirm-dialog__panel`
- `.sp-confirm-dialog__header`
- `.sp-confirm-dialog__heading`
- `.sp-confirm-dialog__icon`
- `.sp-confirm-dialog__title`
- `.sp-confirm-dialog__close`
- `.sp-confirm-dialog__body`
- `.sp-confirm-dialog__text`
- `.sp-confirm-dialog__actions`

Data hooks:

- `data-confirm-dialog`
- `data-confirm-dialog-open="#id"`
- `data-confirm-dialog-role="close|cancel|confirm"`

JS:

- `window.SkillpressUI.ConfirmDialog.init(scope)`
- `window.SkillpressUI.ConfirmDialog.open(root, triggerEl, detail)`
- `window.SkillpressUI.ConfirmDialog.close(root, detail)`
- `window.SkillpressUI.ConfirmDialog.confirm(root, detail)`
- `window.SkillpressUI.ConfirmDialog.cancel(root, detail)`

Eventi:

- `sp:confirm-dialog:open`
- `sp:confirm-dialog:close`
- `sp:confirm-dialog:confirm`
- `sp:confirm-dialog:cancel`

## Backend owns

- Titolo, copy e label dei bottoni.
- Azione da eseguire quando arriva `sp:confirm-dialog:confirm`.
- Eventuali reset di configurazione o chiamate API.
