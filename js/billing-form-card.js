(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};

    function getRootByTrigger(trigger) {
        var targetId = trigger.getAttribute('data-billing-form-card-target');
        if (targetId) return document.getElementById(targetId);
        return trigger.closest('[data-billing-form-card]');
    }

    function updateLabels(root, mode) {
        var title = root.querySelector('[data-billing-form-card-title]');
        var submit = root.querySelector('[data-billing-form-card-submit]');
        if (title) {
            title.textContent = mode === 'edit'
                ? (title.getAttribute('data-edit-label') || 'Modifica anagrafica')
                : (title.getAttribute('data-create-label') || 'Nuova anagrafica');
        }
        if (submit) {
            submit.textContent = mode === 'edit'
                ? (submit.getAttribute('data-edit-label') || 'Salva modifiche')
                : (submit.getAttribute('data-create-label') || 'Crea anagrafica');
        }
    }

    function setOpen(root, open, options) {
        var detail = options || {};
        if (!root) return;

        root.hidden = !open;
        root.classList.toggle('billing-form-card--active', open);
        root.setAttribute('aria-hidden', open ? 'false' : 'true');

        if (open) {
            root.dataset.billingFormCardMode = detail.mode || 'create';
            if (detail.recordId) root.dataset.billingFormCardRecordId = detail.recordId;
            updateLabels(root, root.dataset.billingFormCardMode);
            if (detail.reset !== false && root.dataset.billingFormCardMode !== 'edit') {
                var form = root.querySelector('form');
                if (form && typeof form.reset === 'function') form.reset();
            }
            root.dispatchEvent(new CustomEvent('sp:billing-form-card-open', {
                bubbles: true,
                detail: {
                    mode: root.dataset.billingFormCardMode,
                    recordId: root.dataset.billingFormCardRecordId || ''
                }
            }));
            if (detail.focus !== false) {
                var firstField = root.querySelector('input, select, textarea, button');
                if (firstField && typeof firstField.focus === 'function') firstField.focus();
            }
        } else {
            delete root.dataset.billingFormCardRecordId;
            root.dispatchEvent(new CustomEvent('sp:billing-form-card-close', {
                bubbles: true
            }));
        }
    }

    function initRoot(root) {
        if (!root || root.__billingFormCardInitialized) return;
        root.__billingFormCardInitialized = true;
        root.setAttribute('aria-hidden', root.hidden ? 'true' : 'false');

        root.addEventListener('click', function (event) {
            var close = event.target.closest('[data-billing-form-card-close]');
            if (!close || !root.contains(close)) return;
            event.preventDefault();
            setOpen(root, false);
        });
    }

    function initOpenTriggers(scope) {
        var context = scope || document;
        var triggers = Array.prototype.slice.call(context.querySelectorAll('[data-billing-form-card-open]'));
        triggers.forEach(function (trigger) {
            if (trigger.__billingFormCardOpenInitialized) return;
            trigger.__billingFormCardOpenInitialized = true;
            trigger.addEventListener('click', function (event) {
                var root = getRootByTrigger(trigger);
                if (!root) return;
                event.preventDefault();
                setOpen(root, true, {
                    mode: trigger.getAttribute('data-billing-form-card-mode') || 'create',
                    recordId: trigger.getAttribute('data-record-id') || '',
                    focus: trigger.getAttribute('data-billing-form-card-focus') !== 'false'
                });
            });
        });
    }

    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-billing-form-card]')) {
            roots.push(context);
        }
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-billing-form-card]')));
        roots.forEach(initRoot);
        initOpenTriggers(context);
    }

    namespace.BillingFormCard = {
        init: init,
        setOpen: setOpen
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
