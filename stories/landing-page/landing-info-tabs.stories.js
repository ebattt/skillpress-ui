import '../../components/text-block.css';
import '../../components/landing-info-tabs.css';
import '../../js/landing-info-tabs.js';
import { expect, userEvent } from 'storybook/test';

const renderLandingInfoTabs = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <section class="text-block landing-info-tabs" id="chi-siamo" aria-labelledby="landing-text-title" data-landing-info-tabs>
            <div class="landing-info-tabs__nav-wrap">
                <div class="landing-info-tabs__nav" role="tablist" aria-label="Informazioni Skillpress">
                    <button class="landing-info-tabs__tab landing-info-tabs__tab--active" type="button" id="landing-tab-presentazione" role="tab" aria-selected="true" aria-controls="landing-panel-presentazione" data-landing-info-tabs-tab>Presentazione</button>
                    <button class="landing-info-tabs__tab" type="button" id="landing-tab-vision" role="tab" aria-selected="false" aria-controls="landing-panel-vision" tabindex="-1" data-landing-info-tabs-tab>Vision</button>
                    <button class="landing-info-tabs__tab" type="button" id="landing-tab-mission" role="tab" aria-selected="false" aria-controls="landing-panel-mission" tabindex="-1" data-landing-info-tabs-tab>Mission</button>
                    <button class="landing-info-tabs__tab" type="button" id="landing-tab-servizi" role="tab" aria-selected="false" aria-controls="landing-panel-servizi" tabindex="-1" data-landing-info-tabs-tab>Servizi</button>
                    <button class="landing-info-tabs__tab" type="button" id="landing-tab-consegna" role="tab" aria-selected="false" aria-controls="landing-panel-consegna" tabindex="-1" data-landing-info-tabs-tab>Consegna</button>
                    <button class="landing-info-tabs__tab" type="button" id="landing-tab-pagamento" role="tab" aria-selected="false" aria-controls="landing-panel-pagamento" tabindex="-1" data-landing-info-tabs-tab>Pagamento</button>
                </div>
            </div>

            <div class="landing-info-tabs__content">
                <article class="landing-info-tabs__panel landing-info-tabs__panel--active" id="landing-panel-presentazione" role="tabpanel" aria-labelledby="landing-tab-presentazione" data-landing-info-tabs-panel>
                    <h2 class="text-block__title" id="landing-text-title">Tipografia online Skillpress: stampa digitale e stampe online</h2>
                    <p>Skillpress e una tipografia online specializzata nella stampa digitale. Offriamo prodotti che uniscono funzionalita, gusto estetico e personalizzazione.</p>
                    <h3 class="text-block__subtitle">Non solo stampatori online</h3>
                    <p>Il catalogo Skillpress si arricchisce ogni settimana con nuovi prodotti personalizzati.</p>
                </article>

                <article class="landing-info-tabs__panel" id="landing-panel-vision" role="tabpanel" aria-labelledby="landing-tab-vision" hidden data-landing-info-tabs-panel>
                    <h2 class="text-block__title">Vision</h2>
                    <p>Rendere la stampa professionale piu semplice, leggibile e accessibile.</p>
                </article>

                <article class="landing-info-tabs__panel" id="landing-panel-mission" role="tabpanel" aria-labelledby="landing-tab-mission" hidden data-landing-info-tabs-panel>
                    <h2 class="text-block__title">Mission</h2>
                    <p>Accompagnare ogni ordine con un processo chiaro, dal file alla produzione.</p>
                </article>

                <article class="landing-info-tabs__panel" id="landing-panel-servizi" role="tabpanel" aria-labelledby="landing-tab-servizi" hidden data-landing-info-tabs-panel>
                    <h2 class="text-block__title">Servizi</h2>
                    <p>Stampa editoriale, promozionale, packaging leggero e prodotti personalizzati.</p>
                </article>

                <article class="landing-info-tabs__panel" id="landing-panel-consegna" role="tabpanel" aria-labelledby="landing-tab-consegna" hidden data-landing-info-tabs-panel>
                    <h2 class="text-block__title">Consegna</h2>
                    <p>Tempi e modalita dipendono da prodotto, lavorazione e conferma dei file.</p>
                </article>

                <article class="landing-info-tabs__panel" id="landing-panel-pagamento" role="tabpanel" aria-labelledby="landing-tab-pagamento" hidden data-landing-info-tabs-panel>
                    <h2 class="text-block__title">Pagamento</h2>
                    <p>Riepilogo chiaro di prodotto, lavorazioni, spedizione e totale prima della conferma.</p>
                </article>
            </div>
        </section>
    `;
    window.SkillpressUI.LandingInfoTabs.init(root);
    return root;
};

export default {
    title: 'Landing Page/Text/LandingInfoTabs',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Tab navigation per dividere il blocco testo landing in pannelli CMS. Composto con `.text-block`, mantiene sizing e font del testo esistente.'
            }
        }
    }
};

export const Default = {
    render: renderLandingInfoTabs,
    play: async ({ canvas }) => {
        const tab = canvas.getByRole('tab', { name: /pagamento/i });
        await expect(canvas.getAllByRole('tab').length).toBe(6);
        await userEvent.click(tab);
        await expect(tab).toHaveAttribute('aria-selected', 'true');
        await expect(canvas.getByRole('heading', { name: 'Pagamento' })).toBeVisible();
    }
};

export const KeyboardNavigation = {
    render: renderLandingInfoTabs,
    play: async ({ canvas }) => {
        const first = canvas.getByRole('tab', { name: /presentazione/i });
        await first.focus();
        await userEvent.keyboard('{ArrowRight}');
        await expect(canvas.getByRole('tab', { name: /vision/i })).toHaveAttribute('aria-selected', 'true');
    },
    parameters: {
        docs: {
            description: {
                story: 'Supporta ArrowLeft/ArrowRight, Home ed End secondo pattern tablist.'
            }
        }
    }
};
