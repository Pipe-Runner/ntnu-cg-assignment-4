import { ObjectArgs } from "@/types/object";
import { generateTorus } from "../utils/vertex-generator";
import BaseObject from "./base-object";

class Torus extends BaseObject {
  constructor(...args: ObjectArgs) {
    const { vertices, normals, indices } = generateTorus(8, 20, 0.5, 1);

    super(...args, vertices, normals, new Array(vertices.length / 3), indices);
  }
}

export { Torus as default };
