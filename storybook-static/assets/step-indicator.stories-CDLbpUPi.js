import{t as e}from"./chunk-BvrOYcoh.js";var t=e((()=>{})),n,r,i,a,o,s,c,l,u,d;e((()=>{t(),n=({index:e,title:t,status:n,state:r=`inactive`}={})=>`
        <div class="step-card-item${r===`active`?` step-card-item--active`:``}" data-step="${e}">
            <div class="step-card-content">
                <div class="step-badge ${`step-badge--${r}`}">
                    <span>${e}</span>
                </div>
                <div class="step-info">
                    <h3 class="step-title ${r===`active`?`step-title--active`:`step-title--inactive`}">${t}</h3>
                    <span class="step-status ${r===`active`?`step-status--active`:`step-status--inactive`}">${n}</span>
                </div>
            </div>
        </div>
    `,r=e=>{let t=document.createElement(`div`);return t.style.padding=`1rem 0`,t.innerHTML=`
        <div class="steps-section">
            <div class="steps-wrapper">
                <div class="steps-container">
                    <div class="steps-line"></div>
                    <div class="steps-grid">
                        ${e.map(n).join(``)}
                    </div>
                </div>
            </div>
        </div>
    `,t},i=[{index:1,title:`Configura`,status:`In corso`,state:`active`},{index:2,title:`Carrello`,status:`In attesa`,state:`inactive`},{index:3,title:`Pagamento`,status:`In attesa`,state:`inactive`},{index:4,title:`Carica file`,status:`In attesa`,state:`inactive`}],a={title:`Components/StepIndicator`,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:"Step indicator orizzontale per configuratori e flussi multi-step. CSS-only: il CMS sposta i modifier `--active`, `--inactive`, `--completed` su badge, titolo e status. Mobile-first: 2 colonne sotto 1024px, 4 colonne >=1024px. La linea di connessione e visibile solo da desktop."}}}},o={render:()=>r(i)},s={render:()=>{let e=document.createElement(`div`);return e.style.padding=`1rem 0`,e.innerHTML=`
            <div id="step-cards" class="steps-section">
                <div class="steps-wrapper">
                    <div class="steps-container">
                        <div class="steps-line"></div>
                        <div class="steps-grid">
                            <div class="step-card-item step-card-item--active" data-step="1">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--active">
                                        <span>1</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--active">Configura</h3>
                                        <span class="step-status step-status--active">In corso</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="2">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--inactive">
                                        <span>2</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Carrello</h3>
                                        <span class="step-status step-status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="3">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--inactive">
                                        <span>3</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Pagamento</h3>
                                        <span class="step-status step-status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="4">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--inactive">
                                        <span>4</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Carica file</h3>
                                        <span class="step-status step-status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,e},parameters:{docs:{description:{story:"Markup verbatim dalla pagina demo `product-page-integration` (righe 512-564 di `product-page-integration/index.html`)."}}}},c={render:()=>{let e=document.createElement(`div`);return e.style.padding=`1rem 0`,e.innerHTML=`
            <div class="steps-section">
                <div class="steps-wrapper">
                    <div class="steps-container">
                        <div class="steps-line"></div>
                        <div class="steps-grid">
                            <div class="step-card-item" data-step="1">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--completed">
                                        <span>1</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Configura</h3>
                                        <span class="step-status step-status--inactive">Completato</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="2">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--completed">
                                        <span>2</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Carrello</h3>
                                        <span class="step-status step-status--inactive">Completato</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item step-card-item--active" data-step="3">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--active">
                                        <span>3</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--active">Pagamento</h3>
                                        <span class="step-status step-status--active">In corso</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="4">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--inactive">
                                        <span>4</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Carica file</h3>
                                        <span class="step-status step-status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,e},parameters:{docs:{description:{story:"Step 1 e 2 completati (badge verde `step-badge--completed`), step 3 attivo (badge gradient arancio + bordo card primary), step 4 in attesa."}}}},l={render:()=>r([{index:1,title:`Configura`,status:`Completato`,state:`completed`},{index:2,title:`Carrello`,status:`In corso`,state:`active`},{index:3,title:`Pagamento`,status:`In attesa`,state:`inactive`}]),parameters:{docs:{description:{story:`Variante a 3 step per CMS con meno fasi. La grid resta a 4 colonne >=1024px: la quarta cella non viene renderizzata, lo spazio rimane vuoto.`}}}},u={render:()=>r(i),parameters:{viewport:{defaultViewport:`mobile1`},docs:{description:{story:"A viewport sotto 1024px la grid passa a 2 colonne e la `.steps-line` scompare. Per vedere il rendering effettivo serve restringere la finestra del browser sotto 1024px."}}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderSection(defaultSteps)
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => {
    const root = document.createElement('div');
    root.style.padding = '1rem 0';
    root.innerHTML = \`
            <div id="step-cards" class="steps-section">
                <div class="steps-wrapper">
                    <div class="steps-container">
                        <div class="steps-line"></div>
                        <div class="steps-grid">
                            <div class="step-card-item step-card-item--active" data-step="1">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--active">
                                        <span>1</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--active">Configura</h3>
                                        <span class="step-status step-status--active">In corso</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="2">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--inactive">
                                        <span>2</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Carrello</h3>
                                        <span class="step-status step-status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="3">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--inactive">
                                        <span>3</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Pagamento</h3>
                                        <span class="step-status step-status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="4">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--inactive">
                                        <span>4</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Carica file</h3>
                                        <span class="step-status step-status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        \`;
    return root;
  },
  parameters: {
    docs: {
      description: {
        story: 'Markup verbatim dalla pagina demo \`product-page-integration\` (righe 512-564 di \`product-page-integration/index.html\`).'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => {
    const root = document.createElement('div');
    root.style.padding = '1rem 0';
    root.innerHTML = \`
            <div class="steps-section">
                <div class="steps-wrapper">
                    <div class="steps-container">
                        <div class="steps-line"></div>
                        <div class="steps-grid">
                            <div class="step-card-item" data-step="1">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--completed">
                                        <span>1</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Configura</h3>
                                        <span class="step-status step-status--inactive">Completato</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="2">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--completed">
                                        <span>2</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Carrello</h3>
                                        <span class="step-status step-status--inactive">Completato</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item step-card-item--active" data-step="3">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--active">
                                        <span>3</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--active">Pagamento</h3>
                                        <span class="step-status step-status--active">In corso</span>
                                    </div>
                                </div>
                            </div>
                            <div class="step-card-item" data-step="4">
                                <div class="step-card-content">
                                    <div class="step-badge step-badge--inactive">
                                        <span>4</span>
                                    </div>
                                    <div class="step-info">
                                        <h3 class="step-title step-title--inactive">Carica file</h3>
                                        <span class="step-status step-status--inactive">In attesa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        \`;
    return root;
  },
  parameters: {
    docs: {
      description: {
        story: 'Step 1 e 2 completati (badge verde \`step-badge--completed\`), step 3 attivo (badge gradient arancio + bordo card primary), step 4 in attesa.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => renderSection([{
    index: 1,
    title: 'Configura',
    status: 'Completato',
    state: 'completed'
  }, {
    index: 2,
    title: 'Carrello',
    status: 'In corso',
    state: 'active'
  }, {
    index: 3,
    title: 'Pagamento',
    status: 'In attesa',
    state: 'inactive'
  }]),
  parameters: {
    docs: {
      description: {
        story: 'Variante a 3 step per CMS con meno fasi. La grid resta a 4 colonne >=1024px: la quarta cella non viene renderizzata, lo spazio rimane vuoto.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderSection(defaultSteps),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'A viewport sotto 1024px la grid passa a 2 colonne e la \`.steps-line\` scompare. Per vedere il rendering effettivo serve restringere la finestra del browser sotto 1024px.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`ReferenceFromElementsUI`,`MidProgress`,`ThreeSteps`,`Mobile`]}))();export{o as Default,c as MidProgress,u as Mobile,s as ReferenceFromElementsUI,l as ThreeSteps,d as __namedExportsOrder,a as default};