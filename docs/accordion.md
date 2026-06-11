---
title: Accordion
description: Contenitore espandibile con badge numerato opzionale e toggle locale single-open.
layer: primitives
strategy: css+js
package_path: primitives/accordion.css
js_path: js/accordion.js
---

# Accordion

Contenitore espandibile per sezioni di configurazione o contenuto strutturato. La libreria controlla markup interno, stati visuali, ARIA e toggle locale del pannello (single-open per container). Le icone `+/-` e le icone chrome opzionali di header sono disegnate in CSS. Il backend possiede numero sezioni, titoli, sottotitoli, contenuti slot e stato iniziale aperto/chiuso.

## Anatomy

```text
Accordion
└── .sp-accordion   [data-accordion]
    └── .sp-accordion__section   [data-accordion-section] [.sp-accordion__section--expanded]
        ├── .sp-accordion__header   [data-accordion-trigger] [aria-expanded]
        │   ├── .sp-accordion__header-left
        │   │   ├── .sp-accordion__badge       (opzionale, numero step)
        │   │   ├── .sp-accordion__header-icon (opzionale, set chiuso: --cart/--shipping/--payment)
        │   │   └── .sp-accordion__header-text (opzionale, quando serve subtitle)
        │   │       ├── .sp-accordion__title
        │   │       └── .sp-accordion__subtitle
        │   └── .sp-accordion__icon         (icona +/- decorativa, aria-hidden)
        └── .sp-accordion__content
            └── .sp-accordion__inner        (slot consumer)
```

Stato `expanded`: classe `.sp-accordion__section--expanded` su `.sp-accordion__section` + `aria-expanded="true"` sul trigger.

## Markup contract

```html
<div class="sp-accordion" data-accordion>
  <section class="sp-accordion__section" data-accordion-section>
    <button class="sp-accordion__header" type="button" data-accordion-trigger aria-expanded="false">
      <span class="sp-accordion__header-left">
        <span class="sp-accordion__badge">1</span>
        <span class="sp-accordion__title">Formato e supporto</span>
      </span>
      <span class="sp-accordion__icon" aria-hidden="true"></span>
    </button>
    <div class="sp-accordion__content">
      <div class="sp-accordion__inner">
        <p>Contenuto della sezione.</p>
      </div>
    </div>
  </section>
</div>
```

In alternativa al badge, `.sp-accordion__header-left` può contenere una `.sp-accordion__header-icon` (modifier `--cart`, `--shipping`, `--payment`) e/o un `.sp-accordion__header-text` con `.sp-accordion__title` + `.sp-accordion__subtitle`.

## Classi pubbliche

| Class | Ruolo | Modifiers |
|---|---|---|
| `.sp-accordion` | container, `data-accordion` per auto-init | `--surface-white` |
| `.sp-accordion__section` | sezione singola, ripetibile | `--expanded` |
| `.sp-accordion__header` | trigger cliccabile (`<button>`) | — |
| `.sp-accordion__header-left` | wrapper flex badge/icona + testo | — |
| `.sp-accordion__badge` | badge numerato opzionale | — |
| `.sp-accordion__header-icon` | icona chrome opzionale | `--cart`, `--shipping`, `--payment` |
| `.sp-accordion__header-text` | wrapper opzionale title + subtitle | — |
| `.sp-accordion__title` | titolo | — |
| `.sp-accordion__subtitle` | sottotitolo una riga con ellipsis | — |
| `.sp-accordion__icon` | icona +/- decorativa | — |
| `.sp-accordion__content` | wrapper collassato (max-height/opacity) | — |
| `.sp-accordion__inner` | slot consumer | — |

`.sp-accordion--surface-white`: variante checkout-like (sezione aperta e inner bianchi, header più ampio, contenuto senza divisore superiore). Non cambia behavior, ARIA o struttura DOM.

## Hook data-*

| Hook | Element | Ruolo |
|---|---|---|
| `data-accordion` | `.sp-accordion` | auto-init del container |
| `data-accordion-section` | `.sp-accordion__section` | marca le sezioni gestite dal toggle |
| `data-accordion-trigger` | `.sp-accordion__header` | marca il trigger apri/chiudi |

ARIA richiesto: `aria-expanded` sul trigger (sincronizzato dal JS), `aria-hidden="true"` su `.sp-accordion__icon` e `.sp-accordion__header-icon`.

## JS

- Auto-init su `DOMContentLoaded` per ogni `[data-accordion]`; init esplicito `window.SkillpressUI.Accordion.init(container)`, idempotente (flag `__skillpressAccordionInit`).
- Click su `[data-accordion-trigger]` apre la sezione e chiude le altre dello stesso container (single-open). Il JS aggiorna `aria-expanded` e `.sp-accordion__section--expanded`; l'icona `+/-` reagisce via CSS.
- Eventi (bubbles): `sp:accordion:open`, `sp:accordion:close`.

## Out of scope

- accordion come contenitore arbitrario;
- persistenza stato aperto fra refresh/navigazioni;
- logica/dipendenze fra sezioni;
- payload JSON / nomi campo CMS.
