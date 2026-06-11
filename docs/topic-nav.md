---
title: TopicNav
description: Navigazione a pill per categorie, topic o filtri editoriali.
layer: components
strategy: css-only
package_path: components/topic-nav.css
---

# TopicNav

Navigazione a pill per categorie, topic o filtri editoriali. CSS-only: la libreria
possiede layout pill, wrapping responsive e stati hover/focus; lista topic, label,
URL e topic attivo sono backend/app.

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

## Data hooks / modifier

- `[data-topic-nav]`: hook opzionale per wire-up consumer (nessun behavior JS di libreria).
- `.topic-nav__link--active` o `aria-current="true"`: topic attivo.

## Ownership

- Backend: lista topic, label, URL, topic attivo iniziale, semantica `aria-current`.
- Libreria: layout pill, wrapping responsive, stile active/hover/focus, touch target.

## Out of scope

Query dati, filtri reali, routing SPA, tracking e persistenza dello stato.
