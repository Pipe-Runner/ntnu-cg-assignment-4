/**
 * This function generates a vertex buffer for a given object.
 * Designed for objects that need a curved surface like cone, cylinder and disc.
 * This is because the normals are adjusted for the curve to look more realistic
 */
export function generateCurvedShapes(
  numSides: number = 4,
  symmetric: boolean = true,
  radius: number = 1,
  height: number = 1e-5,
  hasSideFaces: boolean = false
): { vertices: number[]; normals: number[]; indices: number[] } {
  const vertices = [];
  const normals = [];
  const indices = [];

  const angleStep = (2 * Math.PI) / numSides;
  // Bottom
  const bottomOffset = -(height / 2);
  vertices.push(0.0, bottomOffset, 0.0);
  normals.push(0.0, bottomOffset, 0.0);
  for (let i = 0; i < numSides + 1; i++) {
    vertices.push(
      radius * Math.cos(i * angleStep),
      bottomOffset,
      radius * Math.sin(i * angleStep)
    );
    normals.push(0.0, bottomOffset, 0.0);
    if (i < numSides) {
      indices.push(0, i + 1, i + 2);
    }
  }

  // Top (will be no symmetry in case of a cone and pyramid)
  const topOffset = height / 2;
  if (symmetric) {
    const indexOffset = vertices.length / 3;
    vertices.push(0.0, topOffset, 0.0);
    normals.push(0.0, topOffset, 0.0);
    for (let i = 0; i < numSides + 1; i++) {
      vertices.push(
        radius * Math.cos(i * angleStep),
        topOffset,
        radius * Math.sin(i * angleStep)
      );
      normals.push(0.0, topOffset, 0.0);
      if (i < numSides) {
        indices.push(indexOffset, indexOffset + i + 1, indexOffset + i + 2);
      }
    }
  }

  // Side (Not needed in case of quad and disc)
  if (hasSideFaces) {
    const indexOffset = vertices.length / 3;
    for (let i = 0; i < numSides + 1; i++) {
      // bottom point
      vertices.push(
        radius * Math.cos(i * angleStep),
        bottomOffset,
        radius * Math.sin(i * angleStep)
      );

      // top point (will be different is case of a cone and pyramid - non-symmetric)
      vertices.push(
        symmetric ? radius * Math.cos(i * angleStep) : 0,
        topOffset,
        symmetric ? radius * Math.sin(i * angleStep) : 0
      );

      // normal for both points (will be different when dealing with non-symmetric shapes - cone and pyramid)
      const normal = symmetric
        ? [Math.cos(i * angleStep), 0.0, Math.sin(i * angleStep)]
        : [
            Math.cos(i * angleStep),
            1 / Math.tan(Math.atan(height / radius)),
            Math.sin(i * angleStep),
          ];
      normals.push(...normal);
      normals.push(...normal);

      if (i < numSides) {
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
  }

  return { vertices, normals, indices };
}

/**
 * This function generates a vertex buffer for a given object.
 * Designed for objects that need a flat surface like cube, pyramid and quad.
 * This is because the normals are adjusted for the flat to look more realistic
 */
export function generateBoxShapes(
  numSides: number = 4,
  symmetric: boolean = true,
  radius: number = 1,
  height: number = 1e-5,
  hasSideFaces: boolean = false
): { vertices: number[]; normals: number[]; indices: number[] } {
  const vertices = [];
  const normals = [];
  const indices = [];

  const angleStep = (2 * Math.PI) / numSides;
  // Bottom
  const bottomOffset = -(height / 2);
  vertices.push(0.0, bottomOffset, 0.0);
  normals.push(0.0, bottomOffset, 0.0);
  for (let i = 0; i < numSides + 1; i++) {
    vertices.push(
      radius * Math.cos(i * angleStep),
      bottomOffset,
      radius * Math.sin(i * angleStep)
    );
    normals.push(0.0, bottomOffset, 0.0);
    if (i < numSides) {
      indices.push(0, i + 1, i + 2);
    }
  }

  // Top (will be no symmetry in case of a cone and pyramid)
  const topOffset = height / 2;
  if (symmetric) {
    const indexOffset = vertices.length / 3;
    vertices.push(0.0, topOffset, 0.0);
    normals.push(0.0, topOffset, 0.0);
    for (let i = 0; i < numSides + 1; i++) {
      vertices.push(
        radius * Math.cos(i * angleStep),
        topOffset,
        radius * Math.sin(i * angleStep)
      );
      normals.push(0.0, topOffset, 0.0);
      if (i < numSides) {
        indices.push(indexOffset, indexOffset + i + 1, indexOffset + i + 2);
      }
    }
  }

  // Side (Not needed in case of quad and disc)
  if (hasSideFaces) {
    let indexOffset = vertices.length / 3;
    for (let i = 0; i < numSides; i++) {
      // bottom point (A)
      vertices.push(
        radius * Math.cos(i * angleStep),
        bottomOffset,
        radius * Math.sin(i * angleStep)
      );
      // top point (A) (will be different is case of a cone and pyramid - non-symmetric)
      vertices.push(
        symmetric ? radius * Math.cos(i * angleStep) : 0,
        topOffset,
        symmetric ? radius * Math.sin(i * angleStep) : 0
      );
      // bottom point (B)
      vertices.push(
        radius * Math.cos((i + 1) * angleStep),
        bottomOffset,
        radius * Math.sin((i + 1) * angleStep)
      );
      // top point (B)
      vertices.push(
        symmetric ? radius * Math.cos((i + 1) * angleStep) : 0,
        topOffset,
        symmetric ? radius * Math.sin((i + 1) * angleStep) : 0
      );

      // normal for both points (will be different when dealing with non-symmetric shapes - cone and pyramid)
      const normal = symmetric
        ? [
            Math.cos((i + 0.5) * angleStep),
            0.0,
            Math.sin((i + 0.5) * angleStep),
          ]
        : [
            Math.cos((i + 0.5) * angleStep),
            1 / Math.tan(Math.atan(height / (radius * Math.cos(Math.PI / 4)))),
            Math.sin((i + 0.5) * angleStep),
          ];
      normals.push(...normal);
      normals.push(...normal);
      normals.push(...normal);
      normals.push(...normal);

      // upper level numbered odd
      indices.push(indexOffset + 1, indexOffset, indexOffset + 3);
      // bottom level numbered even
      indices.push(indexOffset, indexOffset + 2, indexOffset + 3);

      indexOffset += 4;
    }
  }

  return { vertices, normals, indices };
}

/**
 * This function generates a vertex buffer for a plane with
 * the given number of
 */
export function generatePlane(
  length: number = 1,
  breadth: number = 1,
  subdivisions: number = 4
): { vertices: number[]; normals: number[]; indices: number[] } {
  const gap = 1e-4;

  const vertices = [];
  const normals = [];
  const indices = [];

  const frontOffset = gap / 2;
  const backOffset = -gap / 2;

  const xStep = length / subdivisions;
  const zStep = breadth / subdivisions;
  const xStart = -length / 2;
  const zStart = -breadth / 2;

  // top face
  // number of points needed = subdivisions + 1
  const topNormal = [0.0, 1.0, 0.0];
  for (let r = 0; r <= subdivisions; r++) {
    for (let c = 0; c <= subdivisions; c++) {
      vertices.push(xStart + c * xStep, frontOffset, zStart + r * zStep);
      normals.push(...topNormal);

      if (r < subdivisions && c < subdivisions) {
        indices.push(
          r * (subdivisions + 1) + c,
          (r + 1) * (subdivisions + 1) + c,
          (r + 1) * (subdivisions + 1) + c + 1
        );
        indices.push(
          r * (subdivisions + 1) + c,
          (r + 1) * (subdivisions + 1) + c + 1,
          r * (subdivisions + 1) + c + 1
        );
      }
    }
  }

  const indexOffset = vertices.length / 3;
  const bottomNormal = [0.0, -1.0, 0.0];
  for (let r = 0; r <= subdivisions; r++) {
    for (let c = 0; c <= subdivisions; c++) {
      vertices.push(xStart + c * xStep, backOffset, zStart + r * zStep);
      normals.push(...bottomNormal);

      if (r < subdivisions && c < subdivisions) {
        indices.push(
          indexOffset + r * (subdivisions + 1) + c,
          indexOffset + (r + 1) * (subdivisions + 1) + c,
          indexOffset + (r + 1) * (subdivisions + 1) + c + 1
        );
        indices.push(
          indexOffset + r * (subdivisions + 1) + c,
          indexOffset + (r + 1) * (subdivisions + 1) + c + 1,
          indexOffset + r * (subdivisions + 1) + c + 1
        );
      }
    }
  }

  return { vertices, normals, indices };
}

export function generateTorus(
  slices = 8,
  loops = 20,
  innerRadius = 0.25,
  outerRadius = 1
): { vertices: number[]; normals: number[]; indices: number[] } {
  const vertices = [];
  const indices = [];
  const normals = [];

  for (let slice = 0; slice <= slices; ++slice) {
    const v = slice / slices;
    const slice_angle = v * 2 * Math.PI;
    const cos_slices = Math.cos(slice_angle);
    const sin_slices = Math.sin(slice_angle);
    const slice_rad = outerRadius + innerRadius * cos_slices;

    for (let loop = 0; loop <= loops; ++loop) {
      //   x=(R+r·cos(v))cos(w)
      //   y=(R+r·cos(v))sin(w)
      //             z=r.sin(v)
      const u = loop / loops;
      const loop_angle = u * 2 * Math.PI;
      const cos_loops = Math.cos(loop_angle);
      const sin_loops = Math.sin(loop_angle);

      const x = slice_rad * cos_loops;
      const y = slice_rad * sin_loops;
      const z = innerRadius * sin_slices;

      vertices.push(x, y, z);
      normals.push(cos_loops * sin_slices, sin_loops * sin_slices, cos_slices);
    }
  }

  // 0  1  2  3  4  5
  // 6  7  8  9  10 11
  // 12 13 14 15 16 17

  const vertsPerSlice = loops + 1;
  for (let i = 0; i < slices; ++i) {
    let v1 = i * vertsPerSlice;
    let v2 = v1 + vertsPerSlice;

    for (let j = 0; j < loops; ++j) {
      indices.push(v1);
      indices.push(v1 + 1);
      indices.push(v2);

      indices.push(v2);
      indices.push(v1 + 1);
      indices.push(v2 + 1);

      v1 += 1;
      v2 += 1;
    }
  }

  return {
    vertices,
    normals,
    indices,
  };
}
