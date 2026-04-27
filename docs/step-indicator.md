# Step Indicator

## Tipo
Componente composto

## Fonte elements-ui
Categoria:
Cards

Componente:
Step Card (catalogo elements-ui)

File JS catalogo:
`Skillpress-frontend/elements-ui/js/cards/card-step.js` (solo template HTML del catalogo, non runtime)

CSS sorgente:
`Skillpress-frontend/elements-ui/css/components/_cards.css` righe 1037-1178.

Markup sorgente:
`Skillpress-frontend/product-page-integration/index.html` righe 512-564.

Classi originali principali:
`.steps-section`, `.steps-wrapper`, `.steps-container`, `.steps-line`, `.steps-grid`, `.step-card-item`, `.step-card-content`, `.step-badge`, `.step-info`, `.step-title`, `.step-status`.

## Pagine demo target
- `product-page-integration`: `section-steps`, indicatore a 4 step nel configuratore.
- riuso futuro: pagine di checkout multi-step (Configura -> Carrello -> Pagamento -> Carica file).

## Responsabilita
La libreria fornisce wrapper, container, grid responsive (2 colonne mobile, 4 colonne >=1024px), linea di connessione orizzontale, card del singolo step, badge numerato, titolo e status.

Lo stato di avanzamento e' guidato dal CMS che applica/rimuove i modifier `--active`, `--inactive`, `--completed` su badge, titolo e status. Nessun JS della libreria gestisce le transizioni.

