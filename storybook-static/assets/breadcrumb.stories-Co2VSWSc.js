import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o;e((()=>{t=(e=[])=>{let t=document.createElement(`div`);return t.innerHTML=`
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <ol class="breadcrumb__list" itemscope itemtype="https://schema.org/BreadcrumbList">
                ${e.map((e,t)=>{let n=e.current===!0;return`
            <li class="${`breadcrumb__item${n?` breadcrumb__item--current`:``}`}" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                ${n?`<span itemprop="name">${e.label}</span>`:`<a class="breadcrumb__link" itemprop="item" href="${e.href||`#`}"><span itemprop="name">${e.label}</span></a>`}
                <meta itemprop="position" content="${t+1}"/>
            </li>
        `}).join(``)}
            </ol>
        </nav>
    `,t},n={title:`Primitives/Breadcrumb`,tags:[`autodocs`],parameters:{docs:{description:{component:`Breadcrumb statico con markup Schema.org BreadcrumbList. La libreria controlla layout, separatore e colori; il backend controlla testo, URL e voce corrente.`}}}},r={render:()=>t([{label:`Homepage`,href:`/homepage`},{label:`Libri Cataloghi Riviste`,href:`/libri-cataloghi-riviste`},{label:`Brossura fresata`,current:!0}])},i={render:()=>t([{label:`Homepage`,href:`/homepage`},{label:`Biglietti da visita`,current:!0}])},a={render:()=>{let e=document.createElement(`div`);return e.style.maxWidth=`760px`,e.innerHTML=`
            <div style="display: grid; gap: 16px;">
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/layout-patterns/breadcrumb.js</code>: 3 livelli.
                    </p>
                    ${t([{label:`Homepage`,href:`/homepage`},{label:`Libri Cataloghi Riviste`,href:`/libri-cataloghi-riviste`},{label:`Brossura fresata`,current:!0}]).innerHTML}
                </div>
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/layout-patterns/breadcrumb.js</code>: 2 livelli.
                    </p>
                    ${t([{label:`Homepage`,href:`/homepage`},{label:`Biglietti da visita`,current:!0}]).innerHTML}
                </div>
            </div>
        `,e}},r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => renderBreadcrumb([{
    label: 'Homepage',
    href: '/homepage'
  }, {
    label: 'Libri Cataloghi Riviste',
    href: '/libri-cataloghi-riviste'
  }, {
    label: 'Brossura fresata',
    current: true
  }])
}`,...r.parameters?.docs?.source}}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => renderBreadcrumb([{
    label: 'Homepage',
    href: '/homepage'
  }, {
    label: 'Biglietti da visita',
    current: true
  }])
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const root = document.createElement('div');
    root.style.maxWidth = '760px';
    root.innerHTML = \`
            <div style="display: grid; gap: 16px;">
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/layout-patterns/breadcrumb.js</code>: 3 livelli.
                    </p>
                    \${renderBreadcrumb([{
      label: 'Homepage',
      href: '/homepage'
    }, {
      label: 'Libri Cataloghi Riviste',
      href: '/libri-cataloghi-riviste'
    }, {
      label: 'Brossura fresata',
      current: true
    }]).innerHTML}
                </div>
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/layout-patterns/breadcrumb.js</code>: 2 livelli.
                    </p>
                    \${renderBreadcrumb([{
      label: 'Homepage',
      href: '/homepage'
    }, {
      label: 'Biglietti da visita',
      current: true
    }]).innerHTML}
                </div>
            </div>
        \`;
    return root;
  }
}`,...a.parameters?.docs?.source}}},o=[`Default`,`TwoLevels`,`ReferenceFromElementsUI`]}))();export{r as Default,a as ReferenceFromElementsUI,i as TwoLevels,o as __namedExportsOrder,n as default};