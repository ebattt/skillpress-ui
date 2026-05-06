(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};

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
        root.dispatchEvent(new CustomEvent(expanded ? 'sp:dashboard-dropdown-box-open' : 'sp:dashboard-dropdown-box-close', {
            bubbles: true
        }));
    }

    function initRoot(root) {
        if (!root || root.__dashboardDropdownBoxInitialized) return;
        root.__dashboardDropdownBoxInitialized = true;

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
