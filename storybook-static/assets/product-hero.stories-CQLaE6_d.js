import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./image-gallery-VrfwpG4P.js";import{t as n}from"./rating-fI1HA7un.js";var r=e((()=>{})),i=e((()=>{})),a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{n(),t(),r(),i(),a=new URL(``+new URL(`brossurafresata2-BCptX5R_.png`,import.meta.url).href,``+import.meta.url).href,o=new URL(``+new URL(`brossurafresata3-lrTlBnfQ.png`,import.meta.url).href,``+import.meta.url).href,s=`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m15 18-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
`,c=`
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m9 18 6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
`,l={bolt:`
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
    `},u=[{src:`assets/brossura_fresata/brossurafresata2.png`,alt:`Brossura fresata vista frontale`},{src:`assets/brossura_fresata/brossurafresata3.png`,alt:`Brossura fresata vista laterale`},{src:`assets/brossura_fresata/brossuraFresata4.png`,alt:`Brossura fresata dettaglio`}],d=[{title:`Veloce`,description:`Stampa brossura fresata con ciclo rapido`,iconBg:`#E8F5F3`,iconColor:`#1C7264`,iconSvg:l.bolt},{title:`Economica`,description:`Miglior rapporto qualita/prezzo`,iconBg:`#FEF3E6`,iconColor:`#F08A00`,iconSvg:l.savings},{title:`Professionale`,description:`Finiture curate e nobilitazioni`,iconBg:`#E6ECEE`,iconColor:`#003E51`,iconSvg:l.premium},{title:`Personalizzabile`,description:`Scegli formato e carta`,iconBg:`#E9F5F2`,iconColor:`#298979`,iconSvg:l.tune}],f=(e=97)=>`
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
`,p=({title:e,description:t,iconBg:n,iconColor:r,iconSvg:i})=>`
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
`,m=({imageSrc:e=a,imageAlt:t=`Brossura fresata vista frontale`,rating:n=`4.85`,reviewCount:r=`52 recensioni`,starsPercent:i=97}={})=>{let o=document.createElement(`div`);return o.innerHTML=`
        <div id="product-hero" class="product-hero">
            <div class="hero-grid">
                <div class="hero-image-gallery">
                    <div class="hero-image-container product-shadow" data-images='${JSON.stringify(u)}'>
                        <img id="mainProductImage" src="${e}" alt="${t}">
                        <button id="prevImageBtn" class="hero-nav-btn hero-nav-btn--prev" aria-label="Immagine precedente">
                            ${s}
                        </button>
                        <button id="nextImageBtn" class="hero-nav-btn hero-nav-btn--next" aria-label="Immagine successiva">
                            ${c}
                        </button>
                    </div>
                </div>
                <div class="hero-info">
                    <h1 class="hero-title">Brossura fresata</h1>
                    <div class="hero-rating">
                        <span class="hero-rating-value">${n}</span>
                        ${f(i)}
                        <span class="hero-review-count">${r}</span>
                    </div>
                    <p class="hero-description">La brossura fresata e una tecnica di rilegatura economica e resistente, ideale per libri voluminosi come romanzi e manuali. Le pagine vengono fresate per una maggiore aderenza della colla e unite a una copertina personalizzabile in cartoncino, garantendo una finitura professionale ed esteticamente accattivante.</p>
                    <div class="feature-grid">
                        ${d.map(p).join(``)}
                    </div>
                </div>
            </div>
        </div>
    `,o},h=()=>{let e=document.createElement(`div`);e.style.display=`flex`,e.style.flexDirection=`column`,e.style.gap=`2rem`,e.style.padding=`1rem`;let t=(e,t)=>{let n=document.createElement(`div`),r=document.createElement(`h3`);return r.textContent=e,r.style.margin=`0 0 0.75rem`,r.style.font=`600 0.875rem / 1.2 var(--font-family-base, sans-serif)`,r.style.color=`var(--color-text-light)`,r.style.textTransform=`uppercase`,r.style.letterSpacing=`0.05em`,n.appendChild(r),n.appendChild(t),n},n=document.createElement(`div`);n.style.maxWidth=`320px`,n.innerHTML=`
        <div class="hero-image-gallery">
            <div class="hero-image-container product-shadow">
                <img src="${a}" alt="Brossura fresata vista frontale" />
                <button class="hero-nav-btn hero-nav-btn--prev" aria-label="Immagine precedente">${s}</button>
                <button class="hero-nav-btn hero-nav-btn--next" aria-label="Immagine successiva">${c}</button>
            </div>
        </div>
    `;let r=document.createElement(`div`);r.innerHTML=`
        <div class="hero-rating">
            <span class="hero-rating-value">4.85</span>
            ${f(97)}
            <span class="hero-review-count">52 recensioni</span>
        </div>
    `;let i=document.createElement(`div`);i.style.maxWidth=`600px`,i.innerHTML=`
        <div class="feature-grid">
            ${d.map(p).join(``)}
        </div>
    `;let o=m();return e.appendChild(t(`1. Component — ImageGallery`,n)),e.appendChild(t(`2. Primitive — Rating (composed in .hero-rating row)`,r)),e.appendChild(t(`3. Component — FeatureBox grid`,i)),e.appendChild(t(`4. Section — ProductHero (composes the above)`,o)),e},g={title:`Sections/ProductHero`,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:`Section di pagina: 2-column grid che compone ImageGallery (sx) + .hero-info (titolo, Rating, descrizione, FeatureBox grid). Static snapshot — behavior galleria gestito dal CMS, non dalla libreria.`}}}},_={render:()=>m()},v={render:()=>m({imageSrc:a,imageAlt:`Brossura fresata vista frontale`,rating:`4.85`,reviewCount:`52 recensioni`,starsPercent:97})},y={render:()=>m({imageSrc:o,imageAlt:`Brossura fresata vista laterale`,rating:`4.85`,reviewCount:`52 recensioni`,starsPercent:97})},b={render:()=>h(),parameters:{docs:{description:{story:`Decomposizione visiva: prima la galleria sola, poi Rating, poi FeatureBox grid, infine la composizione finale della Section.`}}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => renderProductHero()
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => renderProductHero({
    imageSrc: imageFront,
    imageAlt: 'Brossura fresata vista frontale',
    rating: '4.85',
    reviewCount: '52 recensioni',
    starsPercent: 97
  })
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => renderProductHero({
    imageSrc: imageSide,
    imageAlt: 'Brossura fresata vista laterale',
    rating: '4.85',
    reviewCount: '52 recensioni',
    starsPercent: 97
  })
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => renderAnatomy(),
  parameters: {
    docs: {
      description: {
        story: 'Decomposizione visiva: prima la galleria sola, poi Rating, poi FeatureBox grid, infine la composizione finale della Section.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x=[`Default`,`ReferenceFromElementsUI`,`ComposedForCMS`,`Anatomy`]}))();export{b as Anatomy,y as ComposedForCMS,_ as Default,v as ReferenceFromElementsUI,x as __namedExportsOrder,g as default};