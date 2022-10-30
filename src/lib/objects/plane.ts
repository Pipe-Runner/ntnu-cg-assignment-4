import { ObjectArgs } from "@/types/object";
import { generatePlane } from "../utils/vertex-generator";
import BaseObject from "./base-object";

class Plane extends BaseObject {
  constructor(...args: ObjectArgs) {
    const { vertices, normals, indices } = generatePlane(1, 1, 4);

    super(...args, vertices, normals, new Array(vertices.length / 3), indices);
  }
}

export { Plane as default };
