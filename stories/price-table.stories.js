import '../components/price-table.css';
import { expect, waitFor } from 'storybook/test';

const arrowUp = `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
    </svg>
`;

const arrowDown = `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
`;

const renderRoot = (innerHTML, { maxWidth = '720px' } = {}) => {
    const root = document.createElement('div');
    root.style.padding = '1rem 0';
    root.style.maxWidth = maxWidth;
    root.innerHTML = innerHTML;
    return root;
};

const syncScrollableIndicator = (section) => {
    if (!section) return;

    const sync = () => {
        const maxScrollLeft = section.scrollWidth - section.clientWidth;
        const canScroll = maxScrollLeft > 1;

        section.classList.toggle('price-table__section--scrollable', canScroll);

        if (!canScroll) {
            section.style.removeProperty('--price-table-scroll-thumb-width');
            section.style.removeProperty('--price-table-scroll-thumb-left');
            return;
        }

        const thumbWidth = Math.max(16, Math.min(100, (section.clientWidth / section.scrollWidth) * 100));
        const thumbLeft = maxScrollLeft > 0 ? (section.scrollLeft / maxScrollLeft) * 100 : 0;

        section.style.setProperty('--price-table-scroll-thumb-width', `${thumbWidth.toFixed(2)}%`);
        section.style.setProperty('--price-table-scroll-thumb-left', `${thumbLeft.toFixed(2)}%`);
    };

    sync();
    requestAnimationFrame(sync);
    window.setTimeout(sync, 0);

    if (section._priceTableStorySync) return;
    section._priceTableStorySync = sync;
    section.addEventListener('scroll', sync);
    window.addEventListener('resize', sync);
};

// Backend dichiara N date (1..4 raccomandato per leggibilita'). Default snapshot = 4 colonne
// (caso massimo della pagina demo: deliveryBaseDays = [2, 4, 6, 10] con sconti progressivi
// 5%/30%/55%/79%). La libreria si adatta automaticamente al numero di colonne via CSS table.

const headers = [
    { day: 'lunedi',    date: '09/03' },   // sconto  5%
    { day: 'mercoledi', date: '11/03' },   // sconto 30%
    { day: 'venerdi',   date: '13/03' },   // sconto 55%
    { day: 'martedi',   date: '17/03' }    // sconto 79%
];

const rows = [
    { qty: 25,  prices: ['162,77', '119,94',  '77,10',  '35,98'] },
    { qty: 30,  prices: ['195,32', '143,92',  '92,52',  '43,18'] },
    { qty: 40,  prices: ['260,43', '191,89', '123,37',  '57,57'] },
    { qty: 50,  prices: ['325,53', '239,86', '154,20',  '71,96'] },
    { qty: 60,  prices: ['390,64', '287,85', '185,04',  '86,35'] },
    { qty: 75,  prices: ['488,31', '359,80', '231,30', '107,94'] },
    { qty: 100, prices: ['651,07', '479,74', '308,40', '143,92'] }
];

const sliceHeaders = (n) => headers.slice(0, n);
const sliceRows = (n) => rows.map(r => ({ qty: r.qty, prices: r.prices.slice(0, n) }));

const renderHeader = (selectedCol, cols = 4) => {
    const heads = sliceHeaders(cols);
    const left = '<th class="price-table__header-cell price-table__header-cell--left">Copie</th>';
    const dataCells = heads.map((h, idx) => {
        const isSelected = idx === selectedCol;
        const isCorner = idx === heads.length - 1;
        const cls = [
            'price-table__header-cell',
            'price-table__header-cell--center',
            isSelected ? 'price-table__header-cell--selected' : '',
            isCorner ? 'price-table__header-cell--corner' : ''
        ].filter(Boolean).join(' ');
        const dateCls = isSelected ? 'price-table__header-date price-table__header-date--light' : 'price-table__header-date';
        return `
            <th class="${cls}">
                <div class="price-table__header-day">${h.day}</div>
                <div class="${dateCls}">${h.date}</div>
            </th>
        `;
    }).join('');
    return `<tr>${left}${dataCells}</tr>`;
};

const renderBody = (activeQty, selectedCol, cols = 4) => {
    const data = sliceRows(cols);
    return data.map((row) => {
        const isActive = row.qty === activeQty;
        const trCls = isActive ? 'price-table__row price-table__row--active' : 'price-table__row';
        const qtyBtnCls = isActive ? 'price-table__qty-btn price-table__qty-btn--active' : 'price-table__qty-btn';
        const cells = row.prices.map((p, idx) => {
            let btnCls;
            if (isActive && idx === selectedCol) btnCls = 'price-table__cell-btn price-table__cell-btn--selected';
            else if (isActive) btnCls = 'price-table__cell-btn price-table__cell-btn--row-active';
            else btnCls = 'price-table__cell-btn price-table__cell-btn--default';
            return `
                <td class="price-table__cell price-table__cell--center">
                    <button type="button" class="${btnCls}">${p} euro</button>
                </td>
            `;
        }).join('');
        return `
            <tr class="${trCls}">
                <td class="price-table__cell price-table__cell--left">
                    <button type="button" class="${qtyBtnCls}">${row.qty}</button>
                </td>
                ${cells}
            </tr>
        `;
    }).join('');
};

