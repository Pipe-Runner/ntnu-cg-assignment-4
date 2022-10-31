import { ObjectArgs } from "@/types/object";
import { generateSphere } from "../utils/vertex-generator";
import BaseObject from "./base-object";

class Torus extends BaseObject {
  constructor(...args: ObjectArgs) {
    const { vertices, normals, indices } = generateSphere(1, 14);

    super(...args, vertices, normals, new Array(vertices.length / 3), indices);
  }
}

export { Torus as default };
