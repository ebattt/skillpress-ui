/**
 * CatalogProductGrid -- product grid with expand/collapse toggle.
 *
 * @public-component catalog-product-grid
 * @public-data data-catalog-product-grid, data-catalog-product-grid-init, data-catalog-product-grid-card, data-catalog-product-grid-items, data-catalog-product-grid-toggle, data-catalog-product-grid-initial-rows, data-catalog-product-grid-expand-label, data-catalog-product-grid-collapse-label
 * @public-event sp:catalog-product-grid:toggle
 */
(function () {
    'use strict';

    var TEXT = {
        collapse: 'Nascondi prodotti',
        expand: 'Mostra altri prodotti'
    };

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function getColumnCount(grid) {
        var templateColumns = window.getComputedStyle(grid).getPropertyValue('grid-template-columns');
        var count = templateColumns.split(' ').filter(Boolean).length;
        return templateColumns === 'none' || !count ? 1 : count;
    }

    function getInitialVisibleCount(grid, cards) {
        var initialRows = parseInt(grid.getAttribute('data-catalog-product-grid-initial-rows') || '2', 10);
        var rowCount = Number.isFinite(initialRows) && initialRows > 0 ? initialRows : 2;
        return Math.min(cards.length, getColumnCount(grid) * rowCount);
    }

    function setCardHidden(card, hidden) {
        card.classList.toggle('catalog-card--product-hidden', hidden);
        card.hidden = hidden;
    }

    function sync(state) {
        state.cards.forEach(function (card, index) {
            setCardHidden(card, index >= state.visibleCount);
        });

        if (state.toggleWrap) {
            state.toggleWrap.hidden = state.cards.length <= state.collapsedCount;
        }

        state.button.hidden = state.cards.length <= state.collapsedCount;
        state.button.textContent = state.expanded
            ? (state.button.getAttribute('data-catalog-product-grid-collapse-label') || TEXT.collapse)
            : (state.button.getAttribute('data-catalog-product-grid-expand-label') || TEXT.expand);
        state.button.setAttribute('aria-expanded', state.expanded ? 'true' : 'false');
    }

    function refresh(state) {
        var nextCollapsedCount = getInitialVisibleCount(state.grid, state.cards);

        if (state.expanded) {
            state.visibleCount = state.cards.length;
        } else {
            state.visibleCount = nextCollapsedCount;
        }

        state.collapsedCount = nextCollapsedCount;
        sync(state);
    }

    function ensureResizeListener() {
        // Flag sul namespace, non nella IIFE: se il bundle viene incluso due
        // volte (include duplicato nei template), il listener resta unico.
        if (ns.__catalogProductGridResizeInitialized) return;
        ns.__catalogProductGridResizeInitialized = true;

        var resizeTimer = null;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(function () {
                var registry = ns.__catalogProductGridResizeRoots || [];
                // Scarta i root non piu' connessi (fetch+re-init): niente leak.
                for (var i = registry.length - 1; i >= 0; i -= 1) {
                    if (!registry[i].root.isConnected) registry.splice(i, 1);
                }
                registry.forEach(function (entry) { entry.onResize(); });
            }, 120);
        });
    }

    function initRoot(root) {
        if (!root || root.__skillpressCatalogProductGridInitialized) return;

        var grid = root.querySelector('[data-catalog-product-grid-items]');
        var button = root.querySelector('[data-catalog-product-grid-toggle]');
        var state;

        if (!grid || !button) return;

        state = {
            button: button,
            cards: toArray(grid.querySelectorAll('[data-catalog-product-grid-card]')),
            collapsedCount: 0,
            expanded: button.getAttribute('aria-expanded') === 'true',
            grid: grid,
            root: root,
            toggleWrap: button.closest('.catalog-products-toggle'),
            visibleCount: 0
        };

        root.__skillpressCatalogProductGridInitialized = true;
        root.setAttribute('data-catalog-product-grid-init', '1');
        refresh(state);

        button.addEventListener('click', function () {
            state.expanded = !state.expanded;
            state.visibleCount = state.expanded ? state.cards.length : state.collapsedCount;
            sync(state);
            dispatch(root, 'sp:catalog-product-grid:toggle', {
                expanded: state.expanded,
                visibleCount: state.visibleCount
            });
        });

        // Registry condiviso sul namespace + listener resize unico: ogni root
        // registra il proprio refresh, il listener itera i root ancora connessi.
        ns.__catalogProductGridResizeRoots = ns.__catalogProductGridResizeRoots || [];
        ns.__catalogProductGridResizeRoots.push({
            root: root,
            onResize: function () {
                state.cards = toArray(grid.querySelectorAll('[data-catalog-product-grid-card]'));
                refresh(state);
            }
        });
        ensureResizeListener();
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-catalog-product-grid]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-catalog-product-grid]')).forEach(initRoot);
    }

    ns.CatalogProductGrid = { init: init };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
