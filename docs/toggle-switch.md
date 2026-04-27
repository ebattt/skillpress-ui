# Toggle Switch

## Tipo
Primitiva (form input atomico)

## Fonte
- `Skillpress-frontend/elements-ui/css/components/_form-inputs.css` (sezione `TOGGLE SWITCH (multicopertina on/off)`).
- `Skillpress-frontend/elements-ui/js/buttons/toggle-switch.js` (variante multicop, `.multicop-switch`).
- `Skillpress-frontend/elements-ui/js/checkout/checkout-toggle-switch.js` (variante checkout, `.toggle-switch` + `role="switch"`).

## Pagine demo target
- `product-page-integration`: toggle multicopertina nella sidebar configuratore.
- `checkout`: toggle multispedizione nella card opzione.

## Convergenza fonti
I due sorgenti hanno geometrie equivalenti (track 44x24, knob 20x20 con `translateX(20px)` quando attivo) ma usano markup diversi (`<div>` vs `<button role="switch">`). La libreria converge sul pattern del checkout (`<button role="switch" aria-checked>`) perche e' piu accessibile e nativamente focusabile, e ne deriva un'unica API BEM.

## Responsabilita
La libreria controlla geometria del track, geometria e posizione del thumb, colori on/off, transizioni, hover, focus-visible, disabled e il behavior JS minimo (toggle + emissione evento).

Il consumer controlla testo della label, stato iniziale (`aria-checked` / classe `is-checked`), e qualsiasi logica di business (es. ricalcolo prezzo, abilitazione altri campi) ascoltando l'evento.

## Cosa controlla il backend
- testo della label
- stato iniziale (on/off)
- stato disabled
- reazione all'evento `toggle-switch:change`

## Cosa non controlla il backend
- dimensioni del track o del thumb
- colori on/off (sono token)
- transizioni
- markup interno dello switch

## Markup minimo (solo switch)
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

## Markup con label
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

## Markup con stato iniziale ON
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

## Markup disabled
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

## Slot e parti modificabili
- slot obbligatori: nessuno (lo switch e' decorativo).
- slot opzionali: `.toggle-switch__label` accanto allo switch, dentro `.toggle-switch-field`.
- parti ripetibili: nessuna.

## Default state
`off` (`aria-checked="false"`, nessuna classe `is-checked`).

## Stati supportati
- default (off)
- checked (on) -- classe `is-checked` e/o `aria-checked="true"`
- disabled -- attributo `disabled` o `aria-disabled="true"`
- focus-visible (gestito da CSS via `outline`)

## Varianti supportate
Nessuna variante visiva o dimensionale. Lo switch ha un'unica geometria (44x24).

## Hook tecnici
- classi:
  - `.toggle-switch` (track, e' il button stesso)
  - `.toggle-switch__thumb`
  - `.toggle-switch__label`
  - `.toggle-switch-field` (wrapper opzionale label + switch)
  - `.is-checked` (modifier di stato)
- data-attributes:
  - `[data-skillpress-toggle-switch]` -- selector di default per `init()`.
- aria:
  - `role="switch"` obbligatorio (auto-applicato da `init()` se mancante).
  - `aria-checked` obbligatorio.
  - `aria-disabled` opzionale (alternativa a `disabled`).
  - `aria-labelledby` o `aria-label` consigliati quando il label non e' associato via `for`.

## Behavior JS
- nessun auto-init implicito: il consumer chiama `window.SkillpressUI.ToggleSwitch.init()` (coerente con breadcrumb).
- `init()` senza argomenti seleziona tutti gli `[data-skillpress-toggle-switch]` del documento.
- `init(selector)` accetta una stringa CSS selector.
- `init(element)` accetta un singolo elemento o un container che contiene switch.
- click, Space, Enter flippano lo stato.
- l'init e' idempotente: ogni nodo viene legato una volta sola.
- la libreria NON gestisce logica di business (es. ricalcolo IVA, abilitazione altri campi): il consumer reagisce all'evento.
- namespace: `window.SkillpressUI.ToggleSwitch`.

## Eventi emessi
- `toggle-switch:change`
  - emesso dopo ogni cambio di stato (click o tastiera).
  - `bubbles: true`.
  - `detail: { checked: boolean }`.

## Esempio di consumo
```html
<button type="button" id="iva-toggle" class="toggle-switch" role="switch" aria-checked="false" data-skillpress-toggle-switch>
    <span class="toggle-switch__thumb"></span>
</button>

<script src="node_modules/@ebattt/skillpress-ui/js/toggle-switch.js"></script>
<script>
    window.SkillpressUI.ToggleSwitch.init();

    document.getElementById('iva-toggle').addEventListener('toggle-switch:change', function(e) {
        // logica consumer (es. ricalcolo prezzo IVA)
        console.log('checked:', e.detail.checked);
    });
</script>
```

## Import
CSS:

```css
@import '@ebattt/skillpress-ui/primitives/toggle-switch.css';
```

Bundle demo:

```css
@import '@ebattt/skillpress-ui/bundles/demo-minimal.css';
```

JS:

```html
<script src="node_modules/@ebattt/skillpress-ui/js/toggle-switch.js"></script>
```

## Limiti espliciti
- copre solo lo switch binario on/off. La variante "segmented two-label" (es. `Lordo / Netto` di `.iva-toggle` + `.iva-btn` in `_form-inputs.css`) e' un pattern distinto e NON e' coperta da questa primitiva.
- nessuna variante dimensionale (small/large) -- la fonte ha un'unica taglia.
- nessuna variante colore -- on e' sempre `--color-primary`, off e' sempre `--color-bg-gray-200`.
- nessuna icona dentro il thumb (track + thumb sono CSS puro, niente Material Symbols).
- nessuna persistenza dello stato tra refresh: il consumer e' responsabile dell'idratazione iniziale via `aria-checked` o `is-checked` nel markup.
- nessuna gestione di gruppi (radio-like): per scelte mutuamente esclusive usare un altro pattern.
