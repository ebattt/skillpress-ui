# Feature Box

## Tipo
Componente composto

## Fonte elements-ui
Categoria:
Cards

Componente:
Card Feature

File JS catalogo:
`Skillpress-frontend/elements-ui/js/cards/card-feature.js`

CSS sorgente:
`Skillpress-frontend/elements-ui/css/components/_cards.css` righe 982-1030.

Classi originali principali:
`.feature-grid`, `.feature-box`, `.feature-box-content`, `.feature-box-icon`, `.feature-box-title`, `.feature-box-description`

## Pagine demo target
- `product-page-integration`: `section-feature-grid`, quattro feature box nel product hero.

## Responsabilita
La libreria controlla griglia 2 colonne, sfondo del box, padding, layout interno (icona + testo), tipografia di titolo e descrizione.

L'icona e uno slot: la libreria fornisce solo contenitore, dimensione 2.25rem e radius. Sfondo dell'icona e contenuto (SVG inline o `<img>`) sono editoriali e arrivano dal consumer/CMS.

Il componente non dipende da Material Symbols.

## Cosa controlla il backend
- testo del titolo
- testo della descrizione
- quattro feature box nella demo prodotto
- contenuto dell'icona (inline SVG o `<img src>` via URL CMS)
- colore di sfondo dell'icona via attributo `style` editoriale

## Cosa non controlla il backend
- struttura della griglia
- padding del box
- dimensione del contenitore icona
- font-size e gerarchia tipografica
- dipendenza da Material Symbols o Google Fonts

## Markup minimo
```html
<div class="feature-grid">
  <div class="feature-box">
    <div class="feature-box-content">
      <div class="feature-box-icon" style="background-color: #E8F5F3;">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
          <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
        </svg>
      </div>
      <div>
        <h3 class="feature-box-title">Veloce</h3>
        <p class="feature-box-description">Stampa brossura fresata con ciclo rapido</p>
      </div>
    </div>
  </div>
</div>
```

## Slot
Obbligatori:
- testo titolo.
- testo descrizione.

Opzionali:
- icona dentro `.feature-box-icon` (SVG inline o `<img>` da URL CMS).

Ripetibili:
- `.feature-box` dentro `.feature-grid`.

## Stati
- default
- hover (cambio sfondo del box)

## Varianti
- nessuna variante visuale: la griglia resta 2 colonne come nella fonte.
- il colore di sfondo dell'icona e editoriale e va impostato inline dal consumer.

## Classi e attributi
Classi:
- `.feature-grid`
- `.feature-box`
- `.feature-box-content`
- `.feature-box-icon`
- `.feature-box-title`
- `.feature-box-description`

Attributi:
- nessuno obbligatorio.
- l'`<img>` dell'icona deve avere `alt` vuoto se l'icona e decorativa.

## Behavior JS
Nessun behavior JS. Componente statico.

## Strategia icone
- icona funzionale UI: gestita dalla libreria con SVG/CSS solo se intrinseca al componente. Qui non lo e.
- icona editoriale (questo caso): contenuto inline SVG o `<img src>` fornito dal CMS. La libreria fornisce solo contenitore stabile.
- niente Material Symbols globale.

## Storybook
Stories minime:
- Default
- ReferenceFromElementsUI
- ComposedForCMS

## Import
CSS:

```css
@import '@ebattt/skillpress-ui/components/feature-box.css';
```

Bundle demo:

```css
@import '@ebattt/skillpress-ui/bundles/demo-minimal.css';
```

## Limiti
- niente variante a 3 colonne.
- niente layout colonna su mobile diverso da 2 colonne (la fonte mantiene 2 colonne).
- niente badge dentro la card.
- niente CTA dentro la card (non presente nella fonte).
- non sostituisce `step-card-item`, `paper-card`, `format-card` o `catalog-card`.
