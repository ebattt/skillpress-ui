---
title: LandingInfoTabs
description: Tab navigation per dividere il blocco testo landing in pannelli CMS.
layer: components
strategy: css-js
package_path: components/landing-info-tabs.css
---

# LandingInfoTabs

Componente tab per sezioni testuali della landing. Nasce come composizione con
`TextBlock`: la root usa sia `.text-block` sia `.landing-info-tabs`, cosi' il
contenuto mantiene font, sizing e spaziatura del blocco testo esistente.

## Anatomy

```text
LandingInfoTabs
+-- landing-info-tabs text-block                 (root + typography wrapper)
    +-- landing-info-tabs__nav-wrap              (scroll orizzontale mobile)
    |   +-- landing-info-tabs__nav               (role=tablist)
    |       +-- landing-info-tabs__tab            (role=tab, one per panel)
    +-- landing-info-tabs__content
        +-- landing-info-tabs__panel             (role=tabpanel)
            +-- text-block__title / copy / list
```

## Markup contract

```html
<section class="text-block landing-info-tabs"
         id="chi-siamo"
         aria-labelledby="landing-text-title"
         data-landing-info-tabs>
    <div class="landing-info-tabs__nav-wrap">
        <div class="landing-info-tabs__nav" role="tablist" aria-label="Informazioni Skillpress">
            <button class="landing-info-tabs__tab landing-info-tabs__tab--active"
                    type="button"
                    id="landing-tab-presentazione"
                    role="tab"
                    aria-selected="true"
                    aria-controls="landing-panel-presentazione"
                    data-landing-info-tabs-tab>
                Presentazione
            </button>
            <button class="landing-info-tabs__tab"
                    type="button"
                    id="landing-tab-vision"
                    role="tab"
                    aria-selected="false"
                    aria-controls="landing-panel-vision"
                    tabindex="-1"
                    data-landing-info-tabs-tab>
                Vision
            </button>
        </div>
    </div>

    <div class="landing-info-tabs__content">
        <article class="landing-info-tabs__panel landing-info-tabs__panel--active"
                 id="landing-panel-presentazione"
                 role="tabpanel"
                 aria-labelledby="landing-tab-presentazione"
                 data-landing-info-tabs-panel>
            <h2 class="text-block__title" id="landing-text-title">Tipografia online Skillpress</h2>
            <p>Testo introduttivo.</p>
        </article>

        <article class="landing-info-tabs__panel"
                 id="landing-panel-vision"
                 role="tabpanel"
                 aria-labelledby="landing-tab-vision"
                 hidden
                 data-landing-info-tabs-panel>
            <h2 class="text-block__title">Vision</h2>
            <p>Testo vision.</p>
        </article>
    </div>
</section>
```

## API Reference

| Class | Role | Required | Modifiers |
|---|---|---|---|
| `.landing-info-tabs` | root componente, spacing tab sopra al testo | yes | - |
| `.landing-info-tabs__nav-wrap` | contenitore con scroll orizzontale mobile e bordo basso | yes | - |
| `.landing-info-tabs__nav` | riga tab, `role="tablist"` | yes | - |
| `.landing-info-tabs__tab` | button tab uppercase | yes | `.landing-info-tabs__tab--active` |
| `.landing-info-tabs__content` | wrapper pannelli | yes | - |
| `.landing-info-tabs__panel` | pannello contenuto, `role="tabpanel"` | yes | `.landing-info-tabs__panel--active` |
| `.text-block` | composizione consigliata per mantenere la tipografia landing | yes per landing | - |

Attributi:

| Attribute | Element | Required | Note |
|---|---|---|---|
| `data-landing-info-tabs` | root | yes | Root inizializzata dal runtime. |
| `data-landing-info-tabs-init` | root | no | Aggiunto dal runtime dopo init. |
| `data-landing-info-tabs-tab` | tab button | yes | Hook JS per click e keyboard navigation. |
| `data-landing-info-tabs-panel` | panel | yes | Hook JS per show/hide. |
| `role="tablist"` | `.landing-info-tabs__nav` | yes | Accessibilita'. |
| `role="tab"` | `.landing-info-tabs__tab` | yes | Accessibilita'. |
| `aria-selected` | `.landing-info-tabs__tab` | yes | Stato attivo. |
| `aria-controls` | `.landing-info-tabs__tab` | yes | Deve puntare all'id del panel. |
| `role="tabpanel"` | `.landing-info-tabs__panel` | yes | Accessibilita'. |
| `aria-labelledby` | `.landing-info-tabs__panel` | yes | Deve puntare all'id del tab. |
| `hidden` | `.landing-info-tabs__panel` | yes per pannelli inattivi | Il runtime lo aggiorna. |

## Behavior

Il modulo `js/landing-info-tabs.js` espone:

```js
window.SkillpressUI.LandingInfoTabs.init(scope);
```

Supporta:

- click su tab.
- `ArrowRight` / `ArrowLeft` per tab successivo/precedente.
- `Home` / `End` per primo/ultimo tab.
- init idempotente dopo render parziali CMS.

## Installation

CSS:

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/text-block.css">
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/landing-info-tabs.css">
```

Oppure via bundle landing:

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/bundles/landing.css">
```

JS:

```html
<script defer src="../node_modules/@ebattt/skillpress-ui/js/landing-info-tabs.js"></script>
```

## Examples

- `Default` -> `landing-page-text-landinginfotabs--default`
- `KeyboardNavigation` -> `landing-page-text-landinginfotabs--keyboard-navigation`

## Note CMS

- Il CMS puo' generare qualunque numero di tab/panel, purche' `aria-controls`
  e `aria-labelledby` siano coerenti.
- Il primo pannello puo' contenere il titolo SEO landing principale, ad esempio
  "Tipografia online Skillpress: stampa digitale e stampe online".
- Il componente non cambia font e sizing del testo: il contenuto resta governato
  da `.text-block`.

## Out of scope

- Caricamento asincrono del contenuto dei pannelli.
- Deep-link URL/hash verso un tab specifico.
- Animazioni di transizione pannello.
