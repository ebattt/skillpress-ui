(function() {
    var ACCORDION_SELECTOR = '[data-accordion]';
    var SECTION_SELECTOR = '[data-accordion-section]';
    var TRIGGER_SELECTOR = '[data-accordion-trigger]';
    var ICON_SELECTOR = '[data-accordion-icon]';

    function getSections(container) {
        return Array.prototype.slice.call(container.querySelectorAll(SECTION_SELECTOR));
    }

    function getTrigger(section) {
        return section.querySelector(TRIGGER_SELECTOR);
    }

    function getIcon(section) {
        return section.querySelector(ICON_SELECTOR);
    }

    function setIconState(icon, isExpanded) {
        if (!icon) {
            return;
        }

        var openIcon = icon.getAttribute('data-icon-open') || 'remove';
        var closedIcon = icon.getAttribute('data-icon-closed') || 'add';
        icon.textContent = isExpanded ? openIcon : closedIcon;
    }

    function syncSection(section, isExpanded) {
        var trigger = getTrigger(section);
        var icon = getIcon(section);

        section.classList.toggle('expanded', isExpanded);

        if (trigger) {
            trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }

        setIconState(icon, isExpanded);
    }

    function emit(section, isExpanded) {
        section.dispatchEvent(new CustomEvent(
            isExpanded ? 'sp:accordion:open' : 'sp:accordion:close',
            { bubbles: true }
        ));
    }

    function closeSiblings(container, currentSection) {
        getSections(container).forEach(function(section) {
            if (section === currentSection || !section.classList.contains('expanded')) {
                return;
            }

            syncSection(section, false);
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

        nextState = !section.classList.contains('expanded');

        if (nextState) {
            closeSiblings(container, section);
        }

        syncSection(section, nextState);
        emit(section, nextState);
    }

    function init(container) {
        if (!container || container.__skillpressAccordionInit) {
            return container;
        }

        container.addEventListener('click', onClick);
        container.__skillpressAccordionInit = true;

        getSections(container).forEach(function(section) {
            syncSection(section, section.classList.contains('expanded'));
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
