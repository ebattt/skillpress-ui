import '../components/format-card.css';
import { expect } from 'storybook/test';

const aspectRatioIcon = `
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <path d="M3 9h18 M3 15h18 M9 3v18 M15 3v18"></path>
    </svg>
`;

const renderRoot = (innerHTML) => {
    const root = document.createElement('div');
    root.style.padding = '1rem 0';
    root.style.maxWidth = '420px';
    root.innerHTML = innerHTML;
    return root;
};

const verticalGrid = (selected = 'a4') => `
    <div class="format-cards">
        <button type="button" class="format-card${selected === 'a4' ? ' format-card--selected' : ''}" data-format-card-format="a4">
            <div class="format-card__preview" style="width: 56px; height: 79px;">
                <span class="format-card__preview-label">A4</span>
                <div class="format-card__preview-box">
                    <span>A4</span>
                </div>
            </div>
            <div class="format-card__text">
                <div class="format-card__name">A4</div>
                <div class="format-card__dims">210 × 297 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${selected === 'libro' ? ' format-card--selected' : ''}" data-format-card-format="libro">
            <div class="format-card__preview" style="width: 56px; height: 79px;">
                <div class="format-card__preview-dashed"></div>
                <span class="format-card__preview-label format-card__preview-label--faded">A4</span>
                <div class="format-card__preview-inner" style="width: 44px; height: 62px;">
                    <span style="font-size: 10px;">Libro</span>
                </div>
            </div>
            <div class="format-card__text">
                <div class="format-card__name">Libro</div>
                <div class="format-card__dims">165 × 235 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${selected === 'a5' ? ' format-card--selected' : ''}" data-format-card-format="a5">
            <div class="format-card__preview" style="width: 56px; height: 79px;">
                <div class="format-card__preview-dashed"></div>
                <span class="format-card__preview-label format-card__preview-label--faded">A4</span>
                <div class="format-card__preview-inner" style="width: 39px; height: 56px;">
                    <span style="font-size: 10px;">A5</span>
                </div>
            </div>
            <div class="format-card__text">
                <div class="format-card__name">A5</div>
                <div class="format-card__dims">148 × 210 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${selected === 'libero' ? ' format-card--selected' : ''}" data-format-card-format="libero">
            <div class="format-card__preview" style="width: 56px; height: 79px;">
                <div class="format-card__preview-dashed"></div>
                <span class="format-card__preview-label format-card__preview-label--faded">A4</span>
                <div class="format-card__preview-custom" style="width: 40px; height: 52px;">
                    ${aspectRatioIcon}
                </div>
            </div>
            <div class="format-card__text">
                <div class="format-card__name">Libero</div>
                <div class="format-card__dims">Custom</div>
            </div>
        </button>
    </div>
`;

const horizontalGrid = (selected = 'a4') => `
    <div class="format-cards">
        <button type="button" class="format-card${selected === 'a4' ? ' format-card--selected' : ''}" data-format-card-format="a4">
            <div class="format-card__preview" style="width: 79px; height: 56px;">
                <span class="format-card__preview-label">A4</span>
                <div class="format-card__preview-box">
                    <span>A4</span>
                </div>
            </div>
            <div class="format-card__text">
                <div class="format-card__name">A4</div>
                <div class="format-card__dims">297 × 210 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${selected === 'libro' ? ' format-card--selected' : ''}" data-format-card-format="libro">
            <div class="format-card__preview" style="width: 79px; height: 56px;">
                <div class="format-card__preview-dashed"></div>
                <span class="format-card__preview-label format-card__preview-label--faded">A4</span>
                <div class="format-card__preview-inner" style="width: 62px; height: 44px;">
                    <span style="font-size: 10px;">Libro</span>
                </div>
            </div>
            <div class="format-card__text">
                <div class="format-card__name">Libro</div>
                <div class="format-card__dims">235 × 165 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${selected === 'a5' ? ' format-card--selected' : ''}" data-format-card-format="a5">
            <div class="format-card__preview" style="width: 79px; height: 56px;">
                <div class="format-card__preview-dashed"></div>
                <span class="format-card__preview-label format-card__preview-label--faded">A4</span>
                <div class="format-card__preview-inner" style="width: 56px; height: 39px;">
                    <span style="font-size: 10px;">A5</span>
                </div>
            </div>
            <div class="format-card__text">
                <div class="format-card__name">A5</div>
                <div class="format-card__dims">210 × 148 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${selected === 'libero' ? ' format-card--selected' : ''}" data-format-card-format="libero">
            <div class="format-card__preview" style="width: 79px; height: 56px;">
                <div class="format-card__preview-dashed"></div>
                <span class="format-card__preview-label format-card__preview-label--faded">A4</span>
                <div class="format-card__preview-custom" style="width: 52px; height: 40px;">
                    ${aspectRatioIcon}
                </div>
            </div>
            <div class="format-card__text">
                <div class="format-card__name">Libero</div>
                <div class="format-card__dims">Custom</div>
            </div>
        </button>
    </div>
`;

