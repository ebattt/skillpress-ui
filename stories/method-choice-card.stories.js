import '../components/method-choice-card.css';
import { expect, within } from 'storybook/test';

const shippingMethods = [
    ['Corriere Italia', 'GLS/MBE/BRT · 2-3 gg', ''],
    ['Ritiro in sede', 'Dalle 16:30', ''],
    ['Europa', '+4 giorni lavorativi', ''],
    ['Fermo GLS', 'Punto ritiro', ''],
    ['Fermo MBE', 'Punto ritiro', '']
];

const paymentMethods = [
    ['card', 'Carta', 'Visa, MC, Amex'],
    ['paypal', 'PayPal', 'Max 400&euro;'],
    ['bank', 'Bonifico', 'Bancario'],
    ['cash', 'Contrassegno', 'Max 500&euro;'],
    ['store', 'In sede', 'Contanti/POS']
];

const renderCard = ([icon, name, detail, disabled = false], selected = false) => `
    <button class="method-choice-card${selected ? ' method-choice-card--selected' : ''}"
            type="button"
            aria-pressed="${selected ? 'true' : 'false'}"
            ${disabled ? 'disabled aria-disabled="true"' : ''}
            data-method-choice-card>
        ${icon ? `<span class="method-choice-card__icon method-choice-card__icon--${icon}" aria-hidden="true"></span>` : ''}
        <span class="method-choice-card__name">${name}</span>
        <span class="method-choice-card__detail">${detail}</span>
    </button>
`;

const renderGroup = ({ title = 'Metodo di spedizione', id = 'method-choice-title', items = shippingMethods, selectedIndex = 0 } = {}) => {
    const root = document.createElement('div');
    root.style.maxWidth = '760px';
    root.innerHTML = `
        <div class="method-choice" data-method-choice>
            <p class="method-choice__title" id="${id}">${title}</p>
            <div class="method-choice__grid" role="group" aria-labelledby="${id}">
                ${items.map((item, index) => renderCard(item, index === selectedIndex)).join('')}
            </div>
        </div>
    `;
    return root;
};

export default {
    title: 'Checkout/Shipping & Payment/MethodChoiceCard',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Selectable method tiles for checkout shipping/payment. CSS-only; app logic owns selection changes.'
            }
        }
    }
};

export const ShippingMethods = {
    render: () => renderGroup(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('button', { name: /Corriere Italia/ })).toHaveClass('method-choice-card--selected');
        await expect(canvas.getByText('GLS/MBE/BRT · 2-3 gg')).toHaveClass('method-choice-card__detail');
    }
};

export const PaymentMethods = {
    render: () => renderGroup({
        title: 'Metodo di pagamento',
        id: 'payment-methods-title',
        items: paymentMethods,
        selectedIndex: 1
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('button', { name: /PayPal/ })).toHaveAttribute('aria-pressed', 'true');
    }
};

export const ReferenceFromCheckout = {
    render: () => renderGroup({
        title: 'Metodo di pagamento',
        id: 'reference-payment-methods-title',
        items: paymentMethods,
        selectedIndex: 0
    }),
    parameters: {
        docs: {
            description: {
                story: 'Reference from checkout shipping/payment tag grids. Demo classes `shipping-tag`/`payment-tag` converge into `method-choice-card`; Material Symbols payment icons are CSS-owned.'
            }
        }
    }
};

export const DisabledAndLongLabels = {
    render: () => renderGroup({
        title: 'Metodo di pagamento',
        id: 'payment-disabled-long-title',
        items: [
            ['card', 'Carta aziendale con autorizzazione amministrativa', 'Visa, Mastercard, Amex'],
            ['paypal', 'PayPal', 'Non disponibile per importi superiori a 400 euro', true],
            ['bank', 'Bonifico bancario anticipato', 'Verifica contabile richiesta']
        ],
        selectedIndex: 0
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('button', { name: /PayPal/ })).toBeDisabled();
        await expect(canvas.getByText('Carta aziendale con autorizzazione amministrativa')).toHaveClass('method-choice-card__name');
    }
};
