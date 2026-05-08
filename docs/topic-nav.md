# TopicNav

Navigazione a pill per categorie, topic o filtri editoriali.

## Markup contract

```html
<nav class="topic-nav" aria-label="Categorie blog" data-topic-nav>
    <ul class="topic-nav__list">
        <li><a class="topic-nav__link topic-nav__link--active" href="#consigli" aria-current="true">Consigli</a></li>
        <li><a class="topic-nav__link" href="#come-si-fa">Come si fa</a></li>
    </ul>
</nav>
```

## Classi pubbliche

- `.topic-nav`: root con max-width e padding.
- `.topic-nav__list`: lista flex wrap.
- `.topic-nav__link`: pill link.
- `.topic-nav__link--active`: stato attivo visuale.

## Data hooks

- `[data-topic-nav]`: hook opzionale per wire-up consumer/app.

## Modifier / stati

- `.topic-nav__link--active` oppure `aria-current="true"`: topic attivo.
- Hover e focus-visible sono gestiti dalla libreria.

## Backend owns

Lista topic, label, URL, active topic iniziale e semantica `aria-current`.

## Library owns

Layout pill, wrapping responsive, stile active/hover/focus e touch target.

## Demo-only

Il consumer aggiorna lo stato attivo al click per mostrare il comportamento.

## Out of scope

Query dati, filtri reali, routing SPA, tracking e persistenza dello stato.
