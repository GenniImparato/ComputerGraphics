#version 300 es

precision mediump float;

in vec3 fsNormal;
out vec4 outColor;


void main() 
{
	vec3 diffColor = vec3(0.1, 0.9, 1.0); 
	vec3 lightDir = normalize(vec3(0, 0.5, 1));
	vec3 lightColor = vec3(1.0, 1.0, 1.0); 

	vec3 lambertColor = diffColor * lightColor * dot(normalize(fsNormal), lightDir);
  	outColor = vec4(clamp(lambertColor, 0.0, 1.0),1.0);
}