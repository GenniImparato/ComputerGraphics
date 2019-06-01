#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			

uniform vec3 LADir;			
uniform vec4 LAColor;	
uniform mat4 LADirMatrix;

// Final color is returned into:

out vec4 outColor;

void main() 
{
	vec3 normalVec = normalize(fsNormal);
	vec4 diffColor = vec4(0.1, 0.4, 0.9, 1.0);
	// directional light
	vec3 normLightDir = -normalize(LADir) ;
	vec3 lightDir = normalize(mat3(LADirMatrix) * normLightDir);
	vec4 dirLightColor = LAColor ;


	// lambert diffuse without specular
	outColor = clamp(dirLightColor * diffColor *  clamp(-dot(lightDir, normalVec), 0.0, 1.0), 0.0, 1.0);
}