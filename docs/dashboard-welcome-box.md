---
title: DashboardWelcomeBox
description: Banner di saluto iniziale della dashboard cliente.
layer: components
strategy: css-only
package_path: components/dashboard-welcome-box.css
---

# DashboardWelcomeBox

Banner di saluto iniziale della dashboard. La libreria decide spacing,
tipografia, colori e responsive; il backend decide nome utente, testo e
localizzazione. CSS-only, nessun JS.

## Markup minimo

```html
<div class="dashboard-greeting-banner" data-dashboard-welcome-box>
    <h1 class="dashboard-greeting-banner__title">
        Ciao <span class="user-name">Mario Rossi</span>
    </h1>
    <p class="dashboard-greeting-banner__subtitle">Benvenuto nella dashboard</p>
</div>
```

## Classi pubbliche

- `.dashboard-greeting-banner`
- `.dashboard-greeting-banner__title`
- `.dashboard-greeting-banner__subtitle`
- `.user-name`

## Data hooks

- `[data-dashboard-welcome-box]`: hook semantico opzionale. Nessun behavior JS di
  libreria associato.

Nessun modifier.

## Fuori scope

Recupero dati utente, routing/navigazione, card ordini recenti, badge stato,
tabelle, upload e viste dettaglio ordine.
