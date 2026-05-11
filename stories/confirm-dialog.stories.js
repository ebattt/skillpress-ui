import '../tokens/tokens.css';
import '../primitives/button.css';
import '../primitives/sp-confirm-dialog.css';
import '../js/confirm-dialog.js';
import { expect, userEvent } from 'storybook/test';

export default {
    title: 'Primitives/ConfirmDialog',
};

const renderDialog = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <button class="sp-button sp-button--primary" type="button" data-confirm-dialog-open="#story-confirm-dialog">
            Apri conferma
        </button>
        <div id="story-confirm-dialog"
             class="sp-confirm-dialog"
             data-confirm-dialog
             role="presentation"
             aria-hidden="true"
             hidden>
            <div class="sp-confirm-dialog__panel" role="dialog" aria-modal="true" aria-labelledby="story-confirm-dialog-title" tabindex="-1">
                <div class="sp-confirm-dialog__header">
                    <div class="sp-confirm-dialog__heading">
                        <span class="sp-confirm-dialog__icon" aria-hidden="true"></span>
                        <h3 id="story-confirm-dialog-title" class="sp-confirm-dialog__title">Conferma cambio modalità</h3>
                    </div>
                    <button class="sp-confirm-dialog__close" type="button" data-confirm-dialog-role="close" aria-label="Chiudi"></button>
                </div>
                <div class="sp-confirm-dialog__body">
                    <p class="sp-confirm-dialog__text">
                        Passando alla modalità <strong>Veloce</strong>, tutte le modifiche aggiuntive effettuate nella modalità <strong>Avanzata</strong> andranno perse.
                    </p>
                    <p class="sp-confirm-dialog__text">
                        Sei sicuro di voler continuare?
                    </p>
                </div>
                <div class="sp-confirm-dialog__actions">
                    <button class="sp-button sp-button--outline" type="button" data-confirm-dialog-role="cancel">
                        Resta in questa pagina
                    </button>
                    <button class="sp-button sp-button--primary" type="button" data-confirm-dialog-role="confirm">
                        Passa a Veloce
                    </button>
                </div>
            </div>
        </div>
    `;
    if (window.SkillpressUI && window.SkillpressUI.ConfirmDialog) {
        window.SkillpressUI.ConfirmDialog.init(container);
    }
    return container;
};

export const Default = {
    render: renderDialog,
    play: async ({ canvas }) => {
        const opener = canvas.getByRole('button', { name: /Apri conferma/ });
        await userEvent.click(opener);
        await expect(canvas.getByRole('dialog')).toBeInTheDocument();
        await expect(canvas.getByRole('heading', { name: /Conferma cambio modalità/ })).toBeInTheDocument();
    }
};
