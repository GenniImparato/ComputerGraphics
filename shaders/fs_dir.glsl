#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			

uniform vec3 LADir;			
uniform vec3 LAColor;	
uniform mat4 LADirMatrix;
uniform vec3 cameraPos;

// Final color is returned into:

out vec4 outColor;


vec3 compLambertDiffuse(vec3 lightDir, vec3 lightCol, vec3 normalVec, vec3 diffColor) {
  vec3 diffuseLambert = lightCol * clamp(dot(normalVec, lightDir),0.0,1.0) * diffColor;
     return  diffuseLambert;
}


vec3 compPhongSpecular(vec3 lightDir, vec3 lightCol, vec3 normalVec, vec3 eyedirVec,  vec3 specularColor) {
	vec3 reflection = -reflect(lightDir, normalVec);
	vec3 phongSpecular = lightCol * pow(max(dot(reflection, eyedirVec), 0.0), 0.3) * specularColor;
	return          phongSpecular;
}

void main() 
{
  vec3 normalVec = normalize(fsNormal);
	vec4 diffColor = vec4(0.2, 0.9, 0.7, 1.0);
	vec4 specularColor = vec4(1.0, 1.0, 1.0, 1.0);
	vec3 lightDir = normalize(mat3(LADirMatrix) * LADir);
	vec3 lambertDiffuse = compLambertDiffuse(lightDir, LAColor, normalVec, diffColor.rgb);
	// vec3 specularPhong = compPhongSpecular(lightDir, LAColor, normalVec, cameraPos, specularColor.rgb);
	


	// lambert diffuse without specular
	  outColor = vec4(clamp(lambertDiffuse  ,0.0, 1.0), diffColor.a);
	
}
