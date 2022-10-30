import { ObjectArgs } from "@/types/object";
import { generateCurvedShapes } from "../utils/vertex-generator";
import BaseObject from "./base-object";

class Disc extends BaseObject {
  constructor(...args: ObjectArgs) {
    const { vertices, normals, indices } = generateCurvedShapes(
      50,
      true,
      1,
      1e-4,
      false
    );

    super(...args, vertices, normals, new Array(vertices.length / 3), indices);
  }
}

export { Disc as default };
