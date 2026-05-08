# ArticleBody

Blocco rich text CMS-generic per contenuto articolo.

## Markup contract

```html
<div class="article-body">
    <p>Testo introduttivo dell'articolo.</p>
    <h2>Sezione interna</h2>
    <p>Paragrafo con <strong>testo forte</strong> e <a href="/contatti">link</a>.</p>
    <ul>
        <li>Punto elenco</li>
        <li>Secondo punto elenco</li>
    </ul>
</div>
```

## Classi pubbliche

- `.article-body`: root per contenuto lungo.
- Elementi supportati: `p`, `h2`, `ul`, `ol`, `li`, `strong`, `a`.

## Data hooks

Nessun hook JS. Il componente e CSS-only.

## Modifier / stati

Nessun modifier.

## Backend owns

HTML rich text, sanitizzazione, link, heading hierarchy, traduzioni e contenuto.

## Library owns

Larghezza, tipografia leggibile, ritmo verticale, liste e link base.

## Demo-only

Copy statico dell'articolo demo.

## Out of scope

Renderer CMS production, embeds, tabelle, codice, immagini inline e TOC.
