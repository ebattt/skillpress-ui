/**
 * OrderProductDropdown -- expandable order product detail card.
 *
 * @public-component order-product-dropdown
 * @public-data data-order-product-dropdown, data-order-product-dropdown-trigger, data-order-product-dropdown-content, data-order-product-dropdown-details, data-order-product-dropdown-details-trigger
 * @public-event sp:order-product-dropdown:open, sp:order-product-dropdown:close
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

    function getRoot(element) {
        return element.closest('[data-order-product-dropdown]');
    }

    function setExpanded(root, expanded) {
        var trigger = root.querySelector('[data-order-product-dropdown-trigger]');
        var content = root.querySelector('[data-order-product-dropdown-content]');
        if (!trigger || !content) return;
        trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        content.hidden = !expanded;
        dispatch(
            root,
            expanded ? 'sp:order-product-dropdown:open' : 'sp:order-product-dropdown:close'
        );
    }

    function setDetailsExpanded(root, expanded) {
        var trigger = root.querySelector('[data-order-product-dropdown-details-trigger]');
        var content = root.querySelector('[data-order-product-dropdown-details]');
        if (!trigger || !content) return;
        trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        content.hidden = !expanded;
    }

    function initRoot(root) {
        if (!root || root.__skillpressOrderProductDropdownInitialized) return;
        root.__skillpressOrderProductDropdownInitialized = true;

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

    /** @public */
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

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
