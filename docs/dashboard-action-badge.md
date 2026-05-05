# DashboardActionBadge

`DashboardActionBadge` mostra un chip rosso per azioni richieste nella
dashboard, ad esempio caricare file o contabile.

## Fonte

- Markup reale: `Skillpress-frontend/dashboard/index.html`
- CSS reale: `Skillpress-frontend/dashboard/css/components/_buttons.css`
- Context CSS: `Skillpress-frontend/dashboard/css/components/_tables.css`
- Catalogo elements-ui: `Skillpress-frontend/elements-ui/js/dashboard/orders-table.js`
- Pagina target: `dashboard`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/dashboard-action-badge.css">
```

Nessun JS richiesto.

## Responsabilita

La libreria decide sizing, colore, radius, uppercase, hover/focus e icone chrome
CSS. Il backend decide testo, visibilita' e azione applicativa.

## Reuse Audit

`Badge` non basta perche' e' dot + testo senza background; il pattern reale e'
una pill rossa uppercase per azione richiesta.

`Button` non basta perche' il chip ha dimensione compatta da cella/card e non
usa le varianti CTA del bottone.

`Card` non c'entra: non e' una superficie.

`RecentOrderCard` contiene `.dash-order-card__action-alert`, che e' un alert
interno alla card overview, diverso dal chip `.dash-action-badge` usato in
tabelle e dettaglio ordine.

## Markup Minimo

```html
<span class="dash-action-badge" data-dashboard-action-badge>
    <span class="dash-action-badge__icon dash-action-badge__icon--upload" aria-hidden="true"></span>
    Carica file
</span>
```

La fonte dashboard nasconde `.dash-action-badge__icon`; il runtime mantiene lo
stesso default. Le icone sono CSS library-owned, non Material Symbols.

## Classi

- `.dash-action-badge`
- `.dash-action-badge--error`
- `.dash-action-badge__icon`
- `.dash-action-badge__icon--upload`
- `.dash-action-badge__icon--receipt`
- `.dash-action-badge__icon--error`

## Attributi

- `[data-dashboard-action-badge]`: hook semantico opzionale. Non esiste
  behavior JS di libreria associato.

## Modifier

- `.dash-action-badge--error`: variante esplicita errore, oggi visualmente
  equivalente al default rosso.

## Fuori Scope

- upload reale;
- pagamento/contabile reale;
- validazione file;
- routing/click handler;
- table layout;
- mobile row details.
