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
        return Array.prototype.filter.call(container.querySelectorAll(SECTION_SELECTOR), function(section) {
            return section.closest(ACCORDION_SELECTOR) === container;
        });
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
        // Inert removes interaction without disabling or clearing form values.
        if (content) content.inert = !isExpanded;
        section.classList.toggle('sp-accordion__section--expanded', isExpanded);
        setContentHeight(section, isExpanded, animate !== false, startHeight);

        if (trigger) {
            trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
    }

    function emit(section, isExpanded) {
        emitEvent(section, isExpanded ? 'sp:accordion:open' : 'sp:accordion:close');
    }

    function initSection(section) {
        var content = getContent(section);
        // A repeated init may discover new sections or a replaced content node;
        // it must not reset a transition already running on an existing one.
        if (!content || section.__skillpressAccordionContent === content) return;
        syncSection(section, section.classList.contains('sp-accordion__section--expanded'), false);
        section.__skillpressAccordionContent = content;
    }

    function initContainer(container) {
        if (!container) return container;
        if (!container.__skillpressAccordionInitialized) {
            container.addEventListener('click', onClick);
            container.addEventListener('invalid', onInvalid, true);
            container.__skillpressAccordionInitialized = true;
        }
        getSections(container).forEach(initSection);
        return container;
    }

    // Both user actions and the public API use one synchronous state change.
    // Only a manual opening closes siblings; animation callbacks never decide
    // which sections are open. Notify consumers after all states are applied.
    function setExpanded(section, expanded, exclusive, animate) {
        if (!section || !section.matches || !section.matches(SECTION_SELECTOR)) return;

        var container = section.closest(ACCORDION_SELECTOR);
        if (container) initContainer(container);
        else initSection(section);

        // Focus changes can synchronously run consumer blur/change handlers.
        // Do this once, while the previous state is still coherent; compute
        // actual transitions afterwards so reentrant API calls are respected.
        var closing = expanded ? (exclusive && container ? getSections(container).filter(function(sibling) {
            return sibling !== section;
        }) : []) : [section];
        if (closing.some(function(target) {
            var content = getContent(target);
            return content && content.contains(document.activeElement);
        })) {
            var trigger = getTrigger(section);
            if (trigger) trigger.focus({ preventScroll: true });
        }

        var changes = [];
        function change(target, nextState) {
            if (target.classList.contains('sp-accordion__section--expanded') === nextState) return;
            syncSection(target, nextState, animate !== false);
            changes.push({ section: target, expanded: nextState });
        }
        change(section, Boolean(expanded));
        if (exclusive && expanded && container) {
            getSections(container).forEach(function(sibling) {
                if (sibling !== section) change(sibling, false);
            });
        }
        changes.forEach(function(item) {
            // A consumer of an earlier event may already have issued a newer
            // command. Do not notify an obsolete state after that command.
            if (item.section.classList.contains('sp-accordion__section--expanded') === item.expanded) {
                emit(item.section, item.expanded);
            }
        });
    }

    function onClick(event) {
        var trigger = event.target.closest(TRIGGER_SELECTOR);
        var container = event.currentTarget;
        if (!trigger || trigger.closest(ACCORDION_SELECTOR) !== container) return;
        var section = trigger.closest(SECTION_SELECTOR);
        if (section) {
            setExpanded(section, !section.classList.contains('sp-accordion__section--expanded'), true);
        }
    }

    function onInvalid(event) {
        var section = event.target.closest(SECTION_SELECTOR);
        if (section && section.closest(ACCORDION_SELECTOR) === event.currentTarget) {
            // Native form validation must be able to reveal and focus its field
            // immediately, without closing other sections containing errors.
            setExpanded(section, true, false, false);
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
        if (root.closest) {
            initContainer(root.closest(ACCORDION_SELECTOR));
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
