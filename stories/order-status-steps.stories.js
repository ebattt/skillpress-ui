import '../components/order-status-steps.css';
import '../js/order-status-steps.js';
import { expect, within } from 'storybook/test';

const renderSteps = ({ rejected = false } = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="product-stepper" data-order-status-steps>
            <button class="product-stepper__step product-stepper__step--completed product-stepper__step--selected"
                    type="button"
                    aria-pressed="true"
                    data-order-status-steps-item
                    data-step-id="files">
                <span class="product-stepper__circle">
                    <span class="product-stepper__icon product-stepper__icon--check" aria-hidden="true"></span>
                </span>
                <span class="product-stepper__label">File</span>
            </button>
            <span class="product-stepper__connector product-stepper__connector--completed" aria-hidden="true"></span>
            <button class="product-stepper__step ${rejected ? 'product-stepper__step--rejected' : 'product-stepper__step--active'}"
                    type="button"
                    aria-pressed="false"
                    data-order-status-steps-item
                    data-step-id="check">
                <span class="product-stepper__circle"><span class="product-stepper__num">2</span></span>
                <span class="product-stepper__label">Controllo</span>
            </button>
            <span class="product-stepper__connector" aria-hidden="true"></span>
            <button class="product-stepper__step product-stepper__step--pending"
                    type="button"
                    aria-pressed="false"
                    data-order-status-steps-item
                    data-step-id="production">
                <span class="product-stepper__circle"><span class="product-stepper__num">3</span></span>
                <span class="product-stepper__label">Produzione</span>
            </button>
            <span class="product-stepper__connector" aria-hidden="true"></span>
            <button class="product-stepper__step product-stepper__step--pending"
                    type="button"
                    aria-pressed="false"
                    data-order-status-steps-item
                    data-step-id="shipping">
                <span class="product-stepper__circle"><span class="product-stepper__num">4</span></span>
                <span class="product-stepper__label">Spedizione</span>
            </button>
        </div>
    `;
    return root;
};

export default {
    title: 'Components/OrderStatusSteps',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard order detail product status stepper. Business state and panels remain application-owned.'
            }
        }
    }
};

export const Default = {
    render: () => renderSteps(),
    play: async ({ canvasElement }) => {
        window.SkillpressUI.OrderStatusSteps.init(canvasElement);
        const canvas = within(canvasElement);
        const production = canvas.getByRole('button', { name: /Produzione/ });
        production.click();
        await expect(production).toHaveAttribute('aria-pressed', 'true');
        await expect(production).toHaveClass('product-stepper__step--selected');
    }
};

export const Rejected = {
    render: () => renderSteps({ rejected: true })
};

export const ReferenceFromDashboardPage = {
    render: () => renderSteps(),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/js/order-products.js#renderTabButtons`. Generic state classes and Material Symbols are replaced by BEM modifiers and CSS icons.'
            }
        }
    }
};
