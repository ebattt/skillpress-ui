import { expect } from 'storybook/test';

const ERROR_ICON_SVG = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
`;

const CHECK_ICON_SVG = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"/>
    </svg>
`;

const mount = (html) => {
    const root = document.createElement('div');
    root.style.maxWidth = '480px';
    root.innerHTML = html;
    return root;
};

export default {
    title: 'Primitives/FormPrimitives',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Primitive form fondamentali: form-field, label-row, label-text (+ varianti required/optional/hint), form-input (+ --error/:disabled), form-select (+ :disabled), error-msg / success-inline, custom-dims__grid, nome-ref-row.'
            }
        }
    }
};

export const Default = {
    render: () => mount(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Stampa interna</label>
            </div>
            <select class="form-select">
                <option>4/4 Colori fronte e retro</option>
                <option>1/1 Nero fronte e retro</option>
                <option>1/1 Nero + max 10% di facciata a Colori</option>
            </select>
        </div>
    `),
    play: async ({ canvas }) => {
        const select = canvas.getByRole('combobox');
        await expect(select).toHaveClass('form-select');
        const label = canvas.getByText('Stampa interna');
        await expect(label).toHaveClass('label-text');
    }
};

export const FormInputStates = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Default</label>
                </div>
                <input type="text" class="form-input" value="Catalogo primavera"/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Errore</label>
                </div>
                <input type="number" class="form-input form-input--error" value="23"/>
                <div class="error-msg">
                    ${ERROR_ICON_SVG}
                    Il minimo è 24 facciate
                </div>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Disabilitato</label>
                </div>
                <input type="text" class="form-input" value="Non modificabile" disabled/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Salvato</label>
                </div>
                <input type="text" class="form-input" value="Mario Rossi"/>
                <div class="success-inline" style="margin-top: 0.25rem;">
                    ${CHECK_ICON_SVG}
                    Salvato correttamente
                </div>
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const inputs = canvas.getAllByRole('spinbutton');
        await expect(inputs[0]).toHaveClass('form-input--error');
    }
};

export const LabelVariants = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Nome del lavoro <span class="label-text__required">*</span></label>
                </div>
                <input type="text" class="form-input" placeholder="Es. Catalogo primavera"/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Referente</label>
                    <span class="label-text__optional">(opzionale)</span>
                </div>
                <input type="text" class="form-input" placeholder="Es. Mario Rossi"/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Facciate</label>
                    <span class="label-hint">(comprese le 4 di copertina)</span>
                    <button type="button" class="info-btn" aria-label="Info Facciate"></button>
                </div>
                <input type="number" class="form-input" value="48" min="24" step="4"/>
            </div>
        </div>
    `)
};

export const SelectStates = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Carta</label>
                </div>
                <select class="form-select">
                    <option>Patinata Opaca</option>
                    <option>Patinata Lucida</option>
                </select>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Grammatura (disabilitato)</label>
                </div>
                <select class="form-select" disabled>
                    <option>Seleziona prima la carta</option>
                </select>
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const selects = canvas.getAllByRole('combobox');
        await expect(selects[0]).toHaveClass('form-select');
        await expect(selects[1]).toBeDisabled();
    }
};

export const CustomDimsGrid = {
    render: () => mount(`
        <div class="custom-dims">
            <label class="label-text">Dimensioni personalizzate (mm)</label>
            <div class="custom-dims__grid">
                <div class="custom-dims__field">
                    <label class="label-text">Larghezza</label>
                    <input type="number" class="form-input" value="148" min="100" max="330"/>
                </div>
                <div class="custom-dims__field">
                    <label class="label-text">Altezza</label>
                    <input type="number" class="form-input" value="210" min="100" max="480"/>
                </div>
            </div>
        </div>
    `)
};

const SPESSORE_ICON_SVG = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="8 7 12 3 16 7"/>
        <polyline points="8 17 12 21 16 17"/>
        <line x1="12" y1="3" x2="12" y2="21"/>
    </svg>
`;

export const FacciateRow = {
    render: () => mount(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Facciate</label>
                <span class="label-hint">(comprese le 4 di copertina)</span>
            </div>
            <div class="facciate-row">
                <div class="facciate-input-wrap">
                    <input type="number" class="form-input" value="48" min="24" step="4"/>
                </div>
                <div class="spessore-display">
                    ${SPESSORE_ICON_SVG}
                    <span class="spessore-label">Spessore</span>
                    <span class="spessore-value">5.5 mm</span>
                </div>
            </div>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Layout flex per Step 1 "Facciate": input numerico (flex 1) + callout spessore mm (shrink 0). Il valore della `.spessore-value` e\' calcolato lato business logic; qui hardcoded come placeholder.'
            }
        }
    },
    play: async ({ canvas }) => {
        const value = canvas.getByText('5.5 mm');
        await expect(value).toHaveClass('spessore-value');
    }
};

export const NomeRefRow = {
    render: () => mount(`
        <div class="nome-ref-row">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
                    Nome del lavoro <span class="label-text__required">*</span>
                </label>
                <input type="text" class="form-input" placeholder="Es. Catalogo primavera"/>
            </div>
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
                    Referente <span class="label-text__optional">(opzionale)</span>
                </label>
                <input type="text" class="form-input" placeholder="Es. Mario Rossi"/>
            </div>
        </div>
    `)
};

export const ReferenceFromElementsUI = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Facciate</label>
                    <span class="label-hint">(comprese le 4 di copertina)</span>
                    <button type="button" class="info-btn" aria-label="Info Facciate"></button>
                </div>
                <input type="number" class="form-input form-input--error" value="23" min="24" step="4"/>
                <div class="error-msg">
                    ${ERROR_ICON_SVG}
                    Le facciate devono essere multiple di 4
                </div>
            </div>
            <div class="custom-dims">
                <label class="label-text">Dimensioni personalizzate (mm)</label>
                <div class="custom-dims__grid">
                    <div class="custom-dims__field">
                        <label class="label-text">Larghezza</label>
                        <input type="number" class="form-input" value="148" min="100" max="330"/>
                    </div>
                    <div class="custom-dims__field">
                        <label class="label-text">Altezza</label>
                        <input type="number" class="form-input" value="210" min="100" max="480"/>
                    </div>
                </div>
            </div>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Replica i blocchi di product-page-integration/js/sections/section-1.js (facciate con error + custom-dims).'
            }
        }
    }
};
