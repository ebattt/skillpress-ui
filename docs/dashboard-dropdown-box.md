---
title: DashboardDropdownBox
description: Box collapsabile della sidebar dettaglio ordine dashboard (Pagamento/Spedizione).
layer: components
strategy: css-js
package_path: components/dashboard-dropdown-box.css
js_path: js/dashboard-dropdown-box.js
---

# DashboardDropdownBox

Box collapsabile della sidebar dettaglio ordine dashboard. La libreria gestisce shell, trigger, icone chrome e disclosure UI; il contenuto del pannello resta slot backend/app.

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
    <button class="dashboard-dropdown-box__trigger" type="button" aria-expanded="false" data-dashboard-dropdown-box-trigger>
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

| Class | Ruolo |
|---|---|
| `.dashboard-dropdown-box` | shell box |
| `.dashboard-dropdown-box--alert` | stato alert con bordo rosso |
| `.dashboard-dropdown-box__trigger` | bottone disclosure |
| `.dashboard-dropdown-box__trigger-label` | label + icona |
| `.dashboard-dropdown-box__trigger-icon` | icona chrome (`--payment`, `--shipping`) |
| `.dashboard-dropdown-box__chevron` | chevron disclosure |
| `.dashboard-dropdown-box__content` | pannello contenuto |

## Data hooks

| Hook | Obbligatorio | Elemento | Ruolo |
|---|---:|---|---|
| `data-dashboard-dropdown-box` | sì | root | init componente |
| `data-dashboard-dropdown-box-trigger` | sì | trigger | toggle disclosure |
| `data-dashboard-dropdown-box-content` | sì | content | pannello da mostrare/nascondere |

## JS

```js
window.SkillpressUI.DashboardDropdownBox.init();
window.SkillpressUI.DashboardDropdownBox.setExpanded(root, true);
```

Eventi: `sp:dashboard-dropdown-box:open`, `sp:dashboard-dropdown-box:close` (emessi su root). Il toggle sincronizza `aria-expanded`/`hidden`.

## Out of scope

- pagamento/spedizione reali, dati ordine;
- routing dashboard, validazione;
- contenuto specifico del pannello.
