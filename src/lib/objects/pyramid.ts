import { ObjectArgs } from "@/types/object";
import { generateBoxShapes } from "../utils/vertex-generator";
import BaseObject from "./base-object";

class Pyramid extends BaseObject {
  constructor(...args: ObjectArgs) {
    const { vertices, normals, indices } = generateBoxShapes(
      4,
      false,
      Math.pow(2, 0.5) * 0.5,
      1,
      true
    );
    super(...args, vertices, normals, new Array(vertices.length / 3), indices);
  }
}

export { Pyramid as default };
