import '../components/checkout-mobile-summary.css';
import '../js/checkout-mobile-summary.js';
import { expect, userEvent, within } from 'storybook/test';

const renderItem = ({
    name = 'Libri brossura fresata',
    qty = '500 copie',
    price = '919,99 &euro;'
} = {}) => `
    <div class="checkout-mobile-summary__item">
        <div class="checkout-mobile-summary__item-info">
            <p class="checkout-mobile-summary__item-name">${name}</p>
            <p class="checkout-mobile-summary__item-qty">${qty}</p>
        </div>
        <span class="checkout-mobile-summary__item-price">${price}</span>
    </div>
`;

const renderDetail = (label, value, modifier = '') => `
    <div class="checkout-mobile-summary__detail-row${modifier ? ' ' + modifier : ''}">
        <span class="checkout-mobile-summary__detail-label">${label}</span>
        <span class="checkout-mobile-summary__detail-value">${value}</span>
    </div>
`;

const renderSummary = ({ expanded = false, cta = 'Avanti' } = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="checkout-mobile-summary${expanded ? ' checkout-mobile-summary--expanded' : ''}" data-checkout-mobile-summary style="display:block; position:relative;">
            <div class="checkout-mobile-summary__overlay" data-checkout-mobile-summary-overlay></div>
            <div class="checkout-mobile-summary__container">
                <button class="checkout-mobile-summary__handle" type="button" aria-label="Espandi riepilogo ordine" aria-expanded="${expanded ? 'true' : 'false'}" data-checkout-mobile-summary-toggle>
                    <svg class="checkout-mobile-summary__handle-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                </button>
                <div class="checkout-mobile-summary__compact">
                    <div class="checkout-mobile-summary__total-line">
                        <span class="checkout-mobile-summary__label">Totale</span>
                        <span class="checkout-mobile-summary__price">2.708,38 &euro;</span>
                    </div>
                    <a class="checkout-mobile-summary__cta" href="#shipping">${cta}</a>
                </div>
                <div class="checkout-mobile-summary__expanded">
                    <div class="checkout-mobile-summary__details">
                        ${renderDetail('Subtotale', '2.219,98 &euro;')}
                        ${renderDetail('Imposta', '488,40 &euro;')}
                        ${renderDetail('Spedizione', 'Gratuita', 'checkout-mobile-summary__detail-row--success')}
                    </div>
                    <div class="checkout-mobile-summary__items">
                        ${renderItem()}
                        ${renderItem({ name: 'Libro con copertina rigida', qty: '100 copie', price: '1.299,99 &euro;' })}
                    </div>
                </div>
            </div>
        </div>
    `;
    window.SkillpressUI.CheckoutMobileSummary.init(root);
    return root;
};

export default {
    title: 'Checkout/Summary/CheckoutMobileSummary',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Fixed bottom checkout order summary for mobile/tablet. The library owns toggle/accessibility and visual states; the application owns totals, rows and checkout navigation.'
            }
        }
    }
};

export const Default = {
    render: () => renderSummary(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Totale')).toBeInTheDocument();
        await expect(canvas.getByRole('link', { name: 'Avanti' })).toHaveClass('checkout-mobile-summary__cta');
    }
};

export const Expanded = {
    render: () => renderSummary({ expanded: true }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Subtotale')).toBeInTheDocument();
        await expect(canvas.getByText('Libro con copertina rigida')).toBeInTheDocument();
    }
};

export const ToggleBehavior = {
    render: () => renderSummary(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button', { name: 'Espandi riepilogo ordine' });
        await userEvent.click(button);
        await expect(button).toHaveAttribute('aria-expanded', 'true');
    }
};
