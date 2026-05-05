import '../components/preview.css';
import '../primitives/form-primitives.css';
import '../js/preview.js';
import { expect } from 'storybook/test';

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
                    <span>Anteprima</span>
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
                            <button class="preview__close" type="button" data-preview-close aria-label="Chiudi anteprima"></button>
                        </div>
                        <p class="preview__description">Carta patinata opaca di alta qualita, ideale per cataloghi e riviste. Certificazione FSC indicata nel testo descrittivo quando gestita da CMS.</p>
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