export default {
    title: 'Product Page/Configurator/FormatCard',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Selection card per scegliere il formato del prodotto. Container `.format-cards` con grid 4 col >=480px e 2 col <480px. Card singola `.format-card` con preview proporzionata (full / box-inner / custom) e testo nome/dimensioni. CSS-only: lo stato selezionato e applicato dal CMS aggiungendo `.format-card--selected`. Geometria preview (width/height) impostata dal CMS via inline style per riflettere orientamento e proporzioni.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(verticalGrid('a4')),
    play: async ({ canvas }) => {
        const cards = canvas.getAllByRole('button');
        await expect(cards.length).toBeGreaterThanOrEqual(4);
        const a4 = cards.find(c => c.getAttribute('data-format-card-format') === 'a4');
        await expect(a4).toHaveClass('format-card--selected');
        const others = cards.filter(c => c.getAttribute('data-format-card-format') && c.getAttribute('data-format-card-format') !== 'a4');
        for (const o of others) {
            await expect(o).not.toHaveClass('format-card--selected');
        }
    },
    parameters: {
        docs: {
            description: {
                story: '4 card in orientamento verticale (preview 56×79). Card A4 selezionata (preview-box arancio + name arancio + bg highlight).'
            }
        }
    }
};

export const ReferenceFromElementsUI = {
    render: () => renderRoot(verticalGrid('a4')),
    parameters: {
        docs: {
            description: {
                story: 'Markup verbatim derivato da `product-page-integration/js/sections/section-1.js#L199-L266` con `state.orientation === "vertical"` e `formatoChiuso === "a4"`. Le 3 varianti di preview (full box, box-inner dentro dashed, custom con icona) sono tutte visibili.'
            }
        }
    }
};

export const Horizontal = {
    render: () => renderRoot(horizontalGrid('a4')),
    parameters: {
        docs: {
            description: {
                story: 'Stessa griglia ma con `state.orientation === "horizontal"`: preview 79×56, dimensioni testuali invertite. Mostra come la libreria sia indipendente dall\'orientamento (geometria via inline style del CMS).'
            }
        }
    }
};

export const LiberoSelected = {
    render: () => renderRoot(verticalGrid('libero')),
    parameters: {
        docs: {
            description: {
                story: 'Variante "Libero" selezionata: la preview-custom si tinge di `rgba(240,138,0,0.2)` con bordo `--color-primary`. Mostra il behavior di `--selected` sulla preview di tipo custom.'
            }
        }
    }
};

export const SinglePreviewBox = {
    render: () => renderRoot(`
        <div class="format-cards">
            <button type="button" class="format-card format-card--selected" data-format-card-format="a4">
                <div class="format-card__preview" style="width: 56px; height: 79px;">
                    <span class="format-card__preview-label">A4</span>
                    <div class="format-card__preview-box">
                        <span>A4</span>
                    </div>
                </div>
                <div class="format-card__text">
                    <div class="format-card__name">A4</div>
                    <div class="format-card__dims">210 × 297 mm</div>
                </div>
            </button>
        </div>
    `),
    parameters: {
        docs: {
            description: {
                story: 'Singola card con preview-box (no dashed, no inner): il caso piu semplice, formato che coincide con il riferimento (A4). Utile per validare la regola di base senza overlay.'
            }
        }
    }
};
