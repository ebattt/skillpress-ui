import{t as e}from"./chunk-BvrOYcoh.js";var t=e((()=>{})),n,r,i,a,o,s,c,l,u,d,f;e((()=>{t(),n=`
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <path d="M3 9h18 M3 15h18 M9 3v18 M15 3v18"></path>
    </svg>
`,r=e=>{let t=document.createElement(`div`);return t.style.padding=`1rem 0`,t.style.maxWidth=`420px`,t.innerHTML=e,t},i=(e=`a4`)=>`
    <div class="format-cards">
        <button type="button" class="format-card${e===`a4`?` format-card--selected`:``}" data-format="a4">
            <div class="format-card-preview" style="width: 56px; height: 79px;">
                <span class="format-card-preview-label">A4</span>
                <div class="format-card-preview-box">
                    <span>A4</span>
                </div>
            </div>
            <div class="format-card-text">
                <div class="format-card-name">A4</div>
                <div class="format-card-dims">210 × 297 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${e===`libro`?` format-card--selected`:``}" data-format="libro">
            <div class="format-card-preview" style="width: 56px; height: 79px;">
                <div class="format-card-preview-dashed"></div>
                <span class="format-card-preview-label format-card-preview-label--faded">A4</span>
                <div class="format-card-preview-box-inner" style="width: 44px; height: 62px;">
                    <span style="font-size: 10px;">Libro</span>
                </div>
            </div>
            <div class="format-card-text">
                <div class="format-card-name">Libro</div>
                <div class="format-card-dims">165 × 235 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${e===`a5`?` format-card--selected`:``}" data-format="a5">
            <div class="format-card-preview" style="width: 56px; height: 79px;">
                <div class="format-card-preview-dashed"></div>
                <span class="format-card-preview-label format-card-preview-label--faded">A4</span>
                <div class="format-card-preview-box-inner" style="width: 39px; height: 56px;">
                    <span style="font-size: 10px;">A5</span>
                </div>
            </div>
            <div class="format-card-text">
                <div class="format-card-name">A5</div>
                <div class="format-card-dims">148 × 210 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${e===`libero`?` format-card--selected`:``}" data-format="libero">
            <div class="format-card-preview" style="width: 56px; height: 79px;">
                <div class="format-card-preview-dashed"></div>
                <span class="format-card-preview-label format-card-preview-label--faded">A4</span>
                <div class="format-card-preview-custom" style="width: 40px; height: 52px;">
                    ${n}
                </div>
            </div>
            <div class="format-card-text">
                <div class="format-card-name">Libero</div>
                <div class="format-card-dims">Custom</div>
            </div>
        </button>
    </div>
`,a=(e=`a4`)=>`
    <div class="format-cards">
        <button type="button" class="format-card${e===`a4`?` format-card--selected`:``}" data-format="a4">
            <div class="format-card-preview" style="width: 79px; height: 56px;">
                <span class="format-card-preview-label">A4</span>
                <div class="format-card-preview-box">
                    <span>A4</span>
                </div>
            </div>
            <div class="format-card-text">
                <div class="format-card-name">A4</div>
                <div class="format-card-dims">297 × 210 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${e===`libro`?` format-card--selected`:``}" data-format="libro">
            <div class="format-card-preview" style="width: 79px; height: 56px;">
                <div class="format-card-preview-dashed"></div>
                <span class="format-card-preview-label format-card-preview-label--faded">A4</span>
                <div class="format-card-preview-box-inner" style="width: 62px; height: 44px;">
                    <span style="font-size: 10px;">Libro</span>
                </div>
            </div>
            <div class="format-card-text">
                <div class="format-card-name">Libro</div>
                <div class="format-card-dims">235 × 165 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${e===`a5`?` format-card--selected`:``}" data-format="a5">
            <div class="format-card-preview" style="width: 79px; height: 56px;">
                <div class="format-card-preview-dashed"></div>
                <span class="format-card-preview-label format-card-preview-label--faded">A4</span>
                <div class="format-card-preview-box-inner" style="width: 56px; height: 39px;">
                    <span style="font-size: 10px;">A5</span>
                </div>
            </div>
            <div class="format-card-text">
                <div class="format-card-name">A5</div>
                <div class="format-card-dims">210 × 148 mm</div>
            </div>
        </button>
        <button type="button" class="format-card${e===`libero`?` format-card--selected`:``}" data-format="libero">
            <div class="format-card-preview" style="width: 79px; height: 56px;">
                <div class="format-card-preview-dashed"></div>
                <span class="format-card-preview-label format-card-preview-label--faded">A4</span>
                <div class="format-card-preview-custom" style="width: 52px; height: 40px;">
                    ${n}
                </div>
            </div>
            <div class="format-card-text">
                <div class="format-card-name">Libero</div>
                <div class="format-card-dims">Custom</div>
            </div>
        </button>
    </div>
`,o={title:`Components/FormatCard`,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Selection card per scegliere il formato del prodotto. Container `.format-cards` con grid 4 col >=480px e 2 col <480px. Card singola `.format-card` con preview proporzionata (full / box-inner / custom) e testo nome/dimensioni. CSS-only: lo stato selezionato e applicato dal CMS aggiungendo `.format-card--selected`. Geometria preview (width/height) impostata dal CMS via inline style per riflettere orientamento e proporzioni."}}}},s={render:()=>r(i(`a4`)),parameters:{docs:{description:{story:`4 card in orientamento verticale (preview 56×79). Card A4 selezionata (preview-box arancio + name arancio + bg highlight).`}}}},c={render:()=>r(i(`a4`)),parameters:{docs:{description:{story:'Markup verbatim derivato da `product-page-integration/js/sections/section-1.js#L199-L266` con `state.orientation === "vertical"` e `formatoChiuso === "a4"`. Le 3 varianti di preview (full box, box-inner dentro dashed, custom con icona) sono tutte visibili.'}}}},l={render:()=>r(a(`a4`)),parameters:{docs:{description:{story:'Stessa griglia ma con `state.orientation === "horizontal"`: preview 79×56, dimensioni testuali invertite. Mostra come la libreria sia indipendente dall\'orientamento (geometria via inline style del CMS).'}}}},u={render:()=>r(i(`libero`)),parameters:{docs:{description:{story:'Variante "Libero" selezionata: la preview-custom si tinge di `rgba(240,138,0,0.2)` con bordo `--color-primary`. Mostra il behavior di `--selected` sulla preview di tipo custom.'}}}},d={render:()=>r(`
        <div class="format-cards">
            <button type="button" class="format-card format-card--selected" data-format="a4">
                <div class="format-card-preview" style="width: 56px; height: 79px;">
                    <span class="format-card-preview-label">A4</span>
                    <div class="format-card-preview-box">
                        <span>A4</span>
                    </div>
                </div>
                <div class="format-card-text">
                    <div class="format-card-name">A4</div>
                    <div class="format-card-dims">210 × 297 mm</div>
                </div>
            </button>
        </div>
    `),parameters:{docs:{description:{story:`Singola card con preview-box (no dashed, no inner): il caso piu semplice, formato che coincide con il riferimento (A4). Utile per validare la regola di base senza overlay.`}}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(verticalGrid('a4')),
  parameters: {
    docs: {
      description: {
        story: '4 card in orientamento verticale (preview 56×79). Card A4 selezionata (preview-box arancio + name arancio + bg highlight).'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(verticalGrid('a4')),
  parameters: {
    docs: {
      description: {
        story: 'Markup verbatim derivato da \`product-page-integration/js/sections/section-1.js#L199-L266\` con \`state.orientation === "vertical"\` e \`formatoChiuso === "a4"\`. Le 3 varianti di preview (full box, box-inner dentro dashed, custom con icona) sono tutte visibili.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(horizontalGrid('a4')),
  parameters: {
    docs: {
      description: {
        story: 'Stessa griglia ma con \`state.orientation === "horizontal"\`: preview 79×56, dimensioni testuali invertite. Mostra come la libreria sia indipendente dall\\'orientamento (geometria via inline style del CMS).'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(verticalGrid('libero')),
  parameters: {
    docs: {
      description: {
        story: 'Variante "Libero" selezionata: la preview-custom si tinge di \`rgba(240,138,0,0.2)\` con bordo \`--color-primary\`. Mostra il behavior di \`--selected\` sulla preview di tipo custom.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => renderRoot(\`
        <div class="format-cards">
            <button type="button" class="format-card format-card--selected" data-format="a4">
                <div class="format-card-preview" style="width: 56px; height: 79px;">
                    <span class="format-card-preview-label">A4</span>
                    <div class="format-card-preview-box">
                        <span>A4</span>
                    </div>
                </div>
                <div class="format-card-text">
                    <div class="format-card-name">A4</div>
                    <div class="format-card-dims">210 × 297 mm</div>
                </div>
            </button>
        </div>
    \`),
  parameters: {
    docs: {
      description: {
        story: 'Singola card con preview-box (no dashed, no inner): il caso piu semplice, formato che coincide con il riferimento (A4). Utile per validare la regola di base senza overlay.'
      }
    }
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`ReferenceFromElementsUI`,`Horizontal`,`LiberoSelected`,`SinglePreviewBox`]}))();export{s as Default,l as Horizontal,u as LiberoSelected,c as ReferenceFromElementsUI,d as SinglePreviewBox,f as __namedExportsOrder,o as default};