---
title: FileUploadBox
description: Shell modal upload file della dashboard con dropzone, tabella file, stati e behavior UI standalone.
layer: components
strategy: css-js
package_path: components/file-modal.css
js_path: js/file-upload-box.js
---

# FileUploadBox

Shell upload file della dashboard: overlay modal, header, warning/error banner,
dropzone, input file nascosto, tabella file, status badge, delete preview e CTA
submit. La libreria gestisce solo behavior UI riusabile; upload reale,
validazione server, regole formato/peso, stato ordine/prodotto e persistenza
restano applicazione/backend.

## Markup contract

```html
<button type="button" data-file-upload-box-open="#file-upload-modal">Apri upload</button>

<div id="file-upload-modal" class="file-modal__overlay" data-file-upload-box hidden aria-hidden="true">
    <div class="file-modal__content" role="dialog" aria-modal="true" aria-labelledby="file-modal-title" tabindex="-1">
        <div class="file-modal__header">
            <div class="file-modal__title">
                <span class="file-modal__icon file-modal__icon--upload-file" aria-hidden="true"></span>
                <h3 id="file-modal-title">File interno</h3>
            </div>
            <button class="file-modal__close" type="button" data-file-upload-box-role="close" title="Chiudi">
                <span class="file-modal__icon file-modal__icon--close" aria-hidden="true"></span>
            </button>
        </div>
        <div class="file-modal__body">
            <div class="file-modal__warning"><p><strong>Attenzione:</strong> il file caricato e' definitivo.</p></div>
            <div class="file-modal__error" data-file-upload-box-role="upload-error" hidden>
                <span class="file-modal__icon file-modal__icon--error" aria-hidden="true"></span>
                <span>File non conforme</span>
            </div>
            <div class="file-modal__dropzone" data-file-upload-box-role="dropzone">
                <div class="file-modal__dropzone-icon">
                    <span class="file-modal__icon file-modal__icon--cloud-upload" aria-hidden="true"></span>
                </div>
                <p class="file-modal__dropzone-text">Trascina qui il file o clicca per selezionare</p>
                <p class="file-modal__dropzone-hint">Formati accettati: PDF, JPG, PNG</p>
                <input class="file-modal__input" type="file" accept=".pdf,.jpg,.jpeg,.png" data-file-upload-box-role="input">
            </div>
            <table class="file-modal__table">
                <thead><tr><th>#</th><th>File</th><th>Data</th><th>Dimensione</th><th>Stato</th><th></th></tr></thead>
                <tbody data-file-upload-box-role="table-body">
                    <tr><td colspan="6" class="file-modal__table-empty">Non sono presenti file</td></tr>
                </tbody>
            </table>
        </div>
        <div class="file-modal__footer">
            <button class="file-modal__submit" type="button" data-file-upload-box-role="submit">Invia file</button>
        </div>
    </div>
</div>
```

## Classi pubbliche

| Classe | Ruolo |
|---|---|
| `.file-modal__overlay` | overlay fixed modal |
| `.file-modal__content` | contenitore dialog |
| `.file-modal__header` / `__title` / `__icon` / `__close` | header |
| `.file-modal__body` | contenuto modal |
| `.file-modal__warning` / `__warning--replace` | avviso (variante sostituzione) |
| `.file-modal__error` | banner errore |
| `.file-modal__download` | link report |
| `.file-modal__dropzone` / `.file-modal-dropzone--dragover` | dropzone (+ dragover) |
| `.file-modal__table` / `.file-modal-table__cell` | tabella file |
| `.file-modal-status` (+`--warning|--error|--success`) | badge stato file |
| `.file-modal__submit` | CTA submit |
| `.file-modal-delete-btn` | remove preview button |

## Data hooks

| Attributo | Elemento | Note |
|---|---|---|
| `data-file-upload-box` | root `.file-modal__overlay` | init componente |
| `data-file-upload-box-open="#id"` | opener esterno | apre il modal target |
| `data-file-upload-box-role="close"` | close button | chiude modal |
| `data-file-upload-box-role="dropzone"` | dropzone | click/drag/drop |
| `data-file-upload-box-role="input"` | input file | sorgente file |
| `data-file-upload-box-role="table-body"` | tbody | preview righe |
| `data-file-upload-box-role="upload-error"` | error banner | mostrare errori |
| `data-file-upload-box-role="submit"` | submit button | dispatch evento |

## API JS / Eventi

```js
window.SkillpressUI.FileUploadBox.init();
window.SkillpressUI.FileUploadBox.open(document.querySelector('#file-upload-modal'));
window.SkillpressUI.FileUploadBox.close(document.querySelector('#file-upload-modal'));
```

| Evento | Detail |
|---|---|
| `sp:file-upload-box:open` | none |
| `sp:file-upload-box:close` | none |
| `sp:file-upload-box:submit` | `{ file, fileName }` (nessun upload reale) |

## Installation

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/file-modal.css" />
<script defer src="../node_modules/@ebattt/skillpress-ui/js/file-upload-box.js"></script>
```

## Fuori scope

Upload reale e API, validazione business formato/peso, gestione stato
ordine/prodotto, progress bar reale, Material Symbols o font icone esterni.
