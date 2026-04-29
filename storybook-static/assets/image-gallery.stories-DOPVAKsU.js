import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./image-gallery-GlOYuoJI.js";var n,r,i,a,o,s,c,l,u,d,f,p,m;e((()=>{t(),{expect:n}=__STORYBOOK_MODULE_TEST__,r=new URL(``+new URL(`brossurafresata2-BCptX5R_.png`,import.meta.url).href,``+import.meta.url).href,i=new URL(``+new URL(`brossurafresata3-lrTlBnfQ.png`,import.meta.url).href,``+import.meta.url).href,a=new URL(``+new URL(`brossuraFresata4-63_V7Hi7.png`,import.meta.url).href,``+import.meta.url).href,o=`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
`,s=`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
`,c=({src:e=r,alt:t=`Brossura fresata vista frontale`,withNav:n=!0,withShadow:c=!0}={})=>{let l=document.createElement(`div`);return l.innerHTML=`
        <div class="hero-image-gallery">
            <div class="hero-image-container ${c?`product-shadow`:``}"
                 data-images='${JSON.stringify([{src:r,alt:`Brossura fresata vista frontale`},{src:i,alt:`Brossura fresata vista laterale`},{src:a,alt:`Brossura fresata dettaglio`}])}'>
                <img src="${e}" alt="${t}" />
                ${n?`
                <button class="hero-nav-btn hero-nav-btn--prev" aria-label="Immagine precedente">${o}</button>
                <button class="hero-nav-btn hero-nav-btn--next" aria-label="Immagine successiva">${s}</button>
                `:``}
            </div>
        </div>
    `,l},l={title:`Components/ImageGallery`,tags:[`autodocs`],parameters:{docs:{description:{component:`Galleria immagine prodotto: container quadrato con immagine principale e bottoni nav prev/next. Behavior galleria fuori scope (Strategia A static snapshot). Il CMS popola data-images, la pagina demo gestisce il cambio.`}}}},u={render:()=>c(),play:async({canvas:e})=>{let t=e.getByRole(`button`,{name:/precedente/i}),r=e.getByRole(`button`,{name:/success/i});await n(t).toHaveClass(`hero-nav-btn--prev`),await n(r).toHaveClass(`hero-nav-btn--next`)}},d={render:()=>c({src:r,alt:`Brossura fresata vista frontale`}),parameters:{docs:{description:{story:`Markup verbatim dalla pagina demo product-page-integration. Tre immagini in data-images, prima visibile, prev/next presenti senza listener.`}}}},f={render:()=>c({withShadow:!1}),parameters:{docs:{description:{story:`Container senza modifier .product-shadow.`}}}},p={render:()=>c({withNav:!1}),parameters:{docs:{description:{story:`Solo immagine, nessun bottone nav. Variante per CMS con singola immagine.`}}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderGallery(),
  play: async ({
    canvas
  }) => {
    const prev = canvas.getByRole('button', {
      name: /precedente/i
    });
    const next = canvas.getByRole('button', {
      name: /success/i
    });
    await expect(prev).toHaveClass('hero-nav-btn--prev');
    await expect(next).toHaveClass('hero-nav-btn--next');
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => renderGallery({
    src: imageFront,
    alt: 'Brossura fresata vista frontale'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Markup verbatim dalla pagina demo product-page-integration. Tre immagini in data-images, prima visibile, prev/next presenti senza listener.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => renderGallery({
    withShadow: false
  }),
  parameters: {
    docs: {
      description: {
        story: 'Container senza modifier .product-shadow.'
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => renderGallery({
    withNav: false
  }),
  parameters: {
    docs: {
      description: {
        story: 'Solo immagine, nessun bottone nav. Variante per CMS con singola immagine.'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`ReferenceFromElementsUI`,`WithoutShadow`,`WithoutNav`]}))();export{u as Default,d as ReferenceFromElementsUI,p as WithoutNav,f as WithoutShadow,m as __namedExportsOrder,l as default};