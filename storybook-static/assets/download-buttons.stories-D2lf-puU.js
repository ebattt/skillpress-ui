import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./tokens-DCff7C25.js";var n=e((()=>{})),r,i,a,o,s,c,l,u;e((()=>{t(),n(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={title:`Primitives/DownloadButtons`},a=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="config-download-btn" href="#template-placeholder" target="_blank" rel="noopener">
                Template
            </a>
        </div>
    `,e},o={render:a,play:async({canvas:e})=>{await r(e.getByRole(`link`,{name:/Istruzioni/})).toHaveClass(`config-download-btn`),await r(e.getByRole(`link`,{name:/Template/})).toHaveClass(`config-download-btn`)}},s=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
        </div>
    `,e},c=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="config-download-btn" href="#" target="_blank" rel="noopener">
                Template
            </a>
            <a class="config-download-btn" href="#" target="_blank" rel="noopener">
                Scheda tecnica
            </a>
        </div>
    `,e},l=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="config-download-btn" href="#template-placeholder" target="_blank" rel="noopener">
                Template
            </a>
        </div>
    `,e},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: renderDefault,
  play: async ({
    canvas
  }) => {
    await expect(canvas.getByRole('link', {
      name: /Istruzioni/
    })).toHaveClass('config-download-btn');
    await expect(canvas.getByRole('link', {
      name: /Template/
    })).toHaveClass('config-download-btn');
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
        </div>
    \`;
  return container;
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="config-download-btn" href="#" target="_blank" rel="noopener">
                Template
            </a>
            <a class="config-download-btn" href="#" target="_blank" rel="noopener">
                Scheda tecnica
            </a>
        </div>
    \`;
  return container;
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="sidebar-download-divider"></div>
        <div class="config-download-btns">
            <a class="config-download-btn" href="#istruzioni-placeholder" target="_blank" rel="noopener">
                Istruzioni
            </a>
            <a class="config-download-btn" href="#template-placeholder" target="_blank" rel="noopener">
                Template
            </a>
        </div>
    \`;
  return container;
}`,...l.parameters?.docs?.source}}},u=[`Default`,`SingleButton`,`ThreeButtons`,`ReferenceFromElementsUI`]}))();export{o as Default,l as ReferenceFromElementsUI,s as SingleButton,c as ThreeButtons,u as __namedExportsOrder,i as default};