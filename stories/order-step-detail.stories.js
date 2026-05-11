import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../primitives/button.css';
import '../components/order-status-steps.css';
import '../components/order-step-detail.css';
import '../js/order-status-steps.js';
import '../js/order-step-detail.js';
import { expect, within } from 'storybook/test';

const renderStepper = () => `
    <div class="product-stepper" data-order-status-steps>
        <button class="product-stepper__step product-stepper__step--completed product-stepper__step--selected" type="button" aria-pressed="true" data-order-status-steps-item data-order-status-steps-step-id="files">
            <span class="product-stepper__circle"><span class="product-stepper__icon product-stepper__icon--check" aria-hidden="true"></span></span>
            <span class="product-stepper__label">File</span>
        </button>
        <span class="product-stepper__connector product-stepper__connector--completed" aria-hidden="true"></span>
        <button class="product-stepper__step product-stepper__step--active" type="button" aria-pressed="false" data-order-status-steps-item data-order-status-steps-step-id="check">
            <span class="product-stepper__circle"><span class="product-stepper__num">2</span></span>
            <span class="product-stepper__label">Controllo</span>
        </button>
        <span class="product-stepper__connector" aria-hidden="true"></span>
        <button class="product-stepper__step product-stepper__step--pending" type="button" aria-pressed="false" data-order-status-steps-item data-order-status-steps-step-id="production">
            <span class="product-stepper__circle"><span class="product-stepper__num">3</span></span>
            <span class="product-stepper__label">Produzione</span>
        </button>
    </div>
`;

const renderFileGroup = () => `
    <div class="product-files-section">
        <div class="product-files-section__header">
            <span class="product-files-section__label">File di stampa</span>
        </div>
        <div class="product-file-groups-grid">
            <div class="product-file-group">
                <div class="product-file-group__header">
                    <p class="product-file-group__title">Interno</p>
                    <div class="product-file-group__actions">
                        <button class="product-file-group__link" type="button">Istruzioni</button>
                        <button class="product-file-group__link" type="button">Template</button>
                    </div>
                </div>
                <div class="product-file-group__list">
                    <button class="product-file-box product-file-box--uploaded" type="button">
                        <span class="product-file-box__icon product-file-box__icon--uploaded product-file-box__icon--check" aria-hidden="true"></span>
                        <span class="product-file-box__body">
                            <span class="product-file-box__title">Interno</span>
                            <span class="product-file-box__meta">interno_catalogo.pdf</span>
                        </span>
                        <span class="product-file-box__state product-file-box__state--success">Approvato</span>
                    </button>
                    <button class="product-file-box product-file-box--empty" type="button">
                        <span class="product-file-box__icon product-file-box__icon--empty product-file-box__icon--upload" aria-hidden="true"></span>
                        <span class="product-file-box__body">
                            <span class="product-file-box__title">Copertina</span>
                            <span class="product-file-box__meta product-file-box__meta--pending">Da caricare</span>
                        </span>
                        <span class="product-file-box__action-label">Carica</span>
                    </button>
                    <button class="product-file-box product-file-box--ready" type="button">
                        <span class="product-file-box__icon product-file-box__icon--ready product-file-box__icon--file" aria-hidden="true"></span>
                        <span class="product-file-box__body">
                            <span class="product-file-box__title">Retro</span>
                            <span class="product-file-box__meta">copertina_retro_sostituita.pdf</span>
                        </span>
                        <span class="product-file-box__state product-file-box__state--warning">Da verificare</span>
                    </button>
                </div>
            </div>
            <div class="product-file-group">
                <div class="product-file-group__header">
                    <p class="product-file-group__title">Allegati</p>
                </div>
                <div class="product-file-group__list">
                    <button class="product-file-box product-file-box--error" type="button">
                        <span class="product-file-box__icon product-file-box__icon--error product-file-box__icon--error-symbol" aria-hidden="true"></span>
                        <span class="product-file-box__body">
                            <span class="product-file-box__title">Sovracoperta</span>
                            <span class="product-file-box__meta product-file-box__meta--error">File errato</span>
                        </span>
                        <span class="product-file-box__action-label product-file-box__action-label--error">Ricarica</span>
                    </button>
                    <div class="product-file-box product-file-box--annotated product-file-box--neutral">
                        <span class="product-file-box__icon product-file-box__icon--neutral product-file-box__icon--draft" aria-hidden="true"></span>
                        <span class="product-file-box__body">
                            <span class="product-file-box__title">Copia zero</span>
                            <span class="product-file-box__meta">copia_zero.pdf</span>
                        </span>
                        <span class="product-file-status-badge product-file-status-badge--neutral">Da verificare</span>
                        <div class="product-file-actions">
                            <button class="product-file-action-btn product-file-action-btn--confirm" type="button">Conferma file</button>
                            <button class="product-file-action-btn product-file-action-btn--change" type="button">Sostituisci</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

const renderRoot = () => {
    const root = document.createElement('div');
    root.setAttribute('data-order-step-detail', '');
    root.innerHTML = `
        ${renderStepper()}
        <div class="product-step-detail" data-order-step-detail-panel data-order-status-steps-step-id="files">
            <div class="step-status-banner step-status-banner--warning">
                <div class="step-status-banner__body">
                    <p class="step-status-banner__title">1/3 file caricati <span class="step-status-banner__text">Mancano 2 file per procedere.</span></p>
                </div>
            </div>
            ${renderFileGroup()}
        </div>
        <div class="product-step-detail" data-order-step-detail-panel data-order-status-steps-step-id="check" hidden>
            <div class="step-status-banner step-status-banner--info">
                <div class="step-status-banner__body">
                    <p class="step-status-banner__title">Verifica in corso <span class="step-status-banner__text">Sarai notificato al completamento.</span></p>
                </div>
            </div>
            ${renderFileGroup()}
        </div>
        <div class="product-step-detail" data-order-step-detail-panel data-order-status-steps-step-id="production" hidden>
            <div class="step-status-banner step-status-banner--locked">
                <div class="step-status-banner__body">
                    <p class="step-status-banner__title">In attesa dello step precedente</p>
                </div>
            </div>
        </div>
    `;

    window.setTimeout(() => {
        window.SkillpressUI.OrderStatusSteps.init(root);
        window.SkillpressUI.OrderStepDetail.init(root);
    }, 0);

    return root;
};

export default {
    title: 'Dashboard/Order Detail/OrderStepDetail',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard order product step detail panels. The library owns panel switching and UI states; order workflow stays in the app.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const check = canvas.getByRole('button', { name: /Controllo/ });
        check.click();
        await expect(check).toHaveAttribute('aria-pressed', 'true');
        await expect(canvas.getByText('Verifica in corso')).toBeVisible();
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderRoot(),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/js/order-products.js#renderStepDetailPanel` and file group renderers. Material Symbols are replaced by CSS-owned icons; data/business actions remain consumer/backend-owned.'
            }
        }
    }
};
