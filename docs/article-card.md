# ArticleCard

Card editoriale riusabile per feed blog, news e contenuti CMS. `ArticleGrid`
fornisce solo il layout responsive della lista.

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
            <a class="button button--primary button--sm" href="/blog/rilegatura">Leggi di piu</a>
        </div>
    </div>
</article>
```

Featured:

```html
<article class="article-card article-card--featured">
    <a class="article-card__media" href="/blog/copertine">
        <img src="/cms/blog/copertine.jpg" alt="Cartoncino colorato con stampa bianca">
    </a>
    <div class="article-card__body">...</div>
</article>
```

Grid:

```html
<section class="article-grid" aria-label="Articoli del blog">
    <div class="article-grid__list">...</div>
</section>
```

## Classi pubbliche

- `.article-grid`, `.article-grid__list`: wrapper e griglia responsive.
- `.article-card`: card editoriale standard.
- `.article-card--featured`: variante evidenziata a due colonne desktop.
- `.article-card__media`, `.article-card__media--contain`: media slot e variante contain.
- `.article-card__body`, `.article-card__category`, `.article-card__title`, `.article-card__title-link`, `.article-card__excerpt`, `.article-card__meta`, `.article-card__actions`: slot contenuto.

## Data hooks

Nessun hook obbligatorio. Il consumer puo usare `data-article-card` come hook
demo/app per progressive enhancement, ma non e richiesto dalla libreria.

## Modifier / stati

- `.article-card--featured`: card hero del feed.
- `.article-card__media--contain`: immagine contenuta con padding.
- Hover e focus-within sono gestiti dalla libreria.

## Backend owns

Titoli, excerpt, categoria, date, URL, immagini, alt text, routing e tracking.

## Library owns

Layout card/grid, media sizing, tipografia, spaziatura, stati hover/focus e
responsive.

## Demo-only

Contenuti statici Skillpress, fixture post e URL locali del consumer.

## Out of scope

Fetch CMS, paginazione, filtro dati, router applicativo e analytics.
