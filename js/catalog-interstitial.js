(function () {
    'use strict';

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function getCardLinkLabel(card) {
        var explicitLabel = card.getAttribute('data-card-link-label');
        var title;

        if (explicitLabel) return explicitLabel;

        title = card.querySelector('.catalog-interstitial__heading, .catalog-interstitial__label');
        return title ? title.textContent.trim() : 'Apri contenuto Skillpress';
    }

    function appendOverlayLink(card) {
        var href = card.getAttribute('data-card-link');
        var label = getCardLinkLabel(card);
        var link;
        var text;

        if (!href || card.querySelector('.catalog-overlay-link')) return;

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
        if (!root || root.getAttribute('data-catalog-interstitial-init') === '1') return;

        root.setAttribute('data-catalog-interstitial-init', '1');
        toArray(root.querySelectorAll('[data-catalog-interstitial-card]')).forEach(appendOverlayLink);
    }

    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-catalog-interstitial]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-catalog-interstitial]')).forEach(initRoot);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.CatalogInterstitial = { init: init };
})();
