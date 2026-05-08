# FeedatyWidget

Wrapper e loader per i due widget Feedaty reali della landing: merchant strip inline nello stage e carousel recensioni nella sezione dedicata.

## Markup contract

Inline merchant:

```html
<div class="feedaty-widget feedaty-widget--inline" data-feedaty-widget>
    <div class="feedaty_widget" data-ver="2021" data-id="69d773285807d" data-type="merchant" data-variant="Striscia-2" data-lang="all" data-gui="all"></div>
</div>
```

Carousel:

```html
<section class="feedaty-widget feedaty-widget--carousel" data-feedaty-widget aria-labelledby="feedaty-reviews-title">
    <h2 class="feedaty-widget__title" id="feedaty-reviews-title">Cosa dicono i nostri clienti</h2>
    <div class="feedaty_widget" data-ver="2021" data-id="69d6498b45554" data-type="carousel" data-variant="carosello-2" data-lang="all" data-gui="all"></div>
</section>
```

## Classi pubbliche

- `.feedaty-widget`: wrapper responsive.
- `.feedaty-widget--inline`: widget merchant inline sotto lo stage.
- `.feedaty-widget--carousel`: sezione recensioni con max-width/padding landing.
- `.feedaty-widget__title`: titolo sezione carousel.
- `.feedaty-widget__placeholder`: fallback demo/documentazione quando lo SDK e' disabilitato.
- `.feedaty_widget`: classe richiesta dallo SDK Feedaty.

## Data hooks

- `[data-feedaty-widget]`: root inizializzato dal runtime.
- `data-feedaty-widget-sdk="false"`: disabilita il caricamento SDK, utile in Storybook o ambienti senza consenso.
- `data-feedaty-widget-sdk-src`: override opzionale della URL SDK.

## Modifier / stati

- `.feedaty-widget--inline`: normalizza larghezza e background trasparente del widget nello stage.
- `.feedaty-widget--carousel`: replica la sezione compatta recensioni della landing.
- `data-feedaty-widget-init="1"` viene aggiunto dal runtime dopo l'inizializzazione.

## Backend owns

- `data-id`, `data-type`, `data-variant`, lingua e attributi Feedaty.
- Titolo della sezione carousel.
- Policy consenso/privacy e scelta se caricare lo SDK.
- Fallback se Feedaty non risponde.

## Library owns

- Wrapper, sizing, overflow e responsive dei due widget landing.
- Loader SDK idempotente `window.SkillpressUI.FeedatyWidget.init(root)`.
- Evento `sp:feedaty-widget-error` in caso di errore caricamento SDK.

## Demo-only

- Gli ID Feedaty della landing demo.

## Out of scope

- Contenuto renderizzato dentro iframe Feedaty.
- Tracking, consenso cookie, retry applicativo e gestione privacy.
