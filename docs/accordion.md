---
title: Accordion
description: Contenitore espandibile con badge numerato opzionale e toggle locale single-open.
layer: primitives
strategy: css+js
sources:
  catalog_css: elements-ui/css/components/_layout-patterns.css
  demo: product-page-integration/index.html
status: post-bem-2026-04-29
package_path: primitives/accordion.css
js_path: js/accordion.js
---

# Accordion

Contenitore espandibile per sezioni di configurazione o contenuto strutturato. La libreria controlla markup interno, stati visuali, aria e toggle locale del pannello (single-open per container). L'icona `+/-` e le icone chrome opzionali di header sono disegnate dal CSS e non richiedono Material Symbols.

> Aggiornato 2026-04-29 post BEM standardization (prompt 19 Phase B). Modifier `expanded` standalone -> `accordion__section--expanded` (BEM strict). Vedi `iterations/bem-standardization/accordion/CHANGELOG.md`.

## Anatomy

```text
Accordion
└── .accordion   [data-accordion]
    └── .accordion__section   [data-accordion-section] [.accordion__section--expanded]
        ├── .accordion__header   [data-accordion-trigger] [aria-expanded]
        │   ├── .accordion__header-left
        │   │   ├── .accordion__badge       (opzionale, numero step)
        │   │   ├── .accordion__header-icon (opzionale, set chiuso: cart/shipping/payment)
        │   │   └── .accordion__title
        │   └── .accordion__icon         (icona +/- decorativa, aria-hidden)
        └── .accordion__content
            └── .accordion__inner        (slot consumer)
```

Default state: `collapsed`. Stato `expanded` aggiunge la classe `accordion__section--expanded` su `.accordion__section` e flippa `aria-expanded="true"` sul trigger.

## Markup contract

```html
<div class="accordion" data-accordion>
  <section class="accordion__section" data-accordion-section>
    <button class="accordion__header" type="button" data-accordion-trigger aria-expanded="false">
      <span class="accordion__header-left">
        <span class="accordion__badge">1</span>
        <span class="accordion__title">Formato e supporto</span>
      </span>
      <span class="accordion__icon" aria-hidden="true"></span>
    </button>
    <div class="accordion__content">
      <div class="accordion__inner">
        <p>Contenuto della sezione.</p>
      </div>
    </div>
  </section>
</div>
```

Markup con icona chrome library-owned, usato per la shell checkout:

```html
<button class="accordion__header" type="button" data-accordion-trigger aria-expanded="false">
  <span class="accordion__header-left">
    <span class="accordion__header-icon accordion__header-icon--cart" aria-hidden="true"></span>
    <span class="accordion__title">Carrello</span>
  </span>
  <span class="accordion__icon" aria-hidden="true"></span>
</button>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.accordion` | container, `data-accordion` per auto-init | yes | — |
| `.accordion__section` | sezione singola, ripetibile | yes | `--expanded` |
| `.accordion__header` | trigger cliccabile (`<button>`) | yes | — |
| `.accordion__header-left` | wrapper flex per badge + title | yes | — |
| `.accordion__badge` | badge numerato opzionale | no | — |
| `.accordion__header-icon` | icona chrome opzionale, disegnata dalla libreria | no | `--cart`, `--shipping`, `--payment` |
| `.accordion__title` | titolo della sezione | yes | — |
| `.accordion__icon` | icona +/- decorativa (CSS pseudo-elements) | yes | — |
| `.accordion__content` | wrapper collassato (max-height/opacity) | yes | — |
| `.accordion__inner` | slot consumer con padding e border-top | yes | — |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `data-accordion` | `.accordion` | yes | Marker per auto-init su `DOMContentLoaded`. |
| `data-accordion-section` | `.accordion__section` | yes | Marker della sezione. |
| `data-accordion-trigger` | `.accordion__header` | yes | Marker del trigger cliccabile. |
| `aria-expanded` | `.accordion__header` | yes | Sincronizzato dal JS (`true` / `false`). |
| `type="button"` | `.accordion__header` | yes | Necessario perche' il trigger e' un `<button>`. |
| `aria-hidden="true"` | `.accordion__icon` | yes | L'icona e' decorativa. |
| `aria-hidden="true"` | `.accordion__header-icon` | yes, se presente | Le icone header sono chrome decorativo. |

## Hook data-*

| Hook | Element | Role | Esposto al consumer |
|---|---|---|---|
| `data-accordion` | `.accordion` | Entry point: attiva l'auto-init del container. Unico hook che il backend deve scrivere per abilitare la primitiva. | si |
| `data-accordion-section` | `.accordion__section` | Sotto-ruolo: marca le sezioni gestite dal toggle. Stabile (parte del contratto markup). | si (markup) |
| `data-accordion-trigger` | `.accordion__header` | Sotto-ruolo: marca il pulsante che apre/chiude la sezione. | si (markup) |

