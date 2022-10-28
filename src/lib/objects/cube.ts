// import { Color, Position, Rotation, Scale } from "@/types/object";
// import { setAndActivateBuffer, setIndex } from "../utils/gpu-data";
// import BaseObject from "./base-object";

// const vertices = [
//   1.0,
//   1.0,
//   1.0,
//   -1.0,
//   1.0,
//   1.0,
//   -1.0,
//   -1.0,
//   1.0,
//   1.0,
//   -1.0,
//   1.0, // v0-v1-v2-v3 front
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   -1.0,
//   1.0,
//   1.0,
//   -1.0,
//   -1.0,
//   1.0,
//   1.0,
//   -1.0, // v0-v3-v4-v5 right
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   -1.0,
//   -1.0,
//   1.0,
//   -1.0,
//   -1.0,
//   1.0,
//   1.0, // v0-v5-v6-v1 up
//   -1.0,
//   1.0,
//   1.0,
//   -1.0,
//   1.0,
//   -1.0,
//   -1.0,
//   -1.0,
//   -1.0,
//   -1.0,
//   -1.0,
//   1.0, // v1-v6-v7-v2 left
//   -1.0,
//   -1.0,
//   -1.0,
//   1.0,
//   -1.0,
//   -1.0,
//   1.0,
//   -1.0,
//   1.0,
//   -1.0,
//   -1.0,
//   1.0, // v7-v4-v3-v2 down
//   1.0,
//   -1.0,
//   -1.0,
//   -1.0,
//   -1.0,
//   -1.0,
//   -1.0,
//   1.0,
//   -1.0,
//   1.0,
//   1.0,
//   -1.0, // v4-v7-v6-v5 back
// ];

// const colors = [
//   // Colors
//   0.4,
//   0.4,
//   1.0,
//   0.4,
//   0.4,
//   1.0,
//   0.4,
//   0.4,
//   1.0,
//   0.4,
//   0.4,
//   1.0, // v0-v1-v2-v3 front(blue)
//   0.4,
//   1.0,
//   0.4,
//   0.4,
//   1.0,
//   0.4,
//   0.4,
//   1.0,
//   0.4,
//   0.4,
//   1.0,
//   0.4, // v0-v3-v4-v5 right(green)
//   1.0,
//   0.4,
//   0.4,
//   1.0,
//   0.4,
//   0.4,
//   1.0,
//   0.4,
//   0.4,
//   1.0,
//   0.4,
//   0.4, // v0-v5-v6-v1 up(red)
//   1.0,
//   1.0,
//   0.4,
//   1.0,
//   1.0,
//   0.4,
//   1.0,
//   1.0,
//   0.4,
//   1.0,
//   1.0,
//   0.4, // v1-v6-v7-v2 left
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   1.0,
//   1.0, // v7-v4-v3-v2 down
//   0.4,
//   1.0,
//   1.0,
//   0.4,
//   1.0,
//   1.0,
//   0.4,
//   1.0,
//   1.0,
//   0.4,
//   1.0,
//   1.0, // v4-v7-v6-v5 back
// ];

// const indices = [       // Indices of the vertices
//   0, 1, 2,   0, 2, 3,    // front
//   4, 5, 6,   4, 6, 7,    // right
//   8, 9,10,   8,10,11,    // up
//   12,13,14,  12,14,15,    // left
//   16,17,18,  16,18,19,    // down
//   20,21,22,  20,22,23     // back
// ];

// class Cube extends BaseObject {
//   constructor(
//     gl: WebGL2RenderingContext,
//     private locations: Record<string, number>,
//     position: Position,
//     scale: Scale,
//     rotation: Rotation,
//     color: Color
//   ) {
//     super(
//       gl,
//       position,
//       scale,
//       rotation,
//       color,
//       vertices,
//       colors,
//       indices,
//       vertices.length / 3
//     );
//   }

//   preRender(): number {
//     /**
//      * Set attributes
//      */
//     setAndActivateBuffer(this.gl, this.locations.aPosition, this.vertices, 3);
//     setAndActivateBuffer(this.gl, this.locations.aColor, this.colorsData, 3);
//     setIndex(this.gl, this.indices);

//     /**
//      * Set uniforms
//      */
//     this.gl.uniformMatrix4fv(
//       this.locations.uModelMatrix,
//       false,
//       this.modelMatrix.elements
//     );

//     return this.indices.length;
//   }
// }

// export { Cube as default };

export {}