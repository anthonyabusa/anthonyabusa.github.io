// Accuracy gate for Plotted crossover charts (zero-browser, pure geometry).
// For every line chart with a `crossover`, compute the TRUE intersection of the two
// named series and assert the crossover's label year is within tolerance of it. This
// catches the "hand-typed year drifted off the real crossing" defect deterministically,
// before any render. Reads the piece content JSON straight from disk.
//
// Usage: node measure-crossovers.mjs [contentDir]
//   contentDir defaults to ../../src/data/pieces-content relative to this file.
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const DIR = process.argv[2] || join(here, '..', '..', 'src', 'data', 'pieces-content');
const TOL = 0.5; // years

function firstIntersection(A, B) {
  const xs = [...new Set([...A, ...B].map((p) => p[0]))].sort((a, b) => a - b);
  const yat = (pts, xv) => {
    for (let i = 0; i < pts.length - 1; i++)
      if (xv >= pts[i][0] && xv <= pts[i + 1][0]) {
        const t = (xv - pts[i][0]) / (pts[i + 1][0] - pts[i][0]);
        return pts[i][1] + t * (pts[i + 1][1] - pts[i][1]);
      }
    return xv < pts[0][0] ? pts[0][1] : pts[pts.length - 1][1];
  };
  for (let i = 0; i < xs.length - 1; i++) {
    const x0 = xs[i], x1 = xs[i + 1];
    const d0 = yat(A, x0) - yat(B, x0), d1 = yat(A, x1) - yat(B, x1);
    if (d0 === 0) return x0;
    if (d0 * d1 < 0) { const t = d0 / (d0 - d1); return +(x0 + t * (x1 - x0)).toFixed(3); }
  }
  return null;
}

let fail = 0, checked = 0;
for (const f of readdirSync(DIR).filter((f) => f.endsWith('.json'))) {
  const data = JSON.parse(readFileSync(join(DIR, f), 'utf8'));
  for (const b of (data.blocks || [])) {
    if (b.type !== 'chart' || b.chart?.type !== 'line') continue;
    const c = b.chart, s = c.series || [];
    if (!c.crossover) {
      if (c.mark) { console.log(`  ${f} ${b.chartId}: FAIL hand-placed mark=${c.mark[0]} (must be a derived crossover)`); fail++; }
      continue;
    }
    checked++;
    const [i, j] = c.crossover.series;
    const xi = firstIntersection(s[i].pts, s[j].pts);
    const claimed = parseFloat(c.crossover.label);
    const ok = xi != null && Math.abs(xi - claimed) < TOL;
    if (!ok) fail++;
    console.log(`  ${f} ${b.chartId} ${s[i].label}x${s[j].label}: true=${xi} label=${claimed} ${ok ? 'OK' : '*** FAIL ***'}`);
  }
}
console.log(fail ? `\nACCURACY FAIL: ${fail} issue(s)` : `\nACCURACY PASS: ${checked} crossover(s) derived + accurate (drift < ${TOL}yr)`);
process.exit(fail ? 1 : 0);
