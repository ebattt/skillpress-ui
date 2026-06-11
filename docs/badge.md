---
title: Badge
description: Badge di stato minimale con dot colorato e testo, sei varianti semantiche.
layer: primitives
strategy: css-only
package_path: primitives/badge.css
---

# Badge

Badge inline che rappresenta uno stato breve con dot colorato (`::before`) e label testuale. CSS-only. La libreria controlla allineamento, dimensione, colore della variante e dot decorativo; non interpreta il significato business dello stato.

## Markup contract

```html
<span class="sp-badge sp-badge--success">Consegnato</span>
```

## Classi pubbliche

`.sp-badge` (shell inline-flex, dot via `::before`) con i modifier `--success`, `--warning`, `--error`, `--info`, `--cancelled`, `--neutral`.

Nessun hook `data-*`, nessun attributo obbligatorio. Il mapping stato dominio → variante e il testo visibile sono del backend.

## Out of scope

- badge solidi con background pieno;
- action badge con icona;
- topic pill, chip selezionabili o tag checkout;
- stati animati.
