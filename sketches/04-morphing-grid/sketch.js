import { createSketch } from "/shared/sketch-wrapper.js";
import meta from "./meta.js";

createSketch(
  (p, pane) => {
    let grid = [];
    let points = [];

    const BPM = 45;
    const beatMs = 60000 / BPM; // 666.666 ms per beat

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background(220);

      // time in beats
      let t = p.millis() / beatMs; // musical time instead of frameCount
      const count = t * p.TWO_PI; // smooth cyclic motion

      grid = [...Array(Math.ceil(p.windowWidth / 15))].map((x, xindex) =>
        [...Array(Math.ceil(p.windowHeight / 15))].map(
          (y, yindex) =>
            p.noise(
              p.sin((count / 128) * xindex * 0.15) +
                p.cos(count * 0.05) * xindex * 0.1 +
                p.tan(t) / 10,
              p.cos((count / 128) * yindex * 0.1) +
                p.sin(count * 0.1) * (32 - yindex) * 0.05,
            ) * 3,
        ),
      );

      grid.forEach((row, x) => {
        row.forEach((cell, y) => {
          p.noStroke();
          p.fill(cell > 2 ? 255 : 0, cell * 100, cell % 2 > 1 ? 255 : 100);
          p.rect(x * 15, y * 15, 15, 15);
        });
      });

      grid.forEach((row, x) => {
        row.forEach((cell, y) => {
          if (cell < 0.5) {
            points.push({ x: x * 15 + 15, y: y * 15 + 15 });
            p.fill(255);
            p.circle(x * 15 + 15, y * 15 + 15, 15 * cell * cell);
          } else if (cell > 2) {
            points.push({ x: x * 15 + 15, y: y * 15 + 15 });
          }
        });
      });

      points.forEach((point, index) => {
        if (index < points.length - 1) {
          p.strokeWeight(2);
          p.stroke(255);
          p.line(point.x, point.y, points[index + 1].x, points[index + 1].y);
        }
      });

      points = [];
    };
  },
  { title: meta.title },
);
