# Button

## Tipo
Primitiva

## Responsabilita
Button fornisce lo stile base dei comandi cliccabili Skillpress. La libreria controlla dimensioni interne, colori, stati hover/focus/disabled, varianti visive e allineamento di testo e icona opzionale.

Non contiene logica JS e non decide cosa succede al click.

## Cosa controlla il backend
- testo del bottone
- elemento HTML usato (`button` o `a`)
- attributi nativi come `type`, `href`, `disabled`
- stato iniziale disabled quando necessario
- eventuale icona inline SVG nello slot documentato

## Cosa non controlla il backend
- classi interne non documentate
- colori o padding custom per correggere il componente
- dipendenze da Material Symbols
- logica business dentro la libreria

## Markup minimo
```html
<button class="button button--primary" type="button">
  Aggiungi al carrello
</button>
```

Link con stesso stile:

```html
<a class="button button--outline" href="/preventivi">
  Vedi preventivi
</a>
```

Con icona inline:

```html
<button class="button button--secondary" type="button">
  <span class="button__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M12 5v14" stroke-width="2" stroke-linecap="round" />
    </svg>
  </span>
  Aggiungi
</button>
```

## Slot
Obbligatori:
- contenuto testuale o equivalente accessibile

Opzionali:
- `.button__icon`

Ripetibili:
- nessuno

## Stati
- default
- hover
- focus-visible
- disabled: `disabled`, `aria-disabled="true"` o `.is-disabled`

## Varianti
- `.button--primary`
- `.button--secondary`
- `.button--outline`
- `.button--ghost`
- `.button--sm`
- `.button--full`

## Classi e attributi
Classi:
- `.button`
- `.button__icon`
- `.button--primary`
- `.button--secondary`
- `.button--outline`
- `.button--ghost`
- `.button--sm`
- `.button--full`
- `.is-disabled`

Attributi:
- `type="button"` raccomandato quando non e submit
- `disabled` per `<button>`
- `aria-disabled="true"` per link o controlli non disabilitabili nativamente

## Behavior JS
Non esiste behavior JS nel componente Button.

La libreria non intercetta click, submit, navigazione o loading state. Il consumer gestisce il comportamento applicativo.

## Storybook
Stories minime:
- Default
- Variants
- WithIcon
- FullWidth
- Disabled
- ReferenceFromOriginal

## Import
CSS:

```css
@import '@ebattt/skillpress-ui/primitives/button.css';
```

Bundle demo:

```css
@import '@ebattt/skillpress-ui/bundles/demo-minimal.css';
```

## Limiti
- non include icon-only button
- non include bottoni specifici dashboard, checkout o landing
- non include loading spinner
- non include gestione submit o routing
- non supporta Material Symbols come dipendenza runtime globale
