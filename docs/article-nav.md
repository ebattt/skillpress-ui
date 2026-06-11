---
title: ArticleNav
description: Navigazione precedente/successivo per pagine articolo.
layer: components
strategy: css-only
package_path: components/article-nav.css
---

# ArticleNav

Navigazione precedente/successivo per pagine articolo. CSS-only. La libreria possiede layout, stile CTA, focus, responsive e indicatori direzionali; il backend possiede URL, label e presenza di previous/next.

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
- `.article-nav__item`, `--prev`, `--next`: item semantici.
- `.article-nav__link`, `--prev`, `--next`: link CTA con indicatore direzionale.

Nessun hook JS.

## Out of scope

Calcolo articolo precedente/successivo, tracking e routing SPA.
