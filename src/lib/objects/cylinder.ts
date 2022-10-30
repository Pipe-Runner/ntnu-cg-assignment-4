import { ObjectArgs } from "@/types/object";
import { generateCurvedShapes } from "../utils/vertex-generator";
import BaseObject from "./base-object";

class Cylinder extends BaseObject {
  constructor(...args: ObjectArgs) {
    const { vertices, normals, indices } = generateCurvedShapes(
      50,
      true,
      0.75,
      2,
      true
    );

    super(...args, vertices, normals, new Array(vertices.length / 3), indices);
  }
}

export { Cylinder as default };
