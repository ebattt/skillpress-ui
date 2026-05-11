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
└── .sp-accordion   [data-accordion]
    └── .sp-accordion__section   [data-accordion-section] [.sp-accordion__section--expanded]
        ├── .sp-accordion__header   [data-accordion-trigger] [aria-expanded]
        │   ├── .sp-accordion__header-left
        │   │   ├── .sp-accordion__badge       (opzionale, numero step)
        │   │   ├── .sp-accordion__header-icon (opzionale, set chiuso: cart/shipping/payment)
        │   │   └── .sp-accordion__header-text (opzionale, quando serve subtitle)
        │   │       ├── .sp-accordion__title
        │   │       └── .sp-accordion__subtitle
        │   └── .sp-accordion__icon         (icona +/- decorativa, aria-hidden)
        └── .sp-accordion__content
            └── .sp-accordion__inner        (slot consumer)
```

Default state: `collapsed`. Stato `expanded` aggiunge la classe `accordion__section--expanded` su `.sp-accordion__section` e flippa `aria-expanded="true"` sul trigger.

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

Markup con icona chrome library-owned, usato per la shell checkout:

```html
<button class="sp-accordion__header" type="button" data-accordion-trigger aria-expanded="false">
  <span class="sp-accordion__header-left">
    <span class="sp-accordion__header-icon sp-accordion__header-icon--cart" aria-hidden="true"></span>
    <span class="sp-accordion__header-text">
      <span class="sp-accordion__title">Carrello</span>
      <span class="sp-accordion__subtitle">Libri brossura fresata, Libro con copertina rigida</span>
    </span>
  </span>
  <span class="sp-accordion__icon" aria-hidden="true"></span>
</button>
```

Markup con sottotitolo senza icona:

```html
<span class="sp-accordion__header-left">
  <span class="sp-accordion__badge">2</span>
  <span class="sp-accordion__header-text">
    <span class="sp-accordion__title">Spedizione</span>
    <span class="sp-accordion__subtitle">Inserisci indirizzo di consegna</span>
  </span>
</span>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.sp-accordion` | container, `data-accordion` per auto-init | yes | — |
| `.sp-accordion--surface-white` | root modifier checkout-like: sezione aperta e inner restano bianchi, header piu' ampio, contenuto senza divisore superiore | no | — |
| `.sp-accordion__section` | sezione singola, ripetibile | yes | `--expanded` |
| `.sp-accordion__header` | trigger cliccabile (`<button>`) | yes | — |
| `.sp-accordion__header-left` | wrapper flex per badge + title | yes | — |
| `.sp-accordion__badge` | badge numerato opzionale | no | — |
| `.sp-accordion__header-icon` | icona chrome opzionale, disegnata dalla libreria | no | `--cart`, `--shipping`, `--payment` |
| `.sp-accordion__header-text` | wrapper opzionale per title + subtitle | no | — |
| `.sp-accordion__title` | titolo della sezione | yes | — |
| `.sp-accordion__subtitle` | sottotitolo opzionale di stato/azione, una riga con ellipsis | no | — |
| `.sp-accordion__icon` | icona +/- decorativa (CSS pseudo-elements) | yes | — |
| `.sp-accordion__content` | wrapper collassato (max-height/opacity) | yes | — |
| `.sp-accordion__inner` | slot consumer con padding e border-top | yes | — |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `data-accordion` | `.sp-accordion` | yes | Marker per auto-init su `DOMContentLoaded`. |
| `data-accordion-section` | `.sp-accordion__section` | yes | Marker della sezione. |
| `data-accordion-trigger` | `.sp-accordion__header` | yes | Marker del trigger cliccabile. |
| `aria-expanded` | `.sp-accordion__header` | yes | Sincronizzato dal JS (`true` / `false`). |
| `type="button"` | `.sp-accordion__header` | yes | Necessario perche' il trigger e' un `<button>`. |
| `aria-hidden="true"` | `.sp-accordion__icon` | yes | L'icona e' decorativa. |
| `aria-hidden="true"` | `.sp-accordion__header-icon` | yes, se presente | Le icone header sono chrome decorativo. |

## Hook data-*

| Hook | Element | Role | Esposto al consumer |
|---|---|---|---|
| `data-accordion` | `.sp-accordion` | Entry point: attiva l'auto-init del container. Unico hook che il backend deve scrivere per abilitare la primitiva. | si |
| `data-accordion-section` | `.sp-accordion__section` | Sotto-ruolo: marca le sezioni gestite dal toggle. Stabile (parte del contratto markup). | si (markup) |
| `data-accordion-trigger` | `.sp-accordion__header` | Sotto-ruolo: marca il pulsante che apre/chiude la sezione. | si (markup) |

Solo `[data-accordion]` e' un hook funzionale di init. `[data-accordion-section]` e `[data-accordion-trigger]` sono sotto-ruoli interni del contratto markup: vanno scritti come da template, ma non vengono interrogati esternamente. La classe modifier `accordion__section--expanded` viene gestita dal JS (toggle automatico) — il backend la imposta solo per dichiarare lo stato iniziale.

## Mappatura nomi (demo product-page -> libreria)

La demo originale (`product-page-integration`) usava il modifier non-BEM `expanded` come classe standalone. La libreria post-prompt-19 usa solo il modifier BEM completo. Il backend deve usare i nomi LIBRERIA, non quelli demo.

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.sp-accordion__section.expanded` (compound) | `.sp-accordion__section.sp-accordion__section--expanded` |
| `.expanded` (standalone) | `.sp-accordion__section--expanded` |

