---
title: TextBlock
description: Blocco tipografico editoriale/SEO riusabile su landing, product page e pagine contenuto.
layer: components
strategy: css-only
package_path: components/text-block.css
---

# TextBlock

Blocco tipografico editoriale/SEO riusabile su landing page, product page e pagine
contenuto. CSS-only: la libreria possiede wrapper, larghezza, padding e
tipografia; il CMS/consumer inserisce il testo HTML.

## Markup contract

```html
<section class="text-block" id="chi-siamo" aria-labelledby="landing-text-title">
    <h2 class="text-block__title" id="landing-text-title">Tipografia online Skillpress</h2>
    <p>Skillpress e una tipografia online specializzata nella stampa digitale.</p>
    <h3 class="text-block__subtitle">Non solo stampatori online</h3>
    <p>Il catalogo si arricchisce ogni settimana con nuovi prodotti.</p>
</section>
```

## Classi pubbliche

- `.text-block`: root max-width, padding e tipografia body.
- `.text-block__title`: titolo principale.
- `.text-block__subtitle`: sottotitoli interni.

## Data hooks / modifier

Nessun hook JS e nessun modifier: CSS-only. Il blocco accetta contenuto HTML
semplice (`h2`, `h3`, `p`, `ul`, `li`).

## Ownership

- Backend/CMS: testi, HTML editoriale, anchor/ID, heading hierarchy,
  sanitizzazione del contenuto.
- Libreria: larghezza, padding, colore testo, font e ritmo verticale; stile di
  title, subtitle, paragrafi e liste.

## Out of scope

WYSIWYG editor, sanitizzazione HTML, traduzioni e SEO metadata.
