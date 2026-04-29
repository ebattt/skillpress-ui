---
title: InfoDropdown
description: Pannello collapsible inline per aiuto contestuale accanto a una label, con titolo auto-derivato e behavior toggle standard.
layer: primitives
strategy: css+js
sources:
  catalog_css_btn: elements-ui/css/components/_form-inputs.css
  catalog_css_dropdown: elements-ui/css/components/_layout-patterns.css
  catalog_js: elements-ui/js/buttons/button-info.js
  demo: product-page-integration/js/sections/section-1.js
status: implemented-local
package_path: primitives/info-dropdown.css
js_path: js/info-dropdown.js
---

# InfoDropdown

Disclosure inline per pannelli di aiuto contestuale: un bottone con icona `info` (`.info-btn`) accanto a una label apre un pannello collapsible (`.info-dropdown`) con titolo, body HTML libero e bottone close.

Contratto **semplificato**: il CMS scrive **solo il body**. La libreria auto-deriva il titolo dalla `.label-text` adiacente e auto-inietta header (titolo + close) e wrapper body al primo init.

## Anatomy

```text
label-row
├── label-text                          (testo della label, fonte del titolo)
└── info-btn[data-info-trigger][aria-controls=ID]   (trigger, icona info SVG)

info-dropdown#ID  [data-info-dropdown] [info-dropdown--hidden]   (pannello collapsible inline)
├── info-dropdown__header               (auto-iniettato dal JS)
│   ├── info-dropdown__title            (auto-popolato da label-text)
│   └── info-dropdown__close            (auto-creato con SVG X inline)
└── info-dropdown__body                 (auto-wrappato attorno al contenuto CMS)
    ├── <p>...</p>                      (CMS-injected)
    ├── <ul>...</ul>                    (CMS-injected)
    └── info-note                       (callout giallo opzionale)
        ├── info-note__title
        └── <p>...</p>
```

## Markup contract

Solo body, niente header da scrivere. Il consumer fornisce:

```html
<div class="form-field">
    <div class="label-row">
        <label class="label-text">Formato (mm)</label>
        <button type="button"
                class="info-btn"
                data-info-trigger
                aria-controls="info-formato"
                aria-expanded="false"
                aria-label="Mostra informazioni">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
        </button>
    </div>
    <div id="info-formato" class="info-dropdown info-dropdown--hidden"
         data-info-dropdown
         role="region" aria-hidden="true">
        <p>Il <strong>formato</strong> indica le dimensioni del prodotto finito.</p>
        <div class="info-note">
            <p class="info-note__title">Nota tolleranze</p>
            <p>Riduzione fino al 99% possibile per stampa.</p>
        </div>
    </div>
</div>
```

Attributi richiesti:
- `data-info-trigger` su `.info-btn` (entry point hook libreria).
- `data-info-dropdown` su `.info-dropdown` (entry point hook libreria).
- `aria-controls` su `.info-btn` deve corrispondere all'`id` di `.info-dropdown`.
- `.info-dropdown--hidden` (modifier BEM) per stato chiuso iniziale.

## Hook data-*

Entry point dichiarativi (la libreria scopre i nodi via questi attributi, non via classi):

| Hook | Ruolo | Note |
|------|-------|------|
| `[data-info-trigger]` | trigger | Combinato con `[aria-controls]` per agganciare il dropdown. La classe `.info-btn` resta come stile visivo (block esterno). |
| `[data-info-dropdown]` | pannello collapsible | Coppia con `[data-info-trigger][aria-controls=ID]` (id del dropdown). |

Le classi `.info-dropdown__header / __title / __close / __body` sono usate dalla libreria solo come *relazione DOM* via classe BEM stabile (auto-injection chrome + delegated close click), non come hook entry. Stessa eccezione per `.label-row` e `.label-text` (relazione FormPrimitives).

## API

```js
window.SkillpressUI.InfoDropdown.init(rootOrSelector?)
```

- Auto-eseguito su `DOMContentLoaded` con scope `document`.
- Idempotente: piu' chiamate non duplicano header/body wrapper.
- Per markup montato dinamicamente (es. consumer `consumer:sections:loaded`), richiamare `init(root)` con il container appena montato.

Eventi emessi (bubbling, sul `.info-dropdown`):
- `sp:info-dropdown:open`
- `sp:info-dropdown:close`

## Behavior

- Click `[data-info-trigger]` -> toggle `.info-dropdown--hidden` sul dropdown associato + sync `aria-expanded` (trigger) + `aria-hidden` (dropdown).
- Click `.info-dropdown__close` -> chiudi.
- ESC -> chiudi tutti i dropdown aperti.
- Click outside (`[data-info-dropdown]` e `[data-info-trigger]`) -> chiudi tutti.
- Apertura singola: aprire un dropdown chiude gli altri.

## Override esplicito

Se il consumer scrive gia' un `.info-dropdown__header` come primo figlio del dropdown, l'auto-injection viene saltata: il consumer mantiene il controllo completo del titolo e della struttura. Stesso per `.info-dropdown__body` esplicito.

Esempio (no auto-derive):

```html
<div id="info-custom" class="info-dropdown info-dropdown--hidden"
     data-info-dropdown role="region">
    <div class="info-dropdown__header">
        <h4 class="info-dropdown__title">Titolo personalizzato</h4>
        <button type="button" class="info-dropdown__close" aria-label="Chiudi">
            <!-- SVG X -->
        </button>
    </div>
    <div class="info-dropdown__body">
        <p>Body content...</p>
    </div>
</div>
```

## Cosa decide il CMS / backend

- Testo della `.label-text` (titolo si auto-deriva da qui).
- Contenuto HTML del corpo (paragrafi, liste, `info-note` opzionale).
- ID univoco del dropdown.
- Quanti dropdown istanziare per pagina.

## Cosa decide la libreria

- Layout `.label-row` (inline-flex con gap).
- Stile `.info-btn` (icona teal, hover, focus-visible).
- Geometria `.info-dropdown` (max-height transition, border, radius, padding).
- Header auto-injection (titolo + close button + ARIA).
- Body auto-wrapping.
- Behavior toggle (click trigger + click close + ESC + click outside + apertura singola).
- Sync `aria-expanded` ↔ `aria-hidden` ↔ `.info-dropdown--hidden`.

## Fuori scope

- Modal overlay (`.modal-overlay` del catalogo, sezione separata).
- Focus trap / focus restore (over-engineering per disclosure inline; ESC + click outside bastano).
