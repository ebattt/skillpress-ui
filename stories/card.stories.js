const renderCard = ({
    variantClasses = '',
    title = 'Card base',
    description = 'Primitiva tecnica: superficie condivisa, non componente CMS.',
    disabled = false
} = {}) => {
    const root = document.createElement('div');
    const classes = ['card', variantClasses, disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
    const disabledAttr = disabled ? ' aria-disabled="true"' : '';

    root.innerHTML = `
        <article class="${classes}"${disabledAttr}>
            <div class="card__body">
                <h3 class="card__title">${title}</h3>
                <p class="card__description">${description}</p>
            </div>
        </article>
    `;

    return root;
};

const renderGrid = (cards) => {
    const root = document.createElement('div');

    root.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; max-width: 860px;">
            ${cards.map((card) => renderCard(card).innerHTML).join('')}
        </div>
    `;

    return root;
};

export default {
    title: 'Primitives/Card',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Card base della libreria Skillpress. E una primitiva di superficie e slot: non sostituisce product card, feature card, selection card, step card o dashboard order card.'
            }
        }
    }
};

export const Default = {
    render: () => {
        const root = document.createElement('div');
        root.style.maxWidth = '360px';
        root.innerHTML = renderCard({
            title: 'Card base',
            description: 'Solo superficie tecnica per componenti futuri tracciati nella matrice.'
        }).innerHTML;
        return root;
    }
};

export const InteractiveStates = {
    render: () => renderGrid([
        {
            title: 'Interattiva',
            description: 'Stato tecnico per componenti futuri.',
            variantClasses: 'card--interactive'
        },
        {
            title: 'Selezionata',
            description: 'Stato tecnico, non UI finale.',
            variantClasses: 'card--selected'
        },
        {
            title: 'Non disponibile',
            description: 'Stato tecnico senza logica JS.',
            variantClasses: 'card--interactive',
            disabled: true
        }
    ])
};

export const ReferenceFromElementsUI = {
    render: () => {
        const root = document.createElement('div');
        root.style.maxWidth = '760px';
        root.innerHTML = `
            <div style="font: inherit; color: var(--color-text);">
                <h3 style="margin: 0 0 8px; font-size: var(--font-size-base);">Nessuna card reale coperta 1:1</h3>
                <p style="margin: 0 0 16px; color: var(--color-text-secondary); font-size: var(--font-size-sm); line-height: var(--line-height-normal);">
                    Questa primitiva non corrisponde visivamente a una card CMS. Le card reali da estrarre sono tracciate nella matrice di copertura.
                </p>
                <ul style="display: grid; gap: 8px; margin: 0; padding-left: 18px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                    <li><code>format-card</code> / <code>paper-card</code> / <code>visual-card</code>: futura selection card.</li>
                    <li><code>feature-box</code>: futura feature card.</li>
                    <li><code>step-card-item</code>: futuro step indicator.</li>
                    <li><code>catalog-card--product-equal</code>: futura product/catalog card.</li>
                </ul>
            </div>
        `;
        return root;
    }
};
