import { expect, userEvent } from 'storybook/test';

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
\`.sp-form-field\`, \`.sp-label-row\`, \`.sp-label-text\` (+ \`__required\`/\`__optional\`),
\`.sp-label-hint\`, \`.sp-form-input\` (+ \`--error\`/\`:disabled\`/\`:focus\`),
\`.sp-error-msg\`, \`.sp-nome-ref-row\`. La variante 6 introduce \`.sp-nome-lavoro-input\`
come alias semantico di \`.sp-form-input\` (CSS identico, classe distinta per la
sezione "Nome del lavoro").

Strategia A static snapshot: validazione e swap modifier sono business logic
consumer-side.`
            }
        }
    }
};

export const Default = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Campo Esempio</label>
            </div>
            <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
        </div>
    `),
    play: async ({ canvas }) => {
        const input = canvas.getByPlaceholderText('Inserisci valore...');
        await expect(input).toHaveClass('sp-form-input');
        await userEvent.click(input);
        await expect(input).toHaveFocus();
    }
};

export const WithLabelAndInfoButton = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Campo Esempio <span class="sp-label-text__required">*</span></label>
                <button type="button" class="sp-info-btn" aria-label="Info Campo Esempio"></button>
            </div>
            <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
        </div>
    `)
};

export const WithLabelHint = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Campo Esempio</label>
                <span class="sp-label-hint">(testo di aiuto)</span>
                <button type="button" class="sp-info-btn" aria-label="Info Campo Esempio"></button>
            </div>
            <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
        </div>
    `)
};

export const ErrorState = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Campo Esempio <span class="sp-label-text__required">*</span></label>
            </div>
            <input type="text" class="sp-form-input sp-form-input--error" value=""/>
            <div class="sp-error-msg">
                ${ERROR_ICON_SVG}
                Questo campo e obbligatorio
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const input = canvas.getByRole('textbox');
        await expect(input).toHaveClass('sp-form-input--error');
    }
};

export const Disabled = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Campo Esempio</label>
            </div>
            <input type="text" class="sp-form-input" value="Non modificabile" disabled/>
        </div>
    `),
    play: async ({ canvas }) => {
        const input = canvas.getByRole('textbox');
        await expect(input).toBeDisabled();
    }
};

export const NomeLavoroInput = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Campo Esempio <span class="sp-label-text__optional">(opzionale)</span></label>
            </div>
            <input type="text" class="sp-nome-lavoro-input" placeholder="Inserisci valore..."/>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Variante 6: classe `.sp-nome-lavoro-input` come alias semantico di `.sp-form-input`. Stessa resa visiva, classe distinta per la sezione "Nome del lavoro". Useful quando il backend genera markup specifico per quella sezione e vuole una classe dedicata per stile/test/CSS-targeting futuro.'
            }
        }
    },
    play: async ({ canvas }) => {
        const input = canvas.getByPlaceholderText('Inserisci valore...');
        await expect(input).toHaveClass('sp-nome-lavoro-input');
    }
};

export const TwoColumnLayout = {
    render: () => mount(`
        <div class="sp-nome-ref-row">
            <div>
                <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">
                    Campo Esempio <span class="sp-label-text__required">*</span>
                </label>
                <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
            </div>
            <div>
                <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">
                    Campo Esempio <span class="sp-label-text__optional">(opzionale)</span>
                </label>
                <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
            </div>
        </div>
    `)
};

export const AllVariants = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Campo Esempio</label>
                </div>
                <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Campo Esempio <span class="sp-label-text__required">*</span></label>
                    <button type="button" class="sp-info-btn" aria-label="Info"></button>
                </div>
                <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Campo Esempio</label>
                    <span class="sp-label-hint">(testo di aiuto)</span>
                    <button type="button" class="sp-info-btn" aria-label="Info"></button>
                </div>
                <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Campo Esempio <span class="sp-label-text__required">*</span></label>
                </div>
                <input type="text" class="sp-form-input sp-form-input--error" value=""/>
                <div class="sp-error-msg">${ERROR_ICON_SVG}Questo campo e obbligatorio</div>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Campo Esempio</label>
                </div>
                <input type="text" class="sp-form-input" value="Non modificabile" disabled/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Campo Esempio <span class="sp-label-text__optional">(opzionale)</span></label>
                </div>
                <input type="text" class="sp-nome-lavoro-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="sp-nome-ref-row">
                <div>
                    <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">Campo Esempio <span class="sp-label-text__required">*</span></label>
                    <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
                </div>
                <div>
                    <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">Campo Esempio <span class="sp-label-text__optional">(opzionale)</span></label>
                    <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
                </div>
            </div>
        </div>
    `)
};

export const ReferenceFromElementsUI = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="sp-form-field">
                <div class="sp-label-row"><label class="sp-label-text">Campo Esempio</label></div>
                <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Campo Esempio <span class="sp-label-text__required">*</span></label>
                    <button type="button" class="sp-info-btn" aria-label="Info"></button>
                </div>
                <input type="text" class="sp-form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Campo Esempio <span class="sp-label-text__optional">(opzionale)</span></label>
                </div>
                <input type="text" class="sp-nome-lavoro-input" placeholder="Inserisci valore..."/>
            </div>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Replica una selezione delle 7 varianti dal preview catalog elements-ui (`elements-ui/js/components-form-inputs.js#L1-L127`). Le icone Info sono disegnate dalla libreria via CSS.'
            }
        }
    }
};
