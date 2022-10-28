#version 300 es

in vec4 aPosition;
in vec4 aColor;
in vec4 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uVpMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uLightColor;
uniform vec3 uLightDirection;
uniform vec3 uAmbientLight;

out vec4 vColor;

void main(){
  gl_Position=uVpMatrix*uModelMatrix*aPosition;

  vec3 normal = normalize(vec3(uNormalMatrix * aNormal));
  float nDotL = max(dot(uLightDirection, normal), 0.0);
  vec3 diffuse = uLightColor * aColor.rgb * nDotL;
  vec3 ambient = uAmbientLight * aColor.rgb;
  vColor = vec4(diffuse + ambient, aColor.a);
}