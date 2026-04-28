import '../components/price-table.css';

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

const chevronLeft = `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
    </svg>
`;

const chevronRight = `
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
    </svg>
`;

const renderRoot = (innerHTML) => {
    const root = document.createElement('div');
    root.style.padding = '1rem 0';
    root.style.maxWidth = '720px';
    root.innerHTML = innerHTML;
    return root;
};

const headers = [
    { day: 'lunedi', date: '09/03' },
    { day: 'mercoledi', date: '11/03' },
    { day: 'lunedi', date: '16/03' }
];

const rows = [
    { qty: 25,  prices: ['162,77', '119,94',  '77,10'] },
    { qty: 30,  prices: ['195,32', '143,92',  '92,52'] },
    { qty: 40,  prices: ['260,43', '191,89', '123,37'] },
    { qty: 50,  prices: ['325,53', '239,86', '154,20'] },
    { qty: 60,  prices: ['390,64', '287,85', '185,04'] },
    { qty: 75,  prices: ['488,31', '359,80', '231,30'] },
    { qty: 100, prices: ['651,07', '479,74', '308,40'] }
];

const renderHeader = (selectedCol) => {
    const left = '<th class="price-th price-th--left">Copie</th>';
    const dataCells = headers.map((h, idx) => {
        const isSelected = idx === selectedCol;
        const isCorner = idx === headers.length - 1;
        const cls = [
            'price-th',
            'price-th--center',
            isSelected ? 'price-th--selected' : '',
            isCorner ? 'price-th--corner' : ''
        ].filter(Boolean).join(' ');
        const dateCls = isSelected ? 'price-th-date price-th-date--light' : 'price-th-date';
        return `
            <th class="${cls}">
                <div class="price-th-day">${h.day}</div>
                <div class="${dateCls}">${h.date}</div>
            </th>
        `;
    }).join('');
    return `<tr>${left}${dataCells}</tr>`;
};

const renderBody = (activeQty, selectedCol) => {
    return rows.map((row) => {
        const isActive = row.qty === activeQty;
        const trCls = isActive ? 'price-tr price-tr--active' : 'price-tr';
        const qtyBtnCls = isActive ? 'price-qty-btn price-qty-btn--active' : 'price-qty-btn';
        const cells = row.prices.map((p, idx) => {
            let btnCls;
            if (isActive && idx === selectedCol) btnCls = 'price-cell-btn price-cell-btn--selected';
            else if (isActive) btnCls = 'price-cell-btn price-cell-btn--row-active';
            else btnCls = 'price-cell-btn price-cell-btn--default';
            return `
                <td class="price-td price-td--center">
                    <button type="button" class="${btnCls}">${p} euro</button>
                </td>
            `;
        }).join('');
        return `
            <tr class="${trCls}">
                <td class="price-td price-td--left">
                    <button type="button" class="${qtyBtnCls}">${row.qty}</button>
                </td>
                ${cells}
            </tr>
        `;
    }).join('');
};

const renderTable = ({ activeQty = 50, selectedCol = 0, navUpDisabled = false, navDownDisabled = false } = {}) => `
    <div class="price-table-wrapper">
        <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
            <button type="button" class="price-nav-arrow${navUpDisabled ? ' disabled' : ''}" aria-label="Quantita precedenti">${arrowUp}</button>
        </div>
        <div class="price-table-section">
            <table class="price-table-full">
                <thead>${renderHeader(selectedCol)}</thead>
                <tbody>${renderBody(activeQty, selectedCol)}</tbody>
            </table>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
            <button type="button" class="price-nav-arrow${navDownDisabled ? ' disabled' : ''}" aria-label="Quantita successive">${arrowDown}</button>
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
                component: 'Tabella prezzi stile Google Flights: header data spedizione, righe quantita, intersezione = prezzo. CSS-only. Il consumer applica i modifier `.price-th--selected` (colonna), `.price-tr--active` (riga qty), `.price-cell-btn--selected` / `--row-active` (cella) in base allo stato applicativo.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(renderTable({ activeQty: 50, selectedCol: 0 })),
    parameters: {
        docs: {
            description: {
                story: 'Snapshot base: 7 righe qty (25-100), 3 colonne data. Riga 50 attiva, prima colonna data selezionata. La cella intersezione (50 + 09/03) mostra `.price-cell-btn--selected`.'
            }
        }
    }
};

export const ReferenceFromElementsUI = {
    render: () => renderRoot(renderTable({ activeQty: 50, selectedCol: 0 })),
    parameters: {
        docs: {
            description: {
                story: 'Markup verbatim derivato da `product-page-integration/js/sections/section-6.js#L355-L442` (template literal `Tabella prezzi (Google Flights style)`). Stato realistico: `closestDisplayedQty === 50`, `selectedDeliveryIndex === 0`. IVA non applicata (consumer responsibility).'
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
                story: 'Riga qty 25 (prima della pagina) attiva: la freccia su e\' `disabled` (opacity 0.25, pointer-events none). Tutti i `.price-cell-btn` della riga sono `--row-active`, intersezione `--selected`.'
            }
        }
    }
};

export const NoSelection = {
    render: () => {
        const noActiveTable = `
            <div class="price-table-wrapper">
                <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
                    <button type="button" class="price-nav-arrow disabled" aria-label="Quantita precedenti">${arrowUp}</button>
                </div>
                <div class="price-table-section">
                    <table class="price-table-full">
                        <thead>${renderHeader(-1)}</thead>
                        <tbody>${rows.map((row) => `
                            <tr class="price-tr">
                                <td class="price-td price-td--left"><button type="button" class="price-qty-btn">${row.qty}</button></td>
                                ${row.prices.map((p) => `<td class="price-td price-td--center"><button type="button" class="price-cell-btn price-cell-btn--default">${p} euro</button></td>`).join('')}
                            </tr>
                        `).join('')}</tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
                    <button type="button" class="price-nav-arrow disabled" aria-label="Quantita successive">${arrowDown}</button>
                </div>
            </div>
        `;
        return renderRoot(noActiveTable);
    },
    parameters: {
        docs: {
            description: {
                story: 'Stato "vuoto": nessuna riga `--active`, nessuna colonna `--selected`. Tutti i `.price-cell-btn` sono `--default` (bg bianco, bordo gray-200). Utile come baseline puramente CSS.'
            }
        }
    }
};

export const WithMobileArrows = {
    render: () => {
        const html = `
            <div class="price-table-wrapper">
                <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
                    <button type="button" class="price-nav-arrow" aria-label="Quantita precedenti">${arrowUp}</button>
                </div>
                <div class="price-table-section" style="position: relative;">
                    <button type="button" class="price-nav-arrow-horizontal left" aria-label="Scorri a sinistra">${chevronLeft}</button>
                    <button type="button" class="price-nav-arrow-horizontal right" aria-label="Scorri a destra">${chevronRight}</button>
                    <table class="price-table-full">
                        <thead>${renderHeader(0)}</thead>
                        <tbody>${renderBody(50, 0)}</tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
                    <button type="button" class="price-nav-arrow" aria-label="Quantita successive">${arrowDown}</button>
                </div>
            </div>
        `;
        return renderRoot(html);
    },
    parameters: {
        docs: {
            description: {
                story: 'Variante con frecce orizzontali per scroll mobile. `.price-nav-arrow-horizontal.left` / `.right` sono overlay assoluti su un wrapper `position: relative`. Sotto 767px diventano sempre `display: flex` (vedi media query); il consumer JS le nasconde via `style="display: none"` quando lo scroll non e\' necessario.'
            }
        }
    }
};
