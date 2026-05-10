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
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Stampa interna</label>
            </div>
            <select class="sp-form-select">
                <option>4/4 Colori fronte e retro</option>
                <option>1/1 Nero fronte e retro</option>
                <option>1/1 Nero + max 10% di facciata a Colori</option>
            </select>
        </div>
    `),
    play: async ({ canvas }) => {
        const select = canvas.getByRole('combobox');
        await expect(select).toHaveClass('sp-form-select');
        const label = canvas.getByText('Stampa interna');
        await expect(label).toHaveClass('sp-label-text');
    }
};

export const FormInputStates = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Default</label>
                </div>
                <input type="text" class="sp-form-input" value="Catalogo primavera"/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Errore</label>
                </div>
                <input type="number" class="sp-form-input sp-form-input--error" value="23"/>
                <div class="sp-error-msg">
                    ${ERROR_ICON_SVG}
                    Il minimo è 24 facciate
                </div>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Disabilitato</label>
                </div>
                <input type="text" class="sp-form-input" value="Non modificabile" disabled/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Salvato</label>
                </div>
                <input type="text" class="sp-form-input" value="Mario Rossi"/>
                <div class="sp-success-inline" style="margin-top: 0.25rem;">
                    ${CHECK_ICON_SVG}
                    Salvato correttamente
                </div>
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const inputs = canvas.getAllByRole('spinbutton');
        await expect(inputs[0]).toHaveClass('sp-form-input--error');
    }
};

export const LabelVariants = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Nome del lavoro <span class="sp-label-text__required">*</span></label>
                </div>
                <input type="text" class="sp-form-input" placeholder="Es. Catalogo primavera"/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Referente</label>
                    <span class="sp-label-text__optional">(opzionale)</span>
                </div>
                <input type="text" class="sp-form-input" placeholder="Es. Mario Rossi"/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Facciate</label>
                    <span class="sp-label-hint">(comprese le 4 di copertina)</span>
                    <button type="button" class="sp-info-btn" aria-label="Info Facciate"></button>
                </div>
                <input type="number" class="sp-form-input" value="48" min="24" step="4"/>
            </div>
        </div>
    `)
};

export const SelectStates = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Carta</label>
                </div>
                <select class="sp-form-select">
                    <option>Patinata Opaca</option>
                    <option>Patinata Lucida</option>
                </select>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Grammatura (disabilitato)</label>
                </div>
                <select class="sp-form-select" disabled>
                    <option>Seleziona prima la carta</option>
                </select>
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const selects = canvas.getAllByRole('combobox');
        await expect(selects[0]).toHaveClass('sp-form-select');
        await expect(selects[1]).toBeDisabled();
    }
};

export const CustomDimsGrid = {
    render: () => mount(`
        <div class="sp-custom-dims">
            <label class="sp-label-text">Dimensioni personalizzate (mm)</label>
            <div class="sp-custom-dims__grid">
                <div class="sp-custom-dims__field">
                    <label class="sp-label-text">Larghezza</label>
                    <input type="number" class="sp-form-input" value="148" min="100" max="330"/>
                </div>
                <div class="sp-custom-dims__field">
                    <label class="sp-label-text">Altezza</label>
                    <input type="number" class="sp-form-input" value="210" min="100" max="480"/>
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
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Facciate</label>
                <span class="sp-label-hint">(comprese le 4 di copertina)</span>
            </div>
            <div class="sp-facciate-row">
                <div class="sp-facciate-input-wrap">
                    <input type="number" class="sp-form-input" value="48" min="24" step="4"/>
                </div>
                <div class="sp-spessore-display">
                    ${SPESSORE_ICON_SVG}
                    <span class="sp-spessore-label">Spessore</span>
                    <span class="sp-spessore-value">5.5 mm</span>
                </div>
            </div>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Layout flex per Step 1 "Facciate": input numerico (flex 1) + callout spessore mm (shrink 0). Il valore della `.sp-spessore-value` e\' calcolato lato business logic; qui hardcoded come placeholder.'
            }
        }
    },
    play: async ({ canvas }) => {
        const value = canvas.getByText('5.5 mm');
        await expect(value).toHaveClass('sp-spessore-value');
    }
};

export const NomeRefRow = {
    render: () => mount(`
        <div class="sp-nome-ref-row">
            <div>
                <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">
                    Nome del lavoro <span class="sp-label-text__required">*</span>
                </label>
                <input type="text" class="sp-form-input" placeholder="Es. Catalogo primavera"/>
            </div>
            <div>
                <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">
                    Referente <span class="sp-label-text__optional">(opzionale)</span>
                </label>
                <input type="text" class="sp-form-input" placeholder="Es. Mario Rossi"/>
            </div>
        </div>
    `)
};

export const ReferenceFromElementsUI = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Facciate</label>
                    <span class="sp-label-hint">(comprese le 4 di copertina)</span>
                    <button type="button" class="sp-info-btn" aria-label="Info Facciate"></button>
                </div>
                <input type="number" class="sp-form-input sp-form-input--error" value="23" min="24" step="4"/>
                <div class="sp-error-msg">
                    ${ERROR_ICON_SVG}
                    Le facciate devono essere multiple di 4
                </div>
            </div>
            <div class="sp-custom-dims">
                <label class="sp-label-text">Dimensioni personalizzate (mm)</label>
                <div class="sp-custom-dims__grid">
                    <div class="sp-custom-dims__field">
                        <label class="sp-label-text">Larghezza</label>
                        <input type="number" class="sp-form-input" value="148" min="100" max="330"/>
                    </div>
                    <div class="sp-custom-dims__field">
                        <label class="sp-label-text">Altezza</label>
                        <input type="number" class="sp-form-input" value="210" min="100" max="480"/>
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
