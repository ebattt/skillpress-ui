/**
 * CatalogStage -- hero/landing slide stage with optional autoplay.
 *
 * @public-component catalog-stage
 * @public-data data-catalog-stage, data-catalog-stage-init, data-catalog-stage-slide, data-catalog-stage-dot, data-catalog-stage-autoplay, data-catalog-stage-interval
 * @public-event (none)
 */
(function () {
    'use strict';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function toArray(value) {
        return Array.prototype.slice.call(value || []);
    }

    function setActive(state, index) {
        var nextIndex = (index + state.slides.length) % state.slides.length;

        state.slides.forEach(function (slide, slideIndex) {
            var active = slideIndex === nextIndex;
            slide.classList.toggle('catalog-stage__slide--active', active);
            slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        });

        state.dots.forEach(function (dot, dotIndex) {
            var active = dotIndex === nextIndex;
            dot.classList.toggle('catalog-stage__dot--active', active);
            dot.setAttribute('aria-current', active ? 'true' : 'false');
        });

        state.activeIndex = nextIndex;
    }

    function startAutoplay(state) {
        if (!state.autoplay || state.slides.length < 2 || state.timer) return;

        state.timer = window.setInterval(function () {
            setActive(state, state.activeIndex + 1);
        }, state.interval);
    }

    function stopAutoplay(state) {
        if (!state.timer) return;
        window.clearInterval(state.timer);
        state.timer = null;
    }

    function initRoot(root) {
        if (!root || root.__skillpressCatalogStageInitialized) return;

        var slides = toArray(root.querySelectorAll('[data-catalog-stage-slide]'));
        var dots = toArray(root.querySelectorAll('[data-catalog-stage-dot]'));
        var state;

        if (slides.length < 2) return;

        state = {
            activeIndex: Math.max(0, slides.findIndex(function (slide) {
                return slide.classList.contains('catalog-stage__slide--active');
            })),
            autoplay: root.getAttribute('data-catalog-stage-autoplay') !== 'false',
            dots: dots,
            interval: parseInt(root.getAttribute('data-catalog-stage-interval') || '4500', 10),
            root: root,
            slides: slides,
            timer: null
        };

        root.__skillpressCatalogStageInitialized = true;
        root.setAttribute('data-catalog-stage-init', '1');

        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                setActive(state, index);
                stopAutoplay(state);
            });
        });

        root.addEventListener('mouseenter', function () { stopAutoplay(state); });
        root.addEventListener('mouseleave', function () { startAutoplay(state); });
        root.addEventListener('focusin', function () { stopAutoplay(state); });
        root.addEventListener('focusout', function () { startAutoplay(state); });

        setActive(state, state.activeIndex);
        startAutoplay(state);
    }

    /** @public */
    function init(scope) {
        var root = scope || document;

        if (root.matches && root.matches('[data-catalog-stage]')) {
            initRoot(root);
            return;
        }

        toArray(root.querySelectorAll('[data-catalog-stage]')).forEach(initRoot);
    }

    ns.CatalogStage = { init: init };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
