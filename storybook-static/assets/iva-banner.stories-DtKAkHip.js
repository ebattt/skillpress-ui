import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l,u,d;e((()=>{({expect:t}=__STORYBOOK_MODULE_TEST__),n=`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
`,r=`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
`,i=e=>{let t=document.createElement(`div`);return t.style.maxWidth=`640px`,t.innerHTML=e,t},a={title:`Primitives/IvaBanner`,tags:[`autodocs`],parameters:{docs:{description:{component:`Callout warning per la dichiarazione IVA 4% (Step 6 del configuratore). Coverage anche del layout grid .qty-iva-row* in cui viene composto.`}}}},o={render:()=>i(`
        <div class="iva-banner">
            <div class="iva-banner-content">
                <span class="iva-banner-icon">${n}</span>
                <div class="iva-banner-text">
                    <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN e necessario compilare e firmare la dichiarazione sostitutiva.</p>
                </div>
            </div>
        </div>
    `),play:async({canvas:e})=>{await t(e.getByText(/aliquota ridotta al 4%/)).toBeVisible()}},s={render:()=>i(`
        <div class="iva-banner">
            <div class="iva-banner-content">
                <span class="iva-banner-icon">${n}</span>
                <div class="iva-banner-text">
                    <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN e necessario compilare e firmare la dichiarazione sostitutiva.</p>
                    <button type="button" style="color: #1C7264; font-weight: 500; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;">
                        Scarica la dichiarazione
                    </button>
                </div>
            </div>
        </div>
    `)},c={render:()=>i(`
        <div class="qty-iva-row qty-iva-row--double">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                <input type="number" class="form-input" value="50" min="1" max="2000"/>
            </div>
            <div>
                <div class="label-row">
                    <label class="label-text">IVA</label>
                    <button type="button" class="info-btn" aria-label="Info IVA">
                        ${r}
                    </button>
                </div>
                <select class="form-select">
                    <option value="22" selected>22%</option>
                    <option value="4">4%</option>
                </select>
            </div>
        </div>
    `),play:async({canvas:e})=>{let n=e.getByRole(`spinbutton`),r=e.getByRole(`combobox`);await t(n).toHaveClass(`form-input`),await t(r).toHaveClass(`form-select`)},parameters:{docs:{description:{story:"Layout `qty-iva-row qty-iva-row--double` (Step 6 modalita avanzata). Compone form-input + form-select da FormPrimitives."}}}},l={render:()=>i(`
        <div class="qty-iva-row qty-iva-row--single">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                <input type="number" class="form-input" value="50" min="1" max="2000"/>
            </div>
        </div>
    `),parameters:{docs:{description:{story:"Layout `qty-iva-row qty-iva-row--single` (Step 6 modalita veloce). Solo quantita, IVA omessa."}}}},u={render:()=>i(`
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="qty-iva-row qty-iva-row--double">
                <div>
                    <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                    <input type="number" class="form-input" value="50" min="1" max="2000"/>
                </div>
                <div>
                    <div class="label-row">
                        <label class="label-text">IVA</label>
                        <button type="button" class="info-btn" aria-label="Info IVA">
                            ${r}
                        </button>
                    </div>
                    <select class="form-select">
                        <option value="22">22%</option>
                        <option value="4" selected>4%</option>
                    </select>
                </div>
            </div>
            <div class="iva-banner">
                <div class="iva-banner-content">
                    <span class="iva-banner-icon">${n}</span>
                    <div class="iva-banner-text">
                        <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN e necessario compilare e firmare la dichiarazione sostitutiva.</p>
                        <button type="button" style="color: #1C7264; font-weight: 500; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;">
                            Scarica la dichiarazione
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `),parameters:{docs:{description:{story:`Replica esatta del pattern Step 6 (product-page-integration/js/sections/section-6.js#L230-L285) quando IVA = 4%: qty-iva-row--double sopra, iva-banner sotto.`}}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="iva-banner">
            <div class="iva-banner-content">
                <span class="iva-banner-icon">\${INFO_ICON_SVG}</span>
                <div class="iva-banner-text">
                    <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN e necessario compilare e firmare la dichiarazione sostitutiva.</p>
                </div>
            </div>
        </div>
    \`),
  play: async ({
    canvas
  }) => {
    const banner = canvas.getByText(/aliquota ridotta al 4%/);
    await expect(banner).toBeVisible();
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="iva-banner">
            <div class="iva-banner-content">
                <span class="iva-banner-icon">\${INFO_ICON_SVG}</span>
                <div class="iva-banner-text">
                    <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN e necessario compilare e firmare la dichiarazione sostitutiva.</p>
                    <button type="button" style="color: #1C7264; font-weight: 500; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;">
                        Scarica la dichiarazione
                    </button>
                </div>
            </div>
        </div>
    \`)
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="qty-iva-row qty-iva-row--double">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                <input type="number" class="form-input" value="50" min="1" max="2000"/>
            </div>
            <div>
                <div class="label-row">
                    <label class="label-text">IVA</label>
                    <button type="button" class="info-btn" aria-label="Info IVA">
                        \${SELECT_INFO_SVG}
                    </button>
                </div>
                <select class="form-select">
                    <option value="22" selected>22%</option>
                    <option value="4">4%</option>
                </select>
            </div>
        </div>
    \`),
  play: async ({
    canvas
  }) => {
    const qty = canvas.getByRole('spinbutton');
    const select = canvas.getByRole('combobox');
    await expect(qty).toHaveClass('form-input');
    await expect(select).toHaveClass('form-select');
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout \`qty-iva-row qty-iva-row--double\` (Step 6 modalita avanzata). Compone form-input + form-select da FormPrimitives.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="qty-iva-row qty-iva-row--single">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                <input type="number" class="form-input" value="50" min="1" max="2000"/>
            </div>
        </div>
    \`),
  parameters: {
    docs: {
      description: {
        story: 'Layout \`qty-iva-row qty-iva-row--single\` (Step 6 modalita veloce). Solo quantita, IVA omessa.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="qty-iva-row qty-iva-row--double">
                <div>
                    <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Quantità</label>
                    <input type="number" class="form-input" value="50" min="1" max="2000"/>
                </div>
                <div>
                    <div class="label-row">
                        <label class="label-text">IVA</label>
                        <button type="button" class="info-btn" aria-label="Info IVA">
                            \${SELECT_INFO_SVG}
                        </button>
                    </div>
                    <select class="form-select">
                        <option value="22">22%</option>
                        <option value="4" selected>4%</option>
                    </select>
                </div>
            </div>
            <div class="iva-banner">
                <div class="iva-banner-content">
                    <span class="iva-banner-icon">\${INFO_ICON_SVG}</span>
                    <div class="iva-banner-text">
                        <p>Per usufruire dell'aliquota ridotta al 4% per editori con ISBN e necessario compilare e firmare la dichiarazione sostitutiva.</p>
                        <button type="button" style="color: #1C7264; font-weight: 500; text-decoration: underline; background: none; border: none; cursor: pointer; padding: 0;">
                            Scarica la dichiarazione
                        </button>
                    </div>
                </div>
            </div>
        </div>
    \`),
  parameters: {
    docs: {
      description: {
        story: 'Replica esatta del pattern Step 6 (product-page-integration/js/sections/section-6.js#L230-L285) quando IVA = 4%: qty-iva-row--double sopra, iva-banner sotto.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`WithDownloadButton`,`QtyIvaRowDouble`,`QtyIvaRowSingle`,`ReferenceFromElementsUI`]}))();export{o as Default,c as QtyIvaRowDouble,l as QtyIvaRowSingle,u as ReferenceFromElementsUI,s as WithDownloadButton,d as __namedExportsOrder,a as default};