import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../utilities/utilities.css';
import '../components/search-filter-bar.css';
import '../components/table-pagination.css';
import '../components/invoice-table.css';
import { expect, within } from 'storybook/test';

const rows = [
    { invoice: 'FT-2025-024', ddt: '1042', date: '10/09/25', total: '&euro; 98,42' },
    { invoice: 'FT-2025-023', ddt: '1041', date: '08/09/25', total: '&euro; 45,00' },
    { invoice: 'FT-2024-088', ddt: '1040', date: '15/08/24', total: '&euro; 14,38' },
    { invoice: 'FT-2024-087', ddt: '1039', date: '05/11/24', total: '&euro; 32,50' },
    { invoice: 'FT-2024-086', ddt: '1038', date: '01/11/24', total: '&euro; 78,90' }
];

const downloadIcon = '<span class="dashboard-link--download__icon dashboard-link--download__icon--download" aria-hidden="true"></span>';

const renderRows = (items) => items.map((row) => `
    <tr>
        <td>
            <button class="dashboard-link--download" type="button" aria-label="Scarica fattura ${row.invoice}">
                <span class="font-semibold">${row.invoice}</span>
                ${downloadIcon}
            </button>
        </td>
        <td>
            <button class="dashboard-link--download" type="button" aria-label="Scarica DDT ${row.ddt}">
                <span class="font-semibold">${row.ddt}</span>
                ${downloadIcon}
            </button>
        </td>
        <td>${row.date}</td>
        <td class="font-semibold">${row.total}</td>
    </tr>
`).join('');

const renderFilters = () => `
    <div class="invoice-table-section__filters" aria-label="Filtri fatture">
        <select class="orders-filter-select" data-search-filter-bar-filter="invoice-status" aria-label="Stato fattura">
            <option>Tutte le fatture</option>
            <option>Pagate</option>
            <option>In sospeso</option>
        </select>
        <select class="orders-filter-select" data-search-filter-bar-filter="invoice-year" aria-label="Anno fattura">
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
        </select>
    </div>
`;

const renderPagination = () => `
    <nav class="table-pagination" aria-label="Paginazione fatture">
        <div class="table-pagination__list">
            <button class="pagination-btn" type="button" disabled aria-label="Pagina precedente">
                <span class="pagination-btn__icon pagination-btn__icon--prev" aria-hidden="true"></span>
            </button>
            <button class="pagination-btn pagination-btn--active" type="button" aria-current="page">1</button>
            <button class="pagination-btn" type="button">2</button>
            <button class="pagination-btn" type="button">3</button>
            <button class="pagination-btn" type="button" aria-label="Pagina successiva">
                <span class="pagination-btn__icon pagination-btn__icon--next" aria-hidden="true"></span>
            </button>
        </div>
    </nav>
`;

const renderTable = (items = rows, withComposition = false) => {
    const root = document.createElement('section');
    root.className = withComposition ? 'invoice-table-section' : '';
    root.innerHTML = `
        <h2 class="invoice-table-section__title">Fatture</h2>
        ${withComposition ? renderFilters() : ''}
        <div class="table-wrapper">
            <table class="invoice-table">
                <thead>
                    <tr>
                        <th>Fattura</th>
                        <th>DDT</th>
                        <th>Data</th>
                        <th>Totale</th>
                    </tr>
                </thead>
                <tbody>${renderRows(items)}</tbody>
            </table>
        </div>
        ${withComposition ? renderPagination() : ''}
    `;
    return root;
};

export default {
    title: 'Dashboard/Billing/InvoiceTable',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard invoice/download table. CSS-only; filtering, pagination and PDF download stay in the consumer/backend.'
            }
        }
    }
};

export const Default = {
    render: () => renderTable(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('FT-2025-024')).toBeInTheDocument();
        await expect(canvas.getAllByLabelText(/Scarica fattura/)[0]).toHaveClass('dashboard-link--download');
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderTable(rows, true),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html` billing fatture section. Material Symbols are replaced by CSS-owned icons; filters and pagination use existing dashboard components.'
            }
        }
    }
};
