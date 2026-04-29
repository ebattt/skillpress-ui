import{t as e}from"./chunk-BvrOYcoh.js";import{t}from"./tokens-DCff7C25.js";var n=e((()=>{})),r,i,a,o,s,c,l,u,d,f,p;e((()=>{t(),n(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={title:`Primitives/ModeSwitcher`},a=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z"/></svg>`,o=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"/></svg>`,s=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="mode-switcher" role="group" aria-label="Seleziona modalità di configurazione">
            <button class="mode-btn mode-btn--active" aria-pressed="true">
                ${a}
                Veloce
            </button>
            <button class="mode-btn mode-btn--inactive" aria-pressed="false">
                ${o}
                Avanzata
            </button>
        </div>
    `,e},c={render:s,play:async({canvas:e})=>{let t=e.getByRole(`button`,{name:/Veloce/}),n=e.getByRole(`button`,{name:/Avanzata/});await r(t).toHaveAttribute(`aria-pressed`,`true`),await r(t).toHaveClass(`mode-btn--active`),await r(n).toHaveAttribute(`aria-pressed`,`false`),await r(n).toHaveClass(`mode-btn--inactive`)}},l=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="mode-switcher" role="group" aria-label="Seleziona modalità di configurazione">
            <button class="mode-btn mode-btn--inactive" aria-pressed="false">
                ${a}
                Veloce
            </button>
            <button class="mode-btn mode-btn--active" aria-pressed="true">
                ${o}
                Avanzata
            </button>
        </div>
    `,e},u=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="mode-switcher" role="group" aria-label="Seleziona modalità">
            <button class="mode-btn mode-btn--active" aria-pressed="true">
                Singolo
            </button>
            <button class="mode-btn mode-btn--inactive" aria-pressed="false">
                Multicopia
            </button>
        </div>
    `,e},d=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="mode-switcher" role="group" aria-label="Seleziona vista">
            <button class="mode-btn mode-btn--active" aria-pressed="true">
                Griglia
            </button>
            <button class="mode-btn mode-btn--inactive" aria-pressed="false">
                Lista
            </button>
            <button class="mode-btn mode-btn--inactive" aria-pressed="false">
                Compatta
            </button>
        </div>
    `,e},f=()=>{let e=document.createElement(`div`);return e.innerHTML=`
        <div class="mode-switcher" role="group" aria-label="Seleziona modalità di configurazione">
            <button id="modeVeloce" class="mode-btn mode-btn--active" aria-pressed="true">
                ${a}
                Veloce
            </button>
            <button id="modeAvanzata" class="mode-btn mode-btn--inactive" aria-pressed="false">
                ${o}
                Avanzata
            </button>
        </div>
    `,e},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: renderDefault,
  play: async ({
    canvas
  }) => {
    const veloce = canvas.getByRole('button', {
      name: /Veloce/
    });
    const avanzata = canvas.getByRole('button', {
      name: /Avanzata/
    });
    await expect(veloce).toHaveAttribute('aria-pressed', 'true');
    await expect(veloce).toHaveClass('mode-btn--active');
    await expect(avanzata).toHaveAttribute('aria-pressed', 'false');
    await expect(avanzata).toHaveClass('mode-btn--inactive');
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="mode-switcher" role="group" aria-label="Seleziona modalità di configurazione">
            <button class="mode-btn mode-btn--inactive" aria-pressed="false">
                \${boltSVG}
                Veloce
            </button>
            <button class="mode-btn mode-btn--active" aria-pressed="true">
                \${settingsSVG}
                Avanzata
            </button>
        </div>
    \`;
  return container;
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="mode-switcher" role="group" aria-label="Seleziona modalità">
            <button class="mode-btn mode-btn--active" aria-pressed="true">
                Singolo
            </button>
            <button class="mode-btn mode-btn--inactive" aria-pressed="false">
                Multicopia
            </button>
        </div>
    \`;
  return container;
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="mode-switcher" role="group" aria-label="Seleziona vista">
            <button class="mode-btn mode-btn--active" aria-pressed="true">
                Griglia
            </button>
            <button class="mode-btn mode-btn--inactive" aria-pressed="false">
                Lista
            </button>
            <button class="mode-btn mode-btn--inactive" aria-pressed="false">
                Compatta
            </button>
        </div>
    \`;
  return container;
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const container = document.createElement('div');
  container.innerHTML = \`
        <div class="mode-switcher" role="group" aria-label="Seleziona modalità di configurazione">
            <button id="modeVeloce" class="mode-btn mode-btn--active" aria-pressed="true">
                \${boltSVG}
                Veloce
            </button>
            <button id="modeAvanzata" class="mode-btn mode-btn--inactive" aria-pressed="false">
                \${settingsSVG}
                Avanzata
            </button>
        </div>
    \`;
  return container;
}`,...f.parameters?.docs?.source}}},p=[`Default`,`SecondActive`,`WithoutIcons`,`ThreeOptions`,`ReferenceFromElementsUI`]}))();export{c as Default,f as ReferenceFromElementsUI,l as SecondActive,d as ThreeOptions,u as WithoutIcons,p as __namedExportsOrder,i as default};