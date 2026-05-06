---
title: DashboardDropdownBox
description: Dashboard sidebar disclosure box per pannelli Pagamento/Spedizione.
layer: components
strategy: css-js
sources:
  demo_html: dashboard/index.html#view-order-detail
  demo_css: dashboard/css/components/_cards.css
status: local-link-dev-dashboard-2026-05-05
package_path: components/dashboard-dropdown-box.css
js_path: js/dashboard-dropdown-box.js
---

# DashboardDropdownBox

`DashboardDropdownBox` copre il box collapsabile della sidebar dettaglio ordine
dashboard. La libreria gestisce shell, trigger, icone chrome e disclosure UI;
il contenuto del pannello resta slot backend/app.

## Anatomy

```text
DashboardDropdownBox
└── .dash-dropdown-box [--alert] [data-dashboard-dropdown-box]
    ├── .dash-dropdown-box__trigger
    │   ├── .dash-dropdown-box__trigger-label
    │   │   └── .dash-dropdown-box__trigger-icon [--payment | --shipping]
    │   └── .dash-dropdown-box__chevron
    └── .dash-dropdown-box__content
```

## Markup contract

```html
<div class="dash-dropdown-box" data-dashboard-dropdown-box>
    <button class="dash-dropdown-box__trigger"
            type="button"
            aria-expanded="false"
            data-dashboard-dropdown-box-trigger>
        <span class="dash-dropdown-box__trigger-label">
            <span class="dash-dropdown-box__trigger-icon dash-dropdown-box__trigger-icon--payment" aria-hidden="true"></span>
            Pagamento
        </span>
        <span class="dash-dropdown-box__chevron" aria-hidden="true"></span>
    </button>
    <div class="dash-dropdown-box__content" data-dashboard-dropdown-box-content hidden>
        <!-- slot backend/app -->
    </div>
</div>
```

## API Reference

| Class | Role |
|---|---|
| `.dash-dropdown-box` | shell box |
| `.dash-dropdown-box--alert` | stato alert con bordo rosso |
| `.dash-dropdown-box__trigger` | bottone disclosure |
| `.dash-dropdown-box__trigger-label` | label + icona |
| `.dash-dropdown-box__trigger-icon` | icona chrome |
| `.dash-dropdown-box__trigger-icon--payment` | icona pagamento |
| `.dash-dropdown-box__trigger-icon--shipping` | icona spedizione |
| `.dash-dropdown-box__chevron` | chevron disclosure |
| `.dash-dropdown-box__content` | pannello contenuto |

Hook:

| Attribute | Element | Note |
|---|---|---|
| `data-dashboard-dropdown-box` | root | init componente |
| `data-dashboard-dropdown-box-trigger` | trigger | toggle disclosure |
| `data-dashboard-dropdown-box-content` | content | pannello da mostrare/nascondere |

JS:

```js
window.SkillpressUI.DashboardDropdownBox.init();
window.SkillpressUI.DashboardDropdownBox.setExpanded(root, true);
```

Eventi:

| Evento | Note |
|---|---|
| `sp:dashboard-dropdown-box-open` | emesso su root |
| `sp:dashboard-dropdown-box-close` | emesso su root |

## Cosa decide il CMS/backend

- label trigger;
- contenuto interno;
- stato iniziale expanded/collapsed;
- modifier `dash-dropdown-box--alert`;
- dati e azioni di pagamento/spedizione.

## Cosa decide la libreria

- layout box e trigger;
- border, radius, hover/focus;
- icone CSS;
- toggle `aria-expanded`/`hidden`.

## Installation

```html
<link rel="stylesheet" href="../node_modules/@ebattt/skillpress-ui/components/dashboard-dropdown-box.css" />
<script defer src="../node_modules/@ebattt/skillpress-ui/js/dashboard-dropdown-box.js"></script>
```

## Out of scope

- pagamento o spedizione reali;
- dati ordine;
- routing dashboard;
- validazione;
- contenuto specifico del pannello.
