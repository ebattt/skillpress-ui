import{t as e}from"./chunk-BvrOYcoh.js";var t=e((()=>{})),n,r,i,a,o,s,c,l,u,d,f,p,m,h,g;e((()=>{t(),{expect:n}=__STORYBOOK_MODULE_TEST__,r=`https://placehold.co/200x200/f7f7f8/9ca3af?text=Prodotto`,i=e=>{let t=document.createElement(`div`);return t.style.padding=`1rem 0`,t.innerHTML=e,t},a=({href:e=`#`,title:t=`Prodotto`,src:n=r,alt:i=`Prodotto`}={})=>`
    <a href="${e}" class="catalog-card catalog-card--product-equal">
        <h3 class="catalog-card__title">${t}</h3>
        <div class="catalog-card__image-wrap">
            <img class="catalog-card__image catalog-card__image--product" src="${n}" alt="${i}" loading="lazy">
        </div>
    </a>
`,o=({label:e=`Potrebbe piacerti anche`,items:t=[]}={})=>`
    <section class="related-section" aria-label="Prodotti correlati">
        <h2 class="catalog-section-label">${e}</h2>
        <div class="catalog-grid catalog-grid--products">
            ${t.map(a).join(``)}
        </div>
    </section>
`,s=[{href:`/products/carte-da-gioco`,title:`Carte da gioco`,alt:`Carte da gioco`},{href:`/products/riviste-magazine`,title:`Riviste e magazine`,alt:`Riviste`},{href:`/products/block-notes`,title:`Block notes`,alt:`Block notes`},{href:`/products/cartonato`,title:`Cartonato`,alt:`Cartonato`},{href:`/products/punto-metallico`,title:`Punto metallico`,alt:`Punto metallico`}],c=s.slice(0,3),l={title:`Components/RelatedProducts`,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:`Sezione "Potrebbe piacerti anche": griglia responsive 5/3/2 colonne di card prodotto correlato (anchor click-anywhere con titolo + immagine + arrow notch in basso a destra). CSS-only, niente JS libreria. Hover: arrow scale 1.12 + colore scuro, immagine scale 1.05.`}}}},u={render:()=>i(o({items:s})),play:async({canvasElement:e})=>{await n(e.querySelectorAll(`.catalog-card`).length).toBe(5)},parameters:{docs:{description:{story:`Snapshot 5 prodotti correlati (desktop ≥1024px → 5 colonne).`}}}},d={render:()=>i(o({items:s})),parameters:{docs:{description:{story:"Markup verbatim da `product-page-integration/index.html#L590-L624` + qualificazioni `.related-section` da `_layout-patterns.css#L1804-L1825`. Asset placeholder al posto delle immagini demo locali."}}}},f={render:()=>i(o({items:c})),parameters:{docs:{description:{story:`Sezione con 3 prodotti correlati. La grid riempie le prime 3 celle dello slot a 5 colonne e lascia vuote le restanti.`}}}},p={render:()=>i(o({items:s})),parameters:{viewport:{defaultViewport:`tablet`},docs:{description:{story:`Viewport tablet (<1024px): 3 colonne. Le ultime 2 card vanno a capo.`}}}},m={render:()=>i(o({items:s})),parameters:{viewport:{defaultViewport:`mobile1`},docs:{description:{story:"Viewport mobile (<640px): 2 colonne, gap 0.75rem, immagine `width: min(100%, 150px)`."}}}},h={render:()=>i(o({label:`Altri prodotti`,items:s})),parameters:{docs:{description:{story:'Label sezione personalizzata (`<h2 class="catalog-section-label">`). Il CMS puo\' iniettare qualunque testo.'}}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSection({
    items: FIVE_PRODUCTS
  })),
  play: async ({
    canvasElement
  }) => {
    const cards = canvasElement.querySelectorAll('.catalog-card');
    await expect(cards.length).toBe(5);
  },
  parameters: {
    docs: {
      description: {
        story: 'Snapshot 5 prodotti correlati (desktop ≥1024px → 5 colonne).'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSection({
    items: FIVE_PRODUCTS
  })),
  parameters: {
    docs: {
      description: {
        story: 'Markup verbatim da \`product-page-integration/index.html#L590-L624\` + qualificazioni \`.related-section\` da \`_layout-patterns.css#L1804-L1825\`. Asset placeholder al posto delle immagini demo locali.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSection({
    items: THREE_PRODUCTS
  })),
  parameters: {
    docs: {
      description: {
        story: 'Sezione con 3 prodotti correlati. La grid riempie le prime 3 celle dello slot a 5 colonne e lascia vuote le restanti.'
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSection({
    items: FIVE_PRODUCTS
  })),
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Viewport tablet (<1024px): 3 colonne. Le ultime 2 card vanno a capo.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSection({
    items: FIVE_PRODUCTS
  })),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Viewport mobile (<640px): 2 colonne, gap 0.75rem, immagine \`width: min(100%, 150px)\`.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSection({
    label: 'Altri prodotti',
    items: FIVE_PRODUCTS
  })),
  parameters: {
    docs: {
      description: {
        story: 'Label sezione personalizzata (\`<h2 class="catalog-section-label">\`). Il CMS puo\\' iniettare qualunque testo.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`ReferenceFromElementsUI`,`ThreeProducts`,`Tablet`,`Mobile`,`CustomLabel`]}))();export{h as CustomLabel,u as Default,m as Mobile,d as ReferenceFromElementsUI,p as Tablet,f as ThreeProducts,g as __namedExportsOrder,l as default};