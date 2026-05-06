(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
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

        return '<button class="orders-table-detail-action" type="button" data-action="' +
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
        var titleCell = row.querySelector('.td-title .table-title-cell__text');

        if (titleCell) {
            details.push({ label: 'Lavoro', value: escapeHtml(titleCell.textContent.trim()) });
        }

        cells.forEach(function (td, index) {
            if (!td.classList.contains('td-mobile-hide')) return;

            var label = headers[index] ? headers[index].textContent.trim() : '';
            var value = td.innerHTML.trim();
            if (label && value && value !== '-') {
                details.push({ label: label, value: value });
            }
        });

        if (!details.length) return null;

        var detailRow = document.createElement('tr');
        detailRow.className = 'tr-mobile-details';
        detailRow.hidden = true;
        detailRow.setAttribute('data-orders-table-detail', '');

        var html = '<td colspan="' + getVisibleCellCount(row) + '"><dl class="mobile-details-grid">';
        details.forEach(function (detail) {
            html += '<div><dt>' + escapeHtml(detail.label) + '</dt><dd>' + detail.value + '</dd></div>';
        });
        html += '</dl>' + getDetailAction(row) + '</td>';
        detailRow.innerHTML = html;

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
    }

    function initTable(table) {
        if (!table || table.getAttribute('data-orders-table-mobile-init') === '1') return;
        if (table.hasAttribute('data-supplier-activity-table')) return;
        if (!table.querySelector('.td-mobile-hide')) return;

        var headerRow = table.querySelector('thead tr');
        if (headerRow && !headerRow.querySelector('.th-mobile-chevron')) {
            var th = document.createElement('th');
            th.className = 'th-mobile-chevron';
            th.setAttribute('aria-hidden', 'true');
            headerRow.appendChild(th);
        }

        table.querySelectorAll('tbody tr').forEach(function (row) {
            if (row.hasAttribute('data-orders-table-detail')) return;
            if (!row.querySelector('.td-mobile-hide')) return;

            row.setAttribute('data-orders-table-row', '');
            row.setAttribute('aria-expanded', 'false');

            if (row.querySelector('.td-mobile-chevron')) return;

            var td = document.createElement('td');
            td.className = 'td-mobile-chevron';
            td.innerHTML = '<button class="td-mobile-chevron__button" type="button" aria-label="Mostra dettagli riga" data-orders-table-toggle><span class="td-mobile-chevron__icon" aria-hidden="true"></span></button>';
            row.appendChild(td);
        });

        table.addEventListener('click', function (event) {
            if (event.target.closest('.dash-action-badge, button:not([data-orders-table-toggle]), a')) return;

            var row = event.target.closest('[data-orders-table-row]');
            if (!row || !table.contains(row)) return;

            event.preventDefault();
            toggleRow(table, row);
        });

        table.setAttribute('data-orders-table-mobile-init', '1');
    }

    function init(root) {
        var scope = root || document;
        scope.querySelectorAll('[data-orders-table], .orders-table:not([data-supplier-activity-table])').forEach(initTable);
    }

    namespace.OrdersTable = {
        init: init
    };
})();
