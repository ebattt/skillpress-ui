# Card

## Tipo
Primitiva

## Fonte elements-ui
Categoria:

```text
Cards
```

Componente/fonte:

```text
Skillpress-frontend/elements-ui/css/components/_cards.css
Skillpress-frontend/elements-ui/js/cards/card-feature.js
Skillpress-frontend/elements-ui/js/cards/card-selection.js
Skillpress-frontend/elements-ui/js/cards/card-step.js
Skillpress-frontend/elements-ui/js/cards/card-image-text-below.js
```

Classi originali osservate:

```text
.feature-box
.visual-card
.paper-card
.format-card
.step-card-item
```

Card base non sostituisce questi componenti specifici: fornisce solo una superficie neutra su cui costruire o normalizzare componenti composti successivi.

Non e una fonte autonoma per nuove card CMS. Le card specifiche restano da estrarre come componenti dedicati o varianti documentate solo quando vengono collegate alla matrice `elements-ui -> skillpress-ui -> pagine demo`.

## Pagine demo target
- product-page-integration
- dashboard
- landing-page, solo come fondazione per future card catalogo/prodotto

## Responsabilita
Card fornisce una superficie contenitore generica per blocchi informativi o selezionabili. La libreria controlla bordo, radius, background, padding interno, gerarchia base di titolo/testo e stati visuali semplici.

Non contiene logica JS e non definisce card prodotto, dashboard o checkout specifiche.

## Cosa controlla il backend
- elemento HTML usato (`article`, `section`, `div`, `a` quando semanticamente corretto)
- contenuto degli slot
- stato iniziale selected o disabled
- composizione con primitive esistenti come Button e Badge
- eventuali immagini o URL editoriali dentro lo slot media

## Cosa non controlla il backend
- classi interne non documentate
- padding, bordo o colori custom per correggere la card
- payload CMS obbligatorio
- logica business o navigazione
- icone Material Symbols

## Markup minimo
```html
<article class="card">
  <div class="card__body">
    <h3 class="card__title">Titolo card</h3>
    <p class="card__description">Descrizione breve del contenuto.</p>
  </div>
</article>
```

Con slot opzionali:

```html
<article class="card">
  <div class="card__header">
    <div>
      <span class="card__eyebrow">Eyebrow</span>
      <h3 class="card__title">Titolo tecnico</h3>
    </div>
  </div>
  <div class="card__body">
    <p class="card__description">Descrizione tecnica dello slot.</p>
  </div>
  <div class="card__footer">
    <span class="card__eyebrow">Footer</span>
    <div class="card__actions">
      <!-- Slot azioni opzionale -->
    </div>
  </div>
</article>
```

## Slot
Obbligatori:
- almeno uno tra `.card__body`, `.card__header` o contenuto equivalente documentato

Opzionali:
- `.card__media`
- `.card__header`
- `.card__body`
- `.card__footer`
- `.card__title`
- `.card__description`
- `.card__eyebrow`
- `.card__actions`

Ripetibili:
- `.card__actions` puo contenere piu Button o link

## Stati
- default
- selected: `.card--selected`
- disabled: `.is-disabled` o `aria-disabled="true"`

## Varianti
- `.card--interactive`
- `.card--selected`

## Classi e attributi
Classi:
- `.card`
- `.card__media`
- `.card__header`
- `.card__body`
- `.card__footer`
- `.card__title`
- `.card__description`
- `.card__eyebrow`
- `.card__actions`
- `.card--interactive`
- `.card--selected`
- `.is-disabled`

Attributi:
- `aria-disabled="true"` quando una card interattiva non e disponibile

## Behavior JS
Non esiste behavior JS nel componente Card.

La libreria non intercetta click, routing, selezione applicativa o tracking. Il consumer gestisce questi comportamenti.

## Storybook
Stories minime:
- Default
- InteractiveStates
- ReferenceFromElementsUI

## Import
CSS:

```css
@import '@ebattt/skillpress-ui/primitives/card.css';
```

Bundle demo:

```css
@import '@ebattt/skillpress-ui/bundles/demo-minimal.css';
```

## Limiti
- non include product-card o catalog-card
- non include feature-box, step-card, paper-card o format-card
- non include layout griglia
- non include varianti decorative senza fonte `elements-ui`
- non include hover image swap
- non include behavior JS
- non include icone Material Symbols
