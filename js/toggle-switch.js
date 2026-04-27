/**
 * TOGGLE SWITCH -- Behavior minimo
 * Fonte: Skillpress-frontend/elements-ui/js/checkout/checkout-toggle-switch.js
 *        (toggle .active + setAttribute aria-checked).
 *
 * API:
 *   window.SkillpressUI.ToggleSwitch.init(rootOrSelector?)
 *   Default selector: '[data-skillpress-toggle-switch]'
 *
 * Comportamento:
 *   - click + Space + Enter
 *   - flippa la classe .is-checked e l'attributo aria-checked
 *   - emette CustomEvent('toggle-switch:change', { detail: { checked } }) bubbling
 *   - rispetta disabled / aria-disabled
 *   - NON gestisce stato di business (es. IVA, prezzi)
 *
 * Convenzione coerente con breadcrumb / accordion: nessun auto-init implicito
 * sul caricamento del modulo. La libreria espone solo init(), il consumer la
 * chiama (l'init e' idempotente).
 */
(function() {
    var DEFAULT_SELECTOR = '[data-skillpress-toggle-switch]';
    var INIT_FLAG = '__skillpressToggleSwitchInit';

    function isDisabled(el) {
        if (el.disabled === true) return true;
        if (el.getAttribute('aria-disabled') === 'true') return true;
        return false;
    }

    function isChecked(el) {
        if (el.classList.contains('is-checked')) return true;
        if (el.getAttribute('aria-checked') === 'true') return true;
        return false;
    }

    function setChecked(el, checked) {
        el.classList.toggle('is-checked', checked);
        el.setAttribute('aria-checked', checked ? 'true' : 'false');
        el.dispatchEvent(new CustomEvent('toggle-switch:change', {
            bubbles: true,
            detail: { checked: checked }
        }));
    }

    function toggle(el) {
        if (isDisabled(el)) return;
        setChecked(el, !isChecked(el));
    }

    function onClick(event) {
        toggle(event.currentTarget);
    }

    function onKeydown(event) {
        if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
            event.preventDefault();
            toggle(event.currentTarget);
        }
    }

    function bindOne(el) {
        if (!el || el[INIT_FLAG]) return el;

        // Sync iniziale: garantisce coerenza tra classe e aria-checked
        var checked = isChecked(el);
        el.classList.toggle('is-checked', checked);
        el.setAttribute('aria-checked', checked ? 'true' : 'false');

        // role di default se mancante (markup atteso: button)
        if (!el.hasAttribute('role')) {
            el.setAttribute('role', 'switch');
        }

        el.addEventListener('click', onClick);
        el.addEventListener('keydown', onKeydown);
        el[INIT_FLAG] = true;
        return el;
    }

    function init(target) {
        var nodes;

        if (target == null) {
            nodes = document.querySelectorAll(DEFAULT_SELECTOR);
        } else if (typeof target === 'string') {
            nodes = document.querySelectorAll(target);
        } else if (target.nodeType === 1) {
            // Singolo elemento root: bindalo se matcha, altrimenti scendi
            if (target.matches(DEFAULT_SELECTOR)) {
                bindOne(target);
                return target;
            }
            nodes = target.querySelectorAll(DEFAULT_SELECTOR);
        } else if (target.length != null) {
            nodes = target;
        } else {
            return null;
        }

        Array.prototype.forEach.call(nodes, bindOne);
        return nodes;
    }

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.ToggleSwitch = {
        init: init
    };
})();
