# Accordion

## Tipo
Molecola

## Responsabilita
Contenitore espandibile per sezioni di configurazione o contenuto strutturato. La libreria controlla markup interno, stati visuali, aria e toggle locale del pannello.

## Cosa controlla il backend
- decide quali sezioni rendere visibili
- decide il contenuto dello slot `header`
- decide il contenuto dello slot `content`
- decide se una sezione parte `collapsed` o `expanded`
- decide se mostrare o omettere il badge numerato

## Cosa non deve fare il backend
- non deve cambiare il markup interno della sezione
- non deve aggiungere classi custom fuori contratto
- non deve duplicare il behavior JS di toggle
- non deve usare l'accordion come contenitore arbitrario con gerarchie diverse
- non deve forzare stati non documentati

## Slot e parti modificabili
- slot obbligatori:
  - `header`
  - `content`
- slot opzionali:
  - `accordion__badge`
- parti ripetibili:
  - `accordion__section`
- fallback:
  - se il badge manca, l'header resta valido con solo titolo e icona

## Default state
`collapsed`

## Stati supportati
- `collapsed` (default): nessuna classe `expanded` su `[data-accordion-section]`, trigger con `aria-expanded="false"`
- `expanded`: classe `expanded` su `[data-accordion-section]`, trigger con `aria-expanded="true"`

## Varianti supportate
- con badge numerato
- senza badge numerato

## Markup minimo
```html
<div class="accordion" data-accordion>
  <section class="accordion__section" data-accordion-section>
    <button class="accordion__header" type="button" data-accordion-trigger aria-expanded="false">
      <span class="accordion__header-left">
        <span class="accordion__badge">1</span>
        <span class="accordion__title">Formato e supporto</span>
      </span>
      <span
        class="material-symbols-outlined accordion__icon"
        data-accordion-icon
        data-icon-open="remove"
        data-icon-closed="add"
        aria-hidden="true"
      >add</span>
    </button>
    <div class="accordion__content">
      <div class="accordion__inner">
        <p>Contenuto della sezione.</p>
      </div>
    </div>
  </section>
</div>
```

## Hook tecnici
- classi:
  - `.accordion`
  - `.accordion__section`
  - `.accordion__header`
  - `.accordion__header-left`
  - `.accordion__badge`
  - `.accordion__title`
  - `.accordion__icon`
  - `.accordion__content`
  - `.accordion__inner`
- data-attributes:
  - `[data-accordion]` obbligatorio sul container auto-inizializzato
  - `[data-accordion-section]` obbligatorio su ogni sezione
  - `[data-accordion-trigger]` obbligatorio sul trigger cliccabile
  - `[data-accordion-icon]` opzionale se si vuole il cambio `add/remove`
- aria:
  - `aria-expanded` obbligatorio sul trigger

## Behavior JS
- auto-init su `DOMContentLoaded` per ogni `[data-accordion]`
- init esplicita via `window.SkillpressUI.Accordion.init(container)`
- click su `[data-accordion-trigger]` apre o chiude la sezione associata
- quando una sezione si apre, le altre sezioni dello stesso container vengono chiuse
- il JS aggiorna `aria-expanded` e, se presente, il contenuto dell'icona `data-accordion-icon`
- namespace: `window.SkillpressUI.Accordion`

## Eventi emessi
- `sp:accordion:open`
  - emesso quando una sezione viene aperta
  - `bubbles: true`
- `sp:accordion:close`
  - emesso quando una sezione viene chiusa
  - `bubbles: true`

## Import
```css
@import '@ebattt/skillpress-ui/primitives/accordion.css';
```

```html
<link rel="stylesheet" href="node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css">
<script src="node_modules/@ebattt/skillpress-ui/js/accordion.js"></script>
```

## Limiti espliciti
- non gestisce logica business o dipendenze tra sezioni
- non definisce payload JSON o nomi campo CMS
- non crea markup delle card interne: il backend deve popolare solo gli slot documentati
- non include persistenza dello stato aperto tra refresh o navigazioni
