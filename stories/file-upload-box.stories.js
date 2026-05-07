import '../components/file-upload-box.css';
import '../js/file-upload-box.js';
import { expect, within } from 'storybook/test';

const renderModal = ({ visible = false, rejected = false } = {}) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <button class="button button--primary" type="button" data-file-upload-box-open="#story-file-upload-modal">
            Apri upload
        </button>
        <div id="story-file-upload-modal"
             class="file-modal__overlay"
             data-file-upload-box
             ${visible ? '' : 'hidden'}
             aria-hidden="${visible ? 'false' : 'true'}">
            <div class="file-modal__content" role="dialog" aria-modal="true" aria-labelledby="story-file-modal-title" tabindex="-1">
                <div class="file-modal__header">
                    <div class="file-modal__title">
                        <span class="file-modal__icon file-modal__icon--upload-file" aria-hidden="true"></span>
                        <h3 id="story-file-modal-title">File interno</h3>
                    </div>
                    <button class="file-modal__close" type="button" data-file-upload-box-role="close" title="Chiudi">
                        <span class="file-modal__icon file-modal__icon--close" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="file-modal__body">
                    <div class="file-modal__warning">
                        <p><strong>Attenzione:</strong> il file caricato e' definitivo. Per sostituirlo dopo l'invio, contatta l'assistenza.</p>
                    </div>
                    <div class="file-modal__error" data-file-upload-box-role="upload-error" ${rejected ? '' : 'hidden'}>
                        <span class="file-modal__icon file-modal__icon--error" aria-hidden="true"></span>
                        <span>File non conforme</span>
                        <a class="file-modal__download" href="#">
                            <span class="file-modal__icon file-modal__icon--download" aria-hidden="true"></span>
                            Scarica report
                        </a>
                    </div>
                    <div class="file-modal__dropzone" data-file-upload-box-role="dropzone">
                        <div class="file-modal__dropzone-icon">
                            <span class="file-modal__icon file-modal__icon--cloud-upload" aria-hidden="true"></span>
                        </div>
                        <p class="file-modal__dropzone-text">Trascina qui il file o clicca per selezionare</p>
                        <p class="file-modal__dropzone-hint">Formati accettati: PDF, JPG, PNG</p>
                        <input class="file-modal__input" type="file" accept=".pdf,.jpg,.jpeg,.png" data-file-upload-box-role="input">
                    </div>
                    <table class="file-modal__table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>File</th>
                                <th>Data</th>
                                <th>Dimensione</th>
                                <th>Stato</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody data-file-upload-box-role="table-body">
                            <tr>
                                <td colspan="6" class="file-modal__table-empty">Non sono presenti file</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="file-modal__footer">
                    <button class="file-modal__submit" type="button" data-file-upload-box-role="submit">
                        Invia file
                    </button>
                </div>
            </div>
        </div>
    `;
    return root;
};

export default {
    title: 'Dashboard/Order Detail/FileUploadBox',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard upload modal shell. The library owns modal/dropzone UI behavior; the application owns upload and validation.'
            }
        }
    }
};

export const Default = {
    render: () => renderModal({ visible: true }),
    play: async ({ canvasElement }) => {
        window.SkillpressUI.FileUploadBox.init(canvasElement);
        const canvas = within(canvasElement);
        await expect(canvas.getByRole('dialog')).toBeInTheDocument();
        await expect(canvas.getByText('Non sono presenti file')).toHaveClass('file-modal__table-empty');
    }
};

export const RejectedFile = {
    render: () => renderModal({ visible: true, rejected: true }),
    parameters: {
        docs: {
            description: {
                story: 'Error banner state from dashboard file modal. Error reason and report link remain backend/app content.'
            }
        }
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderModal({ visible: true }),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html#file-upload-modal`; Material Symbols are replaced by library-owned CSS icons.'
            }
        }
    }
};
