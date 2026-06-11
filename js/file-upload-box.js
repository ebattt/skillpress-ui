/**
 * FileUploadBox -- modal/dialog box for file uploads.
 *
 * @public-component file-modal
 * @public-data data-file-upload-box, data-file-upload-box-open, data-file-upload-box-role
 * @public-event sp:file-upload-box:open, sp:file-upload-box:close, sp:file-upload-box:submit
 *
 * Il JS scrive innerHTML solo in risposta ad azioni utente (lista dei file
 * scelti, stati di upload); guscio del modale, dropzone e form sono
 * server-rendered.
 */
(function () {
    'use strict';

    var namespace = window.SkillpressUI = window.SkillpressUI || {};
    var helpers = namespace.helpers || {};
    var initializedOpeners = false;

    function escapeHtml(value) {
        if (typeof helpers.escapeHtml === 'function') return helpers.escapeHtml(value);
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function dispatch(target, name, detail) {
        if (typeof helpers.dispatch === 'function') {
            try { helpers.dispatch(target, name, detail); return; } catch (e) { /* fallthrough */ }
        }
        target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
    }

    function truncateFileName(name) {
        var value = String(name || '');
        if (value.length <= 34) return value;
        return value.slice(0, 20) + '...' + value.slice(-11);
    }

    function formatSize(bytes) {
        if (!bytes && bytes !== 0) return '-';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function getRole(root, role) {
        return root.querySelector('[data-file-upload-box-role="' + role + '"]');
    }

    function syncSubmit(root) {
        var submit = getRole(root, 'submit');
        if (!submit) return;
        submit.disabled = !root.__fileUploadBoxPendingFile;
    }

    function renderEmpty(root, text) {
        var tableBody = getRole(root, 'table-body');
        if (!tableBody) return;
        // safe: text e' costante o stringa controllata, escapata.
        tableBody.innerHTML = '<tr><td colspan="6" class="file-modal__table-empty">' +
            escapeHtml(text || 'Non sono presenti file') +
        '</td></tr>';
    }

    function renderFile(root, file) {
        var tableBody = getRole(root, 'table-body');
        if (!tableBody || !file) return;

        var date = new Date().toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // safe: file.name/size + date sono escapati prima di entrare nel template.
        tableBody.innerHTML = '<tr>' +
            '<td class="file-modal-table__cell">1</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--name">' + escapeHtml(truncateFileName(file.name)) + '</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--meta">' + escapeHtml(date) + '</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--meta">' + escapeHtml(formatSize(file.size)) + '</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--meta">' +
                '<span class="file-modal-status file-modal-status--warning">Da verificare</span>' +
            '</td>' +
            '<td class="file-modal-table__cell file-modal-table__cell--actions">' +
                '<button class="file-modal-delete-btn" type="button" data-file-upload-box-role="remove" title="Cancella file">' +
                    '<span class="file-modal-delete-btn__icon" aria-hidden="true"></span>' +
                '</button>' +
            '</td>' +
        '</tr>';
    }

    function handleFile(root, file) {
        if (!file) return;
        root.__fileUploadBoxPendingFile = file;
        var error = getRole(root, 'upload-error');
        if (error) error.hidden = true;
        renderFile(root, file);
        syncSubmit(root);
    }

    function open(root, triggerEl) {
        if (!root) return;
        // F015: salva il trigger pre-open per restore focus post-close.
        if (triggerEl && typeof triggerEl.focus === 'function') {
            root.__lastTrigger = triggerEl;
        } else {
            var active = document.activeElement;
            if (active && active !== document.body && active !== document.documentElement) {
                root.__lastTrigger = active;
            }
        }
        root.hidden = false;
        root.setAttribute('aria-hidden', 'false');
        var dialog = root.querySelector('.file-modal__content');
        if (dialog) dialog.focus();
        syncSubmit(root);
        dispatch(root, 'sp:file-upload-box:open');
    }

    function close(root) {
        if (!root) return;
        var wasOpen = !root.hidden;
        root.hidden = true;
        root.setAttribute('aria-hidden', 'true');
        // F015: restore focus al trigger originale post-close.
        if (wasOpen && root.__lastTrigger && typeof root.__lastTrigger.focus === 'function') {
            try { root.__lastTrigger.focus(); } catch (e) { /* noop */ }
        }
        root.__lastTrigger = null;
        dispatch(root, 'sp:file-upload-box:close');
    }

    function removeFile(root) {
        root.__fileUploadBoxPendingFile = null;
        var input = getRole(root, 'input');
        if (input) input.value = '';
        renderEmpty(root);
        syncSubmit(root);
    }

    function submit(root) {
        if (!root.__fileUploadBoxPendingFile) return;
        var detail = {
            file: root.__fileUploadBoxPendingFile,
            fileName: root.__fileUploadBoxPendingFile.name
        };
        dispatch(root, 'sp:file-upload-box:submit', detail);
        close(root);
    }

    function initRoot(root) {
        if (!root || root.__skillpressFileUploadBoxInitialized) return;
        root.__skillpressFileUploadBoxInitialized = true;

        var dropzone = getRole(root, 'dropzone');
        var input = getRole(root, 'input');
        var closeButton = getRole(root, 'close');
        var submitButton = getRole(root, 'submit');

        if (root.hidden) root.setAttribute('aria-hidden', 'true');

        root.addEventListener('click', function (event) {
            if (event.target === root) close(root);
        });

        // F015: Escape chiude il dialog quando aperto.
        root.addEventListener('keydown', function (event) {
            if ((event.key === 'Escape' || event.key === 'Esc') && !root.hidden) {
                event.stopPropagation();
                close(root);
            }
        });

        if (closeButton) {
            closeButton.addEventListener('click', function () {
                close(root);
            });
        }

        if (dropzone) {
            dropzone.addEventListener('click', function () {
                if (input) input.click();
            });
            dropzone.addEventListener('dragover', function (event) {
                event.preventDefault();
                dropzone.classList.add('file-modal-dropzone--dragover');
            });
            dropzone.addEventListener('dragleave', function () {
                dropzone.classList.remove('file-modal-dropzone--dragover');
            });
            dropzone.addEventListener('drop', function (event) {
                event.preventDefault();
                dropzone.classList.remove('file-modal-dropzone--dragover');
                handleFile(root, event.dataTransfer.files && event.dataTransfer.files[0]);
            });
        }

        if (input) {
            input.addEventListener('change', function (event) {
                handleFile(root, event.target.files && event.target.files[0]);
                event.target.value = '';
            });
        }

        if (submitButton) {
            submitButton.addEventListener('click', function () {
                submit(root);
            });
        }

        root.addEventListener('click', function (event) {
            var remove = event.target.closest('[data-file-upload-box-role="remove"]');
            if (!remove || !root.contains(remove)) return;
            removeFile(root);
        });

        syncSubmit(root);
    }

    /** @public */
    function init(scope) {
        var context = scope || document;
        var roots = [];
        if (context.matches && context.matches('[data-file-upload-box]')) roots.push(context);
        roots = roots.concat(Array.prototype.slice.call(context.querySelectorAll('[data-file-upload-box]')));
        roots.forEach(initRoot);

        if (!initializedOpeners) {
            initializedOpeners = true;
            document.addEventListener('click', function (event) {
                var opener = event.target.closest('[data-file-upload-box-open]');
                if (!opener) return;
                var selector = opener.getAttribute('data-file-upload-box-open');
                var target = selector ? document.querySelector(selector) : document.querySelector('[data-file-upload-box]');
                if (!target) return;
                event.preventDefault();
                initRoot(target);
                // F015: passa il trigger per consentire focus restore al close.
                open(target, opener);
            });
        }
    }

    namespace.FileUploadBox = {
        init: init,
        open: open,
        close: close,
        removeFile: removeFile
    };

    if (typeof helpers.autoInit === 'function') {
        helpers.autoInit(init);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { init(document); });
    } else {
        init(document);
    }
})();
