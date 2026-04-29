import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./rating-xo5-cHaY.js";var n,r,i,a,o,s,c,l,u;e((()=>{t(),{expect:n}=__STORYBOOK_MODULE_TEST__,r=(e=100)=>{let t=document.createElement(`div`);return t.style.display=`inline-flex`,t.style.alignItems=`center`,t.style.gap=`0.625rem`,t.innerHTML=`
        <div class="rating">
            <div class="rating__empty">
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
            </div>
            <div class="rating__filled" style="width: ${e}%;">
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
                <span class="rating__star">&#9733;</span>
            </div>
        </div>
    `,t},i=()=>{let e=document.createElement(`div`);return e.style.display=`flex`,e.style.flexDirection=`column`,e.style.gap=`0.75rem`,e.style.fontFamily=`inherit`,[5,4.85,4,3.5,2.2,0].forEach(t=>{let n=document.createElement(`div`);n.style.display=`flex`,n.style.alignItems=`center`,n.style.gap=`0.75rem`;let r=t/5*100;n.innerHTML=`
            <span style="min-width: 3rem; font-weight: 600;">${t.toFixed(2)}</span>
            <div class="rating">
                <div class="rating__empty">
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                </div>
                <div class="rating__filled" style="width: ${r}%;">
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                    <span class="rating__star">&#9733;</span>
                </div>
            </div>
            <span style="color: var(--color-text-light); font-size: var(--font-size-sm);">${Math.round(r)}%</span>
        `,e.appendChild(n)}),e},a={title:`Primitives/Rating`,tags:[`autodocs`],parameters:{docs:{description:{component:`Rating CSS-only a stelle sovrapposte. La percentuale di riempimento viene controllata via inline style sulla larghezza di .rating__filled. Calcolo: (rating / 5) * 100.`}}}},o={render:()=>r(97),play:async({canvasElement:e})=>{let t=e.querySelector(`.rating__filled`);await n(t).toBeTruthy(),await n(t.style.width).toBe(`97%`)}},s={render:()=>i(),parameters:{docs:{description:{story:`Tutti i livelli di rating (0, 2.2, 3.5, 4, 4.85, 5) renderizzati con lo stesso markup, cambia solo width inline.`}}}},c={render:()=>r(0)},l={render:()=>r(100)},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderRating(97),
  play: async ({
    canvasElement
  }) => {
    const filled = canvasElement.querySelector('.rating__filled');
    await expect(filled).toBeTruthy();
    await expect(filled.style.width).toBe('97%');
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => renderScale(),
  parameters: {
    docs: {
      description: {
        story: 'Tutti i livelli di rating (0, 2.2, 3.5, 4, 4.85, 5) renderizzati con lo stesso markup, cambia solo width inline.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => renderRating(0)
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => renderRating(100)
}`,...l.parameters?.docs?.source}}},u=[`Default`,`Scale`,`Empty`,`Full`]}))();export{o as Default,c as Empty,l as Full,s as Scale,u as __namedExportsOrder,a as default};