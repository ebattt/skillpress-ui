---
title: ModeSwitcher
description: Gruppo di bottoni pill per selezione esclusiva tra modalita' (es. Veloce/Avanzata).
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_buttons.css#L90-L127
  demo: product-page-integration/index.html#L184-L193
status: post-bem-2026-04-29
package_path: primitives/mode-switcher.css
---

# ModeSwitcher

Gruppo di bottoni pill per selezione esclusiva tra due o piu' modalita'. Il CMS/JS consumer gestisce il toggle dei modifier `--active`/`--inactive` e l'attributo `aria-pressed`. La libreria fornisce solo lo stile visivo.

> Aggiornato 2026-04-29 post BEM standardization (prompt 19 Phase B). Sub-element `mode-btn` rinominato con prefisso `mode-switcher__btn`. Nessun hook `data-*` (componente CSS-only, toggle consumer-side).

## Anatomy

```text
ModeSwitcher
└── mode-switcher   (flex row, gap 0.625rem, role="group")
    └── mode-switcher__btn × N   [--active | --inactive]
        └── <svg>?      (icona opzionale, 1rem)
        └── testo
```

## Markup contract

Markup verbatim da `product-page-integration/index.html#L184-L193`, con Material Symbols sostituiti da SVG inline.

```html
<div class="sp-mode-switcher" role="group" aria-label="Seleziona modalità di configurazione">
    <button id="modeVeloce" class="sp-mode-switcher__btn sp-mode-switcher__btn--active" aria-pressed="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z"/></svg>
        Veloce
    </button>
    <button id="modeAvanzata" class="sp-mode-switcher__btn sp-mode-switcher__btn--inactive" aria-pressed="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/></svg>
        Avanzata
    </button>
</div>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.sp-mode-switcher` | flex container del gruppo | yes | — |
| `.sp-mode-switcher__btn` | singolo bottone pill | yes | `--active`, `--inactive` |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `role="group"` | `.sp-mode-switcher` | yes | Raggruppa i bottoni per accessibilita' |
| `aria-label` | `.sp-mode-switcher` | yes | Descrizione del gruppo |
| `aria-pressed` | `.sp-mode-switcher__btn` | yes | `"true"` sul bottone attivo, `"false"` sugli altri |

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.mode-btn` | `.sp-mode-switcher__btn` |
| `.mode-btn--active` | `.sp-mode-switcher__btn--active` |
| `.mode-btn--inactive` | `.sp-mode-switcher__btn--inactive` |

`.sp-mode-switcher` (block root) e' invariato. La interaction `mode-aware-blocks.js` e' stata aggiornata coerentemente in Wave 1 (legge `.sp-mode-switcher .sp-mode-switcher__btn--active`).

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/mode-switcher.css" />
```

Oppure via bundle (gia' include `mode-switcher.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto. Il toggle `--active`/`--inactive` + `aria-pressed` e' responsabilita' del consumer.

## Examples

- `Default` (Veloce attivo) → `primitives-modeswitcher--default`
- `SecondActive` (Avanzata attivo) → `primitives-modeswitcher--second-active`
- `WithoutIcons` (Singolo/Multicopia senza icone) → `primitives-modeswitcher--without-icons`
- `ThreeOptions` (3 opzioni) → `primitives-modeswitcher--three-options`
- `ReferenceFromElementsUI` (markup verbatim demo) → `primitives-modeswitcher--reference-from-elements-ui`

## Token usati

`--color-primary`, `--color-bg-gray-75`, `--color-bg-gray-100`, `--radius-full`, `--font-size-sm`, `--font-weight-semibold`, `--transition-fast`.

Valori letterali mantenuti dal catalogo:
- `#ffffff` su `.sp-mode-switcher__btn--active` (testo bianco).
- `#374151` su `.sp-mode-switcher__btn--inactive` (testo grigio scuro).

## Note CMS

- esattamente un bottone deve avere `--active` + `aria-pressed="true"` in ogni momento.
- il CMS puo' usare N bottoni (tipicamente 2, ma supportati 3+).
- le icone SVG sono opzionali: senza icona il bottone mostra solo testo.
- `id` sui bottoni e' opzionale: usato dal JS demo per il binding, non dalla libreria.

## Classi pubbliche

- `.sp-mode-switcher`
- `.sp-mode-switcher__btn`
- `.sp-mode-switcher__btn--active`
- `.sp-mode-switcher__btn--inactive`

## Data hooks

Nessun `data-*` pubblico. Il componente e' CSS-only; eventuali hook di binding
del consumer restano privati dell'app/demo.

## Modifier / stati

- `.sp-mode-switcher__btn--active` + `aria-pressed="true"`: opzione selezionata.
- `.sp-mode-switcher__btn--inactive` + `aria-pressed="false"`: opzione non
  selezionata.

## Backend owns

- Numero di opzioni, label e SVG opzionali.
- Stato selezionato iniziale e coerenza tra modifier e `aria-pressed`.
- Toggle al click e qualsiasi logica che mostra/nasconde contenuti dipendenti.

## Library owns

- Layout pill, colori, spacing, font, hover/focus e supporto a icone inline.
- Stabilita' delle classi pubbliche documentate sopra.

## Demo-only

- `id="modeVeloce"` / `id="modeAvanzata"` e binding del configuratore demo.
- Qualsiasi selector di scenario o telemetry non documentato qui.

## Out of scope

- behavior toggle JS (il consumer gestisce il click → swap modifier + aria-pressed).
- variante segmented `.iva-toggle` (Lordo/Netto): pattern distinto, non coperto.
- animazione di transizione tra stati (il catalogo usa solo `transition: all`).
- stato disabled sui bottoni mode.
