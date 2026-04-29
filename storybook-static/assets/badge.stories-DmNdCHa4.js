import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c;e((()=>{({expect:t}=__STORYBOOK_MODULE_TEST__),n=({label:e=`Consegnato`,variant:t=`success`}={})=>{let n=document.createElement(`div`);return n.innerHTML=`<span class="badge badge--${t}">${e}</span>`,n},r=e=>{let t=document.createElement(`div`);return t.innerHTML=`
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; max-width: 760px;">
            ${e.map(e=>n(e).innerHTML).join(``)}
        </div>
    `,t},i={title:`Primitives/Badge`,tags:[`autodocs`],parameters:{docs:{description:{component:`Badge status minimale con dot e testo. Il backend controlla label e variante; la libreria controlla styling e colori.`}}}},a={render:()=>n(),play:async({canvas:e})=>{await t(e.getByText(`Consegnato`)).toHaveClass(`badge`,`badge--success`)}},o={render:()=>r([{label:`Consegnato`,variant:`success`},{label:`In sospeso`,variant:`warning`},{label:`Scaduto`,variant:`error`},{label:`In lavorazione`,variant:`info`},{label:`Annullato`,variant:`cancelled`},{label:`Bozza`,variant:`neutral`}])},s={render:()=>r([{label:`In lavorazione`,variant:`info`},{label:`In sospeso`,variant:`warning`},{label:`Consegnato`,variant:`success`},{label:`Pagato`,variant:`success`},{label:`Scaduto`,variant:`error`}])},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => renderBadge(),
  play: async ({
    canvas
  }) => {
    const badge = canvas.getByText('Consegnato');
    await expect(badge).toHaveClass('badge', 'badge--success');
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderGroup([{
    label: 'Consegnato',
    variant: 'success'
  }, {
    label: 'In sospeso',
    variant: 'warning'
  }, {
    label: 'Scaduto',
    variant: 'error'
  }, {
    label: 'In lavorazione',
    variant: 'info'
  }, {
    label: 'Annullato',
    variant: 'cancelled'
  }, {
    label: 'Bozza',
    variant: 'neutral'
  }])
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => renderGroup([{
    label: 'In lavorazione',
    variant: 'info'
  }, {
    label: 'In sospeso',
    variant: 'warning'
  }, {
    label: 'Consegnato',
    variant: 'success'
  }, {
    label: 'Pagato',
    variant: 'success'
  }, {
    label: 'Scaduto',
    variant: 'error'
  }])
}`,...s.parameters?.docs?.source}}},c=[`Default`,`Variants`,`ReferenceFromOriginal`]}))();export{a as Default,s as ReferenceFromOriginal,o as Variants,c as __namedExportsOrder,i as default};