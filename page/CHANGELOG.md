# page-shell — CHANGELOG

## 0.5.0

### File creati
- `page/page-shell.css` — fonte unica dello scheletro di layout di pagina
  (namespace `sp-page__*`), ripiegata nei bundle.
- `page/CHANGELOG.md`, `page/STATUS.md` — documentazione del batch.

Consumer (affiancati agli originali, NON sostituiti):
- `Skillpress-frontend/consumer-libreria/demo-pages/dashboard/styles/consumer-shell.slim.css`
- `Skillpress-frontend/consumer-libreria/demo-pages/checkout/styles/consumer-shell.slim.css`
- `Skillpress-frontend/consumer-libreria/demo-pages/landing-page/styles/consumer-shell.slim.css`
- `Skillpress-frontend/consumer-libreria/demo-pages/blog-page/styles/consumer-shell.slim.css`
- `Skillpress-frontend/consumer-libreria/demo-pages/product-page-integration/styles/consumer-shell.slim.css`

### Bundle modificati (aggiunto `@import '../page/page-shell.css';` in testa)
- `bundles/dashboard.css`
- `bundles/checkout.css`
- `bundles/landing.css`
- `bundles/blog.css`
- `bundles/product-page.css`
- `bundles/auth.css`

Ogni `dist/<area>.css` rigenerato e' ora self-contained: un solo `<link>` per
pagina, layout incluso.

### Classi aggiunte al contratto pubblico (`sp-page__*`)
- `.sp-page__header`
- `.sp-page__main`
- `.sp-page__footer`
- `.sp-page__container`
- `.sp-page__container--wide` (Livello 1)
- `.sp-page__container--narrow` (Livello 1)
- `.sp-page__container--flush` (Livello 1)
- `.sp-page--checkout` (Livello 1)

Il block `.sp-page` e `.sp-page--flush` esistevano gia' (primitives/page.css);
le proprieta' di pagina sul `<body>` usano il selettore piu' specifico
`body.sp-page` per non collidere con `.sp-page` su `<main>`.

### Tooling
- `package.json`: bump `0.4.1 -> 0.5.0`; aggiunto `page/` ai `files`.
- `scripts/build-public-api.cjs`: scansiona anche `page/` (classi `@public`
  trattate come primitives).
- `scripts/check-contract.cjs`: riconosce `page/` come sorgente valido per le
  classi primitive del contratto.

### Build
- `npm run build:dist` — OK (7 bundle rigenerati).
- `npm run build:public-api` — OK (`public-api.json` versione 0.5.0, 169 primitives).
- `npm run check:contract` — OK (nessun leakage, nessuna voce fantasma).
