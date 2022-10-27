#version 300 es

in vec4 aPosition;
in vec4 aColor;
uniform mat4 uModelMatrix;
uniform mat4 uVpMatrix;
out vec4 vColor;

void main(){
  vColor=aColor;
  gl_Position=uVpMatrix*uModelMatrix*aPosition;
}