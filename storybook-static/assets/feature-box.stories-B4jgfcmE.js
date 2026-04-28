import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l;e((()=>{t=({title:e=`Veloce`,description:t=`Stampa con ciclo rapido.`,iconBg:n=`#E8F5F3`,iconColor:r=`#1C7264`,iconSvg:i=``}={})=>`
        <div class="feature-box">
            <div class="feature-box-content">
                <div class="feature-box-icon" style="background-color: ${n}; color: ${r};">
                    ${i}
                </div>
                <div>
                    <h3 class="feature-box-title">${e}</h3>
                    <p class="feature-box-description">${t}</p>
                </div>
            </div>
        </div>
    `,n={bolt:`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
    `,savings:`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 11c0-3 2.7-5.5 7-5.5s7 2.5 7 5.5-2.7 5.5-7 5.5S5 14 5 11Z" stroke="currentColor" stroke-width="2" />
        <path d="M8 16.5V20h3M16 16.5V20h-3M9 10h.01M15 10h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
    `,premium:`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
    </svg>
    `,tune:`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7h8M16 7h4M4 17h4M12 17h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <circle cx="14" cy="7" r="2" stroke="currentColor" stroke-width="2" />
        <circle cx="10" cy="17" r="2" stroke="currentColor" stroke-width="2" />
    </svg>
    `},r=[{title:`Veloce`,description:`Stampa brossura fresata con ciclo rapido`,iconBg:`#E8F5F3`,iconColor:`#1C7264`,iconSvg:n.bolt},{title:`Economica`,description:`Miglior rapporto qualita/prezzo`,iconBg:`#FEF3E6`,iconColor:`#F08A00`,iconSvg:n.savings},{title:`Professionale`,description:`Finiture curate e nobilitazioni`,iconBg:`#E6ECEE`,iconColor:`#003E51`,iconSvg:n.premium},{title:`Personalizzabile`,description:`Scegli formato e carta`,iconBg:`#E9F5F2`,iconColor:`#298979`,iconSvg:n.tune}],i=e=>{let n=document.createElement(`div`);return n.style.maxWidth=`760px`,n.innerHTML=`
        <div class="feature-grid">
            ${e.map(t).join(``)}
        </div>
    `,n},a={title:`Components/FeatureBox`,tags:[`autodocs`],parameters:{docs:{description:{component:`Griglia feature 2 colonne. Il backend controlla testo, numero di box e contenuto dell'icona (inline SVG o img da URL CMS). La libreria fornisce griglia, contenitore icona e tipografia.`}}}},o={render:()=>i(r)},s={render:()=>{let e=document.createElement(`div`);return e.style.maxWidth=`760px`,e.innerHTML=`
            <div class="feature-grid">
                ${r.map(t).join(``)}
            </div>
        `,e}},c={render:()=>i(r)},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderGrid(productBoxes)
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const root = document.createElement('div');
    root.style.maxWidth = '760px';
    root.innerHTML = \`
            <div class="feature-grid">
                \${productBoxes.map(renderFeatureBox).join('')}
            </div>
        \`;
    return root;
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => renderGrid(productBoxes)
}`,...c.parameters?.docs?.source}}},l=[`Default`,`ReferenceFromElementsUI`,`ComposedForCMS`]}))();export{c as ComposedForCMS,o as Default,s as ReferenceFromElementsUI,l as __namedExportsOrder,a as default};