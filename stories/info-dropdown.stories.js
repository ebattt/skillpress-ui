import { expect } from 'storybook/test';

const initInfoDropdown = (root) => {
    if (window.SkillpressUI && window.SkillpressUI.InfoDropdown) {
        window.SkillpressUI.InfoDropdown.init(root);
    }
};

const renderField = ({
    label,
    id,
    body,
    open = false
}) => `
    <div class="sp-form-field" style="max-width: 480px;">
        <div class="sp-label-row">
            <label class="sp-label-text">${label}</label>
            <button type="button"
                    class="sp-info-btn"
                    data-info-dropdown-info-trigger
                    aria-controls="${id}"
                    aria-expanded="${open ? 'true' : 'false'}"
                    aria-label="Mostra informazioni"></button>
        </div>
        <div id="${id}" class="sp-info-dropdown${open ? '' : ' sp-info-dropdown--hidden'}"
             data-info-dropdown
             role="region" aria-hidden="${open ? 'false' : 'true'}">
            ${body}
        </div>
    </div>
`;

const mount = (html) => {
    const root = document.createElement('div');
    root.innerHTML = html;
    initInfoDropdown(root);
    return root;
};

export default {
    title: 'Primitives/InfoDropdown',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Disclosure inline per pannelli di aiuto contestuale. Il backend scrive solo il body; titolo, header e close button vengono auto-iniettati dalla libreria al primo init usando il textContent della .sp-label-text adiacente.'
            }
        }
    }
};

export const Default = {
    render: () => mount(renderField({
        label: 'Formato (mm)',
        id: 'sp-info-formato',
        body: `
            <p>Il <strong>formato</strong> indica le dimensioni del prodotto finito a libro chiuso, espresse in <strong>Base x Altezza</strong>.</p>
        `
    })),
    play: async ({ canvas, userEvent }) => {
        const trigger = canvas.getByRole('button', { name: /Mostra informazioni/ });
        if (window.SkillpressUI && window.SkillpressUI.InfoDropdown) {
            window.SkillpressUI.InfoDropdown.init(document);
        }
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        trigger.click();
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
        const close = canvas.getByRole('button', { name: /Chiudi/ });
        await expect(close).toHaveClass('sp-info-dropdown__close');
        await expect(canvas.getAllByText('Formato (mm)')[1]).toHaveClass('sp-info-dropdown__title');
        close.click();
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    }
};

export const OpenInitially = {
    render: () => mount(renderField({
        label: 'Carta',
        id: 'sp-info-carta',
        open: true,
        body: `
            <p>La <strong>carta</strong> influenza resa visiva, peso e percezione tattile del prodotto.</p>
        `
    }))
};

export const WithListAndNote = {
    render: () => mount(renderField({
        label: 'Formato (mm)',
        id: 'sp-info-formato-full',
        open: true,
        body: `
            <p>Il <strong>formato</strong> indica le dimensioni del prodotto finito a libro chiuso, espresse in <strong>Base x Altezza</strong>.</p>
            <p><strong>Formati standard disponibili:</strong></p>
            <ul>
                <li><strong>A4</strong> (210x297mm) -- Cataloghi, manuali, riviste</li>
                <li><strong>A5</strong> (148x210mm) -- Libri tascabili, brochure</li>
                <li><strong>Libro</strong> (165x235mm) -- Editoriale classico</li>
            </ul>
            <div class="sp-info-note">
                <p class="sp-info-note__title">Nota sulle tolleranze (Art. 9.7)</p>
                <p>Per motivi di stampa, rilegatura e rifiniture, ci riserviamo di ridurre il formato del lavoro fino al 99% se necessario. Questo fattore e' da accettare e non soggetto a reclamo.</p>
            </div>
        `
    })),
    play: async ({ canvas, userEvent }) => {
        const trigger = canvas.getByRole('button', { name: /Mostra informazioni/ });
        if (window.SkillpressUI && window.SkillpressUI.InfoDropdown) {
            window.SkillpressUI.InfoDropdown.init(document);
        }
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
        // chiudi e riapri
        trigger.click();
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');
        trigger.click();
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    }
};

export const MultipleDropdownsExclusive = {
    render: () => mount(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 480px;">
            ${renderField({
                label: 'Formato (mm)',
                id: 'sp-multi-formato',
                body: '<p>Dimensioni del prodotto finito.</p>'
            })}
            ${renderField({
                label: 'Stampa interna',
                id: 'sp-multi-stampa',
                body: '<p>Tipologia di stampa: bianco/nero o colori.</p>'
            })}
            ${renderField({
                label: 'Rilegatura',
                id: 'sp-multi-rileg',
                body: '<p>Tecnica di assemblaggio del prodotto stampato.</p>'
            })}
        </div>
    `),
    play: async ({ canvas, userEvent, step }) => {
        const triggers = canvas.getAllByRole('button', { name: /Mostra informazioni/ });
        if (window.SkillpressUI && window.SkillpressUI.InfoDropdown) {
            window.SkillpressUI.InfoDropdown.init(document);
        }
        await step('apertura singola: aprire il secondo chiude il primo', async () => {
            triggers[0].click();
            await expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
            triggers[1].click();
            await expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
            await expect(triggers[1]).toHaveAttribute('aria-expanded', 'true');
        });
    }
};

export const ReferenceFromElementsUI = {
    render: () => mount(renderField({
        label: 'Facciate',
        id: 'sp-ref-facciate',
        body: `
            <p>Il <strong>numero di facciate</strong> determina la quantita' di pagine stampate (incluse le 4 di copertina).</p>
            <p>Esempio: 32 facciate = 16 fogli stampati fronte/retro.</p>
        `
    })),
    parameters: {
        docs: {
            description: {
                story: 'Pattern verbatim dal catalogo `elements-ui/js/buttons/button-info.js` (Button Info). icone `info` e `close` disegnate dalla libreria via CSS. Onclick inline sostituito con `aria-controls` + delegated handler della libreria.'
            }
        }
    }
};