Solo `[data-accordion]` e' un hook funzionale di init. `[data-accordion-section]` e `[data-accordion-trigger]` sono sotto-ruoli interni del contratto markup: vanno scritti come da template, ma non vengono interrogati esternamente. La classe modifier `accordion__section--expanded` viene gestita dal JS (toggle automatico) — il backend la imposta solo per dichiarare lo stato iniziale.

## Mappatura nomi (demo product-page -> libreria)

La demo originale (`product-page-integration`) usava il modifier non-BEM `expanded` come classe standalone. La libreria post-prompt-19 usa solo il modifier BEM completo. Il backend deve usare i nomi LIBRERIA, non quelli demo.

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.accordion__section.expanded` (compound) | `.accordion__section.accordion__section--expanded` |
| `.expanded` (standalone) | `.accordion__section--expanded` |

Tutto il resto del contratto (`.accordion`, `.accordion__section`, `.accordion__header`, `.accordion__header-left`, `.accordion__badge`, `.accordion__title`, `.accordion__icon`, `.accordion__content`, `.accordion__inner`) era gia' BEM strict prima del prompt 19: nessuna divergenza.

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/accordion.css" />
<script src="../node_modules/@ebattt/skillpress-ui/js/accordion.js"></script>
```

Oppure via bundle (gia' include `accordion.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
<script src="../node_modules/@ebattt/skillpress-ui/js/accordion.js"></script>
```

## Behavior JS

```text
Init: auto-init su DOMContentLoaded per ogni [data-accordion]
      esplicita: window.SkillpressUI.Accordion.init(container) — idempotente (flag __skillpressAccordionInit)
Event: sp:accordion:open  (bubbles: true)  emesso quando una sezione viene aperta
       sp:accordion:close (bubbles: true)  emesso quando una sezione viene chiusa
Cosa NON fa:
  - non gestisce logica business o dipendenze fra sezioni
  - non definisce payload JSON o nomi campo CMS
  - non crea markup delle card interne (popola solo gli slot documentati)
  - non persiste lo stato aperto fra refresh o navigazioni
```

Comportamento: click su `[data-accordion-trigger]` apre o chiude la sezione associata. Quando una sezione si apre, il JS apre subito la sezione cliccata e chiude le altre sezioni dello stesso container al frame successivo (single-open), evitando un movimento brusco close-then-open. Durante la transizione il JS misura l'altezza reale di `.accordion__content`; a fine apertura rimuove il vincolo inline (`max-height: none`) per non tagliare contenuti dinamici. Il JS aggiorna `aria-expanded` e la classe `accordion__section--expanded`; l'icona `+/-` reagisce via CSS.

Namespace globale: `window.SkillpressUI.Accordion`.

## Examples

- `Collapsed` → `primitives-accordion--collapsed`
- `Expanded` → `primitives-accordion--expanded`
- `MultipleSections` → `primitives-accordion--multiple-sections`
- `WithoutBadge` → `primitives-accordion--without-badge`
- `PopulatedContentSlot` → `primitives-accordion--populated-content-slot`

## Token usati

`--section-gap`, `--section-bg`, `--section-bg-expanded`, `--section-border`, `--section-radius`, `--section-number-size`, `--section-number-bg`, `--section-number-color`, `--color-bg-gray-50`, `--color-bg-gray-200`, `--color-text`, `--color-text-muted`, `--font-weight-semibold`, `--font-weight-bold`, `--font-size-base`, `--radius-full`, `--spacing-md`, `--transition-fast`, `--transition-slow`, `--transition-section`.

## Note CMS

- decide quali sezioni rendere visibili.
- decide il contenuto degli slot `header` e `content`.
- decide se una sezione parte `collapsed` o `expanded` (classe `accordion__section--expanded` + `aria-expanded` coerenti).
- decide se mostrare o omettere il badge numerato.
- puo' scegliere un'icona header solo dal set chiuso documentato:
  `.accordion__header-icon--cart`, `.accordion__header-icon--shipping`,
  `.accordion__header-icon--payment`.
- non deve cambiare il markup interno della sezione, ne' aggiungere classi custom fuori contratto, ne' duplicare il behavior JS.
- non deve fornire SVG, immagini, Material Symbols o altri asset per le icone chrome dell'header.

## Out of scope

- accordion come contenitore arbitrario con gerarchie diverse.
- stati non documentati.
- persistenza stato aperto fra refresh o navigazioni.
- dipendenze fra sezioni.
- payload JSON / nomi campo CMS.
