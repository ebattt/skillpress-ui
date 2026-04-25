# Badge

## Tipo
Primitiva

## Responsabilita
Badge rappresenta uno stato breve con testo e dot colorato. La libreria controlla allineamento, dimensione, colore della variante e dot decorativo.

Non interpreta il significato business dello stato.

## Cosa controlla il backend
- testo del badge
- variante visuale
- visibilita del badge
- mapping tra stato applicativo e markup

## Cosa non controlla il backend
- classi interne non documentate
- colore custom fuori dalle varianti supportate
- icone Material Symbols
- logica business o transizioni di stato

## Markup minimo
```html
<span class="badge badge--success">Consegnato</span>
```

## Slot
Obbligatori:
- testo del badge

Opzionali:
- nessuno

Ripetibili:
- nessuno

## Stati
- default

## Varianti
- `.badge--success`
- `.badge--warning`
- `.badge--error`
- `.badge--info`
- `.badge--cancelled`
- `.badge--neutral`

## Classi e attributi
Classi:
- `.badge`
- `.badge--success`
- `.badge--warning`
- `.badge--error`
- `.badge--info`
- `.badge--cancelled`
- `.badge--neutral`

Attributi:
- nessun attributo obbligatorio

## Behavior JS
Non esiste behavior JS nel componente Badge.

## Storybook
Stories minime:
- Default
- Variants
- ReferenceFromOriginal

## Import
CSS:

```css
@import '@ebattt/skillpress-ui/primitives/badge.css';
```

Bundle demo:

```css
@import '@ebattt/skillpress-ui/bundles/demo-minimal.css';
```

## Limiti
- non include badge solidi con background
- non include action badge con icona
- non include topic pill, chip selezionabili o tag checkout
- non include stati animati come pulse/bounce
