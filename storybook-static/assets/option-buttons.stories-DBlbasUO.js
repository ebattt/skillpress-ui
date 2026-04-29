import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./tokens-DCff7C25.js";var n=e((()=>{})),r,i,a,o,s,c,l,u,d;e((()=>{t(),n(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={title:`Primitives/OptionButtons`},a=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--selected">A4</button>
            <button class="option-btn option-btn--default">A5</button>
            <button class="option-btn option-btn--default">A3</button>
            <button class="option-btn option-btn--default">Libro</button>
        </div>
    `,e},o={render:a,play:async({canvas:e})=>{let t=e.getByRole(`button`,{name:`A4`}),n=e.getByRole(`button`,{name:`A5`});await r(t).toHaveClass(`option-btn--selected`),await r(n).toHaveClass(`option-btn--default`)}},s=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--default">Opaco</button>
            <button class="option-btn option-btn--default">Lucido</button>
            <button class="option-btn option-btn--default">Satinato</button>
        </div>
    `,e},c=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--default">100g</button>
            <button class="option-btn option-btn--default">120g</button>
            <button class="option-btn option-btn--selected">170g</button>
            <button class="option-btn option-btn--default">200g</button>
            <button class="option-btn option-btn--default">300g</button>
        </div>
    `,e},l=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--borderless">Variante A</button>
            <button class="option-btn option-btn--borderless">Variante B</button>
            <button class="option-btn option-btn--selected">Variante C</button>
        </div>
    `,e},u=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--selected">A4</button>
            <button class="option-btn option-btn--default">A5</button>
            <button class="option-btn option-btn--default">A3</button>
            <button class="option-btn option-btn--default">Libro</button>
            <button class="option-btn option-btn--default">Personalizzato</button>
        </div>
    `,e},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: renderDefault,
  play: async ({
    canvas
  }) => {
    const a4 = canvas.getByRole('button', {
      name: 'A4'
    });
    const a5 = canvas.getByRole('button', {
      name: 'A5'
    });
    await expect(a4).toHaveClass('option-btn--selected');
    await expect(a5).toHaveClass('option-btn--default');
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--default">Opaco</button>
            <button class="option-btn option-btn--default">Lucido</button>
            <button class="option-btn option-btn--default">Satinato</button>
        </div>
    \`;
  return container;
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--default">100g</button>
            <button class="option-btn option-btn--default">120g</button>
            <button class="option-btn option-btn--selected">170g</button>
            <button class="option-btn option-btn--default">200g</button>
            <button class="option-btn option-btn--default">300g</button>
        </div>
    \`;
  return container;
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--borderless">Variante A</button>
            <button class="option-btn option-btn--borderless">Variante B</button>
            <button class="option-btn option-btn--selected">Variante C</button>
        </div>
    \`;
  return container;
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="option-btns-wrap">
            <button class="option-btn option-btn--selected">A4</button>
            <button class="option-btn option-btn--default">A5</button>
            <button class="option-btn option-btn--default">A3</button>
            <button class="option-btn option-btn--default">Libro</button>
            <button class="option-btn option-btn--default">Personalizzato</button>
        </div>
    \`;
  return container;
}`,...u.parameters?.docs?.source}}},d=[`Default`,`NoneSelected`,`ManyOptions`,`Borderless`,`ReferenceFromElementsUI`]}))();export{l as Borderless,o as Default,c as ManyOptions,s as NoneSelected,u as ReferenceFromElementsUI,d as __namedExportsOrder,i as default};