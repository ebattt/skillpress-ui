import { expect } from 'storybook/test';

const INFO_ICON_SVG = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
`;

const SELECT_INFO_SVG = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
`;

const mount = (html) => {
    const root = document.createElement('div');
    root.style.maxWidth = '640px';
    root.innerHTML = html;
    return root;
};

export default {
    title: 'Primitives/IvaBanner',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Callout warning per la dichiarazione IVA 4% (Step 6 del configuratore). Coverage anche del layout grid .qty-iva-row* in cui viene composto.'
            }
        }
    }
};

export const Default = {
    render: () => mount(`
        <div class="iva-banner">
            <div class="iva-banner__content">
                <span class="iva-banner__icon">${INFO_ICON_SVG}</span>
                <div class="iva-banner__text">
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
        <div class="iva-banner">
            <div class="iva-banner__content">
                <span class="iva-banner__icon">${INFO_ICON_SVG}</span>
                <div class="iva-banner__text">
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
        <div class="qty-iva-row qty-iva-row--double">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                <input type="number" class="form-input" value="50" min="1" max="2000"/>
            </div>
            <div>
                <div class="label-row">
                    <label class="label-text">IVA</label>
                    <button type="button" class="info-btn" aria-label="Info IVA">
                        ${SELECT_INFO_SVG}
                    </button>
                </div>
                <select class="form-select">
                    <option value="22" selected>22%</option>
                    <option value="4">4%</option>
                </select>
            </div>
        </div>
    `),
    play: async ({ canvas }) => {
        const qty = canvas.getByRole('spinbutton');
        const select = canvas.getByRole('combobox');
        await expect(qty).toHaveClass('form-input');
        await expect(select).toHaveClass('form-select');
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
        <div class="qty-iva-row qty-iva-row--single">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                <input type="number" class="form-input" value="50" min="1" max="2000"/>
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
            <div class="qty-iva-row qty-iva-row--double">
                <div>
                    <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                    <input type="number" class="form-input" value="50" min="1" max="2000"/>
                </div>
                <div>
                    <div class="label-row">
                        <label class="label-text">IVA</label>
                        <button type="button" class="info-btn" aria-label="Info IVA">
                            ${SELECT_INFO_SVG}
                        </button>
                    </div>
                    <select class="form-select">
                        <option value="22">22%</option>
                        <option value="4" selected>4%</option>
                    </select>
                </div>
            </div>
            <div class="iva-banner">
                <div class="iva-banner__content">
                    <span class="iva-banner__icon">${INFO_ICON_SVG}</span>
                    <div class="iva-banner__text">
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
