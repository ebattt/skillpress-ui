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
