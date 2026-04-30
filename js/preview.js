(function() {
    var ROOT_SELECTOR = '[data-preview]';
    var TRIGGER_SELECTOR = '[data-preview-trigger]';
    var PANEL_SELECTOR = '[data-preview-panel]';
    var CLOSE_SELECTOR = '[data-preview-close]';
    var SELECT_SELECTOR = 'select';
    var OPTION_SELECTOR = '[data-preview-option], .media-choice-card';
    var INIT_FLAG = '__skillpressPreviewInit';

    function escapeXml(value) {
        return String(value).replace(/[&<>"']/g, function(char) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&apos;'
            }[char];
        });
    }

    function getSourceData(source) {
        if (!source) return {};

        var label = source.dataset.previewTitle ||
            source.getAttribute('aria-label') ||
            source.textContent ||
            '';

        return {
            title: label.trim(),
            description: source.dataset.previewDescription || '',
            image: source.dataset.previewImage || '',
            alt: source.dataset.previewAlt || label.trim()
        };
    }

    function sourceFromSelect(select) {
        if (!select) return null;
        return select.options[select.selectedIndex] || null;
    }

    function sourceFromRoot(root) {
        return root.querySelector('.media-choice-card--selected') ||
            root.querySelector('.media-choice-card[aria-pressed="true"]') ||
            sourceFromSelect(root.querySelector(SELECT_SELECTOR));
    }

    function svgFromVisualOption(option, title) {
        var preview = option && option.querySelector && option.querySelector('.media-choice-card__preview');
        if (!preview) return '';

        var styles = window.getComputedStyle(preview);
        var bg = styles.backgroundColor || '#f3f4f6';
        var fg = styles.color || '#111418';
        var label = (title || preview.textContent || '').trim();

        return 'data:image/svg+xml,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320">' +
            '<rect width="320" height="320" fill="' + bg + '"/>' +
            '<text x="160" y="174" text-anchor="middle" fill="' + fg + '" font-size="44" font-weight="700" font-family="Arial, sans-serif">' + escapeXml(label) + '</text>' +
            '</svg>'
        );
    }

    function getPanel(root, trigger) {
        var id = trigger && trigger.getAttribute('aria-controls');
        if (id) {
            return document.getElementById(id);
        }
        return root.querySelector(PANEL_SELECTOR);
    }

    function sync(root, source) {
        if (!root) return root;

        var currentSource = source || sourceFromRoot(root);
        if (!currentSource) return root;

        var data = getSourceData(currentSource);
        var title = root.querySelector('.preview__title');
        var description = root.querySelector('.preview__description');
        var image = root.querySelector('.preview__image-media');
        var fallbackImage = data.image || svgFromVisualOption(currentSource, data.title);

        if (title && data.title) title.textContent = data.title;
        if (description && data.description) description.textContent = data.description;
        if (image && fallbackImage) {
            image.src = fallbackImage;
            image.alt = data.alt || data.title || image.alt;
        }

        root.dispatchEvent(new CustomEvent('sp:preview:sync', {
            bubbles: true,
            detail: { source: currentSource }
        }));

        return root;
    }

    function setOpen(root, open) {
        var trigger = root.querySelector(TRIGGER_SELECTOR);
        var panel = trigger ? getPanel(root, trigger) : root.querySelector(PANEL_SELECTOR);

        root.classList.toggle('preview--open', open);
        if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (panel) panel.setAttribute('aria-hidden', open ? 'false' : 'true');

        root.dispatchEvent(new CustomEvent(open ? 'sp:preview:open' : 'sp:preview:close', {
            bubbles: true
        }));
    }

    function onClick(event) {
        var root = event.currentTarget;
        var trigger = event.target.closest(TRIGGER_SELECTOR);
        var close = event.target.closest(CLOSE_SELECTOR);
        var option = event.target.closest(OPTION_SELECTOR);

        if (option && root.contains(option)) {
            sync(root, option);
        }

        if (trigger && root.contains(trigger)) {
            setOpen(root, !root.classList.contains('preview--open'));
            return;
        }

        if (close && root.contains(close)) {
            setOpen(root, false);
        }
    }

    function onChange(event) {
        var root = event.currentTarget;
        var select = event.target.closest(SELECT_SELECTOR);

        if (select && root.contains(select)) {
            sync(root, sourceFromSelect(select));
        }
    }

    function init(root) {
        if (!root || root[INIT_FLAG]) return root;
        root.addEventListener('click', onClick);
        root.addEventListener('change', onChange);
        sync(root);
        setOpen(root, root.classList.contains('preview--open'));
        root[INIT_FLAG] = true;
        return root;
    }

    document.addEventListener('DOMContentLoaded', function() {
        Array.prototype.forEach.call(document.querySelectorAll(ROOT_SELECTOR), init);
    });

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.Preview = { init: init, sync: sync };
})();
