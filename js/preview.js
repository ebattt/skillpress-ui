/**
 * Preview -- popover preview panel anchored to a configurator option.
 *
 * @public-data data-preview, data-preview-trigger, data-preview-panel, data-preview-close, data-preview-option
 * @public-event sp:preview:open, sp:preview:close, sp:preview:sync
 *
 * Il JS genera/posiziona solo il guscio del popover di anteprima al click;
 * trigger, opzioni e contenuto della preview sono server-rendered.
 */
(function() {
    'use strict';

    var ROOT_SELECTOR = '[data-preview]';
    var TRIGGER_SELECTOR = '[data-preview-trigger]';
    var PANEL_SELECTOR = '[data-preview-panel]';
    var CLOSE_SELECTOR = '[data-preview-close]';
    var SELECT_SELECTOR = 'select';
    var OPTION_SELECTOR = '[data-preview-option], .media-choice-card';
    var INIT_FLAG = '__skillpressPreviewInitialized';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

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

    function safeImageUrl(value) {
        // safeUrl con whitelist estesa per data:image/* (preview puo' essere
        // generata client-side via SVG inline). Vieta sempre javascript:,
        // vbscript:, data:text/html.
        if (typeof helpers.safeUrl === 'function') {
            var allowed = ['http:', 'https:', 'data:', 'blob:'];
            var safe = helpers.safeUrl(value, { protocols: allowed });
            if (safe) {
                // Ulteriore guard: se data:, deve essere image/*
                if (safe.indexOf('data:') === 0 && safe.indexOf('data:image/') !== 0) {
                    return null;
                }
                return safe;
            }
            return null;
        }
        // Fallback senza helpers
        if (typeof value !== 'string' || !value) return null;
        var lower = value.toLowerCase().trim();
        if (lower.indexOf('javascript:') === 0) return null;
        if (lower.indexOf('vbscript:') === 0) return null;
        if (lower.indexOf('data:text/html') === 0) return null;
        return value;
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
            // F014: passa per safeUrl prima di assegnare img.src.
            var safe = safeImageUrl(fallbackImage);
            if (safe) {
                image.src = safe;
                image.alt = data.alt || data.title || image.alt;
            }
        }

        dispatch(root, 'sp:preview:sync', { source: currentSource });

        return root;
    }

    function isOpenState(root) {
        return root.classList.contains('preview--open');
    }

    function setOpen(root, open) {
        var trigger = root.querySelector(TRIGGER_SELECTOR);
        var panel = trigger ? getPanel(root, trigger) : root.querySelector(PANEL_SELECTOR);
        var wasOpen = isOpenState(root);

        root.classList.toggle('preview--open', open);
        if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (panel) panel.setAttribute('aria-hidden', open ? 'false' : 'true');

        // F015: focus management (save trigger on open, restore on close)
        if (open && !wasOpen) {
            var active = document.activeElement;
            if (active && active !== document.body && active !== document.documentElement) {
                root.__lastTrigger = active;
            } else if (trigger) {
                root.__lastTrigger = trigger;
            }
            var closeBtn = root.querySelector(CLOSE_SELECTOR);
            if (closeBtn && typeof closeBtn.focus === 'function') {
                try { closeBtn.focus(); } catch (e) { /* noop */ }
            } else if (panel && typeof panel.focus === 'function') {
                if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '-1');
                try { panel.focus(); } catch (e) { /* noop */ }
            }
        } else if (!open && wasOpen) {
            var lastTrigger = root.__lastTrigger;
            if (lastTrigger && typeof lastTrigger.focus === 'function') {
                try { lastTrigger.focus(); } catch (e) { /* noop */ }
            }
            root.__lastTrigger = null;
        }

        dispatch(root, open ? 'sp:preview:open' : 'sp:preview:close');
    }

    function onKeydown(event) {
        if (event.key !== 'Escape' && event.key !== 'Esc') return;
        var root = event.currentTarget;
        if (isOpenState(root)) {
            event.stopPropagation();
            setOpen(root, false);
        }
    }

    function onBackdropClick(event) {
        // Click-outside: chiudi se click su root container ma fuori dal panel.
        var root = event.currentTarget;
        if (!isOpenState(root)) return;
        var panel = root.querySelector(PANEL_SELECTOR);
        if (!panel) return;
        // Click direttamente su root (backdrop) o su nodi che non sono nel panel,
        // ma comunque dentro root: chiudiamo solo se il target era il root.
        if (event.target === root) {
            setOpen(root, false);
        }
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

    function initRoot(root) {
        if (!root || root[INIT_FLAG]) return root;
        root.addEventListener('click', onClick);
        root.addEventListener('change', onChange);
        // F015: keyboard (Escape) + click-outside backdrop
        root.addEventListener('keydown', onKeydown);
        root.addEventListener('click', onBackdropClick);
        sync(root);
        setOpen(root, root.classList.contains('preview--open'));
        root[INIT_FLAG] = true;
        return root;
    }

    /** @public */
    function init(scope) {
        var root = scope || document;
        if (root.matches && root.matches(ROOT_SELECTOR)) {
            initRoot(root);
        }
        Array.prototype.forEach.call(root.querySelectorAll(ROOT_SELECTOR), initRoot);
    }

    ns.Preview = { init: init, sync: sync };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
