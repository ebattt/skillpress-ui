import '../components/recent-order-card.css';
import { expect, within } from 'storybook/test';

const orders = [
    {
        id: 'ORD-001',
        number: '#110456',
        status: 'info',
        statusLabel: 'In lavorazione',
        title: 'Catalogo Primavera Estate 2026 Edizione Speciale · Libro fotografico Neri Collection Limited · Poster evento lancio prodotto internazionale',
        shipping: '21/03/2026',
        actionAlert: 'Azioni richieste',
        total: '&euro; 365,50'
    },
    {
        id: 'ORD-002',
        number: '#110389',
        status: 'success',
        statusLabel: 'Consegnato',
        title: 'Volantini Evento Charity',
        shipping: '07/02/2026',
        actionAlert: 'Azioni richieste',
        total: '&euro; 185,00'
    },
    {
        id: 'ORD-003',
        number: '#110275',
        status: 'success',
        statusLabel: 'Consegnato',
        title: 'Depliant Fiera Agricola',
        shipping: '20/01/2026',
        actionAlert: '',
        total: '&euro; 142,80'
    },
    {
        id: 'ORD-004',
        number: '#110198',
        status: 'info',
        statusLabel: 'In lavorazione',
        title: 'Menu Ristorante Bellavista',
        shipping: '28/03/2026',
        actionAlert: '',
        total: '&euro; 275,00'
    }
];

const renderCard = (order) => `
    <article class="dash-order-card" data-recent-order-card data-order-id="${order.id}">
        <div class="dash-order-card__header-row">
            <span class="dash-order-card__number">${order.number}</span>
            <span class="dash-order-card__status dash-order-card__status--${order.status}">${order.statusLabel}</span>
        </div>
        <div class="dash-order-card__title dash-order-card__title--clamp">${order.title}</div>
        <div class="dash-order-card__info">Spedizione <strong>${order.shipping}</strong></div>
        <div class="dash-order-card__actions-wrap">${order.actionAlert ? `<span class="dash-order-card__action-alert">${order.actionAlert}</span>` : ''}</div>
        <div class="dash-order-card__footer">
            <span class="dash-order-card__date">Totale</span>
            <span class="dash-order-card__total">${order.total}</span>
        </div>
    </article>
`;

const renderGrid = (items = orders) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="dash-recent-orders-grid" data-recent-order-card-list>
            ${items.map(renderCard).join('')}
        </div>
    `;
    return root;
};

export default {
    title: 'Dashboard/Overview/RecentOrderCard',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard recent order cards from the real dashboard overview. The library owns layout and visual state; backend/app owns order data and routing.'
            }
        }
    }
};

export const Default = {
    render: () => renderGrid(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('#110456')).toHaveClass('dash-order-card__number');
        await expect(canvas.getAllByText('In lavorazione')[0]).toHaveClass('dash-order-card__status', 'dash-order-card__status--info');
        await expect(canvas.getAllByText('Azioni richieste')[0]).toHaveClass('dash-order-card__action-alert');
    }
};

export const StatusVariants = {
    render: () => renderGrid([
        { id: 'ORD-500', number: '#110500', status: 'warning', statusLabel: 'Aperto', title: 'Biglietti da visita', shipping: '15/04/2026', actionAlert: '', total: '&euro; 45,00' },
        { id: 'ORD-501', number: '#110501', status: 'error', statusLabel: 'Scaduto', title: 'Poster Evento Lancio', shipping: '01/03/2026', actionAlert: 'Azioni richieste', total: '&euro; 220,00' },
        { id: 'ORD-502', number: '#110502', status: 'cancelled', statusLabel: 'Annullato', title: 'Brochure aziendale', shipping: '10/02/2026', actionAlert: '', total: '&euro; 310,00' }
    ])
};

export const ReferenceFromDashboardPage = {
    render: () => renderGrid(),
    parameters: {
        docs: {
            description: {
                story: 'Markup and data shape from `dashboard/index.html` overview recent orders.'
            }
        }
    }
};
