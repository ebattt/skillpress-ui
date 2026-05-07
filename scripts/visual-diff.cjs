/**
 * Visual diff Skillpress: confronta demo (:5500) vs consumer (:5510) a 3 viewport.
 *
 * Usage:
 *   npm run visual-diff
 *   node scripts/visual-diff.cjs                            # usa default 5500/5510
 *   DEMO=http://192.168.6.115:5500/product-page-integration/ \
 *   CONSUMER=http://192.168.6.115:5510/demo-pages/product-page-integration/ \
 *     node scripts/visual-diff.cjs                          # override URLs
 *
 * Output: scripts/visual-diff-out/{demo,consumer}-{viewport}.png + report.json
 *         con dimensioni elementi chiave per identificare differenze misurabili
 *         + arrowFixed test (drift in pixel della freccia destra durante scroll).
 *
 * Pre-requisiti: Playwright installato globalmente (npx playwright install chromium).
 *                Server demo (:5500) + consumer (:5510) attivi.
 */
function loadChromium() {
    try { return require('playwright').chromium; } catch (_) {}
    try { return require('/Users/elenabattiston/.nvm/versions/node/v20.19.2/lib/node_modules/playwright').chromium; } catch (_) {}
    try {
        const { execSync } = require('child_process');
        const root = execSync('npm root -g', { encoding: 'utf8' }).trim();
        return require(root + '/playwright').chromium;
    } catch (e) {
        console.error('Playwright non trovato. Installa con: npm install -g playwright && npx playwright install chromium');
        process.exit(2);
    }
}
const chromium = loadChromium();
const fs = require('fs');
const path = require('path');

const DEMO = process.env.DEMO || 'http://127.0.0.1:5500/product-page-integration/';
const CONSUMER = process.env.CONSUMER || 'http://127.0.0.1:5510/demo-pages/product-page-integration/';
const OUT_DIR = path.join(__dirname, 'visual-diff-out');

