import '../tokens/tokens.css';
import '../primitives/orientation-toggle.css';
import { expect } from 'storybook/test';

export default {
    title: 'Product Page/Configurator/OrientationToggle',
};

const verticalSVG = `<svg width="10" height="14" viewBox="0 0 10 14" fill="none"><rect x="0.5" y="0.5" width="9" height="13" rx="1" stroke-width="1" fill="white"/></svg>`;
const horizontalSVG = `<svg width="14" height="10" viewBox="0 0 14 10" fill="none"><rect x="0.5" y="0.5" width="13" height="9" rx="1" stroke-width="1" fill="white"/></svg>`;

const renderDefault = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="orientation-toggle">
            <button class="orientation-toggle__btn orientation-toggle__btn--active">
                ${verticalSVG}
                Verticale
            </button>
            <button class="orientation-toggle__btn">
                ${horizontalSVG}
                Orizzontale
            </button>
        </div>
    `;
    return container;
};

export const Default = {
    render: renderDefault,
    play: async ({ canvas }) => {
        const v = canvas.getByRole('button', { name: /Verticale/ });
        const h = canvas.getByRole('button', { name: /Orizzontale/ });
        await expect(v).toHaveClass('orientation-toggle__btn--active');
        await expect(h).not.toHaveClass('orientation-toggle__btn--active');
    }
};

export const HorizontalActive = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="orientation-toggle">
            <button class="orientation-toggle__btn">
                ${verticalSVG}
                Verticale
            </button>
            <button class="orientation-toggle__btn orientation-toggle__btn--active">
                ${horizontalSVG}
                Orizzontale
            </button>
        </div>
    `;
    return container;
};

export const ReferenceFromElementsUI = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="orientation-toggle">
            <button class="orientation-toggle__btn orientation-toggle__btn--active">
                ${verticalSVG}
                Verticale
            </button>
            <button class="orientation-toggle__btn">
                ${horizontalSVG}
                Orizzontale
            </button>
        </div>
    `;
    return container;
};
