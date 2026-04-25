const plusIcon = `
    <span class="button__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5v14" stroke-width="2" stroke-linecap="round" />
        </svg>
    </span>
`;

const renderButton = ({
    label = 'Aggiungi al carrello',
    variant = 'primary',
    size = '',
    full = false,
    disabled = false,
    icon = false,
    tag = 'button'
} = {}) => {
    const root = document.createElement('div');
    const classes = [
        'button',
        `button--${variant}`,
        size ? `button--${size}` : '',
        full ? 'button--full' : ''
    ].filter(Boolean).join(' ');
    const disabledAttrs = disabled ? ' disabled' : '';
    const content = `${icon ? plusIcon : ''}${label}`;

    root.innerHTML = tag === 'a'
        ? `<a class="${classes}${disabled ? ' is-disabled' : ''}" href="#"${disabled ? ' aria-disabled="true"' : ''}>${content}</a>`
        : `<button class="${classes}" type="button"${disabledAttrs}>${content}</button>`;

    return root;
};

const renderGroup = (items) => {
    const root = document.createElement('div');

    root.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; max-width: 760px;">
            ${items.map((item) => {
                const wrapper = renderButton(item);
                return wrapper.innerHTML;
            }).join('')}
        </div>
    `;

    return root;
};

export default {
    title: 'Primitives/Button',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Button base della libreria Skillpress. Il backend controlla contenuto, attributi nativi e azione; la libreria controlla styling, varianti e stati visuali.'
            }
        }
    }
};

export const Default = {
    render: () => renderButton()
};

export const Variants = {
    render: () => renderGroup([
        { label: 'Primary', variant: 'primary' },
        { label: 'Secondary', variant: 'secondary' },
        { label: 'Outline', variant: 'outline' },
        { label: 'Ghost', variant: 'ghost' }
    ])
};

export const WithIcon = {
    render: () => renderButton({
        label: 'Aggiungi',
        variant: 'secondary',
        icon: true
    })
};

export const FullWidth = {
    render: () => {
        const root = document.createElement('div');
        root.style.maxWidth = '360px';
        root.innerHTML = renderButton({
            label: 'Procedi con ordine',
            variant: 'secondary',
            full: true
        }).innerHTML;
        return root;
    }
};

export const Disabled = {
    render: () => renderGroup([
        { label: 'Button disabled', variant: 'primary', disabled: true },
        { label: 'Link disabled', variant: 'outline', disabled: true, tag: 'a' }
    ])
};

export const ReferenceFromOriginal = {
    render: () => renderGroup([
        { label: 'Aggiungi al carrello', variant: 'secondary', full: true, icon: true },
        { label: 'Rapido', variant: 'primary', size: 'sm' },
        { label: 'Carta patinata', variant: 'outline', size: 'sm' },
        { label: 'Anteprima', variant: 'ghost', size: 'sm' }
    ])
};
