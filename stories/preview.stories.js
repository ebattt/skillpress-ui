import '../components/preview.css';
import '../primitives/form-primitives.css';
import '../js/preview.js';
import { expect } from 'storybook/test';

const eyeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>';
const closeIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

const render = (open = false) => {
    const root = document.createElement('div');
    root.style.maxWidth = '680px';
    root.innerHTML = `
        <div class="preview${open ? ' preview--open' : ''}" data-preview>
            <div class="preview__row">
                <div class="preview__select">
                    <select class="form-select">
                        <option data-preview-title="Patinata Opaca"
                                data-preview-description="Carta patinata opaca di alta qualita, ideale per cataloghi e riviste."
                                data-preview-image="https://picsum.photos/seed/paper/480/480">
                            Patinata Opaca
                        </option>
                        <option data-preview-title="Usomano FSC"
                                data-preview-description="Carta usomano certificata FSC, indicata per libri e manuali."
                                data-preview-image="https://picsum.photos/seed/usomano-fsc/480/480">
                            Usomano FSC
                        </option>
                    </select>
                </div>
                <button class="preview__trigger" type="button" data-preview-trigger aria-controls="preview-story" aria-expanded="${open ? 'true' : 'false'}">
                    ${eyeIcon}<span>Anteprima</span>
                </button>
            </div>
            <div id="preview-story" class="preview__panel" data-preview-panel aria-hidden="${open ? 'false' : 'true'}">
                <div class="preview__content">
                    <div class="preview__image-wrap">
                        <div class="preview__image">
                            <img class="preview__image-media" src="https://picsum.photos/seed/paper/480/480" alt="Patinata Opaca">
                        </div>
                    </div>
                    <div class="preview__info">
                        <div class="preview__header">
                            <h4 class="preview__title">Patinata Opaca</h4>
                            <button class="preview__close" type="button" data-preview-close aria-label="Chiudi anteprima">${closeIcon}</button>
                        </div>
                        <p class="preview__description">Carta patinata opaca di alta qualita, ideale per cataloghi e riviste.</p>
                        <div class="preview__badges"><span class="preview__badge">FSC</span></div>
                    </div>
                </div>
            </div>
        </div>
    `;
    setTimeout(() => window.SkillpressUI.Preview.init(root.querySelector('[data-preview]')));
    return root;
};

export default { title: 'Components/Preview', tags: ['autodocs'] };

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

export const SyncFromSelect = {
    render: () => render(false),
    play: async ({ canvas, userEvent }) => {
        await userEvent.selectOptions(canvas.getByRole('combobox'), 'Usomano FSC');
        await expect(canvas.getByText('Usomano FSC')).toBeInTheDocument();
        await expect(canvas.getByText(/certificata FSC/i)).toBeInTheDocument();
    }
};
