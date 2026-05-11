import '../components/step-indicator.css';
import { expect } from 'storybook/test';

const renderStepCardItem = ({
    index,
    title,
    status,
    state = 'inactive'
} = {}) => {
    const itemActive = state === 'active' ? ' step-indicator__item--active' : '';
    const badgeMod = `step-indicator__badge--${state}`;
    const titleMod = state === 'active' ? 'step-indicator__title--active' : 'step-indicator__title--inactive';
    const statusMod = state === 'active' ? 'step-indicator__status--active' : 'step-indicator__status--inactive';

    return `
        <div class="step-indicator__item${itemActive}" data-step-indicator-step="${index}">
            <div class="step-card-content">
                <div class="step-indicator__badge ${badgeMod}">
                    <span>${index}</span>
                </div>
                <div class="step-info">
                    <h3 class="step-indicator__title ${titleMod}">${title}</h3>
                    <span class="step-indicator__status ${statusMod}">${status}</span>
                </div>
            </div>
        </div>
    `;
};

const renderSection = (steps) => {
    const root = document.createElement('div');
    root.style.padding = '1rem 0';
    root.innerHTML = `
        <div class="step-indicator">
            <div class="step-indicator__wrapper">
                <div class="step-indicator__container">
                    <div class="steps-line"></div>
                    <div class="steps-grid">
                        ${steps.map(renderStepCardItem).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    return root;
};

const defaultSteps = [
    { index: 1, title: 'Configura', status: 'In corso', state: 'active' },
    { index: 2, title: 'Carrello', status: 'In attesa', state: 'inactive' },
    { index: 3, title: 'Pagamento', status: 'In attesa', state: 'inactive' },
    { index: 4, title: 'Carica file', status: 'In attesa', state: 'inactive' }
];

export default {
    title: 'Components/StepIndicator',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Step indicator orizzontale per configuratori e flussi multi-step. CSS-only: il CMS sposta i modifier `--active`, `--inactive`, `--completed` su badge, titolo e status. Mobile-first: 2 colonne sotto 1024px, 4 colonne >=1024px. La linea di connessione e visibile solo da desktop.'
            }
        }
    }
};

export const Default = {
    render: () => renderSection(defaultSteps),
    play: async ({ canvasElement }) => {
        const items = canvasElement.querySelectorAll('.step-indicator__item');
        await expect(items.length).toBe(4);
        const active = canvasElement.querySelector('.step-indicator__badge--active');
        await expect(active).toBeTruthy();
    }
};

export const ContractReference = {
    render: () => {
        const root = document.createElement('div');
        root.style.padding = '1rem 0';
        root.innerHTML = `
            <div id="step-cards" class="step-indicator">
                <div class="step-indicator__wrapper">
                    <div class="step-indicator__container">
                        <div class="steps-line"></div>
                        <div class="steps-grid">
                            <div class="step-indicator__item step-indicator__item--active" data-step-indicator-step="1">
                                <div class="step-card-content">
                                    <div class="step-indicator__badge step-indicator__badge--active">
                                        <span>1</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-indicator__title step-indicator__title--active">Configura</h3>
                                        <span class="step-indicator__status step-indicator__status--active">In corso</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-indicator__item" data-step-indicator-step="2">
                                <div class="step-card-content">
                                    <div class="step-indicator__badge step-indicator__badge--inactive">
                                        <span>2</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-indicator__title step-indicator__title--inactive">Carrello</h3>
                                        <span class="step-indicator__status step-indicator__status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-indicator__item" data-step-indicator-step="3">
                                <div class="step-card-content">
                                    <div class="step-indicator__badge step-indicator__badge--inactive">
                                        <span>3</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-indicator__title step-indicator__title--inactive">Pagamento</h3>
                                        <span class="step-indicator__status step-indicator__status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-indicator__item" data-step-indicator-step="4">
                                <div class="step-card-content">
                                    <div class="step-indicator__badge step-indicator__badge--inactive">
                                        <span>4</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-indicator__title step-indicator__title--inactive">Carica file</h3>
                                        <span class="step-indicator__status step-indicator__status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return root;
    },
    parameters: {
        docs: {
            description: {
                story: 'Markup contract di riferimento.'
            }
        }
    }
};

export const MidProgress = {
    render: () => {
        const root = document.createElement('div');
        root.style.padding = '1rem 0';
        root.innerHTML = `
            <div class="step-indicator">
                <div class="step-indicator__wrapper">
                    <div class="step-indicator__container">
                        <div class="steps-line"></div>
                        <div class="steps-grid">
                            <div class="step-indicator__item" data-step-indicator-step="1">
                                <div class="step-card-content">
                                    <div class="step-indicator__badge step-indicator__badge--completed">
                                        <span>1</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-indicator__title step-indicator__title--inactive">Configura</h3>
                                        <span class="step-indicator__status step-indicator__status--inactive">Completato</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-indicator__item" data-step-indicator-step="2">
                                <div class="step-card-content">
                                    <div class="step-indicator__badge step-indicator__badge--completed">
                                        <span>2</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-indicator__title step-indicator__title--inactive">Carrello</h3>
                                        <span class="step-indicator__status step-indicator__status--inactive">Completato</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-indicator__item step-indicator__item--active" data-step-indicator-step="3">
                                <div class="step-card-content">
                                    <div class="step-indicator__badge step-indicator__badge--active">
                                        <span>3</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-indicator__title step-indicator__title--active">Pagamento</h3>
                                        <span class="step-indicator__status step-indicator__status--active">In corso</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-indicator__item" data-step-indicator-step="4">
                                <div class="step-card-content">
                                    <div class="step-indicator__badge step-indicator__badge--inactive">
                                        <span>4</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-indicator__title step-indicator__title--inactive">Carica file</h3>
                                        <span class="step-indicator__status step-indicator__status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return root;
    },
    parameters: {
        docs: {
            description: {
                story: 'Step 1 e 2 completati (badge verde `step-indicator__badge--completed`), step 3 attivo (badge gradient arancio + bordo card primary), step 4 in attesa.'
            }
        }
    }
};

export const ThreeSteps = {
    render: () => renderSection([
        { index: 1, title: 'Configura', status: 'Completato', state: 'completed' },
        { index: 2, title: 'Carrello', status: 'In corso', state: 'active' },
        { index: 3, title: 'Pagamento', status: 'In attesa', state: 'inactive' }
    ]),
    parameters: {
        docs: {
            description: {
                story: 'Variante a 3 step per CMS con meno fasi. La grid resta a 4 colonne >=1024px: la quarta cella non viene renderizzata, lo spazio rimane vuoto.'
            }
        }
    }
};

export const Mobile = {
    render: () => renderSection(defaultSteps),
    parameters: {
        viewport: { defaultViewport: 'mobile1' },
        docs: {
            description: {
                story: 'A viewport sotto 1024px la grid passa a 2 colonne e la `.steps-line` scompare. Per vedere il rendering effettivo serve restringere la finestra del browser sotto 1024px.'
            }
        }
    }
};
