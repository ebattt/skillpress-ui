import '../components/sidebar-totals.css';
import { expect } from 'storybook/test';

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

const iconChevronDown = `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
`;

const iconCart = `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
`;

const renderRoot = (innerHTML) => {
    const root = document.createElement('div');
    root.style.padding = '1rem 0';
    root.style.maxWidth = '380px';
    root.innerHTML = innerHTML;
    return root;
};

const renderSidebar = ({
    quantita = '50',
    bestPrice = '-',
    imposta = '-',
    spedizione = '-',
    totale = '-',
    riepilogoOpen = false,
    riepilogoContent = ''
} = {}) => {
    const promoId = 'promo-' + Math.random().toString(36).slice(2, 8);
    const riepId = 'riep-' + Math.random().toString(36).slice(2, 8);
    const contentStyle = riepilogoOpen ? ' style="display: block;"' : '';
    const expanded = riepilogoOpen ? 'true' : 'false';
    return `
        <div class="configurator-sidebar" style="display: block;">
            <div class="sidebar-total-box">
                <div>
                    <h3 class="sidebar-title">Totale</h3>
                    <div class="sidebar-rows">
                        <div class="sidebar-row">
                            <span class="sidebar-row__label">Quantità</span>
                            <span class="sidebar-row__value">${quantita}</span>
                        </div>
                        <div class="sidebar-row">
                            <span class="sidebar-row__label">Miglior prezzo</span>
                            <span class="sidebar-row__value">${bestPrice}</span>
                        </div>
                        <div class="sidebar-row">
                            <span class="sidebar-row__label">Imposta</span>
                            <span class="sidebar-row__value">${imposta}</span>
                        </div>
                        <div class="sidebar-row sidebar-row--green">
                            <span class="sidebar-row__label">Spedizione gratuita *</span>
                            <span class="sidebar-row__value">${spedizione}</span>
                        </div>
                    </div>
                    <div class="sidebar-divider"></div>
                    <div class="sidebar-total-row">
                        <span class="sidebar-total-label">Totale</span>
                        <span class="sidebar-total-value">${totale}</span>
                    </div>
                </div>
                <div class="promo-section">
                    <label for="${promoId}">Hai un codice promo?</label>
                    <input type="text" id="${promoId}" placeholder="Inserisci codice" class="promo-input"/>
                </div>
                <div class="sidebar-totals__section">
                    <label>Vuoi visualizzare il riepilogo?</label>
                    <button class="sidebar-totals__btn" aria-expanded="${expanded}" aria-controls="${riepId}">
                        ${iconList}
                        ${riepilogoOpen ? 'Nascondi riepilogo' : 'Mostra riepilogo'}
                        ${iconChevronDown}
                    </button>
                    <div id="${riepId}" class="sidebar-totals__content"${contentStyle}>${riepilogoContent}</div>
                </div>
                <button class="add-to-cart-btn">
                    ${iconCart}
                    Aggiungi al carrello
                </button>
            </div>
        </div>
    `;
};

export default {
    title: 'Product Page/Configurator/SidebarTotals',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Sidebar configuratore desktop: box totale (qty + miglior prezzo + imposta + spedizione + totale evidenziato), input promo, toggle riepilogo, bottone "Aggiungi al carrello". CSS-only. Sticky a `top: 250px` sopra 1024px, `display: none` sotto. Le icone (`list`, `expand_more`, `shopping_cart`) sono SVG inline -- la regola CSS catalogo `.material-symbols-outlined` e\' tradotta a `svg`.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(renderSidebar({ quantita: '50' })),
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('heading', { name: 'Totale' })).toBeInTheDocument();
        await expect(canvas.getByText('50')).toBeInTheDocument();
        const cart = canvas.getByRole('button', { name: /Aggiungi al carrello/ });
        await expect(cart).toHaveClass('add-to-cart-btn');
        const riepilogoBtn = canvas.getByRole('button', { name: /Mostra riepilogo/ });
        await expect(riepilogoBtn).toHaveAttribute('aria-expanded', 'false');
    },
    parameters: {
        docs: {
            description: {
                story: 'Snapshot iniziale del configuratore: qty 50, valori `-` come prima dell\'elaborazione JS configurator. Riga "Spedizione gratuita" gia\' verde via `.sidebar-row--green`.'
            }
        }
    }
};

export const ReferenceFromElementsUI = {
    render: () => renderRoot(renderSidebar({ quantita: '50' })),
    parameters: {
        docs: {
            description: {
                story: 'Markup verbatim derivato da `product-page-integration/index.html#L202-L249`. Stato realistico iniziale: qty 50, valori `-`. Material Symbols (`list`, `expand_more`, `shopping_cart`) sostituiti con SVG inline 1.125rem.'
            }
        }
    }
};

export const FilledTotals = {
    render: () => renderRoot(renderSidebar({
        quantita: '50',
        bestPrice: '325,53 euro',
        imposta: '71,62 euro',
        spedizione: 'Inclusa',
        totale: '397,15 euro'
    })),
    parameters: {
        docs: {
            description: {
                story: 'Sidebar dopo che il configuratore ha calcolato i valori: tutte le righe hanno valori reali e il totale evidenziato (`--font-size-2xl`, primary) mostra la somma. Spedizione gratuita resta verde.'
            }
        }
    }
};

export const RiepilogoOpen = {
    render: () => renderRoot(renderSidebar({
        quantita: '50',
        bestPrice: '325,53 euro',
        imposta: '71,62 euro',
        spedizione: 'Inclusa',
        totale: '397,15 euro',
        riepilogoOpen: true,
        riepilogoContent: `
            <div class="sidebar-totals__section-header">Configurazione</div>
            <div class="sidebar-totals__row">Formato: <strong>A4</strong></div>
            <div class="sidebar-totals__row">Orientamento: <strong>verticale</strong></div>
            <div class="sidebar-totals__row">Quantita: <strong>50</strong></div>
            <div class="sidebar-totals__section-header">Spedizione</div>
            <div class="sidebar-totals__row">Data: <strong>lunedi 09/03</strong></div>
            <div class="sidebar-totals__indent">Spedizione gratuita inclusa.</div>
        `
    })),
    parameters: {
        docs: {
            description: {
                story: 'Riepilogo aperto: il consumer ha settato `aria-expanded="true"` sul `.sidebar-totals__btn` e reso visibile `.sidebar-totals__content` (qui via `style="display: block"`). Il content usa le utility classes `.sidebar-totals__section-header`, `.sidebar-totals__row`, `.sidebar-totals__indent`. Max-height 300px + scroll automatico.'
            }
        }
    }
};

export const RiepilogoEmpty = {
    render: () => renderRoot(renderSidebar({
        quantita: '50',
        riepilogoOpen: true,
        riepilogoContent: '<div class="sidebar-totals__empty">Nessuna configurazione selezionata.</div>'
    })),
    parameters: {
        docs: {
            description: {
                story: 'Riepilogo aperto su stato vuoto: utility class `.sidebar-totals__empty` (text-align center, color text-light, padding 1rem).'
            }
        }
    }
};
