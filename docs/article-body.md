---
title: ArticleBody
description: Blocco rich text CMS-generic per contenuto articolo.
layer: components
strategy: css-only
package_path: components/article-body.css
---

# ArticleBody

Blocco rich text per contenuto articolo. CSS-only. La libreria possiede larghezza, tipografia, ritmo verticale, liste e link base; il backend possiede l'HTML rich text, sanitizzazione, link e heading hierarchy.

## Markup contract

```html
<div class="article-body">
    <p>Testo introduttivo dell'articolo.</p>
    <h2>Sezione interna</h2>
    <p>Paragrafo con <strong>testo forte</strong> e <a href="/contatti">link</a>.</p>
    <ul>
        <li>Punto elenco</li>
    </ul>
</div>
```

## Classi pubbliche

- `.article-body`: root per contenuto lungo. Elementi supportati: `p`, `h2`, `ul`, `ol`, `li`, `strong`, `a`.

Nessun hook JS, nessun modifier.

## Out of scope

Renderer CMS production, embeds, tabelle, codice, immagini inline e TOC.
