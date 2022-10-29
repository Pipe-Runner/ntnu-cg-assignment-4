import { ObjectArgs } from "@/types/object";
import BaseObject from "./base-object";

class Pyramid extends BaseObject {
  constructor(...args: ObjectArgs) {
    const vertices = [];
    const normals = [];
    const colors = [];
    const indices = [];

    const n = 4;
    const angleStep = (2 * Math.PI) / n;
    // Bottom
    vertices.push(0.0, 0.0, 0.0);
    colors.push(1.0, 0.0, 0.0);
    normals.push(0.0, -1.0, 0.0);
    for (let i = 0; i < n + 1; i++) {
      vertices.push(Math.cos(i * angleStep), 0.0, Math.sin(i * angleStep));
      colors.push(1.0, 0.0, 0.0);
      normals.push(0.0, -1.0, 0.0);
      if (i < n) {
        indices.push(0, i + 1, i + 2);
      }
    }

    // Side
    const indexOffset = vertices.length / 3;
    for (let i = 0; i < n + 1; i++) {
      vertices.push(Math.cos(i * angleStep), 0.0, Math.sin(i * angleStep));
      colors.push(1.0, 0.0, 0.0);
      vertices.push(0, 1.0, 0);
      colors.push(1.0, 0.0, 0.0);

      const normal = [Math.cos(i * angleStep), 1.0, Math.sin(i * angleStep)];
      normals.push(...normal);
      normals.push(...normal);

      if (i < n) {
        // upper level numbered odd
        indices.push(
          indexOffset + 2 * i + 1,
          indexOffset + 2 * i,
          indexOffset + 2 * i + 3
        );
        // bottom level numbered even
        indices.push(
          indexOffset + 2 * i,
          indexOffset + 2 * i + 2,
          indexOffset + 2 * i + 3
        );
      }
    }

    super(...args, vertices, normals, colors, indices);
  }
}

export { Pyramid as default };
