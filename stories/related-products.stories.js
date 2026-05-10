import '../components/related-products.css';
import { expect } from 'storybook/test';

const PLACEHOLDER = 'https://placehold.co/200x200/f7f7f8/9ca3af?text=Prodotto';

const renderRoot = (innerHTML) => {
    const root = document.createElement('div');
    root.style.padding = '1rem 0';
    root.innerHTML = innerHTML;
    return root;
};

const renderCard = ({ href = '#', title = 'Prodotto', src = PLACEHOLDER, alt = 'Prodotto' } = {}) => `
    <a href="${href}" class="catalog-card catalog-card--product-equal">
        <h3 class="catalog-card__title">${title}</h3>
        <div class="catalog-card__image-wrap">
            <img class="catalog-card__image catalog-card__image--product" src="${src}" alt="${alt}" loading="lazy">
        </div>
    </a>
`;

const renderSection = ({ label = 'Potrebbe piacerti anche', items = [] } = {}) => `
    <section class="related-products" aria-label="Prodotti correlati">
        <h2 class="sp-catalog-grid__section-label">${label}</h2>
        <div class="sp-catalog-grid sp-catalog-grid--products">
            ${items.map(renderCard).join('')}
        </div>
    </section>
`;

const FIVE_PRODUCTS = [
    { href: '/products/carte-da-gioco', title: 'Carte da gioco', alt: 'Carte da gioco' },
    { href: '/products/riviste-magazine', title: 'Riviste e magazine', alt: 'Riviste' },
    { href: '/products/block-notes', title: 'Block notes', alt: 'Block notes' },
    { href: '/products/cartonato', title: 'Cartonato', alt: 'Cartonato' },
    { href: '/products/punto-metallico', title: 'Punto metallico', alt: 'Punto metallico' }
];

const THREE_PRODUCTS = FIVE_PRODUCTS.slice(0, 3);

export default {
    title: 'Components/RelatedProducts',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Sezione "Potrebbe piacerti anche": griglia responsive 5/3/2 colonne di card prodotto correlato (anchor click-anywhere con titolo + immagine). CSS-only, niente JS libreria. Hover: immagine scale 1.05.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(renderSection({ items: FIVE_PRODUCTS })),
    play: async ({ canvasElement }) => {
        const cards = canvasElement.querySelectorAll('.catalog-card');
        await expect(cards.length).toBe(5);
    },
    parameters: {
        docs: {
            description: {
                story: 'Snapshot 5 prodotti correlati (desktop ≥1024px → 5 colonne).'
            }
        }
    }
};

export const ReferenceFromElementsUI = {
    render: () => renderRoot(renderSection({ items: FIVE_PRODUCTS })),
    parameters: {
        docs: {
            description: {
                story: 'Markup verbatim da `product-page-integration/index.html#L590-L624` + qualificazioni `.related-products` da `_layout-patterns.css#L1804-L1825`. Asset placeholder al posto delle immagini demo locali.'
            }
        }
    }
};

export const ThreeProducts = {
    render: () => renderRoot(renderSection({ items: THREE_PRODUCTS })),
    parameters: {
        docs: {
            description: {
                story: 'Sezione con 3 prodotti correlati. La grid riempie le prime 3 celle dello slot a 5 colonne e lascia vuote le restanti.'
            }
        }
    }
};

export const Tablet = {
    render: () => renderRoot(renderSection({ items: FIVE_PRODUCTS })),
    parameters: {
        viewport: { defaultViewport: 'tablet' },
        docs: {
            description: {
                story: 'Viewport tablet (<1024px): 3 colonne. Le ultime 2 card vanno a capo.'
            }
        }
    }
};

export const Mobile = {
    render: () => renderRoot(renderSection({ items: FIVE_PRODUCTS })),
    parameters: {
        viewport: { defaultViewport: 'mobile1' },
        docs: {
            description: {
                story: 'Viewport mobile (<640px): 2 colonne, gap 0.75rem, immagine `width: min(100%, 150px)`.'
            }
        }
    }
};

export const CustomLabel = {
    render: () => renderRoot(renderSection({ label: 'Altri prodotti', items: FIVE_PRODUCTS })),
    parameters: {
        docs: {
            description: {
                story: 'Label sezione personalizzata (`<h2 class="sp-catalog-grid__section-label">`). Il CMS puo\' iniettare qualunque testo.'
            }
        }
    }
};
