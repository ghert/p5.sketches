import { createSketch } from "/shared/sketch-wrapper.js";
import meta from "./meta.js";

createSketch(
  (p, pane) => {

    function building(x, y, depth, color, width, height, up, off) {
      p.push();
      p.translate(-160 + x, -160 + y, depth / 2 + (up || 0));
      p.ambientMaterial(color, color, color);
      p.box(width || 32, height || 32, depth);

      if (!off) {
        p.translate(0, 16, 0);
        p.ambientMaterial(50, 50, 100);
        p.box(8, 1, 8);

        p.translate(16, -16, 0);
        p.ambientMaterial(50, 50, 100);
        p.box(1, 8, 8);

        p.translate(-16, -16, 0);
        p.ambientMaterial(50, 50, 100);
        p.box(8, 1, 8);
      }
      p.pop();
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    };

    p.draw = () => {
      p.scale(1.4);
      p.rotateX(p.frameCount > 320 ? (p.frameCount > 480 ? -1 : 0) : 1.2);
      p.rotateZ(p.frameCount * 0.005);
      p.background(200, 200, 200);
      p.ambientLight(255, 255, 255);
      p.ambientMaterial(130, 150, 90);

      building(32, 32, 32, 100);
      building(96, 32, 96, 30);
      building(32, 96, 96, 150);
      building(96, 32, 96, 30);
      building(128, 32, 32, 50);
      building(128 + 64, 32, 96, 50);
      building(128, 32, 32, 50);

      building(192, 32, 32, 120, 64, 64);
      building(192, 128, 16, 100, 96, 32);
      building(128 + 32, 128, 128, 160, 32, 32, 16);

      building(128 + 32, 128 + 96, 16, 128, 128, 64);
      building(128 + 32, 128 + 96, 72, 96, 128 - 32, 32, 16);

      building(196 - 32, 320 - 32, 8, 16, 128 - 32, 32, 0);

      building(320 - 24, 320 - 24, 8, 100, 32, 32, 0);
      building(320 - 24, 320 - 64 - 8, 16, 140, 32, 32, 0);
      building(320 - 24, 320 - 96 - 24, 8, 100, 32, 32, 0);

      building(320 - 24, 128 - 48 - 8, 16, 70, 32, 96, 0);
      building(320 - 24, 128 - 16 - 8, 24, 120, 32, 32, 16);
      building(320 - 24, 128 - 16 - 8, 64, 64, 16, 16, 16 + 24, true);

      building(32, 320 - 64, 16, 70, 32, 96, 0);

      p.box(320, 320, 1);
      p.translate(0, 0, 1);

      p.ambientMaterial(0, 0, 0);
      p.translate(-96, 0, 0);
      p.box(32, 320, 1);

      p.ambientMaterial(0, 0, 0);
      p.translate(+192, 0, 0);
      p.box(32, 320, 1);

      p.ambientMaterial(0, 0, 0);
      p.translate(-96, 0, 0);
      p.box(320, 32, 1);

      p.orbitControl();
    };
  },
  { title: meta.title },
);
