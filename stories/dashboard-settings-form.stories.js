import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../components/dashboard-settings-form.css';
import '../js/dashboard-settings-form.js';
import { expect, userEvent, within } from 'storybook/test';

const renderSettings = () => {
    const root = document.createElement('div');
    root.innerHTML = `
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
                                <label class="dashboard-settings-form__label" for="story-first-name">Nome</label>
                                <input type="text"
                                       id="story-first-name"
                                       value="Giacomo"
                                       disabled
                                       class="dashboard-settings-form__input"
                                       data-dashboard-settings-form-field>
                            </div>
                            <div class="dashboard-settings-form__field">
                                <label class="dashboard-settings-form__label" for="story-last-name">Cognome</label>
                                <input type="text"
                                       id="story-last-name"
                                       value="Battiston"
                                       disabled
                                       class="dashboard-settings-form__input"
                                       data-dashboard-settings-form-field>
                            </div>
                        </div>
                        <div class="dashboard-settings-form__field">
                            <label class="dashboard-settings-form__label" for="story-email">Email</label>
                            <input type="email"
                                   id="story-email"
                                   value="giacomo.battiston@example.com"
                                   disabled
                                   class="dashboard-settings-form__input"
                                   data-dashboard-settings-form-field>
                        </div>
                        <div class="dashboard-settings-form__field">
                            <label class="dashboard-settings-form__label" for="story-phone">Telefono</label>
                            <input type="tel"
                                   id="story-phone"
                                   value="+39 345 123 4567"
                                   disabled
                                   class="dashboard-settings-form__input"
                                   data-dashboard-settings-form-field>
                        </div>
                        <div class="dashboard-settings-form__actions dashboard-settings-form__actions--hidden"
                             data-dashboard-settings-form-actions>
                            <button type="button"
                                    class="dashboard-settings-form__button dashboard-settings-form__button--primary"
                                    data-dashboard-settings-form-save="personal">Salva Modifiche</button>
                            <button type="button"
                                    class="dashboard-settings-form__button dashboard-settings-form__button--secondary"
                                    data-dashboard-settings-form-cancel="personal">Annulla</button>
                        </div>
                    </form>
                </article>
                <article class="dashboard-settings-form__card">
                    <div class="dashboard-settings-form__header">
                        <h2 class="dashboard-settings-form__title">Cambia Password</h2>
                    </div>
                    <form class="dashboard-settings-form__form dashboard-settings-form__form--stack">
                        <div class="dashboard-settings-form__field">
                            <label class="dashboard-settings-form__label" for="story-current-password">Password Attuale</label>
                            <input type="password"
                                   id="story-current-password"
                                   class="dashboard-settings-form__input"
                                   placeholder="Inserisci password attuale">
                        </div>
                        <div class="dashboard-settings-form__field">
                            <label class="dashboard-settings-form__label" for="story-new-password">Nuova Password</label>
                            <input type="password"
                                   id="story-new-password"
                                   class="dashboard-settings-form__input"
                                   placeholder="Inserisci nuova password">
                            <p class="dashboard-settings-form__hint">Minimo 8 caratteri, almeno una maiuscola e un numero</p>
                        </div>
                        <div class="dashboard-settings-form__field">
                            <label class="dashboard-settings-form__label" for="story-confirm-password">Conferma Nuova Password</label>
                            <input type="password"
                                   id="story-confirm-password"
                                   class="dashboard-settings-form__input"
                                   placeholder="Conferma nuova password">
                        </div>
                        <div class="dashboard-settings-form__spacer">
                            <button type="button"
                                    class="dashboard-settings-form__button dashboard-settings-form__button--primary">
                                Cambia Password
                            </button>
                        </div>
                    </form>
                </article>
            </div>
        </div>
    `;
    requestAnimationFrame(() => window.SkillpressUI.DashboardSettingsForm.init(root));
    return root;
};

export default {
    title: 'Dashboard/Account/DashboardSettingsForm',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard settings card/form family for account and profile settings. Runtime handles UI edit/cancel/save only.'
            }
        }
    }
};

export const Default = {
    render: () => renderSettings(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Informazioni Personali')).toBeInTheDocument();
        await expect(canvas.getByLabelText('Nome')).toBeDisabled();
    }
};

export const EditToggle = {
    render: () => renderSettings(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: 'Modifica' }));
        await expect(canvas.getByLabelText('Nome')).not.toBeDisabled();
        await expect(canvas.getByRole('button', { name: 'Salva Modifiche' })).toBeVisible();
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderSettings(),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html#view-account`. Utility classes and Material Symbols are replaced by BEM classes and a CSS-owned edit icon.'
            }
        }
    }
};
