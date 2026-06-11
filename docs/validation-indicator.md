---
title: ValidationIndicator
description: Indicatore inline per errori di validazione e riga totale con conteggio.
layer: primitives
strategy: css-only
status: public-contract
package_path: primitives/validation-indicator.css
---

# ValidationIndicator

Primitiva CSS-only per messaggi di validazione compatti. Il contratto e' minimo:
quando l'azione e' accettata non si renderizza nessun indicatore; l'indicatore
appare solo quando c'e' un problema da correggere.

## Anatomy

```text
.sp-validation-indicator
├── ::before   (icona errore CSS)
└── testo

.sp-validation-total
├── .sp-validation-total__count
└── .sp-validation-indicator   (solo se invalido)
```

## Markup contract

Indicatore errore:

```html
<span class="sp-validation-indicator">Mancano 20</span>
```

Totale valido (nessun indicatore):

```html
<div class="sp-validation-total">
    <span class="sp-validation-total__count">Totale: <strong>50</strong> / 50 copie</span>
</div>
```

Totale invalido:

```html
<div class="sp-validation-total">
    <span class="sp-validation-total__count">Totale: <strong>40</strong> / 50 copie</span>
    <span class="sp-validation-indicator">Mancano 10 copie</span>
</div>
```

## Classi pubbliche

| Classe | Ruolo | Required |
|---|---|---|
| `.sp-validation-indicator` | indicatore inline errore con icona CSS + testo | yes |
| `.sp-validation-total` | riga flex totale + indicatore | no |
| `.sp-validation-total__count` | testo conteggio/contesto | no |

## Data hooks

Nessun `data-*` pubblico e nessun JS richiesto: CSS-only.

## Ownership

- Backend/CMS: testo visibile, valore del conteggio, presenza/assenza della riga
  totale e dell'indicatore. Se lo stato e' valido, non renderizzare
  `.sp-validation-indicator`.
- Libreria: dimensione/peso testo, layout inline-flex, gap icona/testo, colore
  errore, icona errore via `::before`, layout della riga totale.

## Out of scope

- validazione applicativa e calcolo dei totali;
- icone Material Symbols globali;
- stato positivo con tick;
- varianti warning/info;
- toast, banner o badge di stato.
