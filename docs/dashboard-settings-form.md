# DashboardSettingsForm

Dashboard settings card/form family for account, profile and password settings
views.

## Source

- Demo HTML: `Skillpress-frontend/dashboard/index.html` lines 1105-1177
- CSS: `Skillpress-frontend/dashboard/css/components/_cards.css` lines 219-237
- CSS: `Skillpress-frontend/dashboard/css/components/_forms.css` lines 15-115
- CSS: `Skillpress-frontend/dashboard/css/components/_buttons.css` lines 17-61 and 113-134
- Demo JS behavior: `Skillpress-frontend/dashboard/js/form-handlers.js` lines 114-187

## When To Use

Use `DashboardSettingsForm` for dashboard settings cards with compact fields,
read-only/editable sections and inline form actions.

Do not use it as a profile page component. The backend/app decides which cards,
fields and forms exist. The library provides the dashboard settings UI family
and the edit/cancel/save UI behavior.

## Markup Contract

```html
<div class="dashboard-settings-form" data-dashboard-settings-form>
    <div class="dashboard-settings-form__grid">
        <article class="dashboard-settings-form__card">
            <div class="dashboard-settings-form__header">
                <h2 class="dashboard-settings-form__title">Informazioni Personali</h2>
                <button class="dashboard-settings-form__edit"
                        type="button"
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
                        <input class="dashboard-settings-form__input"
                               id="first-name"
                               type="text"
                               value="Giacomo"
                               data-dashboard-settings-form-field
                               disabled>
                    </div>
                    <div class="dashboard-settings-form__field">
                        <label class="dashboard-settings-form__label" for="last-name">Cognome</label>
                        <input class="dashboard-settings-form__input"
                               id="last-name"
                               type="text"
                               value="Battiston"
                               data-dashboard-settings-form-field
                               disabled>
                    </div>
                </div>
                <div class="dashboard-settings-form__actions dashboard-settings-form__actions--hidden"
                     data-dashboard-settings-form-actions>
                    <button class="dashboard-settings-form__button dashboard-settings-form__button--primary"
                            type="button"
                            data-dashboard-settings-form-save="personal">Salva Modifiche</button>
                    <button class="dashboard-settings-form__button dashboard-settings-form__button--secondary"
                            type="button"
                            data-dashboard-settings-form-cancel="personal">Annulla</button>
                </div>
            </form>
        </article>
    </div>
</div>
```

## Public Classes

- `.dashboard-settings-form`
- `.dashboard-settings-form__grid`
- `.dashboard-settings-form__card`
- `.dashboard-settings-form__header`
- `.dashboard-settings-form__title`
- `.dashboard-settings-form__form`
- `.dashboard-settings-form__form--stack`
- `.dashboard-settings-form__row`
- `.dashboard-settings-form__row--2`
- `.dashboard-settings-form__field`
- `.dashboard-settings-form__label`
- `.dashboard-settings-form__input`
- `.dashboard-settings-form__hint`
- `.dashboard-settings-form__actions`
- `.dashboard-settings-form__actions--hidden`
- `.dashboard-settings-form__spacer`
- `.dashboard-settings-form__button`
- `.dashboard-settings-form__button--primary`
- `.dashboard-settings-form__button--secondary`
- `.dashboard-settings-form__edit`
- `.dashboard-settings-form__edit--hidden`
- `.dashboard-settings-form__edit-icon`

## Data Hooks

- `[data-dashboard-settings-form]`: root.
- `[data-dashboard-settings-form-section]`: editable section id.
- `[data-dashboard-settings-form-field]`: input controlled by edit/cancel.
- `[data-dashboard-settings-form-actions]`: action row for an editable section.
- `[data-dashboard-settings-form-edit]`: edit trigger, value matches a section id.
- `[data-dashboard-settings-form-save]`: save UI trigger.
- `[data-dashboard-settings-form-cancel]`: cancel UI trigger.

## Behavior

`window.SkillpressUI.DashboardSettingsForm.init(root)` wires each
`[data-dashboard-settings-form]` idempotently.

The runtime enables fields for an edited section, stores a value snapshot,
shows the action row and hides the edit trigger. Cancel restores the snapshot
and disables fields. Save disables fields and emits
`sp:dashboard-settings-form:save`.

It also emits `sp:dashboard-settings-form:edit` and
`sp:dashboard-settings-form:close`.

## Backend/App Owns

- User data, field names, values and required attributes.
- Which cards and sections are rendered.
- Submit, validation, password policy, API calls and persisted state.
- Success/error messages.

## Library Owns

- Dashboard settings card layout, spacing, typography and responsive grid.
- Compact field, hint, edit link and action button look.
- UI-only edit/cancel/save state.

## Reuse Audit

`Card` is too generic and would need consumer CSS for header/actions and field
scale. `FormPrimitives` covers generic product form fields, not the dashboard
settings contract. `FormLayout` is checkout-oriented. `Button` covers generic
actions but not the compact dashboard action buttons and edit link.
`BillingFormCard` is intentionally billing-specific: its open/close behavior
and `.billing-form__*` classes should not be reused for account/profile views.
