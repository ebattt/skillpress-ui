import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l,u,d;e((()=>{t=`
    <span class="button__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5v14" stroke-width="2" stroke-linecap="round" />
        </svg>
    </span>
`,n=({label:e=`Aggiungi al carrello`,variant:n=`primary`,size:r=``,full:i=!1,disabled:a=!1,icon:o=!1,tag:s=`button`}={})=>{let c=document.createElement(`div`),l=[`button`,`button--${n}`,r?`button--${r}`:``,i?`button--full`:``].filter(Boolean).join(` `),u=a?` disabled`:``,d=`${o?t:``}${e}`;return c.innerHTML=s===`a`?`<a class="${l}${a?` is-disabled`:``}" href="#"${a?` aria-disabled="true"`:``}>${d}</a>`:`<button class="${l}" type="button"${u}>${d}</button>`,c},r=e=>{let t=document.createElement(`div`);return t.innerHTML=`
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; max-width: 760px;">
            ${e.map(e=>n(e).innerHTML).join(``)}
        </div>
    `,t},i={title:`Primitives/Button`,tags:[`autodocs`],parameters:{docs:{description:{component:`Button base della libreria Skillpress. Il backend controlla contenuto, attributi nativi e azione; la libreria controlla styling, varianti e stati visuali.`}}}},a={render:()=>n()},o={render:()=>r([{label:`Primary`,variant:`primary`},{label:`Secondary`,variant:`secondary`},{label:`Outline`,variant:`outline`},{label:`Ghost`,variant:`ghost`}])},s={render:()=>n({label:`Aggiungi`,variant:`secondary`,icon:!0})},c={render:()=>{let e=document.createElement(`div`);return e.style.maxWidth=`360px`,e.innerHTML=n({label:`Procedi con ordine`,variant:`secondary`,full:!0}).innerHTML,e}},l={render:()=>r([{label:`Button disabled`,variant:`primary`,disabled:!0},{label:`Link disabled`,variant:`outline`,disabled:!0,tag:`a`}])},u={render:()=>r([{label:`Aggiungi al carrello`,variant:`secondary`,full:!0,icon:!0},{label:`Rapido`,variant:`primary`,size:`sm`},{label:`Carta patinata`,variant:`outline`,size:`sm`},{label:`Anteprima`,variant:`ghost`,size:`sm`}])},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => renderButton()
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderGroup([{
    label: 'Primary',
    variant: 'primary'
  }, {
    label: 'Secondary',
    variant: 'secondary'
  }, {
    label: 'Outline',
    variant: 'outline'
  }, {
    label: 'Ghost',
    variant: 'ghost'
  }])
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => renderButton({
    label: 'Aggiungi',
    variant: 'secondary',
    icon: true
  })
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const root = document.createElement('div');
    root.style.maxWidth = '360px';
    root.innerHTML = renderButton({
      label: 'Procedi con ordine',
      variant: 'secondary',
      full: true
    }).innerHTML;
    return root;
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => renderGroup([{
    label: 'Button disabled',
    variant: 'primary',
    disabled: true
  }, {
    label: 'Link disabled',
    variant: 'outline',
    disabled: true,
    tag: 'a'
  }])
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderGroup([{
    label: 'Aggiungi al carrello',
    variant: 'secondary',
    full: true,
    icon: true
  }, {
    label: 'Rapido',
    variant: 'primary',
    size: 'sm'
  }, {
    label: 'Carta patinata',
    variant: 'outline',
    size: 'sm'
  }, {
    label: 'Anteprima',
    variant: 'ghost',
    size: 'sm'
  }])
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Variants`,`WithIcon`,`FullWidth`,`Disabled`,`ReferenceFromOriginal`]}))();export{a as Default,l as Disabled,c as FullWidth,u as ReferenceFromOriginal,o as Variants,s as WithIcon,d as __namedExportsOrder,i as default};