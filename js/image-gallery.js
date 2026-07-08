/**
 * IMAGE GALLERY -- Navigazione prev/next della galleria foto prodotto.
 *
 * Legge `data-image-gallery-images` (array JSON) sul container e cicla
 * l'immagine principale (`#mainProductImage` o il primo <img>) al click
 * delle frecce. Ogni immagine puo' dichiarare `width`/`height`: il ratio
 * del container viene aggiornato sulla slide attiva (fallback: nessun
 * override). Con 0 o 1 immagine applica `.image-gallery--single` per
 * nascondere i controlli.
 *
 * NON contiene business logic: nessun prezzo, nessuna API. Emette l'evento
 * al cambio slide, il resto lo decide chi ascolta.
 *
 * API:
 *   window.SkillpressUI.ImageGallery.init(rootOrSelector?)
 *   Selector di default: '.image-gallery__container[data-image-gallery-images]'
 *
 * @public-component image-gallery
 * @public-data data-image-gallery
 * @public-event sp:image-gallery:change
 */
(function () {
    'use strict';

    var DEFAULT_SELECTOR = '[data-image-gallery]';
    var INIT_FLAG = '__skillpressImageGalleryInitialized';

    var ns = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = ns.helpers || {};

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function positiveNumber(value) {
        var number = Number(value);
        return isFinite(number) && number > 0 ? number : null;
    }

    function dimensionsFromImage(image) {
        if (!image) return null;
        var width = positiveNumber(image.width);
        var height = positiveNumber(image.height);
        if ((!width || !height) && image.src) {
            try {
                var url = new URL(image.src, window.location.href);
                width = width || positiveNumber(url.searchParams.get('width'));
                height = height || positiveNumber(url.searchParams.get('height'));
            } catch (err) { /* URL non valido: nessun override ratio */ }
        }
        return width && height ? { width: width, height: height } : null;
    }

    function applyImage(container, mainImg, image) {
        if (!image || !image.src) return;
        var dimensions = dimensionsFromImage(image);
        if (dimensions) {
            container.style.setProperty('--image-gallery-aspect-ratio', dimensions.width + ' / ' + dimensions.height);
            mainImg.setAttribute('width', String(dimensions.width));
            mainImg.setAttribute('height', String(dimensions.height));
        } else {
            container.style.removeProperty('--image-gallery-aspect-ratio');
            mainImg.removeAttribute('width');
            mainImg.removeAttribute('height');
        }
        mainImg.src = image.src;
        mainImg.alt = image.alt || '';
    }

    function bindOne(container) {
        if (!container || container[INIT_FLAG]) return container;

        var images;
        try {
            images = JSON.parse(container.getAttribute('data-image-gallery') || '[]');
        } catch (err) {
            if (window.console && console.error) {
                console.error('[image-gallery] data-image-gallery-images JSON non valido', err);
            }
            return container; // niente flag: una init() successiva ritenta
        }
        if (!Array.isArray(images)) return container;

        var gallery = container.closest('.image-gallery');
        var mainImg = container.querySelector('#mainProductImage') || container.querySelector('img');
        if (!mainImg) return container; // <img> non ancora nel DOM: ritenta al prossimo init

        // Da qui il markup e' valido: marca come inizializzato (idempotente).
        container[INIT_FLAG] = true;

        if (images.length > 0) applyImage(container, mainImg, images[0]);

        if (images.length <= 1) {
            if (gallery) gallery.classList.add('image-gallery--single');
            return container;
        }

        var idx = 0;
        var prev = container.querySelector('.image-gallery__nav-btn--prev');
        var next = container.querySelector('.image-gallery__nav-btn--next');

        function show(i) {
            idx = (i + images.length) % images.length;
            applyImage(container, mainImg, images[idx]);
            dispatch(container, 'sp:image-gallery:change', { index: idx, image: images[idx] });
        }

        if (prev) prev.addEventListener('click', function () { show(idx - 1); });
        if (next) next.addEventListener('click', function () { show(idx + 1); });
        return container;
    }

    /** @public */
    function init(target) {
        var nodes;
        if (target == null) {
            nodes = document.querySelectorAll(DEFAULT_SELECTOR);
        } else if (typeof target === 'string') {
            nodes = document.querySelectorAll(target);
        } else if (target.nodeType === 1) {
            if (target.matches(DEFAULT_SELECTOR)) { bindOne(target); return target; }
            nodes = target.querySelectorAll(DEFAULT_SELECTOR);
        } else if (target.nodeType === 9) {
            nodes = target.querySelectorAll(DEFAULT_SELECTOR);
        } else if (target.length != null) {
            nodes = target;
        } else {
            return null;
        }
        Array.prototype.forEach.call(nodes, bindOne);
        return nodes;
    }

    ns.ImageGallery = { init: init };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
