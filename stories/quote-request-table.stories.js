import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../utilities/utilities.css';
import '../components/quote-request-table.css';
import { expect, within } from 'storybook/test';

const iconRemove = '<span class="quote-row-btn__icon quote-row-btn__icon--remove" aria-hidden="true"></span>';
const iconAdd = '<span class="quote-row-btn__icon quote-row-btn__icon--add" aria-hidden="true"></span>';

const renderTable = () => {
    const root = document.createElement('section');
    root.className = 'quote-request-section';
    root.innerHTML = `
        <h2 class="quote-request-section__title">Crea richiesta di preventivo</h2>
        <div class="table-wrapper">
            <table id="quote-request-table" class="quote-table">
                <thead>
                    <tr>
                        <th class="quote-th-num">#</th>
                        <th>Prodotto</th>
                        <th class="quote-col-hide">Spedito il</th>
                        <th class="quote-th-qty">Qt.</th>
                        <th class="quote-col-hide">Imponibile</th>
                        <th class="quote-col-hide">Iva</th>
                        <th class="quote-col-hide">Imposta</th>
                        <th class="quote-col-hide">Totale</th>
                        <th class="quote-th-action"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="quote-td-num">115124</td>
                        <td>
                            <div class="quote-product-name">Catalogo A4 - 32 pagine</div>
                            <div class="quote-product-meta"><strong>Nome lavoro:</strong> Catalogo Primavera 2026</div>
                            <div class="quote-product-meta"><strong>Referente:</strong> Marco Bianchi</div>
                        </td>
                        <td class="quote-col-hide"></td>
                        <td class="quote-td-qty">500</td>
                        <td class="quote-col-hide orders-table__cell--text-right">-</td>
                        <td class="quote-col-hide orders-table__cell--text-right">-</td>
                        <td class="quote-col-hide orders-table__cell--text-right">-</td>
                        <td class="quote-col-hide orders-table__cell--text-right">-</td>
                        <td class="quote-td-action">
                            <button class="quote-row-btn quote-row-btn--remove" type="button" data-orders-table-action="remove-quote-row" title="Rimuovi">
                                ${iconRemove}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td class="quote-td-num">115125</td>
                        <td>
                            <div class="quote-product-name">Brochure A5 - 8 pagine</div>
                            <div class="quote-product-meta"><strong>Nome lavoro:</strong> Brochure Fieramilano</div>
                            <div class="quote-product-meta"><strong>Referente:</strong> Laura Rossi</div>
                        </td>
                        <td class="quote-col-hide"></td>
                        <td class="quote-td-qty">1000</td>
                        <td class="quote-col-hide orders-table__cell--text-right">-</td>
                        <td class="quote-col-hide orders-table__cell--text-right">-</td>
                        <td class="quote-col-hide orders-table__cell--text-right">-</td>
                        <td class="quote-col-hide orders-table__cell--text-right">-</td>
                        <td class="quote-td-action">
                            <button class="quote-row-btn quote-row-btn--remove" type="button" data-orders-table-action="remove-quote-row" title="Rimuovi">
                                ${iconRemove}
                            </button>
                        </td>
                    </tr>
                    <tr id="quote-new-row">
                        <td class="quote-td-num quote-row-num">115126</td>
                        <td>
                            <div class="quote-form-fields">
                                <input type="text" placeholder="Nome lavoro" class="quote-input" id="qr-nome">
                                <input type="text" placeholder="Referente" class="quote-input" id="qr-referente">
                                <input type="tel" placeholder="Numero di telefono" class="quote-input" id="qr-telefono">
                                <textarea placeholder="Descrizione prodotto" rows="2" class="quote-input quote-input--textarea" id="qr-descrizione"></textarea>
                                <textarea placeholder="Note" rows="2" class="quote-input quote-input--textarea" id="qr-note"></textarea>
                            </div>
                        </td>
                        <td class="quote-col-hide"></td>
                        <td class="quote-td-qty">
                            <input type="number" min="1" class="quote-input quote-input--qty" id="qr-qty">
                        </td>
                        <td class="quote-col-hide"></td>
                        <td class="quote-col-hide"></td>
                        <td class="quote-col-hide"></td>
                        <td class="quote-col-hide"></td>
                        <td class="quote-td-action">
                            <button class="quote-row-btn quote-row-btn--add" type="button" data-orders-table-action="add-quote-row" title="Aggiungi">
                                ${iconAdd}
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" class="quote-footer-cell"></td>
                        <td class="quote-col-hide font-semibold quote-footer-cell orders-table__cell--text-right">&euro; 0,00</td>
                        <td class="quote-col-hide quote-footer-cell"></td>
                        <td class="quote-col-hide font-semibold quote-footer-cell orders-table__cell--text-right">&euro; 0,00</td>
                        <td class="quote-col-hide font-semibold quote-footer-cell orders-table__cell--text-right">&euro; 0,00</td>
                        <td class="quote-footer-cell"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <button class="quote-submit-btn" type="button" data-orders-table-action="submit-quote">Invia richiesta</button>
    `;
    return root;
};

export default {
    title: 'Dashboard/Quotes/QuoteRequestTable',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard editable quote request table. CSS-only; row management, totals and submit are app/backend behavior.'
            }
        }
    }
};

export const Default = {
    render: () => renderTable(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Catalogo A4 - 32 pagine')).toBeInTheDocument();
        await expect(canvas.getByTitle('Aggiungi')).toHaveClass('quote-row-btn--add');
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderTable(),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html` quote request view. Material Symbols add/remove are replaced by CSS-owned icons.'
            }
        }
    }
};
