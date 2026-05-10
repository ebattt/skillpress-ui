/**
 * OrderStepDetail -- panel listener showing detail for selected order step.
 *
 * Listens to OrderStatusSteps to switch active panel.
 *
 * @public-data data-order-step-detail, data-order-step-detail-panel
 * @public-event sp:order-step-detail:change
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

    function getStepId(element) {
        return element ? element.getAttribute('data-order-status-steps-step-id') || '' : '';
    }

    function setPanel(panel, visible) {
        panel.hidden = !visible;
        panel.setAttribute('aria-hidden', visible ? 'false' : 'true');
    }

    function selectPanel(root, stepId) {
        if (!root || !stepId) return;

        var selectedPanel = null;
        root.querySelectorAll('[data-order-step-detail-panel]').forEach(function (panel) {
            var selected = getStepId(panel) === stepId;
            if (selected) selectedPanel = panel;
            setPanel(panel, selected);
        });

        dispatch(root, 'sp:order-step-detail:change', {
            stepId: stepId,
            panel: selectedPanel
        });
    }

    function getInitialStepId(root) {
        var visiblePanel = root.querySelector('[data-order-step-detail-panel]:not([hidden])');
        if (visiblePanel) return getStepId(visiblePanel);

        var pressed = root.querySelector('[data-order-status-steps-item][aria-pressed="true"]');
        if (pressed) return getStepId(pressed);

        var firstPanel = root.querySelector('[data-order-step-detail-panel]');
        return getStepId(firstPanel);
    }

    function initRoot(root) {
        if (!root || root.__skillpressOrderStepDetailInitialized) return;
        root.__skillpressOrderStepDetailInitialized = true;

        var initialStepId = getInitialStepId(root);
        if (initialStepId) selectPanel(root, initialStepId);

        function onStatusChange(event) {
            var detail = event.detail || {};
            if (detail.stepId) selectPanel(root, detail.stepId);
        }
        root.addEventListener('sp:order-status-steps:change', onStatusChange);
    }

    /** @public */
    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-order-step-detail]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-order-step-detail]')));
        roots.forEach(initRoot);
    }

    namespace.OrderStepDetail = {
        init: init,
        selectPanel: selectPanel
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
