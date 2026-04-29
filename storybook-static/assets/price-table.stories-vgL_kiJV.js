import{t as e}from"./chunk-BvrOYcoh.js";var t=e((()=>{})),n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E;e((()=>{t(),{expect:n}=__STORYBOOK_MODULE_TEST__,r=`
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m18 15-6-6-6 6"/>
    </svg>
`,i=`
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
`,a=`
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"/>
    </svg>
`,o=`
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"/>
    </svg>
`,s=e=>{let t=document.createElement(`div`);return t.style.padding=`1rem 0`,t.style.maxWidth=`720px`,t.innerHTML=e,t},c=[{day:`lunedi`,date:`09/03`},{day:`mercoledi`,date:`11/03`},{day:`venerdi`,date:`13/03`},{day:`martedi`,date:`17/03`}],l=[{qty:25,prices:[`162,77`,`119,94`,`77,10`,`35,98`]},{qty:30,prices:[`195,32`,`143,92`,`92,52`,`43,18`]},{qty:40,prices:[`260,43`,`191,89`,`123,37`,`57,57`]},{qty:50,prices:[`325,53`,`239,86`,`154,20`,`71,96`]},{qty:60,prices:[`390,64`,`287,85`,`185,04`,`86,35`]},{qty:75,prices:[`488,31`,`359,80`,`231,30`,`107,94`]},{qty:100,prices:[`651,07`,`479,74`,`308,40`,`143,92`]}],u=e=>c.slice(0,e),d=e=>l.map(t=>({qty:t.qty,prices:t.prices.slice(0,e)})),f=(e,t=4)=>{let n=u(t);return`<tr><th class="price-th price-th--left">Copie</th>${n.map((t,r)=>{let i=r===e,a=r===n.length-1,o=[`price-th`,`price-th--center`,i?`price-th--selected`:``,a?`price-th--corner`:``].filter(Boolean).join(` `),s=i?`price-th-date price-th-date--light`:`price-th-date`;return`
            <th class="${o}">
                <div class="price-th-day">${t.day}</div>
                <div class="${s}">${t.date}</div>
            </th>
        `}).join(``)}</tr>`},p=(e,t,n=4)=>d(n).map(n=>{let r=n.qty===e,i=r?`price-tr price-tr--active`:`price-tr`,a=r?`price-qty-btn price-qty-btn--active`:`price-qty-btn`,o=n.prices.map((e,n)=>{let i;return i=r&&n===t?`price-cell-btn price-cell-btn--selected`:r?`price-cell-btn price-cell-btn--row-active`:`price-cell-btn price-cell-btn--default`,`
                <td class="price-td price-td--center">
                    <button type="button" class="${i}">${e} euro</button>
                </td>
            `}).join(``);return`
            <tr class="${i}">
                <td class="price-td price-td--left">
                    <button type="button" class="${a}">${n.qty}</button>
                </td>
                ${o}
            </tr>
        `}).join(``),m=({activeQty:e=50,selectedCol:t=0,cols:n=4,navUpDisabled:a=!1,navDownDisabled:o=!1}={})=>`
    <div class="price-table-wrapper">
        <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
            <button type="button" class="price-nav-arrow${a?` disabled`:``}" aria-label="Quantita precedenti">${r}</button>
        </div>
        <div class="price-table-section">
            <table class="price-table-full">
                <thead>${f(t,n)}</thead>
                <tbody>${p(e,t,n)}</tbody>
            </table>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
            <button type="button" class="price-nav-arrow${o?` disabled`:``}" aria-label="Quantita successive">${i}</button>
        </div>
    </div>
`,h={title:`Components/PriceTable`,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Tabella prezzi stile Google Flights: header data spedizione, righe quantita, intersezione = prezzo. **Data-driven**: il backend dichiara N colonne (1..4 raccomandato per leggibilita'); la libreria si adatta automaticamente via CSS table. CSS-only. Il consumer applica i modifier `.price-th--selected` (colonna), `.price-tr--active` (riga qty), `.price-cell-btn--selected` / `--row-active` (cella) in base allo stato applicativo."}}}},g={render:()=>s(m({activeQty:50,selectedCol:0,cols:4})),play:async({canvas:e})=>{await n(e.getByRole(`button`,{name:`50`})).toHaveClass(`price-qty-btn--active`);let t=e.getAllByRole(`button`,{name:/euro/}),r=t.filter(e=>e.classList.contains(`price-cell-btn--selected`)),i=t.filter(e=>e.classList.contains(`price-cell-btn--row-active`));await n(r.length).toBe(1),await n(i.length).toBe(3)},parameters:{docs:{description:{story:"Snapshot base: 7 righe qty (25-100), **4 colonne data** (caso massimo della pagina demo: `deliveryBaseDays = [2, 4, 6, 10]` con sconti 5%/30%/55%/79%). Riga 50 attiva, prima colonna data selezionata. La cella intersezione (50 + 09/03) mostra `.price-cell-btn--selected`."}}}},_={render:()=>s(m({activeQty:50,selectedCol:0,cols:4})),parameters:{docs:{description:{story:"Markup verbatim derivato da `product-page-integration/js/sections/section-6.js#L389-L394` (`deliveryDates.map`). Stato realistico: 4 date generate da `deliveryBaseDays = [2, 4, 6, 10]`, `closestDisplayedQty === 50`, `selectedDeliveryIndex === 0`. IVA non applicata (consumer responsibility)."}}}},v={render:()=>s(m({activeQty:50,selectedCol:0,cols:1})),parameters:{docs:{description:{story:"Caso minimo: 1 sola data. Il backend dichiara una sola opzione consegna; la libreria renderizza la cella header con `.price-th--corner` (essendo prima e ultima)."}}}},y={render:()=>s(m({activeQty:50,selectedCol:0,cols:2})),parameters:{docs:{description:{story:"2 date: scelta veloce vs scontata. La seconda colonna riceve `.price-th--corner` (ultima)."}}}},b={render:()=>s(m({activeQty:50,selectedCol:0,cols:3})),parameters:{docs:{description:{story:"3 date: configurazione intermedia. La terza colonna riceve `.price-th--corner`."}}}},x={render:()=>s(m({activeQty:50,selectedCol:0,cols:4})),parameters:{docs:{description:{story:`4 date (default pagina demo): caso massimo raccomandato per leggibilita'. Oltre 4 colonne il min-width tabella desktop e il viewport mobile diventano stretti.`}}}},S={render:()=>s(m({activeQty:50,selectedCol:1})),parameters:{docs:{description:{story:"Stesso stato qty 50 attiva, ma con seconda colonna data (`mercoledi 11/03`) selezionata. Mostra come `--selected` si sposta tra colonne header e tra celle intersezione."}}}},C={render:()=>s(m({activeQty:25,selectedCol:0,navUpDisabled:!0})),parameters:{docs:{description:{story:"Riga qty 25 (prima della pagina) attiva: la freccia su e' `disabled` (opacity 0.25, pointer-events none). Tutti i `.price-cell-btn` della riga sono `--row-active`, intersezione `--selected`."}}}},w={render:()=>s(`
            <div class="price-table-wrapper">
                <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
                    <button type="button" class="price-nav-arrow disabled" aria-label="Quantita precedenti">${r}</button>
                </div>
                <div class="price-table-section">
                    <table class="price-table-full">
                        <thead>${f(-1)}</thead>
                        <tbody>${l.map(e=>`
                            <tr class="price-tr">
                                <td class="price-td price-td--left"><button type="button" class="price-qty-btn">${e.qty}</button></td>
                                ${e.prices.map(e=>`<td class="price-td price-td--center"><button type="button" class="price-cell-btn price-cell-btn--default">${e} euro</button></td>`).join(``)}
                            </tr>
                        `).join(``)}</tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
                    <button type="button" class="price-nav-arrow disabled" aria-label="Quantita successive">${i}</button>
                </div>
            </div>
        `),parameters:{docs:{description:{story:'Stato "vuoto": nessuna riga `--active`, nessuna colonna `--selected`. Tutti i `.price-cell-btn` sono `--default` (bg bianco, bordo gray-200). Utile come baseline puramente CSS.'}}}},T={render:()=>s(`
            <div class="price-table-wrapper">
                <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
                    <button type="button" class="price-nav-arrow" aria-label="Quantita precedenti">${r}</button>
                </div>
                <div class="price-table-section" style="position: relative;">
                    <button type="button" class="price-nav-arrow-horizontal left" aria-label="Scorri a sinistra">${a}</button>
                    <button type="button" class="price-nav-arrow-horizontal right" aria-label="Scorri a destra">${o}</button>
                    <table class="price-table-full">
                        <thead>${f(0)}</thead>
                        <tbody>${p(50,0)}</tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
                    <button type="button" class="price-nav-arrow" aria-label="Quantita successive">${i}</button>
                </div>
            </div>
        `),parameters:{docs:{description:{story:'Variante con frecce orizzontali per scroll mobile. `.price-nav-arrow-horizontal.left` / `.right` sono overlay assoluti su un wrapper `position: relative`. Sotto 767px la regola CSS le rende sempre `display: flex !important`; il consumer JS le nasconde via `style="display: none"` quando lo scroll non e\' necessario (es. tabella che entra interamente).'}}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderTable({
    activeQty: 50,
    selectedCol: 0,
    cols: 4
  })),
  play: async ({
    canvas
  }) => {
    const qty50 = canvas.getByRole('button', {
      name: '50'
    });
    await expect(qty50).toHaveClass('price-qty-btn--active');
    const cells = canvas.getAllByRole('button', {
      name: /euro/
    });
    const selected = cells.filter(c => c.classList.contains('price-cell-btn--selected'));
    const rowActive = cells.filter(c => c.classList.contains('price-cell-btn--row-active'));
    await expect(selected.length).toBe(1);
    await expect(rowActive.length).toBe(3);
  },
  parameters: {
    docs: {
      description: {
        story: 'Snapshot base: 7 righe qty (25-100), **4 colonne data** (caso massimo della pagina demo: \`deliveryBaseDays = [2, 4, 6, 10]\` con sconti 5%/30%/55%/79%). Riga 50 attiva, prima colonna data selezionata. La cella intersezione (50 + 09/03) mostra \`.price-cell-btn--selected\`.'
      }
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderTable({
    activeQty: 50,
    selectedCol: 0,
    cols: 4
  })),
  parameters: {
    docs: {
      description: {
        story: 'Markup verbatim derivato da \`product-page-integration/js/sections/section-6.js#L389-L394\` (\`deliveryDates.map\`). Stato realistico: 4 date generate da \`deliveryBaseDays = [2, 4, 6, 10]\`, \`closestDisplayedQty === 50\`, \`selectedDeliveryIndex === 0\`. IVA non applicata (consumer responsibility).'
      }
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderTable({
    activeQty: 50,
    selectedCol: 0,
    cols: 1
  })),
  parameters: {
    docs: {
      description: {
        story: 'Caso minimo: 1 sola data. Il backend dichiara una sola opzione consegna; la libreria renderizza la cella header con \`.price-th--corner\` (essendo prima e ultima).'
      }
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderTable({
    activeQty: 50,
    selectedCol: 0,
    cols: 2
  })),
  parameters: {
    docs: {
      description: {
        story: '2 date: scelta veloce vs scontata. La seconda colonna riceve \`.price-th--corner\` (ultima).'
      }
    }
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderTable({
    activeQty: 50,
    selectedCol: 0,
    cols: 3
  })),
  parameters: {
    docs: {
      description: {
        story: '3 date: configurazione intermedia. La terza colonna riceve \`.price-th--corner\`.'
      }
    }
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderTable({
    activeQty: 50,
    selectedCol: 0,
    cols: 4
  })),
  parameters: {
    docs: {
      description: {
        story: '4 date (default pagina demo): caso massimo raccomandato per leggibilita\\'. Oltre 4 colonne il min-width tabella desktop e il viewport mobile diventano stretti.'
      }
    }
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderTable({
    activeQty: 50,
    selectedCol: 1
  })),
  parameters: {
    docs: {
      description: {
        story: 'Stesso stato qty 50 attiva, ma con seconda colonna data (\`mercoledi 11/03\`) selezionata. Mostra come \`--selected\` si sposta tra colonne header e tra celle intersezione.'
      }
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(renderTable({
    activeQty: 25,
    selectedCol: 0,
    navUpDisabled: true
  })),
  parameters: {
    docs: {
      description: {
        story: 'Riga qty 25 (prima della pagina) attiva: la freccia su e\\' \`disabled\` (opacity 0.25, pointer-events none). Tutti i \`.price-cell-btn\` della riga sono \`--row-active\`, intersezione \`--selected\`.'
      }
    }
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const noActiveTable = \`
            <div class="price-table-wrapper">
                <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
                    <button type="button" class="price-nav-arrow disabled" aria-label="Quantita precedenti">\${arrowUp}</button>
                </div>
                <div class="price-table-section">
                    <table class="price-table-full">
                        <thead>\${renderHeader(-1)}</thead>
                        <tbody>\${rows.map(row => \`
                            <tr class="price-tr">
                                <td class="price-td price-td--left"><button type="button" class="price-qty-btn">\${row.qty}</button></td>
                                \${row.prices.map(p => \`<td class="price-td price-td--center"><button type="button" class="price-cell-btn price-cell-btn--default">\${p} euro</button></td>\`).join('')}
                            </tr>
                        \`).join('')}</tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
                    <button type="button" class="price-nav-arrow disabled" aria-label="Quantita successive">\${arrowDown}</button>
                </div>
            </div>
        \`;
    return renderRoot(noActiveTable);
  },
  parameters: {
    docs: {
      description: {
        story: 'Stato "vuoto": nessuna riga \`--active\`, nessuna colonna \`--selected\`. Tutti i \`.price-cell-btn\` sono \`--default\` (bg bianco, bordo gray-200). Utile come baseline puramente CSS.'
      }
    }
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const html = \`
            <div class="price-table-wrapper">
                <div style="display: flex; justify-content: center; margin-bottom: 0.25rem;">
                    <button type="button" class="price-nav-arrow" aria-label="Quantita precedenti">\${arrowUp}</button>
                </div>
                <div class="price-table-section" style="position: relative;">
                    <button type="button" class="price-nav-arrow-horizontal left" aria-label="Scorri a sinistra">\${chevronLeft}</button>
                    <button type="button" class="price-nav-arrow-horizontal right" aria-label="Scorri a destra">\${chevronRight}</button>
                    <table class="price-table-full">
                        <thead>\${renderHeader(0)}</thead>
                        <tbody>\${renderBody(50, 0)}</tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: center; margin-top: 0.25rem;">
                    <button type="button" class="price-nav-arrow" aria-label="Quantita successive">\${arrowDown}</button>
                </div>
            </div>
        \`;
    return renderRoot(html);
  },
  parameters: {
    docs: {
      description: {
        story: 'Variante con frecce orizzontali per scroll mobile. \`.price-nav-arrow-horizontal.left\` / \`.right\` sono overlay assoluti su un wrapper \`position: relative\`. Sotto 767px la regola CSS le rende sempre \`display: flex !important\`; il consumer JS le nasconde via \`style="display: none"\` quando lo scroll non e\\' necessario (es. tabella che entra interamente).'
      }
    }
  }
}`,...T.parameters?.docs?.source}}},E=[`Default`,`ReferenceFromElementsUI`,`OneColumn`,`TwoColumns`,`ThreeColumns`,`FourColumns`,`SecondColumnSelected`,`FirstRowActive`,`NoSelection`,`WithMobileArrows`]}))();export{g as Default,C as FirstRowActive,x as FourColumns,w as NoSelection,v as OneColumn,_ as ReferenceFromElementsUI,S as SecondColumnSelected,b as ThreeColumns,y as TwoColumns,T as WithMobileArrows,E as __namedExportsOrder,h as default};