export type ObjectTypes = "quad" | "cube";

export type Position = { x: number; y: number; z: number };
export type Scale = Position;
export type Rotation = Position;
export type Color = { r: number; g: number; b: number };

export type Object3D = {
  id: string;
  type: ObjectTypes;
  position: Position;
  scale: Scale;
  rotation: Rotation;
  color: Color;
  isPositionDirty: boolean;
  isRotationDirty: boolean;
  isScaleDirty: boolean;
  isColorDirty: boolean;
  history: {
    position: Position;
    scale: Scale;
    rotation: Rotation;
    color: Color;
  };
};
