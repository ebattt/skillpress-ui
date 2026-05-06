import '../components/table-pagination.css';
import { expect, within } from 'storybook/test';

const renderPagination = ({
    active = 1,
    pages = [1, 2],
    prevDisabled = true,
    nextDisabled = false
} = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <nav class="table-pagination" aria-label="Paginazione ordini" data-table-pagination>
            <div class="table-pagination__list">
                <button class="pagination-btn" type="button" ${prevDisabled ? 'disabled' : ''} aria-label="Pagina precedente">
                    <span class="pagination-btn__icon pagination-btn__icon--prev" aria-hidden="true"></span>
                </button>
                ${pages.map((page) => `
                    <button class="pagination-btn${page === active ? ' pagination-btn--active' : ''}" type="button" ${page === active ? 'aria-current="page"' : ''}>${page}</button>
                `).join('')}
                <button class="pagination-btn" type="button" ${nextDisabled ? 'disabled' : ''} aria-label="Pagina successiva">
                    <span class="pagination-btn__icon pagination-btn__icon--next" aria-hidden="true"></span>
                </button>
            </div>
        </nav>
    `;
    return root;
};

export default {
    title: 'Dashboard/Orders/TablePagination',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard table pagination controls. The library owns circular buttons and CSS arrows; backend/app owns page state.'
            }
        }
    }
};

export const Default = {
    render: () => renderPagination(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('button', { name: '1' })).toHaveClass('pagination-btn', 'pagination-btn--active');
        await expect(canvas.getByLabelText('Pagina precedente')).toBeDisabled();
    }
};

export const MiddlePage = {
    render: () => renderPagination({
        active: 3,
        pages: [1, 2, 3, 4, 5],
        prevDisabled: false
    })
};

export const ReferenceFromDashboardPage = {
    render: () => renderPagination(),
    parameters: {
        docs: {
            description: {
                story: 'Markup shape from `dashboard/index.html` orders pagination. Material Symbols are replaced by CSS arrows.'
            }
        }
    }
};
