/**
 * OrderStatusSteps -- horizontal step indicator for order lifecycle.
 *
 * @public-data data-order-status-steps, data-order-status-steps-item, data-order-status-steps-step-id
 * @public-event sp:order-status-steps:change
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};
    var SELECTED_CLASS = 'product-stepper__step--selected';

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function getStepId(item) {
        return item.getAttribute('data-order-status-steps-step-id') || '';
    }

    function selectItem(root, item) {
        if (!root || !item || !root.contains(item)) return;

        root.querySelectorAll('[data-order-status-steps-item]').forEach(function (candidate) {
            var selected = candidate === item;
            candidate.classList.toggle(SELECTED_CLASS, selected);
            candidate.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });

        dispatch(root, 'sp:order-status-steps:change', {
            stepId: getStepId(item),
            item: item
        });
    }

    function initRoot(root) {
        if (!root || root.__skillpressOrderStatusStepsInitialized) return;
        root.__skillpressOrderStatusStepsInitialized = true;

        var items = Array.prototype.slice.call(root.querySelectorAll('[data-order-status-steps-item]'));
        var selected = items.filter(function (item) {
            return item.classList.contains(SELECTED_CLASS) || item.getAttribute('aria-pressed') === 'true';
        })[0] || items[0];

        items.forEach(function (item) {
            item.setAttribute('aria-pressed', item === selected ? 'true' : 'false');
            item.addEventListener('click', function () {
                selectItem(root, item);
            });
        });
    }

    /** @public */
    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-order-status-steps]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-order-status-steps]')));
        roots.forEach(initRoot);
    }

    namespace.OrderStatusSteps = {
        init: init,
        selectItem: selectItem
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
