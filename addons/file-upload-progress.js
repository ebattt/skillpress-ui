/** Esempio applicativo servito dal CDN: attesa dell'upload dopo l'invio dal modale.
 * Non valida il file e non decide gli stati finali. All'evento
 * sp:file-upload-box:submit invia il file con XMLHttpRequest (avanzamento
 * misurabile) e, se il modale e' stato aperto da un box file
 * (.product-file-box con data-order-detail-file-id), mostra li' lo stato
 * "Caricamento". Se l'opener e' un altro bottone (es. "Carica contabile"),
 * l'invio avviene lo stesso e l'esito arriva a onSuccess/onError con box null.
 *
 * Uso:
 *   createFileUploadProgress({
 *       modal: '#dashboard-file-upload-modal',   // root data-file-upload-box
 *       url: '/ordini/upload',                   // POST multipart, campo "file"
 *       extraData: function (formData, box, opener) {   // facoltativo: id ordine, id file...
 *           formData.append('idFile', box ? box.getAttribute('data-order-detail-file-id') : 'contabile');
 *       },
 *       onSuccess: function (box, responseText, xhr, opener) { ... },   // ridisegna box (o pagina) con lo stato del server
 *       onError: function (box, xhr, opener) { ... }                    // facoltativo: il box e' gia' ripristinato
 *   });
 *
 * Senza onSuccess: un box passa a "Da verificare" con il nome del file inviato;
 * un opener senza box viene solo riabilitato (l'applicazione decide cosa mostrare).
 */
