(function() {
    var ROOT_SELECTOR = '[data-content-tabs]';
    var TRIGGER_SELECTOR = '[data-content-tabs-trigger]';
    var PANEL_SELECTOR = '[data-content-tabs-panel]';
    var INIT_FLAG = '__skillpressContentTabsInit';

    function activate(root, trigger) {
        var panelId = trigger.getAttribute('aria-controls');
        if (!panelId) return;

        Array.prototype.forEach.call(root.querySelectorAll(TRIGGER_SELECTOR), function(item) {
            var isActive = item === trigger;
            item.classList.toggle('content-tabs__trigger--active', isActive);
            item.setAttribute('aria-selected', isActive ? 'true' : 'false');
            item.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        Array.prototype.forEach.call(root.querySelectorAll(PANEL_SELECTOR), function(panel) {
            var isActive = panel.id === panelId;
            panel.hidden = !isActive;
        });

        root.dispatchEvent(new CustomEvent('sp:content-tabs:change', {
            bubbles: true,
            detail: { panelId: panelId }
        }));
    }

    function onClick(event) {
        var trigger = event.target.closest(TRIGGER_SELECTOR);
        if (!trigger || !event.currentTarget.contains(trigger)) return;
        activate(event.currentTarget, trigger);
    }

    function onKeydown(event) {
        var current = event.target.closest(TRIGGER_SELECTOR);
        var triggers;
        var index;
        var next;

        if (!current || !event.currentTarget.contains(current)) return;
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

        triggers = Array.prototype.slice.call(event.currentTarget.querySelectorAll(TRIGGER_SELECTOR));
        index = triggers.indexOf(current);
        next = event.key === 'ArrowRight'
            ? triggers[(index + 1) % triggers.length]
            : triggers[(index - 1 + triggers.length) % triggers.length];

        event.preventDefault();
        next.focus();
        activate(event.currentTarget, next);
    }

    function init(root) {
        var active;
        if (!root || root[INIT_FLAG]) return root;
        root.addEventListener('click', onClick);
        root.addEventListener('keydown', onKeydown);
        active = root.querySelector(TRIGGER_SELECTOR + '[aria-selected="true"]') || root.querySelector(TRIGGER_SELECTOR);
        if (active) activate(root, active);
        root[INIT_FLAG] = true;
        return root;
    }

    document.addEventListener('DOMContentLoaded', function() {
        Array.prototype.forEach.call(document.querySelectorAll(ROOT_SELECTOR), init);
    });

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.ContentTabs = { init: init };
})();
