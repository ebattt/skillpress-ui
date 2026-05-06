import '../components/sidebar-totals.css';
import '../components/mobile-bar.css';
import { expect } from 'storybook/test';

const iconChevronUp = `
    <svg class="mobile-total-bar__handle-arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
    </svg>
`;

const iconList = `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
`;

const iconChevronDown = (id) => `
    <svg ${id ? `id="${id}"` : ''} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
`;

const renderRoot = (innerHTML) => {
    const root = document.createElement('div');
    root.style.padding = '0';
    root.style.position = 'relative';
    root.style.minHeight = '420px';
    root.style.maxWidth = '420px';
    root.style.margin = '0 auto';
    root.style.background = '#f3f4f6';
    root.innerHTML = innerHTML;
    return root;
};

const renderMobileBar = ({
    expanded = false,
    configActive = false,
    totale = '-',
    qty = '50',
    unitPrice = '-',
    subtotal = '-',
    iva = '-',
    configContent = '',
    visibleOverride = true
} = {}) => {
    // visibleOverride: in Storybook canvas desktop la media query nasconde la barra.
    // Forziamo display: block + position: relative per la preview.
    const styleOverride = visibleOverride
        ? ' style="display: block; position: relative; pointer-events: auto;"'
        : '';
    const expandedClass = expanded ? ' mobile-total-bar--expanded' : '';
    const configActiveClass = configActive ? ' mobile-config-toggle--active' : '';
    const configVisibleClass = configActive ? ' mobile-config-content--visible' : '';

    return `
        <div id="mobile-total-bar" class="mobile-total-bar${expandedClass}"${styleOverride}>
            <div id="mobile-bar-overlay" class="mobile-total-bar__overlay"></div>
            <div class="mobile-total-bar__container">
                <div id="mobile-bar-handle" class="mobile-total-bar__handle" role="button" tabindex="0"
                     aria-label="Espandi dettagli totale" aria-expanded="${expanded}">
                    ${iconChevronUp}
                </div>
                <div class="mobile-total-bar__compact">
                    <div class="mobile-total-bar__price-section">
                        <span class="mobile-total-bar__label">Totale</span>
                        <span id="mobile-total-price" class="mobile-total-bar__price">${totale}</span>
                    </div>
                    <button id="mobile-add-cart-btn" class="mobile-total-bar__cart-btn">
                        Aggiungi al carrello
                    </button>
                    <div id="mobileValidationErrors"></div>
                </div>
                <div id="mobile-bar-expanded" class="mobile-total-bar__expanded-section">
                    <div class="mobile-total-bar__divider"></div>
                    <div class="mobile-total-bar__details">
                        <div class="mobile-total-bar__detail-row">
                            <span>Quantità</span>
                            <span id="mobile-qty">${qty}</span>
                        </div>
                        <div class="mobile-total-bar__detail-row">
                            <span>Prezzo unitario</span>
                            <span id="mobile-unit-price">${unitPrice}</span>
                        </div>
                        <div class="mobile-total-bar__detail-row">
                            <span>Subtotale</span>
                            <span id="mobile-subtotal">${subtotal}</span>
                        </div>
                        <div class="mobile-total-bar__detail-row">
                            <span>IVA</span>
                            <span id="mobile-iva">${iva}</span>
                        </div>
                        <div class="mobile-total-bar__detail-row mobile-total-bar__detail-shipping">
                            <span>Spedizione</span>
                            <span class="text-green-600">Gratuita *</span>
                        </div>
                    </div>
                    <button id="mobile-config-toggle" class="mobile-config-toggle${configActiveClass}"
                            aria-expanded="${configActive}" aria-controls="mobile-config-content">
                        ${iconList}
                        Vedi configurazione
                        ${iconChevronDown('mobile-config-icon')}
                    </button>
                    <div id="mobile-config-content" class="mobile-config-content${configVisibleClass}"
                         role="region" aria-label="Riepilogo configurazione">${configContent}</div>
                </div>
            </div>
        </div>
    `;
};

