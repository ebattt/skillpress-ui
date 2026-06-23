# CDN Release

Questa libreria usa un modello semplice:

- il versionamento resta interno alla libreria;
- il CDN espone sempre lo stesso path pubblico;
- il backend non deve cambiare URL a ogni release.

## URL pubblico stabile

Il path pubblico è sempre:

```text
https://skillpress-ui.pages.dev/skillpress-ui/...
```

Esempi:

```text
https://skillpress-ui.pages.dev/skillpress-ui/css/shell.css
https://skillpress-ui.pages.dev/skillpress-ui/css/public.css
https://skillpress-ui.pages.dev/skillpress-ui/css/auth.css
https://skillpress-ui.pages.dev/skillpress-ui/js/_helpers.js
https://skillpress-ui.pages.dev/skillpress-ui/public-api.json
https://skillpress-ui.pages.dev/skillpress-ui/manifest.json
```

Non esiste una cartella `/latest`. Non si usano URL versionati come
`/skillpress-ui-0.5.1/css/public.css`. La versione corrente pubblicata è il
contenuto presente sotto `/skillpress-ui`.

## Versionamento interno

La versione vive in quattro punti:

- `package.json`, campo `version`;
- `CHANGELOG.md`;
- `public/skillpress-ui-<version>/`, artefatto generato;
- `manifest.json`, campo `version`.

Il backend non deve conoscere questa versione per caricare gli asset. Serve a
noi per capire cosa è stato pubblicato, confrontare release e fare rollback con
criterio.

Regola pratica:

- patch, esempio `0.5.1`: fix, hardening, documentazione, piccoli asset senza
  cambio di contract;
- minor, esempio `0.6.0`: nuovi bundle, nuove pagine contract, nuovi componenti
  o nuove API compatibili;
- major, esempio `1.0.0`: rimozioni o cambi non compatibili del contract.

## Cosa genera `npm run build:cdn`

Il comando:

```bash
npm run build:cdn
```

legge la versione da `package.json` e genera:

```text
public/skillpress-ui-<version>/
public/skillpress-ui-<version>.zip
public/cdn-deploy/skillpress-ui/
```

Esempio con versione `0.5.1`:

```text
public/skillpress-ui-0.5.1/       artefatto versionato interno
public/skillpress-ui-0.5.1.zip    archivio della release
public/cdn-deploy/skillpress-ui/  cartella stabile da deployare
```

`public/cdn-deploy/skillpress-ui/` è una copia dell'artefatto versionato. Serve
per pubblicare sempre sullo stesso path CDN, senza esporre la versione nell'URL.

## Cosa si deploya

La directory da deployare su Cloudflare Pages è:

```text
public/cdn-deploy
```

Non va deployata direttamente `public/skillpress-ui-<version>/`, perché così il
path CDN diventerebbe versionato.

La cartella `public/cdn-deploy` contiene anche `_headers`, che applica:

```text
Cache-Control: no-cache
Access-Control-Allow-Origin: *
```

`Cache-Control: no-cache` è importante perché gli URL restano sempre uguali:
il browser può tenere una copia, ma deve riconvalidarla con il CDN.

## Flusso release consigliato

1. Aggiorna `package.json`.

   Esempio:

   ```json
   {
     "version": "0.5.1"
   }
   ```

2. Aggiorna `CHANGELOG.md`.

   Ogni release deve indicare:

   ```text
   **Versione: 0.5.1**
   **Contract HTML cambiato: sì/no**
   ```

3. Esegui i check e genera gli asset.

   ```bash
   npm run check
   npm run build:cdn
   ```

4. Deploya `public/cdn-deploy` su Cloudflare Pages.

   Se il progetto è gestito da dashboard Cloudflare, carica quella directory.
   Se è gestito via Wrangler, il comando ha questa forma:

   ```bash
   npx wrangler pages deploy public/cdn-deploy --project-name <nome-progetto>
   ```

5. Verifica il CDN live.

   ```bash
   npm run verify:cdn
   ```

   In alternativa, controlla almeno questi URL:

   ```text
   https://skillpress-ui.pages.dev/skillpress-ui/manifest.json
   https://skillpress-ui.pages.dev/skillpress-ui/css/shell.css
   https://skillpress-ui.pages.dev/skillpress-ui/css/public.css
   https://skillpress-ui.pages.dev/skillpress-ui/css/auth.css
   ```

## Rollback

Con Git puoi tornare al sorgente di una release precedente, ma il CDN non cambia
da solo. Dopo il rollback del codice devi rigenerare e redeployare:

```bash
git checkout <commit-precedente>
npm run check
npm run build:cdn
```

Poi deploya di nuovo:

```text
public/cdn-deploy
```

Se Cloudflare Pages conserva lo storico dei deploy, puoi anche fare rollback
dalla dashboard Cloudflare senza ricostruire localmente.

## Cose da non fare

- Non creare una cartella `/latest`: il path stabile è già `/skillpress-ui`.
- Non far usare al backend URL con la versione nel path.
- Non pubblicare `public/skillpress-ui-<version>/` come root del CDN.
- Non lasciare nel consumer dipendenze locali tipo `file:/tmp/...` per una
  consegna stabile.
- Non aggiungere hash SRI nei tag HTML se gli asset vengono mirrorati dal
  backend; gli hash del `manifest.json` servono per verifica operativa.
