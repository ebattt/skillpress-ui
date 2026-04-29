import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g;e((()=>{({expect:t,userEvent:n}=__STORYBOOK_MODULE_TEST__),r=`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
`,i=`
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
`,a=e=>{let t=document.createElement(`div`);return t.style.maxWidth=`480px`,t.innerHTML=e,t},o={title:`Primitives/TextInput`,tags:[`autodocs`],parameters:{docs:{description:{component:'Showcase delle 7 varianti del catalog Text Input.\n\nTutti i selettori provengono dalla primitiva FormPrimitives gia\' coperta:\n`.form-field`, `.label-row`, `.label-text` (+ `__required`/`__optional`),\n`.label-hint`, `.form-input` (+ `--error`/`:disabled`/`:focus`),\n`.error-msg`, `.nome-ref-row`. La variante 6 introduce `.nome-lavoro-input`\ncome alias semantico di `.form-input` (CSS identico, classe distinta per la\nsezione "Nome del lavoro").\n\nStrategia A static snapshot: validazione e swap modifier sono business logic\nconsumer-side.'}}}},s={render:()=>a(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio</label>
            </div>
            <input type="text" class="form-input" placeholder="Inserisci valore..."/>
        </div>
    `),play:async({canvas:e})=>{let r=e.getByPlaceholderText(`Inserisci valore...`);await t(r).toHaveClass(`form-input`),await n.click(r),await t(r).toHaveFocus()}},c={render:()=>a(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                <button type="button" class="info-btn" aria-label="Info Campo Esempio">
                    ${r}
                </button>
            </div>
            <input type="text" class="form-input" placeholder="Inserisci valore..."/>
        </div>
    `)},l={render:()=>a(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio</label>
                <span class="label-hint">(testo di aiuto)</span>
                <button type="button" class="info-btn" aria-label="Info Campo Esempio">
                    ${r}
                </button>
            </div>
            <input type="text" class="form-input" placeholder="Inserisci valore..."/>
        </div>
    `)},u={render:()=>a(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
            </div>
            <input type="text" class="form-input form-input--error" value=""/>
            <div class="error-msg">
                ${i}
                Questo campo e obbligatorio
            </div>
        </div>
    `),play:async({canvas:e})=>{await t(e.getByRole(`textbox`)).toHaveClass(`form-input--error`)}},d={render:()=>a(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio</label>
            </div>
            <input type="text" class="form-input" value="Non modificabile" disabled/>
        </div>
    `),play:async({canvas:e})=>{await t(e.getByRole(`textbox`)).toBeDisabled()}},f={render:()=>a(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
            </div>
            <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore..."/>
        </div>
    `),parameters:{docs:{description:{story:'Variante 6: classe `.nome-lavoro-input` come alias semantico di `.form-input`. Stessa resa visiva, classe distinta per la sezione "Nome del lavoro". Useful quando il backend genera markup specifico per quella sezione e vuole una classe dedicata per stile/test/CSS-targeting futuro.'}}},play:async({canvas:e})=>{await t(e.getByPlaceholderText(`Inserisci valore...`)).toHaveClass(`nome-lavoro-input`)}},p={render:()=>a(`
        <div class="nome-ref-row">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
                    Campo Esempio <span class="label-text__required">*</span>
                </label>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
                    Campo Esempio <span class="label-text__optional">(opzionale)</span>
                </label>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
        </div>
    `)},m={render:()=>a(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio</label>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                    <button type="button" class="info-btn" aria-label="Info">${r}</button>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio</label>
                    <span class="label-hint">(testo di aiuto)</span>
                    <button type="button" class="info-btn" aria-label="Info">${r}</button>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                </div>
                <input type="text" class="form-input form-input--error" value=""/>
                <div class="error-msg">${i}Questo campo e obbligatorio</div>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio</label>
                </div>
                <input type="text" class="form-input" value="Non modificabile" disabled/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
                </div>
                <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="nome-ref-row">
                <div>
                    <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Campo Esempio <span class="label-text__required">*</span></label>
                    <input type="text" class="form-input" placeholder="Inserisci valore..."/>
                </div>
                <div>
                    <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
                    <input type="text" class="form-input" placeholder="Inserisci valore..."/>
                </div>
            </div>
        </div>
    `)},h={render:()=>a(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-field">
                <div class="label-row"><label class="label-text">Campo Esempio</label></div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                    <button type="button" class="info-btn" aria-label="Info">${r}</button>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
                </div>
                <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore..."/>
            </div>
        </div>
    `),parameters:{docs:{description:{story:"Replica una selezione delle 7 varianti dal preview catalog elements-ui (`elements-ui/js/components-form-inputs.js#L1-L127`). Material Symbols del catalog sostituiti con SVG inline."}}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio</label>
            </div>
            <input type="text" class="form-input" placeholder="Inserisci valore..."/>
        </div>
    \`),
  play: async ({
    canvas
  }) => {
    const input = canvas.getByPlaceholderText('Inserisci valore...');
    await expect(input).toHaveClass('form-input');
    await userEvent.click(input);
    await expect(input).toHaveFocus();
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                <button type="button" class="info-btn" aria-label="Info Campo Esempio">
                    \${INFO_ICON_SVG}
                </button>
            </div>
            <input type="text" class="form-input" placeholder="Inserisci valore..."/>
        </div>
    \`)
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio</label>
                <span class="label-hint">(testo di aiuto)</span>
                <button type="button" class="info-btn" aria-label="Info Campo Esempio">
                    \${INFO_ICON_SVG}
                </button>
            </div>
            <input type="text" class="form-input" placeholder="Inserisci valore..."/>
        </div>
    \`)
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
            </div>
            <input type="text" class="form-input form-input--error" value=""/>
            <div class="error-msg">
                \${ERROR_ICON_SVG}
                Questo campo e obbligatorio
            </div>
        </div>
    \`),
  play: async ({
    canvas
  }) => {
    const input = canvas.getByRole('textbox');
    await expect(input).toHaveClass('form-input--error');
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio</label>
            </div>
            <input type="text" class="form-input" value="Non modificabile" disabled/>
        </div>
    \`),
  play: async ({
    canvas
  }) => {
    const input = canvas.getByRole('textbox');
    await expect(input).toBeDisabled();
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
            </div>
            <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore..."/>
        </div>
    \`),
  parameters: {
    docs: {
      description: {
        story: 'Variante 6: classe \`.nome-lavoro-input\` come alias semantico di \`.form-input\`. Stessa resa visiva, classe distinta per la sezione "Nome del lavoro". Useful quando il backend genera markup specifico per quella sezione e vuole una classe dedicata per stile/test/CSS-targeting futuro.'
      }
    }
  },
  play: async ({
    canvas
  }) => {
    const input = canvas.getByPlaceholderText('Inserisci valore...');
    await expect(input).toHaveClass('nome-lavoro-input');
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="nome-ref-row">
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
                    Campo Esempio <span class="label-text__required">*</span>
                </label>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div>
                <label class="label-text" style="display: block; margin-bottom: 0.375rem;">
                    Campo Esempio <span class="label-text__optional">(opzionale)</span>
                </label>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
        </div>
    \`)
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio</label>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                    <button type="button" class="info-btn" aria-label="Info">\${INFO_ICON_SVG}</button>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio</label>
                    <span class="label-hint">(testo di aiuto)</span>
                    <button type="button" class="info-btn" aria-label="Info">\${INFO_ICON_SVG}</button>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                </div>
                <input type="text" class="form-input form-input--error" value=""/>
                <div class="error-msg">\${ERROR_ICON_SVG}Questo campo e obbligatorio</div>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio</label>
                </div>
                <input type="text" class="form-input" value="Non modificabile" disabled/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
                </div>
                <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="nome-ref-row">
                <div>
                    <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Campo Esempio <span class="label-text__required">*</span></label>
                    <input type="text" class="form-input" placeholder="Inserisci valore..."/>
                </div>
                <div>
                    <label class="label-text" style="display: block; margin-bottom: 0.375rem;">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
                    <input type="text" class="form-input" placeholder="Inserisci valore..."/>
                </div>
            </div>
        </div>
    \`)
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-field">
                <div class="label-row"><label class="label-text">Campo Esempio</label></div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__required">*</span></label>
                    <button type="button" class="info-btn" aria-label="Info">\${INFO_ICON_SVG}</button>
                </div>
                <input type="text" class="form-input" placeholder="Inserisci valore..."/>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Campo Esempio <span class="label-text__optional">(opzionale)</span></label>
                </div>
                <input type="text" class="nome-lavoro-input" placeholder="Inserisci valore..."/>
            </div>
        </div>
    \`),
  parameters: {
    docs: {
      description: {
        story: 'Replica una selezione delle 7 varianti dal preview catalog elements-ui (\`elements-ui/js/components-form-inputs.js#L1-L127\`). Material Symbols del catalog sostituiti con SVG inline.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`WithLabelAndInfoButton`,`WithLabelHint`,`ErrorState`,`Disabled`,`NomeLavoroInput`,`TwoColumnLayout`,`AllVariants`,`ReferenceFromElementsUI`]}))();export{m as AllVariants,s as Default,d as Disabled,u as ErrorState,f as NomeLavoroInput,h as ReferenceFromElementsUI,p as TwoColumnLayout,c as WithLabelAndInfoButton,l as WithLabelHint,g as __namedExportsOrder,o as default};