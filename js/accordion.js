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

    function setContentHeight(section, isExpanded, animate, startHeight) {
        var content = getContent(section);
        if (!content) return;
        if (content.__accordionCleanup) content.__accordionCleanup();

        function settle() {
            if (content.__accordionCleanup) content.__accordionCleanup();
            content.style.maxHeight = isExpanded ? 'none' : '0px';
            content.style.overflow = isExpanded ? 'visible' : 'hidden';
        }

        if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            settle();
            return;
        }

        content.style.overflow = 'hidden';
        content.style.maxHeight = startHeight + 'px';
        content.offsetHeight;
        content.style.maxHeight = isExpanded ? content.scrollHeight + 'px' : '0px';

        function onEnd(event) {
            if (event.target === content && event.propertyName === 'max-height') settle();
        }
        // Also release the height when no transition event occurs (empty/hidden content).
        var style = window.getComputedStyle(content);
        function milliseconds(value) {
            return parseFloat(value) * (value.trim().slice(-2) === 'ms' ? 1 : 1000) || 0;
        }
        var durations = style.transitionDuration.split(',').map(milliseconds);
        var delays = style.transitionDelay.split(',').map(milliseconds);
        var duration = Math.max.apply(null, durations) + Math.max.apply(null, delays);
        var timer = window.setTimeout(settle, duration + 50);
        content.addEventListener('transitionend', onEnd);
        content.__accordionCleanup = function() {
            window.clearTimeout(timer);
            content.removeEventListener('transitionend', onEnd);
            content.__accordionCleanup = null;
        };
    }

    function syncSection(section, isExpanded, animate) {
        var trigger = getTrigger(section);

        var content = getContent(section);
        var startHeight = content ? content.getBoundingClientRect().height : 0;
        section.classList.toggle('sp-accordion__section--expanded', isExpanded);
        setContentHeight(section, isExpanded, animate !== false, startHeight);

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

    /** Imposta lo stato applicativo senza modificare le altre sezioni. */
    function setExpanded(section, expanded) {
        if (!section || !section.matches || !section.matches(SECTION_SELECTOR)) {
            return;
        }

        var container = section.closest(ACCORDION_SELECTOR);
        if (container) {
            initContainer(container);
        }

        var wasExpanded = section.classList.contains('sp-accordion__section--expanded');
        if (wasExpanded === Boolean(expanded)) return;
        syncSection(section, Boolean(expanded), true);
        if (wasExpanded !== Boolean(expanded)) {
            emit(section, Boolean(expanded));
        }
    }

    function open(section) {
        setExpanded(section, true);
    }

    function close(section) {
        setExpanded(section, false);
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
        init: init,
        open: open,
        close: close
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
