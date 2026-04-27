const renderBreadcrumb = (items = []) => {
    const root = document.createElement('div');
    const list = items.map((item, index) => {
        const isCurrent = item.current === true;
        const itemClass = `breadcrumb__item${isCurrent ? ' breadcrumb__item--current' : ''}`;
        const inner = isCurrent
            ? `<span itemprop="name">${item.label}</span>`
            : `<a class="breadcrumb__link" itemprop="item" href="${item.href || '#'}"><span itemprop="name">${item.label}</span></a>`;
        return `
            <li class="${itemClass}" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                ${inner}
                <meta itemprop="position" content="${index + 1}"/>
            </li>
        `;
    }).join('');

    root.innerHTML = `
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
                ${list}
            </ol>
        </nav>
    `;

    return root;
};

export default {
    title: 'Primitives/Breadcrumb',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Breadcrumb statico con markup Schema.org BreadcrumbList. La libreria controlla layout, separatore e colori; il backend controlla testo, URL e voce corrente.'
            }
        }
    }
};

export const Default = {
    render: () => renderBreadcrumb([
        { label: 'Homepage', href: '/homepage' },
        { label: 'Libri Cataloghi Riviste', href: '/libri-cataloghi-riviste' },
        { label: 'Brossura fresata', current: true }
    ])
};

export const TwoLevels = {
    render: () => renderBreadcrumb([
        { label: 'Homepage', href: '/homepage' },
        { label: 'Biglietti da visita', current: true }
    ])
};

export const ReferenceFromElementsUI = {
    render: () => {
        const root = document.createElement('div');
        root.style.maxWidth = '760px';
        root.innerHTML = `
            <div style="display: grid; gap: 16px;">
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/layout-patterns/breadcrumb.js</code>: 3 livelli.
                    </p>
                    ${renderBreadcrumb([
                        { label: 'Homepage', href: '/homepage' },
                        { label: 'Libri Cataloghi Riviste', href: '/libri-cataloghi-riviste' },
                        { label: 'Brossura fresata', current: true }
                    ]).innerHTML}
                </div>
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/layout-patterns/breadcrumb.js</code>: 2 livelli.
                    </p>
                    ${renderBreadcrumb([
                        { label: 'Homepage', href: '/homepage' },
                        { label: 'Biglietti da visita', current: true }
                    ]).innerHTML}
                </div>
            </div>
        `;
        return root;
    }
};
