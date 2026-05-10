/**
 * DashboardShell -- dashboard layout with view routing and mobile menu.
 *
 * @public-data data-dashboard-shell, data-dashboard-shell-initial-view, data-dashboard-shell-view, data-dashboard-shell-nav-item, data-dashboard-shell-navigate, data-dashboard-shell-navigate-disabled-mobile, data-dashboard-shell-mobile-menu, data-dashboard-shell-back, data-dashboard-shell-parent
 * @public-event sp:dashboard-shell:change
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};
    var mobileQuery = window.matchMedia('(max-width: 1023px)');

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    var parentNavMap = {
        'order-detail': 'orders',
        'quote-request': 'quotes'
    };

    function normalizeRoot(rootOrDocument) {
        var context = rootOrDocument || document;
        if (context.matches && context.matches('[data-dashboard-shell]')) return context;
        return context.querySelector ? context.querySelector('[data-dashboard-shell]') : null;
    }

    function findRoots(rootOrDocument) {
        var context = rootOrDocument || document;
        var roots = [];
        if (context.matches && context.matches('[data-dashboard-shell]')) roots.push(context);
        if (context.querySelectorAll) {
            roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-dashboard-shell]')));
        }
        return roots.filter(function (root, index, list) {
            return list.indexOf(root) === index;
        });
    }

    function getViews(root) {
        return Array.prototype.slice.call(root.querySelectorAll('[data-dashboard-shell-view]'));
    }

    function getNavItems(root) {
        return Array.prototype.slice.call(root.querySelectorAll('[data-dashboard-shell-nav-item]'));
    }

    function getViewName(view) {
        return view.getAttribute('data-dashboard-shell-view');
    }

    function getNavForView(root, viewName) {
        var view = root.querySelector('[data-dashboard-shell-view="' + viewName + '"]');
        return parentNavMap[viewName] || (view && view.getAttribute('data-dashboard-shell-parent')) || viewName;
    }

    function isValidView(root, viewName) {
        return !!root.querySelector('[data-dashboard-shell-view="' + viewName + '"]');
    }

    function dispatchChange(root, viewName) {
        dispatch(root, 'sp:dashboard-shell:change', {
            view: viewName,
            nav: getNavForView(root, viewName)
        });
    }

    function setCurrentNav(root, viewName) {
        var activeNav = getNavForView(root, viewName);
        getNavItems(root).forEach(function (item) {
            var isCurrent = item.getAttribute('data-dashboard-shell-nav-item') === activeNav;
            item.setAttribute('aria-current', isCurrent ? 'page' : 'false');
        });
    }

    function setViews(root, viewName) {
        getViews(root).forEach(function (view) {
            view.hidden = getViewName(view) !== viewName;
        });
    }

    function showMobileMenu(rootOrDocument) {
        var root = normalizeRoot(rootOrDocument);
        if (!root) return;

        var mobileMenu = root.querySelector('[data-dashboard-shell-mobile-menu]');
        var back = root.querySelector('[data-dashboard-shell-back]');
        if (mobileMenu) mobileMenu.hidden = false;
        if (back) back.hidden = true;
        getViews(root).forEach(function (view) {
            view.hidden = true;
        });
    }

    function navigate(rootOrDocument, viewName) {
        var root = normalizeRoot(rootOrDocument);
        if (!root || !isValidView(root, viewName)) return false;

        var mobileMenu = root.querySelector('[data-dashboard-shell-mobile-menu]');
        var back = root.querySelector('[data-dashboard-shell-back]');
        setViews(root, viewName);
        setCurrentNav(root, viewName);
        root.dataset.dashboardShellCurrentView = viewName;

        if (mobileMenu) mobileMenu.hidden = true;
        if (back) back.hidden = !mobileQuery.matches;

        dispatchChange(root, viewName);
        return true;
    }

    function getInitialView(root) {
        var requested = root.getAttribute('data-dashboard-shell-initial-view') || 'dashboard';
        return isValidView(root, requested) ? requested : 'dashboard';
    }

    function syncResponsiveState(root) {
        var current = root.dataset.dashboardShellCurrentView || getInitialView(root);
        if (mobileQuery.matches) {
            setCurrentNav(root, current);
            showMobileMenu(root);
            return;
        }
        navigate(root, current);
    }

    function handleClick(root, event) {
        var back = event.target.closest('[data-dashboard-shell-back]');
        if (back && root.contains(back)) {
            event.preventDefault();
            showMobileMenu(root);
            return;
        }

        var directTrigger = event.target.closest('[data-dashboard-shell-navigate]');
        var navTrigger = event.target.closest('[data-dashboard-shell-nav-item]');
        var trigger = directTrigger || navTrigger;
        if (!trigger || !root.contains(trigger)) return;
        if (directTrigger && mobileQuery.matches && directTrigger.hasAttribute('data-dashboard-shell-navigate-disabled-mobile')) return;

        var viewName = directTrigger
            ? directTrigger.getAttribute('data-dashboard-shell-navigate')
            : navTrigger.getAttribute('data-dashboard-shell-nav-item');

        if (!viewName || viewName === 'logout') return;
        event.preventDefault();
        navigate(root, viewName);
    }

    function initRoot(root) {
        if (!root || root.__skillpressDashboardShellInitialized) return;
        root.__skillpressDashboardShellInitialized = true;

        root.addEventListener('click', function (event) {
            handleClick(root, event);
        });

        root.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            var trigger = event.target.closest('[data-dashboard-shell-navigate]');
            if (!trigger || !root.contains(trigger)) return;
            if (event.target.closest('button, a, input, select, textarea')) return;
            if (mobileQuery.matches && trigger.hasAttribute('data-dashboard-shell-navigate-disabled-mobile')) return;
            event.preventDefault();
            navigate(root, trigger.getAttribute('data-dashboard-shell-navigate'));
        });

        syncResponsiveState(root);
    }

    /** @public */
    function init(rootOrDocument) {
        findRoots(rootOrDocument).forEach(initRoot);
    }

    function resyncAll() {
        findRoots(document).forEach(syncResponsiveState);
    }

    if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener('change', resyncAll);
    } else if (mobileQuery.addListener) {
        mobileQuery.addListener(resyncAll);
    }

    namespace.DashboardShell = {
        init: init,
        navigate: navigate,
        showMobileMenu: showMobileMenu
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
