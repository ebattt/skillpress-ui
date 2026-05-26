import '../components/image-gallery.css';
import { expect, userEvent } from 'storybook/test';

const imageFront = new URL('../../Skillpress-frontend/consumer-libreria/assets/product-page-integration/brossura_fresata/brossurafresata2.png', import.meta.url).href;
const imageSide = new URL('../../Skillpress-frontend/consumer-libreria/assets/product-page-integration/brossura_fresata/brossurafresata3.png', import.meta.url).href;
const imageDetail = new URL('../../Skillpress-frontend/consumer-libreria/assets/product-page-integration/brossura_fresata/brossuraFresata4.png', import.meta.url).href;
const imageLandscape = new URL('../../Skillpress-frontend/consumer-libreria/assets/product-page-integration/cartonato/cartonato.png', import.meta.url).href;
const imagePortrait = new URL('../../Skillpress-frontend/consumer-libreria/assets/product-page-integration/block_notes/spirale3d.png', import.meta.url).href;

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

const defaultImages = [
    { src: imageFront, alt: 'Brossura fresata vista frontale', width: 1024, height: 1024 },
    { src: imageSide, alt: 'Brossura fresata vista laterale', width: 1024, height: 1024 },
    { src: imageDetail, alt: 'Brossura fresata dettaglio', width: 1024, height: 1024 }
];

const variableRatioImages = [
    { src: imageFront, alt: 'Brossura fresata quadrata', width: 1024, height: 1024 },
    { src: imageLandscape, alt: 'Cartonato orizzontale', width: 1536, height: 1024 },
    { src: imagePortrait, alt: 'Block notes verticale', width: 1024, height: 1536 }
];

const positiveNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : null;
};

const dimensionsFromImage = (image) => {
    if (!image) return null;

    let width = positiveNumber(image.width);
    let height = positiveNumber(image.height);

    if ((!width || !height) && image.src) {
        try {
            const url = new URL(image.src, window.location.href);
            width = width || positiveNumber(url.searchParams.get('width'));
            height = height || positiveNumber(url.searchParams.get('height'));
        } catch (err) {
            return null;
        }
    }

    return width && height ? { width, height } : null;
};

const applyImage = (container, mainImg, image) => {
    if (!image || !image.src) return;

    const dimensions = dimensionsFromImage(image);
    if (dimensions) {
        container.style.setProperty('--image-gallery-aspect-ratio', `${dimensions.width} / ${dimensions.height}`);
        mainImg.setAttribute('width', String(dimensions.width));
        mainImg.setAttribute('height', String(dimensions.height));
    } else {
        container.style.removeProperty('--image-gallery-aspect-ratio');
        mainImg.removeAttribute('width');
        mainImg.removeAttribute('height');
    }

    mainImg.src = image.src;
    mainImg.alt = image.alt || '';
};

const wireGallery = (root, images) => {
    const container = root.querySelector('.image-gallery__container');
    const mainImg = container && container.querySelector('img');
    if (!container || !mainImg) return;

    if (images.length > 0) applyImage(container, mainImg, images[0]);
    if (images.length <= 1) return;

    let idx = 0;
    const show = (nextIndex) => {
        idx = (nextIndex + images.length) % images.length;
        applyImage(container, mainImg, images[idx]);
    };

    const prev = container.querySelector('.image-gallery__nav-btn--prev');
    const next = container.querySelector('.image-gallery__nav-btn--next');
    if (prev) prev.addEventListener('click', () => show(idx - 1));
    if (next) next.addEventListener('click', () => show(idx + 1));
};

const renderGallery = ({
    images = defaultImages,
    src = images[0].src,
    alt = images[0].alt,
    withNav = true,
    withShadow = true,
    single = images.length <= 1
} = {}) => {
    const dimensions = dimensionsFromImage(images[0]);
    const imageAttrs = dimensions ? ` width="${dimensions.width}" height="${dimensions.height}"` : '';
    const ratioStyle = dimensions ? ` style="--image-gallery-aspect-ratio: ${dimensions.width} / ${dimensions.height};"` : '';
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="image-gallery${single ? ' image-gallery--single' : ''}">
            <div class="image-gallery__container ${withShadow ? 'product-shadow' : ''}"
                 ${ratioStyle}
                 data-image-gallery-images='${JSON.stringify(images)}'>
                <img src="${src}" alt="${alt}"${imageAttrs} fetchpriority="high" decoding="async" />
                ${withNav ? `
                <button class="image-gallery__nav-btn image-gallery__nav-btn--prev" aria-label="Immagine precedente">${chevronLeft}</button>
                <button class="image-gallery__nav-btn image-gallery__nav-btn--next" aria-label="Immagine successiva">${chevronRight}</button>
                ` : ''}
            </div>
        </div>
    `;
    wireGallery(root, images);
    return root;
};

export default {
    title: 'Product Page/Hero/ImageGallery',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Galleria immagine prodotto: container con ratio configurabile, immagine intera centrata e bottoni nav prev/next. Behavior galleria fuori scope. Il CMS popola data-image-gallery-images, la pagina demo gestisce il cambio.'
            }
        }
    }
};

export const Default = {
    render: () => renderGallery(),
    play: async ({ canvas }) => {
        const prev = canvas.getByRole('button', { name: /precedente/i });
        const next = canvas.getByRole('button', { name: /success/i });
        const image = canvas.getByRole('img', { name: /frontale/i });
        await expect(prev).toHaveClass('image-gallery__nav-btn--prev');
        await expect(next).toHaveClass('image-gallery__nav-btn--next');
        await userEvent.click(next);
        await expect(image.src).toContain('brossurafresata3');
    }
};

export const VariableRatios = {
    render: () => renderGallery({ images: variableRatioImages }),
    play: async ({ canvasElement }) => {
        const container = canvasElement.querySelector('.image-gallery__container');
        const next = canvasElement.querySelector('.image-gallery__nav-btn--next');
        await expect(container.style.getPropertyValue('--image-gallery-aspect-ratio')).toBe('1024 / 1024');
        await userEvent.click(next);
        await expect(container.style.getPropertyValue('--image-gallery-aspect-ratio')).toBe('1536 / 1024');
        await userEvent.click(next);
        await expect(container.style.getPropertyValue('--image-gallery-aspect-ratio')).toBe('1024 / 1536');
    },
    parameters: {
        docs: {
            description: {
                story: 'Ratio configurabile per slide: square, landscape e portrait restano intere con `object-fit: contain`; le frecce rimangono centrate sul box attivo.'
            }
        }
    }
};

export const SingleImage = {
    render: () => renderGallery({ images: defaultImages.slice(0, 1) }),
    play: async ({ canvasElement }) => {
        const prev = canvasElement.querySelector('.image-gallery__nav-btn--prev');
        const next = canvasElement.querySelector('.image-gallery__nav-btn--next');
        await expect(canvasElement.querySelector('.image-gallery')).toHaveClass('image-gallery--single');
        await expect(getComputedStyle(prev).display).toBe('none');
        await expect(getComputedStyle(next).display).toBe('none');
    },
    parameters: {
        docs: {
            description: {
                story: 'Singola immagine: il modifier `.image-gallery--single` nasconde i controlli di navigazione.'
            }
        }
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
