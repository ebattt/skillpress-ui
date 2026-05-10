/**
 * CatalogInterstitial -- card-grid interstitial promo block.
 *
 * @public-data data-catalog-interstitial, data-catalog-interstitial-init, data-catalog-interstitial-card, data-catalog-interstitial-link, data-catalog-interstitial-link-label
 * @public-event (none)
 */
(function () {
    'use strict';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function getCardLinkLabel(card) {
        var explicitLabel = card.getAttribute('data-catalog-interstitial-link-label');
        var title;

        if (explicitLabel) return explicitLabel;

        title = card.querySelector('.catalog-interstitial__heading, .catalog-interstitial__label');
        return title ? title.textContent.trim() : 'Apri contenuto Skillpress';
    }

    function appendOverlayLink(card) {
        var rawHref = card.getAttribute('data-catalog-interstitial-link');
        var label = getCardLinkLabel(card);
        var link;
        var text;

        if (!rawHref || card.querySelector('.catalog-overlay-link')) return;

        // F014: valida URL prima di assegnarlo a link.href.
        var href = typeof helpers.safeUrl === 'function'
            ? helpers.safeUrl(rawHref)
            : rawHref;
        if (!href) return;

        link = document.createElement('a');
        link.className = 'catalog-overlay-link';
        link.href = href;
        link.setAttribute('aria-label', label);

        text = document.createElement('span');
        text.className = 'catalog-overlay-link__text';
        text.textContent = label;

        link.appendChild(text);
        card.appendChild(link);
    }

    function initRoot(root) {
        if (!root || root.__skillpressCatalogInterstitialInitialized) return;
        root.__skillpressCatalogInterstitialInitialized = true;
        root.setAttribute('data-catalog-interstitial-init', '1');

        toArray(root.querySelectorAll('[data-catalog-interstitial-card]')).forEach(appendOverlayLink);
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-catalog-interstitial]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-catalog-interstitial]')).forEach(initRoot);
    }

    ns.CatalogInterstitial = { init: init };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
