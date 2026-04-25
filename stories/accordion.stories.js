const initAccordion = (root) => {
    window.requestAnimationFrame(() => {
        const accordions = root.querySelectorAll('[data-accordion]');

        accordions.forEach((accordion) => {
            window.SkillpressUI.Accordion.init(accordion);
        });
    });
};

const createContent = (label = 'Contenuto della sezione') => `
    <p>${label}</p>
`;

const createSection = ({
    number = '1',
    title,
    expanded = false,
    withBadge = true,
    content = createContent()
}) => `
    <section class="accordion__section${expanded ? ' expanded' : ''}" data-accordion-section>
        <button class="accordion__header" type="button" data-accordion-trigger aria-expanded="${expanded ? 'true' : 'false'}">
            <span class="accordion__header-left">
                ${withBadge ? `<span class="accordion__badge">${number}</span>` : ''}
                <span class="accordion__title">${title}</span>
            </span>
            <span class="accordion__icon" aria-hidden="true"></span>
        </button>
        <div class="accordion__content">
            <div class="accordion__inner">
                ${content}
            </div>
        </div>
    </section>
`;

const renderAccordion = (sections) => {
    const root = document.createElement('div');

    root.innerHTML = `
        <div style="max-width: 760px;">
            <div class="accordion" data-accordion>
                ${sections.join('')}
            </div>
        </div>
    `;

    initAccordion(root);

    return root;
};

export default {
    title: 'Primitives/Accordion',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Accordion Section minimale della libreria. Il backend controlla contenuto, sezioni visibili e stato iniziale; la libreria controlla markup, CSS, aria e toggle locale.'
            }
        }
    }
};

export const Collapsed = {
    render: () => renderAccordion([
        createSection({
            title: 'Accordion Section',
            content: createContent('Slot content popolato dal consumer.')
        })
    ])
};

export const Expanded = {
    render: () => renderAccordion([
        createSection({
            title: 'Accordion Section',
            expanded: true,
            content: createContent('Questa sezione parte aperta tramite classe expanded e aria-expanded true.')
        })
    ])
};

export const MultipleSections = {
    render: () => renderAccordion([
        createSection({
            number: '1',
            title: 'Formato',
            expanded: true,
            content: createContent('Prima sezione aperta.')
        }),
        createSection({
            number: '2',
            title: 'Carta',
            content: createContent('Seconda sezione chiusa.')
        }),
        createSection({
            number: '3',
            title: 'Riepilogo',
            content: createContent('Terza sezione chiusa.')
        })
    ])
};

export const WithoutBadge = {
    render: () => renderAccordion([
        createSection({
            title: 'Accordion senza badge',
            withBadge: false,
            content: createContent('Il badge numerato e opzionale; il layout header resta valido.')
        })
    ])
};

export const PopulatedContentSlot = {
    render: () => renderAccordion([
        createSection({
            number: '1',
            title: 'Contenuto strutturato',
            expanded: true,
            content: `
                <p>Lo slot interno puo contenere markup del consumer, purche resti dentro <code>.accordion__inner</code>.</p>
                <ul>
                    <li>Testo descrittivo</li>
                    <li>Liste semplici</li>
                    <li>Blocchi futuri della libreria</li>
                </ul>
            `
        })
    ])
};
