import '../components/checkout-summary.css';
import { expect, within } from 'storybook/test';

const renderItem = ({
    name = 'Libri brossura fresata',
    qty = '500 copie',
    price = '919,99 &euro;'
} = {}) => `
    <div class="checkout-summary__item">
        <div class="checkout-summary__item-info">
            <p class="checkout-summary__item-name">${name}</p>
            <p class="checkout-summary__item-qty">${qty}</p>
        </div>
        <span class="checkout-summary__item-price">${price}</span>
    </div>
`;

const renderTotalRow = (label, value) => `
    <div class="checkout-summary__total-row">
        <span class="checkout-summary__total-label">${label}</span>
        <span class="checkout-summary__total-value">${value}</span>
    </div>
`;

const renderSummary = ({
    sticky = false,
    cta = 'Avanti',
    disabled = false,
    helpHref = '#'
} = {}) => {
    const root = document.createElement('div');
    root.style.maxWidth = '380px';
    const ctaAttrs = disabled ? ' aria-disabled="true"' : ' href="#"';
    root.innerHTML = `
        <aside class="checkout-summary${sticky ? ' checkout-summary--sticky' : ''}" aria-labelledby="checkout-summary-title">
            <div class="checkout-summary__card">
                <div>
                    <h3 class="checkout-summary__title" id="checkout-summary-title">Riepilogo ordine</h3>
                    <div class="checkout-summary__items">
                        ${renderItem()}
                        ${renderItem({
                            name: 'Libro con copertina rigida',
                            qty: '100 copie',
                            price: '1.299,99 &euro;'
                        })}
                    </div>
                    <hr class="checkout-summary__divider">
                    <div class="checkout-summary__totals">
                        ${renderTotalRow('Subtotale', '2.219,98 &euro;')}
                        ${renderTotalRow('Imposta', '488,40 &euro;')}
                        ${renderTotalRow('Spedizione', 'Gratuita')}
                    </div>
                    <hr class="checkout-summary__divider">
                    <div class="checkout-summary__grand-total">
                        <span class="checkout-summary__grand-label">Totale</span>
                        <span class="checkout-summary__grand-value">2.708,38 &euro;</span>
                    </div>
                </div>
                <a class="checkout-summary__cta"${ctaAttrs}>${cta}</a>
            </div>
            <div class="checkout-summary__note">
                <span class="checkout-summary__note-icon" aria-hidden="true"></span>
                <p class="checkout-summary__note-text">Il caricamento dei file per la stampa sara' disponibile dopo aver completato il pagamento.</p>
            </div>
            <div class="checkout-summary__help">
                <p class="checkout-summary__help-text">Hai bisogno di aiuto?</p>
                <a href="${helpHref}" class="checkout-summary__help-link">Contatta l'assistenza</a>
            </div>
        </aside>
    `;
    return root;
};

export default {
    title: 'Checkout/Summary/CheckoutSummary',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Checkout order summary sidebar. The library owns markup and visual states; backend/app logic owns rows, formatted amounts, CTA behavior and checkout state.'
            }
        }
    }
};

export const Default = {
    render: () => renderSummary(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('heading', { name: 'Riepilogo ordine' })).toBeInTheDocument();
        await expect(canvas.getByText(/2\.708,38/)).toBeInTheDocument();
        await expect(canvas.getByRole('link', { name: 'Avanti' })).toHaveClass('checkout-summary__cta');
    }
};

export const StickySidebar = {
    render: () => renderSummary({ sticky: true }),
    parameters: {
        docs: {
            description: {
                story: 'Opt-in sticky state for the checkout right column with `.checkout-summary--sticky`.'
            }
        }
    }
};

export const CompleteOrderCta = {
    render: () => renderSummary({ cta: 'Completa ordine' }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('link', { name: 'Completa ordine' })).toBeInTheDocument();
    }
};

export const DisabledCta = {
    render: () => renderSummary({ disabled: true }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('link', { name: 'Avanti' })).toHaveAttribute('aria-disabled', 'true');
    }
};

export const ReferenceFromCheckout = {
    render: () => renderSummary(),
    parameters: {
        docs: {
            description: {
                story: 'Reference from `checkout/js/sections/sidebar-section.js`: items list, subtotal/tax/shipping rows, grand total, CTA, file-upload note and help link. Demo Material Symbols info icon is replaced by CSS chrome.'
            }
        }
    }
};
