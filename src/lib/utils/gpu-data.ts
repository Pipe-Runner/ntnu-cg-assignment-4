export function setAndActivateBuffer(
  gl: WebGL2RenderingContext,
  location: number,
  data: number[],
  num_items: number
) {
  const buffer = gl.createBuffer();

  if (!buffer) {
    throw new Error("Failed to allocate GPU memory for buffer");
  }

  // Write the vertex coordinates to the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  // Assign the buffer object to a_Position and enable the assignment
  const elementsToPickPerStride = num_items;
  const elementsPerStride = num_items * Float32Array.BYTES_PER_ELEMENT;
  let offsetPerStride = 0 * Float32Array.BYTES_PER_ELEMENT;
  gl.vertexAttribPointer(
    location,
    elementsToPickPerStride,
    gl.FLOAT,
    false,
    elementsPerStride,
    offsetPerStride
  );
  gl.enableVertexAttribArray(location);
}

export function setIndex(
  gl: WebGL2RenderingContext,
  data: number[]
) {
  const indexBuffer = gl.createBuffer();

  if (!indexBuffer) {
    throw new Error("Failed to allocate GPU memory for indexBuffer");
  }

  // Write the indices to the indexBuffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(data), gl.STATIC_DRAW);
}
