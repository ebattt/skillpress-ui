import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./sidebar-totals-CvuVZhjU.js";var n=e((()=>{})),r,i,a,o,s,c,l,u,d,f,p,m,h,g;e((()=>{t(),n(),{expect:r}=__STORYBOOK_MODULE_TEST__,i=`
    <svg class="handle-arrow" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
    </svg>
`,a=`
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
`,o=e=>`
    <svg ${e?`id="${e}"`:``} aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
`,s=e=>{let t=document.createElement(`div`);return t.style.padding=`0`,t.style.position=`relative`,t.style.minHeight=`420px`,t.style.maxWidth=`420px`,t.style.margin=`0 auto`,t.style.background=`#f3f4f6`,t.innerHTML=e,t},c=({expanded:e=!1,configActive:t=!1,totale:n=`-`,qty:r=`50`,unitPrice:s=`-`,subtotal:c=`-`,iva:l=`-`,configContent:u=``,visibleOverride:d=!0}={})=>{let f=d?` style="display: block; position: relative; pointer-events: auto;"`:``,p=e?` expanded`:``,m=t?` active`:``,h=t?` visible`:``;return`
        <div id="mobile-total-bar" class="mobile-total-bar${p}"${f}>
            <div id="mobile-bar-overlay" class="mobile-bar-overlay"></div>
            <div class="mobile-bar-container">
                <div id="mobile-bar-handle" class="mobile-bar-handle" role="button" tabindex="0"
                     aria-label="Espandi dettagli totale" aria-expanded="${e}">
                    ${i}
                </div>
                <div class="mobile-bar-compact">
                    <div class="mobile-bar-price-section">
                        <span class="mobile-bar-label">Totale</span>
                        <span id="mobile-total-price" class="mobile-bar-price">${n}</span>
                    </div>
                    <button id="mobile-add-cart-btn" class="mobile-bar-cart-btn">
                        Aggiungi al carrello
                    </button>
                    <div id="mobileValidationErrors"></div>
                </div>
                <div id="mobile-bar-expanded" class="mobile-bar-expanded">
                    <div class="mobile-bar-divider"></div>
                    <div class="mobile-bar-details">
                        <div class="mobile-detail-row">
                            <span>Quantità</span>
                            <span id="mobile-qty">${r}</span>
                        </div>
                        <div class="mobile-detail-row">
                            <span>Prezzo unitario</span>
                            <span id="mobile-unit-price">${s}</span>
                        </div>
                        <div class="mobile-detail-row">
                            <span>Subtotale</span>
                            <span id="mobile-subtotal">${c}</span>
                        </div>
                        <div class="mobile-detail-row">
                            <span>IVA</span>
                            <span id="mobile-iva">${l}</span>
                        </div>
                        <div class="mobile-detail-row mobile-detail-shipping">
                            <span>Spedizione</span>
                            <span class="text-green-600">Gratuita *</span>
                        </div>
                    </div>
                    <button id="mobile-config-toggle" class="mobile-config-toggle${m}"
                            aria-expanded="${t}" aria-controls="mobile-config-content">
                        ${a}
                        Vedi configurazione
                        ${o(`mobile-config-icon`)}
                    </button>
                    <div id="mobile-config-content" class="mobile-config-content${h}"
                         role="region" aria-label="Riepilogo configurazione">${u}</div>
                </div>
            </div>
        </div>
    `},l={title:`Components/MobileTotalBar`,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:"Barra fixed in basso visibile `<=1023px`: handle chevron espandibile, sezione compact (label primary + prezzo bold + bottone carrello secondary-dark), sezione espansa (5 righe dettaglio + toggle riepilogo configurazione + content gray-50). CSS-only. In Storybook si forza `display: block; position: relative` perche' la preview gira anche in canvas desktop dove la media query la nasconderebbe."}}}},u={render:()=>s(c({totale:`-`})),play:async({canvas:e})=>{await r(e.getByRole(`button`,{name:/Aggiungi al carrello/})).toBeInTheDocument(),await r(e.getByText(`Totale`)).toBeInTheDocument()},parameters:{docs:{description:{story:"Stato iniziale collassato: prezzo `-`, dettagli nascosti (`max-height: 0; opacity: 0`)."}}}},d={render:()=>s(c({totale:`-`})),parameters:{docs:{description:{story:"Markup verbatim derivato da `product-page-integration/index.html#L293-L356`. Material Symbols `expand_less` (handle), `list` + `expand_more` (config-toggle) sostituiti con SVG inline. Classi `handle-arrow` e id `#mobile-config-icon` mantenuti per non rompere i selettori CSS catalogo."}}}},f={render:()=>s(c({expanded:!0,totale:`397,15 euro`,qty:`50`,unitPrice:`6,51 euro`,subtotal:`325,53 euro`,iva:`71,62 euro`})),parameters:{docs:{description:{story:"Barra espansa (`.mobile-total-bar.expanded`): chevron handle ruotato 180deg, sezione expanded a `max-height: 60vh; opacity: 1`, 5 righe dettaglio visibili. Toggle config ancora collapsed."}}}},p={render:()=>s(c({expanded:!0,configActive:!0,totale:`397,15 euro`,qty:`50`,unitPrice:`6,51 euro`,subtotal:`325,53 euro`,iva:`71,62 euro`,configContent:`
            <div class="riepilogo-container">
                <div class="riepilogo-section">
                    <div class="riepilogo-header">Dettagli</div>
                    <div class="riepilogo-row">Nome del lavoro: <span class="riepilogo-error">Non valido</span></div>
                </div>
                <div class="riepilogo-section">
                    <div class="riepilogo-header">1. Generali</div>
                    <div class="riepilogo-row">Formato: A4</div>
                    <div class="riepilogo-row">Dimensioni: 210 × 297 mm</div>
                    <div class="riepilogo-row">Orientamento: Verticale</div>
                    <div class="riepilogo-row">Facciate: 100</div>
                    <div class="riepilogo-row">Carta int.: Patinata Opaca</div>
                    <div class="riepilogo-row">Grammatura: 115g</div>
                </div>
            </div>
        `})),parameters:{docs:{description:{story:"Barra espansa + config-toggle attivo (`.mobile-config-toggle.active`) + content visibile (`.mobile-config-content.visible`). Chevron config ruotato 180deg, content gray-50 con border + radius lg. Riepilogo iniettato dal CMS con classi `.riepilogo-container`/`.riepilogo-section`/`.riepilogo-header`/`.riepilogo-row`/`.riepilogo-error`: lo stesso markup prodotto da `generateRiepilogo` v3.0.0 della demo. Le regole sono definite in `components/sidebar-totals.css` (importato dalla story)."}}}},m={render:()=>s(c({totale:`397,15 euro`})),parameters:{viewport:{defaultViewport:`mobile1`},docs:{description:{story:"Viewport `<=374px`: padding ridotto, cart button 0.8125rem, label/price 1rem."}}}},h={render:()=>s(c({expanded:!0,totale:`397,15 euro`,unitPrice:`6,51 euro`,subtotal:`325,53 euro`,iva:`71,62 euro`})),parameters:{viewport:{defaultViewport:`tablet`},docs:{description:{story:"Viewport tablet (`640-1023px`): `.mobile-bar-compact`, `.mobile-bar-details`, `.mobile-config-toggle` centrati a `max-width: 480px`. Padding container 0.5rem 1.5rem."}}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderMobileBar({
    totale: '-'
  })),
  play: async ({
    canvas
  }) => {
    const cart = canvas.getByRole('button', {
      name: /Aggiungi al carrello/
    });
    await expect(cart).toBeInTheDocument();
    await expect(canvas.getByText('Totale')).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: 'Stato iniziale collassato: prezzo \`-\`, dettagli nascosti (\`max-height: 0; opacity: 0\`).'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:"{\n  render: () => renderRoot(renderMobileBar({\n    totale: '-'\n  })),\n  parameters: {\n    docs: {\n      description: {\n        story: 'Markup verbatim derivato da `product-page-integration/index.html#L293-L356`. Material Symbols `expand_less` (handle), `list` + `expand_more` (config-toggle) sostituiti con SVG inline. Classi `handle-arrow` e id `#mobile-config-icon` mantenuti per non rompere i selettori CSS catalogo.'\n      }\n    }\n  }\n}",...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderMobileBar({
    expanded: true,
    totale: '397,15 euro',
    qty: '50',
    unitPrice: '6,51 euro',
    subtotal: '325,53 euro',
    iva: '71,62 euro'
  })),
  parameters: {
    docs: {
      description: {
        story: 'Barra espansa (\`.mobile-total-bar.expanded\`): chevron handle ruotato 180deg, sezione expanded a \`max-height: 60vh; opacity: 1\`, 5 righe dettaglio visibili. Toggle config ancora collapsed.'
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderMobileBar({
    expanded: true,
    configActive: true,
    totale: '397,15 euro',
    qty: '50',
    unitPrice: '6,51 euro',
    subtotal: '325,53 euro',
    iva: '71,62 euro',
    configContent: \`
            <div class="riepilogo-container">
                <div class="riepilogo-section">
                    <div class="riepilogo-header">Dettagli</div>
                    <div class="riepilogo-row">Nome del lavoro: <span class="riepilogo-error">Non valido</span></div>
                </div>
                <div class="riepilogo-section">
                    <div class="riepilogo-header">1. Generali</div>
                    <div class="riepilogo-row">Formato: A4</div>
                    <div class="riepilogo-row">Dimensioni: 210 × 297 mm</div>
                    <div class="riepilogo-row">Orientamento: Verticale</div>
                    <div class="riepilogo-row">Facciate: 100</div>
                    <div class="riepilogo-row">Carta int.: Patinata Opaca</div>
                    <div class="riepilogo-row">Grammatura: 115g</div>
                </div>
            </div>
        \`
  })),
  parameters: {
    docs: {
      description: {
        story: 'Barra espansa + config-toggle attivo (\`.mobile-config-toggle.active\`) + content visibile (\`.mobile-config-content.visible\`). Chevron config ruotato 180deg, content gray-50 con border + radius lg. Riepilogo iniettato dal CMS con classi \`.riepilogo-container\`/\`.riepilogo-section\`/\`.riepilogo-header\`/\`.riepilogo-row\`/\`.riepilogo-error\`: lo stesso markup prodotto da \`generateRiepilogo\` v3.0.0 della demo. Le regole sono definite in \`components/sidebar-totals.css\` (importato dalla story).'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderMobileBar({
    totale: '397,15 euro'
  })),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Viewport \`<=374px\`: padding ridotto, cart button 0.8125rem, label/price 1rem.'
      }
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderMobileBar({
    expanded: true,
    totale: '397,15 euro',
    unitPrice: '6,51 euro',
    subtotal: '325,53 euro',
    iva: '71,62 euro'
  })),
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'Viewport tablet (\`640-1023px\`): \`.mobile-bar-compact\`, \`.mobile-bar-details\`, \`.mobile-config-toggle\` centrati a \`max-width: 480px\`. Padding container 0.5rem 1.5rem.'
      }
    }
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`ReferenceFromElementsUI`,`Expanded`,`ExpandedWithConfig`,`SmallPhone`,`Tablet`]}))();export{u as Default,f as Expanded,p as ExpandedWithConfig,d as ReferenceFromElementsUI,m as SmallPhone,h as Tablet,g as __namedExportsOrder,l as default};