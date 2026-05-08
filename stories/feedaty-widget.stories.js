import '../components/feedaty-widget.css';
import '../js/feedaty-widget.js';
import { expect } from 'storybook/test';

const renderInline = () => `
    <div class="feedaty-widget feedaty-widget--inline" data-feedaty-widget data-feedaty-widget-sdk="false">
        <div class="feedaty_widget" data-ver="2021" data-id="69d773285807d" data-type="merchant" data-variant="Striscia-2" data-lang="all" data-gui="all">
            <div class="feedaty-widget__placeholder">Feedaty merchant strip</div>
        </div>
    </div>
`;

const renderCarousel = () => `
    <section class="feedaty-widget feedaty-widget--carousel" data-feedaty-widget data-feedaty-widget-sdk="false" aria-labelledby="feedaty-story-title">
        <h2 class="feedaty-widget__title" id="feedaty-story-title">Cosa dicono i nostri clienti</h2>
        <div class="feedaty_widget" data-ver="2021" data-id="69d6498b45554" data-type="carousel" data-variant="carosello-2" data-lang="all" data-gui="all">
            <div class="feedaty-widget__placeholder">Feedaty carousel widget</div>
        </div>
    </section>
`;

const renderRoot = (html) => {
    const root = document.createElement('div');
    root.style.padding = '24px 0';
    root.innerHTML = html;
    requestAnimationFrame(() => window.SkillpressUI.FeedatyWidget.init(root));
    return root;
};

export default {
    title: 'Components/FeedatyWidget',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Wrapper e loader dei widget Feedaty reali della landing. In Storybook lo SDK e disabilitato con `data-feedaty-widget-sdk="false"`.'
            }
        }
    }
};

export const MerchantInline = {
    render: () => renderRoot(renderInline()),
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('.feedaty_widget')).toHaveAttribute('data-type', 'merchant');
    }
};

export const Carousel = {
    render: () => renderRoot(renderCarousel()),
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('.feedaty_widget')).toHaveAttribute('data-type', 'carousel');
    }
};

export const ReferenceFromLandingPage = {
    render: () => renderRoot(renderInline() + renderCarousel()),
    parameters: {
        docs: {
            description: {
                story: 'Riferimento da `landing-page/index.html#L30-L32` e `#L125-L128`; sizing da `_showcase.css#L75-L98` e `_products.css#L496-L504`.'
            }
        }
    }
};
