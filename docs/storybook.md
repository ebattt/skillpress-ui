# Storybook

Storybook e lo showroom tecnico del repository libreria.

Serve al team frontend e backend per visualizzare componenti, stati, varianti e markup supportato. Non e il runtime della libreria e non viene incluso nel package npm pubblicato.

## Ruolo

Storybook controlla:

- visualizzazione dei componenti isolati
- esempi di markup ufficiale
- stati iniziali supportati
- varianti documentate
- regressioni visive manuali durante lo sviluppo

Storybook non controlla:

- modello dati CMS
- template backend
- logica business
- packaging di produzione
- import runtime del backend

## Comandi

Dev server:

```bash
npm run storybook
```

URL locale:

```text
http://localhost:6006
```

Build statica:

```bash
npm run build-storybook
```

Verifica contenuto package npm:

```bash
npm run pack:check
```

## Regola package

Il package pubblicato resta limitato dal campo `files` in `package.json`:

```json
"files": [
  "tokens/",
  "base/",
  "utilities/",
  "primitives/",
  "js/",
  "bundles/"
]
```

Quindi Storybook, stories e documentazione estesa restano nel repository ma
non entrano nel tarball npm. Output generati come `storybook-static/` e
`scripts/visual-diff-out/` sono ignorati e vanno rigenerati quando servono.

## Flusso per backend

1. Aprire Storybook per vedere componente, stati e varianti.
2. Leggere la scheda componente in `docs/`.
3. Copiare/adattare il markup ufficiale nei template backend.
4. Installare il package npm nel consumer.
5. Importare CSS/JS dal package.

Il backend consuma la libreria, non Storybook.

## Stories attuali

Accordion:

- `Collapsed`
- `Expanded`
- `MultipleSections`
- `WithoutBadge`
- `PopulatedContentSlot`

## Checklist Manuale Alpha

Prima di chiudere la alpha, verificare in Storybook gli stati critici che
coprono i principali edge case pubblici:

- `ProductHero`: titolo, gallery, info prodotto e CTA leggibili su mobile e
  tablet, senza overlap o dipendenza da Material Symbols.
- `PriceTable`: tabella nello stato responsive, scrollbar/affordance visibili,
  celle prezzo e bottoni quantita' leggibili sotto 480px.
- `CheckoutSummary > EmptyCart`: stato vuoto senza importi inconsistenti,
  messaggio visibile e layout stabile.
- `CartProductCard > MissingImage`: fallback immagine renderizzato, contenuto e
  azioni ancora accessibili.
- `MethodChoiceCard > DisabledAndLongLabels`: stato disabled chiaro, label lunghe
  senza overflow e focus non ambiguo.
- `OrdersTable > Empty`: stato tabella vuota leggibile, header e azioni senza
  collassi di layout.

## Prossima estensione

Quando viene aggiunto un nuovo componente, va aggiunta nello stesso commit anche la sua story minima:

- stato default
- stato principale alternativo
- varianti supportate
- esempio con slot popolato