const renderTable = ({ activeQty = 50, selectedCol = 0, cols = 4, navUpDisabled = false, navDownDisabled = false } = {}) => `
    <div class="price-table__wrapper">
        <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
            <button type="button" class="price-table__nav-arrow${navUpDisabled ? ' price-table__nav-arrow--disabled' : ''}" aria-label="Quantita precedenti">${arrowUp}</button>
        </div>
        <div class="price-table__section">
            <table class="price-table">
                <thead>${renderHeader(selectedCol, cols)}</thead>
                <tbody>${renderBody(activeQty, selectedCol, cols)}</tbody>
            </table>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
            <button type="button" class="price-table__nav-arrow${navDownDisabled ? ' price-table__nav-arrow--disabled' : ''}" aria-label="Quantita successive">${arrowDown}</button>
        </div>
    </div>
`;

export default {
    title: 'Components/PriceTable',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Tabella prezzi stile Google Flights: header data spedizione, righe quantita, intersezione = prezzo. **Data-driven**: il backend dichiara N colonne. La libreria ottimizza automaticamente 1/2/3 colonne e usa scrollbar orizzontale nativa quando 4+ colonne non entrano nel contenitore. CSS-only. Il consumer applica i modifier `.price-table__header-cell--selected` (colonna), `.price-table__row--active` (riga qty), `.price-table__cell-btn--selected` / `--row-active` (cella) in base allo stato applicativo.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(renderTable({ activeQty: 50, selectedCol: 0, cols: 4 })),
    play: async ({ canvas }) => {
        const qty50 = canvas.getByRole('button', { name: '50' });
        await expect(qty50).toHaveClass('price-table__qty-btn--active');
        const cells = canvas.getAllByRole('button', { name: /euro/ });
        const selected = cells.filter(c => c.classList.contains('price-table__cell-btn--selected'));
        const rowActive = cells.filter(c => c.classList.contains('price-table__cell-btn--row-active'));
        await expect(selected.length).toBe(1);
        await expect(rowActive.length).toBe(3);
    },
    parameters: {
        docs: {
            description: {
                story: 'Snapshot base: 7 righe qty (25-100), **4 colonne data** (caso massimo della pagina demo: `deliveryBaseDays = [2, 4, 6, 10]` con sconti 5%/30%/55%/79%). Riga 50 attiva, prima colonna data selezionata. La cella intersezione (50 + 09/03) mostra `.price-table__cell-btn--selected`.'
            }
        }
    }
};

export const ReferenceFromElementsUI = {
    render: () => renderRoot(renderTable({ activeQty: 50, selectedCol: 0, cols: 4 })),
    parameters: {
        docs: {
            description: {
                story: 'Markup verbatim derivato da `product-page-integration/js/sections/section-6.js#L389-L394` (`deliveryDates.map`). Stato realistico: 4 date generate da `deliveryBaseDays = [2, 4, 6, 10]`, `closestDisplayedQty === 50`, `selectedDeliveryIndex === 0`. IVA non applicata (consumer responsibility).'
            }
        }
    }
};

export const OneColumn = {
    render: () => renderRoot(renderTable({ activeQty: 50, selectedCol: 0, cols: 1 })),
    parameters: {
        docs: {
            description: {
                story: 'Caso minimo: 1 sola data. Il backend dichiara una sola opzione consegna; la libreria renderizza la cella header con `.price-table__header-cell--corner` (essendo prima e ultima).'
            }
        }
    }
};

export const TwoColumns = {
    render: () => renderRoot(renderTable({ activeQty: 50, selectedCol: 0, cols: 2 })),
    parameters: {
        docs: {
            description: {
                story: '2 date: scelta veloce vs scontata. La seconda colonna riceve `.price-table__header-cell--corner` (ultima).'
            }
        }
    }
};

export const ThreeColumns = {
    render: () => renderRoot(renderTable({ activeQty: 50, selectedCol: 0, cols: 3 })),
    parameters: {
        docs: {
            description: {
                story: '3 date: configurazione intermedia. La terza colonna riceve `.price-table__header-cell--corner`.'
            }
        }
    }
};

export const FourColumns = {
    render: () => renderRoot(renderTable({ activeQty: 50, selectedCol: 0, cols: 4 })),
    parameters: {
        docs: {
            description: {
                story: '4 date (default pagina demo): caso massimo raccomandato per leggibilita\'. Oltre 4 colonne il min-width tabella desktop e il viewport mobile diventano stretti.'
            }
        }
    }
};

