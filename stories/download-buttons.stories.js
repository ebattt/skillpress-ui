import '../tokens/tokens.css';
import '../primitives/download-buttons.css';

export default {
    title: 'Primitives/DownloadButtons',
};

export const Default = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="config-download-btn" href="#template-placeholder" target="_blank" rel="noopener">
                Template
            </a>
        </div>
    `;
    return container;
};

export const SingleButton = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
        </div>
    `;
    return container;
};

export const ThreeButtons = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="config-download-btn" href="#" target="_blank" rel="noopener">
                Template
            </a>
            <a class="config-download-btn" href="#" target="_blank" rel="noopener">
                Scheda tecnica
            </a>
        </div>
    `;
    return container;
};

export const ReferenceFromElementsUI = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="config-download-btn" href="#template-placeholder" target="_blank" rel="noopener">
                Template
            </a>
        </div>
    `;
    return container;
};
