---
title: ArticleHero
description: Header editoriale con categoria, titolo, meta e immagine hero opzionale.
layer: components
strategy: css-only
package_path: components/article-hero.css
---

# ArticleHero

Header editoriale articolo. CSS-only. La libreria possiede larghezza articolo, spacing, tipografia, media frame e responsive; il backend possiede categoria, titolo, meta, immagine e alt text.

## Markup contract

```html
<header class="article-hero">
    <div class="article-hero__header">
        <span class="article-hero__category">Come si fa</span>
        <h1 class="article-hero__title">Rilegatura a filo refe vs brossura fresata</h1>
        <p class="article-hero__meta">12 Settembre 2025 · 5 min lettura</p>
    </div>
    <figure class="article-hero__media">
        <img src="/cms/blog/rilegatura.png" alt="Rilegatura a filo refe e brossura fresata">
    </figure>
</header>
```

## Classi pubbliche

- `.article-hero`: root con larghezza articolo.
- `.article-hero__header`: stack testuale.
- `.article-hero__category`: categoria pill.
- `.article-hero__title`: titolo.
- `.article-hero__meta`: data, autore o tempo lettura.
- `.article-hero__media`: slot figura hero (omissibile se l'articolo non ha immagine).

Nessun hook JS, nessun modifier.

## Out of scope

SEO metadata, structured data, author card, social sharing e lazy loading policy.
