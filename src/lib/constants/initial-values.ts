import { Object3D } from "@/types/object";

export const initialState: Object3D = {
  posX: 0,
  posY: 0,
  posZ: 0,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  r: 1,
  g: 0,
  b: 0,
  isPositionDirty: false,
  isRotationDirty: false,
  isScaleDirty: false,
  isColorDirty: false,
};
