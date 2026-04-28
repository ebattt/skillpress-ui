import { expect } from 'storybook/test';

const renderBadge = ({
    label = 'Consegnato',
    variant = 'success'
} = {}) => {
    const root = document.createElement('div');

    root.innerHTML = `<span class="badge badge--${variant}">${label}</span>`;

    return root;
};

const renderGroup = (items) => {
    const root = document.createElement('div');

    root.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; max-width: 760px;">
            ${items.map((item) => renderBadge(item).innerHTML).join('')}
        </div>
    `;

    return root;
};

export default {
    title: 'Primitives/Badge',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Badge status minimale con dot e testo. Il backend controlla label e variante; la libreria controlla styling e colori.'
            }
        }
    }
};

export const Default = {
    render: () => renderBadge(),
    play: async ({ canvas }) => {
        const badge = canvas.getByText('Consegnato');
        await expect(badge).toHaveClass('badge', 'badge--success');
    }
};

export const Variants = {
    render: () => renderGroup([
        { label: 'Consegnato', variant: 'success' },
        { label: 'In sospeso', variant: 'warning' },
        { label: 'Scaduto', variant: 'error' },
        { label: 'In lavorazione', variant: 'info' },
        { label: 'Annullato', variant: 'cancelled' },
        { label: 'Bozza', variant: 'neutral' }
    ])
};

export const ReferenceFromOriginal = {
    render: () => renderGroup([
        { label: 'In lavorazione', variant: 'info' },
        { label: 'In sospeso', variant: 'warning' },
        { label: 'Consegnato', variant: 'success' },
        { label: 'Pagato', variant: 'success' },
        { label: 'Scaduto', variant: 'error' }
    ])
};
