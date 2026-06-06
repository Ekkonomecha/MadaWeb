// Generates on-brand vector mascot SVGs for Mada's 6 curriculum pillars,
// then rasterizes each to PNG via sharp. Pure vector — no font/emoji deps.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'characters');

// Distinct organic blob outlines so each mascot has its own silhouette.
const blobs = [
  'M250 60c70 0 130 38 142 108 12 66-24 138-94 162-60 20-138 14-180-34C76 250 64 170 96 112 130 50 180 60 250 60Z',
  'M250 56c84 0 150 50 152 130 2 74-50 150-130 162-66 10-140-22-160-92C90 178 110 110 160 80 200 56 210 56 250 56Z',
  'M250 64c66 0 138 30 150 102 12 70-30 150-104 168-66 16-140-18-160-88C112 168 130 100 178 72 214 52 200 64 250 64Z',
];

// emblem(color) -> inner SVG markup for the domain symbol, drawn around cx=250 cy=235.
const characters = [
  {
    id: 'brushi', color: '#FE7163', name: 'Brushi', domain: 'Art',
    emblem: `<g transform="translate(250 250)">
      <rect x="-10" y="-78" width="20" height="70" rx="9" fill="#0A1240"/>
      <path d="M-16 -12 H16 L22 14 Q0 28 -22 14 Z" fill="#FFDA3B"/>
      <path d="M-8 14 Q0 40 8 14 Z" fill="#0A1240"/></g>`,
  },
  {
    id: 'ratio', color: '#005CFF', name: 'Ratio', domain: 'Math', face: 'light',
    emblem: `<g transform="translate(250 250)" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round">
      <path d="M-30 -20 H30 M-30 20 H30 M-12 -40 V40 M12 -40 V40"/></g>`,
  },
  {
    id: 'lingo', color: '#4628D3', name: 'Lingo', domain: 'Languages', face: 'light',
    emblem: `<g transform="translate(250 250)">
      <rect x="-44" y="-30" width="88" height="56" rx="16" fill="#fff"/>
      <path d="M-18 26 L-2 26 L-26 48 Z" fill="#fff"/>
      <circle cx="-20" cy="-2" r="6" fill="#4628D3"/><circle cx="0" cy="-2" r="6" fill="#4628D3"/><circle cx="20" cy="-2" r="6" fill="#4628D3"/></g>`,
  },
  {
    id: 'akktiv', color: '#FFDA3B', name: 'Akktiv', domain: 'Movement',
    emblem: `<g transform="translate(250 250)">
      <path d="M14 -52 L-26 8 H2 L-12 52 L30 -10 H0 Z" fill="#0A1240"/></g>`,
  },
  {
    id: 'cuddies', color: '#FFB3AF', name: 'Cuddies', domain: 'Empathy',
    emblem: `<g transform="translate(250 248)">
      <path d="M0 36 C-46 4 -42 -42 -14 -42 C-2 -42 0 -30 0 -26 C0 -30 2 -42 14 -42 C42 -42 46 4 0 36Z" fill="#FF3B61"/></g>`,
  },
  {
    id: 'scopii', color: '#64FFD5', name: 'Scopii', domain: 'Science',
    emblem: `<g transform="translate(250 250)">
      <circle cx="-8" cy="-8" r="30" fill="none" stroke="#0A1240" stroke-width="12"/>
      <line x1="14" y1="14" x2="42" y2="42" stroke="#0A1240" stroke-width="14" stroke-linecap="round"/>
      <circle cx="-8" cy="-8" r="14" fill="#fff" opacity="0.6"/></g>`,
  },
];

const buildSvg = (c, i) => {
  const blob = blobs[i % blobs.length];
  const dark = '#0A1240';
  // Light-bodied mascots get dark facial features; dark bodies get... still dark works on bright blobs.
  const eye = dark;
  const cheek = c.face === 'light' ? '#FFFFFF' : '#FF3B61';
  const cheekOp = c.face === 'light' ? 0.25 : 0.35;
  return `<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${c.name} — ${c.domain}">
  <defs>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="${c.color}" flood-opacity="0.35"/>
    </filter>
  </defs>
  <path d="${blob}" fill="${c.color}" filter="url(#s)"/>
  <!-- face -->
  <ellipse cx="212" cy="168" rx="13" ry="17" fill="${eye}"/>
  <ellipse cx="288" cy="168" rx="13" ry="17" fill="${eye}"/>
  <circle cx="216" cy="162" r="4" fill="#fff"/>
  <circle cx="292" cy="162" r="4" fill="#fff"/>
  <path d="M222 196 Q250 224 278 196" fill="none" stroke="${eye}" stroke-width="9" stroke-linecap="round"/>
  <circle cx="180" cy="190" r="15" fill="${cheek}" opacity="${cheekOp}"/>
  <circle cx="320" cy="190" r="15" fill="${cheek}" opacity="${cheekOp}"/>
  <!-- domain emblem -->
  ${c.emblem}
</svg>`;
};

const run = async () => {
  for (let i = 0; i < characters.length; i++) {
    const c = characters[i];
    const svg = buildSvg(c, i);
    const svgPath = path.join(dir, `${c.id}.svg`);
    writeFileSync(svgPath, svg);
    await sharp(Buffer.from(svg)).resize(500, 500).png().toFile(path.join(dir, `${c.id}.png`));
    console.log(`✓ ${c.id} (svg + png)`);
  }
};
run();
