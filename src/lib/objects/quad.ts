import { Color, Position, Rotation, Scale } from "@/types/object";
import { setAndActivateBuffer, setIndex } from "../utils/gpu-data";
import BaseObject from "./base-object";

class Quad extends BaseObject {
  constructor(
    gl: WebGL2RenderingContext,
    private locations: Record<string, number>,
    position: Position,
    scale: Scale,
    rotation: Rotation,
    color: Color
  ) {
    super(
      gl,
      position,
      scale,
      rotation,
      color,
      [-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5],
      [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0],
      [0, 1, 2, 1, 2, 3],
      4
    );
  }

  preRender(): number {
    /**
     * Set attributes
     */
    setAndActivateBuffer(this.gl, this.locations.aPosition, this.vertices, 2);
    setAndActivateBuffer(this.gl, this.locations.aColor, this.colorsData, 3);
    setIndex(this.gl, this.indices);

    /**
     * Set uniforms
     */
    this.gl.uniformMatrix4fv(
      this.locations.uModelMatrix,
      false,
      this.modelMatrix.elements
    );

    return this.indices.length;
  }
}

export { Quad as default };
