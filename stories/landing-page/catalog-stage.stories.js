import '../../components/catalog-stage.css';
import '../../components/feedaty-widget.css';
import '../../js/catalog-stage.js';
import { expect } from 'storybook/test';

const IMAGES = [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80'
];

const renderStage = ({
    title = 'Stampa la tua idea, con qualita professionale',
    text = 'Dal file alla consegna: carta certificata, colori fedeli e finiture curate in ogni dettaglio.',
    cta = 'Vedi prodotti',
    href = '#prodotti',
    withReviews = true
} = {}) => `
    <section class="catalog-intro">
        <div class="catalog-stage catalog-stage--image-only" id="categorie" data-catalog-stage data-catalog-stage-interval="4500">
            <div class="catalog-stage__image-box">
                ${IMAGES.map((src, index) => `
                <div class="catalog-stage__slide${index === 0 ? ' catalog-stage__slide--active' : ''}" data-catalog-stage-slide${index > 0 ? ' aria-hidden="true"' : ''}>
                    <img src="${src}" alt="Stampa Skillpress ${index + 1}" decoding="async"${index === 0 ? ' fetchpriority="high"' : ' loading="lazy"'}>
                </div>`).join('')}
                <div class="catalog-stage__overlay">
                    <h1 class="catalog-stage__overlay-title">${title}</h1>
                    <p class="catalog-stage__overlay-text">${text}</p>
                </div>
                <a class="catalog-stage__image-button" href="${href}">${cta}</a>
                <div class="catalog-stage__dots" aria-label="Immagini intro">
                    ${IMAGES.map((src, index) => `
                    <button class="catalog-stage__dot${index === 0 ? ' catalog-stage__dot--active' : ''}" type="button" data-catalog-stage-dot aria-label="Mostra immagine ${index + 1}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('')}
                </div>
            </div>
            ${withReviews ? `
            <div class="catalog-stage__reviews-inline feedaty-widget feedaty-widget--inline" data-catalog-stage-reviews data-feedaty-widget data-feedaty-widget-sdk="false">
                <div class="feedaty_widget" data-ver="2021" data-id="69d773285807d" data-type="merchant" data-variant="Striscia-2" data-lang="all" data-gui="all">
                    <div class="feedaty-widget__placeholder">Feedaty merchant strip</div>
                </div>
            </div>` : ''}
        </div>
    </section>
`;

const renderRoot = (html) => {
    const root = document.createElement('div');
    root.innerHTML = html;
    requestAnimationFrame(() => window.SkillpressUI.CatalogStage.init(root));
    return root;
};

export default {
    title: 'Landing Page/Catalog/CatalogStage',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Stage fotografico landing con slider immagini, overlay titolo/testo, CTA e slot recensioni componibile con FeedatyWidget.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(renderStage()),
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('.catalog-stage')).not.toBeNull();
        await expect(canvasElement.querySelector('.catalog-stage__image-button')).not.toBeNull();
        await expect(canvasElement.querySelectorAll('[data-catalog-stage-slide]').length).toBe(3);
    }
};

export const ReferenceFromLandingPage = {
    render: () => renderRoot(renderStage()),
    parameters: {
        docs: {
            description: {
                story: 'Riferimento da `landing-page/index.html#L19-L34` e `_showcase.css#L12-L137`. Lo slot reviews compone `FeedatyWidget`; in Storybook lo SDK e disabilitato.'
            }
        }
    }
};

export const WithoutReviewsSlot = {
    render: () => renderRoot(renderStage({ withReviews: false })),
    parameters: {
        docs: {
            description: {
                story: 'Lo slot `.catalog-stage__reviews-inline` e opzionale: il backend/app puo ometterlo quando non carica widget recensioni.'
            }
        }
    }
};
