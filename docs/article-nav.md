# ArticleNav

Navigazione precedente/successivo per pagine articolo.

## Markup contract

```html
<nav class="article-nav" aria-label="Navigazione articoli">
    <ul class="article-nav__list">
        <li class="article-nav__item article-nav__item--prev">
            <a class="article-nav__link article-nav__link--prev" href="/blog/precedente">Articolo precedente</a>
        </li>
        <li class="article-nav__item article-nav__item--next">
            <a class="article-nav__link article-nav__link--next" href="/blog/successivo">Articolo successivo</a>
        </li>
    </ul>
</nav>
```

## Classi pubbliche

- `.article-nav`: root.
- `.article-nav__list`: row responsive.
- `.article-nav__item`, `.article-nav__item--prev`, `.article-nav__item--next`: item semantici.
- `.article-nav__link`, `.article-nav__link--prev`, `.article-nav__link--next`: link CTA.

## Data hooks

Nessun hook JS. Il componente e CSS-only.

## Modifier / stati

- `.article-nav__link--prev`: aggiunge indicatore precedente.
- `.article-nav__link--next`: aggiunge indicatore successivo.

## Backend owns

URL, label, presenza di previous/next e routing.

## Library owns

Layout, stile CTA, focus, responsive e indicatori direzionali CSS.

## Demo-only

URL placeholder della demo.

## Out of scope

Calcolo articolo precedente/successivo, tracking e routing SPA.
