import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s;e((()=>{t=({label:e=`Consegnato`,variant:t=`success`}={})=>{let n=document.createElement(`div`);return n.innerHTML=`<span class="badge badge--${t}">${e}</span>`,n},n=e=>{let n=document.createElement(`div`);return n.innerHTML=`
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; max-width: 760px;">
            ${e.map(e=>t(e).innerHTML).join(``)}
        </div>
    `,n},r={title:`Primitives/Badge`,tags:[`autodocs`],parameters:{docs:{description:{component:`Badge status minimale con dot e testo. Il backend controlla label e variante; la libreria controlla styling e colori.`}}}},i={render:()=>t()},a={render:()=>n([{label:`Consegnato`,variant:`success`},{label:`In sospeso`,variant:`warning`},{label:`Scaduto`,variant:`error`},{label:`In lavorazione`,variant:`info`},{label:`Annullato`,variant:`cancelled`},{label:`Bozza`,variant:`neutral`}])},o={render:()=>n([{label:`In lavorazione`,variant:`info`},{label:`In sospeso`,variant:`warning`},{label:`Consegnato`,variant:`success`},{label:`Pagato`,variant:`success`},{label:`Scaduto`,variant:`error`}])},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => renderBadge()
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}},s=[`Default`,`Variants`,`ReferenceFromOriginal`]}))();export{i as Default,o as ReferenceFromOriginal,a as Variants,s as __namedExportsOrder,r as default};