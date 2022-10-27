class EulerXYZ {
  constructor(public x = 0, public y = 0, public z = 0) {}

  public get elements(): number[] {
    return [this.x, this.y, this.z];
  }
}

export { EulerXYZ as default };
