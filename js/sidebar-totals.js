/**
 * SIDEBAR TOTALS -- toggle del pannello "riepilogo" nel box Totale del configuratore
 * Gestisce apertura, chiusura e attributi ARIA del pannello riepilogo.
 *
 * API:
 *   window.SkillpressUI.SidebarTotals.init(rootOrSelector?)
 *   Default: scansione di tutto il document.
 *
 * @public-component sidebar-totals
 * @public-data data-sidebar-totals-toggle, data-sidebar-totals
 * @public-event sp:sidebar-totals:open, sp:sidebar-totals:close
 *
 * Il JS gestisce il toggle e sincronizza aria-expanded/aria-hidden.
 * Trigger, pannello e contenuto sono server-rendered.
 *
 * Contratto markup:
 *   <button type="button" class="sidebar-totals__btn" data-sidebar-totals-toggle
 *           aria-controls="riepilogoContent" aria-expanded="false">
 *     Mostra riepilogo
 *     <svg aria-hidden="true">...chevron...</svg>
 *   </button>
 *   <div id="riepilogoContent" class="sidebar-totals__content"
 *        data-sidebar-totals aria-hidden="true">
 *     ...contenuto...
 *   </div>
 *
 * Sono accettate anche le classi `.sidebar-totals__btn` e
 * `.sidebar-totals__content`. L'init e' idempotente. Escape chiude i pannelli
 * aperti e ripristina il focus sul trigger.
 */
(function() {
    'use strict';

    var TRIGGER_SELECTOR =
        '[data-sidebar-totals-toggle][aria-controls], .sidebar-totals__btn[aria-controls]';
    var PANEL_SELECTOR = '[data-sidebar-totals], .sidebar-totals__content';
    // Concatenare '[aria-hidden="false"]' a PANEL_SELECTOR come stringa
    // applicherebbe il suffisso solo all'ultimo dei due selettori (dopo la
    // virgola): serve un selettore composto scritto per intero.
    var OPEN_PANEL_SELECTOR =
        '[data-sidebar-totals][aria-hidden="false"], .sidebar-totals__content[aria-hidden="false"]';
    var TRIGGER_INIT_FLAG = '__skillpressSidebarTotalsTriggerInitialized';
    var DOC_INIT_FLAG = '__skillpressSidebarTotalsDocInitialized';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    // Escape per valori inseriti in un selettore CSS [id="..."].
    function escapeAttrValue(value) {
        return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    }

    function matchesPanel(el) {
        return !!(el && el.matches && el.matches(PANEL_SELECTOR));
    }

    function findPanelById(id, root) {
        var panel = document.getElementById(id);
        // document.getElementById puo' risolvere un ID che vive fuori dal
        // root del trigger (es. shadow root con lo stesso ID nel documento
        // principale): se il root locale trova un candidato diverso, quello
        // ha la precedenza.
        if (root && root !== document && root.querySelector) {
            var local = root.querySelector('[id="' + escapeAttrValue(id) + '"]');
            if (local) panel = local;
        }
        if (!panel) return null;
        // Il target deve essere davvero un pannello sidebar-totals: un
        // aria-controls che punta a un ID estraneo (typo, riuso ID) non deve
        // poter nascondere/mostrare un elemento a caso.
        return matchesPanel(panel) ? panel : null;
    }

    function getPanel(trigger) {
        var id = trigger.getAttribute('aria-controls');
        if (!id) return null;
        var root = trigger.getRootNode && trigger.getRootNode();
        return findPanelById(id, root);
    }

    function isOpen(panel) {
        return panel.getAttribute('aria-hidden') === 'false';
    }

    // Tutti i trigger (nel documento) che puntano a questo pannello, non solo
    // il primo: se piu' trigger condividono lo stesso aria-controls restano
    // sincronizzati tra loro.
    function findTriggersFor(panel) {
        if (!panel.id) return [];
        var esc = escapeAttrValue(panel.id);
        return Array.prototype.slice.call(document.querySelectorAll(
            '[data-sidebar-totals-toggle][aria-controls="' + esc + '"], ' +
            '.sidebar-totals__btn[aria-controls="' + esc + '"]'
        ));
    }

    function setOpen(panel, triggers, open, sourceTrigger) {
        var wasOpen = isOpen(panel);
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        triggers.forEach(function(trigger) {
            trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        // F015-style focus management, come info-dropdown: salva il trigger
        // che ha aperto, e su chiusura restituisce il focus solo se era
        // rimasto dentro al pannello (mai rubarlo se l'utente ha gia'
        // spostato l'attenzione altrove).
        if (open && !wasOpen) {
            panel.__lastTrigger = sourceTrigger || triggers[0] || null;
        } else if (!open && wasOpen) {
            var lastTrigger = panel.__lastTrigger;
            if (lastTrigger && typeof lastTrigger.focus === 'function') {
                var active = document.activeElement;
                if (active === document.body || active === document.documentElement || panel.contains(active)) {
                    try { lastTrigger.focus(); } catch (e) { /* noop */ }
                }
            }
            panel.__lastTrigger = null;
        }

        dispatch(panel, open ? 'sp:sidebar-totals:open' : 'sp:sidebar-totals:close');
    }

    function closeAll() {
        Array.prototype.forEach.call(
            document.querySelectorAll(OPEN_PANEL_SELECTOR),
            function(panel) {
                setOpen(panel, findTriggersFor(panel), false);
            }
        );
    }

    function onTriggerClick(event) {
        var trigger = event.currentTarget;
        var panel = getPanel(trigger);
        if (!panel) return;
        setOpen(panel, findTriggersFor(panel), !isOpen(panel), trigger);
    }

    function onKeydown(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            closeAll();
        }
    }

    function bindTrigger(trigger) {
        var panel = getPanel(trigger);
        if (!panel) return;

        // Sync iniziale: se il markup non specifica aria-hidden, il pannello
        // e' chiuso di default (coerente col CSS: stato base = collassato).
        if (!panel.hasAttribute('aria-hidden')) {
            panel.setAttribute('aria-hidden', 'true');
        }
        trigger.setAttribute('aria-expanded', isOpen(panel) ? 'true' : 'false');

        if (trigger[TRIGGER_INIT_FLAG]) return;
        trigger.addEventListener('click', onTriggerClick);
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

        if (root.matches && root.matches(TRIGGER_SELECTOR)) {
            bindTrigger(root);
        }
        Array.prototype.forEach.call(
            root.querySelectorAll(TRIGGER_SELECTOR),
            bindTrigger
        );

        if (!document[DOC_INIT_FLAG]) {
            document.addEventListener('keydown', onKeydown);
            document[DOC_INIT_FLAG] = true;
        }
    }

    ns.SidebarTotals = {
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
