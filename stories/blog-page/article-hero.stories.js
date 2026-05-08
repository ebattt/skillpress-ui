import '../../bundles/blog.css';
import { expect } from 'storybook/test';

const heroImage = () => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680">
            <rect width="1200" height="680" fill="#f3f4f6"/>
            <rect x="120" y="120" width="460" height="440" rx="28" fill="#ffffff"/>
            <rect x="620" y="160" width="360" height="360" rx="180" fill="#f08a00" opacity="0.18"/>
            <rect x="180" y="190" width="300" height="46" rx="23" fill="#111418"/>
            <rect x="180" y="282" width="340" height="30" rx="15" fill="#d67800" opacity="0.7"/>
            <rect x="180" y="348" width="240" height="30" rx="15" fill="#6b7280" opacity="0.45"/>
            <text x="650" y="365" font-family="Arial, sans-serif" font-size="58" font-weight="700" fill="#111418">Skillpress</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const renderHero = ({
    category = 'Come si fa',
    title = 'Rilegatura a filo refe vs brossura fresata',
    meta = '12 Settembre 2025 - 5 min lettura - Team Skillpress',
    image = heroImage()
} = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <header class="article-hero">
            <div class="article-hero__header">
                <span class="article-hero__category">${category}</span>
                <h1 class="article-hero__title">${title}</h1>
                <p class="article-hero__meta">${meta}</p>
            </div>
            ${image ? `
                <figure class="article-hero__media">
                    <img src="${image}" alt="Esempio di impaginato editoriale Skillpress">
                </figure>
            ` : ''}
        </header>
    `;
    return root;
};

export default {
    title: 'Blog Page/ArticleHero',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Header editoriale per pagine articolo con immagine opzionale e metadati gestiti dal backend.'
            }
        }
    }
};

export const WithImage = {
    render: () => renderHero(),
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(/Rilegatura/);
    }
};

export const WithoutImage = {
    render: () => renderHero({
        image: '',
        title: 'Checklist rapida prima di inviare un catalogo in stampa'
    })
};

export const LongTitle = {
    render: () => renderHero({
        title: 'Come scegliere carta, rilegatura, formato e finitura per un catalogo aziendale destinato a durare nel tempo'
    })
};

export const LongMeta = {
    render: () => renderHero({
        meta: 'Aggiornato il 22 Novembre 2025 - 8 min lettura - Redazione Skillpress - Con revisione tecnica del reparto prestampa'
    })
};
