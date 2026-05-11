/**
 * ConfirmDialog -- accessible confirmation dialog shell.
 *
 * @public-data data-confirm-dialog, data-confirm-dialog-open, data-confirm-dialog-role
 * @public-event sp:confirm-dialog:open, sp:confirm-dialog:close, sp:confirm-dialog:confirm, sp:confirm-dialog:cancel
 */
(function () {
    'use strict';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};
    var initializedOpeners = false;
    var BODY_LOCK_COUNT = 0;

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function getRole(root, role) {
        return root.querySelector('[data-confirm-dialog-role="' + role + '"]');
    }

    function lockBody(root) {
        if (!root || root.__confirmDialogBodyLocked) return;
        root.__confirmDialogBodyLocked = true;
        if (BODY_LOCK_COUNT === 0) {
            document.body.__skillpressConfirmDialogOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
        BODY_LOCK_COUNT += 1;
    }

    function unlockBody(root) {
        if (!root || !root.__confirmDialogBodyLocked) return;
        root.__confirmDialogBodyLocked = false;
        BODY_LOCK_COUNT = Math.max(0, BODY_LOCK_COUNT - 1);
        if (BODY_LOCK_COUNT === 0) {
            document.body.style.overflow = document.body.__skillpressConfirmDialogOverflow || '';
            document.body.__skillpressConfirmDialogOverflow = null;
        }
    }

    function open(root, triggerEl, detail) {
        if (!root) return;
        if (triggerEl && typeof triggerEl.focus === 'function') {
            root.__lastTrigger = triggerEl;
        } else {
            var active = document.activeElement;
            if (active && active !== document.body && active !== document.documentElement) {
                root.__lastTrigger = active;
            }
        }

        root.hidden = false;
        root.setAttribute('aria-hidden', 'false');
        lockBody(root);

        var panel = root.querySelector('.sp-confirm-dialog__panel');
        if (panel && typeof panel.focus === 'function') {
            panel.focus();
        }
        dispatch(root, 'sp:confirm-dialog:open', detail || {});
    }

    function close(root, detail) {
        if (!root) return;
        var wasOpen = !root.hidden;
        root.hidden = true;
        root.setAttribute('aria-hidden', 'true');
        unlockBody(root);

        if (wasOpen && root.__lastTrigger && typeof root.__lastTrigger.focus === 'function') {
            try { root.__lastTrigger.focus(); } catch (e) { /* noop */ }
        }
        root.__lastTrigger = null;
        dispatch(root, 'sp:confirm-dialog:close', detail || {});
    }

    function cancel(root, detail) {
        dispatch(root, 'sp:confirm-dialog:cancel', detail || {});
        close(root, detail);
    }

    function confirm(root, detail) {
        dispatch(root, 'sp:confirm-dialog:confirm', detail || {});
        close(root, detail);
    }

    function initRoot(root) {
        if (!root || root.__skillpressConfirmDialogInitialized) return;
        root.__skillpressConfirmDialogInitialized = true;
        if (root.hidden) root.setAttribute('aria-hidden', 'true');

        root.addEventListener('click', function (event) {
            var roleEl = event.target.closest('[data-confirm-dialog-role]');
            if (event.target === root) {
                cancel(root, { reason: 'backdrop' });
                return;
            }
            if (!roleEl || !root.contains(roleEl)) return;

            var role = roleEl.getAttribute('data-confirm-dialog-role');
            if (role === 'close' || role === 'cancel') {
                cancel(root, { reason: role });
            } else if (role === 'confirm') {
                confirm(root, { trigger: roleEl });
            }
        });

        root.addEventListener('keydown', function (event) {
            if ((event.key === 'Escape' || event.key === 'Esc') && !root.hidden) {
                event.stopPropagation();
                cancel(root, { reason: 'escape' });
            }
        });
    }

    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-confirm-dialog]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-confirm-dialog]')));
        roots.forEach(initRoot);

        if (!initializedOpeners) {
            initializedOpeners = true;
            document.addEventListener('click', function (event) {
                var opener = event.target.closest('[data-confirm-dialog-open]');
                if (!opener) return;
                var selector = opener.getAttribute('data-confirm-dialog-open');
                var target = selector ? document.querySelector(selector) : document.querySelector('[data-confirm-dialog]');
                if (!target) return;
                event.preventDefault();
                initRoot(target);
                open(target, opener, { trigger: opener });
            });
        }
    }

    ns.ConfirmDialog = {
        init: init,
        open: open,
        close: close,
        confirm: confirm,
        cancel: cancel
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
