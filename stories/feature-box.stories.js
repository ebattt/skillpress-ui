const renderFeatureBox = ({
    title = 'Veloce',
    description = 'Stampa con ciclo rapido.',
    iconBg = 'var(--price-iva-badge)',
    iconSvg = ''
} = {}) => {
    return `
        <div class="feature-box">
            <div class="feature-box__content">
                <div class="feature-box__icon" style="background-color: ${iconBg};">
                    ${iconSvg}
                </div>
                <div class="feature-box__text">
                    <h3 class="feature-box__title">${title}</h3>
                    <p class="feature-box__description">${description}</p>
                </div>
            </div>
        </div>
    `;
};

const placeholderSvg = (color) => `
    <svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/>
        <path d="M9 12l2 2 4-4"/>
    </svg>
`;

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
    render: () => renderGrid([
        { title: 'Veloce', description: 'Stampa brossura fresata con ciclo rapido', iconBg: '#E8F5F3', iconSvg: placeholderSvg('#1C7264') },
        { title: 'Economica', description: 'Miglior rapporto qualita/prezzo', iconBg: '#FEF3E6', iconSvg: placeholderSvg('#EA580C') },
        { title: 'Professionale', description: 'Finiture curate e nobilitazioni', iconBg: '#E6ECEE', iconSvg: placeholderSvg('#003E51') },
        { title: 'Personalizzabile', description: 'Scegli formato e carta', iconBg: '#E9F5F2', iconSvg: placeholderSvg('#16A34A') }
    ])
};

export const TextOnlySlot = {
    render: () => renderGrid([
        { title: 'Veloce', description: 'Stampa brossura fresata con ciclo rapido', iconBg: 'var(--color-bg-gray-100)' },
        { title: 'Economica', description: 'Miglior rapporto qualita/prezzo', iconBg: 'var(--color-bg-gray-100)' }
    ])
};

export const ReferenceFromElementsUI = {
    render: () => {
        const root = document.createElement('div');
        root.style.maxWidth = '760px';
        root.innerHTML = `
            <p style="margin: 0 0 16px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                Riferimento <code>elements-ui/js/cards/card-feature.js</code> e <code>product-page-integration/index.html</code>.
                L\'icona di Material Symbols originale e sostituita da SVG inline o &lt;img&gt; controllato dal consumer/CMS.
            </p>
            <div class="feature-grid">
                ${renderFeatureBox({ title: 'Veloce', description: 'Stampa brossura fresata con ciclo rapido', iconBg: '#E8F5F3', iconSvg: placeholderSvg('#1C7264') })}
                ${renderFeatureBox({ title: 'Economica', description: 'Miglior rapporto qualita/prezzo', iconBg: '#FEF3E6', iconSvg: placeholderSvg('#EA580C') })}
                ${renderFeatureBox({ title: 'Professionale', description: 'Finiture curate e nobilitazioni', iconBg: '#E6ECEE', iconSvg: placeholderSvg('#003E51') })}
                ${renderFeatureBox({ title: 'Personalizzabile', description: 'Scegli formato e carta', iconBg: '#E9F5F2', iconSvg: placeholderSvg('#16A34A') })}
            </div>
        `;
        return root;
    }
};
