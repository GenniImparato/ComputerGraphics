#version 300 es

in vec3 inPosition;
in vec3 inNormal;
in vec2 inUV;
out vec3 fsNormal;
out vec3 fs_pos;
out vec2 uv_coord;

uniform mat4 matrix; 
uniform mat4 nMatrix;

void main() 
{
  fsNormal = mat3(nMatrix) * inNormal; 
  vec4 fs_pos4 = matrix * vec4(inPosition, 1.0);
  fs_pos = fs_pos4.xyz;
  uv_coord = inUV;
  	gl_Position = fs_pos4;
}
