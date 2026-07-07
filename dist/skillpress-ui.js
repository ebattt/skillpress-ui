/*! @ebattt/skillpress-ui 0.5.4 -- bundle JS unico (23 moduli). Auto-init via data-attribute; per markup iniettato dopo il load usare window.SkillpressUI.init(scope). */

/* === js/_helpers.js === */
/**
 * SKILLPRESS UI -- helpers condivisi per js/<componente>.js
 *
 * Esposti come `window.SkillpressUI.helpers`. Caricare PRIMA degli altri
 * js/*.js: senza helpers i componenti non possono dispatchare custom events
 * normalizzati ne' validare URL.
 *
 * API pubblica:
 *   - helpers.safeUrl(value, opts)            -> sanitizza URL da dataset
 *   - helpers.validateAttrName(name)          -> valida data-attr scoping
 *   - helpers.autoInit(componentInit)         -> wire DOMContentLoaded coerente
 *   - helpers.escapeHtml(value)               -> escape per innerHTML
 *   - helpers.dispatch(target, name, detail)  -> CustomEvent sp:*:*
 *
 * Tutti gli helper sono guarded contro doppia inizializzazione (idempotenti).
 */
(function (global) {
    'use strict';

    var ns = global.SkillpressUI = global.SkillpressUI || {};
    if (ns.helpers) return; // idempotente
    ns.helpers = {};

    var FORBIDDEN_PROTOCOLS = ['javascript:', 'vbscript:'];

    /**
     * @public
     * Sanitizza un URL preso da dataset. Rifiuta sempre javascript:, vbscript:,
     * data:text/html. Default ammette solo http: e https:; con
     * `opts.protocols` puoi estendere (es. data:image/png consentito per
     * preview embedded).
     *
     * @param {string} value
     * @param {{ protocols?: string[], allowRelative?: boolean }} [opts]
     * @returns {string|null} URL valido o null se non sicuro
     */
    ns.helpers.safeUrl = function (value, opts) {
        opts = opts || {};
        if (typeof value !== 'string' || !value) return null;

        var trimmed = value.trim();
        if (!trimmed) return null;

        var lower = trimmed.toLowerCase();
        for (var i = 0; i < FORBIDDEN_PROTOCOLS.length; i++) {
            if (lower.indexOf(FORBIDDEN_PROTOCOLS[i]) === 0) return null;
        }
        // data:text/html e' sempre vietato
        if (lower.indexOf('data:text/html') === 0) return null;

        var allowed = opts.protocols || ['http:', 'https:'];
        try {
            var parsed = new URL(trimmed, global.location ? global.location.href : undefined);
            if (allowed.indexOf(parsed.protocol) === -1) return null;
            return parsed.href;
        } catch (e) {
            // URL relativi (path-only): se permesso e shape coerente, ritorna grezzo
            if (opts.allowRelative !== false) {
                if (trimmed.charAt(0) === '/' || trimmed.charAt(0) === '#' || trimmed.charAt(0) === '?') {
                    return trimmed;
                }
            }
            return null;
        }
    };

    /**
     * @public
     * Valida un nome data-attribute component-scoped. Tollera lowercase, cifre
     * e trattini. Lunghezza max 80 char (cap dataset).
     */
    ns.helpers.validateAttrName = function (name) {
        return typeof name === 'string' && /^[a-z][a-z0-9-]{0,80}$/.test(name);
    };

    /**
     * Wrapper coerente per DOMContentLoaded vs script late-load.
     * Se il DOM e' pronto, esegue subito; altrimenti attende il signal.
     * Il caller riceve sempre `document` come argomento.
     */
    ns.helpers.autoInit = function (componentInit) {
        if (typeof componentInit !== 'function') return;
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                componentInit(document);
            });
        } else {
            componentInit(document);
        }
    };

    /**
     * Escape HTML conservativo per uso in innerHTML quando il valore arriva
     * da textContent/dataset/CMS. Non sostituisce sanitization server-side.
     */
    ns.helpers.escapeHtml = function (value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    var EVENT_NAME_RE = /^sp:[a-z][a-z0-9-]*:[a-z][a-z0-9-]*$/;

    /**
     * @public
     * Dispatcha un CustomEvent normalizzato sp:{component}:{action}.
     * Lancia se il nome non rispetta il regex (errore di programmazione,
     * non runtime user-input).
     *
     * @param {EventTarget} target
     * @param {string} eventName
     * @param {*} [detail]
     * @returns {boolean} ritorno di dispatchEvent (sempre true se non cancellato)
     */
    ns.helpers.dispatch = function (target, eventName, detail) {
        if (!target || typeof target.dispatchEvent !== 'function') return false;
        if (!EVENT_NAME_RE.test(eventName)) {
            throw new Error('SkillpressUI.helpers.dispatch: invalid sp:* event name "' + eventName + '"');
        }
        return target.dispatchEvent(new CustomEvent(eventName, {
            bubbles: true,
            cancelable: false,
            detail: detail
        }));
    };
})(typeof window !== 'undefined' ? window : this);
;

/* === js/accordion.js === */
/**
 * Accordion -- collapsible sections with single-open behavior.
 *
 * @public-component sp-accordion
 * @public-data data-accordion, data-accordion-section, data-accordion-trigger
 * @public-event sp:accordion:open, sp:accordion:close
 */
