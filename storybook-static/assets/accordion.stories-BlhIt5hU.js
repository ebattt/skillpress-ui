import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l,u,d;e((()=>{t=e=>{window.requestAnimationFrame(()=>{e.querySelectorAll(`[data-accordion]`).forEach(e=>{window.SkillpressUI.Accordion.init(e)})})},n=(e=`Contenuto della sezione`)=>`
    <p>${e}</p>
`,r=({number:e=`1`,title:t,expanded:r=!1,withBadge:i=!0,content:a=n()})=>`
    <section class="accordion__section${r?` expanded`:``}" data-accordion-section>
        <button class="accordion__header" type="button" data-accordion-trigger aria-expanded="${r?`true`:`false`}">
            <span class="accordion__header-left">
                ${i?`<span class="accordion__badge">${e}</span>`:``}
                <span class="accordion__title">${t}</span>
            </span>
            <span class="accordion__icon" aria-hidden="true"></span>
        </button>
        <div class="accordion__content">
            <div class="accordion__inner">
                ${a}
            </div>
        </div>
    </section>
`,i=e=>{let n=document.createElement(`div`);return n.innerHTML=`
        <div style="max-width: 760px;">
            <div class="accordion" data-accordion>
                ${e.join(``)}
            </div>
        </div>
    `,t(n),n},a={title:`Primitives/Accordion`,tags:[`autodocs`],parameters:{docs:{description:{component:`Accordion Section minimale della libreria. Il backend controlla contenuto, sezioni visibili e stato iniziale; la libreria controlla markup, CSS, aria e toggle locale.`}}}},o={render:()=>i([r({title:`Accordion Section`,content:n(`Slot content popolato dal consumer.`)})])},s={render:()=>i([r({title:`Accordion Section`,expanded:!0,content:n(`Questa sezione parte aperta tramite classe expanded e aria-expanded true.`)})])},c={render:()=>i([r({number:`1`,title:`Formato`,expanded:!0,content:n(`Prima sezione aperta.`)}),r({number:`2`,title:`Carta`,content:n(`Seconda sezione chiusa.`)}),r({number:`3`,title:`Riepilogo`,content:n(`Terza sezione chiusa.`)})])},l={render:()=>i([r({title:`Accordion senza badge`,withBadge:!1,content:n(`Il badge numerato e opzionale; il layout header resta valido.`)})])},u={render:()=>i([r({number:`1`,title:`Contenuto strutturato`,expanded:!0,content:`
                <p>Lo slot interno puo contenere markup del consumer, purche resti dentro <code>.accordion__inner</code>.</p>
                <ul>
                    <li>Testo descrittivo</li>
                    <li>Liste semplici</li>
                    <li>Blocchi futuri della libreria</li>
                </ul>
            `})])},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => renderAccordion([createSection({
    title: 'Accordion Section',
    content: createContent('Slot content popolato dal consumer.')
  })])
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => renderAccordion([createSection({
    title: 'Accordion Section',
    expanded: true,
    content: createContent('Questa sezione parte aperta tramite classe expanded e aria-expanded true.')
  })])
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => renderAccordion([createSection({
    number: '1',
    title: 'Formato',
    expanded: true,
    content: createContent('Prima sezione aperta.')
  }), createSection({
    number: '2',
    title: 'Carta',
    content: createContent('Seconda sezione chiusa.')
  }), createSection({
    number: '3',
    title: 'Riepilogo',
    content: createContent('Terza sezione chiusa.')
  })])
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => renderAccordion([createSection({
    title: 'Accordion senza badge',
    withBadge: false,
    content: createContent('Il badge numerato e opzionale; il layout header resta valido.')
  })])
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderAccordion([createSection({
    number: '1',
    title: 'Contenuto strutturato',
    expanded: true,
    content: \`
                <p>Lo slot interno puo contenere markup del consumer, purche resti dentro <code>.accordion__inner</code>.</p>
                <ul>
                    <li>Testo descrittivo</li>
                    <li>Liste semplici</li>
                    <li>Blocchi futuri della libreria</li>
                </ul>
            \`
  })])
}`,...u.parameters?.docs?.source}}},d=[`Collapsed`,`Expanded`,`MultipleSections`,`WithoutBadge`,`PopulatedContentSlot`]}))();export{o as Collapsed,s as Expanded,c as MultipleSections,u as PopulatedContentSlot,l as WithoutBadge,d as __namedExportsOrder,a as default};