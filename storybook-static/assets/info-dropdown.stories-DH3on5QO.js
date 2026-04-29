import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l,u,d,f;e((()=>{({expect:t}=__STORYBOOK_MODULE_TEST__),n=e=>{window.requestAnimationFrame(()=>{window.SkillpressUI&&window.SkillpressUI.InfoDropdown&&window.SkillpressUI.InfoDropdown.init(e)})},r=`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
`,i=({label:e,id:t,body:n,open:i=!1})=>`
    <div class="form-field" style="max-width: 480px;">
        <div class="label-row">
            <label class="label-text">${e}</label>
            <button type="button"
                    class="info-btn"
                    aria-controls="${t}"
                    aria-expanded="${i?`true`:`false`}"
                    aria-label="Mostra informazioni">
                ${r}
            </button>
        </div>
        <div id="${t}" class="info-dropdown${i?``:` hidden`}"
             role="region" aria-hidden="${i?`false`:`true`}">
            ${n}
        </div>
    </div>
`,a=e=>{let t=document.createElement(`div`);return t.innerHTML=e,n(t),t},o={title:`Primitives/InfoDropdown`,tags:[`autodocs`],parameters:{docs:{description:{component:`Disclosure inline per pannelli di aiuto contestuale. Il backend scrive solo il body; titolo, header e close button vengono auto-iniettati dalla libreria al primo init usando il textContent della .label-text adiacente.`}}}},s={render:()=>a(i({label:`Formato (mm)`,id:`sp-info-formato`,body:`
            <p>Il <strong>formato</strong> indica le dimensioni del prodotto finito a libro chiuso, espresse in <strong>Base x Altezza</strong>.</p>
        `})),play:async({canvas:e,userEvent:n})=>{let r=e.getByRole(`button`,{name:/Mostra informazioni/});await t(r).toHaveAttribute(`aria-expanded`,`false`),await n.click(r),await t(r).toHaveAttribute(`aria-expanded`,`true`);let i=e.getByRole(`button`,{name:/Chiudi/});await n.click(i),await t(r).toHaveAttribute(`aria-expanded`,`false`)}},c={render:()=>a(i({label:`Carta`,id:`sp-info-carta`,open:!0,body:`
            <p>La <strong>carta</strong> influenza resa visiva, peso e percezione tattile del prodotto.</p>
        `}))},l={render:()=>a(i({label:`Formato (mm)`,id:`sp-info-formato-full`,open:!0,body:`
            <p>Il <strong>formato</strong> indica le dimensioni del prodotto finito a libro chiuso, espresse in <strong>Base x Altezza</strong>.</p>
            <p><strong>Formati standard disponibili:</strong></p>
            <ul>
                <li><strong>A4</strong> (210x297mm) -- Cataloghi, manuali, riviste</li>
                <li><strong>A5</strong> (148x210mm) -- Libri tascabili, brochure</li>
                <li><strong>Libro</strong> (165x235mm) -- Editoriale classico</li>
            </ul>
            <div class="info-note">
                <p class="info-note-title">Nota sulle tolleranze (Art. 9.7)</p>
                <p>Per motivi di stampa, rilegatura e rifiniture, ci riserviamo di ridurre il formato del lavoro fino al 99% se necessario. Questo fattore e' da accettare e non soggetto a reclamo.</p>
            </div>
        `})),play:async({canvas:e,userEvent:n})=>{let r=e.getByRole(`button`,{name:/Mostra informazioni/});await t(r).toHaveAttribute(`aria-expanded`,`true`),await n.click(r),await t(r).toHaveAttribute(`aria-expanded`,`false`),await n.click(r),await t(r).toHaveAttribute(`aria-expanded`,`true`)}},u={render:()=>a(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 480px;">
            ${i({label:`Formato (mm)`,id:`sp-multi-formato`,body:`<p>Dimensioni del prodotto finito.</p>`})}
            ${i({label:`Stampa interna`,id:`sp-multi-stampa`,body:`<p>Tipologia di stampa: bianco/nero o colori.</p>`})}
            ${i({label:`Rilegatura`,id:`sp-multi-rileg`,body:`<p>Tecnica di assemblaggio del prodotto stampato.</p>`})}
        </div>
    `),play:async({canvas:e,userEvent:n,step:r})=>{let i=e.getAllByRole(`button`,{name:/Mostra informazioni/});await r(`apertura singola: aprire il secondo chiude il primo`,async()=>{await n.click(i[0]),await t(i[0]).toHaveAttribute(`aria-expanded`,`true`),await n.click(i[1]),await t(i[0]).toHaveAttribute(`aria-expanded`,`false`),await t(i[1]).toHaveAttribute(`aria-expanded`,`true`)})}},d={render:()=>a(i({label:`Facciate`,id:`sp-ref-facciate`,body:`
            <p>Il <strong>numero di facciate</strong> determina la quantita' di pagine stampate (incluse le 4 di copertina).</p>
            <p>Esempio: 32 facciate = 16 fogli stampati fronte/retro.</p>
        `})),parameters:{docs:{description:{story:"Pattern verbatim dal catalogo `elements-ui/js/buttons/button-info.js` (Button Info). Material Symbols `info` e `close` sostituiti con SVG inline. Onclick inline sostituito con `aria-controls` + delegated handler della libreria."}}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => mount(renderField({
    label: 'Formato (mm)',
    id: 'sp-info-formato',
    body: \`
            <p>Il <strong>formato</strong> indica le dimensioni del prodotto finito a libro chiuso, espresse in <strong>Base x Altezza</strong>.</p>
        \`
  })),
  play: async ({
    canvas,
    userEvent
  }) => {
    const trigger = canvas.getByRole('button', {
      name: /Mostra informazioni/
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const close = canvas.getByRole('button', {
      name: /Chiudi/
    });
    await userEvent.click(close);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => mount(renderField({
    label: 'Carta',
    id: 'sp-info-carta',
    open: true,
    body: \`
            <p>La <strong>carta</strong> influenza resa visiva, peso e percezione tattile del prodotto.</p>
        \`
  }))
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => mount(renderField({
    label: 'Formato (mm)',
    id: 'sp-info-formato-full',
    open: true,
    body: \`
            <p>Il <strong>formato</strong> indica le dimensioni del prodotto finito a libro chiuso, espresse in <strong>Base x Altezza</strong>.</p>
            <p><strong>Formati standard disponibili:</strong></p>
            <ul>
                <li><strong>A4</strong> (210x297mm) -- Cataloghi, manuali, riviste</li>
                <li><strong>A5</strong> (148x210mm) -- Libri tascabili, brochure</li>
                <li><strong>Libro</strong> (165x235mm) -- Editoriale classico</li>
            </ul>
            <div class="info-note">
                <p class="info-note-title">Nota sulle tolleranze (Art. 9.7)</p>
                <p>Per motivi di stampa, rilegatura e rifiniture, ci riserviamo di ridurre il formato del lavoro fino al 99% se necessario. Questo fattore e' da accettare e non soggetto a reclamo.</p>
            </div>
        \`
  })),
  play: async ({
    canvas,
    userEvent
  }) => {
    const trigger = canvas.getByRole('button', {
      name: /Mostra informazioni/
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // chiudi e riapri
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 480px;">
            \${renderField({
    label: 'Formato (mm)',
    id: 'sp-multi-formato',
    body: '<p>Dimensioni del prodotto finito.</p>'
  })}
            \${renderField({
    label: 'Stampa interna',
    id: 'sp-multi-stampa',
    body: '<p>Tipologia di stampa: bianco/nero o colori.</p>'
  })}
            \${renderField({
    label: 'Rilegatura',
    id: 'sp-multi-rileg',
    body: '<p>Tecnica di assemblaggio del prodotto stampato.</p>'
  })}
        </div>
    \`),
  play: async ({
    canvas,
    userEvent,
    step
  }) => {
    const triggers = canvas.getAllByRole('button', {
      name: /Mostra informazioni/
    });
    await step('apertura singola: aprire il secondo chiude il primo', async () => {
      await userEvent.click(triggers[0]);
      await expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
      await userEvent.click(triggers[1]);
      await expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
      await expect(triggers[1]).toHaveAttribute('aria-expanded', 'true');
    });
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => mount(renderField({
    label: 'Facciate',
    id: 'sp-ref-facciate',
    body: \`
            <p>Il <strong>numero di facciate</strong> determina la quantita' di pagine stampate (incluse le 4 di copertina).</p>
            <p>Esempio: 32 facciate = 16 fogli stampati fronte/retro.</p>
        \`
  })),
  parameters: {
    docs: {
      description: {
        story: 'Pattern verbatim dal catalogo \`elements-ui/js/buttons/button-info.js\` (Button Info). Material Symbols \`info\` e \`close\` sostituiti con SVG inline. Onclick inline sostituito con \`aria-controls\` + delegated handler della libreria.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`OpenInitially`,`WithListAndNote`,`MultipleDropdownsExclusive`,`ReferenceFromElementsUI`]}))();export{s as Default,u as MultipleDropdownsExclusive,c as OpenInitially,d as ReferenceFromElementsUI,l as WithListAndNote,f as __namedExportsOrder,o as default};