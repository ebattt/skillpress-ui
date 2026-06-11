---
title: Button
description: Primitiva clic Skillpress con varianti, dimensioni e slot icona opzionale.
layer: primitives
strategy: css-only
package_path: primitives/button.css
---

# Button

Primitiva di comandi cliccabili: dimensioni, colori, stati hover/focus/disabled, varianti visive e allineamento testo + icona opzionale. CSS-only: il consumer gestisce click, submit, navigazione e loading state.

Tag accettati: `<button type="button">` o `<a href="...">`. Per link disabilitati usare `.sp-button--disabled` + `aria-disabled="true"`.

## Markup contract

```html
<button class="sp-button sp-button--primary" type="button">Aggiungi al carrello</button>

<a class="sp-button sp-button--outline" href="/preventivi">Vedi preventivi</a>

<button class="sp-button sp-button--secondary" type="button">
  <span class="sp-button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5v14" stroke-width="2" stroke-linecap="round" />
    </svg>
  </span>
  Aggiungi
</button>
```

## Classi pubbliche

| Class | Ruolo | Modifiers |
|---|---|---|
| `.sp-button` | shell (padding/radius/font/transition) | `--primary`, `--secondary`, `--outline`, `--ghost`, `--dashed`, `--sm`, `--full`, `--disabled` |
| `.sp-button__icon` | wrapper inline ~1.125rem per SVG | — |

- `.sp-button--dashed`: comando full-width con bordo tratteggiato (aggiungi destinazioni/righe).
- `.sp-button--disabled`: stato disabilitato per `<a>` o controlli non disabilitabili nativamente (usare con `aria-disabled="true"`).

Attributi: `type` su `<button>`; `disabled` nativo; `href` su `<a>`. Nessun hook `data-*`. Stati hover/focus gestiti dal CSS; loading/pressed non fanno parte del contratto.

## Out of scope

- icon-only button;
- bottoni specifici dashboard/checkout/landing;
- loading spinner;
- gestione submit, routing o tracking.
