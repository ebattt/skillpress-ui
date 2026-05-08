# ArticleHero

Header editoriale con categoria, titolo, meta e immagine hero opzionale.

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
- `.article-hero__title`: titolo articolo.
- `.article-hero__meta`: data, autore o tempo lettura.
- `.article-hero__media`: slot figura hero.

## Data hooks

Nessun hook JS. Il componente e CSS-only.

## Modifier / stati

Nessun modifier. Il media puo essere omesso se l'articolo non ha immagine.

## Backend owns

Categoria, titolo, meta, immagine, alt text e heading hierarchy.

## Library owns

Larghezza articolo, spacing, tipografia, media frame e responsive.

## Demo-only

Contenuto statico dell'articolo demo.

## Out of scope

SEO metadata, structured data, author card, social sharing e lazy loading policy.
