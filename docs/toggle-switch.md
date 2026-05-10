---
title: ToggleSwitch
description: Switch binario on/off con track 44x24 e thumb animato, accessibile via role="switch".
layer: primitives
strategy: css+js
sources:
  catalog_css: elements-ui/css/components/_form-inputs.css
  catalog_js: elements-ui/js/buttons/toggle-switch.js
  demo: product-page-integration/index.html
status: post-bem-2026-04-29
package_path: primitives/toggle-switch.css
js_path: js/toggle-switch.js
---

# ToggleSwitch

Primitiva form per switch binario on/off. Track + thumb CSS-only, behavior JS minimo che flippa la classe `toggle-switch--checked` e l'attributo `aria-checked` ed emette `toggle-switch:change`. Lo stato iniziale (on/off, disabled) e' impostato dal CMS nel markup; la libreria non gestisce persistenza ne' logica di business.

> Aggiornato 2026-04-29 post BEM standardization (prompt 19 Phase B). Modifier `is-checked`/`active` standalone -> `toggle-switch--checked` (BEM strict). Hook entry semplificato: `[data-skillpress-toggle-switch]` -> `[data-toggle-switch]`.

## Anatomy

```text
ToggleSwitch
├── toggle-switch-field            (wrapper opzionale label + switch, inline-flex)
│   ├── toggle-switch              (button[role=switch], track 44x24)   [--checked]
│   │   └── toggle-switch__thumb   (knob 20x20, translateX(20px) quando checked)
│   └── toggle-switch__label       (label esterna, slot consumer)
```

Lo switch standalone (senza wrapper field) e' valido: `.sp-toggle-switch-field` e' opt-in solo quando serve la label inline.

## Markup contract

Markup verbatim dalla pagina demo `product-page-integration` (sidebar configuratore, toggle multicopertina). Il consumer monta `aria-checked` iniziale; `init()` sincronizza la classe `.sp-toggle-switch--checked` di conseguenza.

```html
<button
    type="button"
    class="sp-toggle-switch"
    role="switch"
    aria-checked="false"
    data-toggle-switch>
    <span class="sp-toggle-switch__thumb"></span>
</button>
```

Variante con label inline:

```html
<span class="sp-toggle-switch-field">
    <button
        type="button"
        id="multicop-switch"
        class="sp-toggle-switch"
        role="switch"
        aria-checked="false"
        aria-labelledby="multicop-label"
        data-toggle-switch>
        <span class="sp-toggle-switch__thumb"></span>
    </button>
    <label id="multicop-label" for="multicop-switch" class="sp-toggle-switch__label">Multicopertina</label>
</span>
```

Variante stato iniziale ON:

```html
<button
    type="button"
    class="sp-toggle-switch sp-toggle-switch--checked"
    role="switch"
    aria-checked="true"
    data-toggle-switch>
    <span class="sp-toggle-switch__thumb"></span>
</button>
```

Variante disabled:

```html
<button
    type="button"
    class="sp-toggle-switch"
    role="switch"
    aria-checked="false"
    aria-disabled="true"
    disabled
    data-toggle-switch>
    <span class="sp-toggle-switch__thumb"></span>
</button>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.sp-toggle-switch-field` | wrapper opzionale label + switch (inline-flex) | no | — |
| `.sp-toggle-switch` | track, e' il `<button>` stesso (44x24) | yes | `--checked` |
| `.sp-toggle-switch__thumb` | knob 20x20, animato via `translateX` quando checked | yes | — |
| `.sp-toggle-switch__label` | label esterna, tipografia base | no | — |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `role="switch"` | `.sp-toggle-switch` | yes | Auto-applicato da `init()` se mancante. |
| `aria-checked` | `.sp-toggle-switch` | yes | `"true"` / `"false"`. Sincronizzato da `init()` con la classe `.sp-toggle-switch--checked`. |
| `aria-disabled` | `.sp-toggle-switch` | no | Alternativa a `disabled`; entrambi disabilitano il behavior. |
| `disabled` | `.sp-toggle-switch` | no | Disabilita il bottone nativo. |
| `aria-labelledby` / `aria-label` | `.sp-toggle-switch` | no | Consigliato quando il label non e' associato via `for`. |
| `data-toggle-switch` | `.sp-toggle-switch` | yes | Selettore di default di `init()`. |

## Hook `data-*`

La libreria seleziona via `[data-*]`, mai via classi CSS:

| Attributo | Ruolo | Note |
|-----------|-------|------|
| `data-toggle-switch` | Entry point sul `<button>` switch | Obbligatorio per auto-discovery di `init()`. Sostituisce il vecchio `data-skillpress-toggle-switch`. |

La classe `.sp-toggle-switch--checked` e' pure-style: viene gestita dal JS (toggle automatico sincronizzato con `aria-checked`). Il backend la imposta solo per dichiarare lo stato iniziale insieme a `aria-checked="true"`. Le classi `.sp-toggle-switch`, `.sp-toggle-switch__thumb`, `.sp-toggle-switch__label` sono il contratto markup (relazione DOM via classe BEM stabile), non hook entry.

