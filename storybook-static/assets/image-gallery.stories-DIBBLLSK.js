import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./image-gallery-Degwgedr.js";var n,r,i,a,o,s,c,l,u,d,f,p;e((()=>{t(),n=new URL(``+new URL(`brossurafresata2-BCptX5R_.png`,import.meta.url).href,``+import.meta.url).href,r=new URL(``+new URL(`brossurafresata3-lrTlBnfQ.png`,import.meta.url).href,``+import.meta.url).href,i=new URL(``+new URL(`brossuraFresata4-63_V7Hi7.png`,import.meta.url).href,``+import.meta.url).href,a=`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
`,o=`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
`,s=({src:e=n,alt:t=`Brossura fresata vista frontale`,withNav:s=!0,withShadow:c=!0}={})=>{let l=document.createElement(`div`);return l.innerHTML=`
        <div class="hero-image-gallery">
            <div class="hero-image-container ${c?`product-shadow`:``}"
                 data-images='${JSON.stringify([{src:n,alt:`Brossura fresata vista frontale`},{src:r,alt:`Brossura fresata vista laterale`},{src:i,alt:`Brossura fresata dettaglio`}])}'>
                <img src="${e}" alt="${t}" />
                ${s?`
                <button class="hero-nav-btn hero-nav-btn--prev" aria-label="Immagine precedente">${a}</button>
                <button class="hero-nav-btn hero-nav-btn--next" aria-label="Immagine successiva">${o}</button>
                `:``}
            </div>
        </div>
    `,l},c={title:`Components/ImageGallery`,tags:[`autodocs`],parameters:{docs:{description:{component:`Galleria immagine prodotto: container quadrato con immagine principale e bottoni nav prev/next. Behavior galleria fuori scope (Strategia A static snapshot). Il CMS popola data-images, la pagina demo gestisce il cambio.`}}}},l={render:()=>s()},u={render:()=>s({src:n,alt:`Brossura fresata vista frontale`}),parameters:{docs:{description:{story:`Markup verbatim dalla pagina demo product-page-integration. Tre immagini in data-images, prima visibile, prev/next presenti senza listener.`}}}},d={render:()=>s({withShadow:!1}),parameters:{docs:{description:{story:`Container senza modifier .product-shadow.`}}}},f={render:()=>s({withNav:!1}),parameters:{docs:{description:{story:`Solo immagine, nessun bottone nav. Variante per CMS con singola immagine.`}}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => renderGallery()
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}},p=[`Default`,`ReferenceFromElementsUI`,`WithoutShadow`,`WithoutNav`]}))();export{l as Default,u as ReferenceFromElementsUI,f as WithoutNav,d as WithoutShadow,p as __namedExportsOrder,c as default};