(function () {
    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    }

    function xhrTransport(url) {
        return function (formData, hooks) {
            var xhr = new XMLHttpRequest();
            xhr.upload.onprogress = function (event) {
                if (event.lengthComputable) hooks.progress(Math.round(event.loaded / event.total * 100));
            };
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) hooks.done(xhr.responseText, xhr);
                else hooks.fail(xhr);
            };
            xhr.onerror = function () { hooks.fail(xhr); };
            xhr.onabort = function () { hooks.fail(xhr); };
            xhr.open('POST', url);
            xhr.send(formData);
            return xhr;
        };
    }

    window.createFileUploadProgress = function (options) {
        options = options || {};
        var modal = typeof options.modal === 'string' ? document.querySelector(options.modal) : options.modal;
        if (!modal) throw new Error('createFileUploadProgress: modale non trovato');
        if (modal.fileUploadProgress) return modal.fileUploadProgress;
        if (!options.url && !options.transport) throw new Error('createFileUploadProgress: serve url o transport');

        var transport = options.transport || xhrTransport(options.url);
        var fieldName = options.fieldName || 'file';
        var errorMessage = options.errorMessage || 'Caricamento non riuscito. Riprova.';
        var busy = false;
        var currentOpener = null;
        var currentBox = null;
        var snapshot = null;

        function openers() {
            return Array.prototype.slice.call(document.querySelectorAll('[data-file-upload-box-open]'));
        }

        // Ricorda chi ha aperto il modale: l'evento di invio non lo dice.
        // In fase di cattura, cosi' arriva prima del runtime del componente.
        document.addEventListener('click', function (event) {
            var opener = event.target.closest ? event.target.closest('[data-file-upload-box-open]') : null;
            if (!opener || opener.getAttribute('aria-disabled') === 'true') return;
            currentOpener = opener;
            currentBox = opener.closest('[data-order-detail-file-id]') || opener.closest('.product-file-box');
        }, true);

        function beforeUnload(event) {
            event.preventDefault();
            event.returnValue = '';
        }

        function setBusy(on) {
            busy = on;
            openers().forEach(function (button) {
                if (on) button.setAttribute('aria-disabled', 'true');
                else button.removeAttribute('aria-disabled');
            });
            if (on) window.addEventListener('beforeunload', beforeUnload);
            else window.removeEventListener('beforeunload', beforeUnload);
        }

        function removeNotice(anchor) {
            var next = anchor.nextElementSibling;
            if (next && next.classList.contains('product-file-box__notice')) next.parentNode.removeChild(next);
        }

        function addNotice(anchor) {
            var notice = document.createElement('p');
            notice.className = 'product-file-box__notice product-file-box__notice--error';
            notice.setAttribute('role', 'alert');
            notice.textContent = errorMessage;
            anchor.parentNode.insertBefore(notice, anchor.nextSibling);
        }

        function titleOf(box) {
            var title = box.querySelector('.product-file-box__title');
            return title ? title.textContent : '';
        }

        function renderUploading(box, fileName) {
            box.className = 'product-file-box product-file-box--uploading';
            box.style.removeProperty('--progress');
            box.innerHTML =
                '<span class="product-file-box__icon product-file-box__icon--uploading" aria-hidden="true"></span>' +
                '<span class="product-file-box__body">' +
                    '<span class="product-file-box__title">' + escapeHtml(snapshot.title) + '</span>' +
                    '<span class="product-file-box__meta">' + escapeHtml(fileName) + '</span>' +
                '</span>' +
                '<span class="product-file-box__state product-file-box__state--uploading">Caricamento</span>' +
                '<span class="product-file-box__progress" aria-hidden="true"></span>';
            if (box.scrollIntoView) box.scrollIntoView({ block: 'nearest' });
        }

        function setProgress(box, percent) {
            if (!box) return;
            var state = box.querySelector('.product-file-box__state');
            if (!state) return;
            percent = Math.max(0, Math.min(100, Math.round(percent)));
            if (percent >= 100) {
                // Il browser ha finito di inviare: ora lavora il server, barra indeterminata.
                box.style.removeProperty('--progress');
                state.textContent = 'Elaborazione';
            } else {
                box.style.setProperty('--progress', percent + '%');
                state.textContent = 'Caricamento ' + percent + '%';
            }
        }

        function renderReady(box, fileName) {
            box.className = 'product-file-box product-file-box--readonly product-file-box--ready';
            box.removeAttribute('style');
            box.innerHTML =
                '<span class="product-file-box__icon product-file-box__icon--ready product-file-box__icon--file" aria-hidden="true"></span>' +
                '<span class="product-file-box__body">' +
                    '<span class="product-file-box__title">' + escapeHtml(snapshot.title) + '</span>' +
                    '<span class="product-file-box__meta">' + escapeHtml(fileName) + '</span>' +
                '</span>' +
                '<span class="product-file-box__state product-file-box__state--warning">Da verificare</span>';
        }

        function restore(box) {
            box.className = snapshot.className;
            box.innerHTML = snapshot.html;
            if (snapshot.style === null) box.removeAttribute('style');
            else box.setAttribute('style', snapshot.style);
        }

        modal.addEventListener('sp:file-upload-box:submit', function (event) {
            if (busy) {
                if (window.console && console.warn) console.warn('[file-upload-progress] invio ignorato: un upload e\' gia\' in corso');
                return;
            }
            var opener = currentOpener;
            var box = currentBox;
            var fileName = event.detail.fileName;
            var anchor = box || (opener && opener.closest('.order-action-box')) || opener;

            if (box) {
                snapshot = { className: box.className, html: box.innerHTML, style: box.getAttribute('style'), title: titleOf(box) };
            }
            if (anchor) removeNotice(anchor);

            var formData = new FormData();
            formData.append(fieldName, event.detail.file, fileName);
            if (options.extraData) options.extraData(formData, box, opener);

            setBusy(true);
            if (box) renderUploading(box, fileName);
            else if (opener) opener.setAttribute('aria-busy', 'true');

            transport(formData, {
                progress: function (percent) { setProgress(box, percent); },
                done: function (responseText, xhr) {
                    setBusy(false);
                    if (opener) opener.removeAttribute('aria-busy');
                    if (box) box.removeAttribute('style');
                    if (options.onSuccess) options.onSuccess(box, responseText, xhr, opener);
                    else if (box) renderReady(box, fileName);
                },
                fail: function (xhr) {
                    setBusy(false);
                    if (opener) opener.removeAttribute('aria-busy');
                    if (box) restore(box);
                    if (anchor) addNotice(anchor);
                    if (options.onError) options.onError(box, xhr, opener);
                }
            }, box, opener);
        });

        modal.fileUploadProgress = {
            isBusy: function () { return busy; },
            currentBox: function () { return currentBox; },
            currentOpener: function () { return currentOpener; }
        };
        return modal.fileUploadProgress;
    };
})();
