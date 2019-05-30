#version 300 es

in vec3 inPosition;
in vec3 inNormal;

uniform mat4 matrix; 
uniform mat4 nMatrix;

void main() 
{
  	gl_Position = matrix * vec4(inPosition, 1.0);
}