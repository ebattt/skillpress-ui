import '../components/dashboard-action-badge.css';
import '../components/order-detail-header.css';
import { expect, within } from 'storybook/test';

const renderHeader = ({ status = 'warning' } = {}) => {
    const labels = {
        warning: 'In lavorazione',
        success: 'Consegnato',
        error: 'File non conforme',
        neutral: 'Aperto'
    };
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="order-detail-header" data-order-detail-header>
            <button class="order-detail-header__back" type="button">
                <span class="order-detail-header__back-icon" aria-hidden="true"></span>
                Torna agli ordini
            </button>
            <header class="order-header">
                <div class="order-header__top">
                    <h1 class="order-header__title">Ordine #110456</h1>
                    <span class="order-header__badge order-header__badge--${status}">${labels[status]}</span>
                </div>
                <p class="order-header__subtitle">
                    <span class="order-header__subtitle-line">Catalogo Primavera Estate 2026 Edizione Speciale</span>
                    <span class="order-header__subtitle-line">Consegna prevista <strong class="order-header__subtitle-emphasis">12/03/2026</strong></span>
                </p>
                <div class="order-header__meta">
                    <span class="dash-action-badge" data-dashboard-action-badge>
                        <span class="dash-action-badge__icon dash-action-badge__icon--upload" aria-hidden="true"></span>
                        File richiesto
                    </span>
                </div>
            </header>
        </div>
    `;
    return root;
};

export default {
    title: 'Dashboard/Order Detail/OrderDetailHeader',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard order detail header. Routing and data refresh remain application-owned.'
            }
        }
    }
};

export const Default = {
    render: () => renderHeader(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('heading', { name: /Ordine #110456/ })).toBeInTheDocument();
        await expect(canvas.getByRole('button', { name: /Torna agli ordini/ })).toBeInTheDocument();
    }
};

export const Delivered = {
    render: () => renderHeader({ status: 'success' })
};

export const Error = {
    render: () => renderHeader({ status: 'error' })
};

export const ReferenceFromDashboardPage = {
    render: () => renderHeader({ status: 'neutral' }),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html#L410-L420`. Material Symbols and layout utility classes are replaced by component-owned CSS.'
            }
        }
    }
};
