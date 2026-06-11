---
title: OrderDetailHeader
description: Header del dettaglio ordine dashboard con back link, titolo, badge stato e meta.
layer: components
strategy: css-only
package_path: components/order-detail-header.css
---

# OrderDetailHeader

Testa del dettaglio ordine dashboard: back action, numero ordine, badge stato,
subtitle e meta chips. CSS-only: la libreria decide spacing, gerarchia
tipografica, dot badge, icona back e responsive; il backend decide contenuti,
stato iniziale, modifier badge e destinazione della back action.

## Markup contract

```html
<div class="order-detail-header" data-order-detail-header>
    <button class="order-detail-header__back" type="button" data-dashboard-nav="orders">
        <span class="order-detail-header__back-icon" aria-hidden="true"></span>
        Torna agli ordini
    </button>
    <header class="order-header">
        <div class="order-header__top">
            <h1 class="order-header__title">Ordine #110456</h1>
            <span class="order-header__badge order-header__badge--info">Aperto</span>
        </div>
        <p class="order-header__subtitle">
            <span class="order-header__subtitle-line">Catalogo Primavera Estate 2026</span>
            <span class="order-header__subtitle-line">Consegna prevista <strong class="order-header__subtitle-emphasis">12/03/2026</strong></span>
        </p>
        <div class="order-header__meta">
            <span class="dashboard-action-badge" data-dashboard-action-badge>File richiesto</span>
        </div>
    </header>
</div>
```

## Classi pubbliche

- `.order-detail-header`, `__back`, `__back-icon`
- `.order-header`, `__top`, `__title`
- `.order-header__badge`, `__badge--{info,warning,success,error,neutral}`
- `.order-header__subtitle`, `__subtitle-line`, `__subtitle-emphasis`
- `.order-header__meta`

## Data hooks

Nessun `data-*` pubblico richiesto (componente CSS-only).
`data-order-detail-header`, `data-dashboard-nav` e `data-dashboard-action-badge`
sono locator/wiring app o hook di componenti figli, non API di questo componente.

## Fuori scope

Routing, fetch dati ordine, cambio stato, payment action box, prodotti, summary,
stepper e upload.
