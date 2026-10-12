# Stati frontend del checkout

Caricare `dist/checkout.css` (oppure `css/checkout.css` nella distribuzione CDN).
Il CSS gestisce l'aspetto degli stati; l'applicazione esegue la validazione e
imposta gli attributi. Non è necessario inizializzare un componente JavaScript
per la selezione nativa dei radio.

## Card di scelta

Ogni radio deve precedere immediatamente la label `.method-choice-card`,
all'interno di `.method-choice__grid`. La label usa `for` uguale all'ID del radio.
I radio di una destinazione condividono il `name`; destinazioni differenti
hanno nomi differenti e tutti gli ID sono univoci.

| Stato | Attributo del radio | Risultato |
|---|---|---|
| Selezionato | `checked` | Card selezionata. |
| Non disponibile | `disabled` | Controllo escluso dall'interazione nativa. |
| Errore | `aria-invalid="true"` | Bordo e nome della card evidenziati in rosso. |
| Corretto | Rimuovere `aria-invalid` | Ripristino dello stile ordinario. |

Associare il messaggio `.sp-error-msg` tramite `aria-describedby`. Il messaggio
resta `hidden` fino alla validazione. Applicare e rimuovere l'errore soltanto
sul gruppo interessato, preservando quelli delle altre destinazioni.
La classe `sp-error` da sola non attiva lo stato delle card. La validazione
applicativa deve verificare una selezione abilitata: `checked` su un radio
`disabled` non è una scelta attiva. Il CSS non risolve questa condizione.

## Condizioni di utilizzo

Il wrapper `.checkout-terms` contiene label e messaggio e aggiunge lo spazio
superiore `var(--spacing-lg)`. Il checkbox precede il testo
`.sp-radio-option-label` dentro `.sp-radio-option`.

Impostare `aria-invalid="true"` sul checkbox e mostrare il messaggio associato
quando manca il consenso; rimuovere lo stato e nascondere il messaggio quando
la scelta è valida. Il CSS non modifica nomi dei campi, handler o dati inviati.

`required` partecipa alla validazione nativa solo se il controllo appartiene
al form sottoposto a quella validazione. Il collegamento a eventuali campi
nascosti e la validazione applicativa restano responsabilità dell'integrazione.

## Esempi nel repository frontend

In `Skillpress-frontend/consumer-libreria`:

- `docs/backend/10-checkout.md`: markup completo e applicazione degli stati.
- `static-pages/checkout/index.html`: riferimento di pagina.
- `lab/method-choice-card/index.html`: due destinazioni, pagamento e consenso.
- `lab/method-choice-card/validation-example.js`: sola simulazione locale.

Gli esempi non inviano ordini né implementano i servizi di pagamento o spedizione.
