# Breadcrumb

## Tipo
Primitiva (layout pattern)

## Fonte
- `Skillpress-frontend/elements-ui/css/components/_layout-patterns.css` (sezione `.breadcrumb`).
- `Skillpress-frontend/elements-ui/js/layout-patterns/breadcrumb.js` (markup di riferimento).

## Pagine demo target
- `product-page-integration`: navigazione di pagina prodotto.
- `blog-page-static`: navigazione articolo.

## Responsabilita
La libreria controlla layout flex, separatore `/`, colore link/voce corrente, hover/focus.

Il backend/CMS controlla testo voci, ordine, URL, voce corrente.

## Cosa controlla il backend
- testo di ogni voce
- URL dei link
- numero di livelli
- quale voce e current
- attributo `href`

## Cosa non controlla il backend
- separatore visivo
- colore voci o link
- spacing del componente
- font-size del breadcrumb

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
- testo di ogni voce.

Opzionali:
- nessuno.

Ripetibili:
- voci `.breadcrumb__item` (1..n).

## Stati
- default
- hover (link)
- focus-visible (link)
- current (`.breadcrumb__item--current`, ultima voce, senza link)

## Varianti
- nessuna variante visiva. Il numero di livelli e contenuto del backend.

## Classi e attributi
Classi:
- `.breadcrumb`
- `.breadcrumb__list`
- `.breadcrumb__item`
- `.breadcrumb__item--current`
- `.breadcrumb__link`

Attributi consigliati:
- `aria-label="Breadcrumb"` su `<nav>`.
- markup Schema.org `BreadcrumbList` su `<ol>` per SEO.

## Behavior JS
Nessun behavior JS. Componente puramente statico.

## Storybook
Stories minime:
- Default
- Compact
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
