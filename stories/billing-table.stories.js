import '../tokens/tokens.css';
import '../base/reset.css';
import '../base/fonts.css';
import '../utilities/utilities.css';
import '../components/billing-table.css';
import { expect, within } from 'storybook/test';

const rows = [
    {
        name: 'Giacomo Battiston',
        mobileAddress: 'Viale Trieste 54, Fossalta di Portogruaro (VE)',
        piva: '-',
        cf: 'BTTGCM85M01H501Z',
        address: 'Viale Trieste 54, 30025 Fossalta di Portogruaro (VE) <br><strong>Tel:</strong> 3662922669',
        email: 'giacomo.battiston@example.com<br><span class="text-gray-400">Ammin:</span> admin@battiston.it<br><span class="text-gray-400">PEC:</span> battiston@pec.it',
        sdi: 'M5UXCR1',
        billing: true,
        shipping: true,
        id: '1'
    },
    {
        name: 'Battiston S.r.l.',
        mobileAddress: 'Via Roma 123, Milano (MI)',
        piva: 'IT12345678901',
        cf: '-',
        address: 'Via Roma 123, 20121 Milano (MI) <br><strong>Tel:</strong> 021234567',
        email: 'info@battistonsrl.it<br><span class="text-gray-400">Ammin:</span> ammin@battistonsrl.it<br><span class="text-gray-400">PEC:</span> battistonsrl@pec.it',
        sdi: 'KRRH6B9',
        billing: false,
        shipping: false,
        id: '2'
    },
    {
        name: 'Elena Rossi',
        mobileAddress: 'Corso Buenos Aires 15, Milano (MI)',
        piva: '-',
        cf: 'RSSLNE90A41F205W',
        address: 'Corso Buenos Aires 15, 20124 Milano (MI) <br><strong>Tel:</strong> 3489876543',
        email: 'elena.rossi@gmail.com<br><span class="text-gray-400">Ammin:</span> -<br><span class="text-gray-400">PEC:</span> elena.rossi@pec.it',
        sdi: '-',
        billing: false,
        shipping: true,
        id: '4'
    }
];

const checkIcon = '<span class="billing-table__icon billing-table__icon--check" aria-label="Preferito"></span>';

const renderRows = (items) => items.map((row) => `
    <tr>
        <td class="font-semibold orders-table__cell--nowrap">${row.name}<span class="billing-table__mobile-address">${row.mobileAddress}</span></td>
        <td class="orders-table__cell--mobile-hide">${row.piva}</td>
        <td class="orders-table__cell--nowrap orders-table__cell--mobile-hide">${row.cf}</td>
        <td class="orders-table__cell--mobile-hide">${row.address}</td>
        <td class="orders-table__cell--mobile-hide">${row.email}</td>
        <td class="orders-table__cell--mobile-hide">${row.sdi}</td>
        <td class="orders-table__cell--mobile-hide">${row.billing ? 'Si' : 'No'}</td>
        <td class="orders-table__cell--mobile-hide">${row.shipping ? 'Si' : 'No'}</td>
        <td class="orders-table__cell--text-center billing-table__pref-col">${row.billing ? checkIcon : ''}</td>
        <td class="orders-table__cell--text-center billing-table__pref-col">${row.shipping ? checkIcon : ''}</td>
        <td class="orders-table__cell--text-center">
            <button class="dashboard-link--download" type="button" data-orders-table-action="edit-billing" data-billing-form-card-record-id="${row.id}" title="Modifica">
                <span class="dashboard-link--download__icon dashboard-link--download__icon--edit" aria-hidden="true"></span>
            </button>
        </td>
    </tr>
`).join('');

const renderTable = (items = rows) => {
    const root = document.createElement('div');
    root.innerHTML = `
        <div class="table-wrapper table-wrapper--scroll">
            <table class="billing-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th class="th-mobile-hide">P.I.V.A.</th>
                        <th class="th-mobile-hide">Cod. Fiscale</th>
                        <th class="th-mobile-hide">Indirizzo</th>
                        <th class="th-mobile-hide">E-mail</th>
                        <th class="th-mobile-hide">SDI</th>
                        <th class="th-mobile-hide">Preferito per fatturazione</th>
                        <th class="th-mobile-hide">Preferito per spedizione</th>
                        <th class="th-text-center billing-table__pref-col" title="Preferito fatturazione"><span class="billing-table__icon billing-table__icon--receipt" aria-hidden="true"></span></th>
                        <th class="th-text-center billing-table__pref-col" title="Preferito spedizione"><span class="billing-table__icon billing-table__icon--shipping" aria-hidden="true"></span></th>
                        <th class="th-actions"></th>
                    </tr>
                </thead>
                <tbody>${renderRows(items)}</tbody>
            </table>
        </div>
    `;
    return root;
};

export default {
    title: 'Dashboard/Billing/BillingTable',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Dashboard billing registry table. CSS-only; edit and data persistence stay in the consumer/backend.'
            }
        }
    }
};

export const Default = {
    render: () => renderTable(),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByText('Giacomo Battiston')).toBeInTheDocument();
        await expect(canvas.getAllByTitle('Modifica')[0]).toHaveClass('dashboard-link--download');
    }
};

export const ReferenceFromDashboardPage = {
    render: () => renderTable(rows.slice(0, 2)),
    parameters: {
        docs: {
            description: {
                story: 'Source shape from `dashboard/index.html` billing anagrafiche table. Material Symbols are replaced by CSS-owned icons.'
            }
        }
    }
};
