import { cpSync, existsSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '..');

const name = process.argv[2];

if (!name) {
  console.error('Usage: npm run new <sketch-name>');
  process.exit(1);
}

const src = resolve(root, 'sketches', '_template');
const dest = resolve(root, 'sketches', name);

if (existsSync(dest)) {
  console.error(`Sketch "${name}" already exists.`);
  process.exit(1);
}

cpSync(src, dest, { recursive: true });
console.log(`Created sketches/${name}/`);
console.log(`  Edit sketches/${name}/meta.js and sketches/${name}/sketch.js`);
