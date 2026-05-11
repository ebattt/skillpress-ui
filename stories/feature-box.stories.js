import { expect } from 'storybook/test';

const renderFeatureBox = ({
    title = 'Veloce',
    description = 'Stampa con ciclo rapido.',
    iconBg = '#E8F5F3',
    iconColor = '#1C7264',
    iconSvg = ''
} = {}) => {
    return `
        <div class="feature-box">
            <div class="feature-box__content">
                <div class="feature-box__icon" style="background-color: ${iconBg}; color: ${iconColor};">
                    ${iconSvg}
                </div>
                <div>
                    <h3 class="feature-box__title">${title}</h3>
                    <p class="feature-box__description">${description}</p>
                </div>
            </div>
        </div>
    `;
};

const icons = {
    bolt: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
    `,
    savings: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 11c0-3 2.7-5.5 7-5.5s7 2.5 7 5.5-2.7 5.5-7 5.5S5 14 5 11Z" stroke="currentColor" stroke-width="2" />
        <path d="M8 16.5V20h3M16 16.5V20h-3M9 10h.01M15 10h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    `,
    premium: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
    `,
    tune: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h8M16 7h4M4 17h4M12 17h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <circle cx="14" cy="7" r="2" stroke="currentColor" stroke-width="2" />
        <circle cx="10" cy="17" r="2" stroke="currentColor" stroke-width="2" />
    </svg>
    `
};

const productBoxes = [
    { title: 'Veloce', description: 'Stampa brossura fresata con ciclo rapido', iconBg: '#E8F5F3', iconColor: '#1C7264', iconSvg: icons.bolt },
    { title: 'Economica', description: 'Miglior rapporto qualita/prezzo', iconBg: '#FEF3E6', iconColor: '#F08A00', iconSvg: icons.savings },
    { title: 'Professionale', description: 'Finiture curate e nobilitazioni', iconBg: '#E6ECEE', iconColor: '#003E51', iconSvg: icons.premium },
    { title: 'Personalizzabile', description: 'Scegli formato e carta', iconBg: '#E9F5F2', iconColor: '#298979', iconSvg: icons.tune }
];

const renderGrid = (boxes) => {
    const root = document.createElement('div');
    root.style.maxWidth = '760px';
    root.innerHTML = `
        <div class="feature-grid">
            ${boxes.map(renderFeatureBox).join('')}
        </div>
    `;
    return root;
};

export default {
    title: 'Components/FeatureBox',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Griglia feature 2 colonne. Il backend controlla testo, numero di box e contenuto dell\'icona (inline SVG o img da URL CMS). La libreria fornisce griglia, contenitore icona e tipografia.'
            }
        }
    }
};

export const Default = {
    render: () => renderGrid(productBoxes),
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('heading', { name: 'Veloce' })).toBeInTheDocument();
        await expect(canvas.getByRole('heading', { name: 'Personalizzabile' })).toBeInTheDocument();
        const titles = canvas.getAllByRole('heading');
        await expect(titles.length).toBeGreaterThanOrEqual(4);
    }
};

export const ContractReference = {
    render: () => {
        const root = document.createElement('div');
        root.style.maxWidth = '760px';
        root.innerHTML = `
            <div class="feature-grid">
                ${productBoxes.map(renderFeatureBox).join('')}
            </div>
        `;
        return root;
    }
};

export const ComposedForCMS = {
    render: () => renderGrid(productBoxes)
};
