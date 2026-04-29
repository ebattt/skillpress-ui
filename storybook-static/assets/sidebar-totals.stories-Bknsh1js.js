import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./sidebar-totals-CvuVZhjU.js";var n,r,i,a,o,s,c,l,u,d,f,p,m;e((()=>{t(),{expect:n}=__STORYBOOK_MODULE_TEST__,r=`
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
`,i=`
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
`,a=`
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
`,o=e=>{let t=document.createElement(`div`);return t.style.padding=`1rem 0`,t.style.maxWidth=`380px`,t.innerHTML=e,t},s=({quantita:e=`50`,bestPrice:t=`-`,imposta:n=`-`,spedizione:o=`-`,totale:s=`-`,riepilogoOpen:c=!1,riepilogoContent:l=``}={})=>{let u=`promo-`+Math.random().toString(36).slice(2,8),d=`riep-`+Math.random().toString(36).slice(2,8);return`
        <div class="configurator-sidebar" style="display: block;">
            <div class="sidebar-total-box">
                <div>
                    <h3 class="sidebar-title">Totale</h3>
                    <div class="sidebar-rows">
                        <div class="sidebar-row">
                            <span class="sidebar-row-label">Quantità</span>
                            <span class="sidebar-row-value">${e}</span>
                        </div>
                        <div class="sidebar-row">
                            <span class="sidebar-row-label">Miglior prezzo</span>
                            <span class="sidebar-row-value">${t}</span>
                        </div>
                        <div class="sidebar-row">
                            <span class="sidebar-row-label">Imposta</span>
                            <span class="sidebar-row-value">${n}</span>
                        </div>
                        <div class="sidebar-row sidebar-row--green">
                            <span class="sidebar-row-label">Spedizione gratuita *</span>
                            <span class="sidebar-row-value">${o}</span>
                        </div>
                    </div>
                    <div class="sidebar-divider"></div>
                    <div class="sidebar-total-row">
                        <span class="sidebar-total-label">Totale</span>
                        <span class="sidebar-total-value">${s}</span>
                    </div>
                </div>
                <div class="promo-section">
                    <label for="${u}">Hai un codice promo?</label>
                    <input type="text" id="${u}" placeholder="Inserisci codice" class="promo-input"/>
                </div>
                <div class="riepilogo-section">
                    <label>Vuoi visualizzare il riepilogo?</label>
                    <button class="riepilogo-btn" aria-expanded="${c?`true`:`false`}" aria-controls="${d}">
                        ${r}
                        ${c?`Nascondi riepilogo`:`Mostra riepilogo`}
                        ${i}
                    </button>
                    <div id="${d}" class="riepilogo-content"${c?` style="display: block;"`:``}>${l}</div>
                </div>
                <button class="add-to-cart-btn">
                    ${a}
                    Aggiungi al carrello
                </button>
            </div>
        </div>
    `},c={title:`Components/SidebarTotals`,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:'Sidebar configuratore desktop: box totale (qty + miglior prezzo + imposta + spedizione + totale evidenziato), input promo, toggle riepilogo, bottone "Aggiungi al carrello". CSS-only. Sticky a `top: 250px` sopra 1024px, `display: none` sotto. Le icone (`list`, `expand_more`, `shopping_cart`) sono SVG inline -- la regola CSS catalogo `.material-symbols-outlined` e\' tradotta a `svg`.'}}}},l={render:()=>o(s({quantita:`50`})),play:async({canvas:e})=>{await n(e.getByRole(`heading`,{name:`Totale`})).toBeInTheDocument(),await n(e.getByText(`50`)).toBeInTheDocument(),await n(e.getByRole(`button`,{name:/Aggiungi al carrello/})).toHaveClass(`add-to-cart-btn`),await n(e.getByRole(`button`,{name:/Mostra riepilogo/})).toHaveAttribute(`aria-expanded`,`false`)},parameters:{docs:{description:{story:"Snapshot iniziale del configuratore: qty 50, valori `-` come prima dell'elaborazione JS configurator. Riga \"Spedizione gratuita\" gia' verde via `.sidebar-row--green`."}}}},u={render:()=>o(s({quantita:`50`})),parameters:{docs:{description:{story:"Markup verbatim derivato da `product-page-integration/index.html#L202-L249`. Stato realistico iniziale: qty 50, valori `-`. Material Symbols (`list`, `expand_more`, `shopping_cart`) sostituiti con SVG inline 1.125rem."}}}},d={render:()=>o(s({quantita:`50`,bestPrice:`325,53 euro`,imposta:`71,62 euro`,spedizione:`Inclusa`,totale:`397,15 euro`})),parameters:{docs:{description:{story:"Sidebar dopo che il configuratore ha calcolato i valori: tutte le righe hanno valori reali e il totale evidenziato (`--font-size-2xl`, primary) mostra la somma. Spedizione gratuita resta verde."}}}},f={render:()=>o(s({quantita:`50`,bestPrice:`325,53 euro`,imposta:`71,62 euro`,spedizione:`Inclusa`,totale:`397,15 euro`,riepilogoOpen:!0,riepilogoContent:`
            <div class="riepilogo-section-header">Configurazione</div>
            <div class="riepilogo-row">Formato: <strong>A4</strong></div>
            <div class="riepilogo-row">Orientamento: <strong>verticale</strong></div>
            <div class="riepilogo-row">Quantita: <strong>50</strong></div>
            <div class="riepilogo-section-header">Spedizione</div>
            <div class="riepilogo-row">Data: <strong>lunedi 09/03</strong></div>
            <div class="riepilogo-indent">Spedizione gratuita inclusa.</div>
        `})),parameters:{docs:{description:{story:'Riepilogo aperto: il consumer ha settato `aria-expanded="true"` sul `.riepilogo-btn` e reso visibile `.riepilogo-content` (qui via `style="display: block"`). Il content usa le utility classes `.riepilogo-section-header`, `.riepilogo-row`, `.riepilogo-indent`. Max-height 300px + scroll automatico.'}}}},p={render:()=>o(s({quantita:`50`,riepilogoOpen:!0,riepilogoContent:`<div class="riepilogo-empty">Nessuna configurazione selezionata.</div>`})),parameters:{docs:{description:{story:"Riepilogo aperto su stato vuoto: utility class `.riepilogo-empty` (text-align center, color text-light, padding 1rem)."}}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSidebar({
    quantita: '50'
  })),
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole('heading', {
      name: 'Totale'
    })).toBeInTheDocument();
    await expect(canvas.getByText('50')).toBeInTheDocument();
    const cart = canvas.getByRole('button', {
      name: /Aggiungi al carrello/
    });
    await expect(cart).toHaveClass('add-to-cart-btn');
    const riepilogoBtn = canvas.getByRole('button', {
      name: /Mostra riepilogo/
    });
    await expect(riepilogoBtn).toHaveAttribute('aria-expanded', 'false');
  },
  parameters: {
    docs: {
      description: {
        story: 'Snapshot iniziale del configuratore: qty 50, valori \`-\` come prima dell\\'elaborazione JS configurator. Riga "Spedizione gratuita" gia\\' verde via \`.sidebar-row--green\`.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSidebar({
    quantita: '50'
  })),
  parameters: {
    docs: {
      description: {
        story: 'Markup verbatim derivato da \`product-page-integration/index.html#L202-L249\`. Stato realistico iniziale: qty 50, valori \`-\`. Material Symbols (\`list\`, \`expand_more\`, \`shopping_cart\`) sostituiti con SVG inline 1.125rem.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSidebar({
    quantita: '50',
    bestPrice: '325,53 euro',
    imposta: '71,62 euro',
    spedizione: 'Inclusa',
    totale: '397,15 euro'
  })),
  parameters: {
    docs: {
      description: {
        story: 'Sidebar dopo che il configuratore ha calcolato i valori: tutte le righe hanno valori reali e il totale evidenziato (\`--font-size-2xl\`, primary) mostra la somma. Spedizione gratuita resta verde.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSidebar({
    quantita: '50',
    bestPrice: '325,53 euro',
    imposta: '71,62 euro',
    spedizione: 'Inclusa',
    totale: '397,15 euro',
    riepilogoOpen: true,
    riepilogoContent: \`
            <div class="riepilogo-section-header">Configurazione</div>
            <div class="riepilogo-row">Formato: <strong>A4</strong></div>
            <div class="riepilogo-row">Orientamento: <strong>verticale</strong></div>
            <div class="riepilogo-row">Quantita: <strong>50</strong></div>
            <div class="riepilogo-section-header">Spedizione</div>
            <div class="riepilogo-row">Data: <strong>lunedi 09/03</strong></div>
            <div class="riepilogo-indent">Spedizione gratuita inclusa.</div>
        \`
  })),
  parameters: {
    docs: {
      description: {
        story: 'Riepilogo aperto: il consumer ha settato \`aria-expanded="true"\` sul \`.riepilogo-btn\` e reso visibile \`.riepilogo-content\` (qui via \`style="display: block"\`). Il content usa le utility classes \`.riepilogo-section-header\`, \`.riepilogo-row\`, \`.riepilogo-indent\`. Max-height 300px + scroll automatico.'
      }
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderSidebar({
    quantita: '50',
    riepilogoOpen: true,
    riepilogoContent: '<div class="riepilogo-empty">Nessuna configurazione selezionata.</div>'
  })),
  parameters: {
    docs: {
      description: {
        story: 'Riepilogo aperto su stato vuoto: utility class \`.riepilogo-empty\` (text-align center, color text-light, padding 1rem).'
      }
    }
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`ReferenceFromElementsUI`,`FilledTotals`,`RiepilogoOpen`,`RiepilogoEmpty`]}))();export{l as Default,d as FilledTotals,u as ReferenceFromElementsUI,p as RiepilogoEmpty,f as RiepilogoOpen,m as __namedExportsOrder,c as default};