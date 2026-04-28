import '../tokens/tokens.css';
import '../primitives/option-buttons.css';

export default {
    title: 'Primitives/OptionButtons',
};

export const Default = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--selected">A4</button>
            <button class="option-btn option-btn--default">A5</button>
            <button class="option-btn option-btn--default">A3</button>
            <button class="option-btn option-btn--default">Libro</button>
        </div>
    `;
    return container;
};

export const NoneSelected = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--default">Opaco</button>
            <button class="option-btn option-btn--default">Lucido</button>
            <button class="option-btn option-btn--default">Satinato</button>
        </div>
    `;
    return container;
};

export const ManyOptions = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--default">100g</button>
            <button class="option-btn option-btn--default">120g</button>
            <button class="option-btn option-btn--selected">170g</button>
            <button class="option-btn option-btn--default">200g</button>
            <button class="option-btn option-btn--default">300g</button>
        </div>
    `;
    return container;
};

export const Borderless = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--borderless">Variante A</button>
            <button class="option-btn option-btn--borderless">Variante B</button>
            <button class="option-btn option-btn--selected">Variante C</button>
        </div>
    `;
    return container;
};

export const ReferenceFromElementsUI = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--selected">A4</button>
            <button class="option-btn option-btn--default">A5</button>
            <button class="option-btn option-btn--default">A3</button>
            <button class="option-btn option-btn--default">Libro</button>
            <button class="option-btn option-btn--default">Personalizzato</button>
        </div>
    `;
    return container;
};
