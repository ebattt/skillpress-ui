import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c;e((()=>{({expect:t}=__STORYBOOK_MODULE_TEST__),n=({variantClasses:e=``,title:t=`Card base`,description:n=`Primitiva tecnica: superficie condivisa, non componente CMS.`,disabled:r=!1}={})=>{let i=document.createElement(`div`);return i.innerHTML=`
        <article class="${[`card`,e,r?`card--disabled`:``].filter(Boolean).join(` `)}"${r?` aria-disabled="true"`:``}>
            <div class="card__body">
                <h3 class="card__title">${t}</h3>
                <p class="card__description">${n}</p>
            </div>
        </article>
    `,i},r=e=>{let t=document.createElement(`div`);return t.innerHTML=`
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; max-width: 860px;">
            ${e.map(e=>n(e).innerHTML).join(``)}
        </div>
    `,t},i={title:`Primitives/Card`,tags:[`autodocs`],parameters:{docs:{description:{component:`Card base della libreria Skillpress. E una primitiva di superficie e slot: non sostituisce product card, feature card, selection card, step card o dashboard order card.`}}}},a={render:()=>{let e=document.createElement(`div`);return e.style.maxWidth=`360px`,e.innerHTML=n({title:`Card base`,description:`Solo superficie tecnica per componenti futuri tracciati nella matrice.`}).innerHTML,e},play:async({canvas:e})=>{await t(e.getByRole(`heading`,{name:`Card base`})).toBeInTheDocument(),await t(e.getByText(/superficie tecnica/i)).toBeInTheDocument()}},o={render:()=>r([{title:`Interattiva`,description:`Stato tecnico per componenti futuri.`,variantClasses:`card--interactive`},{title:`Selezionata`,description:`Stato tecnico, non UI finale.`,variantClasses:`card--selected`},{title:`Non disponibile`,description:`Stato tecnico senza logica JS.`,variantClasses:`card--interactive`,disabled:!0}])},s={render:()=>{let e=document.createElement(`div`);return e.style.maxWidth=`760px`,e.innerHTML=`
            <div style="font: inherit; color: var(--color-text);">
                <h3 style="margin: 0 0 8px; font-size: var(--font-size-base);">Nessuna card reale coperta 1:1</h3>
                <p style="margin: 0 0 16px; color: var(--color-text-secondary); font-size: var(--font-size-sm); line-height: var(--line-height-normal);">
                    Questa primitiva non corrisponde visivamente a una card CMS. Le card reali da estrarre sono tracciate nella matrice di copertura.
                </p>
                <ul style="display: grid; gap: 8px; margin: 0; padding-left: 18px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                    <li><code>format-card</code> / <code>paper-card</code> / <code>visual-card</code>: futura selection card.</li>
                    <li><code>feature-box</code>: futura feature card.</li>
                    <li><code>step-card-item</code>: futuro step indicator.</li>
                    <li><code>catalog-card--product-equal</code>: futura product/catalog card.</li>
                </ul>
            </div>
        `,e}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    const root = document.createElement('div');
    root.style.maxWidth = '360px';
    root.innerHTML = renderCard({
      title: 'Card base',
      description: 'Solo superficie tecnica per componenti futuri tracciati nella matrice.'
    }).innerHTML;
    return root;
  },
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole('heading', {
      name: 'Card base'
    })).toBeInTheDocument();
    await expect(canvas.getByText(/superficie tecnica/i)).toBeInTheDocument();
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderGrid([{
    title: 'Interattiva',
    description: 'Stato tecnico per componenti futuri.',
    variantClasses: 'card--interactive'
  }, {
    title: 'Selezionata',
    description: 'Stato tecnico, non UI finale.',
    variantClasses: 'card--selected'
  }, {
    title: 'Non disponibile',
    description: 'Stato tecnico senza logica JS.',
    variantClasses: 'card--interactive',
    disabled: true
  }])
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const root = document.createElement('div');
    root.style.maxWidth = '760px';
    root.innerHTML = \`
            <div style="font: inherit; color: var(--color-text);">
                <h3 style="margin: 0 0 8px; font-size: var(--font-size-base);">Nessuna card reale coperta 1:1</h3>
                <p style="margin: 0 0 16px; color: var(--color-text-secondary); font-size: var(--font-size-sm); line-height: var(--line-height-normal);">
                    Questa primitiva non corrisponde visivamente a una card CMS. Le card reali da estrarre sono tracciate nella matrice di copertura.
                </p>
                <ul style="display: grid; gap: 8px; margin: 0; padding-left: 18px; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                    <li><code>format-card</code> / <code>paper-card</code> / <code>visual-card</code>: futura selection card.</li>
                    <li><code>feature-box</code>: futura feature card.</li>
                    <li><code>step-card-item</code>: futuro step indicator.</li>
                    <li><code>catalog-card--product-equal</code>: futura product/catalog card.</li>
                </ul>
            </div>
        \`;
    return root;
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`,`InteractiveStates`,`ReferenceFromElementsUI`]}))();export{a as Default,o as InteractiveStates,s as ReferenceFromElementsUI,c as __namedExportsOrder,i as default};