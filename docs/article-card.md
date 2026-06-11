---
title: ArticleCard
description: Card editoriale riusabile per feed blog/news/CMS, con griglia responsive opzionale.
layer: components
strategy: css-only
package_path: components/article-card.css
---

# ArticleCard

Card editoriale per feed blog, news e contenuti CMS. `.article-grid` fornisce il layout responsive della lista. CSS-only. Il backend possiede titoli, excerpt, categoria, date, URL, immagini e alt text.

## Markup contract

```html
<article class="article-card">
    <a class="article-card__media article-card__media--contain" href="/blog/rilegatura">
        <img src="/cms/blog/rilegatura.png" alt="Rilegatura a filo refe e brossura fresata">
    </a>
    <div class="article-card__body">
        <span class="article-card__category">Come si fa</span>
        <h3 class="article-card__title">
            <a class="article-card__title-link" href="/blog/rilegatura">Rilegatura a filo refe vs brossura fresata</a>
        </h3>
        <p class="article-card__excerpt">Guida pratica per scegliere la soluzione giusta.</p>
        <p class="article-card__meta">12 Settembre 2025</p>
        <div class="article-card__actions">
            <a class="sp-button sp-button--primary sp-button--sm" href="/blog/rilegatura">Leggi di più</a>
        </div>
    </div>
</article>
```

Griglia: `<section class="article-grid">` → `<div class="article-grid__list">…</div>`.

## Classi pubbliche

- `.article-grid`, `.article-grid__list`: wrapper e griglia responsive.
- `.article-card`: card standard.
- `.article-card--featured`: variante evidenziata a due colonne desktop.
- `.article-card__media`, `.article-card__media--contain`: media slot e variante contain (immagine con padding).
- `.article-card__body`, `.article-card__category`, `.article-card__title`, `.article-card__title-link`, `.article-card__excerpt`, `.article-card__meta`, `.article-card__actions`: slot contenuto.

Hover e focus-within gestiti dalla libreria. Nessun hook JS richiesto.

## Out of scope

Fetch CMS, paginazione, filtro dati, router applicativo e analytics.
