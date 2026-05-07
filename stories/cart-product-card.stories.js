import '../components/cart-product-card.css';
import '../js/cart-product-card.js';
import { expect, userEvent, within } from 'storybook/test';

const imageSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <rect width="240" height="240" fill="#f3f4f6"/>
  <rect x="70" y="42" width="100" height="156" rx="8" fill="#ffffff" stroke="#d1d5db" stroke-width="6"/>
  <rect x="88" y="70" width="64" height="10" rx="5" fill="#f08a00"/>
  <rect x="88" y="96" width="64" height="8" rx="4" fill="#9ca3af"/>
  <rect x="88" y="116" width="48" height="8" rx="4" fill="#d1d5db"/>
</svg>
`);

const productImage = `data:image/svg+xml,${imageSvg}`;

const renderDetails = ({
    format = 'A4 (210 x 297 mm)',
    pages = '32',
    cover = '300 gr Cartone + Plastif. lucida',
    finish = 'Opaco',
    delivery = '8 giorni lavorativi'
} = {}) => `
    <div class="cart-details-inline">
        <div class="cart-details-inline__section">
            <span class="cart-details-inline__heading">1. Generali:</span>
            <span class="cart-details-inline__label">Formato: </span><span>${format}</span>
            <span class="cart-details-inline__sep">&middot;</span>
            <span class="cart-details-inline__label">Orientamento: </span><span>Verticale</span>
            <span class="cart-details-inline__sep">&middot;</span>
            <span class="cart-details-inline__label">Pagine: </span><span>${pages}</span>
        </div>
        <div class="cart-details-inline__section">
            <span class="cart-details-inline__heading">2. Copertina:</span>
            <span class="cart-details-inline__label">Carta: </span><span>${cover}</span>
            <span class="cart-details-inline__sep">&middot;</span>
            <span class="cart-details-inline__label">Rilegatura: </span><span>${finish}</span>
        </div>
        <div class="cart-details-inline__section">
            <span class="cart-details-inline__heading">3. Consegna:</span>
            <span class="cart-details-inline__label">Tempi: </span><span>${delivery}</span>
        </div>
    </div>
`;

const renderCard = ({
    id = 'product-1',
    name = 'Libri brossura fresata',
    price = '919,99 &euro;',
    image = productImage,
    open = false,
    details = renderDetails()
} = {}) => `
    <div class="cart-product-card" data-cart-product-card>
        <div class="cart-product-card__row">
                            <div class="cart-product-card__image-wrap">
                                ${image ? `<img src="${image}" alt="${name}" class="cart-product-card__image">` : ''}
                            </div>
            <div class="cart-product-card__body">
                <div class="cart-product-card__header">
                    <div class="cart-product-card__info">
                        <h3 class="cart-product-card__title">${name}</h3>
                        <div class="cart-product-card__specs"></div>
                    </div>
                    <div class="cart-product-card__price-wrap">
                        <div class="cart-product-card__price">${price}</div>
                    </div>
                </div>
                <div class="cart-product-card__actions">
                    <button class="cart-product-card__remove-btn" type="button" data-cart-product-card-remove>Rimuovi</button>
                </div>
            </div>
        </div>
        <div class="cart-product-card__details-section">
            <button class="cart-product-card__details-toggle" type="button" aria-expanded="${open ? 'true' : 'false'}" aria-controls="${id}-details" data-cart-product-card-toggle>
                <span class="cart-product-card__details-toggle-label">Dettagli prodotto</span>
                <span class="cart-product-card__details-chevron" aria-hidden="true"></span>
            </button>
            <div id="${id}-details" class="cart-product-card__details" aria-hidden="${open ? 'false' : 'true'}" data-cart-product-card-details>
                <div class="cart-product-card__details-inner">
                    ${details}
                </div>
            </div>
        </div>
    </div>
`;

const renderList = (cards) => {
    const root = document.createElement('div');
    root.style.maxWidth = '760px';
    root.innerHTML = `<div class="cart-list">${cards}</div>`;
    window.SkillpressUI.CartProductCard.init(root);
    return root;
};

export default {
    title: 'Checkout/Cart/CartProductCard',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Checkout cart product card: image, title, price, remove action and expandable details. The library owns only the disclosure UI; cart mutations and pricing stay outside.'
            }
        }
    }
};

export const Default = {
    render: () => renderList(renderCard()),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('heading', { name: 'Libri brossura fresata' })).toBeInTheDocument();
        const toggle = canvas.getByRole('button', { name: 'Dettagli prodotto' });
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
        await userEvent.click(toggle);
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    }
};

export const ReferenceFromCheckout = {
    render: () => renderList(renderCard()),
    parameters: {
        docs: {
            description: {
                story: 'Reference from `checkout/js/sections/cart-section.js`: `.cart-product-card` markup and compact inline details. Demo `onclick` handlers are replaced with data hooks and ARIA; Material Symbols are replaced with CSS icons.'
            }
        }
    }
};

export const DetailsOpen = {
    render: () => renderList(renderCard({ open: true })),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const toggle = canvas.getByRole('button', { name: 'Dettagli prodotto' });
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await expect(canvas.getByText('1. Generali:')).toBeInTheDocument();
    }
};

export const MultipleProducts = {
    render: () => renderList(
        renderCard() +
        renderCard({
            id: 'product-2',
            name: 'Libro con copertina rigida',
            price: '1.299,99 &euro;',
            details: renderDetails({
                format: 'A5 (148 x 210 mm)',
                pages: '120',
                cover: 'Cartonata rigida',
                finish: 'Lucido',
                delivery: '10 giorni lavorativi'
            })
        })
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getAllByRole('button', { name: 'Dettagli prodotto' })).toHaveLength(2);
        await expect(canvas.getByRole('heading', { name: 'Libro con copertina rigida' })).toBeInTheDocument();
    }
};

export const MissingImage = {
    render: () => renderList(renderCard({
        name: 'Prodotto senza immagine configurata',
        image: '',
        details: renderDetails({ format: 'Personalizzato', pages: '64' })
    })),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('heading', { name: 'Prodotto senza immagine configurata' })).toBeInTheDocument();
        await expect(canvasElement.querySelector('.cart-product-card__image-wrap')).toBeInTheDocument();
    }
};
