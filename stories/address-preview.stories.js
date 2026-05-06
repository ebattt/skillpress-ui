import '../components/address-preview.css';
import { expect, within } from 'storybook/test';

const renderAddressPreview = ({
    name = 'Mario Rossi',
    secondary = '',
    lines = [
        'Via Roma 123',
        '20121 Milano (MI)',
        'Italia',
        '+39 02 1234567',
        'mario.rossi@email.com'
    ],
    fieldFollow = false
} = {}) => {
    const root = document.createElement('div');
    root.style.maxWidth = '420px';
    root.style.background = 'var(--color-bg-gray-50)';
    root.style.padding = '1.25rem';
    root.style.borderRadius = 'var(--radius-xl)';
    root.innerHTML = `
        <div class="address-preview${fieldFollow ? ' address-preview--field-follow' : ''}" data-address-preview>
            <span class="address-preview__icon" aria-hidden="true"></span>
            <div class="address-preview__lines">
                <p class="address-preview__name">${name}</p>
                ${secondary ? `<p class="address-preview__secondary">${secondary}</p>` : ''}
                ${lines.map((line) => `<p>${line}</p>`).join('')}
            </div>
        </div>
    `;
    return root;
};

export default {
    title: 'Checkout/Shipping & Payment/AddressPreview',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Compact checkout address/billing profile preview. The library owns the visual shell and CSS location icon; backend/app logic owns address data and selection state.'
            }
        }
    }
};

export const Default = {
    render: () => renderAddressPreview(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Mario Rossi')).toHaveClass('address-preview__name');
        await expect(canvas.getByText('Via Roma 123')).toBeInTheDocument();
    }
};

export const BillingProfile = {
    render: () => renderAddressPreview({
        name: 'Rossi Editore Srl',
        secondary: 'Societa',
        lines: [
            'CF: 12345678901',
            'P.IVA: IT12345678901',
            'Via Manzoni 45, Piano 3',
            '20121 Milano (MI)',
            'SDI: M5UXCR1',
            'admin@rossieditore.it'
        ]
    }),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Societa')).toHaveClass('address-preview__secondary');
    }
};

export const ReferenceFromCheckout = {
    render: () => renderAddressPreview(),
    parameters: {
        docs: {
            description: {
                story: 'Reference from `checkout/js/sections/shipping-section.js`: root, icon, lines and name are preserved; demo Material Symbols `location_on` is replaced by CSS chrome.'
            }
        }
    }
};

export const AfterSelect = {
    render: () => {
        const root = document.createElement('div');
        root.style.maxWidth = '420px';
        root.style.background = 'var(--color-bg-gray-50)';
        root.style.padding = '1.25rem';
        root.style.borderRadius = 'var(--radius-xl)';
        root.innerHTML = `
            <div class="form-field">
                <label class="label-text" for="storybook-address-preview-select">Indirizzo</label>
                <select class="form-select" id="storybook-address-preview-select">
                    <option>Casa — Mario Rossi, Via Roma 123</option>
                </select>
            </div>
        `;
        root.append(renderAddressPreview({ fieldFollow: true }).firstElementChild);
        return root;
    },
    parameters: {
        docs: {
            description: {
                story: 'Composition used by checkout when `AddressPreview` follows a saved-address dropdown.'
            }
        }
    }
};
