# Visual Diff Contract

Questo documento rende esplicite le classificazioni usate da
`scripts/visual-diff.cjs` quando confronta la demo originale Skillpress con il
consumer `@ebattt/skillpress-ui`.

Il report resta un gate di release: ogni viewport deve chiudere con
`openDiffs: 0`, nessun overflow orizzontale e nessun errore console/browser.

## Classificazioni Accettate

### `accepted-contract-drift`

Drift intenzionale dovuto al contratto pubblico della libreria.

Esempi ammessi:

- rimozione di dipendenze globali come Material Symbols;
- sostituzione di markup legacy con BEM pubblico;
- deprecazione di affordance legacy, come le frecce overlay della
  `PriceTable`, quando il contratto libreria espone un'alternativa stabile.

Non significa che il componente possa divergere liberamente dalla fonte demo:
la differenza deve essere dichiarata nel contratto del componente.

### `accepted-reference-scope-drift`

Drift dovuto al fatto che il consumer di riferimento non replica tutta la pagina
generata originale, ma isola il contratto pubblico con sezioni statiche e casi
rappresentativi.

Esempi ammessi:

- altezza complessiva della pagina diversa;
- esempi statici presenti nel consumer ma generati solo in certi stati nella
  demo originale;
- contenuto testuale o sezioni reference utili alla verifica ma fuori runtime.

Questa classificazione non va usata per mascherare differenze del componente
quando lo stesso stato e lo stesso markup pubblico sono confrontabili.

### `accepted-layout-tolerance`

Drift di layout piccolo e motivato, senza regressioni funzionali.

Esempi ammessi:

- delta di pochi pixel causati dalla shell Accordion/consumer;
- differenze minori dovute a SVG o icone library-owned;
- differenze che non introducono overflow, clipping, salti di layout o errori.

La tolleranza non sostituisce il fix quando il drift altera gerarchia visiva,
leggibilita', responsive o interazione.

## Regola Di Governance

Nessun nuovo `accepted-*` puo' entrare nello script senza:

- motivo concreto nel campo `reason`;
- owner della decisione nel batch o handoff;
- verifica che `openDiffs` resti `0` su tutti i viewport coperti;
- nota nei docs del componente quando il drift cambia il contratto pubblico.

Se la motivazione non e' chiara o il drift riguarda comportamento runtime,
accessibilita', overflow o stato interattivo, la classificazione corretta resta
`needs-triage` fino a fix o decisione esplicita.
