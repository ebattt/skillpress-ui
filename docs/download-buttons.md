---
title: DownloadButtons
description: Coppia di bottoni outline arancioni per download istruzioni e template prodotto.
layer: primitives
strategy: css-only
package_path: primitives/download-buttons.css
---

# DownloadButtons

Bottoni outline arancioni per scaricare documenti associati al prodotto (istruzioni, template, schede tecniche). Posizionati tipicamente sotto il total box della sidebar configuratore, separati da un divider orizzontale. Il CMS decide quanti bottoni rendere e con quali `href`.

## Anatomy

```text
DownloadButtons
├── download-buttons__divider   (border-top separator)
└── download-buttons            (flex row, gap 0.5rem)
    └── download-buttons__btn × N  (<a>, outline arancione)
```

## Markup contract

Markup contract corrente.html#L250-L260`.

```html
<!-- NOTA CMS: Link download per istruzioni e template del prodotto.
     Se il prodotto non ha istruzioni/template, il CMS omette questa sezione. -->
<div class="sp-download-buttons__divider"></div>
<div class="sp-download-buttons">
    <a class="sp-download-buttons__btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
        Istruzioni
    </a>
    <a class="sp-download-buttons__btn" href="#template-placeholder" target="_blank" rel="noopener">
        Template
    </a>
</div>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.sp-download-buttons__divider` | divider orizzontale sopra i bottoni | no | — |
| `.sp-download-buttons` | flex container per i bottoni | yes | — |
| `.sp-download-buttons__btn` | singolo bottone download (elemento `<a>`) | yes | — |

## Mappatura nomi (demo product-page -> libreria)

La demo originale (`product-page-integration`) usava nomi di classe diversi. Il backend deve usare i nomi LIBRERIA, non quelli demo.

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.config-download-btns` | `.sp-download-buttons` |
| `.config-download-btn` | `.sp-download-buttons__btn` |
| `.sidebar-download-divider` | `.sp-download-buttons__divider` |

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
- `ContractReference` (contract reference) → `primitives-downloadbuttons--contract-reference`

## Token usati

`--color-primary`, `--color-bg-gray-200`, `--radius-lg`, `--font-size-sm`, `--font-weight-semibold`, `--transition-fast`.

Valore letterale mantenuto dal catalogo:
- `rgba(240, 138, 0, 0.1)` su `.sp-download-buttons__btn` background e hover.

## Note CMS

- il CMS decide quanti `<a class="sp-download-buttons__btn">` rendere (0, 1, 2, 3...); se zero, omettere l'intero blocco incluso il divider.
- `href`, `target`, testo del bottone sono iniettati dal backend.
- il divider `.sp-download-buttons__divider` e' opzionale: se i bottoni non sono sotto la sidebar total box, puo' essere omesso.

## Out of scope

- icone dentro i bottoni (il catalogo non le usa).
- stato disabled sui bottoni download.
- variante filled (solo outline).
- hover con cambio colore (il catalogo mantiene lo stesso background su hover).
- layout verticale (il flex e' sempre row).
