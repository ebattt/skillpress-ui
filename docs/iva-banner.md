---
title: IvaBanner
description: Callout warning informativo per la dichiarazione IVA 4% (editori con ISBN). Pattern usato nello Step 6 del configuratore quando l'utente seleziona aliquota agevolata.
layer: primitives
strategy: css-only
sources:
  catalog_css: elements-ui/css/components/_form-inputs.css (L679-702)
  demo: product-page-integration/js/sections/section-6.js (L274-285)
status: post-bem-2026-04-29
package_path: primitives/iva-banner.css
---

# IvaBanner

Callout informativo arancione/warning che appare in Step 6 del configuratore
quando viene selezionata l'aliquota IVA 4% (editori con ISBN). Avvisa
l'utente che e' richiesta la compilazione di una dichiarazione sostitutiva.

Strategia A (CSS-only). La condizione di visibilita' (mostrare/nascondere il
banner) e' business logic del consumer.

> Aggiornato 2026-04-29 post BEM standardization (prompt 19 Phase B). Sub-element rinominati con doppio underscore (`iva-banner-content` -> `iva-banner__content`, ecc.). Nessun hook `data-*` (componente CSS-only).

## Classi pubbliche

| Classe | Note |
|---|---|
| `.iva-banner` | container warning bg/border/radius/padding |
| `.iva-banner__content` | flex inline icon + text, align-items flex-start |
| `.iva-banner__icon` | icona info disegnata via CSS, color primary |
| `.iva-banner__text` | testo xs, color text-strong, line-height 1.5 |

## Markup contract

```html
<div class="iva-banner">
    <div class="iva-banner__content">
        <span class="iva-banner__icon" aria-hidden="true"></span>
        <div class="iva-banner__text">
            <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN
               e necessario compilare e firmare la dichiarazione sostitutiva.</p>
            <button type="button" style="...">Scarica la dichiarazione</button>
        </div>
    </div>
</div>
```

## Cosa decide il CMS / backend

- presenza/assenza del banner (rendering condizionale Step 6);
- testo HTML (puo' contenere link, bottoni download dichiarazione);
- handler dei bottoni interni.

## Cosa decide la libreria

- `--color-warning-bg` (#FFF7ED) come background;
- `--color-warning-border` (#FED7AA) come border;
- radius `--radius-lg`, padding 0.75rem;
- icona info dentro `.iva-banner__icon` via CSS, color `--color-primary`;
- font-size testo xs (`var(--font-size-xs)` = 12px), line-height 1.5;
- spacing tra paragrafi consecutivi (`> * + *` margin-top xs).

## Composizione

Renderizzato sotto la riga `.qty-iva-row qty-iva-row--double` quando
`state.selections.ivaMode === '4'`. Il contesto applicativo e' Step 6
del configuratore.

## Mappatura nomi (demo product-page -> libreria)

| Demo / catalog (old) | Libreria (current) |
|----------------------|--------------------|
| `.iva-banner-content` | `.iva-banner__content` |
| `.iva-banner-icon` | `.iva-banner__icon` |
| `.iva-banner-text` | `.iva-banner__text` |

`.iva-banner` (block, italiano-derived) e' invariato.

## Fuori scope

- modal "Scarica dichiarazione" (overlay separato): pattern modal dedicato
  futuro, non incluso nel banner.
- variante callout informativo generica (`.callout--warning`/`--info`): se
  emergeranno altri banner simili, valutare promozione a primitiva generica.
- variante banner di errore / successo: niente coverage finche' non emerge
  un consumer reale.
