import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const includedExtensions = new Set(['.astro', '.css', '.json', '.md', '.ts', '.yml', '.yaml']);
const excludedDirs = new Set(['.git', '.astro', 'dist', 'node_modules']);
const rootsToScan = ['src', 'README.md', '.github/workflows'];

const emDash = String.fromCodePoint(0x2014);
const filteredAreaPreambles = [
  'the strategic layer',
  'strategy meant',
  'strategy work',
  'strategic side',
  'the operating side',
  'operating challenge',
  'operations work',
  'the operations work',
  'the product work',
  'automation work',
  'the automation work',
  'work centers on',
  'work focuses on',
  'work spans',
  'my work spans',
];

const bannedText = [
  {
    label: 'em dash',
    test: (line) => line.includes(emDash),
    message: 'Ant voice profile forbids em dashes. Use a colon, semicolon, comma, period, or parentheses.',
  },
  {
    label: 'filtered-area preamble',
    test: (line) => filteredAreaPreambles.some((phrase) => line.toLowerCase().includes(phrase)),
    message: 'Let the accomplishment speak for itself instead of pre-labeling the filter perspective.',
  },
];

function extname(path) {
  const dot = path.lastIndexOf('.');
  return dot === -1 ? '' : path.slice(dot);
}

function walk(path) {
  const stat = statSync(path);
  if (stat.isFile()) return includedExtensions.has(extname(path)) ? [path] : [];

  const out = [];
  for (const entry of readdirSync(path)) {
    if (excludedDirs.has(entry)) continue;
    out.push(...walk(join(path, entry)));
  }
  return out;
}

const files = rootsToScan.flatMap((path) => walk(join(root, path)));
const failures = [];
for (const file of files) {
  const rel = relative(root, file);
  const text = readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  for (const rule of bannedText) {
    lines.forEach((line, index) => {
      if (rule.test(line)) {
        failures.push({ file: rel, line: index + 1, rule: rule.label, message: rule.message, text: line.trim() });
      }
    });
  }
}

if (failures.length > 0) {
  console.error('Copy lint failed:');
  for (const failure of failures) {
    console.error(`- ${failure.file}:${failure.line} [${failure.rule}] ${failure.message}`);
    console.error(`  ${failure.text}`);
  }
  process.exit(1);
}

console.log('Copy lint passed.');
