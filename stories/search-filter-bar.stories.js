import '../components/search-filter-bar.css';
import { expect, within } from 'storybook/test';

const renderOrders = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="orders-filter-bar orders-filter-bar--orders" data-search-filter-bar>
            <select class="orders-filter-select" data-search-filter-bar-filter="field">
                <option>Numero</option>
                <option>Lavoro</option>
                <option>Referente</option>
                <option>Stato</option>
            </select>
            <input type="text" placeholder="cerca" class="orders-filter-input" data-search-filter-bar-filter="search">
            <button class="orders-filter-btn" type="button" data-orders-table-action="filter-orders">Mostra</button>
        </div>
    `;
    return root;
};

const renderQuotes = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="orders-filter-bar orders-filter-bar--quotes" data-search-filter-bar>
            <select class="orders-filter-select">
                <option>Numero</option>
                <option>Lavoro</option>
                <option>Stato</option>
            </select>
            <input type="text" placeholder="cerca" class="orders-filter-input">
            <button class="orders-filter-btn" type="button">Mostra</button>
            <button class="orders-filter-btn orders-filter-btn--accent" type="button">
                <span class="orders-filter-btn__icon orders-filter-btn__icon--add" aria-hidden="true"></span>
                Richiedi Preventivo
            </button>
        </div>
    `;
    return root;
};

export default {
    title: 'Dashboard/Orders/SearchFilterBar',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard search/filter controls row. The library owns layout and controls styling; backend/app owns filtering behavior.'
            }
        }
    }
};

export const Orders = {
    render: () => renderOrders(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('button', { name: 'Mostra' })).toHaveClass('orders-filter-btn');
        await expect(canvas.getByPlaceholderText('cerca')).toHaveClass('orders-filter-input');
    }
};

export const Quotes = {
    render: () => renderQuotes()
};

export const ReferenceFromDashboardPage = {
    render: () => renderOrders(),
    parameters: {
        docs: {
            description: {
                story: 'Markup shape from `dashboard/index.html` orders view. Filtering logic remains application-owned.'
            }
        }
    }
};
