import '../../bundles/blog.css';
import { expect } from 'storybook/test';

const topics = [
    { label: 'Tutti', href: '#tutti', active: true },
    { label: 'Come si fa', href: '#come-si-fa' },
    { label: 'Materiali', href: '#materiali' },
    { label: 'Finiture', href: '#finiture' },
    { label: 'Produzione', href: '#produzione' }
];

const manyTopics = [
    'Tutti',
    'Guide stampa',
    'Cataloghi',
    'Brochure',
    'Packaging',
    'Rilegature',
    'Carta',
    'Finiture',
    'Prestampa',
    'PDF',
    'Ordini ricorrenti',
    'Marketing'
].map((label, index) => ({
    label,
    href: `#topic-${index}`,
    active: index === 3
}));

const renderTopicNav = (items = topics) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <nav class="topic-nav" aria-label="Categorie blog" data-topic-nav>
            <ul class="topic-nav__list">
                ${items.map((item) => `
                    <li>
                        <a class="topic-nav__link${item.active ? ' topic-nav__link--active' : ''}" href="${item.href}"${item.active ? ' aria-current="true"' : ''}>${item.label}</a>
                    </li>
                `).join('')}
            </ul>
        </nav>
    `;
    return root;
};

export default {
    title: 'Blog Page/TopicNav',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Navigazione categorie blog con markup copiabile dal backend e hook data-topic-nav opzionale.'
            }
        }
    }
};

export const Default = {
    render: () => renderTopicNav(topics.map((item) => ({ ...item, active: false }))),
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('navigation', { name: 'Categorie blog' })).toBeInTheDocument();
    }
};

export const Active = {
    render: () => renderTopicNav()
};

export const ManyCategories = {
    render: () => renderTopicNav(manyTopics)
};

export const LongLabel = {
    render: () => renderTopicNav([
        { label: 'Tutti', href: '#tutti' },
        {
            label: 'Guide operative per stampati aziendali complessi',
            href: '#guide-operative',
            active: true
        },
        { label: 'Checklist', href: '#checklist' }
    ])
};

export const MobileOverflowSafe = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    },
    render: () => {
        const root = document.createElement('div');
        root.style.maxWidth = '320px';
        root.style.overflow = 'hidden';
        root.innerHTML = renderTopicNav([
            { label: 'Tutti', href: '#tutti' },
            { label: 'Formato catalogo punto metallico', href: '#catalogo', active: true },
            { label: 'Prestampa', href: '#prestampa' },
            { label: 'Rilegature speciali', href: '#rilegature' },
            { label: 'Materiali certificati', href: '#materiali' }
        ]).innerHTML;
        return root;
    }
};
