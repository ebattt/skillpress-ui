/**
 * DashboardDropdownBox -- collapsible dashboard module box.
 *
 * @public-component dashboard-dropdown-box
 * @public-data data-dashboard-dropdown-box, data-dashboard-dropdown-box-trigger, data-dashboard-dropdown-box-content
 * @public-event sp:dashboard-dropdown-box:open, sp:dashboard-dropdown-box:close
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

    function getTrigger(root) {
        return root.querySelector('[data-dashboard-dropdown-box-trigger]');
    }

    function getContent(root) {
        return root.querySelector('[data-dashboard-dropdown-box-content]');
    }

    function setExpanded(root, expanded) {
        var trigger = getTrigger(root);
        var content = getContent(root);
        if (!trigger || !content) return;

        trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        content.hidden = !expanded;
        dispatch(
            root,
            expanded ? 'sp:dashboard-dropdown-box:open' : 'sp:dashboard-dropdown-box:close'
        );
    }

    function initRoot(root) {
        if (!root || root.__skillpressDashboardDropdownBoxInitialized) return;
        root.__skillpressDashboardDropdownBoxInitialized = true;

        var trigger = getTrigger(root);
        var content = getContent(root);
        if (!trigger || !content) return;

        if (!trigger.hasAttribute('aria-expanded')) {
            trigger.setAttribute('aria-expanded', content.hidden ? 'false' : 'true');
        } else {
            content.hidden = trigger.getAttribute('aria-expanded') !== 'true';
        }

        trigger.addEventListener('click', function () {
            setExpanded(root, trigger.getAttribute('aria-expanded') !== 'true');
        });
    }

    /** @public */
    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-dashboard-dropdown-box]')) {
            roots.push(context);
        }
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-dashboard-dropdown-box]')));
        roots.forEach(initRoot);
    }

    namespace.DashboardDropdownBox = {
        init: init,
        setExpanded: setExpanded
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
