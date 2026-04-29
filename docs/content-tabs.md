---
title: ContentTabs
description: Tab accessibili per contenuti WYSIWYG CMS.
layer: components
strategy: css-js
sources:
  demo: product-page-integration/readme.md info tecniche CMS
status: local
package_path: components/content-tabs.css
---

# ContentTabs

`ContentTabs` visualizza schede editoriali CMS come Descrizione e Info
tecniche. Il CMS fornisce HTML gia' sanificato; la libreria gestisce solo
layout e switch tab.

## Markup ufficiale

```html
<div class="content-tabs" data-content-tabs>
    <div class="content-tabs__list" role="tablist" aria-label="Informazioni prodotto">
        <button class="content-tabs__trigger content-tabs__trigger--active"
                type="button" role="tab" data-content-tabs-trigger
                aria-controls="tab-desc" aria-selected="true">
            Descrizione
        </button>
        <button class="content-tabs__trigger"
                type="button" role="tab" data-content-tabs-trigger
                aria-controls="tab-tech" aria-selected="false" tabindex="-1">
            Info tecniche
        </button>
    </div>
    <div id="tab-desc" class="content-tabs__panel" role="tabpanel" data-content-tabs-panel>
        <p>HTML WYSIWYG CMS.</p>
    </div>
    <div id="tab-tech" class="content-tabs__panel" role="tabpanel" data-content-tabs-panel hidden>
        <ul><li>HTML WYSIWYG CMS.</li></ul>
    </div>
</div>
```

## Classi pubbliche

| Classe | Ruolo |
|---|---|
| `.content-tabs` | root |
| `.content-tabs__list` | tablist |
| `.content-tabs__trigger` | tab button |
| `.content-tabs__trigger--active` | tab attivo |
| `.content-tabs__panel` | pannello |

## Hook JS

| Hook | Ruolo |
|---|---|
| `[data-content-tabs]` | root init |
| `[data-content-tabs-trigger]` | tab |
| `[data-content-tabs-panel]` | panel |

Evento: `sp:content-tabs:change`.

## Integrazione CMS

Il CMS decide titoli tab, ordine, HTML sanificato e se omettere il componente
quando non ci sono contenuti. La libreria non interpreta il contenuto.
