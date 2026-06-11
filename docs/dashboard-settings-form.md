---
title: DashboardSettingsForm
description: Card/form impostazioni dashboard (profilo, account, password) con behavior UI edit/cancel/save.
layer: components
strategy: css-js
package_path: components/dashboard-settings-form.css
js_path: js/dashboard-settings-form.js
---

# DashboardSettingsForm

Famiglia di card form per le viste impostazioni della dashboard: campi compatti,
sezioni read-only/editabili e action row inline. La libreria fornisce la UI e il
behavior edit/cancel/save (UI-only); il backend/app decide quali card e campi
esistono, i dati, la validazione, la persistenza e i messaggi.

## Markup contract

```html
<div class="dashboard-settings-form" data-dashboard-settings-form>
    <div class="dashboard-settings-form__grid">
        <article class="dashboard-settings-form__card">
            <div class="dashboard-settings-form__header">
                <h2 class="dashboard-settings-form__title">Informazioni Personali</h2>
                <button class="dashboard-settings-form__edit" type="button"
                        data-dashboard-settings-form-edit="personal">
                    <span class="dashboard-settings-form__edit-icon" aria-hidden="true"></span>
                    Modifica
                </button>
            </div>
            <form class="dashboard-settings-form__form dashboard-settings-form__form--stack"
                  data-dashboard-settings-form-section="personal">
                <div class="dashboard-settings-form__row dashboard-settings-form__row--2">
                    <div class="dashboard-settings-form__field">
                        <label class="dashboard-settings-form__label" for="first-name">Nome</label>
                        <input class="dashboard-settings-form__input" id="first-name" type="text"
                               value="Giacomo" data-dashboard-settings-form-field disabled>
                    </div>
                </div>
                <div class="dashboard-settings-form__actions dashboard-settings-form__actions--hidden"
                     data-dashboard-settings-form-actions>
                    <button class="dashboard-settings-form__button dashboard-settings-form__button--primary"
                            type="button" data-dashboard-settings-form-save="personal">Salva Modifiche</button>
                    <button class="dashboard-settings-form__button dashboard-settings-form__button--secondary"
                            type="button" data-dashboard-settings-form-cancel="personal">Annulla</button>
                </div>
            </form>
        </article>
    </div>
</div>
```

## Classi pubbliche

- `.dashboard-settings-form`, `__grid`, `__card`, `__header`, `__title`
- `.dashboard-settings-form__form`, `__form--stack`
- `.dashboard-settings-form__row`, `__row--2`
- `.dashboard-settings-form__field`, `__label`, `__input`, `__hint`
- `.dashboard-settings-form__actions`, `__actions--hidden`, `__spacer`
- `.dashboard-settings-form__button`, `__button--primary`, `__button--secondary`
- `.dashboard-settings-form__edit`, `__edit--hidden`, `__edit-icon`

## Data hooks

- `[data-dashboard-settings-form]`: root.
- `[data-dashboard-settings-form-section]`: id sezione editabile.
- `[data-dashboard-settings-form-field]`: input controllato da edit/cancel.
- `[data-dashboard-settings-form-actions]`: action row della sezione.
- `[data-dashboard-settings-form-edit]`: trigger edit, valore = id sezione.
- `[data-dashboard-settings-form-save]`: trigger salva.
- `[data-dashboard-settings-form-cancel]`: trigger annulla.

## API JS

```js
window.SkillpressUI.DashboardSettingsForm.init(context);
window.SkillpressUI.DashboardSettingsForm.setEditing(root, sectionId, editing, restoreValues);
window.SkillpressUI.DashboardSettingsForm.save(root, sectionId);
```

`init` aggancia ogni `[data-dashboard-settings-form]` in modo idempotente. Edit
abilita i campi della sezione, salva uno snapshot dei valori, mostra l'action
row e nasconde il trigger edit. Cancel ripristina lo snapshot e disabilita i
campi. Save disabilita i campi.

## Eventi

- `sp:dashboard-settings-form:edit`
- `sp:dashboard-settings-form:save`
- `sp:dashboard-settings-form:close`

## Fuori scope (backend/app)

Dati utente, nomi/valori/attributi dei campi, quali card e sezioni renderizzare,
submit, validazione, password policy, chiamate API, stato persistito e
messaggi di successo/errore.
