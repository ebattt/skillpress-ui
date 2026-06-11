---
title: DashboardShell
description: Layout applicativo della dashboard (sidebar desktop, menu mobile, contenitore viste) con routing UI tra viste gia presenti nel DOM.
layer: components
strategy: css-js
package_path: components/dashboard-shell.css
js_path: js/dashboard-shell.js
---

# DashboardShell

Layout della dashboard Skillpress: sidebar desktop, menu mobile, contenitore
viste e routing UI tra viste gia presenti nel DOM. La libreria decide layout
responsive, stati `hidden`, `aria-current`, mapping sotto-vista -> nav parent e
behavior UI. Non decide dati utente, permessi, logout reale, fetch API o auth.

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/primitives/dashboard-nav-icons.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/dashboard-shell.css">
<script defer src="/node_modules/@ebattt/skillpress-ui/js/dashboard-shell.js"></script>
```

Oppure via bundle pagina `bundles/dashboard.css` (include nav-icons + shell).

## Markup minimo

```html
<div class="dashboard-shell" data-dashboard-shell data-dashboard-shell-initial-view="dashboard">
  <aside class="dashboard-shell__sidebar" aria-label="Navigazione dashboard">
    <nav class="dashboard-shell__nav" data-dashboard-shell-nav>
      <button class="dashboard-shell__nav-item dashboard-shell__nav-item--profile" type="button"
              data-dashboard-shell-nav-item="account" aria-current="false">
        <span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--account" aria-hidden="true"></span>
        <span>Profilo</span>
      </button>
      <button class="dashboard-shell__nav-item" type="button"
              data-dashboard-shell-nav-item="dashboard" aria-current="page">
        <span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--dashboard" aria-hidden="true"></span>
        <span>Dashboard</span>
      </button>
    </nav>
  </aside>
  <main class="dashboard-shell__main">
    <section class="dashboard-shell__mobile-menu" data-dashboard-shell-mobile-menu hidden></section>
    <button class="dashboard-shell__mobile-back" type="button" data-dashboard-shell-back hidden>Menu</button>
    <div class="dashboard-shell__views">
      <section class="dashboard-shell__view" data-dashboard-shell-view="dashboard"></section>
      <section class="dashboard-shell__view" data-dashboard-shell-view="order-detail"
               data-dashboard-shell-parent="orders" hidden></section>
    </div>
  </main>
</div>
```

## API JS

```js
window.SkillpressUI.DashboardShell.init(document);
window.SkillpressUI.DashboardShell.navigate(document, 'orders');
window.SkillpressUI.DashboardShell.showMobileMenu(document);
```

Idempotente. Le query runtime sono scoped al root `[data-dashboard-shell]`.

## Evento

```text
sp:dashboard-shell:change   detail: { view, nav }
```

## Data hooks

- `[data-dashboard-shell]`, `[data-dashboard-shell-initial-view]`
- `[data-dashboard-shell-nav]`, `[data-dashboard-shell-nav-item]`
- `[data-dashboard-shell-view]`, `[data-dashboard-shell-parent]`
- `[data-dashboard-shell-mobile-menu]`, `[data-dashboard-shell-back]`
- `[data-dashboard-shell-navigate]`, `[data-dashboard-shell-navigate-disabled-mobile]`

`data-dashboard-shell-parent="orders|quotes"` mantiene la voce nav parent attiva
su viste figlie come `order-detail` o `quote-request`.
`data-dashboard-shell-navigate-disabled-mobile` su trigger che navigano su
desktop ma delegano altro behavior su mobile.

## Custom properties

- `--dashboard-shell-max-width` (fallback `1600px`)
- `--dashboard-shell-content-padding` (fallback `1.5rem`)
- `--dashboard-shell-sidebar-width` (fallback `190px`)

## Icone nav

Classi library-owned renderizzate via CSS mask (`currentColor`), in
`primitives/dashboard-nav-icons.css` e nel bundle `bundles/dashboard.css`.
Decorative: usare sempre `aria-hidden="true"` e mantenere una label testuale.

```html
<span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--orders" aria-hidden="true"></span>
```

Disponibili: `--account`, `--dashboard`, `--orders`, `--billing`, `--quotes`,
`--supplier`, `--logout`.

## Fuori scope

Logout reale, auth/profilo utente, business routing, caricamento remoto delle
viste, API, CRUD, upload e pagamenti.
