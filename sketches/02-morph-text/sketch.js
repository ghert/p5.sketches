import { createSketch } from "/shared/sketch-wrapper.js";
import meta from "./meta.js";

const PARAMS = {
  text: "SKRRRT",
  background: { r: 0, g: 0, b: 0 },
  color1: { r: 0, g: 0, b: 255 },
  color2: { r: 0, g: 255, b: 0 },
  fontSize: 170,
};

createSketch(
  (p, pane) => {
    // Bind params to the pane:
    // pane.addBinding(PARAMS, 'speed', { min: 0, max: 5 });
    let font;
    let points;
    let points2;
    let bounds;

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
      points2 = font.textToPoints(
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
    pane.addBinding(PARAMS, "color1");
    pane.addBinding(PARAMS, "color2");
    pane.addBinding(PARAMS, "fontSize").on("change", redrawText);

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
      points2 = font.textToPoints(
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
      const step2 = (((p.frameCount * 3) % 300) / 100) % 3;
      p.background(
        PARAMS.background.r,
        PARAMS.background.g,
        PARAMS.background.b,
      );
      p.stroke("black");
      for (let i = 1; i < points.length - 2; i += 1) {
        if (step < 2) {
          points[i].x = points[i].x + p.cos(i * 5 + i) / 2;
        } else {
          points[i].x = points[i].x - p.cos(i * 5 + i) / 2;
        }
        if (step2 > 0 && step2 <= 1.5) {
          points[i].y = points[i].y + p.sin(i * 5 + (i % 30)) / 2;
        } else {
          points[i].y = points[i].y - p.sin(i * 5 + (i % 30)) / 2;
        }
      }
      for (let i = 1; i < points.length - 2; i += 1) {
        if (step < 2) {
          points2[i].x = points2[i].x + p.cos(i * 5 + i) / 4;
        } else {
          points2[i].x = points2[i].x - p.cos(i * 5 + i) / 4;
        }
        if (step2 > 0 && step2 <= 1.5) {
          points2[i].y = points2[i].y + p.sin(i * 5 + (i % 30)) / 4;
        } else {
          points2[i].y = points2[i].y - p.sin(i * 5 + (i % 30)) / 4;
        }
      }
      p.stroke(PARAMS.color2.r, PARAMS.color2.g, PARAMS.color2.b);
      p.strokeWeight(3);
      p.strokeJoin(p.ROUND);
      for (let i = 1; i < points.length - 2; i += 1) {
        if (
          Math.abs(points[i].x - points[i + 1].x) < 40 &&
          Math.abs(points[i].y - points[i + 1].y) < 40
        ) {
          p.line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
        }
      }
      p.stroke(PARAMS.color1.r, PARAMS.color1.g, PARAMS.color1.b);
      for (let i = 1; i < points.length - 2; i += 1) {
        if (
          Math.abs(points[i].x - points[i + 1].x) < 40 &&
          Math.abs(points[i].y - points[i + 1].y) < 40
        ) {
          p.line(
            points2[i].x,
            points2[i].y,
            points2[i + 1].x,
            points2[i + 1].y,
          );
        }
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  },
  { title: meta.title },
);
