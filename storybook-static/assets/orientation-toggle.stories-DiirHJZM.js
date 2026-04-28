import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./tokens-Ddq7tPyK.js";var n=e((()=>{})),r,i,a,o,s,c,l;e((()=>{t(),n(),r={title:`Primitives/OrientationToggle`},i=`<svg width="10" height="14" viewBox="0 0 10 14" fill="none"><rect x="0.5" y="0.5" width="9" height="13" rx="1" stroke-width="1" fill="white"/></svg>`,a=`<svg width="14" height="10" viewBox="0 0 14 10" fill="none"><rect x="0.5" y="0.5" width="13" height="9" rx="1" stroke-width="1" fill="white"/></svg>`,o=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="orientation-toggle">
            <button class="orientation-btn orientation-btn--active">
                ${i}
                Verticale
            </button>
            <button class="orientation-btn">
                ${a}
                Orizzontale
            </button>
        </div>
    `,e},s=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="orientation-toggle">
            <button class="orientation-btn">
                ${i}
                Verticale
            </button>
            <button class="orientation-btn orientation-btn--active">
                ${a}
                Orizzontale
            </button>
        </div>
    `,e},c=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="orientation-toggle">
            <button class="orientation-btn orientation-btn--active">
                ${i}
                Verticale
            </button>
            <button class="orientation-btn">
                ${a}
                Orizzontale
            </button>
        </div>
    `,e},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
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
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
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
}`,...c.parameters?.docs?.source}}},l=[`Default`,`HorizontalActive`,`ReferenceFromElementsUI`]}))();export{o as Default,s as HorizontalActive,c as ReferenceFromElementsUI,l as __namedExportsOrder,r as default};