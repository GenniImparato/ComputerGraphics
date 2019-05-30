#version 300 es

in vec3 inPosition;
in vec3 inNormal;
out vec3 fsNormal;
out vec3 fs_pos;

uniform mat4 matrix; 
uniform mat4 nMatrix;

void main() 
{
  	fsNormal = mat3(nMatrix) * inNormal; 
  	fs_pos = mat3(matrix) * inPosition;
  	gl_Position = matrix * vec4(inPosition, 1.0);
}