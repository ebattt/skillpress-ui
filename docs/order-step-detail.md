# OrderStepDetail

Pannelli tracking prodotto per il dettaglio ordine dashboard. Deriva da `dashboard/js/order-products.js` e da `dashboard/css/components/_order-detail.css`.

## Responsabilita
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

## Markup minimo

```html
<div data-order-step-detail>
  <div class="product-stepper" data-order-status-steps><!-- OrderStatusSteps --></div>

  <div class="product-step-detail" data-order-step-detail-panel data-step-id="files">
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

## Backend/CMS decide
- prodotti, step, pannelli renderizzati e stato iniziale;
- testi, file, URL istruzioni/template/report/tracking;
- azioni e payload applicativi.

## Libreria decide
- layout, spacing, responsive e stati visuali;
- icone chrome via CSS;
- show/hide pannelli con `hidden` e `aria-hidden`;
- evento `sp:order-step-detail-change`.

## Stati
- Banner: `.step-status-banner--info|neutral|success|warning|error|locked`
- File box: `.product-file-box--empty|ready|uploaded|error|locked|selected|readonly`
- Copia zero: `.product-file-box--cz|--cz-confirmed|--cz-replaced|--cz-tochange|--cz-removed|--cz-neutral`
- File state: `.product-file-box__state--success|warning|muted`

## Fuori scope
Upload reale, verifica PDF, avanzamento ordine, tracking, validazione, persistenza e chiamate API.
