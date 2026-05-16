import p5 from 'p5';
import { Pane } from 'tweakpane';

/**
 * Creates a p5 sketch in instance mode alongside a Tweakpane panel.
 *
 * @param {(p: import('p5'), pane: import('tweakpane').Pane) => void} sketchFn
 * @param {{ title?: string, container?: HTMLElement }} [options]
 * @returns {{ p5: p5, pane: import('tweakpane').Pane }}
 */
export function createSketch(sketchFn, { title = 'Controls', container } = {}) {
  const root = container ?? document.getElementById('sketch') ?? document.body;

  if (title) document.title = title;

  const pane = new Pane({ title });

  const instance = new p5((p) => {
    sketchFn(p, pane);
  }, root);

  return { p5: instance, pane };
}
