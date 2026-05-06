(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var SELECTED_CLASS = 'product-stepper__step--selected';

    function getStepId(item) {
        return item.getAttribute('data-step-id') || '';
    }

    function selectItem(root, item) {
        if (!root || !item || !root.contains(item)) return;

        root.querySelectorAll('[data-order-status-steps-item]').forEach(function (candidate) {
            var selected = candidate === item;
            candidate.classList.toggle(SELECTED_CLASS, selected);
            candidate.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });

        root.dispatchEvent(new CustomEvent('sp:order-status-steps-change', {
            bubbles: true,
            detail: {
                stepId: getStepId(item),
                item: item
            }
        }));
    }

    function initRoot(root) {
        if (!root || root.__orderStatusStepsInitialized) return;
        root.__orderStatusStepsInitialized = true;

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
