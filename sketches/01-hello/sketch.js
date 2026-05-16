import { createSketch } from '/shared/sketch-wrapper.js';
import meta from './meta.js';

const PARAMS = {
  count: 60,
  speed: 1.5,
  radius: 6,
  trail: 25,
  color: '#4488ff',
};

createSketch((p, pane) => {
  let balls = [];

  pane.addBinding(PARAMS, 'count', { min: 1, max: 300, step: 1 });
  pane.addBinding(PARAMS, 'speed', { min: 0, max: 8 });
  pane.addBinding(PARAMS, 'radius', { min: 1, max: 40 });
  pane.addBinding(PARAMS, 'trail', { min: 0, max: 255, step: 1, label: 'trail alpha' });
  pane.addBinding(PARAMS, 'color');

  function makeBall() {
    return {
      x: p.random(p.width),
      y: p.random(p.height),
      vx: p.random(-1, 1) || 0.5,
      vy: p.random(-1, 1) || 0.5,
    };
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    balls = Array.from({ length: PARAMS.count }, makeBall);
  };

  p.draw = () => {
    p.background(0, PARAMS.trail);

    while (balls.length < PARAMS.count) balls.push(makeBall());
    if (balls.length > PARAMS.count) balls.length = PARAMS.count;

    p.fill(PARAMS.color);
    p.noStroke();

    for (const b of balls) {
      b.x += b.vx * PARAMS.speed;
      b.y += b.vy * PARAMS.speed;
      if (b.x < 0 || b.x > p.width) b.vx *= -1;
      if (b.y < 0 || b.y > p.height) b.vy *= -1;
      p.circle(b.x, b.y, PARAMS.radius * 2);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}, { title: meta.title });
