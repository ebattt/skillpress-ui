import '../../bundles/blog.css';
import { expect } from 'storybook/test';

const renderArticleNav = ({ previous = 'Come preparare un file stampa', next = 'Carta naturale o patinata' } = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <nav class="article-nav" aria-label="Navigazione articoli">
            <ul class="article-nav__list">
                ${previous ? `
                    <li class="article-nav__item article-nav__item--prev">
                        <a class="article-nav__link article-nav__link--prev" href="#previous">${previous}</a>
                    </li>
                ` : ''}
                ${next ? `
                    <li class="article-nav__item article-nav__item--next">
                        <a class="article-nav__link article-nav__link--next" href="#next">${next}</a>
                    </li>
                ` : ''}
            </ul>
        </nav>
    `;
    return root;
};

export default {
    title: 'Blog Page/ArticleNav',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Navigazione precedente/successivo per pagine articolo. Il backend decide presenza, URL e label.'
            }
        }
    }
};

export const PreviousAndNext = {
    render: () => renderArticleNav(),
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('navigation', { name: 'Navigazione articoli' })).toBeInTheDocument();
        await expect(canvas.getAllByRole('link')).toHaveLength(2);
    }
};

export const PreviousOnly = {
    render: () => renderArticleNav({
        previous: 'Come preparare un file stampa',
        next: ''
    })
};

export const NextOnly = {
    render: () => renderArticleNav({
        previous: '',
        next: 'Carta naturale o patinata'
    })
};

export const LongLabels = {
    render: () => renderArticleNav({
        previous: 'Checklist completa per controllare un catalogo tecnico prima dell invio in prestampa',
        next: 'Come scegliere carta, rilegatura e finitura per una brochure commerciale premium'
    })
};
