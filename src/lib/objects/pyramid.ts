// import { Color, Position, Rotation, Scale } from "@/types/object";
// import { setAndActivateBuffer, setIndex } from "../utils/gpu-data";
// import BaseObject from "./base-object";

// const vertices = [
//   0,
//   1,
//   0, // v4
//   0.5,
//   0,
//   0.5, // v0
//   0.5,
//   0,
//   -0.5, // v1
//   -0.5,
//   0,
//   -0.5, // v2
//   -0.5,
//   0,
//   0.5, // v3
// ];

// const colors = new Array(15);

// const indices = [0, 1, 2, 0, 2, 3, 0, 1, 4, 1, 2, 4, 3, 2, 4, 0, 3, 4];

// class Pyramid extends BaseObject {
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
//       colors.length / 3
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

// export { Pyramid as default };

export {}