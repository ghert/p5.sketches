import { createSketch } from '/shared/sketch-wrapper.js';
import meta from './meta.js';

const PARAMS = {
  // Define your Tweakpane-controlled parameters here.
  // example: speed: 1,
};

createSketch((p, pane) => {
  // Bind params to the pane:
  // pane.addBinding(PARAMS, 'speed', { min: 0, max: 5 });
  //
  // React to a change (value, last — last is true on pointer release):
  // pane.addBinding(PARAMS, 'speed').on('change', ({ value, last }) => {
  //   // runs every time the control moves
  // });

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);
    // Draw here.
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}, { title: meta.title });
