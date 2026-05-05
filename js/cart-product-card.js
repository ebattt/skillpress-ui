(function () {
    'use strict';

    var ROOT_SELECTOR = '[data-cart-product-card]';
    var TOGGLE_SELECTOR = '[data-cart-product-card-toggle]';
    var DETAILS_SELECTOR = '[data-cart-product-card-details]';

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
    }

    function bind(root) {
        if (!root || root.dataset.cartProductCardInitialized === 'true') return;

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

        root.dataset.cartProductCardInitialized = 'true';
    }

    function init(scope) {
        var container = scope || document;
        container.querySelectorAll(ROOT_SELECTOR).forEach(bind);
    }

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.CartProductCard = {
        init: init,
        setOpen: setOpen
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
