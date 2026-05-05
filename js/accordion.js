(function() {
    var ACCORDION_SELECTOR = '[data-accordion]';
    var SECTION_SELECTOR = '[data-accordion-section]';
    var TRIGGER_SELECTOR = '[data-accordion-trigger]';

    function getSections(container) {
        return Array.prototype.slice.call(container.querySelectorAll(SECTION_SELECTOR));
    }

    function getTrigger(section) {
        return section.querySelector(TRIGGER_SELECTOR);
    }

    function getContent(section) {
        var children = Array.prototype.slice.call(section.children);
        for (var i = 0; i < children.length; i++) {
            if (children[i].classList.contains('accordion__content')) {
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
                if (section.classList.contains('accordion__section--expanded')) {
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

        section.classList.toggle('accordion__section--expanded', isExpanded);
        setContentHeight(section, isExpanded, animate !== false);

        if (trigger) {
            trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
    }

    function emit(section, isExpanded) {
        section.dispatchEvent(new CustomEvent(
            isExpanded ? 'sp:accordion:open' : 'sp:accordion:close',
            { bubbles: true }
        ));
    }

    function closeSiblings(container, currentSection) {
        getSections(container).forEach(function(section) {
            if (section === currentSection || !section.classList.contains('accordion__section--expanded')) {
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

        nextState = !section.classList.contains('accordion__section--expanded');

        syncSection(section, nextState, true);
        emit(section, nextState);

        if (nextState) {
            window.requestAnimationFrame(function() {
                closeSiblings(container, section);
            });
        }
    }

    function init(container) {
        if (!container || container.__skillpressAccordionInit) {
            return container;
        }

        container.addEventListener('click', onClick);
        container.__skillpressAccordionInit = true;

        getSections(container).forEach(function(section) {
            syncSection(section, section.classList.contains('accordion__section--expanded'), false);
        });

        return container;
    }

    document.addEventListener('DOMContentLoaded', function() {
        Array.prototype.forEach.call(document.querySelectorAll(ACCORDION_SELECTOR), init);
    });

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.Accordion = {
        init: init
    };
})();
