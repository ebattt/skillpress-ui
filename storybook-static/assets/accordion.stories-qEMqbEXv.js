import{t as e}from"./chunk-BvrOYcoh.js";var t,n,r,i,a,o,s,c,l,u,d,f;e((()=>{({expect:t}=__STORYBOOK_MODULE_TEST__),n=e=>{window.requestAnimationFrame(()=>{e.querySelectorAll(`[data-accordion]`).forEach(e=>{window.SkillpressUI.Accordion.init(e)})})},r=(e=`Contenuto della sezione`)=>`
    <p>${e}</p>
`,i=({number:e=`1`,title:t,expanded:n=!1,withBadge:i=!0,content:a=r()})=>`
    <section class="accordion__section${n?` expanded`:``}" data-accordion-section>
        <button class="accordion__header" type="button" data-accordion-trigger aria-expanded="${n?`true`:`false`}">
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
`,a=e=>{let t=document.createElement(`div`);return t.innerHTML=`
        <div style="max-width: 760px;">
            <div class="accordion" data-accordion>
                ${e.join(``)}
            </div>
        </div>
    `,n(t),t},o={title:`Primitives/Accordion`,tags:[`autodocs`],parameters:{docs:{description:{component:`Accordion Section minimale della libreria. Il backend controlla contenuto, sezioni visibili e stato iniziale; la libreria controlla markup, CSS, aria e toggle locale.`}}}},s={render:()=>a([i({title:`Accordion Section`,content:r(`Slot content popolato dal consumer.`)})]),play:async({canvas:e,userEvent:n})=>{let r=e.getByRole(`button`,{name:/Accordion Section/});await t(r).toHaveAttribute(`aria-expanded`,`false`),await n.click(r),await t(r).toHaveAttribute(`aria-expanded`,`true`),await n.click(r),await t(r).toHaveAttribute(`aria-expanded`,`false`)}},c={render:()=>a([i({title:`Accordion Section`,expanded:!0,content:r(`Questa sezione parte aperta tramite classe expanded e aria-expanded true.`)})])},l={render:()=>a([i({number:`1`,title:`Formato`,expanded:!0,content:r(`Prima sezione aperta.`)}),i({number:`2`,title:`Carta`,content:r(`Seconda sezione chiusa.`)}),i({number:`3`,title:`Riepilogo`,content:r(`Terza sezione chiusa.`)})]),play:async({canvas:e,userEvent:n,step:r})=>{let i=e.getByRole(`button`,{name:/Formato/}),a=e.getByRole(`button`,{name:/Carta/});await r(`initial: section 1 open, sections 2-3 closed`,async()=>{await t(i).toHaveAttribute(`aria-expanded`,`true`),await t(a).toHaveAttribute(`aria-expanded`,`false`)}),await r(`single-open: opening 2 closes 1`,async()=>{await n.click(a),await t(a).toHaveAttribute(`aria-expanded`,`true`),await t(i).toHaveAttribute(`aria-expanded`,`false`)})}},u={render:()=>a([i({title:`Accordion senza badge`,withBadge:!1,content:r(`Il badge numerato e opzionale; il layout header resta valido.`)})])},d={render:()=>a([i({number:`1`,title:`Contenuto strutturato`,expanded:!0,content:`
                <p>Lo slot interno puo contenere markup del consumer, purche resti dentro <code>.accordion__inner</code>.</p>
                <ul>
                    <li>Testo descrittivo</li>
                    <li>Liste semplici</li>
                    <li>Blocchi futuri della libreria</li>
                </ul>
            `})])},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => renderAccordion([createSection({
    title: 'Accordion Section',
    content: createContent('Slot content popolato dal consumer.')
  })]),
  play: async ({
    canvas,
    userEvent
  }) => {
    const trigger = canvas.getByRole('button', {
      name: /Accordion Section/
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => renderAccordion([createSection({
    title: 'Accordion Section',
    expanded: true,
    content: createContent('Questa sezione parte aperta tramite classe expanded e aria-expanded true.')
  })])
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
  })]),
  play: async ({
    canvas,
    userEvent,
    step
  }) => {
    const t1 = canvas.getByRole('button', {
      name: /Formato/
    });
    const t2 = canvas.getByRole('button', {
      name: /Carta/
    });
    await step('initial: section 1 open, sections 2-3 closed', async () => {
      await expect(t1).toHaveAttribute('aria-expanded', 'true');
      await expect(t2).toHaveAttribute('aria-expanded', 'false');
    });
    await step('single-open: opening 2 closes 1', async () => {
      await userEvent.click(t2);
      await expect(t2).toHaveAttribute('aria-expanded', 'true');
      await expect(t1).toHaveAttribute('aria-expanded', 'false');
    });
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => renderAccordion([createSection({
    title: 'Accordion senza badge',
    withBadge: false,
    content: createContent('Il badge numerato e opzionale; il layout header resta valido.')
  })])
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}},f=[`Collapsed`,`Expanded`,`MultipleSections`,`WithoutBadge`,`PopulatedContentSlot`]}))();export{s as Collapsed,c as Expanded,l as MultipleSections,d as PopulatedContentSlot,u as WithoutBadge,f as __namedExportsOrder,o as default};