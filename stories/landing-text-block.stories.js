import '../components/landing-text-block.css';
import { expect } from 'storybook/test';

const renderTextBlock = () => `
    <section class="landing-text-block" id="chi-siamo" aria-labelledby="landing-text-story-title">
        <h2 class="landing-text-block__title" id="landing-text-story-title">Tipografia online Skillpress: stampa digitale e stampe online</h2>
        <p>Skillpress e una tipografia online specializzata nella stampa digitale. Offriamo prodotti che uniscono funzionalita, gusto estetico e personalizzazione.</p>
        <h3 class="landing-text-block__subtitle">Non solo stampatori online</h3>
        <p>Il catalogo Skillpress si arricchisce ogni settimana con nuovi prodotti personalizzati: dal Packaging alla stampa etichette, dai Bicchieri di carta ai prodotti editoriali.</p>
        <h3 class="landing-text-block__subtitle">Un numero infinito di temi</h3>
        <p>Ogni articolo si puo rivestire con un tema che ne muta aspetto e nome.</p>
    </section>
`;

export default {
    title: 'Components/LandingTextBlock',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Blocco editoriale/SEO CSS-only. La libreria possiede la tipografia; il CMS inserisce il testo HTML.'
            }
        }
    }
};

export const Default = {
    render: () => {
        const root = document.createElement('div');
        root.style.padding = '24px 0';
        root.innerHTML = renderTextBlock();
        return root;
    },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('.landing-text-block__title')).not.toBeNull();
        await expect(canvasElement.querySelectorAll('.landing-text-block__subtitle').length).toBe(2);
    }
};

export const ReferenceFromLandingPage = {
    render: () => {
        const root = document.createElement('div');
        root.innerHTML = renderTextBlock();
        return root;
    },
    parameters: {
        docs: {
            description: {
                story: 'Riferimento da `landing-page/index.html#L134-L141` e CSS `_products.css#L512-L552`.'
            }
        }
    }
};
