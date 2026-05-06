import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../utilities/utilities.css';
import '../primitives/badge.css';
import '../components/search-filter-bar.css';
import '../components/orders-table.css';
import '../components/table-pagination.css';
import '../components/supplier-activity-table.css';
import '../js/supplier-activity-table.js';
import { expect, within } from 'storybook/test';

const rows = [
    {
        id: '47298',
        date: '07/05/2021',
        product: 'Romania',
        qty: '30',
        format: '210x210 (Verticale)',
        paper: 'Patinata Opaca 170g',
        cover: 'Patinata Opaca 170g',
        pages: '116',
        status: 'In lavorazione',
        statusClass: 'badge badge--info'
    },
    {
        id: '108958',
        date: '21/10/2025',
        product: 'Collezione Arte',
        qty: '40',
        format: '240x240 (Quadrato)',
        paper: 'Patinata Opaca 150g',
        cover: 'Patinata Opaca 170g',
        pages: '96',
        status: 'Aperto',
        statusClass: 'badge badge--warning'
    }
];

const company = `
    <div class="supplier-activity-table__company">
        <strong>SKILLPRESS di Battiston Maurizio e Marco snc</strong>
        <span>Viale Kennedy 17</span>
        <span>30025 - Fossalta di Portogruaro (VE) - Italia</span>
    </div>
`;

const renderDetail = (row) => `
    <tr class="supplier-activity-table__detail-row" id="supplier-detail-${row.id}" data-supplier-activity-table-detail hidden>
        <td colspan="8">
            <div class="supplier-activity-table__detail">
                <div class="supplier-activity-table__summary">
                    <div class="supplier-activity-table__summary-item">
                        <dt>Attività</dt>
                        <dd>In attesa</dd>
                    </div>
                    <div class="supplier-activity-table__summary-item">
                        <dt>Messaggio</dt>
                        <dd>Verrai notificato appena Skillpress ti invierà il semilavorato</dd>
                    </div>
                    <div class="supplier-activity-table__summary-item">
                        <dt>Azienda</dt>
                        <dd><strong>SKILLPRESS di Battiston Maurizio e Marco snc</strong><br>Viale Kennedy 17<br>30025 - Fossalta di Portogruaro (VE) - Italia</dd>
                    </div>
                    <div class="supplier-activity-table__summary-item">
                        <dt>Data</dt>
                        <dd><strong>${row.date}</strong></dd>
                    </div>
                </div>
                <div class="supplier-activity-table__product">
                    <div class="supplier-activity-table__image">
                        <div class="supplier-activity-table__image-placeholder" aria-hidden="true"></div>
                    </div>
                    <div class="supplier-activity-table__info">
                        <h4 class="supplier-activity-table__name">${row.product}</h4>
                        <p class="supplier-activity-table__type">Cartonato Brossura Filo Refe</p>
                    </div>
                </div>
                <div class="supplier-activity-table__specs">
                    <div class="supplier-activity-table__specs-col">
                        <p><strong>Quantità:</strong> ${row.qty}</p>
                        <p><strong>Formato chiuso (mm):</strong> ${row.format}</p>
                        <p><strong>Carta interno:</strong> ${row.paper}</p>
                        <p><strong>Carta copertina:</strong> ${row.cover}</p>
                        <p><strong>Risguardi neutri:</strong> Usomano bianco 170g</p>
                        <p><strong>Rilegatura:</strong> Filo refe cartonato 3mm</p>
                    </div>
                    <div class="supplier-activity-table__specs-col">
                        <p><strong>Facciate comprese le 4 di copertina:</strong> ${row.pages}</p>
                        <p><strong>Stampa interno:</strong> 4/4 Colori fronte e retro</p>
                        <p><strong>Stampa copertina:</strong> 4/0 Colori solo fronte retro bianco</p>
                        <p><strong>Plastificazione:</strong> Opaca Solo fronte</p>
                        <p><strong>Colore Capitelli:</strong> Bianchi</p>
                        <p><strong>Spessore dorso:</strong> 16,5mm</p>
                    </div>
                </div>
            </div>
        </td>
    </tr>
`;

