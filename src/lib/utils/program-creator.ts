import createShader from "./shader-creator";

export default function createProgram(
  gl: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
): WebGLProgram {
  // * Try to compile shaders
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  // * Create a program
  var program = gl.createProgram();

  if (!program) {
    throw new Error("Failed to create program");
  }

  // * Attach vertex shader to program
  gl.attachShader(program, vertexShader);

  // * Attach fragment shader to program
  gl.attachShader(program, fragmentShader);

  // * Link the program
  gl.linkProgram(program);

  // * Fetch linking status
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  // * Print linking error logs
  console.error(gl.getProgramInfoLog(program));

  // * Delete unused program
  gl.deleteProgram(program);

  throw new Error("Program linking failed");
}
