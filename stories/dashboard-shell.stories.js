import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../primitives/button.css';
import '../primitives/dashboard-nav-icons.css';
import '../components/dashboard-shell.css';
import '../js/dashboard-shell.js';
import { expect, userEvent, within } from 'storybook/test';

const renderDashboardShell = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="dashboard-shell" data-dashboard-shell data-dashboard-shell-initial-view="dashboard">
            <aside class="dashboard-shell__sidebar" aria-label="Navigazione dashboard">
                <nav class="dashboard-shell__nav" data-dashboard-shell-nav aria-label="Viste dashboard">
                    <button class="dashboard-shell__nav-item dashboard-shell__nav-item--profile" type="button" data-dashboard-shell-nav-item="account" aria-current="false"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--account" aria-hidden="true"></span><span>Profilo</span></button>
                    <button class="dashboard-shell__nav-item" type="button" data-dashboard-shell-nav-item="dashboard" aria-current="page"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--dashboard" aria-hidden="true"></span><span>Dashboard</span></button>
                    <button class="dashboard-shell__nav-item" type="button" data-dashboard-shell-nav-item="orders" aria-current="false"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--orders" aria-hidden="true"></span><span>Ordini</span></button>
                    <button class="dashboard-shell__nav-item" type="button" data-dashboard-shell-nav-item="billing" aria-current="false"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--billing" aria-hidden="true"></span><span>Fatturazione</span></button>
                    <button class="dashboard-shell__nav-item" type="button" data-dashboard-shell-nav-item="quotes" aria-current="false"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--quotes" aria-hidden="true"></span><span>Preventivi</span></button>
                    <button class="dashboard-shell__nav-item" type="button" data-dashboard-shell-nav-item="fornitore" aria-current="false"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--supplier" aria-hidden="true"></span><span>Fornitore</span></button>
                    <button class="dashboard-shell__nav-item dashboard-shell__nav-item--logout" type="button" data-dashboard-shell-nav-item="logout" aria-current="false"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--logout" aria-hidden="true"></span><span>Esci</span></button>
                </nav>
            </aside>
            <main class="dashboard-shell__main">
                <section class="dashboard-shell__mobile-menu" data-dashboard-shell-mobile-menu hidden aria-label="Menu dashboard mobile">
                    <nav class="dashboard-shell__mobile-nav" data-dashboard-shell-nav aria-label="Viste dashboard mobile">
                        <button class="dashboard-shell__nav-item" type="button" data-dashboard-shell-nav-item="dashboard" aria-current="page"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--dashboard" aria-hidden="true"></span><span>Dashboard</span></button>
                        <button class="dashboard-shell__nav-item" type="button" data-dashboard-shell-nav-item="orders" aria-current="false"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--orders" aria-hidden="true"></span><span>Ordini</span></button>
                        <button class="dashboard-shell__nav-item" type="button" data-dashboard-shell-nav-item="quotes" aria-current="false"><span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--quotes" aria-hidden="true"></span><span>Preventivi</span></button>
                    </nav>
                </section>
                <button class="dashboard-shell__mobile-back" type="button" data-dashboard-shell-back hidden>Menu</button>
                <div class="dashboard-shell__views">
                    <section class="dashboard-shell__view dashboard-shell__section" data-dashboard-shell-view="dashboard">
                        <h1 class="dashboard-shell__page-title">Dashboard</h1>
                        <button class="sp-button sp-button--dashboard-link" type="button" data-dashboard-shell-navigate="order-detail">Apri dettaglio ordine</button>
                        <article tabindex="0" role="button" data-dashboard-shell-navigate="order-detail" data-dashboard-shell-navigate-disabled-mobile>Riga tabella con opt-out mobile</article>
                    </section>
                    <section class="dashboard-shell__view dashboard-shell__section" data-dashboard-shell-view="orders" hidden>
                        <h1 class="dashboard-shell__page-title">Ordini</h1>
                    </section>
                    <section class="dashboard-shell__view dashboard-shell__section" data-dashboard-shell-view="order-detail" data-dashboard-shell-parent="orders" hidden>
                        <h1 class="dashboard-shell__page-title">Ordine #110456</h1>
                    </section>
                    <section class="dashboard-shell__view dashboard-shell__section" data-dashboard-shell-view="quotes" hidden>
                        <h1 class="dashboard-shell__page-title">Preventivi</h1>
                    </section>
                    <section class="dashboard-shell__view dashboard-shell__section" data-dashboard-shell-view="quote-request" data-dashboard-shell-parent="quotes" hidden>
                        <h1 class="dashboard-shell__page-title">Richiesta preventivo</h1>
                    </section>
                </div>
            </main>
        </div>
    `;
    requestAnimationFrame(() => window.SkillpressUI.DashboardShell.init(root));
    return root;
};

export default {
    title: 'Dashboard/Shell/DashboardShell',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Dashboard application shell / navigation layout with desktop sidebar, mobile menu and pure UI routing.'
            }
        }
    }
};

export const Default = {
    render: renderDashboardShell,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const shell = canvasElement.querySelector('[data-dashboard-shell]');
        await expect(canvas.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
        window.SkillpressUI.DashboardShell.navigate(shell, 'orders');
        await expect(canvas.getByRole('heading', { name: 'Ordini' })).toBeVisible();
    }
};

export const ParentNavigation = {
    render: renderDashboardShell,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByText('Apri dettaglio ordine'));
        await expect(canvas.getByRole('heading', { name: 'Ordine #110456' })).toBeVisible();
        await expect(canvas.getAllByText('Ordini')[0]).toHaveAttribute('aria-current', 'page');
    }
};

export const ReferenceFromDashboardPage = {
    render: renderDashboardShell,
    parameters: {
        docs: {
            description: {
                story: 'Source from dashboard shell/nav. Legacy state classes, nav item classes and Material Symbols are replaced by BEM strict classes, `hidden`, `aria-current` and CSS-owned icons.'
            }
        }
    }
};
