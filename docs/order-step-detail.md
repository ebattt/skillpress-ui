---
title: OrderStepDetail
description: Pannelli tracking prodotto per il dettaglio ordine dashboard.
layer: components
strategy: css-js
status: public-contract
package_path: components/order-step-detail.css
js_path: js/order-step-detail.js
---

# OrderStepDetail

Pannelli tracking prodotto del dettaglio ordine dashboard: banner stato step,
gruppi file e file box. La libreria sincronizza il pannello visibile con
`OrderStatusSteps`; upload reale, verifica e avanzamento sono backend/app.

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

Se il markup viene iniettato dopo il load: `window.SkillpressUI.OrderStepDetail.init(root)`.

## Classi pubbliche

- `.product-step-detail`
- `.step-status-banner` + `--info|neutral|success|warning|error|locked`
- `.step-status-banner__body`, `.step-status-banner__title`, `.step-status-banner__text`
- `.product-file-box` + `--empty|ready|uploaded|error|locked|payment-locked|selected|readonly|annotated|tochange|removed|neutral`
- `.product-file-box__state--success|warning|muted`
- `.product-file-status-badge` + `--tochange|neutral`
- `.product-file-actions` + `--stack`
- `.product-file-action-btn` + `--confirm|change|upload`

## Data hooks

| Hook | Obbligatorio | Elemento | Ruolo |
|---|---:|---|---|
| `data-order-step-detail` | si | root | init componente |
| `data-order-step-detail-panel` | si | pannello step | pannello da sincronizzare |
| `data-order-status-steps-step-id` | si | pannello step | id pannello da abbinare allo step selezionato |

Evento: `sp:order-step-detail:change`.

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

## Ownership

- Backend/app: prodotti, step, pannelli e stato iniziale; testi, file, URL;
  azioni e payload applicativi.
- Libreria: layout, spacing, responsive, stati visuali, icone CSS, show/hide
  pannelli con `hidden`/`aria-hidden`, evento `sp:order-step-detail:change`.