(function() {
    'use strict';

    var ACCORDION_SELECTOR = '[data-accordion]';
    var SECTION_SELECTOR = '[data-accordion-section]';
    var TRIGGER_SELECTOR = '[data-accordion-trigger]';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function emitEvent(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function getSections(container) {
        return Array.prototype.slice.call(container.querySelectorAll(SECTION_SELECTOR));
    }

    function getTrigger(section) {
        return section.querySelector(TRIGGER_SELECTOR);
    }

    function getContent(section) {
        var children = Array.prototype.slice.call(section.children);
        for (var i = 0; i < children.length; i++) {
            if (children[i].classList.contains('sp-accordion__content')) {
                return children[i];
            }
        }
        return null;
    }

    function setContentHeight(section, isExpanded, animate) {
        var content = getContent(section);

        if (!content) {
            return;
        }

        if (!animate) {
            content.style.maxHeight = isExpanded ? 'none' : '0px';
            content.style.overflow = isExpanded ? 'visible' : 'hidden';
            return;
        }

        content.style.overflow = 'hidden';

        if (isExpanded) {
            content.style.maxHeight = '0px';
            content.offsetHeight;
            content.style.maxHeight = content.scrollHeight + 'px';

            content.addEventListener('transitionend', function onOpenEnd(event) {
                if (event.target !== content || event.propertyName !== 'max-height') {
                    return;
                }
                content.removeEventListener('transitionend', onOpenEnd);
                if (section.classList.contains('sp-accordion__section--expanded')) {
                    content.style.maxHeight = 'none';
                    content.style.overflow = 'visible';
                }
            });
            return;
        }

        content.style.maxHeight = content.scrollHeight + 'px';
        content.offsetHeight;
        content.style.maxHeight = '0px';
    }

    function syncSection(section, isExpanded, animate) {
        var trigger = getTrigger(section);

        section.classList.toggle('sp-accordion__section--expanded', isExpanded);
        setContentHeight(section, isExpanded, animate !== false);

        if (trigger) {
            trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
    }

    function emit(section, isExpanded) {
        emitEvent(section, isExpanded ? 'sp:accordion:open' : 'sp:accordion:close');
    }

    function closeSiblings(container, currentSection) {
        getSections(container).forEach(function(section) {
            if (section === currentSection || !section.classList.contains('sp-accordion__section--expanded')) {
                return;
            }

            syncSection(section, false, true);
            emit(section, false);
        });
    }

    function onClick(event) {
        var trigger = event.target.closest(TRIGGER_SELECTOR);
        var container = event.currentTarget;
        var section;
        var nextState;

        if (!trigger || !container.contains(trigger)) {
            return;
        }

        section = trigger.closest(SECTION_SELECTOR);
        if (!section) {
            return;
        }

        nextState = !section.classList.contains('sp-accordion__section--expanded');

        syncSection(section, nextState, true);
        emit(section, nextState);

        if (nextState) {
            window.requestAnimationFrame(function() {
                closeSiblings(container, section);
            });
        }
    }

    function initContainer(container) {
        if (!container || container.__skillpressAccordionInitialized) {
            return container;
        }

        container.addEventListener('click', onClick);
        container.__skillpressAccordionInitialized = true;

        getSections(container).forEach(function(section) {
            syncSection(section, section.classList.contains('sp-accordion__section--expanded'), false);
        });

        return container;
    }

    /** @public */
    function init(scope) {
        var root = scope || document;
        if (root.matches && root.matches(ACCORDION_SELECTOR)) {
            initContainer(root);
        }
        Array.prototype.forEach.call(root.querySelectorAll(ACCORDION_SELECTOR), initContainer);
    }

    ns.Accordion = {
        init: init
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/billing-form-card.js === */
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
;

/* === js/cart-product-card.js === */
/**
 * CartProductCard -- expandable cart line item card.
 *
 * @public-component cart-product-card
 * @public-data data-cart-product-card, data-cart-product-card-toggle, data-cart-product-card-details
 * @public-event sp:cart-product-card:open, sp:cart-product-card:close
 */
(function () {
    'use strict';

    var ROOT_SELECTOR = '[data-cart-product-card]';
    var TOGGLE_SELECTOR = '[data-cart-product-card-toggle]';
    var DETAILS_SELECTOR = '[data-cart-product-card-details]';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function resolveDetails(root, toggle) {
        var controls = toggle.getAttribute('aria-controls');
        if (controls) {
            var controlled = document.getElementById(controls);
            if (controlled && root.contains(controlled)) return controlled;
        }
        return root.querySelector(DETAILS_SELECTOR);
    }

    function setOpen(root, open) {
        var toggle = root.querySelector(TOGGLE_SELECTOR);
        var details = toggle ? resolveDetails(root, toggle) : root.querySelector(DETAILS_SELECTOR);
        if (!toggle || !details) return;

        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        details.setAttribute('aria-hidden', open ? 'false' : 'true');
        dispatch(root, open ? 'sp:cart-product-card:open' : 'sp:cart-product-card:close');
    }

    function bind(root) {
        if (!root || root.__skillpressCartProductCardInitialized) return;

        var toggle = root.querySelector(TOGGLE_SELECTOR);
        if (!toggle) return;

        var details = resolveDetails(root, toggle);
        if (!details) return;

        if (!toggle.hasAttribute('aria-expanded')) {
            toggle.setAttribute('aria-expanded', 'false');
        }
        if (!details.hasAttribute('aria-hidden')) {
            details.setAttribute('aria-hidden', toggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
        }

        toggle.addEventListener('click', function () {
            setOpen(root, toggle.getAttribute('aria-expanded') !== 'true');
        });

        root.__skillpressCartProductCardInitialized = true;
    }

    /** @public */
    function init(scope) {
        var container = scope || document;
        if (container.matches && container.matches(ROOT_SELECTOR)) bind(container);
        container.querySelectorAll(ROOT_SELECTOR).forEach(bind);
    }

    ns.CartProductCard = {
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
;

/* === js/catalog-interstitial.js === */
/**
 * CatalogInterstitial -- card-grid interstitial promo block.
 *
 * @public-component catalog-interstitial
 * @public-data data-catalog-interstitial, data-catalog-interstitial-init, data-catalog-interstitial-card, data-catalog-interstitial-link, data-catalog-interstitial-link-label
 * @public-event (none)
 */
(function () {
    'use strict';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function getCardLinkLabel(card) {
        var explicitLabel = card.getAttribute('data-catalog-interstitial-link-label');
        var title;

        if (explicitLabel) return explicitLabel;

        title = card.querySelector('.catalog-interstitial__heading, .catalog-interstitial__label');
        return title ? title.textContent.trim() : 'Apri contenuto Skillpress';
    }

    function appendOverlayLink(card) {
        var rawHref = card.getAttribute('data-catalog-interstitial-link');
        var label = getCardLinkLabel(card);
        var link;
        var text;

        if (!rawHref || card.querySelector('.catalog-overlay-link')) return;

        // F014: valida URL prima di assegnarlo a link.href.
        var href = typeof helpers.safeUrl === 'function'
            ? helpers.safeUrl(rawHref)
            : rawHref;
        if (!href) return;

        link = document.createElement('a');
        link.className = 'catalog-overlay-link';
        link.href = href;
        link.setAttribute('aria-label', label);

        text = document.createElement('span');
        text.className = 'catalog-overlay-link__text';
        text.textContent = label;

        link.appendChild(text);
        card.appendChild(link);
    }

    function initRoot(root) {
        if (!root || root.__skillpressCatalogInterstitialInitialized) return;
        root.__skillpressCatalogInterstitialInitialized = true;
        root.setAttribute('data-catalog-interstitial-init', '1');

        toArray(root.querySelectorAll('[data-catalog-interstitial-card]')).forEach(appendOverlayLink);
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-catalog-interstitial]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-catalog-interstitial]')).forEach(initRoot);
    }

    ns.CatalogInterstitial = { init: init };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/catalog-product-grid.js === */
/**
 * CatalogProductGrid -- product grid with expand/collapse toggle.
 *
 * @public-component catalog-product-grid
 * @public-data data-catalog-product-grid, data-catalog-product-grid-init, data-catalog-product-grid-card, data-catalog-product-grid-items, data-catalog-product-grid-toggle, data-catalog-product-grid-initial-rows, data-catalog-product-grid-expand-label, data-catalog-product-grid-collapse-label
 * @public-event sp:catalog-product-grid:toggle
 */
(function () {
    'use strict';

    var TEXT = {
        collapse: 'Nascondi prodotti',
        expand: 'Mostra altri prodotti'
    };

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function getColumnCount(grid) {
        var templateColumns = window.getComputedStyle(grid).getPropertyValue('grid-template-columns');
        var count = templateColumns.split(' ').filter(Boolean).length;
        return templateColumns === 'none' || !count ? 1 : count;
    }

    function getInitialVisibleCount(grid, cards) {
        var initialRows = parseInt(grid.getAttribute('data-catalog-product-grid-initial-rows') || '2', 10);
        var rowCount = Number.isFinite(initialRows) && initialRows > 0 ? initialRows : 2;
        return Math.min(cards.length, getColumnCount(grid) * rowCount);
    }

    function setCardHidden(card, hidden) {
        card.classList.toggle('catalog-card--product-hidden', hidden);
        card.hidden = hidden;
    }

    function sync(state) {
        state.cards.forEach(function (card, index) {
            setCardHidden(card, index >= state.visibleCount);
        });

        if (state.toggleWrap) {
            state.toggleWrap.hidden = state.cards.length <= state.collapsedCount;
        }

        state.button.hidden = state.cards.length <= state.collapsedCount;
        state.button.textContent = state.expanded
            ? (state.button.getAttribute('data-catalog-product-grid-collapse-label') || TEXT.collapse)
            : (state.button.getAttribute('data-catalog-product-grid-expand-label') || TEXT.expand);
        state.button.setAttribute('aria-expanded', state.expanded ? 'true' : 'false');
    }

    function refresh(state) {
        var nextCollapsedCount = getInitialVisibleCount(state.grid, state.cards);

        if (state.expanded) {
            state.visibleCount = state.cards.length;
        } else {
            state.visibleCount = nextCollapsedCount;
        }

        state.collapsedCount = nextCollapsedCount;
        sync(state);
    }

    function initRoot(root) {
        if (!root || root.__skillpressCatalogProductGridInitialized) return;

        var grid = root.querySelector('[data-catalog-product-grid-items]');
        var button = root.querySelector('[data-catalog-product-grid-toggle]');
        var resizeTimer = null;
        var state;

        if (!grid || !button) return;

        state = {
            button: button,
            cards: toArray(grid.querySelectorAll('[data-catalog-product-grid-card]')),
            collapsedCount: 0,
            expanded: button.getAttribute('aria-expanded') === 'true',
            grid: grid,
            root: root,
            toggleWrap: button.closest('.catalog-products-toggle'),
            visibleCount: 0
        };

        root.__skillpressCatalogProductGridInitialized = true;
        root.setAttribute('data-catalog-product-grid-init', '1');
        refresh(state);

        button.addEventListener('click', function () {
            state.expanded = !state.expanded;
            state.visibleCount = state.expanded ? state.cards.length : state.collapsedCount;
            sync(state);
            dispatch(root, 'sp:catalog-product-grid:toggle', {
                expanded: state.expanded,
                visibleCount: state.visibleCount
            });
        });

        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(function () {
                state.cards = toArray(grid.querySelectorAll('[data-catalog-product-grid-card]'));
                refresh(state);
            }, 120);
        });
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-catalog-product-grid]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-catalog-product-grid]')).forEach(initRoot);
    }

    ns.CatalogProductGrid = { init: init };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/catalog-stage.js === */
/**
 * CatalogStage -- hero/landing slide stage with optional autoplay.
 *
 * @public-component catalog-stage
 * @public-data data-catalog-stage, data-catalog-stage-init, data-catalog-stage-slide, data-catalog-stage-dot, data-catalog-stage-autoplay, data-catalog-stage-interval
 * @public-event (none)
 */
(function () {
    'use strict';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function setActive(state, index) {
        var nextIndex = (index + state.slides.length) % state.slides.length;

        state.slides.forEach(function (slide, slideIndex) {
            var active = slideIndex === nextIndex;
            slide.classList.toggle('catalog-stage__slide--active', active);
            slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        });

        state.dots.forEach(function (dot, dotIndex) {
            var active = dotIndex === nextIndex;
            dot.classList.toggle('catalog-stage__dot--active', active);
            dot.setAttribute('aria-current', active ? 'true' : 'false');
        });

        state.activeIndex = nextIndex;
    }

    function startAutoplay(state) {
        if (!state.autoplay || state.slides.length < 2 || state.timer) return;

        state.timer = window.setInterval(function () {
            setActive(state, state.activeIndex + 1);
        }, state.interval);
    }

    function stopAutoplay(state) {
        if (!state.timer) return;
        window.clearInterval(state.timer);
        state.timer = null;
    }

    function initRoot(root) {
        if (!root || root.__skillpressCatalogStageInitialized) return;

        var slides = toArray(root.querySelectorAll('[data-catalog-stage-slide]'));
        var dots = toArray(root.querySelectorAll('[data-catalog-stage-dot]'));
        var state;

        if (slides.length < 2) return;

        state = {
            activeIndex: Math.max(0, slides.findIndex(function (slide) {
                return slide.classList.contains('catalog-stage__slide--active');
            })),
            autoplay: root.getAttribute('data-catalog-stage-autoplay') !== 'false',
            dots: dots,
            interval: parseInt(root.getAttribute('data-catalog-stage-interval'), 10) || 4500,
            root: root,
            slides: slides,
            timer: null
        };

        root.__skillpressCatalogStageInitialized = true;
        root.setAttribute('data-catalog-stage-init', '1');

        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                setActive(state, index);
                stopAutoplay(state);
            });
        });

        root.addEventListener('mouseenter', function () { stopAutoplay(state); });
        root.addEventListener('mouseleave', function () { startAutoplay(state); });
        root.addEventListener('focusin', function () { stopAutoplay(state); });
        root.addEventListener('focusout', function () { startAutoplay(state); });

        setActive(state, state.activeIndex);
        startAutoplay(state);
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-catalog-stage]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-catalog-stage]')).forEach(initRoot);
    }

    ns.CatalogStage = { init: init };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/checkout-mobile-summary.js === */
/**
 * CHECKOUT MOBILE SUMMARY -- Fixed bottom summary behavior.
 *
 * @public-component checkout-mobile-summary
 * @public-data data-checkout-mobile-summary, data-checkout-mobile-summary-toggle, data-checkout-mobile-summary-overlay
 * @public-event sp:checkout-mobile-summary:open, sp:checkout-mobile-summary:close
 */
(function () {
    'use strict';

    var ROOT_SELECTOR = '[data-checkout-mobile-summary]';
    var TOGGLE_SELECTOR = '[data-checkout-mobile-summary-toggle]';
    var OVERLAY_SELECTOR = '[data-checkout-mobile-summary-overlay]';
    var CONTAINER_SELECTOR = '.checkout-mobile-summary__container';
    var EXPANDED_CLASS = 'checkout-mobile-summary--expanded';
    var INIT_FLAG = '__skillpressCheckoutMobileSummaryInitialized';
    var SWIPE_THRESHOLD = 36;

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function setExpanded(root, expanded) {
        var toggle = root.querySelector(TOGGLE_SELECTOR);

        root.classList.toggle(EXPANDED_CLASS, expanded);
        if (toggle) {
            toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
        dispatch(root, expanded ? 'sp:checkout-mobile-summary:open' : 'sp:checkout-mobile-summary:close', {
            expanded: expanded
        });
    }

    function bindOne(root) {
        var toggle;
        var overlay;
        var container;
        var initiallyExpanded;
        var touchStartY = null;

        if (!root || root[INIT_FLAG]) return root;

        toggle = root.querySelector(TOGGLE_SELECTOR);
        overlay = root.querySelector(OVERLAY_SELECTOR);
        container = root.querySelector(CONTAINER_SELECTOR);
        initiallyExpanded = root.classList.contains(EXPANDED_CLASS);

        if (toggle) {
            toggle.setAttribute('aria-expanded', initiallyExpanded ? 'true' : 'false');
            toggle.addEventListener('click', function () {
                setExpanded(root, !root.classList.contains(EXPANDED_CLASS));
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function () {
                setExpanded(root, false);
            });
        }

        if (container) {
            container.addEventListener('touchstart', function (event) {
                if (!event.touches || event.touches.length !== 1) return;
                touchStartY = event.touches[0].clientY;
            }, { passive: true });

            container.addEventListener('touchend', function (event) {
                var changedTouch;
                var deltaY;

                if (touchStartY == null || !event.changedTouches || event.changedTouches.length !== 1) {
                    touchStartY = null;
                    return;
                }

                changedTouch = event.changedTouches[0];
                deltaY = changedTouch.clientY - touchStartY;
                touchStartY = null;

                if (deltaY <= -SWIPE_THRESHOLD) {
                    setExpanded(root, true);
                } else if (deltaY >= SWIPE_THRESHOLD) {
                    setExpanded(root, false);
                }
            }, { passive: true });
        }

        root[INIT_FLAG] = true;
        return root;
    }

    /** @public */
    function init(target) {
        var nodes;

        if (target == null) {
            nodes = document.querySelectorAll(ROOT_SELECTOR);
        } else if (typeof target === 'string') {
            nodes = document.querySelectorAll(target);
        } else if (target.nodeType === 1) {
            if (target.matches(ROOT_SELECTOR)) {
                return bindOne(target);
            }
            nodes = target.querySelectorAll(ROOT_SELECTOR);
        } else if (target.nodeType === 9) {
            nodes = target.querySelectorAll(ROOT_SELECTOR);
        } else if (target.length != null) {
            nodes = target;
        } else {
            return null;
        }

        Array.prototype.forEach.call(nodes, bindOne);
        return nodes;
    }

    ns.CheckoutMobileSummary = {
        init: init
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/confirm-dialog.js === */
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

        // Flag sul namespace, non nella IIFE: se il bundle viene incluso due
        // volte (include duplicato nei template), il listener resta unico.
        if (!ns.__confirmDialogOpenersInitialized) {
            ns.__confirmDialogOpenersInitialized = true;
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
;

/* === js/dashboard-dropdown-box.js === */
/**
 * DashboardDropdownBox -- collapsible dashboard module box.
 *
 * @public-component dashboard-dropdown-box
 * @public-data data-dashboard-dropdown-box, data-dashboard-dropdown-box-trigger, data-dashboard-dropdown-box-content
 * @public-event sp:dashboard-dropdown-box:open, sp:dashboard-dropdown-box:close
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

    function getTrigger(root) {
        return root.querySelector('[data-dashboard-dropdown-box-trigger]');
    }

    function getContent(root) {
        return root.querySelector('[data-dashboard-dropdown-box-content]');
    }

    function setExpanded(root, expanded) {
        var trigger = getTrigger(root);
        var content = getContent(root);
        if (!trigger || !content) return;

        trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        content.hidden = !expanded;
        dispatch(
            root,
            expanded ? 'sp:dashboard-dropdown-box:open' : 'sp:dashboard-dropdown-box:close'
        );
    }

    function initRoot(root) {
        if (!root || root.__skillpressDashboardDropdownBoxInitialized) return;
        root.__skillpressDashboardDropdownBoxInitialized = true;

        var trigger = getTrigger(root);
        var content = getContent(root);
        if (!trigger || !content) return;

        if (!trigger.hasAttribute('aria-expanded')) {
            trigger.setAttribute('aria-expanded', content.hidden ? 'false' : 'true');
        } else {
            content.hidden = trigger.getAttribute('aria-expanded') !== 'true';
        }

        trigger.addEventListener('click', function () {
            setExpanded(root, trigger.getAttribute('aria-expanded') !== 'true');
        });
    }

    /** @public */
    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-dashboard-dropdown-box]')) {
            roots.push(context);
        }
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-dashboard-dropdown-box]')));
        roots.forEach(initRoot);
    }

    namespace.DashboardDropdownBox = {
        init: init,
        setExpanded: setExpanded
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/dashboard-settings-form.js === */
/**
 * DashboardSettingsForm -- inline edit/save settings form section.
 *
 * @public-component dashboard-settings-form
 * @public-data data-dashboard-settings-form, data-dashboard-settings-form-section, data-dashboard-settings-form-actions, data-dashboard-settings-form-edit, data-dashboard-settings-form-save, data-dashboard-settings-form-cancel, data-dashboard-settings-form-field
 * @public-event sp:dashboard-settings-form:edit, sp:dashboard-settings-form:save, sp:dashboard-settings-form:close
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

    function findRoots(context) {
        var scope = context || document;
        var roots = [];
        if (scope.matches && scope.matches('[data-dashboard-settings-form]')) roots.push(scope);
        if (scope.querySelectorAll) {
            roots = roots.concat(Array.prototype.slice.call(scope.querySelectorAll('[data-dashboard-settings-form]')));
        }
        return roots.filter(function (root, index, list) {
            return list.indexOf(root) === index;
        });
    }

    function getSection(root, sectionId) {
        if (!sectionId) return null;
        return root.querySelector('[data-dashboard-settings-form-section="' + sectionId + '"]');
    }

    function getFields(section) {
        return Array.prototype.slice.call(section.querySelectorAll('[data-dashboard-settings-form-field]'));
    }

    function getActions(section) {
        return section.querySelector('[data-dashboard-settings-form-actions]');
    }

    function getEdit(root, sectionId) {
        return root.querySelector('[data-dashboard-settings-form-edit="' + sectionId + '"]');
    }

    function snapshot(section) {
        getFields(section).forEach(function (field) {
            field.dataset.dashboardSettingsFormSnapshot = field.value;
        });
    }

    function restore(section) {
        getFields(section).forEach(function (field) {
            if (Object.prototype.hasOwnProperty.call(field.dataset, 'dashboardSettingsFormSnapshot')) {
                field.value = field.dataset.dashboardSettingsFormSnapshot;
                delete field.dataset.dashboardSettingsFormSnapshot;
            }
        });
    }

    function setEditing(root, sectionId, editing, restoreValues) {
        var section = getSection(root, sectionId);
        if (!section) return false;

        if (editing) {
            snapshot(section);
        } else if (restoreValues) {
            restore(section);
        }

        getFields(section).forEach(function (field) {
            field.disabled = !editing;
        });

        var actions = getActions(section);
        if (actions) actions.classList.toggle('dashboard-settings-form__actions--hidden', !editing);

        var edit = getEdit(root, sectionId);
        if (edit) {
            edit.classList.toggle('dashboard-settings-form__edit--hidden', editing);
            edit.hidden = editing;
        }

        var detail = { section: sectionId, restored: !!restoreValues };
        dispatch(
            root,
            editing ? 'sp:dashboard-settings-form:edit' : 'sp:dashboard-settings-form:close',
            detail
        );
        return true;
    }

    function save(root, sectionId) {
        var section = getSection(root, sectionId);
        if (!section) return false;

        getFields(section).forEach(function (field) {
            delete field.dataset.dashboardSettingsFormSnapshot;
            field.disabled = true;
        });

        var actions = getActions(section);
        if (actions) actions.classList.add('dashboard-settings-form__actions--hidden');

        var edit = getEdit(root, sectionId);
        if (edit) {
            edit.classList.remove('dashboard-settings-form__edit--hidden');
            edit.hidden = false;
        }

        dispatch(
            root,
            'sp:dashboard-settings-form:save',
            { section: sectionId }
        );
        return true;
    }

    function handleClick(root, event) {
        var edit = event.target.closest('[data-dashboard-settings-form-edit]');
        if (edit && root.contains(edit)) {
            event.preventDefault();
            setEditing(root, edit.getAttribute('data-dashboard-settings-form-edit'), true, false);
            return;
        }

        var cancel = event.target.closest('[data-dashboard-settings-form-cancel]');
        if (cancel && root.contains(cancel)) {
            event.preventDefault();
            setEditing(root, cancel.getAttribute('data-dashboard-settings-form-cancel'), false, true);
            return;
        }

        var saveTrigger = event.target.closest('[data-dashboard-settings-form-save]');
        if (saveTrigger && root.contains(saveTrigger)) {
            event.preventDefault();
            save(root, saveTrigger.getAttribute('data-dashboard-settings-form-save'));
        }
    }

    /** @public */
    function init(context) {
        findRoots(context).forEach(function (root) {
            if (root.__skillpressDashboardSettingsFormInitialized) return;
            root.__skillpressDashboardSettingsFormInitialized = true;
            root.addEventListener('click', function (event) {
                handleClick(root, event);
            });
        });
    }

    namespace.DashboardSettingsForm = {
        init: init,
        setEditing: setEditing,
        save: save
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/dashboard-shell.js === */
/**
 * DashboardShell -- dashboard layout with view routing and mobile menu.
 *
 * @public-component dashboard-shell
 * @public-data data-dashboard-shell, data-dashboard-shell-initial-view, data-dashboard-shell-view, data-dashboard-shell-nav-item, data-dashboard-shell-navigate, data-dashboard-shell-navigate-disabled-mobile, data-dashboard-shell-mobile-menu, data-dashboard-shell-back, data-dashboard-shell-parent
 * @public-event sp:dashboard-shell:change
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};
    var mobileQuery = window.matchMedia('(max-width: 1023px)');

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    var parentNavMap = {
        'order-detail': 'orders',
        'quote-request': 'quotes'
    };

    function normalizeRoot(rootOrDocument) {
        var context = rootOrDocument || document;
        if (context.matches && context.matches('[data-dashboard-shell]')) return context;
        return context.querySelector ? context.querySelector('[data-dashboard-shell]') : null;
    }

    function findRoots(rootOrDocument) {
        var context = rootOrDocument || document;
        var roots = [];
        if (context.matches && context.matches('[data-dashboard-shell]')) roots.push(context);
        if (context.querySelectorAll) {
            roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-dashboard-shell]')));
        }
        return roots.filter(function (root, index, list) {
            return list.indexOf(root) === index;
        });
    }

    function getViews(root) {
        return Array.prototype.slice.call(root.querySelectorAll('[data-dashboard-shell-view]'));
    }

    function getNavItems(root) {
        return Array.prototype.slice.call(root.querySelectorAll('[data-dashboard-shell-nav-item]'));
    }

    function getViewName(view) {
        return view.getAttribute('data-dashboard-shell-view');
    }

    function getNavForView(root, viewName) {
        var view = root.querySelector('[data-dashboard-shell-view="' + viewName + '"]');
        return parentNavMap[viewName] || (view && view.getAttribute('data-dashboard-shell-parent')) || viewName;
    }

    function isValidView(root, viewName) {
        return !!root.querySelector('[data-dashboard-shell-view="' + viewName + '"]');
    }

    function dispatchChange(root, viewName) {
        dispatch(root, 'sp:dashboard-shell:change', {
            view: viewName,
            nav: getNavForView(root, viewName)
        });
    }

    function setCurrentNav(root, viewName) {
        var activeNav = getNavForView(root, viewName);
        getNavItems(root).forEach(function (item) {
            var isCurrent = item.getAttribute('data-dashboard-shell-nav-item') === activeNav;
            item.setAttribute('aria-current', isCurrent ? 'page' : 'false');
        });
    }

    function setViews(root, viewName) {
        getViews(root).forEach(function (view) {
            view.hidden = getViewName(view) !== viewName;
        });
    }

    function showMobileMenu(rootOrDocument) {
        var root = normalizeRoot(rootOrDocument);
        if (!root) return;

        var mobileMenu = root.querySelector('[data-dashboard-shell-mobile-menu]');
        var back = root.querySelector('[data-dashboard-shell-back]');
        if (mobileMenu) mobileMenu.hidden = false;
        if (back) back.hidden = true;
        getViews(root).forEach(function (view) {
            view.hidden = true;
        });
    }

    function navigate(rootOrDocument, viewName) {
        var root = normalizeRoot(rootOrDocument);
        if (!root || !isValidView(root, viewName)) return false;

        var mobileMenu = root.querySelector('[data-dashboard-shell-mobile-menu]');
        var back = root.querySelector('[data-dashboard-shell-back]');
        setViews(root, viewName);
        setCurrentNav(root, viewName);
        root.dataset.dashboardShellCurrentView = viewName;

        if (mobileMenu) mobileMenu.hidden = true;
        if (back) back.hidden = !mobileQuery.matches;

        dispatchChange(root, viewName);
        return true;
    }

    function getInitialView(root) {
        var requested = root.getAttribute('data-dashboard-shell-initial-view') || 'dashboard';
        return isValidView(root, requested) ? requested : 'dashboard';
    }

    function syncResponsiveState(root) {
        var current = root.dataset.dashboardShellCurrentView || getInitialView(root);
        if (mobileQuery.matches) {
            setCurrentNav(root, current);
            showMobileMenu(root);
            return;
        }
        navigate(root, current);
    }

    function handleClick(root, event) {
        var back = event.target.closest('[data-dashboard-shell-back]');
        if (back && root.contains(back)) {
            event.preventDefault();
            showMobileMenu(root);
            return;
        }

        var directTrigger = event.target.closest('[data-dashboard-shell-navigate]');
        var navTrigger = event.target.closest('[data-dashboard-shell-nav-item]');
        var trigger = directTrigger || navTrigger;
        if (!trigger || !root.contains(trigger)) return;
        if (directTrigger && mobileQuery.matches && directTrigger.hasAttribute('data-dashboard-shell-navigate-disabled-mobile')) return;

        var viewName = directTrigger
            ? directTrigger.getAttribute('data-dashboard-shell-navigate')
            : navTrigger.getAttribute('data-dashboard-shell-nav-item');

        if (!viewName || viewName === 'logout') return;
        event.preventDefault();
        navigate(root, viewName);
    }

    function initRoot(root) {
        if (!root || root.__skillpressDashboardShellInitialized) return;
        root.__skillpressDashboardShellInitialized = true;

        root.addEventListener('click', function (event) {
            handleClick(root, event);
        });

        root.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            var trigger = event.target.closest('[data-dashboard-shell-navigate]');
            if (!trigger || !root.contains(trigger)) return;
            if (event.target.closest('button, a, input, select, textarea')) return;
            if (mobileQuery.matches && trigger.hasAttribute('data-dashboard-shell-navigate-disabled-mobile')) return;
            event.preventDefault();
            navigate(root, trigger.getAttribute('data-dashboard-shell-navigate'));
        });

        syncResponsiveState(root);
    }

    /** @public */
    function init(rootOrDocument) {
        findRoots(rootOrDocument).forEach(initRoot);
    }

    function resyncAll() {
        findRoots(document).forEach(syncResponsiveState);
    }

    if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener('change', resyncAll);
    } else if (mobileQuery.addListener) {
        mobileQuery.addListener(resyncAll);
    }

    namespace.DashboardShell = {
        init: init,
        navigate: navigate,
        showMobileMenu: showMobileMenu
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/expandable-table.js === */
/**
 * ExpandableTable -- wiring per tabelle con righe espandibili (markup-based).
 *
 * Implementazione condivisa dell'espansione riga. Il modulo NON genera markup: chevron e
 * detail-row sono renderizzati dal backend. Il JS si limita ad agganciare il
 * comportamento (click/tastiera, sync aria-expanded <-> hidden, una riga aperta
 * alla volta, evento custom). Le classi CSS restano per-componente
 * (orders-table__*, supplier-activity-table__*): lo styling non cambia.
 *
 * Contratto markup:
 *   - tabella:   [data-expandable-table]
 *   - riga:      [data-expandable-table-row] con aria-controls="<id detail-row>"
 *                e aria-expanded ("true" => aperta di default), focusabile
 *                (tabindex="0").
 *   - chevron:   <button data-expandable-table-toggle> dentro la riga.
 *   - dettaglio: <tr id="<id>" hidden> referenziata dall'aria-controls; il
 *                colspan e' nel markup (il JS non lo calcola).
 *   - label aria opzionali sul root: data-expandable-table-label-show /
 *     data-expandable-table-label-hide (default "Mostra/Nascondi dettagli").
 *
 * @public-component orders-table, billing-table, supplier-activity-table
 * @public-data data-expandable-table, data-expandable-table-init, data-expandable-table-row, data-expandable-table-toggle, data-expandable-table-label-show, data-expandable-table-label-hide
 * @public-event sp:expandable-table:row-toggle
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};

    var DEFAULT_LABEL_SHOW = 'Mostra dettagli';
    var DEFAULT_LABEL_HIDE = 'Nascondi dettagli';

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function labels(table) {
        return {
            show: table.getAttribute('data-expandable-table-label-show') || DEFAULT_LABEL_SHOW,
            hide: table.getAttribute('data-expandable-table-label-hide') || DEFAULT_LABEL_HIDE
        };
    }

    function detailFor(row) {
        var id = row.getAttribute('aria-controls');
        return id ? document.getElementById(id) : null;
    }

    function setRowState(table, row, open) {
        var detail = detailFor(row);
        if (!detail) return;

        row.setAttribute('aria-expanded', open ? 'true' : 'false');
        detail.hidden = !open;

        var toggle = row.querySelector('[data-expandable-table-toggle]');
        if (toggle) {
            var l = labels(table);
            toggle.setAttribute('aria-label', open ? l.hide : l.show);
        }
    }

    function toggleRow(table, row) {
        var detail = detailFor(row);
        if (!detail) return;

        var willOpen = detail.hidden;

        table.querySelectorAll('[data-expandable-table-row][aria-expanded="true"]').forEach(function (openRow) {
            if (openRow !== row) setRowState(table, openRow, false);
        });

        setRowState(table, row, willOpen);
        dispatch(row, 'sp:expandable-table:row-toggle', { open: willOpen, row: row });
    }

    function initTable(table) {
        if (!table || table.__skillpressExpandableTableInitialized) return;
        table.__skillpressExpandableTableInitialized = true;
        table.setAttribute('data-expandable-table-init', '1');

        table.querySelectorAll('[data-expandable-table-row]').forEach(function (row) {
            var detail = detailFor(row);
            if (!detail) return;

            // Stato iniziale dal markup: aria-expanded="true" => detail visibile.
            setRowState(table, row, row.getAttribute('aria-expanded') === 'true');
        });

        table.addEventListener('click', function (event) {
            if (event.target.closest('a, button:not([data-expandable-table-toggle]), input, select, textarea, .dashboard-action-badge')) return;

            var row = event.target.closest('[data-expandable-table-row]');
            if (!row || !table.contains(row)) return;

            event.preventDefault();
            toggleRow(table, row);
        });

        table.addEventListener('keydown', function (event) {
            if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
            // Non interferire con eventuali interactive children.
            if (event.target.closest('a, button:not([data-expandable-table-toggle]), input, select, textarea, [contenteditable="true"]')) return;

            var row = event.target.closest('[data-expandable-table-row]');
            if (!row || !table.contains(row)) return;

            event.preventDefault();
            toggleRow(table, row);
        });
    }

    /** @public */
    function init(root) {
        var scope = root || document;
        if (scope.matches && scope.matches('[data-expandable-table]')) initTable(scope);
        scope.querySelectorAll('[data-expandable-table]').forEach(initTable);
    }

    namespace.ExpandableTable = {
        init: init
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/feedaty-widget.js === */
/**
 * FeedatyWidget -- third-party Feedaty review SDK loader.
 *
 * @public-component feedaty-widget
 * @public-data data-feedaty-widget, data-feedaty-widget-init, data-feedaty-widget-sdk, data-feedaty-widget-sdk-src
 * @public-event sp:feedaty-widget:error
 *
 * Il JS inietta solo lo SDK Feedaty di terze parti (lazy-load script) e
 * l'host del widget; nessun contenuto applicativo, gestito da SDK/backend.
 */
(function () {
    'use strict';

    var SDK_SRC = 'https://widget.feedaty.com/v3.0.0/js/2021/10214496/feedaty.min.js';
    var SDK_SELECTOR = 'script.feedaty_sdk, script[src*="feedaty.min.js"]';
    var sdkPromise = null;

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function ensureSdk(src) {
        var existing = document.querySelector(SDK_SELECTOR);

        if (existing) return Promise.resolve(existing);
        if (sdkPromise) return sdkPromise;

        sdkPromise = new Promise(function (resolve, reject) {
            var script = document.createElement('script');

            script.className = 'feedaty_sdk';
            script.src = src || SDK_SRC;
            script.async = true;
            script.onload = function () { resolve(script); };
            script.onerror = function () {
                sdkPromise = null;
                reject(new Error('Feedaty SDK load failed'));
            };

            document.body.appendChild(script);
        });

        return sdkPromise;
    }

    function initRoot(root) {
        var widget;
        var sdkSrc;

        if (!root || root.__skillpressFeedatyWidgetInitialized) return;

        widget = root.querySelector('.feedaty_widget');
        if (!widget) return;

        root.__skillpressFeedatyWidgetInitialized = true;
        root.setAttribute('data-feedaty-widget-init', '1');

        if (root.getAttribute('data-feedaty-widget-sdk') === 'false') return;

        sdkSrc = root.getAttribute('data-feedaty-widget-sdk-src') || SDK_SRC;
        ensureSdk(sdkSrc).catch(function (error) {
            dispatch(root, 'sp:feedaty-widget:error', { error: error });
        });
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-feedaty-widget]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-feedaty-widget]')).forEach(initRoot);
    }

    ns.FeedatyWidget = {
        init: init,
        ensureSdk: ensureSdk
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/file-upload-box.js === */
/**
 * FileUploadBox -- modal/dialog box for file uploads.
 *
 * @public-component file-modal
 * @public-data data-file-upload-box, data-file-upload-box-open, data-file-upload-box-role
 * @public-event sp:file-upload-box:open, sp:file-upload-box:close, sp:file-upload-box:submit
 *
 * Il JS scrive innerHTML solo in risposta ad azioni utente (lista dei file
 * scelti, stati di upload); guscio del modale, dropzone e form sono
 * server-rendered.
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};

    function escapeHtml(value) {
        if (typeof helpers.escapeHtml === 'function') return helpers.escapeHtml(value);
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function truncateFileName(name) {
        var value = String(name || '');
        if (value.length <= 34) return value;
        return value.slice(0, 20) + '...' + value.slice(-11);
    }

    function formatSize(bytes) {
        if (!bytes && bytes !== 0) return '-';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function getRole(root, role) {
        return root.querySelector('[data-file-upload-box-role="' + role + '"]');
    }

    function syncSubmit(root) {
        var submit = getRole(root, 'submit');
        if (!submit) return;
        submit.disabled = !root.__fileUploadBoxPendingFile;
    }

    function renderEmpty(root, text) {
        var tableBody = getRole(root, 'table-body');
        if (!tableBody) return;
        // safe: text e' costante o stringa controllata, escapata.
        tableBody.innerHTML = '<tr><td colspan="6" class="file-modal__table-empty">' +
            escapeHtml(text || 'Non sono presenti file') +
        '</td></tr>';
    }

    function renderFile(root, file) {
        var tableBody = getRole(root, 'table-body');
        if (!tableBody || !file) return;

        var date = new Date().toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // safe: file.name/size + date sono escapati prima di entrare nel template.
        tableBody.innerHTML = '<tr>' +
            '<td class="file-modal-table__cell">1</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--name">' + escapeHtml(truncateFileName(file.name)) + '</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--meta">' + escapeHtml(date) + '</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--meta">' + escapeHtml(formatSize(file.size)) + '</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--meta">' +
                '<span class="file-modal-status file-modal-status--warning">Da verificare</span>' +
            '</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--actions">' +
                '<button class="file-modal-delete-btn" type="button" data-file-upload-box-role="remove" title="Cancella file">' +
                    '<span class="file-modal-delete-btn__icon" aria-hidden="true"></span>' +
                '</button>' +
            '</td>' +
        '</tr>';
    }

    function handleFile(root, file) {
        if (!file) return;
        root.__fileUploadBoxPendingFile = file;
        var error = getRole(root, 'upload-error');
        if (error) error.hidden = true;
        renderFile(root, file);
        syncSubmit(root);
    }

    function open(root, triggerEl) {
        if (!root) return;
        // F015: salva il trigger pre-open per restore focus post-close.
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
        var dialog = root.querySelector('.file-modal__content');
        if (dialog) dialog.focus();
        syncSubmit(root);
        dispatch(root, 'sp:file-upload-box:open');
    }

    function close(root) {
        if (!root) return;
        var wasOpen = !root.hidden;
        root.hidden = true;
        root.setAttribute('aria-hidden', 'true');
        // F015: restore focus al trigger originale post-close.
        if (wasOpen && root.__lastTrigger && typeof root.__lastTrigger.focus === 'function') {
            try { root.__lastTrigger.focus(); } catch (e) { /* noop */ }
        }
        root.__lastTrigger = null;
        dispatch(root, 'sp:file-upload-box:close');
    }

    function removeFile(root) {
        root.__fileUploadBoxPendingFile = null;
        var input = getRole(root, 'input');
        if (input) input.value = '';
        renderEmpty(root);
        syncSubmit(root);
    }

    function submit(root) {
        if (!root.__fileUploadBoxPendingFile) return;
        var detail = {
            file: root.__fileUploadBoxPendingFile,
            fileName: root.__fileUploadBoxPendingFile.name
        };
        dispatch(root, 'sp:file-upload-box:submit', detail);
        close(root);
    }

    function initRoot(root) {
        if (!root || root.__skillpressFileUploadBoxInitialized) return;
        root.__skillpressFileUploadBoxInitialized = true;

        var dropzone = getRole(root, 'dropzone');
        var input = getRole(root, 'input');
        var closeButton = getRole(root, 'close');
        var submitButton = getRole(root, 'submit');

        if (root.hidden) root.setAttribute('aria-hidden', 'true');

        root.addEventListener('click', function (event) {
            if (event.target === root) close(root);
        });

        // F015: Escape chiude il dialog quando aperto.
        root.addEventListener('keydown', function (event) {
            if ((event.key === 'Escape' || event.key === 'Esc') && !root.hidden) {
                event.stopPropagation();
                close(root);
            }
        });

        if (closeButton) {
            closeButton.addEventListener('click', function () {
                close(root);
            });
        }

        if (dropzone) {
            dropzone.addEventListener('click', function () {
                if (input) input.click();
            });
            dropzone.addEventListener('dragover', function (event) {
                event.preventDefault();
                dropzone.classList.add('file-modal-dropzone--dragover');
            });
            dropzone.addEventListener('dragleave', function () {
                dropzone.classList.remove('file-modal-dropzone--dragover');
            });
            dropzone.addEventListener('drop', function (event) {
                event.preventDefault();
                dropzone.classList.remove('file-modal-dropzone--dragover');
                handleFile(root, event.dataTransfer.files && event.dataTransfer.files[0]);
            });
        }

        if (input) {
            input.addEventListener('change', function (event) {
                handleFile(root, event.target.files && event.target.files[0]);
                event.target.value = '';
            });
        }

        if (submitButton) {
            submitButton.addEventListener('click', function () {
                submit(root);
            });
        }

        root.addEventListener('click', function (event) {
            var remove = event.target.closest('[data-file-upload-box-role="remove"]');
            if (!remove || !root.contains(remove)) return;
            removeFile(root);
        });

        syncSubmit(root);
    }

    /** @public */
    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-file-upload-box]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-file-upload-box]')));
        roots.forEach(initRoot);

        // Flag sul namespace, non nella IIFE: se il bundle viene incluso due
        // volte (include duplicato nei template), il listener resta unico.
        if (!namespace.__fileUploadBoxOpenersInitialized) {
            namespace.__fileUploadBoxOpenersInitialized = true;
            document.addEventListener('click', function (event) {
                var opener = event.target.closest('[data-file-upload-box-open]');
                if (!opener) return;
                var selector = opener.getAttribute('data-file-upload-box-open');
                var target = selector ? document.querySelector(selector) : document.querySelector('[data-file-upload-box]');
                if (!target) return;
                event.preventDefault();
                initRoot(target);
                // F015: passa il trigger per consentire focus restore al close.
                open(target, opener);
            });
        }
    }

    namespace.FileUploadBox = {
        init: init,
        open: open,
        close: close,
        removeFile: removeFile
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/info-dropdown.js === */
/**
 * INFO DROPDOWN -- Behavior minimo per pannelli di aiuto contestuale
 * Gestisce apertura, chiusura e attributi ARIA del pannello.
 *
 * API:
 *   window.SkillpressUI.InfoDropdown.init(rootOrSelector?)
 *   Default: scansione di tutto il document.
 *
 * @public-component sp-info-dropdown
 * @public-data data-info-dropdown, data-info-dropdown-info-trigger
 * @public-event sp:info-dropdown:open, sp:info-dropdown:close
 *
 * Il JS genera solo il guscio del popup di aiuto e ne fa il toggle
 * (aria-expanded <-> hidden); trigger, pannello e contenuto sono
 * server-rendered.
 *
 * Contratto markup atteso:
 *   <div class="sp-label-row">
 *     <label class="sp-label-text">Formato (mm)</label>
 *     <button class="sp-info-btn" type="button" data-info-dropdown-info-trigger
 *             aria-controls="info-formato"
 *             aria-expanded="false" aria-label="Mostra informazioni"></button>
 *   </div>
 *   <div id="info-formato" class="sp-info-dropdown sp-info-dropdown--hidden"
 *        data-info-dropdown role="region" aria-hidden="true">
 *     <p>...body content...</p>
 *   </div>
 *
 * Init (idempotente):
 *   1. Per ogni [data-info-dropdown-info-trigger][aria-controls=ID]:
 *      a. Trova #ID ([data-info-dropdown]).
 *      b. Se #ID non ha .sp-info-dropdown__header come primo figlio, lo auto-inietta:
 *         - title = textContent della .sp-label-text adiacente (stessa .sp-label-row).
 *         - close button vuoto; icona X disegnata da CSS.
 *      c. Se i figli rimanenti non sono gia' wrappati in .sp-info-dropdown__body,
 *         vengono wrappati.
 *   2. Wire click trigger -> toggle .sp-info-dropdown--hidden + sync aria-expanded + aria-hidden.
 *   3. Wire click .sp-info-dropdown__close -> chiudi.
 *   4. ESC su document -> chiudi tutti gli aperti.
 *   5. Click outside ([data-info-dropdown] e [data-info-dropdown-info-trigger]) -> chiudi tutti gli aperti.
 *
 * Eventi emessi:
 *   - 'sp:info-dropdown:open'  bubbling, sul .sp-info-dropdown
 *   - 'sp:info-dropdown:close' bubbling, sul .sp-info-dropdown
 */
(function() {
    'use strict';

    var TRIGGER_SELECTOR = '[data-info-dropdown-info-trigger][aria-controls]';
    var DROPDOWN_INIT_FLAG = '__skillpressInfoDropdownInitialized';
    var TRIGGER_INIT_FLAG = '__skillpressInfoDropdownTriggerInitialized';
    var DOC_INIT_FLAG = '__skillpressInfoDropdownDocInitialized';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function getDropdown(trigger) {
        var id = trigger.getAttribute('aria-controls');
        if (!id) return null;
        var dropdown = document.getElementById(id);
        if (dropdown) return dropdown;
        var root = trigger.getRootNode && trigger.getRootNode();
        if (root && root.querySelector) {
            // Selettore ad attributo: '#' + id lancerebbe SyntaxError con id
            // che iniziano per cifra (plausibili se generati dal CMS).
            return root.querySelector('[id="' + id.replace(/"/g, '\\"') + '"]');
        }
        return null;
    }

    function getAssociatedLabelText(trigger) {
        var row = trigger.closest('.sp-label-row');
        if (!row) return '';
        var label = row.querySelector('.sp-label-text');
        if (!label) return '';
        return (label.textContent || '').trim();
    }

    function ensureChrome(dropdown, trigger) {
        if (dropdown[DROPDOWN_INIT_FLAG]) return;

        var existingHeader = dropdown.querySelector(':scope > .sp-info-dropdown__header, :scope > .info-dropdown__header');
        var existingBody = dropdown.querySelector(':scope > .sp-info-dropdown__body, :scope > .info-dropdown__body');

        // Step 1: snapshot dei figli che dovranno finire dentro il body wrapper.
        // Tutto cio' che non e' gia' header/body finisce wrappato.
        var bodyNodes = [];
        if (!existingBody) {
            var children = Array.prototype.slice.call(dropdown.childNodes);
            children.forEach(function(node) {
                if (node === existingHeader) return;
                bodyNodes.push(node);
            });
        }

        // Step 2: se header mancante, costruiscilo.
        if (!existingHeader) {
            var header = document.createElement('div');
            header.className = 'sp-info-dropdown__header';

            var titleText = getAssociatedLabelText(trigger);
            var title = document.createElement('h4');
            title.className = 'sp-info-dropdown__title';
            title.textContent = titleText;
            header.appendChild(title);

            var close = document.createElement('button');
            close.type = 'button';
            close.className = 'sp-info-dropdown__close';
            close.setAttribute('aria-label', 'Chiudi');
            header.appendChild(close);

            // Inserisce header come PRIMO figlio del dropdown.
            if (dropdown.firstChild) {
                dropdown.insertBefore(header, dropdown.firstChild);
            } else {
                dropdown.appendChild(header);
            }
        }

        // Step 3: se body mancante, wrappa i nodi snapshot.
        if (!existingBody && bodyNodes.length > 0) {
            var body = document.createElement('div');
            body.className = 'sp-info-dropdown__body';
            bodyNodes.forEach(function(node) {
                body.appendChild(node);
            });
            dropdown.appendChild(body);
        }

        dropdown[DROPDOWN_INIT_FLAG] = true;
    }

    function isOpen(dropdown) {
        return !dropdown.classList.contains('sp-info-dropdown--hidden');
    }

    function setOpen(dropdown, trigger, open) {
        var wasOpen = !dropdown.classList.contains('sp-info-dropdown--hidden');
        dropdown.classList.toggle('sp-info-dropdown--hidden', !open);
        dropdown.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (trigger) {
            trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        // F015: focus management. Open -> save trigger; Close -> restore focus a trigger.
        if (open && !wasOpen) {
            if (trigger) dropdown.__lastTrigger = trigger;
        } else if (!open && wasOpen) {
            var lastTrigger = dropdown.__lastTrigger || trigger;
            if (lastTrigger && typeof lastTrigger.focus === 'function') {
                // Solo se il focus e' attualmente dentro il dropdown chiuso
                // (evita di rubare il focus se l'utente ha gia' tabbato altrove).
                var active = document.activeElement;
                if (active === document.body || active === document.documentElement || dropdown.contains(active)) {
                    try { lastTrigger.focus(); } catch (e) { /* noop */ }
                }
            }
            dropdown.__lastTrigger = null;
        }
        dispatch(dropdown, open ? 'sp:info-dropdown:open' : 'sp:info-dropdown:close');
    }

    function getMenuItems(dropdown) {
        // Items focusable interni al dropdown (esclude il close button).
        return Array.prototype.slice.call(
            dropdown.querySelectorAll('[role="menuitem"], .sp-info-dropdown__body a[href], .sp-info-dropdown__body button:not([disabled])')
        ).filter(function (el) {
            return !el.hasAttribute('disabled') && el.offsetParent !== null;
        });
    }

    function onDropdownKeydown(event) {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        var dropdown = event.currentTarget;
        if (dropdown.classList.contains('sp-info-dropdown--hidden')) return;
        var items = getMenuItems(dropdown);
        if (items.length < 2) return;
        event.preventDefault();
        var idx = items.indexOf(document.activeElement);
        if (idx < 0) idx = 0;
        else if (event.key === 'ArrowDown') idx = (idx + 1) % items.length;
        else idx = (idx - 1 + items.length) % items.length;
        var next = items[idx];
        if (next && typeof next.focus === 'function') next.focus();
    }

    function findTriggerFor(dropdown) {
        if (!dropdown.id) return null;
        return document.querySelector('[data-info-dropdown-info-trigger][aria-controls="' + dropdown.id + '"]');
    }

    function closeAll() {
        Array.prototype.forEach.call(
            document.querySelectorAll('[data-info-dropdown]:not(.sp-info-dropdown--hidden)'),
            function(dropdown) {
                setOpen(dropdown, findTriggerFor(dropdown), false);
            }
        );
    }

    function onTriggerClick(event) {
        var trigger = event.currentTarget;
        var dropdown = getDropdown(trigger);
        if (!dropdown) return;

        var willOpen = !isOpen(dropdown);
        if (willOpen) closeAll();
        setOpen(dropdown, trigger, willOpen);
    }

    function onCloseClick(event) {
        var close = event.target.closest('.sp-info-dropdown__close');
        if (!close) return;
        var dropdown = close.closest('[data-info-dropdown]');
        if (!dropdown) return;
        setOpen(dropdown, findTriggerFor(dropdown), false);
    }

    function onDocClick(event) {
        // Click outside: chiudi se non dentro un trigger ne' un dropdown aperto.
        if (event.target.closest('[data-info-dropdown-info-trigger]')) return;
        if (event.target.closest('[data-info-dropdown]')) return;
        closeAll();
    }

    function onKeydown(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeAll();
        }
    }

    function bindTrigger(trigger) {
        if (trigger[TRIGGER_INIT_FLAG]) return;
        var dropdown = getDropdown(trigger);
        if (!dropdown) return;

        // Sync aria-expanded iniziale con stato del dropdown
        trigger.setAttribute('aria-expanded', isOpen(dropdown) ? 'true' : 'false');
        dropdown.setAttribute('aria-hidden', isOpen(dropdown) ? 'false' : 'true');

        ensureChrome(dropdown, trigger);

        trigger.addEventListener('click', onTriggerClick);
        // Delegated close handler vive sul dropdown stesso (idempotente per dropdown).
        if (!dropdown[DROPDOWN_INIT_FLAG + 'Close']) {
            dropdown.addEventListener('click', onCloseClick);
            // F015: arrow keys per navigazione menu items.
            dropdown.addEventListener('keydown', onDropdownKeydown);
            dropdown[DROPDOWN_INIT_FLAG + 'Close'] = true;
        }

        trigger[TRIGGER_INIT_FLAG] = true;
    }

    /** @public */
    function init(rootOrSelector) {
        var root;
        if (!rootOrSelector) {
            root = document;
        } else if (typeof rootOrSelector === 'string') {
            root = document.querySelector(rootOrSelector) || document;
        } else {
            root = rootOrSelector;
        }

        Array.prototype.forEach.call(
            root.querySelectorAll(TRIGGER_SELECTOR),
            bindTrigger
        );

        // Document-level listeners (idempotenti)
        if (!document[DOC_INIT_FLAG]) {
            document.addEventListener('click', onDocClick);
            document.addEventListener('keydown', onKeydown);
            document[DOC_INIT_FLAG] = true;
        }
    }

    ns.InfoDropdown = {
        init: init
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/landing-info-tabs.js === */
/**
 * LandingInfoTabs -- tab navigation for landing text sections.
 *
 * @public-component landing-info-tabs
 * @public-data data-landing-info-tabs, data-landing-info-tabs-init, data-landing-info-tabs-tab, data-landing-info-tabs-panel
 * @public-event (none)
 */
(function () {
    'use strict';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function getTabs(root) {
        return toArray(root.querySelectorAll('[data-landing-info-tabs-tab]'));
    }

    function getPanels(root) {
        return toArray(root.querySelectorAll('[data-landing-info-tabs-panel]'));
    }

    function getNextTab(tabs, current, direction) {
        var index = tabs.indexOf(current);
        if (index === -1) return tabs[0];
        return tabs[(index + direction + tabs.length) % tabs.length];
    }

    function activateTab(root, tab, shouldFocus) {
        var tabs = getTabs(root);
        var panels = getPanels(root);
        var panelId = tab.getAttribute('aria-controls');

        tabs.forEach(function (item) {
            var isActive = item === tab;
            item.classList.toggle('landing-info-tabs__tab--active', isActive);
            item.setAttribute('aria-selected', isActive ? 'true' : 'false');
            item.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach(function (panel) {
            var isActive = panel.id === panelId;
            panel.hidden = !isActive;
            panel.classList.toggle('landing-info-tabs__panel--active', isActive);
        });

        if (shouldFocus) tab.focus();
    }

    function bindTab(root, tab) {
        tab.addEventListener('click', function () {
            activateTab(root, tab, false);
        });

        tab.addEventListener('keydown', function (event) {
            var tabs = getTabs(root);
            var target = null;

            if (event.key === 'ArrowRight') target = getNextTab(tabs, tab, 1);
            if (event.key === 'ArrowLeft') target = getNextTab(tabs, tab, -1);
            if (event.key === 'Home') target = tabs[0];
            if (event.key === 'End') target = tabs[tabs.length - 1];

            if (!target) return;
            event.preventDefault();
            activateTab(root, target, true);
        });
    }

    function initRoot(root) {
        var tabs;
        var selected;

        if (!root || root.__skillpressLandingInfoTabsInitialized) return;
        root.__skillpressLandingInfoTabsInitialized = true;
        root.setAttribute('data-landing-info-tabs-init', '1');

        tabs = getTabs(root);
        if (!tabs.length) return;

        tabs.forEach(function (tab) {
            bindTab(root, tab);
        });

        selected = tabs.filter(function (tab) {
            return tab.getAttribute('aria-selected') === 'true';
        })[0] || tabs[0];
        activateTab(root, selected, false);
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-landing-info-tabs]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-landing-info-tabs]')).forEach(initRoot);
    }

    ns.LandingInfoTabs = { init: init };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/order-product-dropdown.js === */
/**
 * OrderProductDropdown -- expandable order product detail card.
 *
 * @public-component order-product-dropdown
 * @public-data data-order-product-dropdown, data-order-product-dropdown-trigger, data-order-product-dropdown-content, data-order-product-dropdown-details, data-order-product-dropdown-details-trigger
 * @public-event sp:order-product-dropdown:open, sp:order-product-dropdown:close
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

    function getRoot(element) {
        return element.closest('[data-order-product-dropdown]');
    }

    function setExpanded(root, expanded) {
        var trigger = root.querySelector('[data-order-product-dropdown-trigger]');
        var content = root.querySelector('[data-order-product-dropdown-content]');
        if (!trigger || !content) return;
        trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        content.hidden = !expanded;
        dispatch(
            root,
            expanded ? 'sp:order-product-dropdown:open' : 'sp:order-product-dropdown:close'
        );
    }

    function setDetailsExpanded(root, expanded) {
        var trigger = root.querySelector('[data-order-product-dropdown-details-trigger]');
        var content = root.querySelector('[data-order-product-dropdown-details]');
        if (!trigger || !content) return;
        trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        content.hidden = !expanded;
    }

    function initRoot(root) {
        if (!root || root.__skillpressOrderProductDropdownInitialized) return;
        root.__skillpressOrderProductDropdownInitialized = true;

        var trigger = root.querySelector('[data-order-product-dropdown-trigger]');
        var content = root.querySelector('[data-order-product-dropdown-content]');
        var detailsTrigger = root.querySelector('[data-order-product-dropdown-details-trigger]');
        var details = root.querySelector('[data-order-product-dropdown-details]');

        if (trigger && content) {
            if (!trigger.hasAttribute('aria-expanded')) {
                trigger.setAttribute('aria-expanded', content.hidden ? 'false' : 'true');
            } else {
                content.hidden = trigger.getAttribute('aria-expanded') !== 'true';
            }
            trigger.addEventListener('click', function () {
                setExpanded(root, trigger.getAttribute('aria-expanded') !== 'true');
            });
        }

        if (detailsTrigger && details) {
            if (!detailsTrigger.hasAttribute('aria-expanded')) {
                detailsTrigger.setAttribute('aria-expanded', details.hidden ? 'false' : 'true');
            } else {
                details.hidden = detailsTrigger.getAttribute('aria-expanded') !== 'true';
            }
            detailsTrigger.addEventListener('click', function (event) {
                event.stopPropagation();
                setDetailsExpanded(root, detailsTrigger.getAttribute('aria-expanded') !== 'true');
            });
        }
    }

    /** @public */
    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-order-product-dropdown]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-order-product-dropdown]')));
        roots.forEach(initRoot);
    }

    namespace.OrderProductDropdown = {
        init: init,
        setExpanded: setExpanded,
        setDetailsExpanded: setDetailsExpanded
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/order-status-steps.js === */
/**
 * OrderStatusSteps -- horizontal step indicator for order lifecycle.
 *
 * @public-component order-status-steps
 * @public-data data-order-status-steps, data-order-status-steps-item, data-order-status-steps-step-id
 * @public-event sp:order-status-steps:change
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};
    var SELECTED_CLASS = 'product-stepper__step--selected';

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function getStepId(item) {
        return item.getAttribute('data-order-status-steps-step-id') || '';
    }

    function selectItem(root, item) {
        if (!root || !item || !root.contains(item)) return;

        root.querySelectorAll('[data-order-status-steps-item]').forEach(function (candidate) {
            var selected = candidate === item;
            candidate.classList.toggle(SELECTED_CLASS, selected);
            candidate.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });

        dispatch(root, 'sp:order-status-steps:change', {
            stepId: getStepId(item),
            item: item
        });
    }

    function initRoot(root) {
        if (!root || root.__skillpressOrderStatusStepsInitialized) return;
        root.__skillpressOrderStatusStepsInitialized = true;

        var items = Array.prototype.slice.call(root.querySelectorAll('[data-order-status-steps-item]'));
        var selected = items.filter(function (item) {
            return item.classList.contains(SELECTED_CLASS) || item.getAttribute('aria-pressed') === 'true';
        })[0] || items[0];

        items.forEach(function (item) {
            item.setAttribute('aria-pressed', item === selected ? 'true' : 'false');
            item.addEventListener('click', function () {
                selectItem(root, item);
            });
        });
    }

    /** @public */
    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-order-status-steps]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-order-status-steps]')));
        roots.forEach(initRoot);
    }

    namespace.OrderStatusSteps = {
        init: init,
        selectItem: selectItem
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/order-step-detail.js === */
/**
 * OrderStepDetail -- panel listener showing detail for selected order step.
 *
 * Listens to OrderStatusSteps to switch active panel.
 *
 * @public-component order-step-detail
 * @public-data data-order-step-detail, data-order-step-detail-panel
 * @public-event sp:order-step-detail:change
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

    function getStepId(element) {
        return element ? element.getAttribute('data-order-status-steps-step-id') || '' : '';
    }

    function setPanel(panel, visible) {
        panel.hidden = !visible;
        panel.setAttribute('aria-hidden', visible ? 'false' : 'true');
    }

    function selectPanel(root, stepId) {
        if (!root || !stepId) return;

        var selectedPanel = null;
        root.querySelectorAll('[data-order-step-detail-panel]').forEach(function (panel) {
            var selected = getStepId(panel) === stepId;
            if (selected) selectedPanel = panel;
            setPanel(panel, selected);
        });

        dispatch(root, 'sp:order-step-detail:change', {
            stepId: stepId,
            panel: selectedPanel
        });
    }

    function getInitialStepId(root) {
        var visiblePanel = root.querySelector('[data-order-step-detail-panel]:not([hidden])');
        if (visiblePanel) return getStepId(visiblePanel);

        var pressed = root.querySelector('[data-order-status-steps-item][aria-pressed="true"]');
        if (pressed) return getStepId(pressed);

        var firstPanel = root.querySelector('[data-order-step-detail-panel]');
        return getStepId(firstPanel);
    }

    function initRoot(root) {
        if (!root || root.__skillpressOrderStepDetailInitialized) return;
        root.__skillpressOrderStepDetailInitialized = true;

        var initialStepId = getInitialStepId(root);
        if (initialStepId) selectPanel(root, initialStepId);

        function onStatusChange(event) {
            var detail = event.detail || {};
            if (detail.stepId) selectPanel(root, detail.stepId);
        }
        root.addEventListener('sp:order-status-steps:change', onStatusChange);
    }

    /** @public */
    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-order-step-detail]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-order-step-detail]')));
        roots.forEach(initRoot);
    }

    namespace.OrderStepDetail = {
        init: init,
        selectPanel: selectPanel
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/preview.js === */
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
;

/* === js/toggle-switch.js === */
/**
 * TOGGLE SWITCH -- Behavior minimo
 * Gestisce .active e aria-checked.
 *
 * API:
 *   window.SkillpressUI.ToggleSwitch.init(rootOrSelector?)
 *   Default selector: '[data-toggle-switch]'
 *
 * Comportamento:
 *   - click + Space + Enter
 *   - flippa la classe .sp-toggle-switch--checked e l'attributo aria-checked
 *   - emette CustomEvent('sp:toggle-switch:change', { detail: { checked } }) bubbling
 *   - rispetta disabled / aria-disabled
 *   - NON gestisce stato di business (es. IVA, prezzi)
 *
 * @public-component sp-toggle-switch
 * @public-data data-toggle-switch
 * @public-event sp:toggle-switch:change
 */
(function() {
    'use strict';

    var DEFAULT_SELECTOR = '[data-toggle-switch]';
    var INIT_FLAG = '__skillpressToggleSwitchInitialized';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function isDisabled(el) {
        if (el.disabled === true) return true;
        if (el.getAttribute('aria-disabled') === 'true') return true;
        return false;
    }

    function isChecked(el) {
        if (el.classList.contains('sp-toggle-switch--checked')) return true;
        if (el.getAttribute('aria-checked') === 'true') return true;
        return false;
    }

    function setChecked(el, checked) {
        el.classList.toggle('sp-toggle-switch--checked', checked);
        el.setAttribute('aria-checked', checked ? 'true' : 'false');
        dispatch(el, 'sp:toggle-switch:change', { checked: checked });
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
        el.classList.toggle('sp-toggle-switch--checked', checked);
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

    /** @public */
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
        } else if (target.nodeType === 9) {
            // document
            nodes = target.querySelectorAll(DEFAULT_SELECTOR);
        } else if (target.length != null) {
            nodes = target;
        } else {
            return null;
        }

        Array.prototype.forEach.call(nodes, bindOne);
        return nodes;
    }

    ns.ToggleSwitch = {
        init: init
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
;

/* === js/index.js === */
/**
 * SKILLPRESS UI -- aggregator init
 *
 * `window.SkillpressUI.init(scope?)` invoca tutti gli init dei componenti
 * registrati su `window.SkillpressUI`. Va chiamato dal backend dopo ogni
 * iniezione di markup (es. fetch di sezione CMS) per attivare le
 * interaction. Idempotente: lo stesso scope non viene re-inizializzato.
 *
 * Caricamento: questo file deve essere incluso DOPO _helpers.js e DOPO
 * tutti i js/<componente>.js (cosi' che `ns.{Componente}` sia gia' presente).
 */
(function (global) {
    'use strict';

    var ns = global.SkillpressUI = global.SkillpressUI || {};

    // Registry esplicito dei componenti gestiti dall'aggregator.
    // L'ordine non e' significativo (i componenti sono indipendenti tra loro
    // a livello di init, eccetto OrderStepDetail che ascolta gli eventi di
    // OrderStatusSteps, i quali partono solo al click utente).
    var COMPONENTS = [
        'Accordion',
        'BillingFormCard',
        'CartProductCard',
        'CatalogInterstitial',
        'CatalogProductGrid',
        'CatalogStage',
        'CheckoutMobileSummary',
        'ConfirmDialog',
        'DashboardDropdownBox',
        'DashboardSettingsForm',
        'DashboardShell',
        'ExpandableTable',
        'FeedatyWidget',
        'FileUploadBox',
        'InfoDropdown',
        'LandingInfoTabs',
        'OrderProductDropdown',
        'OrderStatusSteps',
        'OrderStepDetail',
        'Preview',
        'ToggleSwitch'
    ];

    /**
     * @public
     * `window.SkillpressUI.init = function (scope)` -- aggregator entry point.
     * @param {Document|Element} [scope] Default: document.
     */
    ns.init = global.SkillpressUI.init = function (scope) {
        var root = scope || document;
        // Nessun flag sull'aggregator: l'idempotenza e' garantita dai flag
        // per-elemento dei singoli componenti. Un flag qui renderebbe no-op
        // le chiamate ripetute sullo stesso scope (es. init(wrapper) dopo
        // ogni sostituzione di innerHTML), che sono il caso d'uso documentato.
        for (var i = 0; i < COMPONENTS.length; i++) {
            var name = COMPONENTS[i];
            var comp = ns[name];
            if (comp && typeof comp.init === 'function') {
                try {
                    comp.init(root);
                } catch (err) {
                    // Il fallimento di un componente non deve bloccare gli altri.
                    if (global.console && typeof global.console.error === 'function') {
                        global.console.error('[SkillpressUI] ' + name + '.init failed', err);
                    }
                }
            }
        }
    };

    // Auto-init globale: se i componenti sono stati caricati e questo file
    // esegue al boot pagina, attiva tutto su document.
    if (ns.helpers && typeof ns.helpers.autoInit === 'function') {
        ns.helpers.autoInit(ns.init);
    } else {
        // Fallback se _helpers.js non e' presente per qualche motivo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () { ns.init(document); });
        } else {
            ns.init(document);
        }
    }
})(typeof window !== 'undefined' ? window : this);
;
