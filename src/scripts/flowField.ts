// Cursor flow field: a grid of ASCII glyphs that orient toward a focus point
// (the cursor) and brighten with proximity, fading to a calm sparse lattice of
// dots everywhere else. Pure + shared so the server-rendered static frame and
// the client-side hover animation build from the EXACT same code: no drift, and
// no blank flash when the animation takes over the element on hover.

export const COLS = 40;
export const ROWS = 20;

// dim -> bright indigo ramp, tuned for the #0B0D14 hero.
const SHADE = ['#232840', '#333B5E', '#4B5590', '#6E79C8', '#A9B6FC'];
// A line has no arrowhead, so four orientations (0/45/90/135 deg) cover every
// direction to the cursor. Box-drawing keeps every glyph the same monospace width.
const ORIENT = ['─', '╲', '│', '╱']; // ─ ╲ │ ╱
const DOT = '·'; // ·

// Resting focus sits just off the right edge, so the static frame carries a
// gentle implied flow from the corner instead of reading as dead noise. On
// hover the focus eases onto the field and blooms toward the cursor.
export const REST_FX = COLS * 0.9;
export const REST_FY = ROWS * 0.36;

function cellAt(c: number, r: number, fx: number, fy: number): [string, string] | null {
  const dx = fx - c;
  const dy = (fy - r) * 1.9; // cells are ~2x taller than wide; compress y to keep circles round
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = COLS * 0.4;
  const prox = Math.max(0, 1 - dist / radius); // 1 at focus -> 0 at the radius
  if (prox <= 0.06) {
    // Calm field: a stable, sparse lattice of faint dots; most cells stay empty.
    return (c * 7 + r * 3) % 5 === 0 ? [DOT, SHADE[0]] : null;
  }
  // Orient the glyph along the line from this cell to the focus.
  let a = Math.atan2(dy, dx);
  if (a < 0) a += Math.PI; // fold to 0..pi (undirected line)
  const bucket = Math.round(a / (Math.PI / 4)) % 4;
  const glyph = prox < 0.16 ? DOT : ORIENT[bucket];
  const shade = SHADE[Math.min(SHADE.length - 1, 1 + Math.floor(prox * 4))];
  return [glyph, shade];
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Build the field as HTML, batching contiguous same-color cells into one span so
// a repaint is a few dozen spans, not COLS*ROWS nodes.
export function buildFieldHtml(fx: number, fy: number): string {
  let out = '';
  for (let r = 0; r < ROWS; r += 1) {
    let runColor = '';
    let runText = '';
    const flush = () => {
      if (runText) out += `<span style="color:${runColor}">${esc(runText)}</span>`;
      runText = '';
    };
    for (let c = 0; c < COLS; c += 1) {
      const cell = cellAt(c, r, fx, fy);
      if (!cell) { flush(); out += ' '; continue; }
      const [glyph, color] = cell;
      if (color !== runColor) { flush(); runColor = color; }
      runText += glyph;
    }
    flush();
    if (r < ROWS - 1) out += '\n';
  }
  return out;
}
