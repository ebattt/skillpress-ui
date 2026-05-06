---
title: FileUploadBox
description: Dashboard upload modal shell con dropzone, tabella file, stati e behavior UI standalone.
layer: components
strategy: css-js
sources:
  demo_html: dashboard/index.html#file-upload-modal
  demo_css: dashboard/css/components/_modals.css
  demo_js: dashboard/js/file-upload.js
status: local-link-dev-dashboard-2026-05-05
package_path: components/file-upload-box.css
js_path: js/file-upload-box.js
---

# FileUploadBox

`FileUploadBox` copre la shell upload file della dashboard: overlay modal,
header, warning/error banner, dropzone, input file nascosto, tabella file,
status badge, delete preview e CTA submit.

Strategia C: la libreria gestisce solo behavior UI riusabile. Upload reale,
validazione server, regole formato/peso, stato ordine/prodotto e persistenza
restano applicazione/backend.

## Anatomy

```text
FileUploadBox
└── .file-modal__overlay[data-file-upload-box] [hidden]
    └── .file-modal__content
        ├── .file-modal__header
        │   ├── .file-modal__title
        │   └── .file-modal__close
        ├── .file-modal__body
        │   ├── .file-modal__warning
        │   ├── .file-modal__error
        │   ├── .file-modal__dropzone
        │   └── .file-modal__table
        └── .file-modal__footer
            └── .file-modal__submit
```

## Markup contract

```html
<button type="button" data-file-upload-box-open="#file-upload-modal">
    Apri upload
</button>

<div id="file-upload-modal"
     class="file-modal__overlay"
     data-file-upload-box
     hidden
     aria-hidden="true">
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
            <div class="file-modal__warning">
                <p><strong>Attenzione:</strong> il file caricato e' definitivo.</p>
            </div>
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
                <thead>
                    <tr>
                        <th>#</th>
                        <th>File</th>
                        <th>Data</th>
                        <th>Dimensione</th>
                        <th>Stato</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody data-file-upload-box-role="table-body">
                    <tr>
                        <td colspan="6" class="file-modal__table-empty">Non sono presenti file</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="file-modal__footer">
            <button class="file-modal__submit" type="button" data-file-upload-box-role="submit">
                <span class="file-modal__icon file-modal__icon--send" aria-hidden="true"></span>
                Invia file
            </button>
        </div>
    </div>
</div>
```

## API Reference

| Class | Role |
|---|---|
| `.file-modal__overlay` | overlay fixed modal |
| `.file-modal__content` | contenitore dialog |
| `.file-modal__header` | header con titolo e close |
| `.file-modal__title` | titolo + icona |
| `.file-modal__icon` | icona chrome CSS |
| `.file-modal__close` | close button |
| `.file-modal__body` | contenuto modal |
| `.file-modal__warning` | avviso upload definitivo |
| `.file-modal__warning--replace` | variante sostituzione file |
| `.file-modal__error` | banner errore |
| `.file-modal__download` | link report |
| `.file-modal__dropzone` | area click/drag |
| `.file-modal-dropzone--dragover` | stato dragover |
| `.file-modal__table` | tabella file |
| `.file-modal-table__cell` | cella body generata o renderizzata |
| `.file-modal-status` | badge stato file |
| `.file-modal-status--warning|--error|--success` | varianti stato |
| `.file-modal__submit` | CTA submit |
| `.file-modal-delete-btn` | remove preview button |

Hook:

| Attribute | Element | Note |
|---|---|---|
| `data-file-upload-box` | root `.file-modal__overlay` | init componente |
| `data-file-upload-box-open="#id"` | opener esterno | apre il modal target |
| `data-file-upload-box-role="close"` | close button | chiude modal |
| `data-file-upload-box-role="dropzone"` | dropzone | click/drag/drop |
| `data-file-upload-box-role="input"` | input file | sorgente file |
| `data-file-upload-box-role="table-body"` | tbody | preview righe |
| `data-file-upload-box-role="upload-error"` | error banner | il consumer puo' mostrare errori |
| `data-file-upload-box-role="submit"` | submit button | dispatch evento |

JS:

```js
window.SkillpressUI.FileUploadBox.init();
window.SkillpressUI.FileUploadBox.open(document.querySelector('#file-upload-modal'));
window.SkillpressUI.FileUploadBox.close(document.querySelector('#file-upload-modal'));
```

Eventi:

| Evento | Detail | Note |
|---|---|---|
| `sp:file-upload-box-open` | none | emesso su root |
| `sp:file-upload-box-close` | none | emesso su root |
| `sp:file-upload-box-submit` | `{ file, fileName }` | emesso su root; nessun upload reale |

## Cosa decide il CMS/backend

- testi, titolo, warning, errori e report link;
- `accept` dell'input file;
- righe file iniziali e stati;
- opener contestuali da ordini/prodotti;
- validazione, upload, salvataggio, permessi e mapping stato ordine.

## Cosa decide la libreria

- overlay, layout modal, spacing, colori, table, responsive;
- icone chrome CSS;
- focus/hover/disabled;
- apertura/chiusura, dragover, selezione file, preview locale, remove e evento submit.

## Installation

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/file-upload-box.css" />
<script defer src="../node_modules/@ebattt/skillpress-ui/js/file-upload-box.js"></script>
```

## Out of scope

- upload reale e API;
- validazione business formato/peso;
- gestione stato ordine/prodotto;
- progress bar reale;
- Material Symbols o font icone esterni.
