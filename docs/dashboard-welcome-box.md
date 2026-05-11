# DashboardWelcomeBox

`DashboardWelcomeBox` mostra il saluto iniziale della dashboard cliente.

## Fonte

- Markup reale: `Skillpress-frontend/dashboard/index.html`
- CSS reale: `Skillpress-frontend/dashboard/css/components/_cards.css`
- Fonte catalogo storico: `Skillpress-frontend/elements-ui/js/dashboard/welcome-box.js`
- Pagina target: `dashboard`

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/dashboard-welcome-box.css">
```

Nessun JS richiesto.

## Responsabilita

La libreria decide spacing, tipografia, colori e responsive del banner. Il
backend decide nome utente, testo e localizzazione.

## Reuse Audit

`Card` non viene usato perche' il blocco reale non ha superficie, bordo, radius
o slot card.

`Badge` non viene usato perche' non ci sono stati o dot.

`Button` non viene usato perche' il greeting non contiene CTA o azioni.

Le primitive `tokens`, `fonts` e `reset` restano la base runtime, ma non vengono
forzate primitive visuali per coprire il banner.

## Markup Minimo

```html
<div class="dashboard-greeting-banner" data-dashboard-welcome-box>
    <h1 class="dashboard-greeting-banner__title">
        Ciao <span class="user-name">Mario Rossi</span>
    </h1>
    <p class="dashboard-greeting-banner__subtitle">Benvenuto nella dashboard</p>
</div>
```

## Classi

- `.dashboard-greeting-banner`
- `.dashboard-greeting-banner__title`
- `.dashboard-greeting-banner__subtitle`
- `.user-name`

## Attributi

- `[data-dashboard-welcome-box]`: hook semantico opzionale. Non esiste behavior
  JS di libreria associato.

## Modifier

Nessun modifier.

## Fuori Scope

- recupero dati utente;
- routing o navigazione dashboard;
- card ordini recenti;
- badge stato ordini;
- action badge;
- tabelle, upload e viste dettaglio ordine.
