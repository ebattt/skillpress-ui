import '../../bundles/blog.css';
import { expect } from 'storybook/test';

const image = (label, bg = '#f08a00', fg = '#111418') => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 560">
            <rect width="960" height="560" fill="${bg}"/>
            <circle cx="760" cy="140" r="92" fill="rgba(255,255,255,0.26)"/>
            <rect x="96" y="128" width="520" height="304" rx="24" fill="rgba(255,255,255,0.82)"/>
            <rect x="144" y="184" width="312" height="34" rx="17" fill="${fg}" opacity="0.86"/>
            <rect x="144" y="248" width="420" height="26" rx="13" fill="${fg}" opacity="0.42"/>
            <rect x="144" y="300" width="336" height="26" rx="13" fill="${fg}" opacity="0.3"/>
            <text x="144" y="388" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="${fg}">${label}</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const articles = [
    {
        title: 'Rilegatura a filo refe vs brossura fresata',
        category: 'Come si fa',
        excerpt: 'Differenze pratiche, costi e casi d uso per scegliere una rilegatura solida per cataloghi, manuali e pubblicazioni aziendali.',
        meta: '12 Settembre 2025',
        href: '#rilegatura',
        img: image('Rilegatura', '#f7d7a1')
    },
    {
        title: 'Come preparare un file stampa senza sorprese',
        category: 'Guide stampa',
        excerpt: 'Margini, abbondanze, profili colore e controlli finali prima di caricare il PDF.',
        meta: '4 Ottobre 2025',
        href: '#file-stampa',
        img: image('PDF', '#d9e8ff')
    },
    {
        title: 'Carta naturale, patinata o riciclata: criteri di scelta per brochure e cataloghi',
        category: 'Materiali',
        excerpt: 'Una guida rapida per confrontare mano, resa cromatica, opacita e impatto sul progetto.',
        meta: '18 Ottobre 2025',
        href: '#carta',
        img: image('Carta', '#dfe9d4')
    },
    {
        title: 'Nobilitazioni per copertine premium',
        category: 'Finiture',
        excerpt: 'Lamina, vernice selettiva e soft touch quando servono tatto, contrasto e riconoscibilita.',
        meta: '28 Ottobre 2025',
        href: '#finiture',
        img: image('Finiture', '#eadcf8')
    },
    {
        title: 'Checklist preflight per ordini ricorrenti',
        category: 'Produzione',
        excerpt: 'Un metodo sintetico per ridurre errori nei riordini e mantenere costante la qualita.',
        meta: '5 Novembre 2025',
        href: '#preflight',
        img: image('Check', '#d7f2ef')
    },
    {
        title: 'Formati chiusi e aperti spiegati al team marketing',
        category: 'Layout',
        excerpt: 'Come parlare di pieghe, dorso e dimensioni finali senza ambiguita tra grafica e produzione.',
        meta: '14 Novembre 2025',
        href: '#formati',
        img: image('Formati', '#ffe1d6')
    }
];

const renderCard = ({
    title = articles[0].title,
    category = articles[0].category,
    excerpt = articles[0].excerpt,
    meta = articles[0].meta,
    href = articles[0].href,
    img = articles[0].img,
    alt = '',
    featured = false,
    contain = false,
    action = false,
    linkedCard = false
} = {}) => {
    const mediaClass = ['article-card__media', contain ? 'article-card__media--contain' : ''].filter(Boolean).join(' ');
    const cardAttrs = linkedCard ? ` data-article-card data-card-href="${href}"` : ' data-article-card';
    const media = img
        ? `<a class="${mediaClass}" href="${href}"><img src="${img}" alt="${alt || title}"></a>`
        : `<div class="${mediaClass}" aria-hidden="true"></div>`;

    return `
        <article class="article-card${featured ? ' article-card--featured' : ''}"${cardAttrs}>
            ${media}
            <div class="article-card__body">
                <span class="article-card__category">${category}</span>
                <h3 class="article-card__title">
                    <a class="article-card__title-link" href="${href}">${title}</a>
                </h3>
                <p class="article-card__excerpt">${excerpt}</p>
                <p class="article-card__meta">${meta}</p>
                ${action ? `
                    <div class="article-card__actions">
                        <a class="button button--primary button--sm" href="${href}">Leggi di piu</a>
                    </div>
                ` : ''}
            </div>
        </article>
    `;
};

const renderInFrame = (html, maxWidth = '420px') => {
    const root = document.createElement('div');
    root.style.maxWidth = maxWidth;
    root.innerHTML = html;
    return root;
};

const renderGrid = (items) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <section class="article-grid" aria-label="Articoli del blog">
            <div class="article-grid__list">
                ${items.map((item) => renderCard(item)).join('')}
            </div>
        </section>
    `;
    return root;
};

export default {
    title: 'Blog Page/ArticleCard',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Contract HTML per ArticleCard e ArticleGrid. Le story usano contenuti statici e immagini data URI locali.'
            }
        }
    }
};

export const Default = {
    render: () => renderInFrame(renderCard()),
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('heading', { name: /Rilegatura a filo refe/ })).toBeInTheDocument();
    }
};

export const Featured = {
    render: () => renderInFrame(renderCard({
        ...articles[1],
        featured: true,
        action: true,
        excerpt: 'Una guida operativa per evitare blocchi in prestampa: abbondanze, font incorporati, profili colore, immagini e controllo delle pagine.'
    }), '980px')
};

export const MissingImage = {
    render: () => renderInFrame(renderCard({
        ...articles[2],
        img: '',
        excerpt: 'La card mantiene proporzioni e struttura anche quando il CMS non fornisce un asset immagine.'
    }))
};

export const ContainedMedia = {
    render: () => renderInFrame(renderCard({
        ...articles[3],
        contain: true,
        img: image('Logo', '#f7f7f8', '#d67800'),
        excerpt: 'Variante utile per grafiche non fotografiche, loghi, mockup piatti o immagini con trasparenza simulata.'
    }))
};

export const LongTitle = {
    render: () => renderInFrame(renderCard({
        ...articles[2],
        title: 'Carta naturale, patinata, usomano o riciclata certificata: criteri concreti per scegliere il supporto giusto senza allungare i tempi di produzione'
    }))
};

export const LongExcerpt = {
    render: () => renderInFrame(renderCard({
        ...articles[4],
        excerpt: 'Quando un articolo include una descrizione piu estesa, la card deve mantenere ritmo verticale leggibile e lasciare la meta in fondo senza comprimere titolo, categoria o azioni principali.'
    }))
};

export const LongCategory = {
    render: () => renderInFrame(renderCard({
        ...articles[5],
        category: 'Guide operative per team marketing e uffici acquisti'
    }))
};

export const ExplicitAction = {
    render: () => renderInFrame(renderCard({
        ...articles[0],
        action: true
    }))
};

export const LinkedCardHook = {
    render: () => renderInFrame(renderCard({
        ...articles[1],
        linkedCard: true,
        action: true
    })),
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('article')).toHaveAttribute('data-card-href', '#file-stampa');
    }
};

export const GridOneArticle = {
    render: () => renderGrid(articles.slice(0, 1))
};

export const GridTwoArticles = {
    render: () => renderGrid(articles.slice(0, 2))
};

export const GridSixArticles = {
    render: () => renderGrid(articles)
};

export const GridMixedTitleLengths = {
    render: () => renderGrid([
        articles[0],
        {
            ...articles[2],
            title: 'Carta naturale, patinata, riciclata e certificata per brochure aziendali a tiratura media'
        },
        {
            ...articles[5],
            title: 'Formati'
        }
    ])
};
