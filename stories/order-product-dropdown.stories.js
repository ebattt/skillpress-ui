import '../components/dashboard-action-badge.css';
import '../components/order-product-dropdown.css';
import '../js/order-product-dropdown.js';
import { expect, within } from 'storybook/test';

const renderCard = ({ expanded = false, details = false } = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <article class="product-step-card" data-order-product-dropdown>
            <button class="product-step-card__row"
                    type="button"
                    aria-expanded="${expanded ? 'true' : 'false'}"
                    data-order-product-dropdown-trigger>
                <div class="product-step-card__image-wrap">
                    <img class="product-step-card__image" src="https://placehold.co/160x160/f3f4f6/003e51?text=PDF" alt="Brossura fresata">
                </div>
                <div class="product-step-card__body">
                    <div class="product-step-card__header">
                        <div class="product-step-card__info">
                            <p class="product-step-card__name">Brossura fresata</p>
                            <p class="product-step-card__meta">200 copie</p>
                            <div class="product-step-card__badges">
                                <span class="dash-action-badge" data-dashboard-action-badge>
                                    <span class="dash-action-badge__icon dash-action-badge__icon--upload" aria-hidden="true"></span>
                                    Carica file
                                </span>
                            </div>
                        </div>
                        <div class="product-step-card__price-block">
                            <span class="product-step-card__price">&euro; 320,50</span>
                            <span class="product-step-card__expand-icon" aria-hidden="true"></span>
                        </div>
                    </div>
                </div>
            </button>
            <div class="product-step-card__expanded-content" data-order-product-dropdown-content ${expanded ? '' : 'hidden'}>
                <div class="product-step-card__actions-bar">
                    <button class="product-step-card__details-toggle"
                            type="button"
                            aria-expanded="${details ? 'true' : 'false'}"
                            data-order-product-dropdown-details-trigger>
                        <span class="product-step-card__details-toggle-label">Dettagli prodotto</span>
                        <span class="product-step-card__details-chevron" aria-hidden="true"></span>
                    </button>
                    <button class="button button--primary button--sm" type="button">Carica file</button>
                </div>
                <div class="product-step-card__details-section">
                    <div class="product-step-card__details" data-order-product-dropdown-details ${details ? '' : 'hidden'}>
                        <div class="product-step-card__details-inner">
                            <div class="detail-section">
                                <span class="detail-heading">1. Generali:</span>
                                <span class="detail-label">Formato: </span><span>A4</span><span class="detail-sep">·</span>
                                <span class="detail-label">Copie: </span><span>200</span>
                            </div>
                            <div class="detail-section">
                                <span class="detail-heading">2. Carta:</span>
                                <span class="detail-label">Interno: </span><span>Usomano 90g</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
    return root;
};

export default {
    title: 'Components/OrderProductDropdown',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard order detail product card with disclosure. Stepper and upload business logic remain out of scope.'
            }
        }
    }
};

export const Default = {
    render: () => renderCard(),
    play: async ({ canvasElement }) => {
        window.SkillpressUI.OrderProductDropdown.init(canvasElement);
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole('button', { name: /Brossura fresata/ });
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        trigger.click();
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    }
};

export const ExpandedWithDetails = {
    render: () => renderCard({ expanded: true, details: true })
};

export const ReferenceFromDashboardPage = {
    render: () => renderCard({ expanded: true }),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/js/order-products.js` product-step-card. Material Symbols are replaced by CSS chevrons.'
            }
        }
    }
};
