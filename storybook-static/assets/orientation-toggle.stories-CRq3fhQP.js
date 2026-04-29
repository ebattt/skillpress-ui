import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./tokens-DCff7C25.js";var n=e((()=>{})),r,i,a,o,s,c,l,u,d;e((()=>{t(),n(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={title:`Primitives/OrientationToggle`},a=`<svg width="10" height="14" viewBox="0 0 10 14" fill="none"><rect x="0.5" y="0.5" width="9" height="13" rx="1" stroke-width="1" fill="white"/></svg>`,o=`<svg width="14" height="10" viewBox="0 0 14 10" fill="none"><rect x="0.5" y="0.5" width="13" height="9" rx="1" stroke-width="1" fill="white"/></svg>`,s=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="orientation-toggle">
            <button class="orientation-btn orientation-btn--active">
                ${a}
                Verticale
            </button>
            <button class="orientation-btn">
                ${o}
                Orizzontale
            </button>
        </div>
    `,e},c={render:s,play:async({canvas:e})=>{let t=e.getByRole(`button`,{name:/Verticale/}),n=e.getByRole(`button`,{name:/Orizzontale/});await r(t).toHaveClass(`orientation-btn--active`),await r(n).not.toHaveClass(`orientation-btn--active`)}},l=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="orientation-toggle">
            <button class="orientation-btn">
                ${a}
                Verticale
            </button>
            <button class="orientation-btn orientation-btn--active">
                ${o}
                Orizzontale
            </button>
        </div>
    `,e},u=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="orientation-toggle">
            <button class="orientation-btn orientation-btn--active">
                ${a}
                Verticale
            </button>
            <button class="orientation-btn">
                ${o}
                Orizzontale
            </button>
        </div>
    `,e},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: renderDefault,
  play: async ({
    canvas
  }) => {
    const v = canvas.getByRole('button', {
      name: /Verticale/
    });
    const h = canvas.getByRole('button', {
      name: /Orizzontale/
    });
    await expect(v).toHaveClass('orientation-btn--active');
    await expect(h).not.toHaveClass('orientation-btn--active');
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="orientation-toggle">
            <button class="orientation-btn">
                \${verticalSVG}
                Verticale
            </button>
            <button class="orientation-btn orientation-btn--active">
                \${horizontalSVG}
                Orizzontale
            </button>
        </div>
    \`;
  return container;
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="orientation-toggle">
            <button class="orientation-btn orientation-btn--active">
                \${verticalSVG}
                Verticale
            </button>
            <button class="orientation-btn">
                \${horizontalSVG}
                Orizzontale
            </button>
        </div>
    \`;
  return container;
}`,...u.parameters?.docs?.source}}},d=[`Default`,`HorizontalActive`,`ReferenceFromElementsUI`]}))();export{c as Default,l as HorizontalActive,u as ReferenceFromElementsUI,d as __namedExportsOrder,i as default};