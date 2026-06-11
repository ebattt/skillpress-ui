---
title: IvaBanner
description: Callout warning informativo per la dichiarazione IVA 4% (editori con ISBN).
layer: primitives
strategy: css-only
package_path: primitives/iva-banner.css
---

# IvaBanner

Callout warning arancione che avvisa l'utente della necessita' di compilare una
dichiarazione sostitutiva quando viene selezionata l'aliquota IVA 4% (editori
con ISBN). CSS-only: la condizione di visibilita' e' business logic del consumer.

## Markup contract

```html
<div class="sp-iva-banner">
    <div class="sp-iva-banner__content">
        <span class="sp-iva-banner__icon" aria-hidden="true"></span>
        <div class="sp-iva-banner__text">
            <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN
               e' necessario compilare e firmare la dichiarazione sostitutiva.</p>
            <button type="button">Scarica la dichiarazione</button>
        </div>
    </div>
</div>
```

## Classi pubbliche

| Classe | Note |
|---|---|
| `.sp-iva-banner` | container warning (bg/border/radius/padding) |
| `.sp-iva-banner__content` | flex inline icon + text, align-items flex-start |
| `.sp-iva-banner__icon` | icona info via CSS, color primary |
| `.sp-iva-banner__text` | testo xs, color text-strong, line-height 1.5 |

## Cosa decide il CMS / backend

Presenza/assenza del banner, testo HTML (link/bottoni download) e handler dei
bottoni interni.

## Cosa decide la libreria

Background `--color-warning-bg`, border `--color-warning-border`, radius/padding,
icona info via CSS, font-size testo xs e spacing tra paragrafi.

## Fuori scope

Modal "Scarica dichiarazione", variante callout generica (`--warning`/`--info`),
varianti error/success.
