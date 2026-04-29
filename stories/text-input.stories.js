import { expect, userEvent } from 'storybook/test';

const INFO_ICON_SVG = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
`;

const ERROR_ICON_SVG = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
`;

const mount = (html) => {
    const root = document.createElement('div');
    root.style.maxWidth = '480px';
    root.innerHTML = html;
    return root;
};

export default {
    title: 'Primitives/TextInput',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `Showcase delle 7 varianti del catalog Text Input.

Tutti i selettori provengono dalla primitiva FormPrimitives gia' coperta:
\`.form-field\`, \`.label-row\`, \`.label-text\` (+ \`__required\`/\`__optional\`),
\`.label-hint\`, \`.form-input\` (+ \`--error\`/\`:disabled\`/\`:focus\`),
\`.error-msg\`, \`.nome-ref-row\`. La variante 6 introduce \`.nome-lavoro-input\`
come alias semantico di \`.form-input\` (CSS identico, classe distinta per la
sezione "Nome del lavoro").

Strategia A static snapshot: validazione e swap modifier sono business logic
consumer-side.`
            }
        }
    }
};

export const Default = {
    render: () => mount(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio</label>
            </div>
            <input type="text" class="form-input" placeholder="Inserisci valore..."/>
        </div>
    `),
    play: async ({ canvas }) => {
        const input = canvas.getByPlaceholderText('Inserisci valore...');
        await expect(input).toHaveClass('form-input');
        await userEvent.click(input);
        await expect(input).toHaveFocus();
    }
};

export const WithLabelAndInfoButton = {
    render: () => mount(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                <button type="button" class="info-btn" aria-label="Info Campo Esempio">
                    ${INFO_ICON_SVG}
                </button>
            </div>
            <input type="text" class="form-input" placeholder="Inserisci valore..."/>
        </div>
    `)
};

export const WithLabelHint = {
    render: () => mount(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio</label>
                <span class="label-hint">(testo di aiuto)</span>
                <button type="button" class="info-btn" aria-label="Info Campo Esempio">
                    ${INFO_ICON_SVG}
                </button>
            </div>
            <input type="text" class="form-input" placeholder="Inserisci valore..."/>
        </div>
    `)
};

export const ErrorState = {
    render: () => mount(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
            </div>
            <input type="text" class="form-input form-input--error" value=""/>
            <div class="error-msg">
                ${ERROR_ICON_SVG}
                Questo campo e obbligatorio
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const input = canvas.getByRole('textbox');
        await expect(input).toHaveClass('form-input--error');
    }
};

export const Disabled = {
    render: () => mount(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio</label>
            </div>
            <input type="text" class="form-input" value="Non modificabile" disabled/>
        </div>
    `),
    play: async ({ canvas }) => {
        const input = canvas.getByRole('textbox');
        await expect(input).toBeDisabled();
    }
};

export const NomeLavoroInput = {
    render: () => mount(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
            </div>
            <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore..."/>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Variante 6: classe `.nome-lavoro-input` come alias semantico di `.form-input`. Stessa resa visiva, classe distinta per la sezione "Nome del lavoro". Useful quando il backend genera markup specifico per quella sezione e vuole una classe dedicata per stile/test/CSS-targeting futuro.'
            }
        }
    },
    play: async ({ canvas }) => {
        const input = canvas.getByPlaceholderText('Inserisci valore...');
        await expect(input).toHaveClass('nome-lavoro-input');
    }
};

export const TwoColumnLayout = {
    render: () => mount(`
        <div class="nome-ref-row">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
                    Campo Esempio <span class="label-text__required">*</span>
                </label>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
                    Campo Esempio <span class="label-text__optional">(opzionale)</span>
                </label>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
        </div>
    `)
};

export const AllVariants = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio</label>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                    <button type="button" class="info-btn" aria-label="Info">${INFO_ICON_SVG}</button>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio</label>
                    <span class="label-hint">(testo di aiuto)</span>
                    <button type="button" class="info-btn" aria-label="Info">${INFO_ICON_SVG}</button>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                </div>
                <input type="text" class="form-input form-input--error" value=""/>
                <div class="error-msg">${ERROR_ICON_SVG}Questo campo e obbligatorio</div>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio</label>
                </div>
                <input type="text" class="form-input" value="Non modificabile" disabled/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
                </div>
                <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="nome-ref-row">
                <div>
                    <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Campo Esempio <span class="label-text__required">*</span></label>
                    <input type="text" class="form-input" placeholder="Inserisci valore..."/>
                </div>
                <div>
                    <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
                    <input type="text" class="form-input" placeholder="Inserisci valore..."/>
                </div>
            </div>
        </div>
    `)
};

export const ReferenceFromElementsUI = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-field">
                <div class="label-row"><label class="label-text">Campo Esempio</label></div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                    <button type="button" class="info-btn" aria-label="Info">${INFO_ICON_SVG}</button>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
                </div>
                <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore..."/>
            </div>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Replica una selezione delle 7 varianti dal preview catalog elements-ui (`elements-ui/js/components-form-inputs.js#L1-L127`). Material Symbols del catalog sostituiti con SVG inline.'
            }
        }
    }
};
