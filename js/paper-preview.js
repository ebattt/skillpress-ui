(function() {
    var ROOT_SELECTOR = '[data-paper-preview]';
    var TRIGGER_SELECTOR = '[data-paper-preview-trigger]';
    var PANEL_SELECTOR = '[data-paper-preview-panel]';
    var CLOSE_SELECTOR = '[data-paper-preview-close]';
    var INIT_FLAG = '__skillpressPaperPreviewInit';

    function getPanel(root, trigger) {
        var id = trigger && trigger.getAttribute('aria-controls');
        if (id) {
            return document.getElementById(id);
        }
        return root.querySelector(PANEL_SELECTOR);
    }

    function setOpen(root, open) {
        var trigger = root.querySelector(TRIGGER_SELECTOR);
        var panel = trigger ? getPanel(root, trigger) : root.querySelector(PANEL_SELECTOR);

        root.classList.toggle('paper-preview--open', open);
        if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (panel) panel.setAttribute('aria-hidden', open ? 'false' : 'true');

        root.dispatchEvent(new CustomEvent(open ? 'sp:paper-preview:open' : 'sp:paper-preview:close', {
            bubbles: true
        }));
    }

    function onClick(event) {
        var root = event.currentTarget;
        var trigger = event.target.closest(TRIGGER_SELECTOR);
        var close = event.target.closest(CLOSE_SELECTOR);

        if (trigger && root.contains(trigger)) {
            setOpen(root, !root.classList.contains('paper-preview--open'));
            return;
        }

        if (close && root.contains(close)) {
            setOpen(root, false);
        }
    }

    function init(root) {
        if (!root || root[INIT_FLAG]) return root;
        root.addEventListener('click', onClick);
        setOpen(root, root.classList.contains('paper-preview--open'));
        root[INIT_FLAG] = true;
        return root;
    }

    document.addEventListener('DOMContentLoaded', function() {
        Array.prototype.forEach.call(document.querySelectorAll(ROOT_SELECTOR), init);
    });

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.PaperPreview = { init: init };
})();
