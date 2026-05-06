import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../components/order-payment-action-box.css';
import { expect, within } from 'storybook/test';

const renderPending = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="order-action-box" data-order-payment-action-box>
            <div class="order-action-box__icon-wrap">
                <span class="order-action-box__icon order-action-box__icon--receipt" aria-hidden="true"></span>
            </div>
            <div class="order-action-box__body">
                <p class="order-action-box__title">Contabile da caricare</p>
            </div>
            <button class="order-action-box__btn" type="button" data-action="open-receipt-modal">
                <span class="order-action-box__icon order-action-box__icon--upload" aria-hidden="true"></span>
                Carica
            </button>
        </div>
    `;
    return root;
};

const renderDone = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="order-action-box order-action-box--done" data-order-payment-action-box>
            <div class="order-action-box__icon-wrap order-action-box__icon-wrap--done">
                <span class="order-action-box__icon order-action-box__icon--schedule" aria-hidden="true"></span>
            </div>
            <div class="order-action-box__body order-action-box__body--done">
                <span class="order-action-box__done-label">Contabile in revisione, procedi a caricare i file</span>
                <span class="order-action-box__done-file" title="contabile-bonifico-ordine-110456.pdf">contabile-bonifico-ordine-110456.pdf</span>
            </div>
            <button class="order-action-box__btn order-action-box__btn--demo" type="button" data-action="demo-verify-receipt">
                <span class="order-action-box__icon order-action-box__icon--verified" aria-hidden="true"></span>
                Emula verifica
            </button>
        </div>
    `;
    return root;
};

const renderVerified = () => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="order-action-box__verified-badge">
            <span class="order-action-box__icon order-action-box__icon--check" aria-hidden="true"></span>
            <span>Pagamento verificato</span>
        </div>
        <p style="margin: 1rem 0 0;">
            <span class="order-payment-status order-payment-status--verified">
                <span class="order-action-box__icon order-action-box__icon--check" aria-hidden="true"></span>
                Verificato
            </span>
        </p>
    `;
    return root;
};

export default {
    title: 'Dashboard/Order Detail/OrderPaymentActionBox',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard payment action banner. Upload, modal and payment verification are application-owned.'
            }
        }
    }
};

export const PendingReceipt = {
    render: () => renderPending(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Contabile da caricare')).toBeInTheDocument();
        await expect(canvas.getByRole('button', { name: 'Carica' })).toBeInTheDocument();
    }
};

export const ReceiptInReview = {
    render: () => renderDone()
};

export const VerifiedBadges = {
    render: () => renderVerified()
};

export const ReferenceFromDashboardPage = {
    render: () => {
        const root = document.createElement('div');
        root.style.display = 'grid';
        root.style.gap = '1rem';
        root.innerHTML = renderPending().innerHTML + renderDone().innerHTML + renderVerified().innerHTML;
        return root;
    },
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/js/order-detail.js#renderPaymentActionBox`. Material Symbols are replaced by CSS-owned icons.'
            }
        }
    }
};
