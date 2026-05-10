import '../primitives/badge.css';
import '../components/dashboard-action-badge.css';
import '../components/orders-table.css';
import '../js/orders-table.js';
import { expect, within } from 'storybook/test';

const actionBadge = (label, icon = 'upload', error = false) => `
    <span class="dashboard-action-badge${error ? ' dashboard-action-badge--error' : ''}" data-dashboard-action-badge>
        <span class="dashboard-action-badge__icon dashboard-action-badge__icon--${icon}" aria-hidden="true"></span>
        ${label}
    </span>
`;

const rows = [
    {
        id: '110456',
        orderId: 'ORD-001',
        title: 'Catalogo Primavera Estate 2026 Edizione Speciale · Libro fotografico Neri Collection Limited · Poster evento lancio prodotto internazionale',
        products: ['Brossura fresata', 'Copertina rigida', 'Volantino A5'],
        quantities: ['200', '150', '150'],
        contact: '-',
        shipped: '-',
        actions: [actionBadge('Carica file', 'upload'), actionBadge('Carica contabile', 'receipt')],
        status: '<span class="sp-badge sp-badge--info">In lavorazione</span>',
        payment: '<span class="sp-badge sp-badge--warning">In sospeso</span>',
        delivery: 'Ritiro in sede 16:30<br><strong>12/03/2026</strong>',
        total: '&euro; 320,50'
    },
    {
        id: '110389',
        orderId: 'ORD-002',
        title: 'Volantini Evento Charity',
        products: ['Punto metallico'],
        quantities: ['2.000'],
        contact: 'Lucia Marchetti',
        shipped: '05/02/2026',
        actions: [],
        status: '<span class="sp-badge sp-badge--success">Consegnato</span>',
        payment: '<span class="sp-badge sp-badge--success">Pagato</span>',
        delivery: 'Corriere espresso<br><strong>07/02/2026</strong>',
        total: '&euro; 185,00'
    },
    {
        id: '110198',
        orderId: 'ORD-004',
        title: 'Menu Ristorante Bellavista',
        products: ['Copertina rigida'],
        quantities: ['50'],
        contact: '-',
        shipped: '-',
        actions: [actionBadge('File non conforme', 'error', true)],
        status: '<span class="sp-badge sp-badge--info">In lavorazione</span>',
        payment: '<span class="sp-badge sp-badge--warning">In sospeso</span>',
        delivery: 'Standard entro<br><strong>28/03/2026</strong>',
        total: '&euro; 275,00'
    }
];

const renderRows = (items = rows) => items.map((row) => `
    <tr data-recent-order-card-order-id="${row.orderId}">
        <td class="orders-table__cell--id font-semibold text-dark-blue orders-table__cell--nowrap">${row.id}</td>
        <td class="orders-table__cell--title">
            <div class="table-title-cell">
                <span class="table-title-cell__text" title="${row.title}">${row.title}</span>
                ${row.actions.length ? `<div class="table-title-cell__actions" aria-label="Azioni richieste">${row.actions.join('')}</div>` : ''}
            </div>
        </td>
        <td class="orders-table__cell--prodotti orders-table__cell--mobile-hide">
            <div class="product-list">
                ${row.products.map((product) => `<span class="product-name">${product}</span>`).join('')}
            </div>
        </td>
        <td class="orders-table__cell--pezzi orders-table__cell--text-right orders-table__cell--mobile-hide">
            <div class="product-list">${row.quantities.map((quantity) => `<span>${quantity}</span>`).join('')}</div>
        </td>
        <td class="orders-table__cell--mobile-hide">${row.contact}</td>
        <td class="orders-table__cell--nowrap orders-table__cell--mobile-hide">${row.shipped}</td>
        <td class="orders-table__cell--mobile-hide">
            <div class="table-actions-list">${row.actions.join('')}</div>
        </td>
        <td class="orders-table__cell--status">${row.status}</td>
        <td class="orders-table__cell--payment orders-table__cell--mobile-hide orders-table__cell--simplified-show">${row.payment}</td>
        <td class="orders-table__cell--spedizione orders-table__cell--mobile-hide">${row.delivery}</td>
        <td class="orders-table__cell--total font-semibold orders-table__cell--text-right orders-table__cell--nowrap">${row.total}</td>
    </tr>
`).join('');

const renderTable = (items = rows) => {
    const body = items.length
        ? renderRows(items)
        : '<tr><td class="orders-table__empty" colspan="11">Nessun ordine disponibile</td></tr>';
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="table-wrapper table-wrapper--scroll">
            <table class="orders-table orders-table--compact" data-orders-table>
                <thead>
                    <tr>
                        <th class="th-id">#</th>
                        <th class="th-title">Lavoro</th>
                        <th class="th-mobile-hide">Prodotti</th>
                        <th class="th-text-right th-mobile-hide">Pezzi</th>
                        <th class="th-mobile-hide">Referente</th>
                        <th class="th-mobile-hide">Spedito il</th>
                        <th class="th-mobile-hide">Azioni richieste</th>
                        <th class="th-status">Stato</th>
                        <th class="th-mobile-hide th-simplified-show th-payment">Pagamento</th>
                        <th class="th-mobile-hide">Spedizione</th>
                        <th class="th-text-right th-total">Totale</th>
                    </tr>
                </thead>
                <tbody>${body}</tbody>
            </table>
        </div>
    `;
    return root;
};

export default {
    title: 'Dashboard/Orders/OrdersTable',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard compact orders table. Compose with Badge, DashboardActionBadge, SearchFilterBar and TablePagination.'
            }
        }
    }
};

export const Default = {
    render: () => renderTable(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('110456')).toBeInTheDocument();
        await expect(canvas.getByText('In lavorazione')).toHaveClass('sp-badge', 'sp-badge--info');
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderTable(rows.slice(0, 2)),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html` orders table. Status uses Badge and action chips use DashboardActionBadge.'
            }
        }
    }
};

export const Empty = {
    render: () => renderTable([]),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Nessun ordine disponibile')).toBeInTheDocument();
    },
    parameters: {
        docs: {
            description: {
                story: 'Empty dashboard table state. Backend/app decides when the collection is empty; the library owns spacing and table-safe empty markup styling.'
            }
        }
    }
};

export const MobileDetails = {
    render: () => renderTable(rows.slice(0, 2)),
    play: async ({ canvasElement }) => {
        window.SkillpressUI.OrdersTable.init(canvasElement);
        const canvas = within(canvasElement);
        const toggle = canvas.getAllByLabelText('Mostra dettagli riga')[0];
        toggle.click();
        await expect(canvas.getByText('Prodotti')).toBeInTheDocument();
        await expect(toggle.closest('tr')).toHaveAttribute('aria-expanded', 'true');
    },
    parameters: {
        docs: {
            description: {
                story: 'Optional JS behavior: hidden mobile columns are rendered into an expandable details row. Routing/detail CTA remains out of scope.'
            }
        }
    }
};
