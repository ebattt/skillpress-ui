---
title: InfoDropdown
description: Pannello collapsible inline per aiuto contestuale accanto a una label, con titolo auto-derivato e behavior toggle standard.
layer: primitives
strategy: css+js
package_path: primitives/info-dropdown.css
js_path: js/info-dropdown.js
---

# InfoDropdown

Disclosure inline per pannelli di aiuto contestuale: un bottone con icona `info` (`.sp-info-btn`) accanto a una label apre un pannello collapsible (`.sp-info-dropdown`) con titolo, body HTML libero e bottone close.

Contratto **semplificato**: il CMS scrive **solo il body**. La libreria auto-deriva il titolo dalla `.sp-label-text` adiacente e auto-inietta header (titolo + close) e wrapper body al primo init.

## Anatomy

```text
label-row
├── label-text                          (testo della label, fonte del titolo)
└── info-btn[data-info-dropdown-info-trigger][aria-controls=ID]   (trigger, icona info via CSS)

info-dropdown#ID  [data-info-dropdown] [info-dropdown--hidden]   (pannello collapsible inline)
├── info-dropdown__header               (auto-iniettato dal JS)
│   ├── info-dropdown__title            (auto-popolato da label-text)
│   └── info-dropdown__close            (auto-creato; icona X via CSS)
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
<div class="sp-form-field">
    <div class="sp-label-row">
        <label class="sp-label-text">Formato (mm)</label>
        <button type="button"
                class="sp-info-btn"
                data-info-dropdown-info-trigger
                aria-controls="info-formato"
                aria-expanded="false"
                aria-label="Mostra informazioni"></button>
    </div>
    <div id="info-formato" class="sp-info-dropdown sp-info-dropdown--hidden"
         data-info-dropdown
         role="region" aria-hidden="true">
        <p>Il <strong>formato</strong> indica le dimensioni del prodotto finito.</p>
        <div class="sp-info-note">
            <p class="sp-info-note__title">Nota tolleranze</p>
            <p>Riduzione fino al 99% possibile per stampa.</p>
        </div>
    </div>
</div>
```

Attributi richiesti:
- `data-info-dropdown-info-trigger` su `.sp-info-btn` (entry point hook libreria).
- `data-info-dropdown` su `.sp-info-dropdown` (entry point hook libreria).
- `aria-controls` su `.sp-info-btn` deve corrispondere all'`id` di `.sp-info-dropdown`.
- `.sp-info-dropdown--hidden` (modifier BEM) per stato chiuso iniziale.
- Il consumer non deve inserire SVG, immagini o testo dentro `.sp-info-btn`: l'icona
  info e' generata dalla libreria via CSS.

## Hook data-*

Entry point dichiarativi (la libreria scopre i nodi via questi attributi, non via classi):

| Hook | Ruolo | Note |
|------|-------|------|
| `[data-info-dropdown-info-trigger]` | trigger | Combinato con `[aria-controls]` per agganciare il dropdown. La classe `.sp-info-btn` resta come stile visivo (block esterno). |
| `[data-info-dropdown]` | pannello collapsible | Coppia con `[data-info-dropdown-info-trigger][aria-controls=ID]` (id del dropdown). |

Le classi `.sp-info-dropdown__header / __title / __close / __body` sono usate dalla libreria solo come *relazione DOM* via classe BEM stabile (auto-injection chrome + delegated close click), non come hook entry. Stessa eccezione per `.sp-label-row` e `.sp-label-text` (relazione FormPrimitives).

## API

```js
window.SkillpressUI.InfoDropdown.init(rootOrSelector?)
```

- Auto-eseguito su `DOMContentLoaded` con scope `document`.
- Idempotente: piu' chiamate non duplicano header/body wrapper.
- Per markup montato dinamicamente (es. consumer `consumer:sections:loaded`), richiamare `init(root)` con il container appena montato.

Eventi emessi (bubbling, sul `.sp-info-dropdown`):
- `sp:info-dropdown:open`
- `sp:info-dropdown:close`

## Behavior

- Click `[data-info-dropdown-info-trigger]` -> toggle `.sp-info-dropdown--hidden` sul dropdown associato + sync `aria-expanded` (trigger) + `aria-hidden` (dropdown).
- Click `.sp-info-dropdown__close` -> chiudi.
- ESC -> chiudi tutti i dropdown aperti.
- Click outside (`[data-info-dropdown]` e `[data-info-dropdown-info-trigger]`) -> chiudi tutti.
- Apertura singola: aprire un dropdown chiude gli altri.

## Override esplicito

Se il consumer scrive gia' un `.sp-info-dropdown__header` come primo figlio del dropdown, l'auto-injection viene saltata: il consumer mantiene il controllo completo del titolo e della struttura. Stesso per `.sp-info-dropdown__body` esplicito.

Esempio (no auto-derive):

```html
<div id="info-custom" class="sp-info-dropdown sp-info-dropdown--hidden"
     data-info-dropdown role="region">
    <div class="sp-info-dropdown__header">
        <h4 class="sp-info-dropdown__title">Titolo personalizzato</h4>
        <button type="button" class="sp-info-dropdown__close" aria-label="Chiudi"></button>
    </div>
    <div class="sp-info-dropdown__body">
        <p>Body content...</p>
    </div>
</div>
```

## Cosa decide il CMS / backend

- Testo della `.sp-label-text` (titolo si auto-deriva da qui).
- Contenuto HTML del corpo (paragrafi, liste, `info-note` opzionale).
- ID univoco del dropdown.
- Quanti dropdown istanziare per pagina.

## Cosa decide la libreria

- Layout `.sp-label-row` (inline-flex con gap).
- Stile `.sp-info-btn` (icona info CSS teal, hover, focus-visible).
- Geometria `.sp-info-dropdown` (max-height transition, border, radius, padding).
- Header auto-injection (titolo + close button senza SVG + ARIA).
- Icona `.sp-info-btn` e icona close `.sp-info-dropdown__close` disegnate via CSS dalla libreria.
- Body auto-wrapping.
- Behavior toggle (click trigger + click close + ESC + click outside + apertura singola).
- Sync `aria-expanded` ↔ `aria-hidden` ↔ `.sp-info-dropdown--hidden`.

## Fuori scope

- Modal overlay (`.modal-overlay` del catalogo, sezione separata).
- Focus trap / focus restore (over-engineering per disclosure inline; ESC + click outside bastano).

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.sp-info-dropdown.hidden` (compound) | `.sp-info-dropdown.sp-info-dropdown--hidden` |
| `.hidden` (standalone, su info-dropdown) | `.sp-info-dropdown--hidden` |
| `.info-dropdown-header` | `.sp-info-dropdown__header` |
| `.info-dropdown-body` | `.sp-info-dropdown__body` |
| `.info-dropdown-title` | `.sp-info-dropdown__title` |
| `.info-dropdown-close` | `.sp-info-dropdown__close` |
| `.info-note-title` | `.sp-info-note__title` |
| `.info-note-muted` | `.sp-info-note__muted` |
| `.sp-info-btn[aria-controls]` (selettore JS) | `[data-info-dropdown-info-trigger][aria-controls]` (hook) |
| `.sp-info-dropdown` (selettore JS) | `[data-info-dropdown]` (hook) |

`.sp-info-btn` resta come block esterno (classe pure-style); il discovery JS avviene via `[data-info-dropdown-info-trigger]`. `.sp-info-note` resta come block separato.
