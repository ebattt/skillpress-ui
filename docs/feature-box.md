# Feature Box

## Tipo
Componente composto

## Fonte
- `Skillpress-frontend/elements-ui/css/components/_cards.css` (sezione `.feature-grid` / `.feature-box`).
- `Skillpress-frontend/elements-ui/js/cards/card-feature.js` (markup di riferimento).

## Pagine demo target
- `product-page-integration`: griglia vantaggi del prodotto.
- `landing-page`: griglia benefici.

## Responsabilita
La libreria controlla griglia 2 colonne, sfondo del box, padding, layout interno (icona + testo), tipografia di titolo e descrizione.

L'icona e uno slot: la libreria fornisce solo contenitore, dimensione 2.25rem e radius. Sfondo dell'icona e contenuto (SVG inline o `<img>`) sono editoriali e arrivano dal consumer/CMS.

Il componente non dipende da Material Symbols.

## Cosa controlla il backend
- testo del titolo
- testo della descrizione
- numero di feature box (1..n)
- contenuto dell'icona (inline SVG o `<img src>` via URL CMS)
- colore di sfondo dell'icona via attributo `style` editoriale

## Cosa non controlla il backend
- struttura della griglia
- padding del box
- dimensione del contenitore icona
- font-size e gerarchia tipografica

## Markup minimo
```html
<div class="feature-grid">
  <div class="feature-box">
    <div class="feature-box__content">
      <div class="feature-box__icon" style="background-color: #E8F5F3;">
        <img src="/assets/icons/fast.svg" alt="" />
      </div>
      <div class="feature-box__text">
        <h3 class="feature-box__title">Veloce</h3>
        <p class="feature-box__description">Stampa con ciclo rapido</p>
      </div>
    </div>
  </div>
  <!-- altri feature-box -->
</div>
```

## Slot
Obbligatori:
- testo titolo.
- testo descrizione.

Opzionali:
- icona dentro `.feature-box__icon` (SVG inline o `<img>` da URL CMS).

Ripetibili:
- `.feature-box` (1..n) dentro `.feature-grid`.

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
- `.feature-box__content`
- `.feature-box__icon`
- `.feature-box__text`
- `.feature-box__title`
- `.feature-box__description`

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
- Slot vuoto (solo testo)
- ReferenceFromElementsUI

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
