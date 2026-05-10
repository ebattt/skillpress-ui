import { expect } from 'storybook/test';

const mount = (html) => {
    const root = document.createElement('div');
    root.style.maxWidth = '640px';
    root.innerHTML = html;
    return root;
};

export default {
    title: 'Product Page/Configurator/IvaBanner',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Callout warning per la dichiarazione IVA 4% (Step 6 del configuratore). Coverage anche del layout grid .sp-qty-iva-row* in cui viene composto.'
            }
        }
    }
};

export const Default = {
    render: () => mount(`
        <div class="sp-iva-banner">
            <div class="sp-iva-banner__content">
                <span class="sp-iva-banner__icon" aria-hidden="true"></span>
                <div class="sp-iva-banner__text">
                    <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN e necessario compilare e firmare la dichiarazione sostitutiva.</p>
                </div>
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const banner = canvas.getByText(/aliquota ridotta al 4%/);
        await expect(banner).toBeVisible();
    }
};

export const WithDownloadButton = {
    render: () => mount(`
        <div class="sp-iva-banner">
            <div class="sp-iva-banner__content">
                <span class="sp-iva-banner__icon" aria-hidden="true"></span>
                <div class="sp-iva-banner__text">
                    <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN e necessario compilare e firmare la dichiarazione sostitutiva.</p>
                    <button type="button" style="color: #1C7264; font-weight: 500; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;">
                        Scarica la dichiarazione
                    </button>
                </div>
            </div>
        </div>
    `)
};

export const QtyIvaRowDouble = {
    render: () => mount(`
        <div class="sp-qty-iva-row sp-qty-iva-row--double">
            <div>
                <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                <input type="number" class="sp-form-input" value="50" min="1" max="2000"/>
            </div>
            <div>
                <div class="sp-label-row">
                    <label class="sp-label-text">IVA</label>
                    <button type="button" class="sp-info-btn" aria-label="Info IVA"></button>
                </div>
                <select class="sp-form-select">
                    <option value="22" selected>22%</option>
                    <option value="4">4%</option>
                </select>
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const qty = canvas.getByRole('spinbutton');
        const select = canvas.getByRole('combobox');
        await expect(qty).toHaveClass('sp-form-input');
        await expect(select).toHaveClass('sp-form-select');
    },
    parameters: {
        docs: {
            description: {
                story: 'Layout `qty-iva-row qty-iva-row--double` (Step 6 modalita avanzata). Compone form-input + form-select da FormPrimitives.'
            }
        }
    }
};

export const QtyIvaRowSingle = {
    render: () => mount(`
        <div class="sp-qty-iva-row sp-qty-iva-row--single">
            <div>
                <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                <input type="number" class="sp-form-input" value="50" min="1" max="2000"/>
            </div>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Layout `qty-iva-row qty-iva-row--single` (Step 6 modalita veloce). Solo quantita, IVA omessa.'
            }
        }
    }
};

export const ReferenceFromElementsUI = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="sp-qty-iva-row sp-qty-iva-row--double">
                <div>
                    <label class="sp-label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                    <input type="number" class="sp-form-input" value="50" min="1" max="2000"/>
                </div>
                <div>
                    <div class="sp-label-row">
                        <label class="sp-label-text">IVA</label>
                        <button type="button" class="sp-info-btn" aria-label="Info IVA"></button>
                    </div>
                    <select class="sp-form-select">
                        <option value="22">22%</option>
                        <option value="4" selected>4%</option>
                    </select>
                </div>
            </div>
            <div class="sp-iva-banner">
                <div class="sp-iva-banner__content">
                    <span class="sp-iva-banner__icon" aria-hidden="true"></span>
                    <div class="sp-iva-banner__text">
                        <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN e necessario compilare e firmare la dichiarazione sostitutiva.</p>
                        <button type="button" style="color: #1C7264; font-weight: 500; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;">
                            Scarica la dichiarazione
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Replica esatta del pattern Step 6 (product-page-integration/js/sections/section-6.js#L230-L285) quando IVA = 4%: qty-iva-row--double sopra, iva-banner sotto.'
            }
        }
    }
};
