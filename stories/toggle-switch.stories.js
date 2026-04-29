import { expect } from 'storybook/test';

const initToggleSwitch = (root) => {
    window.requestAnimationFrame(() => {
        if (window.SkillpressUI && window.SkillpressUI.ToggleSwitch) {
            window.SkillpressUI.ToggleSwitch.init(root);
        }
    });
};

const renderSwitch = ({
    checked = false,
    disabled = false,
    id,
    ariaLabel
} = {}) => {
    const classes = ['toggle-switch'];
    if (checked) classes.push('toggle-switch--checked');

    const attrs = [
        'type="button"',
        `class="${classes.join(' ')}"`,
        'role="switch"',
        `aria-checked="${checked ? 'true' : 'false'}"`,
        'data-toggle-switch'
    ];
    if (id) attrs.push(`id="${id}"`);
    if (ariaLabel) attrs.push(`aria-label="${ariaLabel}"`);
    if (disabled) {
        attrs.push('disabled');
        attrs.push('aria-disabled="true"');
    }

    return `
        <button ${attrs.join(' ')}>
            <span class="toggle-switch__thumb"></span>
        </button>
    `;
};

const renderField = ({
    checked = false,
    disabled = false,
    label = 'Multicopertina',
    id = 'sp-toggle-field'
} = {}) => `
    <span class="toggle-switch-field">
        ${renderSwitch({ checked, disabled, id, ariaLabel: label })}
        <label class="toggle-switch__label" for="${id}">${label}</label>
    </span>
`;

const mount = (html) => {
    const root = document.createElement('div');
    root.innerHTML = html;
    initToggleSwitch(root);
    return root;
};

export default {
    title: 'Primitives/ToggleSwitch',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Switch binario on/off accessibile, derivato dai sorgenti elements-ui (multicopertina + checkout multispedizione). La libreria controlla geometria, colori e behavior; il consumer controlla testo della label, stato iniziale e logica di business via evento `toggle-switch:change`.'
            }
        }
    }
};

export const Default = {
    render: () => mount(renderSwitch({ checked: false, ariaLabel: 'Toggle option' })),
    play: async ({ canvas, userEvent }) => {
        const sw = canvas.getByRole('switch', { name: 'Toggle option' });
        await expect(sw).toHaveAttribute('aria-checked', 'false');
        await userEvent.click(sw);
        await expect(sw).toHaveAttribute('aria-checked', 'true');
        await userEvent.click(sw);
        await expect(sw).toHaveAttribute('aria-checked', 'false');
    }
};

export const Checked = {
    render: () => mount(renderSwitch({ checked: true, ariaLabel: 'Toggle option' }))
};

export const Disabled = {
    render: () => mount(`
        <div style="display: flex; gap: 16px; align-items: center;">
            ${renderSwitch({ checked: false, disabled: true, ariaLabel: 'Disabled off' })}
            ${renderSwitch({ checked: true, disabled: true, ariaLabel: 'Disabled on' })}
        </div>
    `)
};

export const WithLabel = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${renderField({ checked: false, label: 'Multicopertina', id: 'sp-tw-multicop' })}
            ${renderField({ checked: true, label: 'Multispedizione', id: 'sp-tw-multiship' })}
        </div>
    `)
};

export const ReferenceFromElementsUI = {
    render: () => {
        /*
         * Riferimenti coperti da questa primitiva:
         *  - elements-ui/css/components/_form-inputs.css
         *      sezione: "TOGGLE SWITCH (multicopertina on/off)"
         *      selettori: .multicop-toggle, .multicop-switch,
         *                 .multicop-switch--active, .multicop-switch-knob,
         *                 .multicop-label
         *  - elements-ui/js/buttons/toggle-switch.js
         *      markup multicop con div + classi --active
         *  - elements-ui/js/checkout/checkout-toggle-switch.js
         *      markup checkout con button[role=switch][aria-checked]
         *      + .toggle-switch + .toggle-switch-handle
         *  - product-page-integration: toggle multicopertina nella sidebar
         *  - checkout: toggle multispedizione
         *
         * NON coperto: variante "segmented two-label" .iva-toggle / .iva-btn
         * (Lordo / Netto) presente in _form-inputs.css -- e' un pattern distinto
         * (segmented control), non un binary switch.
         */
        const root = document.createElement('div');
        root.style.maxWidth = '500px';
        root.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/buttons/toggle-switch.js</code> (multicopertina off / on).
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${renderField({ checked: false, label: 'Multicopertina', id: 'sp-ref-multicop-off' })}
                        ${renderField({ checked: true, label: 'Multicopertina', id: 'sp-ref-multicop-on' })}
                    </div>
                </div>

                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/checkout/checkout-toggle-switch.js</code> (multispedizione off / on).
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px; border: 1px solid var(--color-bg-gray-200); border-radius: var(--radius-xl); background: var(--color-bg-white);">
                            <div>
                                <p style="margin: 0; font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text);">Multispedizione</p>
                                <p style="margin: 2px 0 0; font-size: var(--font-size-xs); color: var(--color-text-light);">Invia i prodotti a indirizzi diversi</p>
                            </div>
                            ${renderSwitch({ checked: false, ariaLabel: 'Multispedizione' })}
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px; border: 1px solid var(--color-bg-gray-200); border-radius: var(--radius-xl); background: var(--color-bg-white);">
                            <div>
                                <p style="margin: 0; font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text);">Multispedizione</p>
                                <p style="margin: 2px 0 0; font-size: var(--font-size-xs); color: var(--color-text-light);">Invia i prodotti a indirizzi diversi</p>
                            </div>
                            ${renderSwitch({ checked: true, ariaLabel: 'Multispedizione' })}
                        </div>
                    </div>
                </div>

                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Disabled (off + on) -- nei sorgenti il disabled e' espresso con
                        <code>opacity: 0.5; pointer-events: none</code> sul wrapper; qui usiamo
                        <code>disabled</code> nativo del button.
                    </p>
                    <div style="display: flex; gap: 16px; align-items: center;">
                        ${renderSwitch({ checked: false, disabled: true, ariaLabel: 'Disabled off' })}
                        ${renderSwitch({ checked: true, disabled: true, ariaLabel: 'Disabled on' })}
                    </div>
                </div>
            </div>
        `;
        initToggleSwitch(root);
        return root;
    }
};
