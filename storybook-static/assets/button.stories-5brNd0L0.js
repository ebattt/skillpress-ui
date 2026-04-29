import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l,u,d,f;e((()=>{({expect:t}=__STORYBOOK_MODULE_TEST__),n=`
    <span class="button__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5v14" stroke-width="2" stroke-linecap="round" />
        </svg>
    </span>
`,r=({label:e=`Aggiungi al carrello`,variant:t=`primary`,size:r=``,full:i=!1,disabled:a=!1,icon:o=!1,tag:s=`button`}={})=>{let c=document.createElement(`div`),l=[`button`,`button--${t}`,r?`button--${r}`:``,i?`button--full`:``].filter(Boolean).join(` `),u=a?` disabled`:``,d=`${o?n:``}${e}`;return c.innerHTML=s===`a`?`<a class="${l}${a?` is-disabled`:``}" href="#"${a?` aria-disabled="true"`:``}>${d}</a>`:`<button class="${l}" type="button"${u}>${d}</button>`,c},i=e=>{let t=document.createElement(`div`);return t.innerHTML=`
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; max-width: 760px;">
            ${e.map(e=>r(e).innerHTML).join(``)}
        </div>
    `,t},a={title:`Primitives/Button`,tags:[`autodocs`],parameters:{docs:{description:{component:`Button base della libreria Skillpress. Il backend controlla contenuto, attributi nativi e azione; la libreria controlla styling, varianti e stati visuali.`}}}},o={render:()=>r(),play:async({canvas:e,userEvent:n})=>{let r=e.getByRole(`button`,{name:/Aggiungi al carrello/});await t(r).toHaveClass(`button`,`button--primary`),await t(r).not.toBeDisabled(),await n.click(r)}},s={render:()=>i([{label:`Primary`,variant:`primary`},{label:`Secondary`,variant:`secondary`},{label:`Outline`,variant:`outline`},{label:`Ghost`,variant:`ghost`}])},c={render:()=>r({label:`Aggiungi`,variant:`secondary`,icon:!0})},l={render:()=>{let e=document.createElement(`div`);return e.style.maxWidth=`360px`,e.innerHTML=r({label:`Procedi con ordine`,variant:`secondary`,full:!0}).innerHTML,e}},u={render:()=>i([{label:`Button disabled`,variant:`primary`,disabled:!0},{label:`Link disabled`,variant:`outline`,disabled:!0,tag:`a`}]),play:async({canvas:e})=>{await t(e.getByRole(`button`,{name:/Button disabled/})).toBeDisabled(),await t(e.getByRole(`link`,{name:/Link disabled/})).toHaveAttribute(`aria-disabled`,`true`)}},d={render:()=>i([{label:`Aggiungi al carrello`,variant:`secondary`,full:!0,icon:!0},{label:`Rapido`,variant:`primary`,size:`sm`},{label:`Carta patinata`,variant:`outline`,size:`sm`},{label:`Anteprima`,variant:`ghost`,size:`sm`}])},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderButton(),
  play: async ({
    canvas,
    userEvent
  }) => {
    const btn = canvas.getByRole('button', {
      name: /Aggiungi al carrello/
    });
    await expect(btn).toHaveClass('button', 'button--primary');
    await expect(btn).not.toBeDisabled();
    await userEvent.click(btn);
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => renderButton({
    label: 'Aggiungi',
    variant: 'secondary',
    icon: true
  })
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderGroup([{
    label: 'Button disabled',
    variant: 'primary',
    disabled: true
  }, {
    label: 'Link disabled',
    variant: 'outline',
    disabled: true,
    tag: 'a'
  }]),
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole('button', {
      name: /Button disabled/
    })).toBeDisabled();
    await expect(canvas.getByRole('link', {
      name: /Link disabled/
    })).toHaveAttribute('aria-disabled', 'true');
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Variants`,`WithIcon`,`FullWidth`,`Disabled`,`ReferenceFromOriginal`]}))();export{o as Default,u as Disabled,l as FullWidth,d as ReferenceFromOriginal,s as Variants,c as WithIcon,f as __namedExportsOrder,a as default};