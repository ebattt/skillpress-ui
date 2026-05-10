---
title: DashboardDropdownBox
description: Dashboard sidebar disclosure box per pannelli Pagamento/Spedizione.
layer: components
strategy: css-js
sources:
  demo_html: dashboard/index.html#view-order-detail
  demo_css: dashboard/css/components/_cards.css
status: beta-contract
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
└── .dashboard-dropdown-box [--alert] [data-dashboard-dropdown-box]
    ├── .dashboard-dropdown-box__trigger
    │   ├── .dashboard-dropdown-box__trigger-label
    │   │   └── .dashboard-dropdown-box__trigger-icon [--payment | --shipping]
    │   └── .dashboard-dropdown-box__chevron
    └── .dashboard-dropdown-box__content
```

## Markup contract

```html
<div class="dashboard-dropdown-box" data-dashboard-dropdown-box>
    <button class="dashboard-dropdown-box__trigger"
            type="button"
            aria-expanded="false"
            data-dashboard-dropdown-box-trigger>
        <span class="dashboard-dropdown-box__trigger-label">
            <span class="dashboard-dropdown-box__trigger-icon dashboard-dropdown-box__trigger-icon--payment" aria-hidden="true"></span>
            Pagamento
        </span>
        <span class="dashboard-dropdown-box__chevron" aria-hidden="true"></span>
    </button>
    <div class="dashboard-dropdown-box__content" data-dashboard-dropdown-box-content hidden>
        <!-- slot backend/app -->
    </div>
</div>
```

## Classi pubbliche

| Class | Role |
|---|---|
| `.dashboard-dropdown-box` | shell box |
| `.dashboard-dropdown-box--alert` | stato alert con bordo rosso |
| `.dashboard-dropdown-box__trigger` | bottone disclosure |
| `.dashboard-dropdown-box__trigger-label` | label + icona |
| `.dashboard-dropdown-box__trigger-icon` | icona chrome |
| `.dashboard-dropdown-box__trigger-icon--payment` | icona pagamento |
| `.dashboard-dropdown-box__trigger-icon--shipping` | icona spedizione |
| `.dashboard-dropdown-box__chevron` | chevron disclosure |
| `.dashboard-dropdown-box__content` | pannello contenuto |

## Data hooks

| Hook | Obbligatorio | Elemento | Ruolo |
|---|---:|---|---|
| `data-dashboard-dropdown-box` | si | root | init componente |
| `data-dashboard-dropdown-box-trigger` | si | trigger | toggle disclosure |
| `data-dashboard-dropdown-box-content` | si | content | pannello da mostrare/nascondere |

JS:

```js
window.SkillpressUI.DashboardDropdownBox.init();
window.SkillpressUI.DashboardDropdownBox.setExpanded(root, true);
```

## Modifier / stati

Modifier pubblici: `.dashboard-dropdown-box--alert`.

Eventi pubblici:

| Evento | Note |
|---|---|
| `sp:dashboard-dropdown-box:open` | emesso su root |
| `sp:dashboard-dropdown-box:close` | emesso su root |

## Backend owns

- label trigger;
- contenuto interno;
- stato iniziale expanded/collapsed;
- modifier `dash-dropdown-box--alert`;
- dati e azioni di pagamento/spedizione.

## Library owns

- layout box e trigger;
- border, radius, hover/focus;
- icone CSS;
- toggle `aria-expanded`/`hidden`.

## Demo-only

Eventuali `data-section`, `data-orders-table-action`, toolbar scenari, renderer didattici e
fixture appartengono alla demo/app e non sono API pubbliche del componente.

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
