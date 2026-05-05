import '../components/dashboard-welcome-box.css';
import { expect, within } from 'storybook/test';

const renderDashboardWelcomeBox = ({
    userName = 'Mario Rossi',
    subtitle = 'Benvenuto nella dashboard',
    splitUserName = true
} = {}) => {
    const root = document.createElement('div');
    root.style.maxWidth = '52rem';

    root.innerHTML = `
        <div class="dash-greeting-banner" data-dashboard-welcome-box>
            <h1 class="dash-greeting-banner__title">Ciao ${splitUserName ? `<span class="user-name">${userName}</span>` : userName}</h1>
            <p class="dash-greeting-banner__subtitle">${subtitle}</p>
        </div>
    `;

    return root;
};

export default {
    title: 'Components/DashboardWelcomeBox',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard greeting banner from the real dashboard overview. The library owns spacing and typography; backend/app owns the user name and text.'
            }
        }
    }
};

export const Default = {
    render: () => renderDashboardWelcomeBox(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const title = canvas.getByRole('heading', { name: 'Ciao Mario Rossi' });
        await expect(title).toHaveClass('dash-greeting-banner__title');
        await expect(canvas.getByText('Mario Rossi')).toHaveClass('user-name');
        await expect(canvas.getByText('Benvenuto nella dashboard')).toHaveClass('dash-greeting-banner__subtitle');
    }
};

export const ReferenceFromElementsUI = {
    render: () => renderDashboardWelcomeBox({ splitUserName: false }),
    parameters: {
        docs: {
            description: {
                story: 'Reference from `elements-ui/js/dashboard/welcome-box.js`: same root/title/subtitle classes with hardcoded demo name. The real dashboard page adds `.user-name` around the injected user name.'
            }
        }
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderDashboardWelcomeBox({
        userName: '{{nomeUtente}}'
    }),
    parameters: {
        docs: {
            description: {
                story: 'Markup shape from `dashboard/index.html`: the user name is injected inside `<span class="user-name">` within the title.'
            }
        }
    }
};
