/**
 * CHECKOUT MOBILE SUMMARY -- Fixed bottom summary behavior.
 *
 * @public-data data-checkout-mobile-summary, data-checkout-mobile-summary-toggle, data-checkout-mobile-summary-overlay
 * @public-event sp:checkout-mobile-summary:open, sp:checkout-mobile-summary:close
 */
(function () {
    'use strict';

    var ROOT_SELECTOR = '[data-checkout-mobile-summary]';
    var TOGGLE_SELECTOR = '[data-checkout-mobile-summary-toggle]';
    var OVERLAY_SELECTOR = '[data-checkout-mobile-summary-overlay]';
    var CONTAINER_SELECTOR = '.checkout-mobile-summary__container';
    var EXPANDED_CLASS = 'checkout-mobile-summary--expanded';
    var INIT_FLAG = '__skillpressCheckoutMobileSummaryInitialized';
    var SWIPE_THRESHOLD = 36;

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function setExpanded(root, expanded) {
        var toggle = root.querySelector(TOGGLE_SELECTOR);

        root.classList.toggle(EXPANDED_CLASS, expanded);
        if (toggle) {
            toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
        dispatch(root, expanded ? 'sp:checkout-mobile-summary:open' : 'sp:checkout-mobile-summary:close', {
            expanded: expanded
        });
    }

    function bindOne(root) {
        var toggle;
        var overlay;
        var container;
        var initiallyExpanded;
        var touchStartY = null;

        if (!root || root[INIT_FLAG]) return root;

        toggle = root.querySelector(TOGGLE_SELECTOR);
        overlay = root.querySelector(OVERLAY_SELECTOR);
        container = root.querySelector(CONTAINER_SELECTOR);
        initiallyExpanded = root.classList.contains(EXPANDED_CLASS);

        if (toggle) {
            toggle.setAttribute('aria-expanded', initiallyExpanded ? 'true' : 'false');
            toggle.addEventListener('click', function () {
                setExpanded(root, !root.classList.contains(EXPANDED_CLASS));
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function () {
                setExpanded(root, false);
            });
        }

        if (container) {
            container.addEventListener('touchstart', function (event) {
                if (!event.touches || event.touches.length !== 1) return;
                touchStartY = event.touches[0].clientY;
            }, { passive: true });

            container.addEventListener('touchend', function (event) {
                var changedTouch;
                var deltaY;

                if (touchStartY == null || !event.changedTouches || event.changedTouches.length !== 1) {
                    touchStartY = null;
                    return;
                }

                changedTouch = event.changedTouches[0];
                deltaY = changedTouch.clientY - touchStartY;
                touchStartY = null;

                if (deltaY <= -SWIPE_THRESHOLD) {
                    setExpanded(root, true);
                } else if (deltaY >= SWIPE_THRESHOLD) {
                    setExpanded(root, false);
                }
            }, { passive: true });
        }

        root[INIT_FLAG] = true;
        return root;
    }

    /** @public */
    function init(target) {
        var nodes;

        if (target == null) {
            nodes = document.querySelectorAll(ROOT_SELECTOR);
        } else if (typeof target === 'string') {
            nodes = document.querySelectorAll(target);
        } else if (target.nodeType === 1) {
            if (target.matches(ROOT_SELECTOR)) {
                return bindOne(target);
            }
            nodes = target.querySelectorAll(ROOT_SELECTOR);
        } else if (target.nodeType === 9) {
            nodes = target.querySelectorAll(ROOT_SELECTOR);
        } else if (target.length != null) {
            nodes = target;
        } else {
            return null;
        }

        Array.prototype.forEach.call(nodes, bindOne);
        return nodes;
    }

    ns.CheckoutMobileSummary = {
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
