import { Color, Position, Rotation, Scale } from "@/types/object";
import { Mat4 } from "cuon-matrix-ts";
import { setAndActivateBuffer, setIndex } from "../utils/gpu-data";

abstract class BaseObject {
  protected numVertices: number;
  protected modelMatrix: Mat4 = new Mat4();
  protected normalMatrix: Mat4 = new Mat4();

  constructor(
    protected gl: WebGL2RenderingContext,
    protected locations: Record<string, number>,
    protected position: Position,
    protected scale: Scale,
    protected rotation: Rotation,
    protected color: Color,
    protected vertices: number[],
    protected normals: number[],
    protected colorsData: number[],
    protected indices: number[]
  ) {
    this.numVertices = vertices.length / 3;

    this.updateColor(color);
    this.updateTransform(position, scale, rotation);

    this.normalMatrix.setInverseOf(this.modelMatrix);
    this.normalMatrix.transpose();
  }

  updateColor(color: Color): void {
    for (let i = 0; i < this.numVertices * 3 - 2; i += 3) {
      this.colorsData[i] = color.r;
      this.colorsData[i + 1] = color.g;
      this.colorsData[i + 2] = color.b;
    }
  }

  updateTransform(position: Position, scale: Scale, rotation: Rotation): void {
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;

    // reconstruct model matrix (T * R * S)
    this.modelMatrix.setTranslate(position.x, position.y, position.z);
    this.modelMatrix.rotate(rotation.x, 1, 0, 0);
    this.modelMatrix.rotate(rotation.y, 0, 1, 0);
    this.modelMatrix.rotate(rotation.z, 0, 0, 1);
    this.modelMatrix.scale(scale.x, scale.y, scale.z);

    // reconstruct normal matrix
    this.normalMatrix.setInverseOf(this.modelMatrix);
    this.normalMatrix.transpose();
  }

  preRender(): void {}

  render(): void {
    // Set model matrix uniforms
    this.gl.uniformMatrix4fv(
      this.locations.uModelMatrix,
      false,
      this.modelMatrix.elements
    );
    this.gl.uniformMatrix4fv(
      this.locations.uNormalMatrix,
      false,
      this.normalMatrix.elements
    );

    setAndActivateBuffer(this.gl, this.locations.aPosition, this.vertices, 3);
    setAndActivateBuffer(this.gl, this.locations.aNormal, this.normals, 3);
    setAndActivateBuffer(this.gl, this.locations.aColor, this.colorsData, 3);
    setIndex(this.gl, this.indices);

    this.preRender();

    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.indices.length,
      this.gl.UNSIGNED_BYTE,
      0
    );
  }
}

export { BaseObject as default };
