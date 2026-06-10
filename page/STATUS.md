DONE - 100%

## Layout Agent — riepilogo

- **File layout**: `page/page-shell.css` (fonte unica, namespace `sp-page__*`).

- **Classi scheletro**:
  - block: `.sp-page` (body via selettore specifico `body.sp-page`)
  - element: `.sp-page__header`, `.sp-page__main`, `.sp-page__footer`,
    `.sp-page__container`
  - modifier Livello 1: `.sp-page--checkout`, `.sp-page__container--wide`,
    `.sp-page__container--narrow`, `.sp-page__container--flush`

- **Scheletro HTML**:
  ```html
  <body class="sp-page">
    <header class="sp-page__header"> ...navbar shell... </header>
    <main class="sp-page__main">
      <div class="sp-page__container"> ...componenti... </div>
    </main>
    <footer class="sp-page__footer"> ...footer shell... </footer>
  </body>
  ```

- **Breakpoint** (canonici, allineati alle demo):
  - `max-width: 1023px` (desktop -> tablet, come demo checkout)
  - `max-width: 639px`  (tablet -> mobile, come demo blog)
  - `min-width: 1024px` (override checkout)

- **Bundle in cui il layout e' ripiegato** (`@import '../page/page-shell.css';`
  in testa, dist self-contained):
  `dashboard`, `checkout`, `landing`, `blog`, `product-page`, `auth`.

- **consumer-shell.slim.css** (affiancati, NON sostituiscono gli originali):
  - `Skillpress-frontend/consumer-libreria/demo-pages/dashboard/styles/consumer-shell.slim.css`
  - `Skillpress-frontend/consumer-libreria/demo-pages/checkout/styles/consumer-shell.slim.css`
  - `Skillpress-frontend/consumer-libreria/demo-pages/landing-page/styles/consumer-shell.slim.css`
  - `Skillpress-frontend/consumer-libreria/demo-pages/blog-page/styles/consumer-shell.slim.css`
  - `Skillpress-frontend/consumer-libreria/demo-pages/product-page-integration/styles/consumer-shell.slim.css`

- **Contract**: `dist/public-api.json` versione `0.5.0` elenca le `sp-page__*`.
- **Build**: `build:dist` OK, `build:public-api` OK.
- **Branch**: `feature/shell-navbar-footer-0.5` (invariato). Nessun JS toccato.
  Nessun font/CDN/dipendenza esterna.
