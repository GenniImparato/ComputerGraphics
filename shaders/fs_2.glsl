#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			

uniform vec3 LADir;		
uniform vec3 LAPos;	
uniform vec3 LAColor;	
uniform float LADecay;
uniform float LATarget;
uniform mat4 LADirMatrix;
uniform mat4 LAPosMatrix;
uniform vec3 cameraPos;
uniform vec3 LAType; // x is for directional, y for point and z for spot

// Final color is returned into:

uniform vec4 mDiffColor;
uniform vec4 mSpecColor;
uniform float mSpecShine;
uniform vec4 mEmitColor;
uniform vec3 mType; //  x is for diffuse, y is for specular and z is for emit


out vec4 outColor;


vec3 lambertDiffuse(vec3 lightDir, vec3 lightCol, vec3 normalVec, vec3 diffColor) {
  vec3 diffuseLambert = lightCol * clamp(dot( lightDir, normalVec),0.0,1.0) * diffColor;
     return  diffuseLambert;
}


vec4 compPhongSpecular(vec3 lightDir, vec3 lightCol, vec3 normalVec, vec3 eyedirVec,  vec4 specularColor, float specularShine) {
	vec3 reflection = -reflect(lightDir, normalVec);
	vec4 phongSpecular = vec4(lightCol, 1.0) * pow(clamp(dot(reflection, eyedirVec), 0.0, 1.0), specularShine ) * specularColor;
	return          phongSpecular;
}

void main() 
{
 	vec3 normalVec = normalize(fsNormal);

 	// move light to camera space
	vec3 lightDir = normalize(mat3(LADirMatrix) * LADir);
	vec4 lightPos4 = LAPosMatrix * vec4(LAPos, 1.0);
	vec3 lightPos = lightPos4.xyz;

	// point light direction
	float pointDistance = length(lightPos - fs_pos);
	vec3 pointLightDir = normalize(lightPos - fs_pos);
	vec3 pointLightColor = clamp(LAColor * pow(LATarget/pointDistance, LADecay), 0.0, 1.0);

	vec3 eyeDirVec = normalize(	- fs_pos);
	
	
	// compute different diffuse components
	// directionalLight
	vec3 dirLambertDiffuseColor = lambertDiffuse(lightDir, LAColor, normalVec, mDiffColor.rgb);
	vec4 dirSpecularPhong = compPhongSpecular(lightDir, LAColor, normalVec, eyeDirVec, mSpecColor, mSpecShine);

	// pointLight 
	vec3 pointLambertDiffuseColor = lambertDiffuse(pointLightDir, pointLightColor, normalVec, mDiffColor.rgb);
	vec4 pointSpecularPhong = compPhongSpecular(pointLightDir, pointLightColor, normalVec, eyeDirVec, mSpecColor, mSpecShine);
	// spotLight
	vec3 spotLambertDiffuseColor = vec3(1.0, 1.0, 1.0);
	vec4 spotSpecularPhong = compPhongSpecular(lightDir, LAColor, normalVec, eyeDirVec, mSpecColor, mSpecShine);

	
	// select correct diffuse component
	vec3 lambertDiffuseColor = dirLambertDiffuseColor * LAType.x +
						pointLambertDiffuseColor * LAType.y +
						spotLambertDiffuseColor * LAType.z;

	vec4 specularPhong = dirSpecularPhong * LAType.x +
						pointSpecularPhong * LAType.y + 
						spotSpecularPhong * LAType.z;

	// lambert diffuse without specular
	  outColor = clamp(vec4(lambertDiffuseColor, mDiffColor.a) * mType.x + specularPhong * mType.y ,0.0, 1.0);
	
}
