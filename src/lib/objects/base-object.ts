import { Color, Position, Rotation, Scale } from "@/types/object";
import { Mat4 } from "cuon-matrix-ts";

abstract class BaseObject {
  protected numVertices: number;
  protected gl: WebGL2RenderingContext;
  protected modelMatrix: Mat4;
  protected vertices: number[];
  protected colorsData: number[];
  protected indices: number[];
  protected position: Position;
  protected scale: Scale;
  protected rotation: Rotation;
  protected color: Color;

  constructor(
    gl: WebGL2RenderingContext,
    position: Position,
    scale: Scale,
    rotation: Rotation,
    color: Color,
    vertices: number[],
    colorsData: number[],
    indices: number[],
    numVertices: number
  ) {
    this.gl = gl;

    this.position = position;
    this.scale = scale;
    this.rotation = rotation;
    this.color = color;

    this.vertices = vertices;
    this.colorsData = colorsData;
    this.indices = indices;
    this.numVertices = numVertices;

    this.updateColor(color);

    this.modelMatrix = new Mat4();
    this.modelMatrix.setTranslate(position.x, position.y, position.z);
    this.modelMatrix.scale(scale.x, scale.y, scale.z);
    this.modelMatrix.rotate(rotation.z, 0, 0, 1);
  }

  updateColor(color: Color): void {
    for (let i = 0; i < (this.numVertices * 3) - 2; i += 3) {
      this.colorsData[i] = color.r;
      this.colorsData[i + 1] = color.g;
      this.colorsData[i + 2] = color.b;
    }
  }

  updateTransform(position: Position, scale: Scale, rotation: Rotation): void {
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;

    this.modelMatrix = new Mat4();
    this.modelMatrix.setTranslate(position.x, position.y, position.z);
    this.modelMatrix.scale(scale.x, scale.y, scale.z);
    this.modelMatrix.rotate(rotation.z, 0, 0, 1);
  }

  abstract preRender(): number;

  render(): void {
    const num_idx = this.preRender();

    this.gl.drawElements(this.gl.TRIANGLES, num_idx, this.gl.UNSIGNED_BYTE, 0);
  }
}

export { BaseObject as default };
