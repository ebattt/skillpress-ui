---
title: DashboardOrderDetailLayout
description: Layout responsive della vista dettaglio ordine dashboard.
layer: components
strategy: css-only
sources:
  demo_html: dashboard/index.html#L409-L477
  demo_css: dashboard/css/components/_order-detail.css#L1542-L1609
status: local-link-dev
package_path: components/dashboard-order-detail-layout.css
---

# DashboardOrderDetailLayout

`DashboardOrderDetailLayout` e' il layout helper CSS-only per la vista dettaglio
ordine dashboard. Organizza prodotti, sidebar, riepilogo, pagamento e spedizione
senza introdurre runtime JS o business logic.

## Reuse Audit

`Card` non controlla griglia o ordine responsive. `DashboardOrderSummary`,
`DashboardDropdownBox`, `OrderDetailHeader`, `OrderProductDropdown`,
`OrderStatusSteps` e `OrderStepDetail` coprono i blocchi figli ma non il layout
che li compone. Per questo il gap `.order-detail-grid*` viene coperto da un
layout helper dedicato.

## Markup contract

```html
<section class="order-detail-view" data-dashboard-order-detail-layout>
    <div class="order-detail-header" data-order-detail-header>
        <!-- OrderDetailHeader -->
    </div>

    <div class="order-detail-grid">
        <div class="order-detail-grid__products">
            <!-- OrderProductDropdown + OrderStatusSteps + OrderStepDetail -->
        </div>

        <aside class="order-detail-grid__sidebar">
            <article class="order-summary order-detail-grid__summary" data-dashboard-order-summary>
                <!-- DashboardOrderSummary -->
            </article>

            <div class="dashboard-dropdown-box order-detail-grid__payment" data-dashboard-dropdown-box>
                <!-- DashboardDropdownBox Pagamento -->
            </div>

            <div class="dashboard-dropdown-box order-detail-grid__shipping" data-dashboard-dropdown-box>
                <!-- DashboardDropdownBox Spedizione -->
            </div>
        </aside>
    </div>
</section>
```

## Classi pubbliche

- `.order-detail-view`
- `.order-detail-grid`
- `.order-detail-grid__products`
- `.order-detail-grid__sidebar`
- `.order-detail-grid__summary`
- `.order-detail-grid__payment`
- `.order-detail-grid__shipping`

## Data hooks

Nessun data-* pubblico richiesto. Il componente e CSS-only.

`data-dashboard-order-detail-layout` puo' essere usato come locator demo/app, ma
non e' richiesto dalla libreria.

## Modifier / stati

Desktop `>=1024px`: griglia a due colonne `2fr / 1fr`, prodotti a sinistra e
sidebar a destra.

Mobile/tablet `<1024px`: la sidebar usa `display: contents`; i figli vengono
riordinati come nella demo: pagamento, spedizione, prodotti, riepilogo.

## Backend owns

Il backend/app decide contenuto e presenza dei blocchi figli, dati ordine,
azioni, routing e stati.

## Library owns

La libreria decide griglia, gap, ordine responsive e adattamenti dei box
sidebar.

## Demo-only

`data-dashboard-order-detail-layout` se usato come locator. Eventuali `data-section`,
toolbar scenari, renderer didattici e fixture appartengono alla demo/app.

## Import

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/dashboard-order-detail-layout.css">
```

## Out of scope

`OrderPaymentActionBox`, `.order-action-box`, pagamento reale, upload, tracking,
routing dashboard e qualunque stato applicativo.
