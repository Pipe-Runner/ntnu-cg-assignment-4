export type ObjectTypes =
  | "plane"
  | "cube"
  | "pyramid"
  | "cone"
  | "cylinder"
  | "disc"
  | "sphere"
  | "torus";

export type Position = { x: number; y: number; z: number };
export type Scale = Position;
export type Rotation = Position;
export type Color = { r: number; g: number; b: number };

export type Object3D = {
  posX: number;
  posY: number;
  posZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  r: number;
  g: number;
  b: number;
  isPositionDirty: boolean;
  isRotationDirty: boolean;
  isScaleDirty: boolean;
  isColorDirty: boolean;
};

export type Object3DExtended = Object3D & {
  type: ObjectTypes;
  id: string;
  history: Object3D; // history of the initial state
};

export type keyboardModes =
  | "posX"
  | "posY"
  | "posZ"
  | "scaleX"
  | "scaleY"
  | "scaleZ"
  | "rotationX"
  | "rotationY"
  | "rotationZ"
  | undefined;

export type ResetType = "all" | "rotation" | "color" | "scale" | "position";

export type ObjectArgs = [
  gl: WebGL2RenderingContext,
  locations: Record<string, number>,
  position: Position,
  scale: Scale,
  rotation: Rotation,
  color: Color
];
