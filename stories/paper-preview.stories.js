import '../components/paper-preview.css';
import '../primitives/form-primitives.css';
import '../js/paper-preview.js';
import { expect } from 'storybook/test';

const eyeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

const render = (open = false) => {
    const root = document.createElement('div');
    root.style.maxWidth = '680px';
    root.innerHTML = `
        <div class="paper-preview${open ? ' paper-preview--open' : ''}" data-paper-preview>
            <div class="paper-preview__row">
                <div class="paper-preview__select">
                    <select class="form-select"><option>Patinata Opaca</option><option>Usomano FSC</option></select>
                </div>
                <button class="paper-preview__trigger" type="button" data-paper-preview-trigger aria-controls="paper-preview-story" aria-expanded="${open ? 'true' : 'false'}">
                    ${eyeIcon}<span>Anteprima</span>
                </button>
            </div>
            <div id="paper-preview-story" class="paper-preview__panel" data-paper-preview-panel aria-hidden="${open ? 'false' : 'true'}">
                <div class="paper-preview__content">
                    <div class="paper-preview__image-wrap">
                        <div class="paper-preview__image">
                            <img class="paper-preview__image-media" src="https://picsum.photos/seed/paper/480/480" alt="Patinata Opaca">
                        </div>
                    </div>
                    <div class="paper-preview__info">
                        <div class="paper-preview__header">
                            <h4 class="paper-preview__title">Patinata Opaca</h4>
                            <button class="paper-preview__close" type="button" data-paper-preview-close aria-label="Chiudi anteprima">${closeIcon}</button>
                        </div>
                        <p class="paper-preview__description">Carta patinata opaca di alta qualita, ideale per cataloghi e riviste.</p>
                        <div class="paper-preview__badges"><span class="paper-preview__badge">FSC</span></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    setTimeout(() => window.SkillpressUI.PaperPreview.init(root.querySelector('[data-paper-preview]')));
    return root;
};

export default { title: 'Components/PaperPreview', tags: ['autodocs'] };

export const Default = {
    render: () => render(false),
    play: async ({ canvas, userEvent }) => {
        const btn = canvas.getByRole('button', { name: /anteprima/i });
        await userEvent.click(btn);
        await expect(btn).toHaveAttribute('aria-expanded', 'true');
    }
};

export const Open = {
    render: () => render(true),
    play: async ({ canvas }) => {
        await expect(canvas.getByText('Patinata Opaca')).toBeInTheDocument();
    }
};
