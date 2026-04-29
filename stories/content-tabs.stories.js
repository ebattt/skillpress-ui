import '../components/content-tabs.css';
import '../js/content-tabs.js';
import { expect } from 'storybook/test';

const render = () => {
    const root = document.createElement('div');
    root.style.maxWidth = '760px';
    root.innerHTML = `
        <div class="content-tabs" data-content-tabs>
            <div class="content-tabs__list" role="tablist" aria-label="Informazioni prodotto">
                <button class="content-tabs__trigger content-tabs__trigger--active" type="button" role="tab" data-content-tabs-trigger aria-controls="tab-desc" aria-selected="true">Descrizione</button>
                <button class="content-tabs__trigger" type="button" role="tab" data-content-tabs-trigger aria-controls="tab-tech" aria-selected="false" tabindex="-1">Info tecniche</button>
            </div>
            <div id="tab-desc" class="content-tabs__panel" role="tabpanel" data-content-tabs-panel>
                <p>La brossura fresata e una tecnica di rilegatura economica e resistente.</p>
            </div>
            <div id="tab-tech" class="content-tabs__panel" role="tabpanel" data-content-tabs-panel hidden>
                <ul><li>Formato da CMS</li><li>Carta e grammatura da catalogo</li></ul>
            </div>
        </div>
    `;
    setTimeout(() => window.SkillpressUI.ContentTabs.init(root.querySelector('[data-content-tabs]')));
    return root;
};

export default { title: 'Components/ContentTabs', tags: ['autodocs'] };

export const Default = {
    render,
    play: async ({ canvas, userEvent }) => {
        const tech = canvas.getByRole('tab', { name: /info tecniche/i });
        await userEvent.click(tech);
        await expect(tech).toHaveAttribute('aria-selected', 'true');
    }
};
