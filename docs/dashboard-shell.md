# DashboardShell

`DashboardShell` e il layout applicativo della dashboard Skillpress: sidebar
desktop, menu mobile, contenitore viste e routing UI tra viste gia presenti nel
DOM.

## Fonte

- `Skillpress-frontend/dashboard/index.html` righe 25-90 circa
- `Skillpress-frontend/dashboard/css/components/_layout.css`
- `Skillpress-frontend/dashboard/css/components/_navigation.css`
- `Skillpress-frontend/dashboard/js/dashboard-shell.js`

## Responsabilita

La libreria decide layout responsive, stati `hidden`, `aria-current`, mapping
sotto-vista -> nav parent e behavior UI puro. Non decide dati utente, permessi,
logout reale, fetch API o auth.

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/primitives/dashboard-nav-icons.css">
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/dashboard-shell.css">
<script defer src="/node_modules/@ebattt/skillpress-ui/js/dashboard-shell.js"></script>
```

Oppure via bundle pagina:

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/bundles/dashboard.css">
<script defer src="/node_modules/@ebattt/skillpress-ui/js/dashboard-shell.js"></script>
```

## Markup minimo

```html
<div class="dashboard-shell" data-dashboard-shell data-dashboard-shell-initial-view="dashboard">
  <aside class="dashboard-shell__sidebar" aria-label="Navigazione dashboard">
    <nav class="dashboard-shell__nav" data-dashboard-shell-nav>
      <button class="dashboard-shell__nav-item dashboard-shell__nav-item--profile"
              type="button"
              data-dashboard-shell-nav-item="account"
              aria-current="false">
        <span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--account" aria-hidden="true"></span>
        <span>Profilo</span>
      </button>
      <button class="dashboard-shell__nav-item"
              type="button"
              data-dashboard-shell-nav-item="dashboard"
              aria-current="page">
        <span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--dashboard" aria-hidden="true"></span>
        <span>Dashboard</span>
      </button>
    </nav>
  </aside>
  <main class="dashboard-shell__main">
    <section class="dashboard-shell__mobile-menu" data-dashboard-shell-mobile-menu hidden></section>
    <button class="dashboard-shell__mobile-back" type="button" data-dashboard-shell-back hidden>Menu</button>
    <div class="dashboard-shell__views">
      <section class="dashboard-shell__view"
               data-dashboard-shell-view="dashboard"></section>
      <section class="dashboard-shell__view"
               data-dashboard-shell-view="order-detail"
               data-dashboard-shell-parent="orders"
               hidden></section>
    </div>
  </main>
</div>
```

## JS

```js
window.SkillpressUI.DashboardShell.init(document);
window.SkillpressUI.DashboardShell.navigate(document, 'orders');
window.SkillpressUI.DashboardShell.showMobileMenu(document);
```

Il runtime e idempotente. Le query runtime sono scoped al root
`[data-dashboard-shell]`; `document.querySelector*` viene usato solo per
scoprire root iniziali.

## Evento

Ogni navigazione emette:

```text
sp:dashboard-shell-change
detail: { view, nav }
```

## Hook

- `[data-dashboard-shell]`
- `[data-dashboard-shell-nav]`
- `[data-dashboard-shell-nav-item]`
- `[data-dashboard-shell-view]`
- `[data-dashboard-shell-mobile-menu]`
- `[data-dashboard-shell-back]`
- `[data-dashboard-shell-navigate]`
- `[data-dashboard-shell-navigate-disabled-mobile]`

`data-dashboard-shell-parent="orders|quotes"` mantiene la voce nav parent su
viste come `order-detail` e `quote-request`.

Usare `data-dashboard-shell-navigate-disabled-mobile` su trigger che devono
navigare su desktop ma delegare un altro behavior su mobile, ad esempio una
riga `OrdersTable` che su mobile espande i dettagli riga.

## Icone nav

Le icone della navigazione sono classi pubbliche library-owned, renderizzate via
CSS mask e incluse in `primitives/dashboard-nav-icons.css` e nel bundle
`bundles/dashboard.css`.

```html
<span class="sp-dashboard-nav-icon sp-dashboard-nav-icon--orders" aria-hidden="true"></span>
```

Classi disponibili:

- `.sp-dashboard-nav-icon--account`
- `.sp-dashboard-nav-icon--dashboard`
- `.sp-dashboard-nav-icon--orders`
- `.sp-dashboard-nav-icon--billing`
- `.sp-dashboard-nav-icon--quotes`
- `.sp-dashboard-nav-icon--supplier`
- `.sp-dashboard-nav-icon--logout`

Le icone sono decorative: usare sempre `aria-hidden="true"` e mantenere una
label testuale nel bottone. Il backend/app sceglie quali voci mostrare; la
libreria fornisce solo il set grafico e gli stati colore tramite `currentColor`.

## Fuori Scope

- logout reale;
- auth e profilo utente;
- business routing;
- caricamento remoto delle viste;
- API, CRUD, upload o pagamenti.
