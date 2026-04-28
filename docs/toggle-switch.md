---
title: ToggleSwitch
description: Switch binario on/off con track 44x24 e thumb animato, accessibile via role="switch".
layer: primitives
strategy: css+js
sources:
  catalog_css: elements-ui/css/components/_form-inputs.css
  catalog_js: elements-ui/js/buttons/toggle-switch.js
  demo: product-page-integration/index.html
status: implemented-local
package_path: primitives/toggle-switch.css
js_path: js/toggle-switch.js
---

# ToggleSwitch

Primitiva form per switch binario on/off. Track + thumb CSS-only, behavior JS minimo che flippa la classe `is-checked` e l'attributo `aria-checked` ed emette `toggle-switch:change`. Lo stato iniziale (on/off, disabled) e' impostato dal CMS nel markup; la libreria non gestisce persistenza ne' logica di business.

## Anatomy

```text
ToggleSwitch
├── toggle-switch-field            (wrapper opzionale label + switch, inline-flex)
│   ├── toggle-switch              (button[role=switch], track 44x24)   [is-checked]
│   │   └── toggle-switch__thumb   (knob 20x20, translateX(20px) quando checked)
│   └── toggle-switch__label       (label esterna, slot consumer)
```

Lo switch standalone (senza wrapper field) e' valido: `.toggle-switch-field` e' opt-in solo quando serve la label inline.

## Markup contract

Markup verbatim dalla pagina demo `product-page-integration` (sidebar configuratore, toggle multicopertina). Il consumer monta `aria-checked` iniziale; `init()` sincronizza la classe `.is-checked` di conseguenza.

```html
<button
    type="button"
    class="toggle-switch"
    role="switch"
    aria-checked="false"
    data-skillpress-toggle-switch>
    <span class="toggle-switch__thumb"></span>
</button>
```

Variante con label inline:

```html
<span class="toggle-switch-field">
    <button
        type="button"
        id="multicop-switch"
        class="toggle-switch"
        role="switch"
        aria-checked="false"
        aria-labelledby="multicop-label"
        data-skillpress-toggle-switch>
        <span class="toggle-switch__thumb"></span>
    </button>
    <label id="multicop-label" for="multicop-switch" class="toggle-switch__label">Multicopertina</label>
</span>
```

Variante stato iniziale ON:

```html
<button
    type="button"
    class="toggle-switch is-checked"
    role="switch"
    aria-checked="true"
    data-skillpress-toggle-switch>
    <span class="toggle-switch__thumb"></span>
</button>
```

Variante disabled:

```html
<button
    type="button"
    class="toggle-switch"
    role="switch"
    aria-checked="false"
    aria-disabled="true"
    disabled
    data-skillpress-toggle-switch>
    <span class="toggle-switch__thumb"></span>
</button>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.toggle-switch-field` | wrapper opzionale label + switch (inline-flex) | no | — |
| `.toggle-switch` | track, e' il `<button>` stesso (44x24) | yes | `is-checked` |
| `.toggle-switch__thumb` | knob 20x20, animato via `translateX` quando checked | yes | — |
| `.toggle-switch__label` | label esterna, tipografia base | no | — |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `role="switch"` | `.toggle-switch` | yes | Auto-applicato da `init()` se mancante. |
| `aria-checked` | `.toggle-switch` | yes | `"true"` / `"false"`. Sincronizzato da `init()` con la classe `.is-checked`. |
| `aria-disabled` | `.toggle-switch` | no | Alternativa a `disabled`; entrambi disabilitano il behavior. |
| `disabled` | `.toggle-switch` | no | Disabilita il bottone nativo. |
| `aria-labelledby` / `aria-label` | `.toggle-switch` | no | Consigliato quando il label non e' associato via `for`. |
| `data-skillpress-toggle-switch` | `.toggle-switch` | yes | Selettore di default di `init()`. |

## Behavior JS

```text
Init: window.SkillpressUI.ToggleSwitch.init() — opt-in, idempotente
Event: toggle-switch:change con detail.checked
Cosa NON fa: persistenza stato, sync con form, animazione custom oltre transition
```

`init()` accetta:
- nessun argomento: seleziona tutti gli `[data-skillpress-toggle-switch]` del documento.
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

- stato iniziale: settare `aria-checked="true"` (e/o classe `.is-checked`) nel markup. `init()` sincronizza la classe con l'attributo.
- stato disabled: `disabled` o `aria-disabled="true"`. Entrambi bloccano il toggle e applicano lo stile `opacity: 0.5`.
- testo della label: contenuto di `.toggle-switch__label`, libero (la libreria controlla solo tipografia base).
- logica di business: ascoltare `toggle-switch:change` sul nodo `.toggle-switch` e leggere `event.detail.checked`.

## Out of scope

- variante "segmented two-label" (es. `Lordo / Netto` di `.iva-toggle` + `.iva-btn`): pattern distinto, non coperto.
- variante dimensionale (small/large): la fonte ha un'unica taglia.
- variante colore: on sempre `--color-primary`, off sempre `--color-bg-gray-200`.
- icona dentro il thumb (track + thumb sono CSS puro, niente Material Symbols).
- persistenza dello stato tra refresh: il consumer e' responsabile dell'idratazione iniziale.
- gestione di gruppi (radio-like): per scelte mutuamente esclusive usare un altro pattern.
- ricalcolo prezzi / abilitazione altri campi: sono logica consumer, non libreria.
