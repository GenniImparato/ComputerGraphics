#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			

uniform vec3 LADir;			
uniform vec4 LAColor;	
uniform mat4 LADirMatrix;
uniform vec3 cameraPos;

// Final color is returned into:

out vec4 outColor;


vec4 compLambertDiffuse(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec4 diffColor) {
  vec4 diffuseLambert = lightCol * clamp(dot(lightDir, normalVec),0.0,1.0) * diffColor;
     return  diffuseLambert;
}


vec4 compPhongSpecular(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec3 eyedirVec,  vec4 specularColor) {
	vec3 reflection = -reflect(lightDir, normalVec);
	vec4 phongSpecular = lightCol * pow(max(dot(reflection, eyedirVec), 0.0), 0.3) * specularColor;
	return          phongSpecular;
}

void main() 
{
	vec3 normalVec = normalize(fsNormal);
	vec4 diffColor = vec4(0.0, 0.4, 0.9, 1.0);
	vec4 specularColor = vec4(0.9, 0.9, 0.9, 1.0);
	// directional light
	vec3 lightDir = normalize(mat3(LADirMatrix) * LADir);
	vec4 lambertDiffuse = compLambertDiffuse(lightDir, LAColor, normalVec, diffColor);
	vec3 cameraDir  = normalize(cameraPos - fs_pos);
	vec4 phongSpecular = compPhongSpecular(lightDir, LAColor, normalVec, cameraDir, specularColor);


	// lambert diffuse without specular
	outColor = clamp(lambertDiffuse + phongSpecular * 0.0, 0.0, 1.0);
}
