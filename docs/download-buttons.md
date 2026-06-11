---
title: DownloadButtons
description: Coppia di bottoni outline arancioni per download istruzioni e template prodotto.
layer: primitives
strategy: css-only
package_path: primitives/download-buttons.css
---

# DownloadButtons

Bottoni outline arancioni (`<a>`) per scaricare documenti associati al prodotto
(istruzioni, template, schede tecniche), tipicamente sotto il total box della
sidebar configuratore, separati da un divider. Il CMS decide quanti bottoni
rendere e con quali `href`. CSS-only.

## Markup contract

```html
<div class="sp-download-buttons__divider"></div>
<div class="sp-download-buttons">
    <a class="sp-download-buttons__btn" href="#istruzioni" target="_blank" rel="noopener">Istruzioni</a>
    <a class="sp-download-buttons__btn" href="#template" target="_blank" rel="noopener">Template</a>
</div>
```

## Classi pubbliche

| Classe | Ruolo | Required |
|---|---|---|
| `.sp-download-buttons__divider` | divider orizzontale sopra i bottoni | no |
| `.sp-download-buttons` | flex container | yes |
| `.sp-download-buttons__btn` | singolo bottone download (`<a>`) | yes |

## Installation

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/primitives/download-buttons.css" />
```

Anche via bundle `bundles/demo-minimal.css`. Nessun JS richiesto.

## Note CMS

- il CMS decide quanti `.sp-download-buttons__btn` rendere; se zero, omettere
  l'intero blocco incluso il divider.
- `href`, `target` e testo sono iniettati dal backend.
- il divider e' opzionale.

## Fuori scope

Icone nei bottoni, stato disabled, variante filled (solo outline), layout
verticale (il flex e' sempre row).
