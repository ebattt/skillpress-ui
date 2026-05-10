/**
 * SupplierActivityTable -- expandable table rows for supplier activities.
 *
 * @public-data data-supplier-activity-table, data-supplier-activity-table-init, data-supplier-activity-table-row, data-supplier-activity-table-toggle
 * @public-event sp:supplier-activity-table:row-toggle
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function getCellCount(row) {
        return row ? row.children.length : 1;
    }

    function closeRow(row) {
        if (!row) return;

        var detailId = row.getAttribute('aria-controls');
        var detail = detailId ? document.getElementById(detailId) : null;
        if (!detail) return;

        row.setAttribute('aria-expanded', 'false');
        detail.hidden = true;

        var toggle = row.querySelector('[data-supplier-activity-table-toggle]');
        if (toggle) toggle.setAttribute('aria-label', 'Mostra dettagli attività');
    }

    function toggleRow(table, row) {
        var detailId = row.getAttribute('aria-controls');
        var detail = detailId ? document.getElementById(detailId) : null;
        if (!detail) return;

        var willOpen = detail.hidden;
        table.querySelectorAll('[data-supplier-activity-table-row][aria-expanded="true"]').forEach(function (openRow) {
            if (openRow !== row) closeRow(openRow);
        });

        row.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        detail.hidden = !willOpen;

        var toggle = row.querySelector('[data-supplier-activity-table-toggle]');
        if (toggle) {
            toggle.setAttribute('aria-label', willOpen ? 'Nascondi dettagli attività' : 'Mostra dettagli attività');
        }

        dispatch(row, 'sp:supplier-activity-table:row-toggle', { open: willOpen, row: row });
    }

    function ensureChevron(table, row) {
        if (row.querySelector('[data-supplier-activity-table-toggle]')) return;

        var headerRow = table.querySelector('thead tr');
        if (headerRow && !headerRow.querySelector('.supplier-activity-table__chevron-heading')) {
            var th = document.createElement('th');
            th.className = 'supplier-activity-table__chevron-heading';
            th.setAttribute('aria-hidden', 'true');
            headerRow.appendChild(th);
        }

        var td = document.createElement('td');
        td.className = 'supplier-activity-table__chevron-cell';
        td.innerHTML = '<button class="supplier-activity-table__chevron-button" type="button" aria-label="Mostra dettagli attività" data-supplier-activity-table-toggle><span class="supplier-activity-table__chevron" aria-hidden="true"></span></button>';
        row.appendChild(td);
    }

    function initTable(table) {
        if (!table || table.__skillpressSupplierActivityTableInitialized) return;
        table.__skillpressSupplierActivityTableInitialized = true;
        // deprecated alias, removed in v0.3
        table.setAttribute('data-supplier-activity-table-init', '1');

        table.querySelectorAll('[data-supplier-activity-table-row]').forEach(function (row) {
            var detailId = row.getAttribute('aria-controls');
            var detail = detailId ? document.getElementById(detailId) : null;
            if (!detail) return;

            row.setAttribute('aria-expanded', row.getAttribute('aria-expanded') === 'true' ? 'true' : 'false');
            detail.hidden = row.getAttribute('aria-expanded') !== 'true';

            var cell = detail.querySelector('td');
            if (cell) cell.setAttribute('colspan', String(getCellCount(row) + 1));

            ensureChevron(table, row);
        });

        table.addEventListener('click', function (event) {
            if (event.target.closest('a, button:not([data-supplier-activity-table-toggle])')) return;

            var row = event.target.closest('[data-supplier-activity-table-row]');
            if (!row || !table.contains(row)) return;

            event.preventDefault();
            toggleRow(table, row);
        });

        table.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;

            var row = event.target.closest('[data-supplier-activity-table-row]');
            if (!row || !table.contains(row)) return;

            event.preventDefault();
            toggleRow(table, row);
        });
    }

    /** @public */
    function init(root) {
        var scope = root || document;
        scope.querySelectorAll('[data-supplier-activity-table]').forEach(initTable);
    }

    namespace.SupplierActivityTable = {
        init: init
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
