(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};

    function getRoot(element) {
        return element.closest('[data-order-product-dropdown]');
    }

    function setExpanded(root, expanded) {
        var trigger = root.querySelector('[data-order-product-dropdown-trigger]');
        var content = root.querySelector('[data-order-product-dropdown-content]');
        if (!trigger || !content) return;
        trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        content.hidden = !expanded;
        root.dispatchEvent(new CustomEvent(expanded ? 'sp:order-product-dropdown-open' : 'sp:order-product-dropdown-close', {
            bubbles: true
        }));
    }

    function setDetailsExpanded(root, expanded) {
        var trigger = root.querySelector('[data-order-product-dropdown-details-trigger]');
        var content = root.querySelector('[data-order-product-dropdown-details]');
        if (!trigger || !content) return;
        trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        content.hidden = !expanded;
    }

    function initRoot(root) {
        if (!root || root.__orderProductDropdownInitialized) return;
        root.__orderProductDropdownInitialized = true;

        var trigger = root.querySelector('[data-order-product-dropdown-trigger]');
        var content = root.querySelector('[data-order-product-dropdown-content]');
        var detailsTrigger = root.querySelector('[data-order-product-dropdown-details-trigger]');
        var details = root.querySelector('[data-order-product-dropdown-details]');

        if (trigger && content) {
            if (!trigger.hasAttribute('aria-expanded')) {
                trigger.setAttribute('aria-expanded', content.hidden ? 'false' : 'true');
            } else {
                content.hidden = trigger.getAttribute('aria-expanded') !== 'true';
            }
            trigger.addEventListener('click', function () {
                setExpanded(root, trigger.getAttribute('aria-expanded') !== 'true');
            });
        }

        if (detailsTrigger && details) {
            if (!detailsTrigger.hasAttribute('aria-expanded')) {
                detailsTrigger.setAttribute('aria-expanded', details.hidden ? 'false' : 'true');
            } else {
                details.hidden = detailsTrigger.getAttribute('aria-expanded') !== 'true';
            }
            detailsTrigger.addEventListener('click', function (event) {
                event.stopPropagation();
                setDetailsExpanded(root, detailsTrigger.getAttribute('aria-expanded') !== 'true');
            });
        }
    }

    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-order-product-dropdown]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-order-product-dropdown]')));
        roots.forEach(initRoot);
    }

    namespace.OrderProductDropdown = {
        init: init,
        setExpanded: setExpanded,
        setDetailsExpanded: setDetailsExpanded
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
