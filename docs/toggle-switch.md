---
title: ToggleSwitch
description: Switch binario on/off con track 44x24 e thumb animato, accessibile via role="switch".
layer: primitives
strategy: css+js
package_path: primitives/toggle-switch.css
js_path: js/toggle-switch.js
---

# ToggleSwitch

Primitiva form per switch binario on/off. Track + thumb CSS-only; behavior JS
minimo che flippa la classe `.sp-toggle-switch--checked` e l'attributo
`aria-checked` ed emette `sp:toggle-switch:change`. Lo stato iniziale (on/off,
disabled) e' impostato dal CMS nel markup; la libreria non gestisce persistenza
ne' logica di business.

## Anatomy

```text
sp-toggle-switch-field            (wrapper opzionale label + switch, inline-flex)
├── sp-toggle-switch              (button[role=switch], track 44x24)   [--checked]
│   └── sp-toggle-switch__thumb   (knob 20x20, translateX quando checked)
└── sp-toggle-switch__label       (label esterna, slot consumer)
```

Lo switch standalone (senza wrapper) e' valido; `.sp-toggle-switch-field` e'
opt-in solo quando serve la label inline.

## Markup contract

```html
<button type="button" class="sp-toggle-switch" role="switch" aria-checked="false" data-toggle-switch>
    <span class="sp-toggle-switch__thumb"></span>
</button>
```

Con label inline:

```html
<span class="sp-toggle-switch-field">
    <button type="button" id="multicop-switch" class="sp-toggle-switch" role="switch"
            aria-checked="false" aria-labelledby="multicop-label" data-toggle-switch>
        <span class="sp-toggle-switch__thumb"></span>
    </button>
    <label id="multicop-label" for="multicop-switch" class="sp-toggle-switch__label">Multicopertina</label>
</span>
```

Stato iniziale ON: aggiungere `sp-toggle-switch--checked` + `aria-checked="true"`.
Disabled: `disabled` e/o `aria-disabled="true"`.

## Classi pubbliche

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.sp-toggle-switch-field` | wrapper opzionale label + switch | no | — |
| `.sp-toggle-switch` | track, e' il `<button>` (44x24) | yes | `--checked` |
| `.sp-toggle-switch__thumb` | knob 20x20, animato via `translateX` | yes | — |
| `.sp-toggle-switch__label` | label esterna | no | — |

Attributi: `role="switch"` (auto-applicato da `init()` se mancante),
`aria-checked` ("true"/"false", sincronizzato con la classe), `aria-disabled` /
`disabled` (entrambi disabilitano il toggle), `aria-labelledby` / `aria-label`.

## Data hooks

| Hook | Elemento | Ruolo |
|---|---|---|
| `data-toggle-switch` | `.sp-toggle-switch` | entry point obbligatorio per `init()` |

La classe `.sp-toggle-switch--checked` e' pure-style (gestita dal JS,
sincronizzata con `aria-checked`); il backend la imposta solo per lo stato
iniziale. Le altre classi sono contratto markup, non hook entry.

## Behavior JS

`window.SkillpressUI.ToggleSwitch.init()` — opt-in, idempotente. Accetta nessun
argomento (tutti gli `[data-toggle-switch]` del documento), una stringa selector,
un elemento o un container. Click, Space ed Enter flippano lo stato. Ogni nodo e'
legato una volta sola (flag `__skillpressToggleSwitchInitialized`); lo stato
disabled blocca il toggle.

Evento: `sp:toggle-switch:change` (bubbling) con `detail.checked`.

## Ownership

- Backend: stato iniziale, label accessibile, persistenza, sync con form,
  reazioni applicative all'evento.
- Libreria: track/thumb, animazione, sincronizzazione classe/ARIA in `init()`,
  blocco dello stato disabled, evento UI.

## Out of scope

- variante segmented two-label, variante dimensionale o colore;
- icona dentro il thumb (niente Material Symbols);
- persistenza dello stato tra refresh;
- gruppi radio-like;
- ricalcolo prezzi / abilitazione altri campi (logica consumer).
