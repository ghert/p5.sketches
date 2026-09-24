import { createSketch } from "/shared/sketch-wrapper.js";
import meta from "./meta.js";

let spacing = 48;
let points = [];
let vibs = [];
let zooms = [];

const letters = {
  g: [
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0.5],
    [0.5, 0.5],
  ],
  e: [
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
  ],
  n: [
    [0, 1],
    [0, 0],
    [1, 1],
    [1, 0],
  ],
  u: [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  a: [
    [0, 1],
    [0, 0],
    [1, 0],
    [1, 1],
  ],
  r: [
    [0, 1],
    [0, 0],
    [1, 0],
    [0, 0.7],
    [1, 1],
  ],
  y: [
    [0, 0],
    [0.5, 0.5],
    [0.5, 1.15],
    [0.5, 0.5],
    [1, 0],
  ],
};

createSketch(
  (p, pane) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      points = Object.values(letters).map((letter) =>
        letter.map(([x, y]) => p.createVector(x, y)),
      );
      vibs = Object.values(letters).map((letter) =>
        letter.map(([x, y]) => p.createVector(x, y)),
      );
      zooms = Object.values(letters).map((letter) =>
        letter.map(([x, y]) => p.createVector((x - 0.5) * 4, (y - 0.5) * 4)),
      );
    };

    p.draw = () => {
      const fc = p.frameCount - 60;
      p.orbitControl();
      if (fc % 360 > 180) {
        p.background(0);
      } else {
        p.background(250, 0, 100);
      }

      if (fc < 240 && fc > 0) {
        if (fc % 120 < 30) {
          vibs = Object.values(letters).map((letter) =>
            letter.map(([x, y]) => p.createVector(y, x)),
          );
        } else if (fc % 120 < 60) {
          vibs = Object.values(letters).map((letter) =>
            letter.map(([x, y]) => p.createVector(y, 1 - x)),
          );
        } else if (fc % 120 < 90) {
          vibs = Object.values(letters).map((letter) =>
            letter.map(([x, y]) => p.createVector(1 - y, 1 - x)),
          );
        } else if (fc % 120 < 120) {
          vibs = Object.values(letters).map((letter) =>
            letter.map(([x, y]) => p.createVector(1 - y, x)),
          );
        }
      } else if (fc > 0 && fc < 480) {
        vibs = Object.values(letters).map((letter, index) => {
          const i = index + Math.floor(fc / 30);
          if (fc > 360 && index % 3 == Math.floor(fc / 30) % 3) {
            return letter.map(([x, y]) => p.createVector(x, y));
          }
          if (i % 4 == 0) {
            return letter.map(([x, y]) => p.createVector(x, y));
          } else if (i % 4 == 1) {
            return letter.map(([x, y]) => p.createVector(y, 1 - x));
          } else if (i % 4 == 2) {
            return letter.map(([x, y]) => p.createVector(1 - x, 1 - y));
          } else if (i % 4 == 3) {
            return letter.map(([x, y]) => p.createVector(1 - y, x));
          }
        });
      } else if (fc < 720 && fc > 0) {
        vibs = Object.values(letters).map((letter, index) => {
          const i = index + Math.floor(fc / 30);
          if (i % 7 == 0) {
            return letter.map(([x, y]) => p.createVector(x * 2, y));
          } else if (i % 7 == 1) {
            return letter.map(([x, y]) => p.createVector(x / 2, y));
          } else if (i % 7 == 2) {
            return letter.map(([x, y]) => p.createVector(y, x));
          } else if (i % 7 == 3) {
            return letter.map(([x, y]) => p.createVector(y / 2, x));
          } else if (i % 7 == 4) {
            return letter.map(([x, y]) => p.createVector(y, x));
          } else if (i % 7 == 6) {
            return letter.map(([x, y]) => p.createVector(x, y));
          } else {
            return letter.map(([x, y]) => p.createVector(y / 2, x));
          }
        });
      } else if (fc > 0) {
        if (fc > 960) {
          p.rotateY((fc - 960) * 0.01);
        }
        vibs = Object.values(letters).map((letter, index) => {
          const i = index + Math.floor(fc / 30);
          if (fc > 360 && index % 3 == Math.floor(fc / 30) % 3) {
            return letter.map(([x, y]) => p.createVector(x, y));
          }
          if (i % 4 == 0) {
            return letter.map(([x, y]) =>
              p.createVector((x - 0.5) * 1.5, (y - 0.5) * 0.5),
            );
          } else if (i % 4 == 1) {
            return letter.map(([x, y]) => p.createVector((y - 0.5) * 0.5, 1 - x));
          } else if (i % 4 == 2) {
            return letter.map(([x, y]) =>
              p.createVector(1 - (x - 0.5) * 1, 1 - (y - 0.5) * 3),
            );
          } else if (i % 4 == 3) {
            return letter.map(([x, y]) => p.createVector(1 - (y - 0.5) * 0.5 * 2, x));
          }
        });
      };
      points.forEach((l, index) => {
        p.noFill();
        if (fc % 360 > 180) {
          p.stroke(250, 0, 100);
        } else {
          p.stroke(0);
        }
        p.strokeWeight(10);
        p.strokeJoin(p.BEVEL);
        p.strokeCap(p.PROJECT);
        p.beginShape();
        l.forEach((v, pIndex) => {
          p.vertex(
            -290 + spacing + v.x * spacing + index * spacing * 1.5,
            v.y * spacing,
          );
          if (fc > 0) {
            v.lerp(vibs[index][pIndex], 1 / 6);
          }
        });
        p.endShape();
      });
    }
  },
  { title: meta.title },
);
