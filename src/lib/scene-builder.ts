import baseObject from "./objects/base-object";
import vertexShaderSource from "./shaders/vert.glsl";
import fragmentShaderSource from "./shaders/frag.glsl";
import createProgram from "./utils/program-creator";
import { getLocations } from "./utils/locations";
import { Mat4, Vec3 } from "cuon-matrix-ts";
import { Color, ObjectTypes, Position, Rotation, Scale } from "@/types/object";
import Cylinder from "./objects/cylinder";
import Cone from "./objects/cone";
import Cube from "./objects/cube";
import Plane from "./objects/plane";
import Pyramid from "./objects/pyramid";
import Disc from "./objects/disc";
import Torus from "./objects/torus";

class SceneBuilder {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private objectMap: Record<string, baseObject> = {};
  private locations: Record<string, number>;
  private viewProjMatrix: Mat4;
  private lightColor: [number, number, number];
  private lightDirection: Vec3;
  private ambientLight: [number, number, number];

  constructor(private container: HTMLDivElement) {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "scene-builder-canvas";
    this.resizeCanvas();
    this.container.appendChild(this.canvas);
    this.gl = this.getGlContext(this.canvas);

    // Enable depth test
    this.gl.enable(this.gl.DEPTH_TEST);

    // face culling
    // this.gl.enable(this.gl.CULL_FACE);
    // this.gl.cullFace(this.gl.BACK);

    const program = createProgram(
      this.gl,
      vertexShaderSource,
      fragmentShaderSource
    );
    this.gl.useProgram(program);

    const variables = [
      "aPosition",
      "aColor",
      "aNormal",
      "uModelMatrix",
      "uVpMatrix",
      "uNormalMatrix",
      "uLightColor",
      "uLightDirection",
      "uAmbientLight",
    ];
    this.locations = getLocations(this.gl, program, variables);

    // view + projection matrix
    this.viewProjMatrix = new Mat4();
    this.viewProjMatrix.setPerspective(
      10,
      this.gl.canvas.width / this.gl.canvas.height,
      1,
      100
    );
    this.viewProjMatrix.lookAt(3, 2.5, 20.0, 0, 0, -2, 0, 1, 0);

    // set light color (r, g, b)
    this.lightColor = [1.0, 1.0, 1.0];

    // set light direction
    this.lightDirection = new Vec3(0.0, 3.0, 4.0);
    this.lightDirection.normalize();

    // ambient light
    this.ambientLight = [0.2, 0.2, 0.2];

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
      case "plane":
        this.objectMap[id] = new Plane(
          this.gl,
          this.locations,
          position,
          scale,
          rotation,
          color
        );
        break;
      case "disc":
        this.objectMap[id] = new Disc(
          this.gl,
          this.locations,
          position,
          scale,
          rotation,
          color
        );
        break;
      case "cube":
        this.objectMap[id] = new Cube(
          this.gl,
          this.locations,
          position,
          scale,
          rotation,
          color
        );
        break;
      case "pyramid":
        this.objectMap[id] = new Pyramid(
          this.gl,
          this.locations,
          position,
          scale,
          rotation,
          color
        );
        break;
      case "cone":
        this.objectMap[id] = new Cone(
          this.gl,
          this.locations,
          position,
          scale,
          rotation,
          color
        );
        break;
      case "cylinder":
        this.objectMap[id] = new Cylinder(
          this.gl,
          this.locations,
          position,
          scale,
          rotation,
          color
        );
        break;
        case "torus":
          this.objectMap[id] = new Torus(
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

    // set light color uniform
    this.gl.uniform3fv(this.locations.uLightColor, this.lightColor);

    // set light direction uniform
    this.gl.uniform3fv(
      this.locations.uLightDirection,
      this.lightDirection.elements
    );

    // set ambient light uniform
    this.gl.uniform3fv(this.locations.uAmbientLight, this.ambientLight);

    Object.values(this.objectMap).forEach((object) => {
      object.render();
    });
  }
}

export { SceneBuilder as default };
