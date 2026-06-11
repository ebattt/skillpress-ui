/**
 * BillingFormCard -- inline card form for billing record create/edit.
 *
 * @public-component billing-form-card
 * @public-data data-billing-form-card, data-billing-form-card-open, data-billing-form-card-close, data-billing-form-card-target, data-billing-form-card-mode, data-billing-form-card-record-id, data-billing-form-card-title, data-billing-form-card-submit, data-billing-form-card-create-label, data-billing-form-card-edit-label, data-billing-form-card-focus
 * @public-event sp:billing-form-card:open, sp:billing-form-card:close
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
                ? (title.getAttribute('data-billing-form-card-edit-label') || 'Modifica anagrafica')
                : (title.getAttribute('data-billing-form-card-create-label') || 'Nuova anagrafica');
        }
        if (submit) {
            submit.textContent = mode === 'edit'
                ? (submit.getAttribute('data-billing-form-card-edit-label') || 'Salva modifiche')
                : (submit.getAttribute('data-billing-form-card-create-label') || 'Crea anagrafica');
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
            dispatch(root, 'sp:billing-form-card:open', {
                mode: root.dataset.billingFormCardMode,
                recordId: root.dataset.billingFormCardRecordId || ''
            });
            if (detail.focus !== false) {
                var firstField = root.querySelector('input, select, textarea, button');
                if (firstField && typeof firstField.focus === 'function') firstField.focus();
            }
        } else {
            delete root.dataset.billingFormCardRecordId;
            dispatch(root, 'sp:billing-form-card:close');
        }
    }

    function initRoot(root) {
        if (!root || root.__skillpressBillingFormCardInitialized) return;
        root.__skillpressBillingFormCardInitialized = true;
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
            if (trigger.__skillpressBillingFormCardOpenInitialized) return;
            trigger.__skillpressBillingFormCardOpenInitialized = true;
            trigger.addEventListener('click', function (event) {
                var root = getRootByTrigger(trigger);
                if (!root) return;
                event.preventDefault();
                setOpen(root, true, {
                    mode: trigger.getAttribute('data-billing-form-card-mode') || 'create',
                    recordId: trigger.getAttribute('data-billing-form-card-record-id') || '',
                    focus: trigger.getAttribute('data-billing-form-card-focus') !== 'false'
                });
            });
        });
    }

    /** @public */
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

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
