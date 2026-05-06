# BillingFormCard

Dashboard billing create/edit form card for the `Fatturazione` view.

## Source

- Demo HTML: `Skillpress-frontend/dashboard/index.html` lines 540-656
- CSS: `Skillpress-frontend/dashboard/css/components/_billing.css` lines 17-174
- Demo JS behavior: `Skillpress-frontend/dashboard/js/form-handlers.js` lines 35-108

## When To Use

Use `BillingFormCard` for the dashboard inline billing registry form with
compact two/three-column rows, dashboard-specific labels, selects and footer
actions.

Do not use it for checkout billing forms, generic product-page form fields or
tables. Use `FormLayout`, `FormPrimitives`, `Button`, `Card`, `BillingTable`
or `InvoiceTable` for those contracts.

## Markup Contract

```html
<div class="billing-form-card" id="billing-form-card" data-billing-form-card hidden>
    <h3 class="billing-form-card__title"
        data-billing-form-card-title
        data-create-label="Nuova anagrafica"
        data-edit-label="Modifica anagrafica">Nuova anagrafica</h3>
    <form class="billing-form" data-form="billing">
        <div class="billing-form__row">
            <div class="billing-form__field">
                <label class="billing-form__label" for="bf-name">Nome *</label>
                <input class="billing-form__input" id="bf-name" type="text" required>
            </div>
            <div class="billing-form__field">
                <label class="billing-form__label" for="bf-cf">Codice Fiscale</label>
                <input class="billing-form__input" id="bf-cf" type="text">
            </div>
        </div>
        <div class="billing-form__footer">
            <button class="billing-form__btn billing-form__btn--secondary"
                    type="button"
                    data-billing-form-card-close>Annulla</button>
            <button class="billing-form__btn billing-form__btn--primary"
                    type="submit"
                    data-billing-form-card-submit
                    data-create-label="Crea anagrafica"
                    data-edit-label="Salva modifiche">Crea anagrafica</button>
        </div>
    </form>
</div>

<button type="button"
        data-billing-form-card-open
        data-billing-form-card-target="billing-form-card"
        data-billing-form-card-mode="create">
    Aggiungi
</button>
```

## Public Classes

- `.billing-form-card`
- `.billing-form-card--active`
- `.billing-form-card__title`
- `.billing-form`
- `.billing-form__row`
- `.billing-form__row--3`
- `.billing-form__row--piva`
- `.billing-form__field`
- `.billing-form__field--full`
- `.billing-form__label`
- `.billing-form__input`
- `.billing-form__input--flex`
- `.billing-form__select`
- `.billing-form__inline-field`
- `.billing-form__prefix`
- `.billing-form__hr`
- `.billing-form__section-label`
- `.billing-form__footer`
- `.billing-form__btn`
- `.billing-form__btn--primary`
- `.billing-form__btn--secondary`

## Data Hooks

- `[data-billing-form-card]`: root.
- `[data-billing-form-card-open]`: external opener.
- `[data-billing-form-card-target]`: root id controlled by an opener.
- `[data-billing-form-card-mode]`: `create` or `edit`.
- `[data-billing-form-card-close]`: close/cancel button.
- `[data-billing-form-card-title]`: title text managed by the UI runtime.
- `[data-billing-form-card-submit]`: submit label managed by the UI runtime.

## Behavior

`window.SkillpressUI.BillingFormCard.init(root)` wires open and close UI only.
Opening removes `hidden`, applies `.billing-form-card--active`, sets
`aria-hidden="false"` and updates create/edit labels. Closing restores
`hidden` and `aria-hidden="true"`.

The runtime emits `sp:billing-form-card-open` and
`sp:billing-form-card-close`. It does not save data, validate fields, populate
edit values, call APIs or decide preferred billing/shipping state.

## Backend/App Owns

- Field names, ids, values, options and required attributes.
- Create/edit data population.
- Validation and error messages.
- Submit handling and persistence.
- Whether the opener is shown or hidden while the form is open.

## Library Owns

- Dashboard billing card surface, spacing, typography and responsive rows.
- Compact billing input/select/button look.
- UI-only open/close state and create/edit title/submit labels.

## Reuse Audit

`FormLayout` provides checkout form rows but not the dashboard billing card
surface, field scale, footer divider or `.billing-form__*` contract.
`FormPrimitives` covers generic fields but not this dashboard-specific form
family. `Button` does not match the compact rounded footer buttons from the
real billing form. `Card` is too generic and would require consumer CSS to
recreate the form. `BillingTable` and `InvoiceTable` cover adjacent tables only.
