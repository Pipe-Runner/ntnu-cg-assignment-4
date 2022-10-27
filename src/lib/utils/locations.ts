export function getLocations(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  varList: string[]
): Record<string, number> {
  return varList.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: findLocation(gl, program, curr),
    }),
    {}
  );
}

function findLocation(
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  variableName: string
) {
  if (variableName.startsWith("u")) {
    const loc = gl.getUniformLocation(program, variableName);

    if (loc && loc < 0) {
      throw new Error(`Could not find uniform location ${variableName}`);
    }

    return loc;
  } else if (variableName.startsWith("a")) {
    const loc = gl.getAttribLocation(program, variableName);

    if (loc && loc < 0) {
      throw new Error(`Could not find attribute location ${variableName}`);
    }

    return loc;
  } else {
    throw new Error(`Unidentified variable ${variableName}`);
  }
}
