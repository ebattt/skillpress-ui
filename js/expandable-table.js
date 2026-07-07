/**
 * ExpandableTable -- wiring per tabelle con righe espandibili (markup-based).
 *
 * Implementazione condivisa dell'espansione riga. Il modulo NON genera markup: chevron e
 * detail-row sono renderizzati dal backend. Il JS si limita ad agganciare il
 * comportamento (click/tastiera, sync aria-expanded <-> hidden, una riga aperta
 * alla volta, evento custom). Le classi CSS restano per-componente
 * (orders-table__*, supplier-activity-table__*): lo styling non cambia.
 *
 * Contratto markup:
 *   - tabella:   [data-expandable-table]
 *   - riga:      [data-expandable-table-row] con aria-controls="<id detail-row>"
 *                e aria-expanded ("true" => aperta di default), focusabile
 *                (tabindex="0").
 *   - chevron:   <button data-expandable-table-toggle> dentro la riga.
 *   - dettaglio: <tr id="<id>" hidden> referenziata dall'aria-controls; il
 *                colspan e' nel markup (il JS non lo calcola).
 *   - label aria opzionali sul root: data-expandable-table-label-show /
 *     data-expandable-table-label-hide (default "Mostra/Nascondi dettagli").
 *
 * @public-component orders-table, billing-table, supplier-activity-table
 * @public-data data-expandable-table, data-expandable-table-init, data-expandable-table-row, data-expandable-table-toggle, data-expandable-table-label-show, data-expandable-table-label-hide
 * @public-event sp:expandable-table:row-toggle
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};

    var DEFAULT_LABEL_SHOW = 'Mostra dettagli';
    var DEFAULT_LABEL_HIDE = 'Nascondi dettagli';

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function labels(table) {
        return {
            show: table.getAttribute('data-expandable-table-label-show') || DEFAULT_LABEL_SHOW,
            hide: table.getAttribute('data-expandable-table-label-hide') || DEFAULT_LABEL_HIDE
        };
    }

    function detailFor(row) {
        var id = row.getAttribute('aria-controls');
        return id ? document.getElementById(id) : null;
    }

    function setRowState(table, row, open) {
        var detail = detailFor(row);
        if (!detail) return;

        row.setAttribute('aria-expanded', open ? 'true' : 'false');
        detail.hidden = !open;

        var toggle = row.querySelector('[data-expandable-table-toggle]');
        if (toggle) {
            var l = labels(table);
            toggle.setAttribute('aria-label', open ? l.hide : l.show);
        }
    }

    function toggleRow(table, row) {
        var detail = detailFor(row);
        if (!detail) return;

        var willOpen = detail.hidden;

        table.querySelectorAll('[data-expandable-table-row][aria-expanded="true"]').forEach(function (openRow) {
            if (openRow !== row) setRowState(table, openRow, false);
        });

        setRowState(table, row, willOpen);
        dispatch(row, 'sp:expandable-table:row-toggle', { open: willOpen, row: row });
    }

    function initTable(table) {
        if (!table || table.__skillpressExpandableTableInitialized) return;
        table.__skillpressExpandableTableInitialized = true;
        table.setAttribute('data-expandable-table-init', '1');

        table.querySelectorAll('[data-expandable-table-row]').forEach(function (row) {
            var detail = detailFor(row);
            if (!detail) return;

            // Stato iniziale dal markup: aria-expanded="true" => detail visibile.
            setRowState(table, row, row.getAttribute('aria-expanded') === 'true');
        });

        table.addEventListener('click', function (event) {
            if (event.target.closest('a, button:not([data-expandable-table-toggle]), input, select, textarea, .dashboard-action-badge')) return;

            var row = event.target.closest('[data-expandable-table-row]');
            if (!row || !table.contains(row)) return;

            event.preventDefault();
            toggleRow(table, row);
        });

        table.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
            // Non interferire con eventuali interactive children.
            if (event.target.closest('a, button:not([data-expandable-table-toggle]), input, select, textarea, [contenteditable="true"]')) return;

            var row = event.target.closest('[data-expandable-table-row]');
            if (!row || !table.contains(row)) return;

            event.preventDefault();
            toggleRow(table, row);
        });
    }

    /** @public */
    function init(root) {
        var scope = root || document;
        if (scope.matches && scope.matches('[data-expandable-table]')) initTable(scope);
        scope.querySelectorAll('[data-expandable-table]').forEach(initTable);
    }

    namespace.ExpandableTable = {
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
