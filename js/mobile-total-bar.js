/**
 * MOBILE TOTAL BAR -- riepilogo Totale del configuratore su mobile.
 *
 * @public-component mobile-bar
 * @public-data data-mobile-total-bar, data-mobile-total-bar-toggle, data-mobile-total-bar-panel, data-mobile-total-bar-config-toggle, data-mobile-total-bar-config-panel
 */
(function () {
    'use strict';

    var ROOT_SELECTOR = '[data-mobile-total-bar], .mobile-total-bar';
    var TOGGLE_SELECTOR = '[data-mobile-total-bar-toggle], .mobile-total-bar__handle';
    var PANEL_SELECTOR = '[data-mobile-total-bar-panel], .mobile-total-bar__expanded-section';
    var CONFIG_TOGGLE_SELECTOR = '[data-mobile-total-bar-config-toggle], .mobile-config-toggle';
    var CONFIG_PANEL_SELECTOR = '[data-mobile-total-bar-config-panel], .mobile-config-content';
    var EXPANDED_CLASS = 'mobile-total-bar--expanded';
    var CONFIG_EXPANDED_CLASS = 'mobile-config-toggle--active';
    var CONFIG_VISIBLE_CLASS = 'mobile-config-content--visible';
    var ROOT_INIT_FLAG = '__skillpressMobileTotalBarInitialized';
    var DOC_INIT_FLAG = '__skillpressMobileTotalBarDocumentInitialized';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function escapeAttrValue(value) {
        return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    }

    function resolvePanel(root, trigger, selector) {
        var id = trigger && trigger.getAttribute('aria-controls');
        var panel = null;
        if (id) {
            panel = root.querySelector('[id="' + escapeAttrValue(id) + '"]');
            return panel && panel.matches(selector) ? panel : null;
        }
        return root.querySelector(selector);
    }

    function outerToggle(root) {
        return root.querySelector(TOGGLE_SELECTOR);
    }

    function outerPanel(root) {
        return resolvePanel(root, outerToggle(root), PANEL_SELECTOR);
    }

    function configToggle(root) {
        return root.querySelector(CONFIG_TOGGLE_SELECTOR);
    }

    function configPanel(root) {
        return resolvePanel(root, configToggle(root), CONFIG_PANEL_SELECTOR);
    }

    function setHidden(panel, hidden) {
        if (!panel) return;
        panel.setAttribute('aria-hidden', hidden ? 'true' : 'false');
        if (hidden) panel.setAttribute('inert', '');
        else panel.removeAttribute('inert');
    }

    function syncOuter(root, expanded) {
        var toggle = outerToggle(root);
        var panel = outerPanel(root);
        root.classList.toggle(EXPANDED_CLASS, expanded);
        if (toggle) toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        setHidden(panel, !expanded);
    }

    function syncConfig(root, expanded) {
        var toggle = configToggle(root);
        var panel = configPanel(root);
        if (toggle) {
            toggle.classList.toggle(CONFIG_EXPANDED_CLASS, expanded);
            toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
        if (panel) panel.classList.toggle(CONFIG_VISIBLE_CLASS, expanded);
        setHidden(panel, !expanded);
    }

    function initialExpanded(root, toggle, panel, className) {
        if (panel && panel.hasAttribute('aria-hidden')) {
            return panel.getAttribute('aria-hidden') === 'false';
        }
        if (root.classList.contains(className)) return true;
        return !!(toggle && toggle.getAttribute('aria-expanded') === 'true');
    }

    function syncInitialState(root) {
        var toggle = outerToggle(root);
        var panel = outerPanel(root);
        var nestedToggle = configToggle(root);
        var nestedPanel = configPanel(root);
        var expanded = !!(toggle && panel) && initialExpanded(root, toggle, panel, EXPANDED_CLASS);
        var configExpanded = expanded && !!(nestedToggle && nestedPanel) && initialExpanded(
            nestedToggle || root,
            nestedToggle,
            nestedPanel,
            CONFIG_EXPANDED_CLASS
        );
        syncOuter(root, expanded);
        syncConfig(root, configExpanded);
    }

    function setConfigExpanded(root, expanded, sourceTrigger, returnFocus) {
        var panel = configPanel(root);
        if (!panel) return;
        syncConfig(root, expanded);
        if (expanded) root.__skillpressMobileTotalBarConfigTrigger = sourceTrigger || configToggle(root);
        if (returnFocus && !expanded) {
            var trigger = root.__skillpressMobileTotalBarConfigTrigger || configToggle(root);
            if (trigger && typeof trigger.focus === 'function') trigger.focus();
        }
        if (!expanded) root.__skillpressMobileTotalBarConfigTrigger = null;
    }

    function setExpanded(root, expanded, sourceTrigger, returnFocus) {
        if (!outerPanel(root)) return;
        if (!expanded) setConfigExpanded(root, false, null, false);
        syncOuter(root, expanded);
        if (expanded) root.__skillpressMobileTotalBarTrigger = sourceTrigger || outerToggle(root);
        if (returnFocus && !expanded) {
            var trigger = root.__skillpressMobileTotalBarTrigger || outerToggle(root);
            if (trigger && typeof trigger.focus === 'function') trigger.focus();
        }
        if (!expanded) root.__skillpressMobileTotalBarTrigger = null;
    }

    function closestInside(root, target, selector) {
        var match = target && target.closest ? target.closest(selector) : null;
        return match && root.contains(match) ? match : null;
    }

    function activate(root, target, event) {
        var nested = closestInside(root, target, CONFIG_TOGGLE_SELECTOR);
        var toggle;
        if (nested) {
            event.preventDefault();
            if (!root.classList.contains(EXPANDED_CLASS)) return true;
            setConfigExpanded(
                root,
                !nested.classList.contains(CONFIG_EXPANDED_CLASS),
                nested,
                false
            );
            return true;
        }
        toggle = closestInside(root, target, TOGGLE_SELECTOR);
        if (!toggle) return false;
        event.preventDefault();
        setExpanded(root, !root.classList.contains(EXPANDED_CLASS), toggle, false);
        return true;
    }

    function onClick(event) {
        activate(event.currentTarget, event.target, event);
    }

    function onKeydown(event) {
        var root = event.currentTarget;
        var trigger;
        if (event.key !== 'Enter' && event.key !== ' ') return;
        trigger = closestInside(root, event.target, TOGGLE_SELECTOR + ', ' + CONFIG_TOGGLE_SELECTOR);
        if (!trigger || trigger.tagName === 'BUTTON') return;
        activate(root, trigger, event);
    }

    function onDocumentKeydown(event) {
        var roots;
        var active;
        var root;
        if (event.key !== 'Escape' && event.key !== 'Esc') return;
        roots = Array.prototype.slice.call(document.querySelectorAll(ROOT_SELECTOR));
        active = document.activeElement;
        root = roots.find(function (candidate) {
            return candidate.contains(active) && candidate.classList.contains(EXPANDED_CLASS);
        }) || roots.find(function (candidate) {
            return candidate.classList.contains(EXPANDED_CLASS);
        });
        if (!root) return;
        if (configPanel(root) && configPanel(root).classList.contains(CONFIG_VISIBLE_CLASS)) {
            setConfigExpanded(root, false, null, true);
        } else {
            setExpanded(root, false, null, true);
        }
    }

    function bindOne(root) {
        if (!root) return null;
        syncInitialState(root);
        if (root[ROOT_INIT_FLAG]) return root;
        root.addEventListener('click', onClick);
        root.addEventListener('keydown', onKeydown);
        root[ROOT_INIT_FLAG] = true;
        return root;
    }

    /** @public */
    function init(target) {
        var nodes;
        if (target == null) {
            nodes = document.querySelectorAll(ROOT_SELECTOR);
        } else if (typeof target === 'string') {
            var scope = document.querySelector(target);
            if (!scope) return [];
            nodes = scope.matches(ROOT_SELECTOR) ? [scope] : scope.querySelectorAll(ROOT_SELECTOR);
        } else if (target.nodeType === 1) {
            if (target.matches(ROOT_SELECTOR)) {
                nodes = [target];
            } else {
                nodes = target.querySelectorAll(ROOT_SELECTOR);
            }
        } else if (target.nodeType === 9) {
            nodes = target.querySelectorAll(ROOT_SELECTOR);
        } else if (target.length != null) {
            nodes = target;
        } else {
            return null;
        }
        Array.prototype.forEach.call(nodes, bindOne);
        if (!document[DOC_INIT_FLAG]) {
            document.addEventListener('keydown', onDocumentKeydown);
            document[DOC_INIT_FLAG] = true;
        }
        return nodes;
    }

    ns.MobileTotalBar = {
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
