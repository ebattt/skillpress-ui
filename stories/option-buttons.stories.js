import '../tokens/tokens.css';
import '../primitives/option-buttons.css';
import { expect } from 'storybook/test';

export default {
    title: 'Primitives/OptionButtons',
};

const renderDefault = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="sp-option-buttons">
            <button class="sp-option-buttons__btn sp-option-buttons__btn--selected">A4</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">A5</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">A3</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">Libro</button>
        </div>
    `;
    return container;
};

export const Default = {
    render: renderDefault,
    play: async ({ canvas }) => {
        const a4 = canvas.getByRole('button', { name: 'A4' });
        const a5 = canvas.getByRole('button', { name: 'A5' });
        await expect(a4).toHaveClass('sp-option-buttons__btn--selected');
        await expect(a5).toHaveClass('sp-option-buttons__btn--default');
    }
};

export const NoneSelected = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="sp-option-buttons">
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">Opaco</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">Lucido</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">Satinato</button>
        </div>
    `;
    return container;
};

export const ManyOptions = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="sp-option-buttons">
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">100g</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">120g</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--selected">170g</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">200g</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">300g</button>
        </div>
    `;
    return container;
};

export const EqualColumns = () => {
    const container = document.createElement('div');
    container.style.maxWidth = '720px';
    container.innerHTML = `
        <div class="sp-option-buttons sp-option-buttons--equal" role="group" aria-label="Controllo file">
            <button class="sp-option-buttons__btn sp-option-buttons__btn--selected">Standard - gratuito</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">Plus - 11,90 euro</button>
        </div>
    `;
    return container;
};

export const Borderless = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="sp-option-buttons">
            <button class="sp-option-buttons__btn sp-option-buttons__btn--borderless">Variante A</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--borderless">Variante B</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--selected">Variante C</button>
        </div>
    `;
    return container;
};

export const ReferenceFromElementsUI = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="sp-option-buttons">
            <button class="sp-option-buttons__btn sp-option-buttons__btn--selected">A4</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">A5</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">A3</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">Libro</button>
            <button class="sp-option-buttons__btn sp-option-buttons__btn--default">Personalizzato</button>
        </div>
    `;
    return container;
};
