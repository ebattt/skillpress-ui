---
title: DownloadButtons
description: Coppia di bottoni outline arancioni per download istruzioni e template prodotto.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_layout-patterns.css#L2028-L2062
  demo: product-page-integration/index.html#L250-L260
status: verified-local-link-dev
package_path: primitives/download-buttons.css
---

# DownloadButtons

Bottoni outline arancioni per scaricare documenti associati al prodotto (istruzioni, template, schede tecniche). Posizionati tipicamente sotto il total box della sidebar configuratore, separati da un divider orizzontale. Il CMS decide quanti bottoni rendere e con quali `href`.

## Anatomy

```text
DownloadButtons
├── sidebar-download-divider   (border-top separator)
└── config-download-btns       (flex row, gap 0.5rem)
    └── config-download-btn × N  (<a>, outline arancione)
```

## Markup contract

Markup verbatim da `product-page-integration/index.html#L250-L260`.

```html
<!-- NOTA CMS: Link download per istruzioni e template del prodotto.
     Se il prodotto non ha istruzioni/template, il CMS omette questa sezione. -->
<div class="sidebar-download-divider"></div>
<div class="config-download-btns">
    <a class="config-download-btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
        Istruzioni
    </a>
    <a class="config-download-btn" href="#template-placeholder" target="_blank" rel="noopener">
        Template
    </a>
</div>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.sidebar-download-divider` | divider orizzontale sopra i bottoni | no | — |
| `.config-download-btns` | flex container per i bottoni | yes | — |
| `.config-download-btn` | singolo bottone download (elemento `<a>`) | yes | — |

## Installation

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/primitives/download-buttons.css" />
```

Oppure via bundle (gia' include `download-buttons.css`):

```html
<link rel="stylesheet"
      href="../node_modules/@ebattt/skillpress-ui/bundles/demo-minimal.css" />
```

Nessun script JS richiesto.

## Examples

- `Default` → `primitives-downloadbuttons--default`
- `SingleButton` (variante CMS con un solo download) → `primitives-downloadbuttons--single-button`
- `ThreeButtons` (variante CMS con tre download) → `primitives-downloadbuttons--three-buttons`
- `ReferenceFromElementsUI` (markup verbatim demo) → `primitives-downloadbuttons--reference-from-elements-ui`

## Token usati

`--color-primary`, `--color-bg-gray-200`, `--radius-lg`, `--font-size-sm`, `--font-weight-semibold`, `--transition-fast`.

Valore letterale mantenuto dal catalogo:
- `rgba(240, 138, 0, 0.1)` su `.config-download-btn` background e hover.

## Note CMS

- il CMS decide quanti `<a class="config-download-btn">` rendere (0, 1, 2, 3...); se zero, omettere l'intero blocco incluso il divider.
- `href`, `target`, testo del bottone sono iniettati dal backend.
- il divider `.sidebar-download-divider` e' opzionale: se i bottoni non sono sotto la sidebar total box, puo' essere omesso.

## Out of scope

- icone dentro i bottoni (il catalogo non le usa).
- stato disabled sui bottoni download.
- variante filled (solo outline).
- hover con cambio colore (il catalogo mantiene lo stesso background su hover).
- layout verticale (il flex e' sempre row).