const VIEWPORTS = [
    { name: 'mobile-iphone14',    w: 390, h: 844, isMobile: true  },
    { name: 'mobile-galaxys-360', w: 360, h: 800, isMobile: true  },
    { name: 'tablet',             w: 768, h: 1024, isMobile: false },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const EXPECTED_DRIFTS = {
    body: {
        classification: 'accepted-reference-scope-drift',
        reason: 'Consumer reference renders the public component contract statically and includes explanatory/reference sections that do not exactly match the generated original page height.'
    },
    modeBtn: {
        classification: 'accepted-contract-drift',
        reason: 'Consumer uses BEM ModeSwitcher without Material Symbols; original demo buttons include icon font glyphs.'
    },
    modeBtnActive: {
        classification: 'accepted-contract-drift',
        reason: 'Same as modeBtn: production contract removes Material Symbols dependency.'
    },
    modeBtnInactive: {
        classification: 'accepted-contract-drift',
        reason: 'Same as modeBtn: production contract removes Material Symbols dependency.'
    },
    orientationToggle: {
        classification: 'accepted-contract-drift',
        reason: 'Consumer OrientationToggle omits inline preview SVGs in the reference page; library supports SVG slots but does not require them.'
    },
    orientationBtn: {
        classification: 'accepted-contract-drift',
        reason: 'Same as orientationToggle: original demo includes orientation SVGs, consumer reference omits them.'
    },
    optionBtn: {
        classification: 'accepted-reference-scope-drift',
        reason: 'Original demo generates option buttons only in specific rendered configurator states; consumer reference renders public OptionButtons examples statically.'
    },
    formatCards: {
        classification: 'accepted-layout-tolerance',
        reason: 'Small width delta from consumer public Accordion/layout shell; FormatCard item height matches.'
    },
    formatCard: {
        classification: 'accepted-layout-tolerance',
        reason: 'Small width delta from consumer public Accordion/layout shell; FormatCard height matches.'
    },
    featureGrid: {
        classification: 'accepted-layout-tolerance',
        reason: 'Small height delta from SVG/icon replacement and BEM FeatureBox markup; no overflow or browser errors.'
    },
    priceTableSection: {
        classification: 'accepted-contract-drift',
        reason: 'Consumer uses public PriceTable contract with native/custom scrollbar affordance inside Accordion; original uses legacy generated section shell.'
    },
    priceTableFull: {
        classification: 'accepted-reference-scope-drift',
        reason: 'PriceTable cell widths now follow original auto layout; remaining height delta comes from consumer/static reference content and mobile density wrappers.'
    },
    priceCellBtn: {
        classification: 'accepted-layout-tolerance',
        reason: 'Price cell button width/height is within the visual tolerance after auto table layout and normal line-height alignment.'
    },
    priceQtyBtn: {
        classification: 'accepted-layout-tolerance',
        reason: 'Quantity button is within the visual tolerance after auto table layout alignment.'
    },
    priceArrowRight: {
        classification: 'accepted-contract-drift',
        reason: 'Library intentionally deprecated horizontal overlay arrows in favor of native/custom scrollbar affordance.'
    },
    accordionFirst: {
        classification: 'accepted-architecture-drift',
        reason: 'Original demo uses section-header-btn generated sections; consumer uses public Accordion contract.'
    },
    stepCard: {
        classification: 'accepted-layout-tolerance',
        reason: 'StepIndicator public card contract differs slightly from original step-card wrapper while preserving responsive layout.'
    },
};

/* misura selettori comuni che esistono in entrambe le pagine. */
async function measureCommon(page) {
    return page.evaluate(() => {
        const out = {};
        const sels = {
            body:               'body',
            modeSwitcher:       '.mode-switcher',
            modeBtn:            '.mode-switcher__btn, .mode-btn',
            modeBtnActive:      '.mode-switcher__btn--active, .mode-btn--active',
            modeBtnInactive:    '.mode-switcher__btn--inactive, .mode-switcher__btn:not(.mode-switcher__btn--active), .mode-btn--inactive',
            optionBtn:          '.option-buttons__btn, .option-btn',
            orientationToggle:  '.orientation-toggle',
            orientationBtn:     '.orientation-toggle__btn, .orientation-btn',
            formatCards:        '.format-cards',
            formatCard:         '.format-card',
            featureGrid:        '.feature-grid',
            featureBox:         '.feature-box',
            featureBoxTitle:    '.feature-box__title, .feature-box-title',
            heroImage:          '.image-gallery__container, .hero-image-container',
            heroTitle:          '.product-hero__title, .hero-title',
            priceTableSection:  '.price-table__section, #priceTableContainer',
            priceTableFull:     '.price-table, .price-table-full',
            priceCellBtn:       '.price-table__cell-btn, .price-cell-btn',
            priceQtyBtn:        '.price-table__qty-btn, .price-qty-btn',
            priceArrowRight:    '.price-table__nav-arrow-horizontal--right, .price-nav-arrow-horizontal.right',
            accordionFirst:     '.accordion__section',
            mobileBar:          '.mobile-total-bar',
            stepCard:           '.step-indicator__item, .step-card-item',
        };
        for (const k of Object.keys(sels)) {
            const els = document.querySelectorAll(sels[k]);
            if (els.length === 0) { out[k] = null; continue; }
            const el = els[0];
            const rect = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            out[k] = {
                count: els.length,
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                fontSize: cs.fontSize,
                padding: cs.padding,
                margin: cs.margin,
            };
        }
        out._docWidth = document.documentElement.scrollWidth;
        out._innerWidth = window.innerWidth;
        out._overflowX = document.documentElement.scrollWidth > window.innerWidth;
        return out;
    });
}

async function shoot(browser, url, vp) {
    const ctx = await browser.newContext({
        viewport: { width: vp.w, height: vp.h },
        deviceScaleFactor: 2,
        isMobile: vp.isMobile,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    /* attendi un momento per fetch consumer + auto-init accordion */
    await page.waitForTimeout(800);
    /* apri accordion price-table:
       - demo:    section 6 ("Quantita / consegna") -> click su .section-header-btn relativo
       - consumer: step 2 dell'.accordion -> click sul secondo .accordion__header */
    if (url.includes('5500')) {
        await page.evaluate(() => {
            const btns = document.querySelectorAll('.section-header-btn');
            for (const b of btns) {
                if (b.textContent.toLowerCase().includes('consegna') || b.textContent.toLowerCase().includes('quantit')) {
                    b.click();
                    break;
                }
            }
        });
    } else {
        await page.evaluate(() => {
            const triggers = document.querySelectorAll('.accordion__header');
            if (triggers[1]) triggers[1].click();
        });
    }
    await page.waitForTimeout(700);
    const which = url.includes('5500') ? 'demo' : 'consumer';
    const screenshotPath = path.join(OUT_DIR, `${which}-${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    /* Test "arrow stays fixed during scroll":
       1) misura position freccia destra prima dello scroll
       2) scrolla la tabella di 100px
       3) misura di nuovo: la posizione dovrebbe essere INVARIATA (freccia fissa) */
    const arrowFixed = await page.evaluate(() => {
        /* demo (legacy): .price-nav-arrow-horizontal.right + .price-table-section
           consumer (post-19 BEM): .price-table__nav-arrow-horizontal--right + .price-table__section */
        const arrow = document.querySelector('.price-table__nav-arrow-horizontal--right, .price-nav-arrow-horizontal.right');
        const section = document.querySelector('.price-table__section, .price-table-section, #priceTableContainer');
        if (!arrow || !section) return { ok: 'no-arrow-or-section' };
        const before = arrow.getBoundingClientRect();
        const beforeX = Math.round(before.x);
        section.scrollLeft += 100;
        return new Promise(resolve => {
            setTimeout(() => {
                const after = arrow.getBoundingClientRect();
                const afterX = Math.round(after.x);
                resolve({
                    beforeX,
                    afterX,
                    drift: afterX - beforeX,
                    fixed: Math.abs(afterX - beforeX) < 3,
                });
            }, 400);
        });
    });
    const measures = await measureCommon(page);
    measures._arrowFixed = arrowFixed;
    await ctx.close();
    return { url, viewport: vp.name, screenshotPath, errors, measures };
}

(async () => {
    const browser = await chromium.launch();
    const report = { date: new Date().toISOString(), viewports: [] };
    for (const vp of VIEWPORTS) {
        const demo = await shoot(browser, DEMO, vp);
        const consumer = await shoot(browser, CONSUMER, vp);
        const diffs = [];
        for (const key of Object.keys(demo.measures)) {
            const d = demo.measures[key];
            const c = consumer.measures[key];
            if (key.startsWith('_')) continue;
            if (!d && !c) continue;
            if (!d || !c) {
                diffs.push({
                    key,
                    status: 'missing',
                    demo: !!d,
                    consumer: !!c,
                    ...(EXPECTED_DRIFTS[key] || { classification: 'needs-triage' })
                });
                continue;
            }
            if (Math.abs((d.width||0) - (c.width||0)) > 2 || Math.abs((d.height||0) - (c.height||0)) > 2) {
                diffs.push({
                    key,
                    status: 'size-diff',
                    demo:     `${d.width}x${d.height} f=${d.fontSize}`,
                    consumer: `${c.width}x${c.height} f=${c.fontSize}`,
                    ...(EXPECTED_DRIFTS[key] || { classification: 'needs-triage' })
                });
            }
        }
        const acceptedDiffs = diffs.filter(diff => diff.classification && diff.classification.startsWith('accepted-'));
        const openDiffs = diffs.filter(diff => !diff.classification || !diff.classification.startsWith('accepted-'));
        report.viewports.push({
            viewport: vp.name,
            wxh: `${vp.w}x${vp.h}`,
            demoOverflow: demo.measures._overflowX,
            consumerOverflow: consumer.measures._overflowX,
            demoErrors: demo.errors,
            consumerErrors: consumer.errors,
            acceptedDiffs: acceptedDiffs.length,
            openDiffs: openDiffs.length,
            diffs,
        });
    }
    await browser.close();
    fs.writeFileSync(path.join(OUT_DIR, 'report.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
})().catch(e => { console.error(e); process.exit(2); });
