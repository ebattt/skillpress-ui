# OrderStepDetail

Pannelli tracking prodotto per il dettaglio ordine dashboard. Deriva da `dashboard/js/order-products.js` e da `dashboard/css/components/_order-detail.css`.

## Scope
- mostrare banner stato step, gruppi file e file box;
- fornire stati visuali per file mancanti, pronti, approvati, errore, locked e copia zero;
- sincronizzare il pannello visibile con `OrderStatusSteps`.

## Import

```html
<link rel="stylesheet" href="/node_modules/@ebattt/skillpress-ui/components/order-step-detail.css">
<script defer src="/node_modules/@ebattt/skillpress-ui/js/order-step-detail.js"></script>
```

Se il markup viene iniettato dopo il load:

```js
window.SkillpressUI.OrderStepDetail.init(root);
```

## Markup contract

```html
<div data-order-step-detail>
  <div class="product-stepper" data-order-status-steps><!-- OrderStatusSteps --></div>

  <div class="product-step-detail" data-order-step-detail-panel data-order-status-steps-step-id="files">
    <div class="step-status-banner step-status-banner--warning">
      <div class="step-status-banner__body">
        <p class="step-status-banner__title">
          1/3 file caricati
          <span class="step-status-banner__text">Mancano 2 file per procedere.</span>
        </p>
      </div>
    </div>
  </div>
</div>
```

## Classi pubbliche

- `.product-step-detail`
- `.step-status-banner`
- `.step-status-banner--info`
- `.step-status-banner--neutral`
- `.step-status-banner--success`
- `.step-status-banner--warning`
- `.step-status-banner--error`
- `.step-status-banner--locked`
- `.step-status-banner__body`
- `.step-status-banner__title`
- `.step-status-banner__text`
- `.product-file-box`
- `.product-file-box--empty`
- `.product-file-box--ready`
- `.product-file-box--uploaded`
- `.product-file-box--error`
- `.product-file-box--locked`
- `.product-file-box--payment-locked`
- `.product-file-box--selected`
- `.product-file-box--readonly`
- `.product-file-box--annotated`
- `.product-file-box--replaced`
- `.product-file-box--tochange`
- `.product-file-box--removed`
- `.product-file-box--neutral`
- `.product-file-box__state--success`
- `.product-file-box__state--warning`
- `.product-file-box__state--muted`
- `.product-file-status-badge`
- `.product-file-status-badge--replaced`
- `.product-file-status-badge--tochange`
- `.product-file-status-badge--neutral`
- `.product-file-actions`
- `.product-file-actions--stack`
- `.product-file-action-btn`
- `.product-file-action-btn--confirm`
- `.product-file-action-btn--change`
- `.product-file-action-btn--upload`

## Data hooks

| Hook | Obbligatorio | Elemento | Ruolo |
|---|---:|---|---|
| `data-order-step-detail` | si | root | init componente |
| `data-order-step-detail-panel` | si | pannello step | pannello da sincronizzare |
| `data-order-status-steps-step-id` | si | pannello step | id pannello da abbinare allo step selezionato |

## Modifier / stati

- Banner: `.step-status-banner--info|neutral|success|warning|error|locked`
- File box: `.product-file-box--empty|ready|uploaded|error|locked|payment-locked|selected|readonly`
- Copia zero:
  - file da valutare: `.product-file-box--annotated.product-file-box--neutral` con badge `.product-file-status-badge--neutral` e azioni;
  - file confermato dal cliente: `.product-file-box--locked`;
  - file definitivo approvato: `.product-file-box--locked`;
  - file da sostituire: `.product-file-box--annotated.product-file-box--tochange`;
  - sostitutivo caricato/in verifica: usare `.product-file-box--ready` e `.product-file-box__state--warning`, come per i file caricati in attesa di verifica.
- File state: `.product-file-box__state--success|warning|muted`

## Stato file consigliato

| Stato applicativo | Classi principali | Testo stato |
|---|---|---|
| file mancante caricabile | `.product-file-box--empty` | `Carica` |
| file bloccato da contabile | `.product-file-box--payment-locked` | nessuna azione |
| file caricato, in verifica | `.product-file-box--ready` | `Da verificare` |
| file approvato | `.product-file-box--uploaded` | `Approvato` |
| file non conforme | `.product-file-box--error` | `Ricarica` |
| copia zero da decidere | `.product-file-box--annotated.product-file-box--neutral` | `Conferma file` / `Sostituisci` |
| copia zero sostituita, in verifica | `.product-file-box--ready` | `Da verificare` |
| copia zero confermata | `.product-file-box--locked` | nessuna azione |

## Backend owns

- prodotti, step, pannelli renderizzati e stato iniziale;
- testi, file, URL istruzioni/template/report/tracking;
- azioni e payload applicativi.

## Library owns

- layout, spacing, responsive e stati visuali;
- icone chrome via CSS;
- show/hide pannelli con `hidden` e `aria-hidden`;
- evento `sp:order-step-detail:change`.

## Demo-only

Eventuali `data-orders-table-action`, `data-section`, toolbar scenari, renderer didattici e
fixture appartengono alla demo/app e non sono API pubbliche del componente.

## Out of scope

Upload reale, verifica PDF, avanzamento ordine, tracking, validazione, persistenza e chiamate API.
