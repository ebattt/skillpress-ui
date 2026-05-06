---
title: OrderDetailHeader
description: Header del dettaglio ordine dashboard con back link, titolo, badge e meta.
layer: components
strategy: css-only
sources:
  demo_html: dashboard/index.html#L410-L420
  demo_js: dashboard/js/order-detail.js#L190-L217
  demo_css: dashboard/css/components/_order-detail.css#L457-L553
status: local-link-dev
package_path: components/order-detail-header.css
---

# OrderDetailHeader

`OrderDetailHeader` copre la testa del dettaglio ordine dashboard: back action,
numero ordine, badge stato, subtitle e meta chips.

## Reuse Audit

`Badge` non basta perche' il badge header e' un dot inline senza pill surface e
usa classi `.order-header__badge*`. `Breadcrumb` non e' corretto perche' la
fonte e' una back action contestuale. `Button` non replica il back link light e
non copre il blocco header. `Card` non c'entra: la fonte non ha superficie.

## Markup

```html
<div class="order-detail-header" data-order-detail-header>
    <button class="order-detail-header__back" type="button" data-dashboard-nav="orders">
        <span class="order-detail-header__back-icon" aria-hidden="true"></span>
        Torna agli ordini
    </button>
    <header class="order-header">
        <div class="order-header__top">
            <h1 class="order-header__title">Ordine #110456</h1>
            <span class="order-header__badge order-header__badge--warning">In lavorazione</span>
        </div>
        <p class="order-header__subtitle">
            <span class="order-header__subtitle-line">Catalogo Primavera Estate 2026</span>
            <span class="order-header__subtitle-line">Consegna prevista <strong class="order-header__subtitle-emphasis">12/03/2026</strong></span>
        </p>
        <div class="order-header__meta">
            <span class="dash-action-badge" data-dashboard-action-badge>File richiesto</span>
        </div>
    </header>
</div>
```

## Classi

- `.order-detail-header`
- `.order-detail-header__back`
- `.order-detail-header__back-icon`
- `.order-header`
- `.order-header__top`
- `.order-header__title`
- `.order-header__badge`
- `.order-header__badge--warning`
- `.order-header__badge--success`
- `.order-header__badge--error`
- `.order-header__badge--neutral`
- `.order-header__subtitle`
- `.order-header__subtitle-line`
- `.order-header__subtitle-emphasis`
- `.order-header__meta`

## Responsabilita'

Il backend/app decide contenuti, stato iniziale, modifier badge e destinazione
della back action. La libreria decide spacing, gerarchia tipografica, dot badge,
icona back e responsive.

## Differenze dalla demo

- Material Symbols `arrow_back` viene sostituita da icona CSS library-owned.
- Utility layout demo `flex items-center gap-3 flex-wrap` diventano
  `.order-header__top`.
- `.back-link` viene ricondotto a `.order-detail-header__back`.

## Fuori Scope

Routing, fetch dati ordine, cambio stato, payment action box, prodotti,
summary, stepper e upload.