export default {
    title: 'Product Page/Post Configurator/MobileTotalBar',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Barra fixed in basso visibile `<=1023px`: handle chevron espandibile, sezione compact (label primary + prezzo bold + bottone carrello secondary-dark), sezione espansa (5 righe dettaglio + toggle riepilogo configurazione + content gray-50). CSS-only. In Storybook si forza `display: block; position: relative` perche\' la preview gira anche in canvas desktop dove la media query la nasconderebbe.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(renderMobileBar({ totale: '-' })),
    play: async ({ canvas }) => {
        const cart = canvas.getByRole('button', { name: /Aggiungi al carrello/ });
        await expect(cart).toBeInTheDocument();
        await expect(canvas.getByText('Totale')).toBeInTheDocument();
    },
    parameters: {
        docs: {
            description: {
                story: 'Stato iniziale collassato: prezzo `-`, dettagli nascosti (`max-height: 0; opacity: 0`).'
            }
        }
    }
};

export const ReferenceFromElementsUI = {
    render: () => renderRoot(renderMobileBar({ totale: '-' })),
    parameters: {
        docs: {
            description: {
                story: 'Markup verbatim derivato da `product-page-integration/index.html#L293-L356`. Material Symbols `expand_less` (handle), `list` + `expand_more` (config-toggle) sostituiti con SVG inline. Classe BEM `mobile-total-bar__handle-arrow` e id `#mobile-config-icon` per coprire i selettori CSS rinominati.'
            }
        }
    }
};

export const Expanded = {
    render: () => renderRoot(renderMobileBar({
        expanded: true,
        totale: '397,15 euro',
        qty: '50',
        unitPrice: '6,51 euro',
        subtotal: '325,53 euro',
        iva: '71,62 euro'
    })),
    parameters: {
        docs: {
            description: {
                story: 'Barra espansa (`.mobile-total-bar--expanded`): chevron handle ruotato 180deg, sezione expanded a `max-height: 60vh; opacity: 1`, 5 righe dettaglio visibili. Toggle config ancora collapsed.'
            }
        }
    }
};

export const ExpandedWithConfig = {
    render: () => renderRoot(renderMobileBar({
        expanded: true,
        configActive: true,
        totale: '397,15 euro',
        qty: '50',
        unitPrice: '6,51 euro',
        subtotal: '325,53 euro',
        iva: '71,62 euro',
        configContent: `
            <div class="riepilogo-container">
                <div class="riepilogo-section">
                    <div class="riepilogo-header">Dettagli</div>
                    <div class="riepilogo-row">Nome del lavoro: <span class="riepilogo-error">Non valido</span></div>
                </div>
                <div class="riepilogo-section">
                    <div class="riepilogo-header">1. Generali</div>
                    <div class="riepilogo-row">Formato: A4</div>
                    <div class="riepilogo-row">Dimensioni: 210 × 297 mm</div>
                    <div class="riepilogo-row">Orientamento: Verticale</div>
                    <div class="riepilogo-row">Facciate: 100</div>
                    <div class="riepilogo-row">Carta int.: Patinata Opaca</div>
                    <div class="riepilogo-row">Grammatura: 115g</div>
                </div>
            </div>
        `
    })),
    parameters: {
        docs: {
            description: {
                story: 'Barra espansa + config-toggle attivo (`.mobile-config-toggle--active`) + content visibile (`.mobile-config-content--visible`). Chevron config ruotato 180deg, content gray-50 con border + radius lg. Riepilogo iniettato dal CMS con classi `.riepilogo-container`/`.riepilogo-section`/`.riepilogo-header`/`.riepilogo-row`/`.riepilogo-error`: lo stesso markup prodotto da `generateRiepilogo` v3.0.0 della demo. Le regole sono definite in `components/sidebar-totals.css` (importato dalla story).'
            }
        }
    }
};

export const SmallPhone = {
    render: () => renderRoot(renderMobileBar({ totale: '397,15 euro' })),
    parameters: {
        viewport: { defaultViewport: 'mobile1' },
        docs: {
            description: {
                story: 'Viewport `<=374px`: padding ridotto, cart button 0.8125rem, label/price 1rem.'
            }
        }
    }
};

export const Tablet = {
    render: () => renderRoot(renderMobileBar({
        expanded: true,
        totale: '397,15 euro',
        unitPrice: '6,51 euro',
        subtotal: '325,53 euro',
        iva: '71,62 euro'
    })),
    parameters: {
        viewport: { defaultViewport: 'tablet' },
        docs: {
            description: {
                story: 'Viewport tablet (`640-1023px`): `.mobile-total-bar__compact`, `.mobile-total-bar__details`, `.mobile-config-toggle` centrati a `max-width: 480px`. Padding container 0.5rem 1.5rem.'
            }
        }
    }
};
