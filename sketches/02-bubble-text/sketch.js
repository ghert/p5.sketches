import { createSketch } from "/shared/sketch-wrapper.js";
import meta from "./meta.js";

const PARAMS = {
  text: "bubble",
  background: { r: 255, g: 255, b: 100 },
  color: { r: 255, g: 0, b: 0 },
  fontSize: 140,
};

createSketch(
  (p, pane) => {
    // Bind params to the pane:
    // pane.addBinding(PARAMS, 'speed', { min: 0, max: 5 });
    //
    const redrawText = ({ value, last }) => {
      bounds = font.textBounds(PARAMS.text, 0, 0, PARAMS.fontSize);
      points = font.textToPoints(
        PARAMS.text,
        p.windowWidth / 2 - bounds.w / 2,
        p.windowHeight / 2 + bounds.h / 2,
        PARAMS.fontSize,
        {
          sampleFactor: 0.15,
        },
      );
    };
    pane.addBinding(PARAMS, "text").on("change", redrawText);
    pane.addBinding(PARAMS, "background");
    pane.addBinding(PARAMS, "color");
    pane.addBinding(PARAMS, "fontSize").on("change", redrawText);

    let font;
    let points;
    let bounds;

    p.preload = () => {
      font = p.loadFont("/font.ttf");
    };

    p.setup = () => {
      // Get the point array.
      bounds = font.textBounds(PARAMS.text, 0, 0, PARAMS.fontSize);
      points = font.textToPoints(
        PARAMS.text,
        p.windowWidth / 2 - bounds.w / 2,
        p.windowHeight / 2 + bounds.h / 2,
        PARAMS.fontSize,
        {
          sampleFactor: 0.15,
        },
      );

      p.background(255, 255, 100);
      p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      const step = (((p.frameCount * 3) % 400) / 100) % 4;
      p.background(
        PARAMS.background.r,
        PARAMS.background.g,
        PARAMS.background.b,
      );
      for (let i = 1; i < points.length - 2; i += 1) {
        if (step < 2) {
          points[i].x = points[i].x + p.cos(i * 5) / 4;
        } else {
          points[i].x = points[i].x - p.cos(i * 5) / 4;
        }
        if (step > 0.5 && step < 2.5) {
          points[i].y = points[i].y + p.sin(i * 5) / 4;
        } else {
          points[i].y = points[i].y - p.sin(i * 5) / 4;
        }
      }
      p.stroke(PARAMS.color.r, PARAMS.color.g, PARAMS.color.b);
      p.strokeWeight(2);
      p.strokeJoin(p.ROUND);
      for (let i = 1; i < points.length - 2; i += 1) {
        if (
          Math.abs(points[i].x - points[i + 1].x) < 32 &&
          Math.abs(points[i].y - points[i + 1].y) < 32
        ) {
          p.line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        }
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  },
  { title: meta.title },
);
