import '../components/dashboard-action-badge.css';
import { expect, within } from 'storybook/test';

const renderBadge = ({
    label = 'Carica file',
    icon = 'upload',
    error = false
} = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <span class="dash-action-badge${error ? ' dash-action-badge--error' : ''}" data-dashboard-action-badge>
            <span class="dash-action-badge__icon dash-action-badge__icon--${icon}" aria-hidden="true"></span>
            ${label}
        </span>
    `;
    return root;
};

const renderGroup = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 0.375rem; align-items: center;">
            ${renderBadge({ label: 'Carica file', icon: 'upload' }).innerHTML}
            ${renderBadge({ label: 'Carica contabile', icon: 'receipt' }).innerHTML}
            ${renderBadge({ label: 'File non conforme', icon: 'error', error: true }).innerHTML}
        </div>
    `;
    return root;
};

export default {
    title: 'Components/DashboardActionBadge',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard required-action chip. The library owns the red pill and CSS icons; backend/app owns the action.'
            }
        }
    }
};

export const Default = {
    render: () => renderBadge(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Carica file')).toHaveClass('dash-action-badge');
    }
};

export const Variants = {
    render: () => renderGroup()
};

export const ReferenceFromDashboardTable = {
    render: () => renderGroup(),
    parameters: {
        docs: {
            description: {
                story: 'Reference from `dashboard/index.html` orders table. Material Symbols are replaced by hidden CSS icon spans owned by the library.'
            }
        }
    }
};
