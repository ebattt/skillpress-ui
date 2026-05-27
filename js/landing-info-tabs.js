/**
 * LandingInfoTabs -- tab navigation for landing text sections.
 *
 * @public-data data-landing-info-tabs, data-landing-info-tabs-init, data-landing-info-tabs-tab, data-landing-info-tabs-panel
 * @public-event (none)
 */
(function () {
    'use strict';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function getTabs(root) {
        return toArray(root.querySelectorAll('[data-landing-info-tabs-tab]'));
    }

    function getPanels(root) {
        return toArray(root.querySelectorAll('[data-landing-info-tabs-panel]'));
    }

    function getNextTab(tabs, current, direction) {
        var index = tabs.indexOf(current);
        if (index === -1) return tabs[0];
        return tabs[(index + direction + tabs.length) % tabs.length];
    }

    function activateTab(root, tab, shouldFocus) {
        var tabs = getTabs(root);
        var panels = getPanels(root);
        var panelId = tab.getAttribute('aria-controls');

        tabs.forEach(function (item) {
            var isActive = item === tab;
            item.classList.toggle('landing-info-tabs__tab--active', isActive);
            item.setAttribute('aria-selected', isActive ? 'true' : 'false');
            item.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach(function (panel) {
            var isActive = panel.id === panelId;
            panel.hidden = !isActive;
            panel.classList.toggle('landing-info-tabs__panel--active', isActive);
        });

        if (shouldFocus) tab.focus();
    }

    function bindTab(root, tab) {
        tab.addEventListener('click', function () {
            activateTab(root, tab, false);
        });

        tab.addEventListener('keydown', function (event) {
            var tabs = getTabs(root);
            var target = null;

            if (event.key === 'ArrowRight') target = getNextTab(tabs, tab, 1);
            if (event.key === 'ArrowLeft') target = getNextTab(tabs, tab, -1);
            if (event.key === 'Home') target = tabs[0];
            if (event.key === 'End') target = tabs[tabs.length - 1];

            if (!target) return;
            event.preventDefault();
            activateTab(root, target, true);
        });
    }

    function initRoot(root) {
        var tabs;
        var selected;

        if (!root || root.__skillpressLandingInfoTabsInitialized) return;
        root.__skillpressLandingInfoTabsInitialized = true;
        root.setAttribute('data-landing-info-tabs-init', '1');

        tabs = getTabs(root);
        if (!tabs.length) return;

        tabs.forEach(function (tab) {
            bindTab(root, tab);
        });

        selected = tabs.filter(function (tab) {
            return tab.getAttribute('aria-selected') === 'true';
        })[0] || tabs[0];
        activateTab(root, selected, false);
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-landing-info-tabs]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-landing-info-tabs]')).forEach(initRoot);
    }

    ns.LandingInfoTabs = { init: init };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
