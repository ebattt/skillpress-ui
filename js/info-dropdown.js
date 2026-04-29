/**
 * INFO DROPDOWN -- Behavior minimo per pannelli di aiuto contestuale
 * Fonte: Skillpress-frontend/elements-ui/js/buttons/button-info.js (Button Info)
 *        + product-page-integration/js/sections/section-1.js (toggleInfoDropdown).
 *
 * API:
 *   window.SkillpressUI.InfoDropdown.init(rootOrSelector?)
 *   Default: scansione di tutto il document.
 *
 * Contratto markup atteso:
 *   <div class="label-row">
 *     <label class="label-text">Formato (mm)</label>
 *     <button class="info-btn" type="button" data-info-trigger
 *             aria-controls="info-formato"
 *             aria-expanded="false" aria-label="Mostra informazioni">
 *       <svg>info icon</svg>
 *     </button>
 *   </div>
 *   <div id="info-formato" class="info-dropdown info-dropdown--hidden"
 *        data-info-dropdown role="region" aria-hidden="true">
 *     <p>...body content...</p>
 *   </div>
 *
 * Init (idempotente):
 *   1. Per ogni [data-info-trigger][aria-controls=ID]:
 *      a. Trova #ID ([data-info-dropdown]).
 *      b. Se #ID non ha .info-dropdown__header come primo figlio, lo auto-inietta:
 *         - title = textContent della .label-text adiacente (stessa .label-row).
 *         - close button con icona X SVG inline.
 *      c. Se i figli rimanenti non sono gia' wrappati in .info-dropdown__body,
 *         vengono wrappati.
 *   2. Wire click trigger -> toggle .info-dropdown--hidden + sync aria-expanded + aria-hidden.
 *   3. Wire click .info-dropdown__close -> chiudi.
 *   4. ESC su document -> chiudi tutti gli aperti.
 *   5. Click outside ([data-info-dropdown] e [data-info-trigger]) -> chiudi tutti gli aperti.
 *
 * Eventi emessi:
 *   - 'sp:info-dropdown:open'  bubbling, sul .info-dropdown
 *   - 'sp:info-dropdown:close' bubbling, sul .info-dropdown
 */
(function() {
    var TRIGGER_SELECTOR = '[data-info-trigger][aria-controls]';
    var DROPDOWN_INIT_FLAG = '__skillpressInfoDropdownInit';
    var TRIGGER_INIT_FLAG = '__skillpressInfoBtnInit';
    var DOC_INIT_FLAG = '__skillpressInfoDropdownDocInit';

    var CLOSE_SVG = ''
        + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"'
        + ' stroke="currentColor" stroke-width="2" stroke-linecap="round"'
        + ' stroke-linejoin="round" aria-hidden="true">'
        + '<line x1="18" y1="6" x2="6" y2="18"></line>'
        + '<line x1="6" y1="6" x2="18" y2="18"></line>'
        + '</svg>';

    function getDropdown(trigger) {
        var id = trigger.getAttribute('aria-controls');
        if (!id) return null;
        return document.getElementById(id);
    }

    function getAssociatedLabelText(trigger) {
        var row = trigger.closest('.label-row');
        if (!row) return '';
        var label = row.querySelector('.label-text');
        if (!label) return '';
        return (label.textContent || '').trim();
    }

    function ensureChrome(dropdown, trigger) {
        if (dropdown[DROPDOWN_INIT_FLAG]) return;

        var existingHeader = dropdown.querySelector(':scope > .info-dropdown__header');
        var existingBody = dropdown.querySelector(':scope > .info-dropdown__body');

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
            header.className = 'info-dropdown__header';

            var titleText = getAssociatedLabelText(trigger);
            var title = document.createElement('h4');
            title.className = 'info-dropdown__title';
            title.textContent = titleText;
            header.appendChild(title);

            var close = document.createElement('button');
            close.type = 'button';
            close.className = 'info-dropdown__close';
            close.setAttribute('aria-label', 'Chiudi');
            close.innerHTML = CLOSE_SVG;
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
            body.className = 'info-dropdown__body';
            bodyNodes.forEach(function(node) {
                body.appendChild(node);
            });
            dropdown.appendChild(body);
        }

        dropdown[DROPDOWN_INIT_FLAG] = true;
    }

    function isOpen(dropdown) {
        return !dropdown.classList.contains('info-dropdown--hidden');
    }

    function setOpen(dropdown, trigger, open) {
        dropdown.classList.toggle('info-dropdown--hidden', !open);
        dropdown.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (trigger) {
            trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        dropdown.dispatchEvent(new CustomEvent(
            open ? 'sp:info-dropdown:open' : 'sp:info-dropdown:close',
            { bubbles: true }
        ));
    }

    function findTriggerFor(dropdown) {
        if (!dropdown.id) return null;
        return document.querySelector('[data-info-trigger][aria-controls="' + dropdown.id + '"]');
    }

    function closeAll() {
        Array.prototype.forEach.call(
            document.querySelectorAll('[data-info-dropdown]:not(.info-dropdown--hidden)'),
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
        var close = event.target.closest('.info-dropdown__close');
        if (!close) return;
        var dropdown = close.closest('[data-info-dropdown]');
        if (!dropdown) return;
        setOpen(dropdown, findTriggerFor(dropdown), false);
    }

    function onDocClick(event) {
        // Click outside: chiudi se non dentro un trigger ne' un dropdown aperto.
        if (event.target.closest('[data-info-trigger]')) return;
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
            dropdown[DROPDOWN_INIT_FLAG + 'Close'] = true;
        }

        trigger[TRIGGER_INIT_FLAG] = true;
    }

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

    document.addEventListener('DOMContentLoaded', function() {
        init();
    });

    window.SkillpressUI = window.SkillpressUI || {};
    window.SkillpressUI.InfoDropdown = {
        init: init
    };
})();
