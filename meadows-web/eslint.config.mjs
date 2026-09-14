import { defineConfig } from 'eslint/config';
import next from 'eslint-config-next';

/**
 * Own config so ESLint stops here instead of walking up to the Mada app's
 * config in the parent directory. eslint-config-next 16 already exports a flat
 * config array, so it is spread directly — no FlatCompat.
 */
export default defineConfig([
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'assets-source/**'] },
  { extends: [...next] },
]);
