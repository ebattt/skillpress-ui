/**
 * CartProductCard -- expandable cart line item card.
 *
 * @public-data data-cart-product-card, data-cart-product-card-toggle, data-cart-product-card-details
 * @public-event sp:cart-product-card:open, sp:cart-product-card:close
 */
(function () {
    'use strict';

    var ROOT_SELECTOR = '[data-cart-product-card]';
    var TOGGLE_SELECTOR = '[data-cart-product-card-toggle]';
    var DETAILS_SELECTOR = '[data-cart-product-card-details]';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function resolveDetails(root, toggle) {
        var controls = toggle.getAttribute('aria-controls');
        if (controls) {
            var controlled = document.getElementById(controls);
            if (controlled && root.contains(controlled)) return controlled;
        }
        return root.querySelector(DETAILS_SELECTOR);
    }

    function setOpen(root, open) {
        var toggle = root.querySelector(TOGGLE_SELECTOR);
        var details = toggle ? resolveDetails(root, toggle) : root.querySelector(DETAILS_SELECTOR);
        if (!toggle || !details) return;

        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        details.setAttribute('aria-hidden', open ? 'false' : 'true');
        dispatch(root, open ? 'sp:cart-product-card:open' : 'sp:cart-product-card:close');
    }

    function bind(root) {
        if (!root || root.__skillpressCartProductCardInitialized) return;

        var toggle = root.querySelector(TOGGLE_SELECTOR);
        if (!toggle) return;

        var details = resolveDetails(root, toggle);
        if (!details) return;

        if (!toggle.hasAttribute('aria-expanded')) {
            toggle.setAttribute('aria-expanded', 'false');
        }
        if (!details.hasAttribute('aria-hidden')) {
            details.setAttribute('aria-hidden', toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        }

        toggle.addEventListener('click', function () {
            setOpen(root, toggle.getAttribute('aria-expanded') !== 'true');
        });

        root.__skillpressCartProductCardInitialized = true;
    }

    /** @public */
    function init(scope) {
        var container = scope || document;
        if (container.matches && container.matches(ROOT_SELECTOR)) bind(container);
        container.querySelectorAll(ROOT_SELECTOR).forEach(bind);
    }

    ns.CartProductCard = {
        init: init,
        setOpen: setOpen
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