## Behavior JS

```text
Init: window.SkillpressUI.ToggleSwitch.init() — opt-in, idempotente
Event: toggle-switch:change con detail.checked
Cosa NON fa: persistenza stato, sync con form, animazione custom oltre transition
```

`init()` accetta:
- nessun argomento: seleziona tutti gli `[data-toggle-switch]` del documento.
- una stringa CSS selector.
- un singolo elemento o un container che contiene switch.

Bind: click, Space ed Enter flippano lo stato. Ogni nodo viene legato una volta sola (flag `__skillpressToggleSwitchInit`). Stato disabled (`disabled` o `aria-disabled="true"`) blocca il toggle. Namespace globale `window.SkillpressUI.ToggleSwitch`.

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/toggle-switch.css" />
<script src="../node_modules/@ebattt/skillpress-ui/js/toggle-switch.js"></script>
<script>
    window.SkillpressUI.ToggleSwitch.init();
</script>
```

Oppure via bundle (gia' include `toggle-switch.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

## Examples

- `Default` → `primitives-toggleswitch--default`
- `Checked` → `primitives-toggleswitch--checked`
- `Disabled` → `primitives-toggleswitch--disabled`
- `WithLabel` → `primitives-toggleswitch--with-label`
- `ReferenceFromElementsUI` → `primitives-toggleswitch--reference-from-elements-ui`

## Token usati

`--color-bg-gray-200`, `--color-bg-white`, `--color-border`, `--color-border-focus`, `--color-primary`, `--color-primary-dark`, `--color-text`, `--radius-full`, `--shadow-sm`, `--spacing-sm`, `--font-size-sm`, `--line-height-normal`, `--transition-normal`.

## Note CMS

- stato iniziale: settare `aria-checked="true"` (e/o classe `.sp-toggle-switch--checked`) nel markup. `init()` sincronizza la classe con l'attributo.
- stato disabled: `disabled` o `aria-disabled="true"`. Entrambi bloccano il toggle e applicano lo stile `opacity: 0.5`.
- testo della label: contenuto di `.sp-toggle-switch__label`, libero (la libreria controlla solo tipografia base).
- logica di business: ascoltare `toggle-switch:change` sul nodo `.sp-toggle-switch` e leggere `event.detail.checked`.

## Out of scope

- variante "segmented two-label" (es. `Lordo / Netto` di `.iva-toggle` + `.iva-btn`): pattern distinto, non coperto.
- variante dimensionale (small/large): la fonte ha un'unica taglia.
- variante colore: on sempre `--color-primary`, off sempre `--color-bg-gray-200`.
- icona dentro il thumb (track + thumb sono CSS puro, niente Material Symbols).
- persistenza dello stato tra refresh: il consumer e' responsabile dell'idratazione iniziale.
- gestione di gruppi (radio-like): per scelte mutuamente esclusive usare un altro pattern.
- ricalcolo prezzi / abilitazione altri campi: sono logica consumer, non libreria.

## Mappatura nomi (demo product-page -> libreria)

La demo originale usava modifier `is-checked` (alias `active`) come classe standalone e attributo entry `data-skillpress-toggle-switch`. La libreria post-prompt-19 usa BEM strict + hook semplificato.

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.sp-toggle-switch.is-checked` (compound) | `.sp-toggle-switch.sp-toggle-switch--checked` |
| `.is-checked` / `.active` (standalone) | `.sp-toggle-switch--checked` |
| `[data-skillpress-toggle-switch]` | `[data-toggle-switch]` |

`.sp-toggle-switch` (block), `.sp-toggle-switch__thumb`, `.sp-toggle-switch__label`, `.sp-toggle-switch-field` (wrapper opzionale) sono invariati. Attributi ARIA nativi (`aria-checked`, `aria-disabled`, `role="switch"`, `disabled`) restano invariati.

## Classi pubbliche

`.sp-toggle-switch-field`, `.sp-toggle-switch`, `.sp-toggle-switch__thumb`, `.sp-toggle-switch__label`, `.sp-toggle-switch--checked`.

## Data hooks

`data-toggle-switch` e' l'hook pubblico di inizializzazione. La libreria non usa classi CSS come selector entry.

## Modifier / stati

Checked tramite `.sp-toggle-switch--checked` + `aria-checked="true"`; disabled tramite `disabled` o `aria-disabled="true"`.

## Backend owns

Stato iniziale, label accessibile, persistenza, sincronizzazione con form e reazioni applicative all'evento `toggle-switch:change`.

## Library owns

Track/thumb, animazione visuale, sincronizzazione classe/ARIA in `init()`, blocco dello stato disabled ed evento UI.

## Demo-only

Toggle multicopertina e handler dimostrativi che mostrano come ascoltare il cambio stato.
