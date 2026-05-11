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
<div class="dashboard-recent-orders-grid" data-recent-order-card-list>
    <article class="dashboard-order-card" data-recent-order-card data-recent-order-card-order-id="ORD-001">
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
- `.dashboard-order-card__status`
- `.dashboard-order-card__status--success`
- `.dashboard-order-card__status--warning`
- `.dashboard-order-card__status--error`
- `.dashboard-order-card__status--info`
- `.dashboard-order-card__status--cancelled`
- `.dashboard-order-card__title`
- `.dashboard-order-card__title--clamp`
- `.dashboard-order-card__info`
- `.dashboard-order-card__actions-wrap`
- `.dashboard-order-card__action-alert`
- `.dashboard-order-card__footer`
- `.dashboard-order-card__date`
- `.dashboard-order-card__total`

## Attributi

- `[data-recent-order-card-list]`: hook semantico opzionale per il container.
- `[data-recent-order-card]`: hook semantico opzionale per ogni card.
- `data-recent-order-card-order-id`: dato applicativo opzionale.

## Modifier

- `.dashboard-order-card__status--success`
- `.dashboard-order-card__status--warning`
- `.dashboard-order-card__status--error`
- `.dashboard-order-card__status--info`
- `.dashboard-order-card__status--cancelled`
- `.dashboard-order-card__title--clamp`

## Fuori Scope

- routing al dettaglio ordine;
- click handler;
- tabelle ordini;
- `DashboardStatusBadge` standalone;
- `DashboardActionBadge` standalone;
- upload o pagamenti;
- fetch/API.
