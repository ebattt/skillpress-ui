---
title: DashboardActionBadge
description: Chip rosso per azioni richieste nella dashboard (es. caricare file/contabile).
layer: components
strategy: css-only
package_path: components/dashboard-action-badge.css
---

# DashboardActionBadge

Chip uppercase rosso per azioni richieste nella dashboard, usato in tabelle e dettaglio ordine. CSS-only. La libreria possiede sizing, colore, radius, uppercase, hover/focus e icone chrome CSS; il backend possiede testo, visibilità e azione applicativa.

## Markup contract

```html
<span class="dashboard-action-badge" data-dashboard-action-badge>
    <span class="dashboard-action-badge__icon dashboard-action-badge__icon--upload" aria-hidden="true"></span>
    Carica file
</span>
```

L'icona è nascosta di default; le icone sono CSS library-owned.

## Classi pubbliche

- `.dashboard-action-badge`, `--error`
- `.dashboard-action-badge__icon` con `--upload`, `--receipt`, `--error`

## Data hooks

- `[data-dashboard-action-badge]`: hook semantico opzionale. Nessun behavior JS associato.

## Modifier

- `.dashboard-action-badge--error`: variante esplicita errore (oggi visualmente equivalente al default rosso).

## Out of scope

- upload/pagamento reali, validazione file;
- routing/click handler;
- table layout e mobile row details.
