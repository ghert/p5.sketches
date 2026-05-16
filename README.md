# p5 Sketches

A collection of p5.js sketches. Each sketch has a Tweakpane control panel.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to browse the gallery.

## Adding a sketch

```bash
npm run new my-sketch-name
```

This copies the template into `sketches/my-sketch-name/`. Edit:

- `meta.js` — title and description shown in the gallery
- `sketch.js` — your p5 code

## Sketch structure

```js
import { createSketch } from '/shared/sketch-wrapper.js';
import meta from './meta.js';

const PARAMS = {
  speed: 1,
};

createSketch((p, pane) => {
  pane.addBinding(PARAMS, 'speed', { min: 0, max: 5 });

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);
    // draw here
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}, { title: meta.title });
```

`createSketch` gives you a p5 instance in **instance mode** (no global namespace pollution) and a Tweakpane panel wired up together.

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the build locally
```
