import '../primitives/button.css';
import '../primitives/form-primitives.css';
import '../primitives/form-layout.css';
import { expect, within } from 'storybook/test';

const renderBillingForm = () => {
    const root = document.createElement('div');
    root.style.maxWidth = '760px';
    root.style.background = 'var(--color-bg-gray-50)';
    root.style.padding = '1.25rem';
    root.style.borderRadius = 'var(--radius-xl)';
    root.innerHTML = `
        <div class="form-layout" data-form-layout>
            <div class="form-layout__copy-row">
                <button class="button button--ghost button--sm" type="button">Copia dati dalla spedizione</button>
            </div>

            <div class="form-layout__row form-layout__row--2">
                <div class="form-field">
                    <label class="label-text" for="storybook-billing-type">Tipologia</label>
                    <select class="form-select" id="storybook-billing-type">
                        <option>Persona fisica</option>
                        <option>Societa</option>
                    </select>
                </div>
                <div class="form-field">
                    <label class="label-text" for="storybook-billing-name">Nome</label>
                    <input class="form-input" id="storybook-billing-name" type="text" placeholder="Nome e cognome o ragione sociale">
                </div>
            </div>

            <div class="form-layout__row form-layout__row--2">
                <div class="form-field">
                    <label class="label-text" for="storybook-billing-fiscal-code">Codice Fiscale</label>
                    <input class="form-input" id="storybook-billing-fiscal-code" type="text" placeholder="XXXXXXXXXXXXXXXX">
                </div>
                <div class="form-field">
                    <label class="label-text" for="storybook-billing-vat">Partita IVA</label>
                    <input class="form-input" id="storybook-billing-vat" type="text" placeholder="IT00000000000">
                </div>
            </div>

            <div class="form-layout__row form-layout__row--3">
                <div class="form-field">
                    <label class="label-text" for="storybook-billing-cap">C.A.P.</label>
                    <input class="form-input" id="storybook-billing-cap" type="text" placeholder="00000">
                </div>
                <div class="form-field">
                    <label class="label-text" for="storybook-billing-city">Citta</label>
                    <input class="form-input" id="storybook-billing-city" type="text" placeholder="Citta">
                </div>
                <div class="form-field">
                    <label class="label-text" for="storybook-billing-province">Provincia</label>
                    <input class="form-input" id="storybook-billing-province" type="text" placeholder="XX">
                </div>
            </div>

            <div class="form-layout__actions form-layout__actions--end">
                <button class="button button--primary button--sm" type="button">Crea profilo</button>
            </div>
        </div>
    `;
    return root;
};

export default {
    title: 'Primitives/FormLayout',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'CSS-only form layout helpers for checkout forms. Fields are FormPrimitives and actions are Button.'
            }
        }
    }
};

export const BillingProfileForm = {
    render: () => renderBillingForm(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByLabelText('Tipologia')).toHaveClass('form-select');
        await expect(canvas.getByRole('button', { name: 'Crea profilo' })).toHaveClass('button--primary');
    }
};

export const ReferenceFromCheckout = {
    render: () => renderBillingForm(),
    parameters: {
        docs: {
            description: {
                story: 'Reference from checkout payment new billing profile form: `billing-form__row-2/3` converges into `form-layout__row--2/3`; fields use FormPrimitives.'
            }
        }
    }
};