## Cosa controlla il backend
- testo del titolo di ogni step.
- testo dello status di ogni step (es. "In corso", "In attesa", "Completato").
- numero degli step renderizzati (tipicamente 2-4 a parita' di look).
- modifier di stato sui badge: `step-badge--active`, `step-badge--inactive`, `step-badge--completed`.
- modifier di stato sui titoli: `step-title--active`, `step-title--inactive`.
- modifier di stato sugli status: `step-status--active`, `step-status--inactive`.
- modifier `step-card-item--active` sulla card dello step corrente.
- attributo `data-step="N"` opzionale sull'item per riferimento.

## Cosa non controlla il backend
- struttura wrapper / container / grid.
- breakpoint 1024px.
- visibilita' della `.steps-line`.
- gradient e tipografia dei badge.
- markup interno fuori dal contratto BEM elencato.
- icone dentro il badge: la libreria mostra solo `<span>N</span>`.

## Markup minimo
Markup verbatim dalla pagina demo `product-page-integration` (4 step, step 1 attivo):

```html
<div id="step-cards" class="steps-section">
    <div class="steps-wrapper">
        <div class="steps-container">
            <div class="steps-line"></div>
            <div class="steps-grid">
                <div class="step-card-item step-card-item--active" data-step="1">
                    <div class="step-card-content">
                        <div class="step-badge step-badge--active">
                            <span>1</span>
                        </div>
                        <div class="step-info">
                            <h3 class="step-title step-title--active">Configura</h3>
                            <span class="step-status step-status--active">In corso</span>
                        </div>
                    </div>
                </div>
                <div class="step-card-item" data-step="2">
                    <div class="step-card-content">
                        <div class="step-badge step-badge--inactive">
                            <span>2</span>
                        </div>
                        <div class="step-info">
                            <h3 class="step-title step-title--inactive">Carrello</h3>
                            <span class="step-status step-status--inactive">In attesa</span>
                        </div>
                    </div>
                </div>
                <div class="step-card-item" data-step="3">
                    <div class="step-card-content">
                        <div class="step-badge step-badge--inactive">
                            <span>3</span>
                        </div>
                        <div class="step-info">
                            <h3 class="step-title step-title--inactive">Pagamento</h3>
                            <span class="step-status step-status--inactive">In attesa</span>
                        </div>
                    </div>
                </div>
                <div class="step-card-item" data-step="4">
                    <div class="step-card-content">
                        <div class="step-badge step-badge--inactive">
                            <span>4</span>
                        </div>
                        <div class="step-info">
                            <h3 class="step-title step-title--inactive">Carica file</h3>
                            <span class="step-status step-status--inactive">In attesa</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Slot
Obbligatori:
- testo titolo dentro `.step-title`.
- testo status dentro `.step-status`.
- numero `<span>N</span>` dentro `.step-badge`.

Opzionali:
- attributo `data-step="N"` sull'item.
- `id` sulla `.steps-section` se serve ancora come ancora di pagina.

Ripetibili:
- `.step-card-item` dentro `.steps-grid` (tipicamente 2-4 step).

## Stati
- default (badge inactive, titolo inactive, status inactive).
- active (badge gradient arancio, titolo in `--color-text`, status in `--color-primary`, item con bordo `--color-primary`).
- completed (badge verde `--color-success` con numero bianco; titolo/status restano lato CMS).
- hover su `.step-card-item` (translateY -2px).

## Varianti
- 4 step (demo product-page-integration).
- 3 step (variante CMS con meno fasi).
- 2 step (variante CMS minima).

La grid resta 2 colonne mobile / 4 colonne desktop come da CSS sorgente: con meno di 4 step, le celle non occupate restano vuote.

## Classi e attributi
Classi:
- `.steps-section` — wrapper di pagina, max-width pagina, padding 1rem, margin-top 0.75rem.
- `.steps-wrapper` — wrapper interno, margin-bottom 1rem.
- `.steps-container` — contenitore relativo per la linea, max-width 64rem.
- `.steps-line` — linea di connessione orizzontale, hidden < 1024px, block >= 1024px, color `#D1D5DB`.
- `.steps-grid` — grid 2 cols mobile, 4 cols desktop, gap 0.75rem, z-index 10 sopra la linea.
- `.step-card-item` — card singolo step, sfondo bianco, border `--color-bg-gray-200`, radius lg, transition slow.
- `.step-card-item--active` — modifier card corrente, border `--color-primary`.
- `.step-card-content` — flex row, align center, gap 0.625rem.
- `.step-badge` — cerchio 1.75rem, font bold xs.
- `.step-badge--active` — gradient `135deg #F08A00 -> #FFB149`, testo bianco.
- `.step-badge--inactive` — bg `--color-bg-gray-200`, testo `--color-text-secondary`.
- `.step-badge--completed` — bg `--color-success`, testo bianco. (Solo background; nessuna icona check.)
- `.step-info` — wrapper testo, flex 1, min-width 0 per ellipsis.
- `.step-title` — h3, font xs semibold, ellipsis nowrap.
- `.step-title--active` — color `--color-text`.
- `.step-title--inactive` — color `#374151` (letterale dal catalogo).
- `.step-status` — font-size 10px, weight medium.
- `.step-status--active` — color `--color-primary`.
- `.step-status--inactive` — color `--color-text-light`.

Attributi:
- `data-step="N"` opzionale su `.step-card-item`.
- `id` opzionale su `.steps-section`.

## Comportamento del CMS
Il CMS aggiorna l'avanzamento spostando i modifier:
- sullo step corrente: `step-card-item--active` + `step-badge--active` + `step-title--active` + `step-status--active`.
- sugli step gia' chiusi: `step-badge--completed` (titolo e status restano configurabili lato CMS, tipicamente in versione "completata").
- sugli step futuri: `step-badge--inactive` + `step-title--inactive` + `step-status--inactive`.

## Behavior JS
Nessun behavior JS della libreria. Componente CSS-only.

## Token usati
- `--color-primary`
- `--color-bg-white`
- `--color-bg-gray-200`
- `--color-text`
- `--color-text-secondary`
- `--color-text-light`
- `--color-success`
- `--radius-lg`
- `--radius-full`
- `--font-size-xs`
- `--font-weight-bold`
- `--font-weight-semibold`
- `--font-weight-medium`
- `--transition-slow`
- `--page-max-width`

Valori letterali mantenuti dal catalogo elements-ui:
- `#374151` su `.step-title--inactive`.
- `#D1D5DB` su `.steps-line`.
- gradient `linear-gradient(135deg, #F08A00 0%, #FFB149 100%)` su `.step-badge--active`.

## Storybook
Stories minime:
- Default
- ReferenceFromElementsUI
- MidProgress
- ThreeSteps
- Mobile

## Import
CSS:

```css
@import '@ebattt/skillpress-ui/components/step-indicator.css';
```

## Limiti
- niente icona check dentro `.step-badge--completed`: il numero resta visibile (no Material Symbols, no SVG inline).
- niente wrapper `.step-card` con hover translateY: hover e' applicato direttamente a `.step-card-item`.
- niente step verticali.
- niente step cliccabili (gli item restano `<div>` senza handler).
- niente animazione sequenziale del badge ne' progress fill della `.steps-line`.
- niente sticky positioning della section.
- niente scroll spy o sync con il configuratore.
- niente auto-fit della grid: con 2 o 3 step le celle desktop restano vuote.
