/**
 * ConfirmDialog -- accessible confirmation dialog shell.
 *
 * @public-component sp-confirm-dialog
 * @public-data data-confirm-dialog, data-confirm-dialog-open, data-confirm-dialog-role
 * @public-event sp:confirm-dialog:open, sp:confirm-dialog:close, sp:confirm-dialog:confirm, sp:confirm-dialog:cancel
 */
(function () {
    'use strict';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    var FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function getRole(root, role) {
        return root.querySelector('[data-confirm-dialog-role="' + role + '"]');
    }

    // Contatore lock su document, non nella IIFE: se il bundle viene incluso
    // due volte, flag per-root e overflow salvato sono gia' condivisi sul DOM
    // e il conteggio deve restarlo, altrimenti diverge e il body resta bloccato.
    function lockBody(root) {
        if (!root || root.__confirmDialogBodyLocked) return;
        root.__confirmDialogBodyLocked = true;
        var count = document.__skillpressConfirmDialogLockCount || 0;
        if (count === 0) {
            document.body.__skillpressConfirmDialogOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
        document.__skillpressConfirmDialogLockCount = count + 1;
    }

    function unlockBody(root) {
        if (!root || !root.__confirmDialogBodyLocked) return;
        root.__confirmDialogBodyLocked = false;
        var count = Math.max(0, (document.__skillpressConfirmDialogLockCount || 0) - 1);
        document.__skillpressConfirmDialogLockCount = count;
        if (count === 0) {
            document.body.style.overflow = document.body.__skillpressConfirmDialogOverflow || '';
            document.body.__skillpressConfirmDialogOverflow = null;
        }
    }

    function open(root, triggerEl, detail) {
        if (!root) return;
        // Se gia' aperto, non riaprire: una seconda open() sovrascriverebbe
        // __lastTrigger con il panel e romperebbe il focus restore al close.
        if (!root.hidden) return;
        // API diretta: garantisce i listener anche senza passare da init().
        initRoot(root);
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
                return;
            }
            // Focus trap minimale: Tab/Shift+Tab ciclano i focusabili del panel.
            if (event.key === 'Tab' && !root.hidden) {
                var panel = root.querySelector('.sp-confirm-dialog__panel');
                if (!panel) return;
                var focusables = Array.prototype.filter.call(
                    panel.querySelectorAll(FOCUSABLE_SELECTOR),
                    function (el) { return el.getClientRects().length > 0; }
                );
                event.preventDefault();
                if (!focusables.length) {
                    if (typeof panel.focus === 'function') panel.focus();
                    return;
                }
                var index = focusables.indexOf(document.activeElement);
                var nextIndex;
                if (event.shiftKey) {
                    nextIndex = index <= 0 ? focusables.length - 1 : index - 1;
                } else {
                    nextIndex = index === -1 || index === focusables.length - 1 ? 0 : index + 1;
                }
                focusables[nextIndex].focus();
            }
        });
    }

    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-confirm-dialog]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-confirm-dialog]')));
        roots.forEach(initRoot);

        // Flag sul namespace, non nella IIFE: se il bundle viene incluso due
        // volte (include duplicato nei template), il listener resta unico.
        if (!ns.__confirmDialogOpenersInitialized) {
            ns.__confirmDialogOpenersInitialized = true;
            document.addEventListener('click', function (event) {
                var opener = event.target.closest('[data-confirm-dialog-open]');
                if (!opener) return;
                var selector = opener.getAttribute('data-confirm-dialog-open') || '[data-confirm-dialog]';
                var target;
                try {
                    target = document.querySelector(selector);
                } catch (err) {
                    if (window.console && console.error) {
                        console.error('[confirm-dialog] data-confirm-dialog-open: selettore CSS non valido "' + selector + '"', err);
                    }
                    return;
                }
                if (!target) {
                    if (window.console && console.error) {
                        console.error('[confirm-dialog] data-confirm-dialog-open: nessun elemento corrisponde al selettore "' + selector + '"');
                    }
                    return;
                }
                event.preventDefault();
                initRoot(target);
                open(target, opener, { trigger: opener });
            });
        }
    }

    /** @public */
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
