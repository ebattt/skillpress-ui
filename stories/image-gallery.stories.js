import '../components/image-gallery.css';
import { expect } from 'storybook/test';

const imageFront = new URL('../../Skillpress-frontend/product-page-integration/assets/brossura_fresata/brossurafresata2.png', import.meta.url).href;
const imageSide = new URL('../../Skillpress-frontend/product-page-integration/assets/brossura_fresata/brossurafresata3.png', import.meta.url).href;
const imageDetail = new URL('../../Skillpress-frontend/product-page-integration/assets/brossura_fresata/brossuraFresata4.png', import.meta.url).href;

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

const renderGallery = ({ src = imageFront, alt = 'Brossura fresata vista frontale', withNav = true, withShadow = true } = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="image-gallery">
            <div class="image-gallery__container ${withShadow ? 'product-shadow' : ''}"
                 data-image-gallery-images='${JSON.stringify([
                     { src: imageFront, alt: 'Brossura fresata vista frontale' },
                     { src: imageSide, alt: 'Brossura fresata vista laterale' },
                     { src: imageDetail, alt: 'Brossura fresata dettaglio' }
                 ])}'>
                <img src="${src}" alt="${alt}" />
                ${withNav ? `
                <button class="image-gallery__nav-btn image-gallery__nav-btn--prev" aria-label="Immagine precedente">${chevronLeft}</button>
                <button class="image-gallery__nav-btn image-gallery__nav-btn--next" aria-label="Immagine successiva">${chevronRight}</button>
                ` : ''}
            </div>
        </div>
    `;
    return root;
};

export default {
    title: 'Product Page/Hero/ImageGallery',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Galleria immagine prodotto: container quadrato con immagine principale e bottoni nav prev/next. Behavior galleria fuori scope. Il CMS popola data-image-gallery-images, la pagina demo gestisce il cambio.'
            }
        }
    }
};

export const Default = {
    render: () => renderGallery(),
    play: async ({ canvas }) => {
        const prev = canvas.getByRole('button', { name: /precedente/i });
        const next = canvas.getByRole('button', { name: /success/i });
        await expect(prev).toHaveClass('image-gallery__nav-btn--prev');
        await expect(next).toHaveClass('image-gallery__nav-btn--next');
    }
};

export const ContractReference = {
    render: () => renderGallery({ src: imageFront, alt: 'Brossura fresata vista frontale' }),
    parameters: {
        docs: {
            description: {
                story: 'Markup contract di riferimento.'
            }
        }
    }
};

export const WithoutShadow = {
    render: () => renderGallery({ withShadow: false }),
    parameters: {
        docs: {
            description: {
                story: 'Container senza modifier .product-shadow.'
            }
        }
    }
};

export const WithoutNav = {
    render: () => renderGallery({ withNav: false }),
    parameters: {
        docs: {
            description: {
                story: 'Solo immagine, nessun bottone nav. Variante per CMS con singola immagine.'
            }
        }
    }
};
