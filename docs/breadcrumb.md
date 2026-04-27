# Breadcrumb

## Tipo
Primitiva (layout pattern)

## Fonte elements-ui
Categoria: Layout Patterns
Componente: Breadcrumb
File JS catalogo: `Skillpress-frontend/elements-ui/js/layout-patterns/breadcrumb.js`
CSS sorgente: `Skillpress-frontend/elements-ui/css/components/_layout-patterns.css` righe 1989-2025
Classi originali principali: `.breadcrumb`, `.breadcrumb__list`, `.breadcrumb__item`, `.breadcrumb__link`, `.breadcrumb__item--current`

## Pagine demo target
- `product-page-integration`: navigazione di pagina prodotto, posizione consumer `section-breadcrumb`.

## Responsabilita
Breadcrumb fornisce la navigazione gerarchica statica con markup Schema.org `BreadcrumbList`.
La libreria controlla layout flex, wrapping, separatore `/`, colori di link e voce corrente, hover e focus.
Non genera l'albero di navigazione e non contiene behavior JS.

## Cosa controlla il backend
- testo di ogni voce
- URL dei link
- numero di livelli
- ordine delle voci
- quale voce e corrente
- markup Schema.org richiesto dal contratto

## Cosa non controlla il backend
- separatore visivo
- colore voci o link
- spacing del componente
- font-size del breadcrumb
- icone home, chevron o menu overflow

## Markup minimo
```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
    <li class="breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a class="breadcrumb__link" itemprop="item" href="/homepage">
        <span itemprop="name">Homepage</span>
      </a>
      <meta itemprop="position" content="1"/>
    </li>
    <li class="breadcrumb__item breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Pagina corrente</span>
      <meta itemprop="position" content="2"/>
    </li>
  </ol>
</nav>
```

## Slot
Obbligatori:
- voci `.breadcrumb__item`
- testo della voce in `[itemprop="name"]`

Opzionali:
- link `.breadcrumb__link` per le voci non correnti

Ripetibili:
- voci `.breadcrumb__item` (2 o piu livelli)

## Stati
- default
- hover (link)
- focus-visible (link)
- current (`.breadcrumb__item--current`, ultima voce, senza link)

## Varianti
- nessuna variante visiva
- breadcrumb statico a 2+ livelli tramite ripetizione delle voci

## Classi e attributi
Classi:
- `.breadcrumb`
- `.breadcrumb__list`
- `.breadcrumb__item`
- `.breadcrumb__item--current`
- `.breadcrumb__link`

Attributi:
- `aria-label="Breadcrumb"` su `<nav>`
- `itemscope` e `itemtype="https://schema.org/BreadcrumbList"` su `.breadcrumb__list`
- `itemprop="itemListElement"`, `itemscope` e `itemtype="https://schema.org/ListItem"` su `.breadcrumb__item`
- `itemprop="item"` su `.breadcrumb__link`
- `itemprop="name"` sul testo della voce
- `itemprop="position"` e `content` su `<meta>`

## Behavior JS
Nessun behavior JS.

La libreria non inizializza il componente, non emette eventi e non gestisce overflow o menu intermedi.

## Storybook
Stories minime:
- Default
- TwoLevels
- ReferenceFromElementsUI

## Import
CSS:

```css
@import '@ebattt/skillpress-ui/primitives/breadcrumb.css';
```

Bundle demo:

```css
@import '@ebattt/skillpress-ui/bundles/demo-minimal.css';
```

## Limiti
- niente icone home o chevron al posto di `/` (variante non presente in `elements-ui`).
- niente troncamento o ellipsis automatico delle voci troppo lunghe.
- niente versione "compressed" mobile a soli due livelli con menu intermedio.
- niente JS di gestione overflow: il list usa `flex-wrap: wrap`.
- niente generazione link, categorie o traduzioni: sono responsabilita del backend/CMS.
