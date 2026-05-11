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
        'ConfirmDialog',
        'DashboardDropdownBox',
        'DashboardSettingsForm',
        'DashboardShell',
        'FeedatyWidget',
        'FileUploadBox',
        'InfoDropdown',
        'OrderProductDropdown',
        'OrderStatusSteps',
        'OrderStepDetail',
        'OrdersTable',
        'Preview',
        'SupplierActivityTable',
        'ToggleSwitch'
    ];

    /**
     * @public
     * `window.SkillpressUI.init = function (scope)` -- aggregator entry point.
     * @param {Document|Element} [scope] Default: document.
     */
    ns.init = global.SkillpressUI.init = function (scope) {
        var root = scope || document;
        if (root.__skillpressInitialized) return;
        root.__skillpressInitialized = true;

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
