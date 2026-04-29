import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l,u,d;e((()=>{({expect:t}=__STORYBOOK_MODULE_TEST__),n=e=>{let t=document.createElement(`div`);return t.style.maxWidth=`480px`,t.innerHTML=e,t},r={title:`Primitives/FormControls`,tags:[`autodocs`],parameters:{docs:{description:{component:`Radio group + checkbox option + option-disabled. La famiglia condivide .radio-group + .radio-option: cambia solo il tipo di <input>. :checked e :disabled sono nativi.`}}}},i={render:()=>n(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Tipo rilegatura</label>
            </div>
            <div class="radio-group">
                <label class="radio-option">
                    <input type="radio" name="default-rileg" value="brossura" checked>
                    <span class="radio-option-label">Brossura fresata PUR</span>
                </label>
                <label class="radio-option">
                    <input type="radio" name="default-rileg" value="non-rilegata">
                    <span class="radio-option-label">Non rilegata, tagliata</span>
                </label>
                <label class="radio-option">
                    <input type="radio" name="default-rileg" value="non-rilegata-nt">
                    <span class="radio-option-label">Non rilegata, non tagliata</span>
                </label>
            </div>
        </div>
    `),play:async({canvas:e,userEvent:n})=>{let r=e.getAllByRole(`radio`);await t(r[0]).toBeChecked(),await t(r[1]).not.toBeChecked(),await n.click(r[1]),await t(r[1]).toBeChecked(),await t(r[0]).not.toBeChecked()}},a={render:()=>n(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Orientamento</label>
            </div>
            <div class="radio-group" style="flex-direction: row; gap: 1rem;">
                <label class="radio-option">
                    <input type="radio" name="horiz-orient" value="vertical" checked>
                    <span class="radio-option-label">Verticale</span>
                </label>
                <label class="radio-option">
                    <input type="radio" name="horiz-orient" value="horizontal">
                    <span class="radio-option-label">Orizzontale</span>
                </label>
            </div>
        </div>
    `)},o={render:()=>n(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Tipo rilegatura</label>
            </div>
            <div class="radio-group">
                <label class="radio-option">
                    <input type="radio" name="rileg-dis" value="brossura" checked>
                    <span class="radio-option-label">Brossura fresata PUR</span>
                </label>
                <label class="radio-option option-disabled">
                    <input type="radio" name="rileg-dis" value="spirale" disabled>
                    <span class="radio-option-label">Spirale metallica (non disponibile)</span>
                </label>
            </div>
        </div>
    `),play:async({canvas:e})=>{await t(e.getAllByRole(`radio`)[1]).toBeDisabled(),await t(e.getAllByText(/Spirale metallica/)[0].closest(`label`)).toHaveClass(`option-disabled`)}},s={render:()=>n(`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
                <strong style="font-size: 12px; color: #6B7280;">Unchecked</strong>
                <div class="radio-group" style="margin-top: 0.25rem;">
                    <label class="radio-option">
                        <input type="checkbox">
                        <span class="radio-option-label">Aggiungi certificazione FSC</span>
                    </label>
                </div>
            </div>
            <div>
                <strong style="font-size: 12px; color: #6B7280;">Checked</strong>
                <div class="radio-group" style="margin-top: 0.25rem;">
                    <label class="radio-option">
                        <input type="checkbox" checked>
                        <span class="radio-option-label">Aggiungi certificazione FSC</span>
                    </label>
                </div>
            </div>
        </div>
    `),play:async({canvas:e,userEvent:n})=>{let r=e.getAllByRole(`checkbox`);await t(r[0]).not.toBeChecked(),await t(r[1]).toBeChecked(),await n.click(r[0]),await t(r[0]).toBeChecked()}},c={render:()=>n(`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Opzioni aggiuntive</label>
            </div>
            <div class="radio-group">
                <label class="radio-option">
                    <input type="checkbox" checked>
                    <span class="radio-option-label">Certificazione FSC</span>
                </label>
                <label class="radio-option">
                    <input type="checkbox">
                    <span class="radio-option-label">Cellophane singolo</span>
                </label>
                <label class="radio-option">
                    <input type="checkbox">
                    <span class="radio-option-label">Segnalibro in raso</span>
                </label>
                <label class="radio-option">
                    <input type="checkbox" checked>
                    <span class="radio-option-label">Prova colore digitale</span>
                </label>
            </div>
        </div>
    `)},l={render:()=>n(`
        <div class="radio-group">
            <label class="radio-option option-disabled">
                <input type="checkbox" disabled>
                <span class="radio-option-label">Certificazione FSC (non disponibile per questo formato)</span>
            </label>
            <label class="radio-option option-disabled">
                <input type="checkbox" checked disabled>
                <span class="radio-option-label">Prova colore (inclusa obbligatoriamente)</span>
            </label>
        </div>
    `),play:async({canvas:e})=>{let n=e.getAllByRole(`checkbox`);await t(n[0]).toBeDisabled(),await t(n[1]).toBeDisabled(),await t(n[1]).toBeChecked()}},u={render:()=>n(`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Tempi di consegna</label>
                </div>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="ref-delivery" value="standard" checked>
                        <span class="radio-option-label">Standard (5 gg lavorativi) — Gratis</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="ref-delivery" value="express">
                        <span class="radio-option-label">Express (2 gg lavorativi) — + 12,00 €</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="ref-delivery" value="urgente">
                        <span class="radio-option-label">Urgente (1 gg lavorativo) — + 25,00 €</span>
                    </label>
                </div>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Servizi inclusi</label>
                </div>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="checkbox" checked>
                        <span class="radio-option-label">Certificazione FSC</span>
                    </label>
                    <label class="radio-option">
                        <input type="checkbox">
                        <span class="radio-option-label">Cellophane singolo</span>
                    </label>
                    <label class="radio-option option-disabled">
                        <input type="checkbox" disabled>
                        <span class="radio-option-label">Segnalibro in raso (non disponibile per questo formato)</span>
                    </label>
                </div>
            </div>
        </div>
    `),parameters:{docs:{description:{story:`Replica le preview del catalogo elements-ui (buttons/radio-group.js + buttons/checkbox-option.js). Versione testuale del delivery-option (la card pattern e fuori scope).`}}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Tipo rilegatura</label>
            </div>
            <div class="radio-group">
                <label class="radio-option">
                    <input type="radio" name="default-rileg" value="brossura" checked>
                    <span class="radio-option-label">Brossura fresata PUR</span>
                </label>
                <label class="radio-option">
                    <input type="radio" name="default-rileg" value="non-rilegata">
                    <span class="radio-option-label">Non rilegata, tagliata</span>
                </label>
                <label class="radio-option">
                    <input type="radio" name="default-rileg" value="non-rilegata-nt">
                    <span class="radio-option-label">Non rilegata, non tagliata</span>
                </label>
            </div>
        </div>
    \`),
  play: async ({
    canvas,
    userEvent
  }) => {
    const radios = canvas.getAllByRole('radio');
    await expect(radios[0]).toBeChecked();
    await expect(radios[1]).not.toBeChecked();
    await userEvent.click(radios[1]);
    await expect(radios[1]).toBeChecked();
    await expect(radios[0]).not.toBeChecked();
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Orientamento</label>
            </div>
            <div class="radio-group" style="flex-direction: row; gap: 1rem;">
                <label class="radio-option">
                    <input type="radio" name="horiz-orient" value="vertical" checked>
                    <span class="radio-option-label">Verticale</span>
                </label>
                <label class="radio-option">
                    <input type="radio" name="horiz-orient" value="horizontal">
                    <span class="radio-option-label">Orizzontale</span>
                </label>
            </div>
        </div>
    \`)
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Tipo rilegatura</label>
            </div>
            <div class="radio-group">
                <label class="radio-option">
                    <input type="radio" name="rileg-dis" value="brossura" checked>
                    <span class="radio-option-label">Brossura fresata PUR</span>
                </label>
                <label class="radio-option option-disabled">
                    <input type="radio" name="rileg-dis" value="spirale" disabled>
                    <span class="radio-option-label">Spirale metallica (non disponibile)</span>
                </label>
            </div>
        </div>
    \`),
  play: async ({
    canvas
  }) => {
    const radios = canvas.getAllByRole('radio');
    await expect(radios[1]).toBeDisabled();
    const labels = canvas.getAllByText(/Spirale metallica/);
    await expect(labels[0].closest('label')).toHaveClass('option-disabled');
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
                <strong style="font-size: 12px; color: #6B7280;">Unchecked</strong>
                <div class="radio-group" style="margin-top: 0.25rem;">
                    <label class="radio-option">
                        <input type="checkbox">
                        <span class="radio-option-label">Aggiungi certificazione FSC</span>
                    </label>
                </div>
            </div>
            <div>
                <strong style="font-size: 12px; color: #6B7280;">Checked</strong>
                <div class="radio-group" style="margin-top: 0.25rem;">
                    <label class="radio-option">
                        <input type="checkbox" checked>
                        <span class="radio-option-label">Aggiungi certificazione FSC</span>
                    </label>
                </div>
            </div>
        </div>
    \`),
  play: async ({
    canvas,
    userEvent
  }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes[0]).not.toBeChecked();
    await expect(checkboxes[1]).toBeChecked();
    await userEvent.click(checkboxes[0]);
    await expect(checkboxes[0]).toBeChecked();
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="form-field">
            <div class="label-row">
                <label class="label-text">Opzioni aggiuntive</label>
            </div>
            <div class="radio-group">
                <label class="radio-option">
                    <input type="checkbox" checked>
                    <span class="radio-option-label">Certificazione FSC</span>
                </label>
                <label class="radio-option">
                    <input type="checkbox">
                    <span class="radio-option-label">Cellophane singolo</span>
                </label>
                <label class="radio-option">
                    <input type="checkbox">
                    <span class="radio-option-label">Segnalibro in raso</span>
                </label>
                <label class="radio-option">
                    <input type="checkbox" checked>
                    <span class="radio-option-label">Prova colore digitale</span>
                </label>
            </div>
        </div>
    \`)
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div class="radio-group">
            <label class="radio-option option-disabled">
                <input type="checkbox" disabled>
                <span class="radio-option-label">Certificazione FSC (non disponibile per questo formato)</span>
            </label>
            <label class="radio-option option-disabled">
                <input type="checkbox" checked disabled>
                <span class="radio-option-label">Prova colore (inclusa obbligatoriamente)</span>
            </label>
        </div>
    \`),
  play: async ({
    canvas
  }) => {
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes[0]).toBeDisabled();
    await expect(checkboxes[1]).toBeDisabled();
    await expect(checkboxes[1]).toBeChecked();
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => mount(\`
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Tempi di consegna</label>
                </div>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="ref-delivery" value="standard" checked>
                        <span class="radio-option-label">Standard (5 gg lavorativi) — Gratis</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="ref-delivery" value="express">
                        <span class="radio-option-label">Express (2 gg lavorativi) — + 12,00 €</span>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="ref-delivery" value="urgente">
                        <span class="radio-option-label">Urgente (1 gg lavorativo) — + 25,00 €</span>
                    </label>
                </div>
            </div>
            <div class="form-field">
                <div class="label-row">
                    <label class="label-text">Servizi inclusi</label>
                </div>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="checkbox" checked>
                        <span class="radio-option-label">Certificazione FSC</span>
                    </label>
                    <label class="radio-option">
                        <input type="checkbox">
                        <span class="radio-option-label">Cellophane singolo</span>
                    </label>
                    <label class="radio-option option-disabled">
                        <input type="checkbox" disabled>
                        <span class="radio-option-label">Segnalibro in raso (non disponibile per questo formato)</span>
                    </label>
                </div>
            </div>
        </div>
    \`),
  parameters: {
    docs: {
      description: {
        story: 'Replica le preview del catalogo elements-ui (buttons/radio-group.js + buttons/checkbox-option.js). Versione testuale del delivery-option (la card pattern e fuori scope).'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`HorizontalLayout`,`RadioWithDisabled`,`CheckboxSingle`,`CheckboxGroup`,`CheckboxWithDisabled`,`ReferenceFromElementsUI`]}))();export{c as CheckboxGroup,s as CheckboxSingle,l as CheckboxWithDisabled,i as Default,a as HorizontalLayout,o as RadioWithDisabled,u as ReferenceFromElementsUI,d as __namedExportsOrder,r as default};