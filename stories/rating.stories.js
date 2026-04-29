import '../primitives/rating.css';
import { expect } from 'storybook/test';

const renderRating = (percent = 100) => {
    const root = document.createElement('div');
    root.style.display = 'inline-flex';
    root.style.alignItems = 'center';
    root.style.gap = '0.625rem';
    root.innerHTML = `
        <div class="rating">
            <div class="rating__empty">
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
            </div>
            <div class="rating__filled" style="width: ${percent}%;">
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
            </div>
        </div>
    `;
    return root;
};

const renderScale = () => {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.gap = '0.75rem';
    wrap.style.fontFamily = 'inherit';
    [5, 4.85, 4, 3.5, 2.2, 0].forEach((rating) => {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'center';
        row.style.gap = '0.75rem';
        const percent = (rating / 5) * 100;
        row.innerHTML = `
            <span style="min-width: 3rem; font-weight: 600;">${rating.toFixed(2)}</span>
            <div class="rating">
                <div class="rating__empty">
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                </div>
                <div class="rating__filled" style="width: ${percent}%;">
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                </div>
            </div>
            <span style="color: var(--color-text-light); font-size: var(--font-size-sm);">${Math.round(percent)}%</span>
        `;
        wrap.appendChild(row);
    });
    return wrap;
};

export default {
    title: 'Primitives/Rating',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Rating CSS-only a stelle sovrapposte. La percentuale di riempimento viene controllata via inline style sulla larghezza di .rating__filled. Calcolo: (rating / 5) * 100.'
            }
        }
    }
};

export const Default = {
    render: () => renderRating(97),
    play: async ({ canvasElement }) => {
        const filled = canvasElement.querySelector('.rating__filled');
        await expect(filled).toBeTruthy();
        await expect(filled.style.width).toBe('97%');
    }
};

export const Scale = {
    render: () => renderScale(),
    parameters: {
        docs: {
            description: {
                story: 'Tutti i livelli di rating (0, 2.2, 3.5, 4, 4.85, 5) renderizzati con lo stesso markup, cambia solo width inline.'
            }
        }
    }
};

export const Empty = {
    render: () => renderRating(0)
};

export const Full = {
    render: () => renderRating(100)
};
