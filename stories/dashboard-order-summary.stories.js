import '../components/dashboard-order-summary.css';
import { expect, within } from 'storybook/test';

const renderSummary = ({ multiple = false } = {}) => {
    const root = document.createElement('div');
    root.style.maxWidth = '360px';
    root.innerHTML = `
        <article class="order-summary order-detail-grid__summary" data-dashboard-order-summary>
            <h3 class="order-summary__title">Riepilogo ordine</h3>
            <div class="order-summary__items">
                <div class="order-summary__item">
                    <div>
                        <p class="order-summary__item-name">Articoli totali</p>
                        <p class="order-summary__item-qty">${multiple ? '3 prodotti' : '1 prodotto'}</p>
                    </div>
                    <span class="order-summary__item-price">${multiple ? '640,50 &euro;' : '320,50 &euro;'}</span>
                </div>
                ${multiple ? `
                <div class="order-summary__item">
                    <div>
                        <p class="order-summary__item-name">Spedizione</p>
                        <p class="order-summary__item-qty">Corriere espresso</p>
                    </div>
                    <span class="order-summary__item-price">18,00 &euro;</span>
                </div>` : ''}
            </div>
            <hr class="order-summary__divider">
            <div class="order-summary__totals">
                <div class="order-summary__row">
                    <span class="order-summary__label">Subtotale</span>
                    <span class="order-summary__value">${multiple ? '540,57 &euro;' : '262,70 &euro;'}</span>
                </div>
                <div class="order-summary__row">
                    <span class="order-summary__label">Imposta</span>
                    <span class="order-summary__value">${multiple ? '117,93 &euro;' : '57,80 &euro;'}</span>
                </div>
            </div>
            <div class="order-summary__total">
                <span class="order-summary__total-label">Totale</span>
                <span class="order-summary__total-value">${multiple ? '658,50 &euro;' : '320,50 &euro;'}</span>
            </div>
            <div class="order-summary__actions">
                <button class="order-summary__download-btn" type="button">
                    <span class="order-summary__download-icon" aria-hidden="true"></span>
                    Scarica riepilogo
                </button>
            </div>
        </article>
    `;
    return root;
};

export default {
    title: 'Dashboard/Order Detail/DashboardOrderSummary',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard post-purchase order summary sidebar. Totals and download behavior remain application-owned.'
            }
        }
    }
};

export const Default = {
    render: () => renderSummary(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Riepilogo ordine')).toBeInTheDocument();
        await expect(canvas.getByRole('button', { name: /Scarica riepilogo/ })).toBeInTheDocument();
    }
};

export const MultipleItems = {
    render: () => renderSummary({ multiple: true })
};

export const ReferenceFromDashboardPage = {
    render: () => renderSummary(),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html#L428-L450`. Material Symbols and `dash-btn--outline` are replaced by component-owned BEM classes.'
            }
        }
    }
};
