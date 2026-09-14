/**
 * IMAGE GALLERY -- Navigazione prev/next della galleria foto prodotto.
 *
 * Legge `data-image-gallery` (array JSON) sul container e cicla
 * l'immagine principale (`#mainProductImage` o il primo <img>) al click
 * delle frecce. `width`/`height` riservano spazio prima del caricamento;
 * al load il ratio segue sempre le dimensioni naturali del file ricevuto.
 * I parametri di resize dell'URL non sono metadati dell'immagine.
 * Con 0 o 1 immagine applica `.image-gallery--single` per
 * nascondere i controlli.
 *
 * NON contiene business logic: nessun prezzo, nessuna API. Emette l'evento
 * al cambio slide, il resto lo decide chi ascolta.
 *
 * API:
 *   window.SkillpressUI.ImageGallery.init(rootOrSelector?)
 *   Selector di default: '.image-gallery__container[data-image-gallery]'
 *
 * @public-component image-gallery
 * @public-data data-image-gallery
 * @public-event sp:image-gallery:change
 */
(function () {
    'use strict';

    var DEFAULT_SELECTOR = '[data-image-gallery]';
    var INIT_FLAG = '__skillpressImageGalleryInitialized';
    var SIZE_FLAG = '__skillpressImageGallerySizeBound';

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
        return width && height ? { width: width, height: height } : null;
    }

    function applyDimensions(container, mainImg, dimensions) {
        if (dimensions) {
            container.style.setProperty('--image-gallery-aspect-ratio', dimensions.width + ' / ' + dimensions.height);
            mainImg.setAttribute('width', String(dimensions.width));
            mainImg.setAttribute('height', String(dimensions.height));
        } else {
            container.style.removeProperty('--image-gallery-aspect-ratio');
            mainImg.removeAttribute('width');
            mainImg.removeAttribute('height');
        }
    }

    function syncNaturalDimensions(container, mainImg) {
        if (!mainImg.complete || !mainImg.naturalWidth || !mainImg.naturalHeight) return;
        // Durante cambi rapidi currentSrc puo' ancora indicare la slide
        // precedente: non applicarne le dimensioni alla nuova richiesta.
        if (mainImg.currentSrc && mainImg.currentSrc !== mainImg.src) return;
        applyDimensions(container, mainImg, {
            width: mainImg.naturalWidth,
            height: mainImg.naturalHeight
        });
    }

    function applyImage(container, mainImg, image, preserveDimensions) {
        if (!image || !image.src) return;
        // Durante la navigazione il browser puo' mostrare ancora la foto
        // precedente: conserva il suo box fino al load della nuova slide.
        if (!preserveDimensions) applyDimensions(container, mainImg, dimensionsFromImage(image));
        // L'array governa lo src di ogni slide. Uno srcset rimasto sull'img
        // SSR continuerebbe invece a selezionare la vecchia foto.
        mainImg.removeAttribute('srcset');
        mainImg.removeAttribute('sizes');
        if (mainImg.getAttribute('src') !== image.src) mainImg.src = image.src;
        mainImg.alt = image.alt || '';
        // Copre anche file gia' caricati dalla risposta SSR o dalla cache.
        syncNaturalDimensions(container, mainImg);
    }

    function bindOne(container) {
        if (!container || container[INIT_FLAG]) return container;

        var images;
        try {
            images = JSON.parse(container.getAttribute('data-image-gallery') || '[]');
        } catch (err) {
            if (window.console && console.error) {
                console.error('[image-gallery] data-image-gallery JSON non valido', err);
            }
            return container; // niente flag: una init() successiva ritenta
        }
        if (!Array.isArray(images)) {
            if (window.console && console.error) {
                console.error('[image-gallery] data-image-gallery deve essere un array JSON, ricevuto:', images);
            }
            return container;
        }

        // Item senza src non possono cambiare immagine: scartali subito, cosi'
        // show() non avanza indice+evento a vuoto.
        var discardedIndexes = [];
        images = images.filter(function (image, index) {
            if (image && image.src) return true;
            discardedIndexes.push(index);
            return false;
        });
        if (discardedIndexes.length && window.console && console.error) {
            console.error('[image-gallery] data-image-gallery: scartati item senza src agli indici ' + discardedIndexes.join(', '));
        }

        var gallery = container.closest('.image-gallery');
        var mainImg = container.querySelector('#mainProductImage') || container.querySelector('img');
        if (!mainImg) return container; // <img> non ancora nel DOM: ritenta al prossimo init

        if (!mainImg[SIZE_FLAG]) {
            mainImg.addEventListener('load', function () {
                syncNaturalDimensions(container, mainImg);
            });
            mainImg[SIZE_FLAG] = true;
        }
        if (images.length > 0) applyImage(container, mainImg, images[0]);
        else syncNaturalDimensions(container, mainImg);

        if (images.length <= 1) {
            // Da qui il markup e' valido: marca come inizializzato (idempotente).
            container[INIT_FLAG] = true;
            if (gallery) gallery.classList.add('image-gallery--single');
            return container;
        }

        var idx = 0;
        var prev = container.querySelector('.image-gallery__nav-btn--prev');
        var next = container.querySelector('.image-gallery__nav-btn--next');

        if (!prev || !next) {
            if (window.console && console.error) {
                console.error('[image-gallery] frecce prev/next assenti dal DOM con ' + images.length + ' immagini: init rimandata, ritenta dopo l\'iniezione dei bottoni');
            }
            return container; // niente flag: una init() successiva aggancia le frecce
        }

        // Da qui il markup e' valido: marca come inizializzato (idempotente).
        container[INIT_FLAG] = true;

        function show(i) {
            idx = (i + images.length) % images.length;
            applyImage(container, mainImg, images[idx], true);
            dispatch(container, 'sp:image-gallery:change', { index: idx, image: images[idx] });
        }

        prev.addEventListener('click', function () { show(idx - 1); });
        next.addEventListener('click', function () { show(idx + 1); });
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
