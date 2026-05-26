import '../../components/catalog-product-grid.css';
import '../../js/catalog-product-grid.js';
import { expect } from 'storybook/test';

const ASSET = 'https://placehold.co/220x180/f7f7f8/111418?text=Prodotto';

const products = [
    'Cartonato',
    'Brossura fresata',
    'Brossura fresata premium',
    'Libro copertina colorata con sovracoperta personalizzata',
    'Carte',
    'Block notes',
    'Calendario tavolo',
    'Carte da gioco',
    'Punto metallico',
    'Rivista dorso quadro',
    'Catalogo spillato',
    'Quaderno'
];

const renderCard = (title) => `
    <a class="catalog-card catalog-card--product-equal" href="#" data-catalog-product-grid-card>
        <h3 class="catalog-card__title">${title}</h3>
        <div class="catalog-card__image-wrap">
            <img class="catalog-card__image catalog-card__image--product" src="${ASSET}" alt="${title}" loading="lazy" decoding="async">
        </div>
    </a>
`;

const renderGrid = ({ label = 'Prodotti', modifier = 'sp-catalog-grid__section-label--orange', count = 12, toggle = true } = {}) => {
    const id = `catalog-grid-${Math.random().toString(36).slice(2)}`;
    return `
        <section class="catalog-product-grid" data-catalog-product-grid aria-label="${label}">
            <h2 class="sp-catalog-grid__section-label ${modifier}">${label}</h2>
            <div class="sp-catalog-grid sp-catalog-grid--products" id="${id}" data-catalog-product-grid-items data-catalog-product-grid-initial-rows="2">
                ${products.slice(0, count).map(renderCard).join('')}
            </div>
            ${toggle ? `
            <div class="catalog-products-toggle">
                <button class="catalog-products-toggle__button" type="button" data-catalog-product-grid-toggle aria-controls="${id}" aria-expanded="false">
                    Mostra altri prodotti
                </button>
            </div>` : ''}
        </section>
    `;
};

const renderRoot = (html) => {
    const root = document.createElement('div');
    root.style.padding = '24px 0';
    root.innerHTML = html;
    requestAnimationFrame(() => window.SkillpressUI.CatalogProductGrid.init(root));
    return root;
};

export default {
    title: 'Landing Page/Catalog/CatalogProductGrid',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Catalogo prodotti landing: grid responsive di card titolo+immagine con show-more opzionale. CSS + JS UI puro; dati e routing restano backend/CMS.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(renderGrid()),
    play: async ({ canvasElement }) => {
        const cards = canvasElement.querySelectorAll('.catalog-card--product-equal');
        await expect(cards.length).toBe(12);
    }
};

export const TitleVariations = {
    render: () => renderRoot(renderGrid({ count: 5, toggle: false })),
    play: async ({ canvasElement }) => {
        await new Promise((resolve) => requestAnimationFrame(resolve));

        const wraps = Array.from(canvasElement.querySelectorAll('.catalog-card__image-wrap'));
        const heights = wraps.map((wrap) => Math.round(wrap.getBoundingClientRect().height));
        await expect(new Set(heights).size).toBe(1);

        const longTitle = Array.from(canvasElement.querySelectorAll('.catalog-card__title'))
            .find((title) => title.textContent.includes('sovracoperta'));
        await expect(getComputedStyle(longTitle).overflow).toBe('hidden');
        await expect(longTitle.scrollHeight).toBeGreaterThan(longTitle.clientHeight);
    },
    parameters: {
        docs: {
            description: {
                story: 'Titoli da 1, 2 e 3+ righe per verificare slot immagine quadrato e titolo clampato a 2 righe.'
            }
        }
    }
};

export const ReferenceFromLandingPage = {
    render: () => renderRoot(renderGrid()),
    parameters: {
        docs: {
            description: {
                story: 'Riferimento da `landing-page/index.html#L38-L46`, template card `#L148-L154`, CSS `_products.css#L26-L178` e show-more `landing.js#L212-L250`.'
            }
        }
    }
};

export const Editoriale = {
    render: () => renderRoot(renderGrid({ label: 'Editoriale', modifier: 'sp-catalog-grid__section-label--teal', count: 5, toggle: false })),
    parameters: {
        docs: {
            description: {
                story: 'Sezione catalogo non espandibile: il backend omette il wrapper `.catalog-products-toggle` se non serve show-more.'
            }
        }
    }
};
