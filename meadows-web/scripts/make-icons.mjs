/**
 * make-icons.mjs
 *
 * Meadows supplied a wordmark only — no separate logomark. The brand
 * guidelines permit the symbol alone on websites, so the icon is the
 * wordmark's leading "M" cropped out and set in negative on the primary
 * teal, which the guidelines list as a correct usage.
 *
 * Usage: node scripts/make-icons.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(root, 'assets-source/logo/meadows-logo-white.png');
const TEAL = { r: 0x18, g: 0x89, b: 0x72, alpha: 1 };

/**
 * A generous box around the leading "M" of the 10176x3552 wordmark, then
 * trimmed to the letterform's own bounds so the icon is the M alone and not
 * the start of "Me".
 */
const CROP = { left: 880, top: 470, width: 2040, height: 2440 };

async function make(file, size, pad) {
  const inner = size - pad * 2;

  const mark = await sharp(SOURCE)
    .extract(CROP)
    .resize(inner, inner, { fit: 'contain', background: { ...TEAL, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: TEAL },
  })
    .composite([{ input: mark, top: pad, left: pad }])
    .png()
    .toFile(path.join(root, 'app', file));

  console.log(`app/${file}  ${size}x${size}`);
}

await make('icon.png', 512, 64);
await make('apple-icon.png', 180, 20);
