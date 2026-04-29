import '../primitives/rating.css';
import '../components/image-gallery.css';
import '../components/feature-box.css';
import '../components/product-hero.css';
import { expect } from 'storybook/test';

const imageFront = new URL('../../Skillpress-frontend/product-page-integration/assets/brossura_fresata/brossurafresata2.png', import.meta.url).href;
const imageSide = new URL('../../Skillpress-frontend/product-page-integration/assets/brossura_fresata/brossurafresata3.png', import.meta.url).href;

const chevronLeft = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
`;

const chevronRight = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
`;

const featureIcons = {
    bolt: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
    `,
    savings: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 11c0-3 2.7-5.5 7-5.5s7 2.5 7 5.5-2.7 5.5-7 5.5S5 14 5 11Z" stroke="currentColor" stroke-width="2" />
        <path d="M8 16.5V20h3M16 16.5V20h-3M9 10h.01M15 10h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    `,
    premium: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
    `,
    tune: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h8M16 7h4M4 17h4M12 17h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <circle cx="14" cy="7" r="2" stroke="currentColor" stroke-width="2" />
        <circle cx="10" cy="17" r="2" stroke="currentColor" stroke-width="2" />
    </svg>
    `
};

const productImages = [
    { src: 'assets/brossura_fresata/brossurafresata2.png', alt: 'Brossura fresata vista frontale' },
    { src: 'assets/brossura_fresata/brossurafresata3.png', alt: 'Brossura fresata vista laterale' },
    { src: 'assets/brossura_fresata/brossuraFresata4.png', alt: 'Brossura fresata dettaglio' }
];

const productBoxes = [
    { title: 'Veloce', description: 'Stampa brossura fresata con ciclo rapido', iconBg: '#E8F5F3', iconColor: '#1C7264', iconSvg: featureIcons.bolt },
    { title: 'Economica', description: 'Miglior rapporto qualita/prezzo', iconBg: '#FEF3E6', iconColor: '#F08A00', iconSvg: featureIcons.savings },
    { title: 'Professionale', description: 'Finiture curate e nobilitazioni', iconBg: '#E6ECEE', iconColor: '#003E51', iconSvg: featureIcons.premium },
    { title: 'Personalizzabile', description: 'Scegli formato e carta', iconBg: '#E9F5F2', iconColor: '#298979', iconSvg: featureIcons.tune }
];

const renderStars = (percent = 97) => `
    <div class="rating">
        <div class="rating__empty">
            <span class="rating__star">&#9733;</span>
            <span class="rating__star">&#9733;</span>
            <span class="rating__star">&#9733;</span>
            <span class="rating__star">&#9733;</span>
            <span class="rating__star">&#9733;</span>
        </div>
        <div class="rating__filled" style="width: ${percent}%;">
            <span class="rating__star">&#9733;</span>
            <span class="rating__star">&#9733;</span>
            <span class="rating__star">&#9733;</span>
            <span class="rating__star">&#9733;</span>
            <span class="rating__star">&#9733;</span>
        </div>
    </div>
`;

const renderFeatureBox = ({ title, description, iconBg, iconColor, iconSvg }) => `
    <div class="feature-box">
        <div class="feature-box-content">
            <div class="feature-box-icon" style="background-color: ${iconBg}; color: ${iconColor};">
                ${iconSvg}
            </div>
            <div>
                <h3 class="feature-box-title">${title}</h3>
                <p class="feature-box-description">${description}</p>
            </div>
        </div>
    </div>
`;

