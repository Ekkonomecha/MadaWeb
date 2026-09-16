/**
 * optimize-assets.mjs
 *
 * The client artwork arrives at print resolution — the logo PNGs are 10176px
 * wide and the whole set is ~4.3MB. Egyptian parents research nurseries on
 * phones, and the parent study in the stakeholder brief treats a slow site as a
 * quality signal, so ship sized WebP instead.
 *
 * Reads from public/assets/_source, writes WebP next to the originals.
 * Re-runnable: it always regenerates from _source.
 *
 * Usage: node scripts/optimize-assets.mjs
 */
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
// Sources live outside public/ so the originals are never served.
const SRC = path.join(root, 'assets-source');
const OUT = path.join(root, 'public/assets');

/** Longest edge, in CSS pixels, at 2x for retina. */
const BUDGET = {
  logo: 1600,
  characters: 900,
  motifs: 1000,
  photos: 1400,
};

const bytes = (n) => `${(n / 1024).toFixed(0)} KB`;

async function run() {
  let before = 0;
  let after = 0;

  for (const group of Object.keys(BUDGET)) {
    const from = path.join(SRC, group);
    const to = path.join(OUT, group);
    await mkdir(to, { recursive: true });

    let files;
    try {
      files = await readdir(from);
    } catch {
      console.log(`skip ${group} — no source directory`);
      continue;
    }

    for (const file of files) {
      const input = path.join(from, file);
      const name = `${path.parse(file).name}.webp`;
      const output = path.join(to, name);

      before += (await stat(input)).size;

      await sharp(input)
        .resize({
          width: BUDGET[group],
          height: BUDGET[group],
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 86, effort: 6 })
        .toFile(output);

      const size = (await stat(output)).size;
      after += size;
      console.log(`${group}/${name.padEnd(26)} ${bytes(size)}`);
    }
  }

  console.log(`\nsource ${bytes(before)}  ->  webp ${bytes(after)}  (${Math.round((1 - after / before) * 100)}% smaller)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
