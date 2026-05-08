# LandingTextBlock

Blocco tipografico editoriale/SEO della landing. La libreria possiede wrapper, larghezza, padding e tipografia; il CMS/consumer inserisce il testo HTML.

## Markup contract

```html
<section class="landing-text-block" id="chi-siamo" aria-labelledby="landing-text-title">
    <h2 class="landing-text-block__title" id="landing-text-title">Tipografia online Skillpress: stampa digitale e stampe online</h2>
    <p>Skillpress e una tipografia online specializzata nella stampa digitale.</p>
    <h3 class="landing-text-block__subtitle">Non solo stampatori online</h3>
    <p>Il catalogo Skillpress si arricchisce ogni settimana con nuovi prodotti personalizzati.</p>
    <h3 class="landing-text-block__subtitle">Un numero infinito di temi</h3>
    <p>Ogni articolo si puo rivestire con un tema che ne muta aspetto e nome.</p>
</section>
```

## Classi pubbliche

- `.landing-text-block`: root max-width, padding compatto e tipografia body.
- `.landing-text-block__title`: titolo principale.
- `.landing-text-block__subtitle`: sottotitoli interni.

## Data hooks

Nessun hook JS. Il componente e CSS-only.

## Modifier / stati

Nessun modifier. Il blocco accetta contenuto HTML semplice: `h2`, `h3`, `p`, `ul`, `li`.

## Backend owns

- Testi, HTML editoriale, anchor/ID e heading hierarchy.
- Eventuali link o markup CMS inseriti nello slot.
- Sanitizzazione del contenuto CMS.

## Library owns

- Larghezza, padding, colore testo, font e ritmo verticale interno.
- Stile di title, subtitle, paragrafi e liste.

## Demo-only

- Copy statico Skillpress della landing demo.

## Out of scope

- WYSIWYG editor, sanitizzazione HTML, traduzioni e SEO metadata.