const renderProductHero = ({
    imageSrc = imageFront,
    imageAlt = 'Brossura fresata vista frontale',
    rating = '4.85',
    reviewCount = '52 recensioni',
    starsPercent = 97
} = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div id="product-hero" class="product-hero">
            <div class="hero-grid">
                <div class="hero-image-gallery">
                    <div class="hero-image-container product-shadow" data-images='${JSON.stringify(productImages)}'>
                        <img id="mainProductImage" src="${imageSrc}" alt="${imageAlt}">
                        <button id="prevImageBtn" class="hero-nav-btn hero-nav-btn--prev" aria-label="Immagine precedente">
                            ${chevronLeft}
                        </button>
                        <button id="nextImageBtn" class="hero-nav-btn hero-nav-btn--next" aria-label="Immagine successiva">
                            ${chevronRight}
                        </button>
                    </div>
                </div>
                <div class="hero-info">
                    <h1 class="hero-title">Brossura fresata</h1>
                    <div class="hero-rating">
                        <span class="hero-rating-value">${rating}</span>
                        ${renderStars(starsPercent)}
                        <span class="hero-review-count">${reviewCount}</span>
                    </div>
                    <p class="hero-description">La brossura fresata e una tecnica di rilegatura economica e resistente, ideale per libri voluminosi come romanzi e manuali. Le pagine vengono fresate per una maggiore aderenza della colla e unite a una copertina personalizzabile in cartoncino, garantendo una finitura professionale ed esteticamente accattivante.</p>
                    <div class="feature-grid">
                        ${productBoxes.map(renderFeatureBox).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    return root;
};

const renderAnatomy = () => {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.gap = '2rem';
    wrap.style.padding = '1rem';

    const block = (label, contentNode) => {
        const box = document.createElement('div');
        const h = document.createElement('h3');
        h.textContent = label;
        h.style.margin = '0 0 0.75rem';
        h.style.font = '600 0.875rem / 1.2 var(--font-family-base, sans-serif)';
        h.style.color = 'var(--color-text-light)';
        h.style.textTransform = 'uppercase';
        h.style.letterSpacing = '0.05em';
        box.appendChild(h);
        box.appendChild(contentNode);
        return box;
    };

    const galleryNode = document.createElement('div');
    galleryNode.style.maxWidth = '320px';
    galleryNode.innerHTML = `
        <div class="hero-image-gallery">
            <div class="hero-image-container product-shadow">
                <img src="${imageFront}" alt="Brossura fresata vista frontale" />
                <button class="hero-nav-btn hero-nav-btn--prev" aria-label="Immagine precedente">${chevronLeft}</button>
                <button class="hero-nav-btn hero-nav-btn--next" aria-label="Immagine successiva">${chevronRight}</button>
            </div>
        </div>
    `;

    const ratingNode = document.createElement('div');
    ratingNode.innerHTML = `
        <div class="hero-rating">
            <span class="hero-rating-value">4.85</span>
            ${renderStars(97)}
            <span class="hero-review-count">52 recensioni</span>
        </div>
    `;

    const featureNode = document.createElement('div');
    featureNode.style.maxWidth = '600px';
    featureNode.innerHTML = `
        <div class="feature-grid">
            ${productBoxes.map(renderFeatureBox).join('')}
        </div>
    `;

    const composed = renderProductHero();

    wrap.appendChild(block('1. Component — ImageGallery', galleryNode));
    wrap.appendChild(block('2. Primitive — Rating (composed in .hero-rating row)', ratingNode));
    wrap.appendChild(block('3. Component — FeatureBox grid', featureNode));
    wrap.appendChild(block('4. Section — ProductHero (composes the above)', composed));

    return wrap;
};

export default {
    title: 'Sections/ProductHero',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Section di pagina: 2-column grid che compone ImageGallery (sx) + .hero-info (titolo, Rating, descrizione, FeatureBox grid). Static snapshot — behavior galleria gestito dal CMS, non dalla libreria.'
            }
        }
    }
};

export const Default = {
    render: () => renderProductHero(),
    play: async ({ canvas }) => {
        await expect(canvas.getByRole('heading', { level: 1 })).toBeInTheDocument();
    }
};

export const ReferenceFromElementsUI = {
    render: () => renderProductHero({
        imageSrc: imageFront,
        imageAlt: 'Brossura fresata vista frontale',
        rating: '4.85',
        reviewCount: '52 recensioni',
        starsPercent: 97
    })
};

export const ComposedForCMS = {
    render: () => renderProductHero({
        imageSrc: imageSide,
        imageAlt: 'Brossura fresata vista laterale',
        rating: '4.85',
        reviewCount: '52 recensioni',
        starsPercent: 97
    })
};

export const Anatomy = {
    render: () => renderAnatomy(),
    parameters: {
        docs: {
            description: {
                story: 'Decomposizione visiva: prima la galleria sola, poi Rating, poi FeatureBox grid, infine la composizione finale della Section.'
            }
        }
    }
};
