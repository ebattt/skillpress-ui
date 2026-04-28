import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./rating-DbGjwd-C.js";var n,r,i,a,o,s,c,l;e((()=>{t(),n=(e=100)=>{let t=document.createElement(`div`);return t.style.display=`inline-flex`,t.style.alignItems=`center`,t.style.gap=`0.625rem`,t.innerHTML=`
        <div class="stars-outer">
            <div class="stars-empty">
                <span class="star-icon">&#9733;</span>
                <span class="star-icon">&#9733;</span>
                <span class="star-icon">&#9733;</span>
                <span class="star-icon">&#9733;</span>
                <span class="star-icon">&#9733;</span>
            </div>
            <div class="stars-filled" style="width: ${e}%;">
                <span class="star-icon">&#9733;</span>
                <span class="star-icon">&#9733;</span>
                <span class="star-icon">&#9733;</span>
                <span class="star-icon">&#9733;</span>
                <span class="star-icon">&#9733;</span>
            </div>
        </div>
    `,t},r=()=>{let e=document.createElement(`div`);return e.style.display=`flex`,e.style.flexDirection=`column`,e.style.gap=`0.75rem`,e.style.fontFamily=`inherit`,[5,4.85,4,3.5,2.2,0].forEach(t=>{let n=document.createElement(`div`);n.style.display=`flex`,n.style.alignItems=`center`,n.style.gap=`0.75rem`;let r=t/5*100;n.innerHTML=`
            <span style="min-width: 3rem; font-weight: 600;">${t.toFixed(2)}</span>
            <div class="stars-outer">
                <div class="stars-empty">
                    <span class="star-icon">&#9733;</span>
                    <span class="star-icon">&#9733;</span>
                    <span class="star-icon">&#9733;</span>
                    <span class="star-icon">&#9733;</span>
                    <span class="star-icon">&#9733;</span>
                </div>
                <div class="stars-filled" style="width: ${r}%;">
                    <span class="star-icon">&#9733;</span>
                    <span class="star-icon">&#9733;</span>
                    <span class="star-icon">&#9733;</span>
                    <span class="star-icon">&#9733;</span>
                    <span class="star-icon">&#9733;</span>
                </div>
            </div>
            <span style="color: var(--color-text-light); font-size: var(--font-size-sm);">${Math.round(r)}%</span>
        `,e.appendChild(n)}),e},i={title:`Primitives/Rating`,tags:[`autodocs`],parameters:{docs:{description:{component:`Rating CSS-only a stelle sovrapposte. La percentuale di riempimento viene controllata via inline style sulla larghezza di .stars-filled. Calcolo: (rating / 5) * 100.`}}}},a={render:()=>n(97)},o={render:()=>r(),parameters:{docs:{description:{story:`Tutti i livelli di rating (0, 2.2, 3.5, 4, 4.85, 5) renderizzati con lo stesso markup, cambia solo width inline.`}}}},s={render:()=>n(0)},c={render:()=>n(100)},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => renderRating(97)
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderScale(),
  parameters: {
    docs: {
      description: {
        story: 'Tutti i livelli di rating (0, 2.2, 3.5, 4, 4.85, 5) renderizzati con lo stesso markup, cambia solo width inline.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => renderRating(0)
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => renderRating(100)
}`,...c.parameters?.docs?.source}}},l=[`Default`,`Scale`,`Empty`,`Full`]}))();export{a as Default,s as Empty,c as Full,o as Scale,l as __namedExportsOrder,i as default};