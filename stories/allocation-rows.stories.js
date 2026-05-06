import '../primitives/form-primitives.css';
import '../components/allocation-rows.css';
import { expect } from 'storybook/test';

const destinationInputs = () => `
    <div style="max-width: 520px;">
        <div class="allocation-rows" data-allocation-rows>
            <div class="allocation-rows__group">
                <div class="allocation-rows__row allocation-rows__row--parent">
                    <div class="allocation-rows__info">
                        <span class="allocation-rows__name">Libri brossura fresata</span>
                        <span class="allocation-rows__qty">(100)</span>
                    </div>
                </div>
                <div class="allocation-rows__children">
                    <div class="allocation-rows__row allocation-rows__row--child">
                        <div class="allocation-rows__info">
                            <span class="allocation-rows__name">Copertina A</span>
                            <span class="allocation-rows__qty">(50)</span>
                        </div>
                        <input class="form-input allocation-rows__input" type="number" min="0" max="50" value="25" aria-label="Copie Copertina A">
                    </div>
                    <div class="allocation-rows__row allocation-rows__row--child">
                        <div class="allocation-rows__info">
                            <span class="allocation-rows__name">Copertina B</span>
                            <span class="allocation-rows__qty">(50)</span>
                        </div>
                        <input class="form-input allocation-rows__input" type="number" min="0" max="50" value="25" aria-label="Copie Copertina B">
                    </div>
                </div>
            </div>
            <div class="allocation-rows__row">
                <div class="allocation-rows__info">
                    <span class="allocation-rows__name">Libro con copertina rigida</span>
                    <span class="allocation-rows__qty">(120)</span>
                </div>
                <input class="form-input allocation-rows__input" type="number" min="0" max="120" value="120" aria-label="Copie Libro con copertina rigida">
            </div>
        </div>
    </div>
`;

const allocationSummary = () => `
    <div style="max-width: 560px;">
        <div class="allocation-summary-box">
            <p class="allocation-summary-box__title">Riepilogo allocazione copie</p>
            <div class="allocation-summary-box__rows">
                <div class="allocation-rows" data-allocation-rows>
                    <div class="allocation-rows__group">
                        <div class="allocation-rows__row allocation-rows__row--parent">
                            <div class="allocation-rows__info">
                                <span class="allocation-rows__name">Libri brossura fresata</span>
                                <span class="allocation-rows__qty">(50/100)</span>
                            </div>
                            <span class="allocation-badge allocation-badge--warning">50 da assegnare</span>
                        </div>
                        <div class="allocation-rows__children">
                            <div class="allocation-rows__row allocation-rows__row--child">
                                <div class="allocation-rows__info">
                                    <span class="allocation-rows__name">Copertina A</span>
                                    <span class="allocation-rows__qty">(25/50)</span>
                                </div>
                                <span class="allocation-badge allocation-badge--warning">25 da assegnare</span>
                            </div>
                            <div class="allocation-rows__row allocation-rows__row--child">
                                <div class="allocation-rows__info">
                                    <span class="allocation-rows__name">Copertina B</span>
                                    <span class="allocation-rows__qty">(25/50)</span>
                                </div>
                                <span class="allocation-badge allocation-badge--warning">25 da assegnare</span>
                            </div>
                        </div>
                    </div>
                    <div class="allocation-rows__row">
                        <div class="allocation-rows__info">
                            <span class="allocation-rows__name">Libro con copertina rigida</span>
                            <span class="allocation-rows__qty">(120/120)</span>
                        </div>
                        <span class="allocation-badge allocation-badge--success">Tutte assegnate</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

export default {
    title: 'Checkout/Shipping & Payment/AllocationRows',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Righe CSS-only per allocare copie su destinazioni checkout. La logica di calcolo resta fuori dalla libreria.'
            }
        }
    }
};

export const DestinationInputs = {
    render: () => {
        const root = document.createElement('div');
        root.innerHTML = destinationInputs();
        return root;
    },
    play: async ({ canvas }) => {
        await expect(canvas.getByText('Libri brossura fresata')).toBeInTheDocument();
        await expect(canvas.getByLabelText('Copie Copertina A')).toHaveValue(25);
    }
};

export const AllocationSummary = {
    render: () => {
        const root = document.createElement('div');
        root.innerHTML = allocationSummary();
        return root;
    },
    play: async ({ canvas }) => {
        await expect(canvas.getByText('Riepilogo allocazione copie')).toBeInTheDocument();
        await expect(canvas.getByText('Tutte assegnate')).toHaveClass('allocation-badge--success');
    }
};

export const ReferenceFromCheckout = {
    render: () => {
        const root = document.createElement('div');
        root.innerHTML = `
            <div style="max-width: 620px;">
                ${allocationSummary()}
                <div style="height: 16px;"></div>
                ${destinationInputs()}
            </div>
        `;
        return root;
    }
};
