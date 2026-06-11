---
title: Breadcrumb
description: Navigazione gerarchica statica con markup Schema.org BreadcrumbList.
layer: primitives
strategy: css-only
package_path: primitives/breadcrumb.css
---

# Breadcrumb

Navigazione gerarchica statica con separatore `/` generato via `::after`. CSS-only. La libreria controlla layout flex, wrapping, separatore, colori, hover e focus; il backend genera l'albero (testo, URL, ordine, voce corrente) e il markup Schema.org `BreadcrumbList` richiesto dal contratto.

## Anatomy

```text
Breadcrumb
└── nav.sp-breadcrumb   [aria-label="Breadcrumb"]
    └── ol.sp-breadcrumb__list   (Schema.org BreadcrumbList)
        └── li.sp-breadcrumb__item × N   [--current sull'ultima voce]
            ├── a.sp-breadcrumb__link   (omessa sulla voce corrente)
            │   └── <span itemprop="name">
            └── <meta itemprop="position" content="N">
```

## Markup contract

```html
<nav class="sp-breadcrumb" aria-label="Breadcrumb">
  <ol class="sp-breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
    <li class="sp-breadcrumb__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a class="sp-breadcrumb__link" itemprop="item" href="/homepage">
        <span itemprop="name">Homepage</span>
      </a>
      <meta itemprop="position" content="1"/>
    </li>
    <li class="sp-breadcrumb__item sp-breadcrumb__item--current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span itemprop="name">Pagina corrente</span>
      <meta itemprop="position" content="2"/>
    </li>
  </ol>
</nav>
```

## Classi pubbliche

- `.sp-breadcrumb`: wrapper `<nav>` con `aria-label="Breadcrumb"`.
- `.sp-breadcrumb__list`: `<ol>` flex wrap, root Schema.org.
- `.sp-breadcrumb__item`, `--current`: `<li>` voce; separatore `/` via `::after` (tranne l'ultima). La voce `--current` omette il `<a>`.
- `.sp-breadcrumb__link`: `<a>` delle voci non correnti.

ARIA/Schema.org richiesto: `itemscope` + `itemtype` su list e item, `itemprop="item"` sul link, `itemprop="name"` sullo span interno, `<meta itemprop="position" content="N">` (1-based).

Nessun hook `data-*`, nessuno stato runtime.

## Out of scope

- icone home/chevron al posto di `/`;
- troncamento/ellipsis automatico delle voci;
- versione compressed mobile con menu intermedio;
- generazione link/categorie/traduzioni.
