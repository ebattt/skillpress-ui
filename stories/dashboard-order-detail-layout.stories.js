import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../primitives/button.css';
import '../primitives/badge.css';
import '../components/dashboard-action-badge.css';
import '../components/order-detail-header.css';
import '../components/order-product-dropdown.css';
import '../components/order-status-steps.css';
import '../components/order-step-detail.css';
import '../components/dashboard-order-summary.css';
import '../components/dashboard-dropdown-box.css';
import '../components/dashboard-order-detail-layout.css';
import '../js/dashboard-dropdown-box.js';
import '../js/order-product-dropdown.js';
import '../js/order-status-steps.js';
import '../js/order-step-detail.js';
import { expect, within } from 'storybook/test';

const renderProduct = () => `
    <article class="product-step-card" data-order-product-dropdown data-order-step-detail>
        <button class="product-step-card__row" type="button" aria-expanded="true" data-order-product-dropdown-trigger>
            <div class="product-step-card__image-wrap">
                <img class="product-step-card__image" src="https://placehold.co/160x160/f3f4f6/003e51?text=PDF" alt="Brossura fresata">
            </div>
            <div class="product-step-card__body">
                <div class="product-step-card__header">
                    <div class="product-step-card__info">
                        <p class="product-step-card__name">Brossura fresata</p>
                        <p class="product-step-card__meta">200 copie</p>
                        <div class="product-step-card__badges">
                            <span class="dashboard-action-badge" data-dashboard-action-badge>
                                <span class="dashboard-action-badge__icon dashboard-action-badge__icon--upload" aria-hidden="true"></span>
                                File richiesto
                            </span>
                            <span class="sp-badge sp-badge--info">Aperto</span>
                        </div>
                    </div>
                    <div class="product-step-card__price-block">
                        <span class="product-step-card__price">320,50 &euro;</span>
                        <span class="product-step-card__expand-icon" aria-hidden="true"></span>
                    </div>
                </div>
            </div>
        </button>
        <div class="product-step-card__expanded-content" data-order-product-dropdown-content>
            <div class="product-step-card__actions-bar">
                <button class="product-step-card__details-toggle" type="button" aria-expanded="false" data-order-product-dropdown-details-trigger>
                    <span class="product-step-card__details-toggle-label">Dettagli prodotto</span>
                    <span class="product-step-card__details-chevron" aria-hidden="true"></span>
                </button>
                <button class="sp-button sp-button--primary sp-button--sm" type="button">Carica file</button>
            </div>
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
            <div class="product-step-detail" data-order-step-detail-panel data-order-status-steps-step-id="files">
                <div class="step-status-banner step-status-banner--warning">
                    <div class="step-status-banner__body">
                        <p class="step-status-banner__title">1/3 file caricati <span class="step-status-banner__text">Mancano 2 file per procedere.</span></p>
                    </div>
                </div>
            </div>
            <div class="product-step-detail" data-order-step-detail-panel data-order-status-steps-step-id="check" hidden>
                <div class="step-status-banner step-status-banner--info">
                    <div class="step-status-banner__body">
                        <p class="step-status-banner__title">Verifica in corso</p>
                    </div>
                </div>
            </div>
        </div>
    </article>
`;

const renderSummary = () => `
    <article class="order-summary order-detail-grid__summary" data-dashboard-order-summary>
        <h3 class="order-summary__title">Riepilogo ordine</h3>
        <div class="order-summary__items">
            <div class="order-summary__item">
                <div>
                    <p class="order-summary__item-name">Brossura fresata</p>
                    <p class="order-summary__item-qty">200 copie</p>
                </div>
                <span class="order-summary__item-price">320,50 &euro;</span>
            </div>
        </div>
        <hr class="order-summary__divider">
        <div class="order-summary__totals">
            <div class="order-summary__row">
                <span class="order-summary__label">Subtotale</span>
                <span class="order-summary__value">262,70 &euro;</span>
            </div>
            <div class="order-summary__row">
                <span class="order-summary__label">Imposta</span>
                <span class="order-summary__value">57,80 &euro;</span>
            </div>
        </div>
        <div class="order-summary__total">
            <span class="order-summary__total-label">Totale</span>
            <span class="order-summary__total-value">320,50 &euro;</span>
        </div>
    </article>
`;

const renderDropdown = (type) => {
    const title = type === 'shipping' ? 'Spedizione' : 'Pagamento';

    return `
        <div class="dashboard-dropdown-box order-detail-grid__${type}" data-dashboard-dropdown-box>
            <button class="dashboard-dropdown-box__trigger" type="button" aria-expanded="false" data-dashboard-dropdown-box-trigger>
                <span class="dashboard-dropdown-box__trigger-label">
                    <span class="dashboard-dropdown-box__trigger-icon dashboard-dropdown-box__trigger-icon--${type}" aria-hidden="true"></span>
                    ${title}
                </span>
                <span class="dashboard-dropdown-box__chevron" aria-hidden="true"></span>
            </button>
            <div class="dashboard-dropdown-box__content" data-dashboard-dropdown-box-content hidden>
                <p style="margin: 1rem 0 0; font-size: 0.875rem;">Slot ${title.toLowerCase()}</p>
            </div>
        </div>
    `;
};

const renderLayout = () => {
    const root = document.createElement('section');
    root.className = 'order-detail-view';
    root.setAttribute('data-dashboard-order-detail-layout', '');
    root.innerHTML = `
        <div class="order-detail-header" data-order-detail-header>
            <button class="order-detail-header__back" type="button">
                <span class="order-detail-header__back-icon" aria-hidden="true"></span>
                Torna agli ordini
            </button>
            <header class="order-header">
                <div class="order-header__top">
                    <h1 class="order-header__title">Ordine #110456</h1>
                    <span class="order-header__badge order-header__badge--info">Aperto</span>
                </div>
                <p class="order-header__subtitle">
                    <span class="order-header__subtitle-line">Catalogo Primavera Estate 2026</span>
                </p>
            </header>
        </div>
        <div class="order-detail-grid">
            <div class="order-detail-grid__products">
                ${renderProduct()}
                ${renderProduct()}
            </div>
            <aside class="order-detail-grid__sidebar">
                ${renderSummary()}
                ${renderDropdown('payment')}
                ${renderDropdown('shipping')}
            </aside>
        </div>
    `;

    window.setTimeout(() => {
        window.SkillpressUI.DashboardDropdownBox.init(root);
        window.SkillpressUI.OrderProductDropdown.init(root);
        window.SkillpressUI.OrderStatusSteps.init(root);
        window.SkillpressUI.OrderStepDetail.init(root);
    }, 0);

    return root;
};

export default {
    title: 'Dashboard/Order Detail/DashboardOrderDetailLayout',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Responsive CSS-only layout for the dashboard order detail view. Child components keep their own contracts.'
            }
        }
    }
};

export const Default = {
    render: () => renderLayout(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Ordine #110456')).toBeInTheDocument();
        await expect(canvas.getByText('Riepilogo ordine')).toBeInTheDocument();
        await expect(canvas.getByRole('button', { name: 'Pagamento' })).toBeInTheDocument();
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderLayout(),
    parameters: {
        docs: {
            description: {
                story: 'Source layout from `dashboard/index.html#L409-L477` and `_order-detail.css#L1542-L1609`. `OrderPaymentActionBox` is intentionally out of scope.'
            }
        }
    }
};
