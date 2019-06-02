#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			

uniform vec3 LADir;			
uniform vec3 LAColor;	
uniform mat4 LADirMatrix;
uniform vec3 cameraPos;
uniform vec3 LAType; // x is for directional, y for point and z for spot

// Final color is returned into:

uniform vec4 mDiffColor;
uniform vec4 mSpecColor;
uniform float mSpecShine;
uniform vec4 mEmitColor;
uniform vec3 mType; //  x is for diffuse, y is for specular and z is for emit


out vec4 outColor;


vec3 compLambertDiffuse(vec3 lightDir, vec3 lightCol, vec3 normalVec, vec3 diffColor) {
  vec3 diffuseLambert = lightCol * clamp(dot(normalVec, lightDir),0.0,1.0) * diffColor;
     return  diffuseLambert;
}


vec4 compPhongSpecular(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec3 eyedirVec,  vec4 specularColor, float specularShine) {
	vec3 reflection = -reflect(lightDir, normalVec);
	vec4 phongSpecular = lightCol * pow(clamp(dot(reflection, eyedirVec), 0.0, 1.0), specularShine ) * specularColor;
	return          phongSpecular;
}

void main() 
{
 	vec3 normalVec = normalize(fsNormal);
	vec3 lightDir = normalize(mat3(LADirMatrix) * LADir);
	vec3 dirLambertDiffuse = compLambertDiffuse(lightDir, LAColor, normalVec, mDiffColor.rgb);
	vec3 pointLambertDiffuse = vec3(1.0, 1.0, 1.0);
	vec3 spotLambertDiffuse = vec3(1.0, 1.0, 1.0);
	vec3 eyeDirVec = normalize(- fs_pos);
	vec4 specularPhong = compPhongSpecular(lightDir, vec4(LAColor,1.0), normalVec, eyeDirVec, mSpecColor, mSpecShine);
	
	vec3 lambertDiffuse = dirLambertDiffuse * LAType.x +
						pointLambertDiffuse * LAType.y +
						spotLambertDiffuse * LAType.z;

	float alphaComponent = mDiffColor.a * mType.x + mSpecColor.a * mType.y +
						mEmitColor.a * mType.z;
	// lambert diffuse without specular
	  outColor = clamp(vec4(lambertDiffuse, mDiffColor.a) * mType.x + specularPhong * mType.y ,0.0, 1.0);
	
}
