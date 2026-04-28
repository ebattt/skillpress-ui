import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l,u,d;e((()=>{t=e=>{window.requestAnimationFrame(()=>{window.SkillpressUI&&window.SkillpressUI.ToggleSwitch&&window.SkillpressUI.ToggleSwitch.init(e)})},n=({checked:e=!1,disabled:t=!1,id:n,ariaLabel:r}={})=>{let i=[`toggle-switch`];e&&i.push(`is-checked`);let a=[`type="button"`,`class="${i.join(` `)}"`,`role="switch"`,`aria-checked="${e?`true`:`false`}"`,`data-skillpress-toggle-switch`];return n&&a.push(`id="${n}"`),r&&a.push(`aria-label="${r}"`),t&&(a.push(`disabled`),a.push(`aria-disabled="true"`)),`
        <button ${a.join(` `)}>
            <span class="toggle-switch__thumb"></span>
        </button>
    `},r=({checked:e=!1,disabled:t=!1,label:r=`Multicopertina`,id:i=`sp-toggle-field`}={})=>`
    <span class="toggle-switch-field">
        ${n({checked:e,disabled:t,id:i,ariaLabel:r})}
        <label class="toggle-switch__label" for="${i}">${r}</label>
    </span>
`,i=e=>{let n=document.createElement(`div`);return n.innerHTML=e,t(n),n},a={title:`Primitives/ToggleSwitch`,tags:[`autodocs`],parameters:{docs:{description:{component:"Switch binario on/off accessibile, derivato dai sorgenti elements-ui (multicopertina + checkout multispedizione). La libreria controlla geometria, colori e behavior; il consumer controlla testo della label, stato iniziale e logica di business via evento `toggle-switch:change`."}}}},o={render:()=>i(n({checked:!1,ariaLabel:`Toggle option`}))},s={render:()=>i(n({checked:!0,ariaLabel:`Toggle option`}))},c={render:()=>i(`
        <div style="display: flex; gap: 16px; align-items: center;">
            ${n({checked:!1,disabled:!0,ariaLabel:`Disabled off`})}
            ${n({checked:!0,disabled:!0,ariaLabel:`Disabled on`})}
        </div>
    `)},l={render:()=>i(`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            ${r({checked:!1,label:`Multicopertina`,id:`sp-tw-multicop`})}
            ${r({checked:!0,label:`Multispedizione`,id:`sp-tw-multiship`})}
        </div>
    `)},u={render:()=>{let e=document.createElement(`div`);return e.style.maxWidth=`500px`,e.innerHTML=`
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/buttons/toggle-switch.js</code> (multicopertina off / on).
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${r({checked:!1,label:`Multicopertina`,id:`sp-ref-multicop-off`})}
                        ${r({checked:!0,label:`Multicopertina`,id:`sp-ref-multicop-on`})}
                    </div>
                </div>

                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/checkout/checkout-toggle-switch.js</code> (multispedizione off / on).
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px; border: 1px solid var(--color-bg-gray-200); border-radius: var(--radius-xl); background: var(--color-bg-white);">
                            <div>
                                <p style="margin: 0; font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text);">Multispedizione</p>
                                <p style="margin: 2px 0 0; font-size: var(--font-size-xs); color: var(--color-text-light);">Invia i prodotti a indirizzi diversi</p>
                            </div>
                            ${n({checked:!1,ariaLabel:`Multispedizione`})}
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px; border: 1px solid var(--color-bg-gray-200); border-radius: var(--radius-xl); background: var(--color-bg-white);">
                            <div>
                                <p style="margin: 0; font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text);">Multispedizione</p>
                                <p style="margin: 2px 0 0; font-size: var(--font-size-xs); color: var(--color-text-light);">Invia i prodotti a indirizzi diversi</p>
                            </div>
                            ${n({checked:!0,ariaLabel:`Multispedizione`})}
                        </div>
                    </div>
                </div>

                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Disabled (off + on) -- nei sorgenti il disabled e' espresso con
                        <code>opacity: 0.5; pointer-events: none</code> sul wrapper; qui usiamo
                        <code>disabled</code> nativo del button.
                    </p>
                    <div style="display: flex; gap: 16px; align-items: center;">
                        ${n({checked:!1,disabled:!0,ariaLabel:`Disabled off`})}
                        ${n({checked:!0,disabled:!0,ariaLabel:`Disabled on`})}
                    </div>
                </div>
            </div>
        `,t(e),e}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => mount(renderSwitch({
    checked: false,
    ariaLabel: 'Toggle option'
  }))
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => mount(renderSwitch({
    checked: true,
    ariaLabel: 'Toggle option'
  }))
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div style="display: flex; gap: 16px; align-items: center;">
            \${renderSwitch({
    checked: false,
    disabled: true,
    ariaLabel: 'Disabled off'
  })}
            \${renderSwitch({
    checked: true,
    disabled: true,
    ariaLabel: 'Disabled on'
  })}
        </div>
    \`)
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div style="display: flex; flex-direction: column; gap: 12px;">
            \${renderField({
    checked: false,
    label: 'Multicopertina',
    id: 'sp-tw-multicop'
  })}
            \${renderField({
    checked: true,
    label: 'Multispedizione',
    id: 'sp-tw-multiship'
  })}
        </div>
    \`)
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => {
    /*
     * Riferimenti coperti da questa primitiva:
     *  - elements-ui/css/components/_form-inputs.css
     *      sezione: "TOGGLE SWITCH (multicopertina on/off)"
     *      selettori: .multicop-toggle, .multicop-switch,
     *                 .multicop-switch--active, .multicop-switch-knob,
     *                 .multicop-label
     *  - elements-ui/js/buttons/toggle-switch.js
     *      markup multicop con div + classi --active
     *  - elements-ui/js/checkout/checkout-toggle-switch.js
     *      markup checkout con button[role=switch][aria-checked]
     *      + .toggle-switch + .toggle-switch-handle
     *  - product-page-integration: toggle multicopertina nella sidebar
     *  - checkout: toggle multispedizione
     *
     * NON coperto: variante "segmented two-label" .iva-toggle / .iva-btn
     * (Lordo / Netto) presente in _form-inputs.css -- e' un pattern distinto
     * (segmented control), non un binary switch.
     */
    const root = document.createElement('div');
    root.style.maxWidth = '500px';
    root.innerHTML = \`
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/buttons/toggle-switch.js</code> (multicopertina off / on).
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        \${renderField({
      checked: false,
      label: 'Multicopertina',
      id: 'sp-ref-multicop-off'
    })}
                        \${renderField({
      checked: true,
      label: 'Multicopertina',
      id: 'sp-ref-multicop-on'
    })}
                    </div>
                </div>

                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/checkout/checkout-toggle-switch.js</code> (multispedizione off / on).
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px; border: 1px solid var(--color-bg-gray-200); border-radius: var(--radius-xl); background: var(--color-bg-white);">
                            <div>
                                <p style="margin: 0; font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text);">Multispedizione</p>
                                <p style="margin: 2px 0 0; font-size: var(--font-size-xs); color: var(--color-text-light);">Invia i prodotti a indirizzi diversi</p>
                            </div>
                            \${renderSwitch({
      checked: false,
      ariaLabel: 'Multispedizione'
    })}
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px; border: 1px solid var(--color-bg-gray-200); border-radius: var(--radius-xl); background: var(--color-bg-white);">
                            <div>
                                <p style="margin: 0; font-size: var(--font-size-sm); font-weight: var(--font-weight-semibold); color: var(--color-text);">Multispedizione</p>
                                <p style="margin: 2px 0 0; font-size: var(--font-size-xs); color: var(--color-text-light);">Invia i prodotti a indirizzi diversi</p>
                            </div>
                            \${renderSwitch({
      checked: true,
      ariaLabel: 'Multispedizione'
    })}
                        </div>
                    </div>
                </div>

                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Disabled (off + on) -- nei sorgenti il disabled e' espresso con
                        <code>opacity: 0.5; pointer-events: none</code> sul wrapper; qui usiamo
                        <code>disabled</code> nativo del button.
                    </p>
                    <div style="display: flex; gap: 16px; align-items: center;">
                        \${renderSwitch({
      checked: false,
      disabled: true,
      ariaLabel: 'Disabled off'
    })}
                        \${renderSwitch({
      checked: true,
      disabled: true,
      ariaLabel: 'Disabled on'
    })}
                    </div>
                </div>
            </div>
        \`;
    initToggleSwitch(root);
    return root;
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Checked`,`Disabled`,`WithLabel`,`ReferenceFromElementsUI`]}))();export{s as Checked,o as Default,c as Disabled,u as ReferenceFromElementsUI,l as WithLabel,d as __namedExportsOrder,a as default};