import { expect } from 'storybook/test';

const mount = (html) => {
    const root = document.createElement('div');
    root.style.maxWidth = '500px';
    root.innerHTML = html;
    return root;
};

const renderIndicator = ({ text = 'Mancano 20' } = {}) => `
    <span class="sp-validation-indicator">${text}</span>
`;

export default {
    title: 'Primitives/ValidationIndicator',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Indicatore inline per errori di validazione del configuratore.'
            }
        }
    }
};

export const Default = {
    render: () => mount(renderIndicator()),
    play: async ({ canvas }) => {
        const indicator = canvas.getByText('Mancano 20').closest('.sp-validation-indicator');
        await expect(indicator).toHaveClass('sp-validation-indicator');
    }
};

export const ErrorMessages = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${renderIndicator({ text: 'Mancano 20' })}
            ${renderIndicator({ text: 'Eccedono 50' })}
        </div>
    `),
    play: async ({ canvas }) => {
        const indicator = canvas.getByText('Eccedono 50').closest('.sp-validation-indicator');
        await expect(indicator).toHaveClass('sp-validation-indicator');
    }
};

export const ValidTotalNoIndicator = {
    render: () => mount(`
        <div class="sp-validation-total">
            <span class="sp-validation-total__count">Totale: <strong>50</strong> / 50 copie</span>
        </div>
    `),
    play: async ({ canvas }) => {
        const count = canvas.getByText(/Totale:/);
        await expect(count).toHaveClass('sp-validation-total__count');
    }
};

export const InvalidTotal = {
    render: () => mount(`
        <div class="sp-validation-total">
            <span class="sp-validation-total__count">Totale: <strong>40</strong> / 50 copie</span>
            ${renderIndicator({ text: 'Mancano 10 copie' })}
        </div>
    `)
};

export const ContractReference = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="sp-validation-total">
                <span class="sp-validation-total__count">Totale: <strong>500</strong> / 500</span>
            </div>
            <div class="sp-validation-total">
                <span class="sp-validation-total__count">Totale: <strong>350</strong> / 500</span>
                ${renderIndicator({ text: 'Mancano 150' })}
            </div>
            <div class="sp-validation-total">
                <span class="sp-validation-total__count">Totale: <strong>550</strong> / 500</span>
                ${renderIndicator({ text: 'Eccedono 50' })}
            </div>
        </div>
    `)
};
