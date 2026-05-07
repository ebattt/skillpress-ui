(function () {
    'use strict';

    var TEXT = {
        collapse: 'Nascondi prodotti',
        expand: 'Mostra altri prodotti'
    };

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function getColumnCount(grid) {
        var templateColumns = window.getComputedStyle(grid).getPropertyValue('grid-template-columns');
        var count = templateColumns.split(' ').filter(Boolean).length;
        return templateColumns === 'none' || !count ? 1 : count;
    }

    function getInitialVisibleCount(grid, cards) {
        var initialRows = parseInt(grid.getAttribute('data-initial-rows') || '2', 10);
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
            ? (state.button.getAttribute('data-collapse-label') || TEXT.collapse)
            : (state.button.getAttribute('data-expand-label') || TEXT.expand);
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

    function initRoot(root) {
        if (!root || root.getAttribute('data-catalog-product-grid-init') === '1') return;

        var grid = root.querySelector('[data-catalog-product-grid-items]');
        var button = root.querySelector('[data-catalog-product-grid-toggle]');
        var resizeTimer = null;
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

        root.setAttribute('data-catalog-product-grid-init', '1');
        refresh(state);

        button.addEventListener('click', function () {
            state.expanded = !state.expanded;
            state.visibleCount = state.expanded ? state.cards.length : state.collapsedCount;
            sync(state);
            root.dispatchEvent(new CustomEvent('sp:catalog-product-grid-toggle', {
                bubbles: true,
                detail: { expanded: state.expanded, visibleCount: state.visibleCount }
            }));
        });

        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(function () {
                state.cards = toArray(grid.querySelectorAll('[data-catalog-product-grid-card]'));
                refresh(state);
            }, 120);
        });
    }

    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-catalog-product-grid]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-catalog-product-grid]')).forEach(initRoot);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.CatalogProductGrid = { init: init };
})();
