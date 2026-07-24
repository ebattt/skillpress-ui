/**
 * Preview -- popover preview panel anchored to a configurator option.
 *
 * @public-component preview
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
    var OPTION_SELECTOR = '[data-preview-option], .sp-choice-card, .media-choice-card, .format-card';
    var INIT_FLAG = '__skillpressPreviewInitialized';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function safeImageUrl(value) {
        // safeUrl con whitelist per risorse immagine. Vieta sempre
        // javascript:, vbscript: e payload data: che non siano image/*.
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

    function sourceFromInput(input) {
        if (!input || input.type !== 'radio') return null;

        if (input.nextElementSibling && input.nextElementSibling.matches(OPTION_SELECTOR)) {
            return input.nextElementSibling;
        }

        return null;
    }

    function sourceFromRoot(root) {
        return sourceFromInput(root.querySelector('input[type="radio"]:checked')) ||
            root.querySelector('.sp-choice-card--selected, .media-choice-card--selected, .format-card--selected') ||
            root.querySelector('.sp-choice-card[aria-pressed="true"], .media-choice-card[aria-pressed="true"], .format-card[aria-pressed="true"]') ||
            sourceFromSelect(root.querySelector(SELECT_SELECTOR));
    }

    function getPanel(root, trigger) {
        var id = trigger && trigger.getAttribute('aria-controls');
        if (id) {
            return document.getElementById(id);
        }
        return root.querySelector(PANEL_SELECTOR);
    }

    function clearImage(image, imageWrap) {
        if (!image) return;
        image.removeAttribute('src');
        image.alt = '';
        if (imageWrap) imageWrap.hidden = true;
    }

    function sync(root, source) {
        if (!root) return root;

        var currentSource = source || sourceFromRoot(root);
        var trigger = root.querySelector(TRIGGER_SELECTOR);
        var data = getSourceData(currentSource);
        var safeImage = safeImageUrl(data.image);
        var available = Boolean(currentSource && safeImage);
        var title = root.querySelector('.preview__title');
        var description = root.querySelector('.preview__description');
        var image = root.querySelector('.preview__image-media');
        var imageWrap = image && image.closest('.preview__image-wrap');

        if (trigger) {
            trigger.disabled = !available;
            if (available) {
                trigger.removeAttribute('aria-disabled');
            } else {
                trigger.setAttribute('aria-disabled', 'true');
                if (isOpenState(root)) setOpen(root, false);
            }
        }

        if (title) title.textContent = data.title;
        if (description) description.textContent = data.description;
        if (image && safeImage) {
            image.src = safeImage;
            image.alt = data.alt || data.title || '';
            if (imageWrap) imageWrap.hidden = false;
        } else if (image) {
            clearImage(image, imageWrap);
        }

        dispatch(root, 'sp:preview:sync', { source: currentSource, available: available });

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
        if (trigger) {
            trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
            trigger.setAttribute('aria-label', open ? 'Chiudi anteprima' : 'Apri anteprima');
        }
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
            if (trigger.disabled) return;
            setOpen(root, !root.classList.contains('preview--open'));
            return;
        }

        if (close && root.contains(close)) {
            setOpen(root, false);
        }
    }

    function onImageError(event) {
        // L'evento "error" dell'<img> non fa bubbling: la root lo intercetta
        // solo registrandosi in capture phase (vedi initRoot).
        var root = event.currentTarget;
        var image = event.target;
        if (!image || !image.matches || !image.matches('.preview__image-media')) return;
        if (!root.contains(image)) return;

        clearImage(image, image.closest('.preview__image-wrap'));

        var trigger = root.querySelector(TRIGGER_SELECTOR);
        if (trigger) {
            trigger.disabled = true;
            trigger.setAttribute('aria-disabled', 'true');
        }
        if (isOpenState(root)) setOpen(root, false);
        dispatch(root, 'sp:preview:sync', {
            source: sourceFromRoot(root),
            available: false,
            error: true
        });
    }

    function onChange(event) {
        var root = event.currentTarget;
        var select = event.target.closest(SELECT_SELECTOR);
        var radio = event.target.closest('input[type="radio"]');

        if (select && root.contains(select)) {
            sync(root, sourceFromSelect(select));
        } else if (radio && root.contains(radio)) {
            sync(root, sourceFromInput(radio));
        }
    }

    function initRoot(root) {
        if (!root || root[INIT_FLAG]) return root;
        root.addEventListener('click', onClick);
        root.addEventListener('change', onChange);
        // F015: keyboard (Escape) + click-outside backdrop
        root.addEventListener('keydown', onKeydown);
        root.addEventListener('click', onBackdropClick);
        // "error" non fa bubbling: serve la capture phase per intercettarlo
        // dalla root quando l'immagine di anteprima risponde 404.
        root.addEventListener('error', onImageError, true);
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
