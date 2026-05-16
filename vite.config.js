import { defineConfig } from 'vite';
import { readdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function sketchEntries() {
  const dir = resolve(__dirname, 'sketches');
  if (!existsSync(dir)) return {};
  return Object.fromEntries(
    readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('_'))
      .map(d => [d.name, resolve(dir, d.name, 'index.html')])
      .filter(([, p]) => existsSync(p))
  );
}

// In GitHub Actions, GITHUB_REPOSITORY is "owner/repo" — use the repo name as base.
// Locally there's no env var so base stays '/'.
const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/';

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...sketchEntries(),
      },
    },
  },
});
