import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../components/billing-form-card.css';
import '../js/billing-form-card.js';
import { expect, userEvent, within } from 'storybook/test';

const renderBillingForm = ({ hidden = false, mode = 'create' } = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <button type="button"
                data-billing-form-card-open
                data-billing-form-card-target="story-billing-form-card"
                data-billing-form-card-mode="${mode}">
            ${mode === 'edit' ? 'Modifica' : 'Aggiungi'}
        </button>
        <div class="billing-form-card${hidden ? '' : ' billing-form-card--active'}"
             id="story-billing-form-card"
             data-billing-form-card
             ${hidden ? 'hidden aria-hidden="true"' : 'aria-hidden="false"'}
             data-billing-form-card-mode="${mode}">
            <h3 class="billing-form-card__title"
                data-billing-form-card-title
                data-create-label="Nuova anagrafica"
                data-edit-label="Modifica anagrafica">${mode === 'edit' ? 'Modifica anagrafica' : 'Nuova anagrafica'}</h3>
            <form class="billing-form" data-form="billing">
                <div class="billing-form__row">
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-name-story">Nome *</label>
                        <input type="text" class="billing-form__input" placeholder="Nome e cognome o ragione sociale" required id="bf-name-story">
                    </div>
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-cf-story">Codice Fiscale</label>
                        <input type="text" class="billing-form__input" placeholder="RSSMRA85M01H501Z" id="bf-cf-story">
                    </div>
                </div>
                <div class="billing-form__row">
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-piva-story">Partita IVA</label>
                        <div class="billing-form__inline-field">
                            <span class="billing-form__prefix">IT</span>
                            <input type="text" class="billing-form__input billing-form__input--flex" placeholder="12345678901" id="bf-piva-story">
                        </div>
                    </div>
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-indirizzo-story">Indirizzo *</label>
                        <input type="text" class="billing-form__input" placeholder="Via, numero civico" required id="bf-indirizzo-story">
                    </div>
                </div>
                <div class="billing-form__row billing-form__row--3">
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-paese-story">Paese</label>
                        <select class="billing-form__input billing-form__select" id="bf-paese-story">
                            <option value="IT" selected>Italia</option>
                            <option value="DE">Germania</option>
                            <option value="FR">Francia</option>
                        </select>
                    </div>
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-cap-story">C.A.P.</label>
                        <input type="text" class="billing-form__input" placeholder="30025" id="bf-cap-story">
                    </div>
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-citta-story">Citta</label>
                        <input type="text" class="billing-form__input" placeholder="Fossalta di Portogruaro" id="bf-citta-story">
                    </div>
                </div>
                <div class="billing-form__row">
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-email-story">E-mail</label>
                        <input type="email" class="billing-form__input" placeholder="email@esempio.com" id="bf-email-story">
                    </div>
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-pec-story">E-mail PEC</label>
                        <input type="email" class="billing-form__input" placeholder="azienda@pec.it" id="bf-pec-story">
                    </div>
                </div>
                <div class="billing-form__row">
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-sdi-story">Codice SDI</label>
                        <input type="text" class="billing-form__input" placeholder="M5UXCR1" id="bf-sdi-story">
                    </div>
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-tipo-societa-story">Tipo di societa</label>
                        <select class="billing-form__input billing-form__select" id="bf-tipo-societa-story">
                            <option value="">Seleziona il tipo di societa</option>
                            <option value="persona-fisica">Persona fisica</option>
                            <option value="srl">S.r.l.</option>
                            <option value="spa">S.p.A.</option>
                        </select>
                    </div>
                </div>
                <div class="billing-form__row">
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-pref-fatturazione-story">Preferito per fatturazione</label>
                        <select class="billing-form__input billing-form__select" id="bf-pref-fatturazione-story">
                            <option value="no">No</option>
                            <option value="si">Si</option>
                        </select>
                    </div>
                    <div class="billing-form__field">
                        <label class="billing-form__label" for="bf-pref-spedizione-story">Preferito per spedizione</label>
                        <select class="billing-form__input billing-form__select" id="bf-pref-spedizione-story">
                            <option value="no">No</option>
                            <option value="si">Si</option>
                        </select>
                    </div>
                </div>
                <div class="billing-form__footer">
                    <button type="button" class="billing-form__btn billing-form__btn--secondary" data-billing-form-card-close>Annulla</button>
                    <button type="submit"
                            class="billing-form__btn billing-form__btn--primary"
                            data-billing-form-card-submit
                            data-create-label="Crea anagrafica"
                            data-edit-label="Salva modifiche">${mode === 'edit' ? 'Salva modifiche' : 'Crea anagrafica'}</button>
                </div>
            </form>
        </div>
    `;
    requestAnimationFrame(() => window.SkillpressUI.BillingFormCard.init(root));
    return root;
};

export default {
    title: 'Dashboard/Billing/BillingFormCard',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard billing create/edit form card. UI runtime only handles open/close and create/edit labels.'
            }
        }
    }
};

export const Default = {
    render: () => renderBillingForm(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Nuova anagrafica')).toBeInTheDocument();
        await expect(canvas.getByLabelText('Nome *')).toHaveClass('billing-form__input');
    }
};

export const InitiallyHidden = {
    render: () => renderBillingForm({ hidden: true }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const opener = canvas.getByText('Aggiungi');
        await userEvent.click(opener);
        await expect(canvas.getByText('Nuova anagrafica')).toBeVisible();
    }
};

export const EditMode = {
    render: () => renderBillingForm({ mode: 'edit' }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Modifica anagrafica')).toBeInTheDocument();
        await expect(canvas.getByText('Salva modifiche')).toBeInTheDocument();
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderBillingForm(),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html` billing form. Demo `.active` was converted to BEM `.billing-form-card--active` and `hidden` for strict naming.'
            }
        }
    }
};
