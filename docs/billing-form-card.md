---
title: BillingFormCard
description: Form card dashboard create/edit per l'anagrafica di fatturazione.
layer: components
strategy: css-js
package_path: components/billing-form-card.css
js_path: js/billing-form-card.js
---

# BillingFormCard

Form card inline per l'anagrafica di fatturazione dashboard, con righe compatte a due/tre colonne, select e footer azioni. La libreria gestisce superficie, layout e UI-only di apertura/chiusura con label create/edit; il backend possiede campi, valori, validazione, submit e persistenza.

## Markup contract

```html
<div class="billing-form-card" id="billing-form-card" data-billing-form-card hidden>
    <h3 class="billing-form-card__title"
        data-billing-form-card-title
        data-billing-form-card-create-label="Nuova anagrafica"
        data-billing-form-card-edit-label="Modifica anagrafica">Nuova anagrafica</h3>
    <form class="billing-form" data-billing-form-card-form="billing">
        <div class="billing-form__row">
            <div class="billing-form__field">
                <label class="billing-form__label" for="bf-name">Nome *</label>
                <input class="billing-form__input" id="bf-name" type="text" required>
            </div>
        </div>
        <div class="billing-form__footer">
            <button class="billing-form__btn billing-form__btn--secondary" type="button"
                    data-billing-form-card-close>Annulla</button>
            <button class="billing-form__btn billing-form__btn--primary" type="submit"
                    data-billing-form-card-submit
                    data-billing-form-card-create-label="Crea anagrafica"
                    data-billing-form-card-edit-label="Salva modifiche">Crea anagrafica</button>
        </div>
    </form>
</div>

<button type="button"
        data-billing-form-card-open
        data-billing-form-card-target="billing-form-card"
        data-billing-form-card-mode="create">Aggiungi</button>
```

## Classi pubbliche

- `.billing-form-card`, `.billing-form-card--active`, `.billing-form-card__title`
- `.billing-form`, `.billing-form__row`, `--3`, `--piva`
- `.billing-form__field`, `--full`
- `.billing-form__label`, `.billing-form__input`, `--flex`, `.billing-form__select`
- `.billing-form__inline-field`, `.billing-form__prefix`, `.billing-form__hr`, `.billing-form__section-label`
- `.billing-form__footer`, `.billing-form__btn`, `--primary`, `--secondary`

## Data hooks

- `[data-billing-form-card]`: root.
- `[data-billing-form-card-open]`: opener esterno; `[data-billing-form-card-target]` (id root), `[data-billing-form-card-mode]` (`create`/`edit`), `[data-billing-form-card-record-id]`, `[data-billing-form-card-focus]`.
- `[data-billing-form-card-close]`: chiusura/annulla.
- `[data-billing-form-card-title]` / `[data-billing-form-card-submit]`: label gestite dal runtime, con `[data-billing-form-card-create-label]` / `[data-billing-form-card-edit-label]`.

## JS

`window.SkillpressUI.BillingFormCard.init(root)` collega solo l'apertura/chiusura UI. Aprendo: rimuove `hidden`, applica `.billing-form-card--active`, `aria-hidden="false"` e aggiorna le label create/edit; chiudendo ripristina `hidden` e `aria-hidden="true"`.

Eventi: `sp:billing-form-card:open`, `sp:billing-form-card:close`. Il runtime non salva, valida, popola i valori di edit né chiama API.

## Out of scope

Checkout billing forms, validazione, persistenza, popolamento dati edit.
