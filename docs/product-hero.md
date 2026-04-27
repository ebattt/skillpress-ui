# Product Hero

## Tipo
Componente composto

## Fonte elements-ui
Categoria:
Layout Patterns + Buttons + Feedback Status

Componente:
Hero Split prodotto con galleria statica, rating e feature grid interna.

File JS catalogo:
Nessuno per la libreria. Il comportamento demo originale vive in `Skillpress-frontend/product-page-integration/js/page-init.js` righe 54-86, ma non e implementato in questa iterazione.

CSS sorgente:
- `Skillpress-frontend/elements-ui/css/components/_layout-patterns.css` righe 764-888.
- `Skillpress-frontend/elements-ui/css/components/_buttons.css` righe 291-325.
- `Skillpress-frontend/elements-ui/css/components/_feedback-status.css` righe 220-228.

Classi originali principali:
`.product-hero`, `.hero-grid`, `.hero-image-gallery`, `.hero-image-container`, `.product-shadow`, `.hero-nav-btn`, `.hero-nav-btn--prev`, `.hero-nav-btn--next`, `.hero-info`, `.hero-title`, `.hero-rating`, `.hero-rating-value`, `.hero-review-count`, `.stars-outer`, `.stars-empty`, `.stars-filled`, `.star-icon`.

## Pagine demo target
- `product-page-integration`: `section-hero`, includendo la `.feature-grid` gia coperta da `FeatureBox` dentro `.hero-info`.

## Responsabilita
Product Hero controlla il layout a due colonne, il contenitore immagine prodotto, i bottoni galleria visibili, titolo, rating a stelle sovrapposte, descrizione e posizione della griglia feature.

Il componente e uno snapshot statico iniziale. Non cambia immagine, non calcola il rating e non inizializza behavior JavaScript.

## Cosa controlla il backend
- immagini prodotto: `data-images`, `src` e `alt` dell'immagine principale.
- `id` compatibili con integrazioni future (`mainProductImage`, `prevImageBtn`, `nextImageBtn`).
- titolo prodotto.
- valore rating, percentuale inline di `.stars-filled` e numero recensioni.
- descrizione prodotto.
- contenuto della `.feature-grid` usando il contratto `FeatureBox`.
- SVG inline dei chevron nei bottoni galleria.

## Cosa non controlla il backend
- layout `.hero-grid`.
- dimensione, radius e ombra del contenitore immagine.
- posizionamento dei bottoni prev/next.
- colori e dimensioni delle stelle.
- classi non documentate o sostituzione della `.feature-grid` con un blocco separato.
- dipendenza da Material Symbols o Google Fonts.

## Markup minimo
```html
<div id="product-hero" class="product-hero">
  <div class="hero-grid">
    <div class="hero-image-gallery">
      <div class="hero-image-container product-shadow" data-images='[{"src":"assets/brossura_fresata/brossurafresata2.png","alt":"Brossura fresata vista frontale"}]'>
        <img id="mainProductImage" src="assets/brossura_fresata/brossurafresata2.png" alt="Brossura fresata vista frontale">
        <button id="prevImageBtn" class="hero-nav-btn hero-nav-btn--prev" aria-label="Immagine precedente">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
        <button id="nextImageBtn" class="hero-nav-btn hero-nav-btn--next" aria-label="Immagine successiva">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </div>
    </div>
    <div class="hero-info">
      <h1 class="hero-title">Brossura fresata</h1>
      <div class="hero-rating">
        <span class="hero-rating-value">4.85</span>
        <div class="stars-outer">
          <div class="stars-empty"><span class="star-icon">&#9733;</span><span class="star-icon">&#9733;</span><span class="star-icon">&#9733;</span><span class="star-icon">&#9733;</span><span class="star-icon">&#9733;</span></div>
          <div class="stars-filled" style="width: 97%;"><span class="star-icon">&#9733;</span><span class="star-icon">&#9733;</span><span class="star-icon">&#9733;</span><span class="star-icon">&#9733;</span><span class="star-icon">&#9733;</span></div>
        </div>
        <span class="hero-review-count">52 recensioni</span>
      </div>
      <p class="hero-description">Descrizione prodotto.</p>
      <div class="feature-grid">...</div>
    </div>
  </div>
</div>
```

## Slot
Obbligatori:
- immagine principale in `.hero-image-container`.
- titolo `.hero-title`.
- rating `.hero-rating`.
- descrizione `.hero-description`.
- `.feature-grid` dentro `.hero-info`.

Opzionali:
- piu immagini serializzate in `data-images` per compatibilita futura.

Ripetibili:
- `.feature-box` dentro `.feature-grid`, secondo contratto `FeatureBox`.
- `.star-icon` nel gruppo stelle.

## Stati
- default.
- hover/focus sui bottoni `.hero-nav-btn`.

## Varianti
- nessuna variante runtime in questa iterazione.

## Classi e attributi
Classi:
- `.product-hero`
- `.hero-grid`
- `.hero-image-gallery`
- `.hero-image-container`
- `.product-shadow`
- `.hero-nav-btn`
- `.hero-nav-btn--prev`
- `.hero-nav-btn--next`
- `.hero-info`
- `.hero-title`
- `.hero-rating`
- `.hero-rating-value`
- `.hero-review-count`
- `.stars-outer`
- `.stars-empty`
- `.stars-filled`
- `.star-icon`
- `.feature-grid` e classi `FeatureBox`

Attributi:
- `id="product-hero"` opzionale ma preservato nella demo.
- `id="mainProductImage"`, `id="prevImageBtn"`, `id="nextImageBtn"` preservati per compatibilita futura.
- `data-images` su `.hero-image-container`.
- `aria-label` sui bottoni prev/next.
- `aria-hidden="true"` sugli SVG decorativi.
- `style="width: 97%;"` su `.stars-filled`, calcolato dal backend/CMS.

## Behavior JS
Nessun behavior JS nella libreria. Strategia A: static snapshot.

La libreria non fornisce `js/product-hero.js`, non legge `data-images`, non cambia `src` e non emette eventi. I bottoni restano nel markup per visual parity e compatibilita futura.

## Storybook
Stories minime:
- Default
- ReferenceFromElementsUI
- ComposedForCMS

## Import
CSS:

```css
@import '@ebattt/skillpress-ui/components/product-hero.css';
@import '@ebattt/skillpress-ui/components/feature-box.css';
```

Bundle demo:

```css
@import '@ebattt/skillpress-ui/bundles/demo-minimal.css';
```

JS:

```html
<!-- Nessun JS ProductHero in questa iterazione. -->
```

## Limiti
- nessun cambio immagine prev/next.
- nessuna thumbnail gallery.
- nessuna variante marketing o landing.
- nessun calcolo automatico della percentuale stelle.
- niente Material Symbols.
- la `.feature-grid` deve restare dentro `.hero-info`.
