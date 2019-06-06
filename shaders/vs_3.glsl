#version 300 es

in vec3 inPosition;
in vec3 inNormal;
out vec3 fsNormal;
out vec3 fs_pos;

uniform mat4 worldProjectionMatrix; 
uniform mat4 nMatrix;
uniform mat4 worldViewMatrix;

void main() 
{
  fsNormal = mat3(nMatrix) * inNormal; 
  fs_pos = (worldViewMatrix * vec4(inPosition, 1.0)).xyz;
  gl_Position = worldProjectionMatrix * vec4(inPosition, 1.0);
}
