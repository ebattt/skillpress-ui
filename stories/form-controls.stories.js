import { expect } from 'storybook/test';

const mount = (html) => {
    const root = document.createElement('div');
    root.style.maxWidth = '480px';
    root.innerHTML = html;
    return root;
};

export default {
    title: 'Primitives/FormControls',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Radio group + checkbox option + radio-option--disabled. La famiglia condivide .sp-radio-group + .sp-radio-option: cambia solo il tipo di <input>. :checked e :disabled sono nativi.'
            }
        }
    }
};

export const Default = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Tipo rilegatura</label>
            </div>
            <div class="sp-radio-group">
                <label class="sp-radio-option">
                    <input type="radio" name="default-rileg" value="brossura" checked>
                    <span class="sp-radio-option-label">Brossura fresata PUR</span>
                </label>
                <label class="sp-radio-option">
                    <input type="radio" name="default-rileg" value="non-rilegata">
                    <span class="sp-radio-option-label">Non rilegata, tagliata</span>
                </label>
                <label class="sp-radio-option">
                    <input type="radio" name="default-rileg" value="non-rilegata-nt">
                    <span class="sp-radio-option-label">Non rilegata, non tagliata</span>
                </label>
            </div>
        </div>
    `),
    play: async ({ canvas, userEvent }) => {
        const radios = canvas.getAllByRole('radio');
        await expect(radios[0]).toBeChecked();
        await expect(radios[1]).not.toBeChecked();
        await userEvent.click(radios[1]);
        await expect(radios[1]).toBeChecked();
        await expect(radios[0]).not.toBeChecked();
    }
};

export const HorizontalLayout = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Orientamento</label>
            </div>
            <div class="sp-radio-group" style="flex-direction: row; gap: 1rem;">
                <label class="sp-radio-option">
                    <input type="radio" name="horiz-orient" value="vertical" checked>
                    <span class="sp-radio-option-label">Verticale</span>
                </label>
                <label class="sp-radio-option">
                    <input type="radio" name="horiz-orient" value="horizontal">
                    <span class="sp-radio-option-label">Orizzontale</span>
                </label>
            </div>
        </div>
    `)
};

export const RadioWithDisabled = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Tipo rilegatura</label>
            </div>
            <div class="sp-radio-group">
                <label class="sp-radio-option">
                    <input type="radio" name="rileg-dis" value="brossura" checked>
                    <span class="sp-radio-option-label">Brossura fresata PUR</span>
                </label>
                <label class="sp-radio-option sp-radio-option--disabled">
                    <input type="radio" name="rileg-dis" value="spirale" disabled>
                    <span class="sp-radio-option-label">Spirale metallica (non disponibile)</span>
                </label>
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const radios = canvas.getAllByRole('radio');
        await expect(radios[1]).toBeDisabled();
        const labels = canvas.getAllByText(/Spirale metallica/);
        await expect(labels[0].closest('label')).toHaveClass('sp-radio-option--disabled');
    }
};

export const CheckboxSingle = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
                <strong style="font-size: 12px; color: #6B7280;">Unchecked</strong>
                <div class="sp-radio-group" style="margin-top: 0.25rem;">
                    <label class="sp-radio-option">
                        <input type="checkbox">
                        <span class="sp-radio-option-label">Aggiungi certificazione FSC</span>
                    </label>
                </div>
            </div>
            <div>
                <strong style="font-size: 12px; color: #6B7280;">Checked</strong>
                <div class="sp-radio-group" style="margin-top: 0.25rem;">
                    <label class="sp-radio-option">
                        <input type="checkbox" checked>
                        <span class="sp-radio-option-label">Aggiungi certificazione FSC</span>
                    </label>
                </div>
            </div>
        </div>
    `),
    play: async ({ canvas, userEvent }) => {
        const checkboxes = canvas.getAllByRole('checkbox');
        await expect(checkboxes[0]).not.toBeChecked();
        await expect(checkboxes[1]).toBeChecked();
        await userEvent.click(checkboxes[0]);
        await expect(checkboxes[0]).toBeChecked();
    }
};

export const CheckboxGroup = {
    render: () => mount(`
        <div class="sp-form-field">
            <div class="sp-label-row">
                <label class="sp-label-text">Opzioni aggiuntive</label>
            </div>
            <div class="sp-radio-group">
                <label class="sp-radio-option">
                    <input type="checkbox" checked>
                    <span class="sp-radio-option-label">Certificazione FSC</span>
                </label>
                <label class="sp-radio-option">
                    <input type="checkbox">
                    <span class="sp-radio-option-label">Cellophane singolo</span>
                </label>
                <label class="sp-radio-option">
                    <input type="checkbox">
                    <span class="sp-radio-option-label">Segnalibro in raso</span>
                </label>
                <label class="sp-radio-option">
                    <input type="checkbox" checked>
                    <span class="sp-radio-option-label">Prova colore digitale</span>
                </label>
            </div>
        </div>
    `)
};

export const CheckboxWithDisabled = {
    render: () => mount(`
        <div class="sp-radio-group">
            <label class="sp-radio-option sp-radio-option--disabled">
                <input type="checkbox" disabled>
                <span class="sp-radio-option-label">Certificazione FSC (non disponibile per questo formato)</span>
            </label>
            <label class="sp-radio-option sp-radio-option--disabled">
                <input type="checkbox" checked disabled>
                <span class="sp-radio-option-label">Prova colore (inclusa obbligatoriamente)</span>
            </label>
        </div>
    `),
    play: async ({ canvas }) => {
        const checkboxes = canvas.getAllByRole('checkbox');
        await expect(checkboxes[0]).toBeDisabled();
        await expect(checkboxes[1]).toBeDisabled();
        await expect(checkboxes[1]).toBeChecked();
    }
};

export const ContractReference = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Tempi di consegna</label>
                </div>
                <div class="sp-radio-group">
                    <label class="sp-radio-option">
                        <input type="radio" name="ref-delivery" value="standard" checked>
                        <span class="sp-radio-option-label">Standard (5 gg lavorativi) — Gratis</span>
                    </label>
                    <label class="sp-radio-option">
                        <input type="radio" name="ref-delivery" value="express">
                        <span class="sp-radio-option-label">Express (2 gg lavorativi) — + 12,00 €</span>
                    </label>
                    <label class="sp-radio-option">
                        <input type="radio" name="ref-delivery" value="urgente">
                        <span class="sp-radio-option-label">Urgente (1 gg lavorativo) — + 25,00 €</span>
                    </label>
                </div>
            </div>
            <div class="sp-form-field">
                <div class="sp-label-row">
                    <label class="sp-label-text">Servizi inclusi</label>
                </div>
                <div class="sp-radio-group">
                    <label class="sp-radio-option">
                        <input type="checkbox" checked>
                        <span class="sp-radio-option-label">Certificazione FSC</span>
                    </label>
                    <label class="sp-radio-option">
                        <input type="checkbox">
                        <span class="sp-radio-option-label">Cellophane singolo</span>
                    </label>
                    <label class="sp-radio-option sp-radio-option--disabled">
                        <input type="checkbox" disabled>
                        <span class="sp-radio-option-label">Segnalibro in raso (non disponibile per questo formato)</span>
                    </label>
                </div>
            </div>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Varianti contract di riferimento.'
            }
        }
    }
};
