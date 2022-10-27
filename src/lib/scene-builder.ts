import baseObject from "./objects/base-object";
import vertexShaderSource from "./shaders/vert.glsl";
import fragmentShaderSource from "./shaders/frag.glsl";
import createProgram from "./utils/program-creator";
import { getLocations } from "./utils/locations";
import quad from "./objects/quad";
import { Mat4 } from "cuon-matrix-ts";
import { Color, ObjectTypes, Position, Rotation, Scale } from "@/types/object";

class SceneBuilder {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private objectMap: Record<string, baseObject> = {};
  private locations: Record<string, number>;
  private viewProjMatrix: Mat4;

  constructor(private container: HTMLDivElement) {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "scene-builder-canvas";
    this.resizeCanvas();
    this.container.appendChild(this.canvas);
    this.gl = this.getGlContext(this.canvas);

    const program = createProgram(
      this.gl,
      vertexShaderSource,
      fragmentShaderSource
    );
    this.gl.useProgram(program);

    const variables = ["aPosition", "aColor", "uModelMatrix", "uVpMatrix"];
    this.locations = getLocations(this.gl, program, variables);

    this.viewProjMatrix = new Mat4();
    this.viewProjMatrix.setPerspective(
      30,
      this.gl.canvas.width / this.gl.canvas.height,
      1,
      100
    );
    this.viewProjMatrix.lookAt(3.06, 2.5, 10.0, 0, 0, -2, 0, 1, 0);

    this.objectMap = {};
  }

  addObject(
    id: string,
    type: ObjectTypes,
    position: Position,
    scale: Scale,
    rotation: Rotation,
    color: Color
  ) {
    switch (type) {
      case "quad":
        this.objectMap[id] = new quad(
          this.gl,
          this.locations,
          position,
          scale,
          rotation,
          color
        );
        break;

      default:
        break;
    }

    /**
     * Render after updating object map
     */
    this.render();
  }

  deleteObject(id: string) {
    delete this.objectMap[id];

    /**
     * Render after updating object map
     */
    this.render();
  }

  updateObject(
    id: string,
    position: Position,
    scale: Scale,
    rotation: Rotation,
    color: Color
  ) {
    this.objectMap[id].updateTransform(position, scale, rotation);
    this.objectMap[id].updateColor(color);
    this.render();
  }

  private getGlContext(canvas: HTMLCanvasElement): WebGL2RenderingContext {
    const ctx = canvas.getContext("webgl2");
    if (ctx) return ctx;
    throw new Error("WebGL2 is not supported");
  }

  private resizeCanvas() {
    this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.container.clientHeight;
  }

  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // set VP matrix before rendering
    this.gl.uniformMatrix4fv(
      this.locations.uVpMatrix,
      false,
      this.viewProjMatrix.elements
    );

    Object.values(this.objectMap).forEach((object) => {
      object.render();
    });
  }
}

export { SceneBuilder as default };
