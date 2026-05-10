---
title: ValidationIndicator
description: Indicatore inline per errori di validazione e riga totale con conteggio.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_configurator-patterns.css
  catalog_js: elements-ui/js/components-feedback-status.js
  demo: product-page-integration/js/sections/section-6.js
status: local-unpublished
package_path: primitives/validation-indicator.css
---

# ValidationIndicator

Primitiva CSS-only per messaggi di validazione compatti. Nasce dal pattern
`Validation Indicator` del catalogo `elements-ui` e dall'output reale
multicopertina in `product-page-integration`.

Il contratto e' volutamente minimo: quando l'azione dell'utente e' accettata
non si renderizza nessun indicatore. L'indicatore appare solo quando c'e' un
problema da correggere.

## Anatomy

```text
ValidationIndicator
└── .sp-validation-indicator
    ├── ::before   (icona errore CSS)
    └── testo

ValidationTotal
└── .sp-validation-total
    ├── .sp-validation-total__count
    └── .sp-validation-indicator   (solo se invalido)
```

## Markup Contract

Indicatore errore:

```html
<span class="sp-validation-indicator">
    Mancano 20
</span>
```

Contesto con totale valido: nessun indicatore.

```html
<div class="sp-validation-total">
    <span class="sp-validation-total__count">Totale: <strong>50</strong> / 50 copie</span>
</div>
```

Contesto con totale invalido:

```html
<div class="sp-validation-total">
    <span class="sp-validation-total__count">Totale: <strong>40</strong> / 50 copie</span>
    <span class="sp-validation-indicator">Mancano 10 copie</span>
</div>
```

## API Reference

| Classe | Ruolo | Required | Modifiers |
|---|---|---|---|
| `.sp-validation-indicator` | indicatore inline errore con icona CSS + testo | yes | — |
| `.sp-validation-total` | riga flex totale + indicatore | no | — |
| `.sp-validation-total__count` | testo conteggio/contesto | no | — |

## Cosa Decide Backend/CMS

- testo visibile (`Mancano 20`, `Eccedono 50`);
- valore del conteggio;
- presenza o assenza della riga totale;
- presenza o assenza dell'indicatore. Se lo stato e' valido, non renderizzare
  `.sp-validation-indicator`.

## Cosa Decide La Libreria

- dimensione testo 12px;
- font-weight 500;
- layout inline-flex;
- gap icona/testo;
- colore errore;
- icona errore via CSS `::before`;
- layout della riga totale.

## Import

Via file diretto:

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/validation-indicator.css" />
```

Oppure via bundle:

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun JS richiesto.

## Out Of Scope

- validazione applicativa;
- calcolo dei totali;
- icone Material Symbols globali;
- SVG scelti dal CMS per questo pattern;
- stato positivo con tick;
- varianti warning/info non presenti nella fonte utile al backend;
- toast, banner o badge di stato.
