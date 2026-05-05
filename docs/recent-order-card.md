# RecentOrderCard

`RecentOrderCard` mostra una card ordine nella dashboard overview.

## Fonte

- Markup reale: `Skillpress-frontend/dashboard/index.html`
- CSS reale: `Skillpress-frontend/dashboard/css/components/_cards.css`
- Catalogo elements-ui: `Skillpress-frontend/elements-ui/js/dashboard/recent-order-card.js`
- Pagina target: `dashboard`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/recent-order-card.css">
```

Nessun JS richiesto.

## Responsabilita

La libreria decide griglia responsive, superficie card, spacing, tipografia,
status dot interno, action alert interno, footer e hover. Il backend decide i
dati ordine e l'eventuale routing al dettaglio.

## Reuse Audit

`Card` non viene usato perche' la card reale richiede header centrato, status
inline, title clamp, action alert e footer totale con min-height specifici.

`Badge` non viene usato come componente standalone: lo status e l'action alert
sono elementi interni della card. Questa iterazione non introduce
`DashboardStatusBadge` o `DashboardActionBadge`.

`Button` non viene usato perche' la card non contiene CTA.

## Markup Minimo

```html
<div class="dash-recent-orders-grid" data-recent-order-card-list>
    <article class="dash-order-card" data-recent-order-card data-order-id="ORD-001">
        <div class="dash-order-card__header-row">
            <span class="dash-order-card__number">#110456</span>
            <span class="dash-order-card__status dash-order-card__status--info">In lavorazione</span>
        </div>
        <div class="dash-order-card__title dash-order-card__title--clamp">Catalogo Primavera Estate 2026</div>
        <div class="dash-order-card__info">Spedizione <strong>21/03/2026</strong></div>
        <div class="dash-order-card__actions-wrap">
            <span class="dash-order-card__action-alert">Azioni richieste</span>
        </div>
        <div class="dash-order-card__footer">
            <span class="dash-order-card__date">Totale</span>
            <span class="dash-order-card__total">&euro; 365,50</span>
        </div>
    </article>
</div>
```

## Classi

- `.dash-recent-orders-grid`
- `.dash-order-card`
- `.dash-order-card__header-row`
- `.dash-order-card__number`
- `.dash-order-card__status`
- `.dash-order-card__status--success`
- `.dash-order-card__status--warning`
- `.dash-order-card__status--error`
- `.dash-order-card__status--info`
- `.dash-order-card__status--cancelled`
- `.dash-order-card__title`
- `.dash-order-card__title--clamp`
- `.dash-order-card__info`
- `.dash-order-card__actions-wrap`
- `.dash-order-card__action-alert`
- `.dash-order-card__footer`
- `.dash-order-card__date`
- `.dash-order-card__total`

## Attributi

- `[data-recent-order-card-list]`: hook semantico opzionale per il container.
- `[data-recent-order-card]`: hook semantico opzionale per ogni card.
- `data-order-id`: dato applicativo opzionale.

## Modifier

- `.dash-order-card__status--success`
- `.dash-order-card__status--warning`
- `.dash-order-card__status--error`
- `.dash-order-card__status--info`
- `.dash-order-card__status--cancelled`
- `.dash-order-card__title--clamp`

## Fuori Scope

- routing al dettaglio ordine;
- click handler;
- tabelle ordini;
- `DashboardStatusBadge` standalone;
- `DashboardActionBadge` standalone;
- upload o pagamenti;
- fetch/API.
