---
title: RecentOrderCard
description: Card ordine della dashboard overview.
layer: components
strategy: css-only
package_path: components/dashboard-order-card.css
---

# RecentOrderCard

Card ordine della dashboard overview. CSS-only: la libreria possiede griglia
responsive, superficie card, spacing, tipografia, status dot, action alert e
footer. Il backend decide i dati ordine e l'eventuale routing al dettaglio.

La classe card e' in `components/dashboard-order-card.css`; la griglia contenitore
`.dashboard-recent-orders-grid` e' in `components/dashboard-recent-orders-grid.css`.

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/dashboard-recent-orders-grid.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/dashboard-order-card.css">
```

Nessun JS richiesto.

## Markup minimo

```html
<div class="dashboard-recent-orders-grid">
    <article class="dashboard-order-card">
        <div class="dashboard-order-card__header-row">
            <span class="dashboard-order-card__number">#110456</span>
            <span class="dashboard-order-card__status dashboard-order-card__status--info">Aperto</span>
        </div>
        <div class="dashboard-order-card__title dashboard-order-card__title--clamp">Catalogo Primavera Estate 2026</div>
        <div class="dashboard-order-card__info">Spedizione <strong>21/03/2026</strong></div>
        <div class="dashboard-order-card__actions-wrap">
            <span class="dashboard-order-card__action-alert">Azioni richieste</span>
        </div>
        <div class="dashboard-order-card__footer">
            <span class="dashboard-order-card__date">Totale</span>
            <span class="dashboard-order-card__total">&euro; 365,50</span>
        </div>
    </article>
</div>
```

## Classi

- `.dashboard-recent-orders-grid`
- `.dashboard-order-card`
- `.dashboard-order-card__header-row`
- `.dashboard-order-card__number`
- `.dashboard-order-card__status` + `--success|warning|error|info|cancelled`
- `.dashboard-order-card__title` + `--clamp`
- `.dashboard-order-card__info`
- `.dashboard-order-card__actions-wrap`
- `.dashboard-order-card__action-alert`
- `.dashboard-order-card__footer`
- `.dashboard-order-card__date`
- `.dashboard-order-card__total`

## Fuori scope

- routing al dettaglio ordine e click handler;
- tabelle ordini;
- upload o pagamenti;
- fetch/API.
