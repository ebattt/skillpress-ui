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
