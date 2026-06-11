---
title: FeedatyWidget
description: Wrapper e loader SDK per i widget Feedaty della landing (merchant strip inline e carousel recensioni).
layer: components
strategy: css-js
package_path: components/feedaty-widget.css
js_path: js/feedaty-widget.js
---

# FeedatyWidget

Wrapper e loader per i due widget Feedaty della landing: merchant strip inline
nello stage e carousel recensioni. La libreria fornisce wrapper/sizing
responsive e il loader SDK idempotente; il backend decide attributi Feedaty,
titolo sezione, policy consenso/privacy e fallback.

## Markup contract

Inline merchant:

```html
<div class="feedaty-widget feedaty-widget--inline" data-feedaty-widget>
    <div class="feedaty_widget" data-ver="2021" data-id="..." data-type="merchant"
         data-variant="Striscia-2" data-lang="all" data-gui="all"></div>
</div>
```

Carousel:

```html
<section class="feedaty-widget feedaty-widget--carousel" data-feedaty-widget
         aria-labelledby="feedaty-reviews-title">
    <h2 class="feedaty-widget__title" id="feedaty-reviews-title">Cosa dicono i nostri clienti</h2>
    <div class="feedaty_widget" data-ver="2021" data-id="..." data-type="carousel"
         data-variant="carosello-2" data-lang="all" data-gui="all"></div>
</section>
```

## Classi pubbliche

- `.feedaty-widget`: wrapper responsive.
- `.feedaty-widget--inline`: widget merchant inline nello stage.
- `.feedaty-widget--carousel`: sezione recensioni.
- `.feedaty-widget__title`: titolo sezione carousel.
- `.feedaty-widget__placeholder`: fallback quando lo SDK e' disabilitato.
- `.feedaty_widget`: classe richiesta dallo SDK Feedaty.

## Data hooks

- `[data-feedaty-widget]`: root inizializzato dal runtime.
- `data-feedaty-widget-sdk="false"`: disabilita il caricamento SDK.
- `data-feedaty-widget-sdk-src`: override opzionale della URL SDK.
- `data-feedaty-widget-init`: aggiunto dal runtime dopo init.

## API JS / Eventi

```js
window.SkillpressUI.FeedatyWidget.init(scope);
```

Loader SDK idempotente. Emette `sp:feedaty-widget:error` in caso di errore di
caricamento.

## Fuori scope

Contenuto renderizzato dentro l'iframe Feedaty, tracking, consenso cookie, retry
applicativo e gestione privacy.
