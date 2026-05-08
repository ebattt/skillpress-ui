(function () {
    'use strict';

    var SDK_SRC = 'https://widget.feedaty.com/v3.0.0/js/2021/10214496/feedaty.min.js';
    var SDK_SELECTOR = 'script.feedaty_sdk, script[src*="feedaty.min.js"]';
    var sdkPromise = null;

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

        if (!root || root.getAttribute('data-feedaty-widget-init') === '1') return;

        widget = root.querySelector('.feedaty_widget');
        if (!widget) return;

        root.setAttribute('data-feedaty-widget-init', '1');

        if (root.getAttribute('data-feedaty-widget-sdk') === 'false') return;

        sdkSrc = root.getAttribute('data-feedaty-widget-sdk-src') || SDK_SRC;
        ensureSdk(sdkSrc).catch(function (error) {
            root.dispatchEvent(new CustomEvent('sp:feedaty-widget-error', {
                bubbles: true,
                detail: { error: error }
            }));
        });
    }

    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-feedaty-widget]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-feedaty-widget]')).forEach(initRoot);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.FeedatyWidget = {
        init: init,
        ensureSdk: ensureSdk
    };
})();