export const HorizontalScrollbar = {
    render: () => {
        const root = renderRoot(renderTable({ activeQty: 50, selectedCol: 0, cols: 4 }), { maxWidth: '320px' });
        syncScrollableIndicator(root.querySelector('.price-table__section'));
        return root;
    },
    play: async ({ canvasElement }) => {
        const section = canvasElement.querySelector('.price-table__section');
        await expect(section.scrollWidth).toBeGreaterThan(section.clientWidth);
        await waitFor(() => expect(section).toHaveClass('price-table__section--scrollable'));

        const initialThumbLeft = section.style.getPropertyValue('--price-table-scroll-thumb-left');
        section.scrollLeft = section.scrollWidth - section.clientWidth;
        section.dispatchEvent(new Event('scroll'));
        await waitFor(() => expect(section.style.getPropertyValue('--price-table-scroll-thumb-left')).not.toBe(initialThumbLeft));

        const horizontalArrows = canvasElement.querySelectorAll('.price-table__nav-arrow-horizontal');
        await expect(horizontalArrows.length).toBe(0);
    },
    parameters: {
        docs: {
            description: {
                story: 'Contenitore stretto con 4 colonne: la tabella conserva una larghezza minima leggibile e mostra l\'indicatore orizzontale custom. La story applica `.price-table__section--scrollable` solo quando `scrollWidth > clientWidth` e aggiorna `--price-table-scroll-thumb-left` durante lo scroll, come dovrebbe fare il consumer.'
            }
        }
    }
};

export const SecondColumnSelected = {
    render: () => renderRoot(renderTable({ activeQty: 50, selectedCol: 1 })),
    parameters: {
        docs: {
            description: {
                story: 'Stesso stato qty 50 attiva, ma con seconda colonna data (`mercoledi 11/03`) selezionata. Mostra come `--selected` si sposta tra colonne header e tra celle intersezione.'
            }
        }
    }
};

export const FirstRowActive = {
    render: () => renderRoot(renderTable({ activeQty: 25, selectedCol: 0, navUpDisabled: true })),
    parameters: {
        docs: {
            description: {
                story: 'Riga qty 25 (prima della pagina) attiva: la freccia su e\' `--disabled` (opacity 0.25, pointer-events none). Tutti i `.price-table__cell-btn` della riga sono `--row-active`, intersezione `--selected`.'
            }
        }
    }
};

export const NoSelection = {
    render: () => {
        const noActiveTable = `
            <div class="price-table__wrapper">
                <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
                    <button type="button" class="price-table__nav-arrow price-table__nav-arrow--disabled" aria-label="Quantita precedenti">${arrowUp}</button>
                </div>
                <div class="price-table__section">
                    <table class="price-table">
                        <thead>${renderHeader(-1)}</thead>
                        <tbody>${rows.map((row) => `
                            <tr class="price-table__row">
                                <td class="price-table__cell price-table__cell--left"><button type="button" class="price-table__qty-btn">${row.qty}</button></td>
                                ${row.prices.map((p) => `<td class="price-table__cell price-table__cell--center"><button type="button" class="price-table__cell-btn price-table__cell-btn--default">${p} euro</button></td>`).join('')}
                            </tr>
                        `).join('')}</tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
                    <button type="button" class="price-table__nav-arrow price-table__nav-arrow--disabled" aria-label="Quantita successive">${arrowDown}</button>
                </div>
            </div>
        `;
        return renderRoot(noActiveTable);
    },
    parameters: {
        docs: {
            description: {
                story: 'Stato "vuoto": nessuna riga `--active`, nessuna colonna `--selected`. Tutti i `.price-table__cell-btn` sono `--default` (bg bianco, bordo gray-200). Utile come baseline puramente CSS.'
            }
        }
    }
};

export const LegacyHorizontalArrowsHidden = {
    render: () => {
        const html = `
            <div class="price-table__wrapper">
                <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
                    <button type="button" class="price-table__nav-arrow" aria-label="Quantita precedenti">${arrowUp}</button>
                </div>
                <div class="price-table__section" style="position: relative;">
                    <button type="button" class="price-table__nav-arrow-horizontal price-table__nav-arrow-horizontal--left" aria-label="Scorri a sinistra" style="display: flex;"></button>
                    <button type="button" class="price-table__nav-arrow-horizontal price-table__nav-arrow-horizontal--right" aria-label="Scorri a destra" style="display: flex;"></button>
                    <table class="price-table">
                        <thead>${renderHeader(0)}</thead>
                        <tbody>${renderBody(50, 0)}</tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
                    <button type="button" class="price-table__nav-arrow" aria-label="Quantita successive">${arrowDown}</button>
                </div>
            </div>
        `;
        return renderRoot(html);
    },
    play: async ({ canvasElement }) => {
        const arrows = canvasElement.querySelectorAll('.price-table__nav-arrow-horizontal');
        await expect(arrows.length).toBe(2);
        arrows.forEach((arrow) => {
            expect(getComputedStyle(arrow).display).toBe('none');
        });
    },
    parameters: {
        docs: {
            description: {
                story: 'Compatibilita con markup legacy: anche se il consumer rende le vecchie frecce orizzontali e prova a mostrarle inline, il CSS della libreria le nasconde. Lo scroll laterale deve passare dalla scrollbar nativa.'
            }
        }
    }
};
