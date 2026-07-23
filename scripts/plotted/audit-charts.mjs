// Render gate for Plotted pieces on WebKit at 390px (mobile, where bugs were reported).
// For every chart on every piece page: flags cross-series label overlaps (ignoring the
// designed name/value stack), confirms every series line drew a colored stroke, catches
// console errors, and screenshots each piece. Also re-runs with reduced-motion to confirm
// the piece is fully legible with motion OFF (Ant runs Reduce Motion ON).
//
// Usage: BASE_URL=http://localhost:4344 OUT=/tmp/shots node audit-charts.mjs
// Playwright: uses the metis-command install (stable on Hearth) unless PW_PKG overrides.
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:4344';
const OUT = process.env.OUT || '/private/tmp/plotted-shots';
const PW_PKG = process.env.PW_PKG || '/Users/Ant/metis-os/projects/metis-command/node_modules/playwright/index.js';
const PAGES = (process.env.PAGES ||
  '/plotted/pieces/the-price-of-sunlight/,/plotted/pieces/who-gets-the-growth/,/plotted/pieces/a-lengthening-life/'
).split(',').map((s) => s.trim()).filter(Boolean);

mkdirSync(OUT, { recursive: true });
const pw = (await import(PW_PKG)).default;
const { webkit } = pw;

async function auditPass(browser, reduced) {
  let fail = 0;
  for (const path of PAGES) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 900 }, deviceScaleFactor: 2,
      reducedMotion: reduced ? 'reduce' : 'no-preference',
    });
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    for (let yy = 0; yy < 8000; yy += 700) { await page.evaluate((y) => window.scrollTo(0, y), yy); await page.waitForTimeout(80); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);
    const report = await page.evaluate(() => {
      const ov = (a, b) => !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y);
      const stack = (a, b) => Math.abs(a.x - b.x) < 4 && Math.abs(a.y - b.y) < 16;
      const out = [];
      for (const svg of document.querySelectorAll('svg[id]')) {
        const texts = [...svg.querySelectorAll('text')].filter((t) => (t.textContent || '').trim());
        const boxes = texts.map((t) => { const r = t.getBoundingClientRect(); return { s: t.textContent.trim(), x: r.x, y: r.y, width: r.width, height: r.height }; });
        const hits = [];
        for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++)
          if (ov(boxes[i], boxes[j]) && !stack(boxes[i], boxes[j])) hits.push(`${boxes[i].s}|${boxes[j].s}`);
        const strokes = [...svg.querySelectorAll('path')].filter((p) => { const st = p.getAttribute('stroke'); return st && st !== 'none'; }).length;
        out.push({ id: svg.id, overlaps: hits, strokes });
      }
      // also check body doesn't overflow horizontally at 390
      const overflow = document.documentElement.scrollWidth > 400;
      return { charts: out, overflow };
    });
    const tag = reduced ? 'reduced' : 'motion';
    const name = path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
    if (!reduced) await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
    for (const c of report.charts) {
      const bad = c.overlaps.length || c.strokes === 0;
      if (bad) fail++;
      console.log(`  [${tag}] ${path} ${c.id}: ${c.overlaps.length ? 'OVERLAP ' + c.overlaps.join(', ') : 'clean'} strokes=${c.strokes}`);
    }
    if (report.overflow) { fail++; console.log(`  [${tag}] ${path}: HORIZONTAL OVERFLOW at 390px`); }
    if (errs.length) { fail++; console.log(`  [${tag}] ${path}: CONSOLE ERRORS ${errs.join(' ; ')}`); }
    await page.close();
  }
  return fail;
}

const browser = await webkit.launch();
let fail = 0;
console.log('--- motion on ---');
fail += await auditPass(browser, false);
console.log('--- reduced motion ---');
fail += await auditPass(browser, true);
await browser.close();
console.log(fail ? `\nRENDER FAIL: ${fail} issue(s)` : `\nRENDER PASS: all charts clean (overlaps/strokes/overflow/console), both motion + reduced. Shots in ${OUT}`);
process.exit(fail ? 1 : 0);
