import '../tokens/tokens.css';
import '../primitives/download-buttons.css';
import { expect } from 'storybook/test';

export default {
    title: 'Primitives/DownloadButtons',
};

const renderDefault = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="download-buttons__divider"></div>
        <div class="download-buttons">
            <a class="download-buttons__btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="download-buttons__btn" href="#template-placeholder" target="_blank" rel="noopener">
                Template
            </a>
        </div>
    `;
    return container;
};

export const Default = {
    render: renderDefault,
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('link', { name: /Istruzioni/ })).toHaveClass('download-buttons__btn');
        await expect(canvas.getByRole('link', { name: /Template/ })).toHaveClass('download-buttons__btn');
    }
};

export const SingleButton = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="download-buttons__divider"></div>
        <div class="download-buttons">
            <a class="download-buttons__btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
        </div>
    `;
    return container;
};

export const ThreeButtons = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="download-buttons__divider"></div>
        <div class="download-buttons">
            <a class="download-buttons__btn" href="#" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="download-buttons__btn" href="#" target="_blank" rel="noopener">
                Template
            </a>
            <a class="download-buttons__btn" href="#" target="_blank" rel="noopener">
                Scheda tecnica
            </a>
        </div>
    `;
    return container;
};

export const ReferenceFromElementsUI = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="download-buttons__divider"></div>
        <div class="download-buttons">
            <a class="download-buttons__btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="download-buttons__btn" href="#template-placeholder" target="_blank" rel="noopener">
                Template
            </a>
        </div>
    `;
    return container;
};
