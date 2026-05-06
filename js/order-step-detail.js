(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};

    function getStepId(element) {
        return element ? element.getAttribute('data-step-id') || '' : '';
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

        root.dispatchEvent(new CustomEvent('sp:order-step-detail-change', {
            bubbles: true,
            detail: {
                stepId: stepId,
                panel: selectedPanel
            }
        }));
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
        if (!root || root.__orderStepDetailInitialized) return;
        root.__orderStepDetailInitialized = true;

        var initialStepId = getInitialStepId(root);
        if (initialStepId) selectPanel(root, initialStepId);

        root.addEventListener('sp:order-status-steps-change', function (event) {
            var detail = event.detail || {};
            if (detail.stepId) selectPanel(root, detail.stepId);
        });
    }

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

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
