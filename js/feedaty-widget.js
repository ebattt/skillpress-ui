/**
 * FeedatyWidget -- third-party Feedaty review SDK loader.
 *
 * @public-data data-feedaty-widget, data-feedaty-widget-init, data-feedaty-widget-sdk, data-feedaty-widget-sdk-src
 * @public-event sp:feedaty-widget:error
 *
 * Markup-contract (audit moduli JS 2026-06): violazione FORMALE ma innocua.
 * Il JS inietta solo lo SDK Feedaty di terze parti (lazy-load script) e
 * l host del widget; nessun contenuto applicativo, gestito da SDK/backend.
 * Non richiede fix.
 */
(function () {
    'use strict';

    var SDK_SRC = 'https://widget.feedaty.com/v3.0.0/js/2021/10214496/feedaty.min.js';
    var SDK_SELECTOR = 'script.feedaty_sdk, script[src*="feedaty.min.js"]';
    var sdkPromise = null;

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

    function ensureSdk(src) {
        var existing = document.querySelector(SDK_SELECTOR);

        if (existing) return Promise.resolve(existing);
        if (sdkPromise) return sdkPromise;

        sdkPromise = new Promise(function (resolve, reject) {
            var script = document.createElement('script');

            script.className = 'feedaty_sdk';
            script.src = src || SDK_SRC;
            script.async = true;
            script.onload = function () { resolve(script); };
            script.onerror = function () {
                sdkPromise = null;
                reject(new Error('Feedaty SDK load failed'));
            };

            document.body.appendChild(script);
        });

        return sdkPromise;
    }

    function initRoot(root) {
        var widget;
        var sdkSrc;

        if (!root || root.__skillpressFeedatyWidgetInitialized) return;

        widget = root.querySelector('.feedaty_widget');
        if (!widget) return;

        root.__skillpressFeedatyWidgetInitialized = true;
        root.setAttribute('data-feedaty-widget-init', '1');

        if (root.getAttribute('data-feedaty-widget-sdk') === 'false') return;

        sdkSrc = root.getAttribute('data-feedaty-widget-sdk-src') || SDK_SRC;
        ensureSdk(sdkSrc).catch(function (error) {
            dispatch(root, 'sp:feedaty-widget:error', { error: error });
        });
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-feedaty-widget]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-feedaty-widget]')).forEach(initRoot);
    }

    ns.FeedatyWidget = {
        init: init,
        ensureSdk: ensureSdk
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
