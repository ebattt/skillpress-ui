# Storybook

Showroom tecnico del repository libreria: visualizza componenti, stati, varianti
e markup supportato. Non e' il runtime della libreria e non viene incluso nel
package npm pubblicato.

## Comandi

```bash
npm run storybook          # dev server su http://localhost:6006
npm run build-storybook    # build statica
npm run pack:check         # verifica contenuto package npm (npm pack --dry-run)
```

## Dove stanno le story

Le story sono in `stories/` (file `*.stories.js`, una per componente; alcune
pagine in sottocartelle come `stories/blog-page/`). La scheda di reference per
ogni componente e' in `docs/`.

## Regola package

Il package pubblicato e' limitato dal campo `files` in `package.json`: Storybook,
stories e documentazione restano nel repository ma non entrano nel tarball npm.
Output generati come `storybook-static/` sono ignorati e vanno rigenerati quando
servono.

## Flusso per il backend

1. Aprire Storybook per vedere componente, stati e varianti.
2. Leggere la scheda componente in `docs/`.
3. Copiare/adattare il markup ufficiale nei template backend.
4. Installare il package npm nel consumer e importare CSS/JS.

Il backend consuma la libreria, non Storybook.

## Nuovi componenti

Aggiungere nello stesso commit anche la story minima: stato default, stato
principale alternativo, varianti supportate, esempio con slot popolato.
