import '../components/catalog-stage.css';
import '../js/catalog-stage.js';
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
                    <img src="${src}" alt="Stampa Skillpress ${index + 1}">
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
            <div class="catalog-stage__reviews-inline" data-catalog-stage-reviews>
                <div class="feedaty_widget" data-ver="2021" data-id="69d773285807d" data-type="merchant" data-variant="Striscia-2" data-lang="all" data-gui="all"></div>
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
    title: 'Components/CatalogStage',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Stage fotografico landing con slider immagini, overlay titolo/testo, CTA e slot recensioni app-owned.'
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
                story: 'Riferimento da `landing-page/index.html#L19-L34` e `_showcase.css#L12-L137`. Lo script Feedaty e gli asset demo locali restano app-owned.'
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
