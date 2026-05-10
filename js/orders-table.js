/**
 * OrdersTable -- expandable table rows for orders list.
 *
 * @public-data data-orders-table, data-orders-table-row, data-orders-table-toggle, data-orders-table-detail, data-orders-table-action, data-orders-table-detail-action, data-orders-table-detail-action-id, data-orders-table-detail-action-id-name, data-orders-table-detail-action-label
 * @public-event sp:orders-table:row-toggle
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};

    function escapeHtml(value) {
        // Preferisci helper condiviso; fallback locale per garantire safety
        // anche se _helpers.js non e' stato caricato.
        if (typeof helpers.escapeHtml === 'function') return helpers.escapeHtml(value);
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); } catch (e) { /* invalid name, swallow */ }
            return;
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function getVisibleCellCount(row) {
        return Array.prototype.slice.call(row.querySelectorAll('td')).filter(function (td) {
            return window.getComputedStyle(td).display !== 'none';
        }).length;
    }

    function getDetailAction(row) {
        var label = row.getAttribute('data-orders-table-detail-action-label');
        var action = row.getAttribute('data-orders-table-detail-action');
        if (!label || !action) return '';

        var idName = row.getAttribute('data-orders-table-detail-action-id-name') || 'data-id';
        var idValue = row.getAttribute('data-orders-table-detail-action-id') || '';

        // safe: tutti i valori passano per escapeHtml prima di entrare in innerHTML.
        return '<button class="orders-table-detail-action" type="button" data-orders-table-action="' +
            escapeHtml(action) + '"' + (idValue ? ' ' + escapeHtml(idName) + '="' + escapeHtml(idValue) + '"' : '') +
            '>' + escapeHtml(label) + '</button>';
    }

    function closeDetailRow(detailRow) {
        if (!detailRow) return;
        detailRow.hidden = true;

        var sourceRow = detailRow.previousElementSibling;
        if (sourceRow) {
            sourceRow.setAttribute('aria-expanded', 'false');
            var toggle = sourceRow.querySelector('[data-orders-table-toggle]');
            if (toggle) toggle.setAttribute('aria-label', 'Mostra dettagli riga');
        }
    }

    function closeOpenRows(table, exceptDetailRow) {
        table.querySelectorAll('[data-orders-table-detail]').forEach(function (detailRow) {
            if (detailRow !== exceptDetailRow) closeDetailRow(detailRow);
        });
    }

    function buildDetailRow(table, row) {
        var headers = table.querySelectorAll('thead th');
        var cells = row.querySelectorAll('td');
        var details = [];
        var titleCell = row.querySelector('.orders-table__cell--title .table-title-cell__text');

        if (titleCell) {
            details.push({ label: 'Lavoro', value: escapeHtml(titleCell.textContent.trim()) });
        }

        cells.forEach(function (td, index) {
            if (!td.classList.contains('orders-table__cell--mobile-hide')) return;

            var label = headers[index] ? headers[index].textContent.trim() : '';
            // F009 fix: usa textContent (NON innerHTML) per evitare reflow di
            // markup arbitrario di una cella source nel dettaglio mobile.
            // Il valore viene poi escapato a livello di output.
            var value = (td.textContent || td.innerText || '').trim();
            if (label && value && value !== '-') {
                details.push({ label: escapeHtml(label), value: escapeHtml(value) });
            }
        });

        if (!details.length) return null;

        var detailRow = document.createElement('tr');
        detailRow.className = 'tr-mobile-details';
        detailRow.hidden = true;
        detailRow.setAttribute('data-orders-table-detail', '');

        // detail.label e detail.value sono gia' escapati in pushed objects;
        // getDetailAction() escapa internamente attributi e label.
        var html = '<td colspan="' + getVisibleCellCount(row) + '"><dl class="mobile-details-grid">'; // safe: numero intero
        details.forEach(function (detail) {
            html += '<div><dt>' + detail.label + '</dt><dd>' + detail.value + '</dd></div>';
        });
        html += '</dl>' + getDetailAction(row) + '</td>';
        detailRow.innerHTML = html; // safe: tutto upstream escapato (label, value, action)

        return detailRow;
    }

    function ensureDetailRow(table, row) {
        var existing = row.nextElementSibling;
        if (existing && existing.hasAttribute('data-orders-table-detail')) return existing;

        var detailRow = buildDetailRow(table, row);
        if (!detailRow) return null;

        row.parentNode.insertBefore(detailRow, row.nextSibling);
        return detailRow;
    }

    function toggleRow(table, row) {
        var detailRow = ensureDetailRow(table, row);
        if (!detailRow) return;

        var willOpen = detailRow.hidden;
        closeOpenRows(table, detailRow);

        detailRow.hidden = !willOpen;
        row.setAttribute('aria-expanded', willOpen ? 'true' : 'false');

        var toggle = row.querySelector('[data-orders-table-toggle]');
        if (toggle) {
            toggle.setAttribute('aria-label', willOpen ? 'Nascondi dettagli riga' : 'Mostra dettagli riga');
        }

        dispatch(row, 'sp:orders-table:row-toggle', { open: willOpen, row: row });
    }

    function initTable(table) {
        if (!table || table.__skillpressOrdersTableInitialized) return;
        if (table.hasAttribute('data-supplier-activity-table')) return;
        if (!table.querySelector('.orders-table__cell--mobile-hide')) return;
        table.__skillpressOrdersTableInitialized = true;

        var headerRow = table.querySelector('thead tr');
        if (headerRow && !headerRow.querySelector('.th-mobile-chevron')) {
            var th = document.createElement('th');
            th.className = 'th-mobile-chevron';
            th.setAttribute('aria-hidden', 'true');
            headerRow.appendChild(th);
        }

        table.querySelectorAll('tbody tr').forEach(function (row) {
            if (row.hasAttribute('data-orders-table-detail')) return;
            if (!row.querySelector('.orders-table__cell--mobile-hide')) return;

            row.setAttribute('data-orders-table-row', '');
            row.setAttribute('aria-expanded', 'false');
            // F015: la riga toggleabile deve essere keyboard-focusable.
            if (!row.hasAttribute('tabindex')) row.setAttribute('tabindex', '0');
            if (!row.hasAttribute('role')) row.setAttribute('role', 'button');

            if (row.querySelector('.orders-table__cell--mobile-chevron')) return;

            var td = document.createElement('td');
            td.className = 'td-mobile-chevron';
            td.innerHTML = '<button class="td-mobile-chevron__button" type="button" aria-label="Mostra dettagli riga" data-orders-table-toggle><span class="td-mobile-chevron__icon" aria-hidden="true"></span></button>'; // safe: stringa statica di markup, nessun input variabile
            row.appendChild(td);
        });

        table.addEventListener('click', function (event) {
            if (event.target.closest('.dashboard-action-badge, button:not([data-orders-table-toggle]), a')) return;

            var row = event.target.closest('[data-orders-table-row]');
            if (!row || !table.contains(row)) return;

            event.preventDefault();
            toggleRow(table, row);
        });

        // F015: keyboard support (Enter/Space) sulla row toggleabile.
        table.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
            // Non interferire con interactive children (button, link, input).
            if (event.target.closest('button, a, input, select, textarea, [contenteditable="true"]')) return;
            var row = event.target.closest('[data-orders-table-row]');
            if (!row || !table.contains(row)) return;
            // Solo se il focus e' sulla row stessa (non un descendant non-interactive).
            if (event.target !== row) return;
            event.preventDefault();
            toggleRow(table, row);
        });
    }

    /** @public */
    function init(root) {
        var scope = root || document;
        scope.querySelectorAll('[data-orders-table], .orders-table:not([data-supplier-activity-table])').forEach(initTable);
    }

    namespace.OrdersTable = {
        init: init
    };

    if (helpers && typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
