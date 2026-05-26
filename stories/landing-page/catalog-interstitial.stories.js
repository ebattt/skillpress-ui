import '../../components/catalog-interstitial.css';
import '../../js/catalog-interstitial.js';
import { expect } from 'storybook/test';

const PHOTO = 'https://placehold.co/900x520/dfe3e8/111418?text=Stampa';
const WIDE = 'https://placehold.co/1280x420/003e51/ffffff?text=Skillpress';
const FEATURE = 'https://placehold.co/520x360/f3f4f6/111418?text=Feature';

const renderRoot = (html) => {
    const root = document.createElement('div');
    root.style.padding = '24px 0';
    root.innerHTML = html;
    requestAnimationFrame(() => window.SkillpressUI.CatalogInterstitial.init(root));
    return root;
};

const splitMarkup = `
    <section class="catalog-interstitial" data-catalog-interstitial aria-label="Approfondimento catalogo">
        <div class="catalog-interstitial__card catalog-interstitial__card--photo" data-catalog-interstitial-card data-catalog-interstitial-link="#prodotti" data-catalog-interstitial-link-label="Vai alla sezione prodotti">
            <img src="${PHOTO}" alt="Stampa di qualita" loading="lazy" decoding="async">
            <span class="catalog-interstitial__label">Scopri le nostre rilegature</span>
        </div>
        <div class="catalog-interstitial__card catalog-interstitial__card--text" data-catalog-interstitial-card data-catalog-interstitial-link="#" data-catalog-interstitial-link-label="Apri la pagina prodotto Skillpress">
            <h3 class="catalog-interstitial__heading">Qualita professionale,<br>prezzi accessibili</h3>
            <p class="catalog-interstitial__text">Carta certificata, colori fedeli e finiture curate in ogni dettaglio. Dal file alla consegna.</p>
        </div>
    </section>
`;

const wideMarkup = `
    <section class="catalog-interstitial catalog-interstitial--full" data-catalog-interstitial aria-label="Stampa personalizzata">
        <div class="catalog-interstitial__card catalog-interstitial__card--wide" data-catalog-interstitial-card data-catalog-interstitial-link="#" data-catalog-interstitial-link-label="Apri la pagina prodotto Skillpress">
            <img src="${WIDE}" alt="Quaderno Skillpress" loading="lazy" decoding="async">
            <div class="catalog-interstitial__overlay-content">
                <h3 class="catalog-interstitial__heading catalog-interstitial__heading--light">Stampa che racconta<br>la tua identita</h3>
                <p class="catalog-interstitial__text catalog-interstitial__text--light">Ogni prodotto e personalizzabile al 100%. Il tuo brand, i tuoi colori, la tua storia.</p>
            </div>
        </div>
    </section>
`;

const trioMarkup = `
    <section class="catalog-interstitial catalog-interstitial--trio" data-catalog-interstitial aria-label="Categorie in evidenza">
        <div class="catalog-interstitial__card catalog-interstitial__card--feature" data-catalog-interstitial-card data-catalog-interstitial-link="#" data-catalog-interstitial-link-label="Apri la pagina prodotto Finiture speciali">
            <img src="${FEATURE}" alt="Punto metallico" loading="lazy" decoding="async">
            <div class="catalog-interstitial__overlay-content">
                <span class="catalog-interstitial__label">Finiture speciali</span>
            </div>
        </div>
        <div class="catalog-interstitial__card catalog-interstitial__card--feature" data-catalog-interstitial-card data-catalog-interstitial-link="#" data-catalog-interstitial-link-label="Apri la pagina prodotto Copertina rigida">
            <img class="catalog-interstitial__image--contained" src="${FEATURE}" alt="Cartonato" loading="lazy" decoding="async">
            <div class="catalog-interstitial__overlay-content">
                <span class="catalog-interstitial__label">Copertina rigida</span>
            </div>
        </div>
        <div class="catalog-interstitial__card catalog-interstitial__card--feature" data-catalog-interstitial-card data-catalog-interstitial-link="#" data-catalog-interstitial-link-label="Apri la pagina prodotto Prodotti creativi">
            <img class="catalog-interstitial__image--contained" src="${FEATURE}" alt="Carte da gioco" loading="lazy" decoding="async">
            <div class="catalog-interstitial__overlay-content">
                <span class="catalog-interstitial__label">Prodotti creativi</span>
            </div>
        </div>
    </section>
`;

export default {
    title: 'Landing Page/Catalog/CatalogInterstitial',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Interstitial editoriali della landing catalogo: split, wide e trio. CSS + JS UI puro per overlay link accessibile; contenuti e routing restano backend/CMS.'
            }
        }
    }
};

export const Default = {
    render: () => renderRoot(splitMarkup),
    play: async ({ canvasElement }) => {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await expect(canvasElement.querySelectorAll('.catalog-overlay-link').length).toBe(2);
    }
};

export const Wide = {
    render: () => renderRoot(wideMarkup)
};

export const Trio = {
    render: () => renderRoot(trioMarkup)
};

export const ReferenceFromLandingPage = {
    render: () => renderRoot(splitMarkup + wideMarkup + trioMarkup),
    parameters: {
        docs: {
            description: {
                story: 'Riferimento da `landing-page/index.html#L52-L61`, `#L74-L83`, `#L95-L114`, CSS `_products.css#L260-L425` e overlay link `landing.js#L257-L291`.'
            }
        }
    }
};
