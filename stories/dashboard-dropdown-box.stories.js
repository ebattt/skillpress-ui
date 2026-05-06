import '../components/dashboard-dropdown-box.css';
import '../js/dashboard-dropdown-box.js';
import { expect, within } from 'storybook/test';

const renderDropdown = ({ expanded = false, alert = false, type = 'payment' } = {}) => {
    const title = type === 'shipping' ? 'Spedizione' : 'Pagamento';
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="dash-dropdown-box${alert ? ' dash-dropdown-box--alert' : ''}" data-dashboard-dropdown-box>
            <button class="dash-dropdown-box__trigger"
                    type="button"
                    aria-expanded="${expanded ? 'true' : 'false'}"
                    data-dashboard-dropdown-box-trigger>
                <span class="dash-dropdown-box__trigger-label">
                    <span class="dash-dropdown-box__trigger-icon dash-dropdown-box__trigger-icon--${type}" aria-hidden="true"></span>
                    ${title}
                </span>
                <span class="dash-dropdown-box__chevron" aria-hidden="true"></span>
            </button>
            <div class="dash-dropdown-box__content" data-dashboard-dropdown-box-content ${expanded ? '' : 'hidden'}>
                <div style="padding-top: 1rem; font-size: 0.875rem; color: var(--color-text);">
                    ${type === 'shipping' ? 'Corriere espresso<br><strong>07/02/2026</strong>' : 'Bonifico bancario<br><strong>In attesa di verifica</strong>'}
                </div>
            </div>
        </div>
    `;
    return root;
};

export default {
    title: 'Dashboard/Order Detail/DashboardDropdownBox',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard order detail sidebar disclosure box. The library owns the disclosure shell; content remains a backend/app slot.'
            }
        }
    }
};

export const Payment = {
    render: () => renderDropdown({ type: 'payment' }),
    play: async ({ canvasElement }) => {
        window.SkillpressUI.DashboardDropdownBox.init(canvasElement);
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole('button', { name: 'Pagamento' });
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        trigger.click();
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    }
};

export const ShippingExpanded = {
    render: () => renderDropdown({ type: 'shipping', expanded: true })
};

export const Alert = {
    render: () => renderDropdown({ type: 'payment', alert: true })
};

export const ReferenceFromDashboardPage = {
    render: () => {
        const root = document.createElement('div');
        root.style.display = 'grid';
        root.style.gap = '1rem';
        root.innerHTML = `
            ${renderDropdown({ type: 'payment' }).innerHTML}
            ${renderDropdown({ type: 'shipping' }).innerHTML}
        `;
        return root;
    },
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html` payment and shipping boxes. Material Symbols are replaced by CSS icons.'
            }
        }
    }
};
