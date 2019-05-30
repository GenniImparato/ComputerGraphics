#version 300 es

precision mediump float;

in vec3 fsNormal;
out vec4 outColor;
uniform vec3 LADir;
uniform vec4 LAColor;


void main() 
{
	vec4 diffColor = vec4(0.1, 0.9, 1.0, 1.0); 

	vec4 lambertColor = diffColor * LAColor * dot(normalize(fsNormal), LADir);
  	outColor = (clamp(lambertColor, 0.0, 1.0));
}