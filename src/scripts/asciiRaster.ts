// Shared ASCII raster engine (#439): rasterizes a source SVG into a text-canvas
// with the site's indigo ramp, letter texture, light sweep, and per-icon
// brightness normalization. One engine drives BOTH the focus cards and the
// hero, so the treatment cannot drift between surfaces. Pulled out of
// AsciiRasterScript.astro when the hero adopted the raster look (Ant option:
// "raster-treat the hero").

export type TextCanvas = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cols: number;
  rows: number;
  cw: number;
  ch: number;
};

export type Knob = (k: string, d: number) => number;

export function setupCanvas(canvas: HTMLCanvasElement, cols: number, rows: number, fontPx = 8): TextCanvas | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.width;
  const cssHeight = canvas.height;
  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  ctx.scale(dpr, dpr);
  ctx.font = `${fontPx}px "JetBrains Mono", ui-monospace, monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  return { canvas, ctx, cols, rows, cw: cssWidth / cols, ch: cssHeight / rows };
}

function drawChar(tc: TextCanvas, col: number, row: number, char: string, opacity: number, color: string) {
  if (col < 0 || row < 0 || col >= tc.cols || row >= tc.rows) return;
  tc.ctx.fillStyle = `rgba(${color}, ${opacity})`;
  tc.ctx.fillText(char, (col + 0.5) * tc.cw, (row + 0.5) * tc.ch);
}

// Draw the source image with motion, resolve gradient, and light sweep onto a
// staging canvas. Motion is one of two modes (Ant, 2026-07-20 "default to full
// movement for the ones we can — turn the gears"):
//   • spin ≠ 0  → CONTINUOUS rotation at `spin` rad-velocity (gears actually
//                 turn, compass rose seeks). Sign sets direction.
//   • spin = 0  → the calmer sine WOBBLE (`wobbleAmp`) for motifs a full
//                 rotation would misread (a rocket or bar chart shouldn't spin).
export function drawSource(
  image: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  tick: number,
  hover: boolean,
  wobbleAmp: number,
  knob: Knob,
  spin = 0,
) {
  ctx.clearRect(0, 0, w, h);
  if (!image || !image.complete || !image.naturalWidth) return;
  const t = tick * (hover ? knob('speedHover', 0.018) : knob('speedRest', 0.011));
  const cx = w * .52;
  const cy = h * .52;
  const fit = Math.min((w * .78) / image.naturalWidth, (h * .78) / image.naturalHeight);
  const drawW = image.naturalWidth * fit;
  const drawH = image.naturalHeight * fit;

  ctx.save();
  ctx.translate(cx, cy);
  // Continuous spin accumulates with `t` (which itself scales with the speed
  // knobs, so spinners also quicken on hover); wobble oscillates in place.
  const angle = spin
    ? t * spin * knob('spin', 1)
    : Math.sin(t) * wobbleAmp * knob('wobble', 1);
  ctx.rotate(angle);
  const scale = hover ? 1.06 : 1;
  ctx.scale(scale, scale);
  ctx.shadowColor = 'rgba(5,7,16,.62)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 13;
  ctx.shadowOffsetY = 15;
  ctx.drawImage(image, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();

  ctx.globalCompositeOperation = 'source-atop';
  const g = ctx.createLinearGradient(w * .25, h * .18, w * .82, h * .88);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(.34, 'rgba(205,216,255,.92)');
  g.addColorStop(.68, 'rgba(108,118,216,.58)');
  g.addColorStop(1, 'rgba(24,28,58,.36)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'source-over';

  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const sweep = (Math.sin(t * 1.8) * .5 + .5) * w;
  const hg = ctx.createLinearGradient(sweep - 90, 0, sweep + 90, h);
  hg.addColorStop(0, 'rgba(255,255,255,0)');
  hg.addColorStop(.48, `rgba(255,255,255,${knob('sweepStrength', 0.20)})`);
  hg.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = hg;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

// Per-icon brightness normalization (Ant, 2026-07-18: "the compass is barely
// discernible while the gears are 100% illuminated"). Source SVGs vary wildly
// in stroke density, so a uniform value ramp renders dense icons hot and
// sparse icons faint. Each icon gets a cached gain landing its p95 pixel
// value on a shared target: sparse strokes boost (cap 2.4x), solid fills damp
// below the white tier so every icon sits in the same indigo texture band.
const NORM_TARGET = 0.72;
const iconGain: Record<string, number> = {};

export function gainFor(key: string, data: Uint8ClampedArray, alphaCut: number): number {
  if (iconGain[key]) return iconGain[key];
  const values: number[] = [];
  for (let i = 0; i < data.length; i += 16) { // every 4th pixel
    const a = data[i + 3] / 255;
    if (a < alphaCut) continue;
    const lum = (data[i] * .2126 + data[i + 1] * .7152 + data[i + 2] * .0722) / 255;
    values.push(Math.max(a * .55, lum * a));
  }
  if (values.length < 40) return 1; // image not ready; do not cache
  values.sort((x, y) => x - y);
  const p95 = values[Math.floor(values.length * 0.95)] || 1;
  iconGain[key] = Math.min(2.4, Math.max(0.45, NORM_TARGET / Math.max(0.05, p95)));
  return iconGain[key];
}

const RAMP = [' ', '.', ':', '-', '+', '*', '#', '@'];

// Rasterize the staging canvas onto the text canvas.
export function renderRaster(
  tc: TextCanvas,
  gainKey: string,
  token: string,
  source: HTMLCanvasElement,
  sourceCtx: CanvasRenderingContext2D,
  tick: number,
  hover: boolean,
  knob: Knob,
) {
  tc.ctx.clearRect(0, 0, Number.parseFloat(tc.canvas.style.width), Number.parseFloat(tc.canvas.style.height));
  const data = sourceCtx.getImageData(0, 0, source.width, source.height).data;
  const phase = Math.floor(tick / (hover ? 5 : 9));
  const alphaCut = knob('alphaCut', 0.045);
  const gain = gainFor(gainKey, data, alphaCut);
  for (let row = 0; row < tc.rows; row += 1) {
    for (let col = 0; col < tc.cols; col += 1) {
      const sx = Math.floor((col + 0.5) / tc.cols * source.width);
      const sy = Math.floor((row + 0.5) / tc.rows * source.height);
      const idx = (sy * source.width + sx) * 4;
      const a = data[idx + 3] / 255;
      if (a < alphaCut) continue;
      const lum = (data[idx] * .2126 + data[idx + 1] * .7152 + data[idx + 2] * .0722) / 255;
      const value = Math.min(1, Math.max(a * .55, lum * a) * gain * knob('contrast', 1));
      const level = Math.max(1, Math.min(RAMP.length - 1, Math.floor(value * RAMP.length)));
      const textured = level >= Math.round(knob('letterLevel', 5));
      const char = textured ? token[(col + row * 2 + phase) % token.length] : RAMP[level];
      const opacity = Math.min(.96, knob('opacityBase', 0.10) + value * knob('opacityGain', 0.92));
      const color = level >= 6 ? '241,245,249' : level >= 4 ? '165,180,252' : '99,102,241';
      drawChar(tc, col, row, char, opacity, color);
    }
  }
}

export function loadImage(src: string): HTMLImageElement {
  const image = new Image();
  image.decoding = 'async';
  image.src = src;
  return image;
}
