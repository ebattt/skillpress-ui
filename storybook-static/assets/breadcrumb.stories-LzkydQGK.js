import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s;e((()=>{({expect:t}=__STORYBOOK_MODULE_TEST__),n=(e=[])=>{let t=document.createElement(`div`);return t.innerHTML=`
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
    `,t},r={title:`Primitives/Breadcrumb`,tags:[`autodocs`],parameters:{docs:{description:{component:`Breadcrumb statico con markup Schema.org BreadcrumbList. La libreria controlla layout, separatore e colori; il backend controlla testo, URL e voce corrente.`}}}},i={render:()=>n([{label:`Homepage`,href:`/homepage`},{label:`Libri Cataloghi Riviste`,href:`/libri-cataloghi-riviste`},{label:`Brossura fresata`,current:!0}]),play:async({canvas:e})=>{await t(e.getByRole(`navigation`,{name:/Breadcrumb/})).toBeInTheDocument(),await t(e.getByRole(`link`,{name:`Homepage`})).toHaveAttribute(`href`,`/homepage`),await t(e.getByText(`Brossura fresata`).closest(`li`)).toHaveClass(`breadcrumb__item--current`)}},a={render:()=>n([{label:`Homepage`,href:`/homepage`},{label:`Biglietti da visita`,current:!0}])},o={render:()=>{let e=document.createElement(`div`);return e.style.maxWidth=`760px`,e.innerHTML=`
            <div style="display: grid; gap: 16px;">
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/layout-patterns/breadcrumb.js</code>: 3 livelli.
                    </p>
                    ${n([{label:`Homepage`,href:`/homepage`},{label:`Libri Cataloghi Riviste`,href:`/libri-cataloghi-riviste`},{label:`Brossura fresata`,current:!0}]).innerHTML}
                </div>
                <div>
                    <p style="margin: 0 0 8px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        Riferimento <code>elements-ui/js/layout-patterns/breadcrumb.js</code>: 2 livelli.
                    </p>
                    ${n([{label:`Homepage`,href:`/homepage`},{label:`Biglietti da visita`,current:!0}]).innerHTML}
                </div>
            </div>
        `,e}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: () => renderBreadcrumb([{
    label: 'Homepage',
    href: '/homepage'
  }, {
    label: 'Libri Cataloghi Riviste',
    href: '/libri-cataloghi-riviste'
  }, {
    label: 'Brossura fresata',
    current: true
  }]),
  play: async ({
    canvas
  }) => {
    const nav = canvas.getByRole('navigation', {
      name: /Breadcrumb/
    });
    await expect(nav).toBeInTheDocument();
    await expect(canvas.getByRole('link', {
      name: 'Homepage'
    })).toHaveAttribute('href', '/homepage');
    const current = canvas.getByText('Brossura fresata');
    await expect(current.closest('li')).toHaveClass('breadcrumb__item--current');
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => renderBreadcrumb([{
    label: 'Homepage',
    href: '/homepage'
  }, {
    label: 'Biglietti da visita',
    current: true
  }])
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}},s=[`Default`,`TwoLevels`,`ReferenceFromElementsUI`]}))();export{i as Default,o as ReferenceFromElementsUI,a as TwoLevels,s as __namedExportsOrder,r as default};