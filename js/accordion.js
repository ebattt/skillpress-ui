/**
 * Accordion -- collapsible sections with single-open behavior.
 *
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
        // deprecated alias, removed in v0.3
        container.__skillpressAccordionInit = true;

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