const renderRows = () => rows.map((row) => `
    <tr class="supplier-activity-table__row" tabindex="0" data-supplier-activity-table-row aria-controls="supplier-detail-${row.id}" aria-expanded="false">
        <td class="td-id font-semibold text-dark-blue td-nowrap">${row.id}</td>
        <td class="td-title">
            <div class="table-title-cell">
                <span class="table-title-cell__text" title="Invio Cartonato - Cartonato Brossura Filo Refe">Invio Cartonato - Cartonato Brossura Filo Refe</span>
            </div>
        </td>
        <td class="td-mobile-hide"><span class="supplier-activity-table__activity-label">In attesa</span></td>
        <td class="td-mobile-hide"><span class="supplier-activity-table__message">Verrai notificato appena Skillpress ti invierà il semilavorato</span></td>
        <td class="td-mobile-hide">${company}</td>
        <td class="td-nowrap td-mobile-hide"><strong>${row.date}</strong></td>
        <td class="td-status"><span class="${row.statusClass}">${row.status}</span></td>
    </tr>
    ${renderDetail(row)}
`).join('');

const renderFilters = () => `
    <div class="supplier-activity-section__filters" aria-label="Filtri attività fornitore">
        <select class="orders-filter-select" data-filter="activity-status" aria-label="Stato attività">
            <option>Attività non completate</option>
        </select>
        <select class="orders-filter-select" data-filter="order-filter" aria-label="Ordine">
            <option>Tutti gli ordini aperti</option>
        </select>
        <select class="orders-filter-select" data-filter="sort-by" aria-label="Ordinamento">
            <option>Prese in carico da</option>
        </select>
        <input type="text" placeholder="cerca" class="orders-filter-input" data-filter="search" aria-label="Cerca">
        <button class="orders-filter-btn" type="button" data-action="filter-fornitore">Mostra</button>
    </div>
`;

const renderPagination = () => `
    <nav class="table-pagination" aria-label="Paginazione fornitore">
        <div class="table-pagination__list">
            <button class="pagination-btn" type="button" disabled aria-label="Pagina precedente"><span class="pagination-btn__icon pagination-btn__icon--prev" aria-hidden="true"></span></button>
            <button class="pagination-btn pagination-btn--active" type="button" aria-current="page">1</button>
            <button class="pagination-btn" type="button">2</button>
            <button class="pagination-btn" type="button" aria-label="Pagina successiva"><span class="pagination-btn__icon pagination-btn__icon--next" aria-hidden="true"></span></button>
        </div>
    </nav>
`;

const renderTable = (withComposition = false) => {
    const root = document.createElement('section');
    root.className = 'supplier-activity-section';
    root.innerHTML = `
        <h1 class="supplier-activity-section__title">Attività fornitore</h1>
        ${withComposition ? renderFilters() : ''}
        <div class="table-wrapper table-wrapper--scroll">
            <table class="orders-table orders-table--compact supplier-activity-table" data-supplier-activity-table>
                <thead>
                    <tr>
                        <th class="th-id">#</th>
                        <th class="th-title">Lavoro</th>
                        <th class="th-mobile-hide">Attività</th>
                        <th class="th-mobile-hide">Messaggio</th>
                        <th class="th-mobile-hide">Azienda</th>
                        <th class="th-mobile-hide">Data</th>
                        <th class="th-status">Stato</th>
                    </tr>
                </thead>
                <tbody>${renderRows()}</tbody>
            </table>
        </div>
        ${withComposition ? renderPagination() : ''}
    `;

    window.setTimeout(() => window.SkillpressUI.SupplierActivityTable.init(root), 0);
    return root;
};

export default {
    title: 'Dashboard/Fornitore/SupplierActivityTable',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard supplier activity table with standalone expandable detail rows. Filters, pagination and supplier workflow stay in the consumer/backend.'
            }
        }
    }
};

export const Default = {
    render: () => renderTable(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('47298')).toBeInTheDocument();
        await expect(canvas.getByText('Romania')).not.toBeVisible();
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderTable(true),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html` view `fornitore`. Material Symbols chevron/image and pagination icons are replaced by CSS-owned icons; filter and pagination controls are existing dashboard compositions.'
            }
        }
    }
};
