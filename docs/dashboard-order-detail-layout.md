---
title: DashboardOrderDetailLayout
description: Layout responsive della vista dettaglio ordine dashboard.
layer: components
strategy: css-only
package_path: components/dashboard-order-detail-layout.css
---

# DashboardOrderDetailLayout

Layout helper CSS-only per la vista dettaglio ordine dashboard. Compone header, prodotti, sidebar, riepilogo, pagamento e spedizione senza runtime JS o business logic. I blocchi figli sono componenti dedicati (`DashboardOrderSummary`, `DashboardDropdownBox`, `OrderDetailHeader`, `OrderProductDropdown`, `OrderStatusSteps`, `OrderStepDetail`).

## Markup contract

```html
<section class="order-detail-view" data-dashboard-order-detail-layout>
    <div class="order-detail-header" data-order-detail-header><!-- OrderDetailHeader --></div>

    <div class="order-detail-grid">
        <div class="order-detail-grid__products">
            <!-- OrderProductDropdown + OrderStatusSteps + OrderStepDetail -->
        </div>

        <aside class="order-detail-grid__sidebar">
            <article class="order-summary order-detail-grid__summary" data-dashboard-order-summary><!-- DashboardOrderSummary --></article>
            <div class="dashboard-dropdown-box order-detail-grid__payment" data-dashboard-dropdown-box><!-- Pagamento --></div>
            <div class="dashboard-dropdown-box order-detail-grid__shipping" data-dashboard-dropdown-box><!-- Spedizione --></div>
        </aside>
    </div>
</section>
```

## Classi pubbliche

- `.order-detail-view`
- `.order-detail-grid`, `__products`, `__sidebar`, `__summary`, `__payment`, `__shipping`

## Data hooks

Nessun `data-*` pubblico richiesto (CSS-only). `data-dashboard-order-detail-layout` è un locator demo/app opzionale.

## Layout responsive

- Desktop `>=1024px`: griglia a due colonne `2fr / 1fr`, prodotti a sinistra, sidebar a destra.
- Mobile/tablet `<1024px`: la sidebar usa `display: contents`; i figli vengono riordinati come pagamento, spedizione, prodotti, riepilogo.

## Out of scope

`OrderPaymentActionBox`, `.order-action-box`, pagamento reale, upload, tracking, routing dashboard e qualunque stato applicativo.
