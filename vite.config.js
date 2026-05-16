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

// Custom domain (CNAME) → served at root. No CNAME on github.io → served at /repo-name/.
const hasCNAME = existsSync(resolve(__dirname, 'CNAME'));
const base = hasCNAME || !process.env.GITHUB_REPOSITORY
  ? '/'
  : `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`;

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