Tutto il resto del contratto (`.sp-accordion`, `.sp-accordion__section`, `.sp-accordion__header`, `.sp-accordion__header-left`, `.sp-accordion__badge`, `.sp-accordion__title`, `.sp-accordion__icon`, `.sp-accordion__content`, `.sp-accordion__inner`) era gia' BEM strict prima del prompt 19: nessuna divergenza.

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

Comportamento: click su `[data-accordion-trigger]` apre o chiude la sezione associata. Quando una sezione si apre, il JS apre subito la sezione cliccata e chiude le altre sezioni dello stesso container al frame successivo (single-open), evitando un movimento brusco close-then-open. Durante la transizione il JS misura l'altezza reale di `.sp-accordion__content`; a fine apertura rimuove il vincolo inline (`max-height: none`) per non tagliare contenuti dinamici. Il JS aggiorna `aria-expanded` e la classe `accordion__section--expanded`; l'icona `+/-` reagisce via CSS.

Namespace globale: `window.SkillpressUI.Accordion`.

## Examples

- `Collapsed` → `primitives-accordion--collapsed`
- `Expanded` → `primitives-accordion--expanded`
- `MultipleSections` → `primitives-accordion--multiple-sections`
- `WithoutBadge` → `primitives-accordion--without-badge`
- `SurfaceWhite` → `primitives-accordion--surface-white`
- `WithSubtitle` → `primitives-accordion--with-subtitle`
- `PopulatedContentSlot` → `primitives-accordion--populated-content-slot`

## Varianti Surface

Default accordion usa `--section-bg-expanded` e `.sp-accordion__inner` grigio,
come nel configuratore product page. Per contesti in cui il pannello aperto deve
restare bianco, usare il modifier root `.sp-accordion--surface-white`. Questa
variante segue il pattern checkout `checkout-section / section-header /
section-content`: header piu' ampio e contenuto senza linea divisoria superiore.

```html
<div class="sp-accordion sp-accordion--surface-white" data-accordion>
    ...
</div>
```

Il modifier non cambia behavior, ARIA o struttura DOM: cambia solo la superficie
visiva di sezione aperta, header e contenuto.

## Token usati

`--section-gap`, `--section-bg`, `--section-bg-expanded`, `--section-border`, `--section-radius`, `--section-number-size`, `--section-number-bg`, `--section-number-color`, `--color-bg-gray-50`, `--color-bg-gray-200`, `--color-text`, `--color-text-muted`, `--font-weight-semibold`, `--font-weight-bold`, `--font-size-base`, `--radius-full`, `--spacing-md`, `--transition-fast`, `--transition-slow`, `--transition-section`.

## Note CMS

- decide quali sezioni rendere visibili.
- decide il contenuto degli slot `header` e `content`.
- decide se una sezione parte `collapsed` o `expanded` (classe `accordion__section--expanded` + `aria-expanded` coerenti).
- decide se mostrare o omettere il badge numerato.
- decide se mostrare o omettere `.sp-accordion__subtitle` e il testo corrente.
  Nel checkout il sottotitolo deve riassumere lo stato, non duplicare istruzioni
  lunghe: esempi `Inserisci indirizzo di consegna`,
  `2 destinazioni · 600 copie totali`, `Mario Rossi · Carta di credito`.
- puo' scegliere un'icona header solo dal set chiuso documentato:
  `.sp-accordion__header-icon--cart`, `.sp-accordion__header-icon--shipping`,
  `.sp-accordion__header-icon--payment`.
- non deve cambiare il markup interno della sezione, ne' aggiungere classi custom fuori contratto, ne' duplicare il behavior JS.
- non deve fornire SVG, immagini, Material Symbols o altri asset per le icone chrome dell'header.

## Classi pubbliche

- `.sp-accordion`
- `.sp-accordion--surface-white`
- `.sp-accordion__section`
- `.sp-accordion__section--expanded`
- `.sp-accordion__header`
- `.sp-accordion__header-left`
- `.sp-accordion__badge`
- `.sp-accordion__header-icon`
- `.sp-accordion__header-icon--cart`
- `.sp-accordion__header-icon--shipping`
- `.sp-accordion__header-icon--payment`
- `.sp-accordion__header-text`
- `.sp-accordion__title`
- `.sp-accordion__subtitle`
- `.sp-accordion__icon`
- `.sp-accordion__content`
- `.sp-accordion__inner`

## Data hooks

- `data-accordion`: hook pubblico di init del runtime.
- `data-accordion-section`: sotto-ruolo stabile del markup.
- `data-accordion-trigger`: sotto-ruolo stabile del markup.

## Modifier / stati

- `.sp-accordion__section--expanded` + `aria-expanded="true"`: sezione aperta.
- Sezione senza modifier + `aria-expanded="false"`: sezione chiusa.
- `.sp-accordion--surface-white`: variante di superficie checkout-like.

## Backend owns

- Numero sezioni, titoli, sottotitoli, contenuti slot e stato iniziale aperto/chiuso.
- Scelta di badge e icona header tra quelle documentate.
- Logica business tra sezioni, persistenza e dipendenze form.

## Library owns

- Toggle locale single-open, sync `aria-expanded`, altezza pannello e eventi
  `sp:accordion:open|close`.
- Icone chrome CSS `cart|shipping|payment`, spacing, superfici e transizioni.
- Tipografia e truncation del sottotitolo.

## Demo-only

- Contenuti degli slot nelle pagine consumer e fixture product-page/checkout.
- Qualsiasi script che collega accordion a prezzi, form o routing.

## Out of scope

- accordion come contenitore arbitrario con gerarchie diverse.
- stati non documentati.
- persistenza stato aperto fra refresh o navigazioni.
- dipendenze fra sezioni.
- payload JSON / nomi campo CMS.
