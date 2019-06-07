#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			

// first light
uniform float LAOn;
uniform vec3 LADir;		
uniform vec3 LAPos;	
uniform vec3 LAColor;	
uniform float LAConeIn;
uniform float LAConeOut;
uniform float LADecay;
uniform float LATarget;
uniform vec3 LAType; // x is for directional, y for point and z for spot


uniform float LBOn;
uniform vec3 LBDir;		
uniform vec3 LBPos;	
uniform vec3 LBColor;	
uniform float LBConeIn;
uniform float LBConeOut;
uniform float LBDecay;
uniform float LBTarget;
uniform vec3 LBType; // x is for directional, y for point and z for spot


uniform vec4 mDiffColor;
uniform vec4 mEmitColor;



out vec4 outColor;


vec3 applyLambertDiffuse(vec3 lightDir, vec3 lightCol, vec3 normalVec, vec3 diffColor) {
  vec3 diffuseLambert = lightCol * clamp(dot( lightDir, normalVec),0.0,1.0) * diffColor;
     return  diffuseLambert;
}


void main() 
{
 	vec3 normalVec = normalize(fsNormal);

 	// move light to camera space
	vec3 lightDir = normalize(LADir);
	vec3 lightPos = LAPos;
	float lightDistance = length(lightPos - fs_pos);

	// point light direction
	vec3 pointLightDir = normalize(lightPos - fs_pos);
	vec3 pointLightColor = clamp(LAColor * pow(LATarget/lightDistance, LADecay), 0.0, 1.0);

	// spot light direction and color
	vec3 spotLightDir = lightDir;
	float cosAlpha = dot(pointLightDir, spotLightDir);
	vec3 spotLightColor = LAColor * pow(LATarget/lightDistance, LADecay) * clamp( (cosAlpha - LAConeOut)/(LAConeIn - LAConeOut),0.0, 1.0) ;

	vec3 eyeDirVec = normalize(	- fs_pos);
	
	
	// compute different diffuse components
	// directionalLight
	vec3 dirLambertDiffuseColor = applyLambertDiffuse(lightDir, LAColor, normalVec, mDiffColor.rgb);

	// pointLight 
	vec3 pointLambertDiffuseColor =applyLambertDiffuse(pointLightDir, pointLightColor, normalVec, mDiffColor.rgb);
	// spotLight
	vec3 spotLambertDiffuseColor = applyLambertDiffuse(spotLightDir, spotLightColor, normalVec, mDiffColor.rgb);

	
	// select correct diffuse component
	vec3 lambertDiffuseColor1 = dirLambertDiffuseColor * LAType.x +
						pointLambertDiffuseColor * LAType.y +
						spotLambertDiffuseColor * LAType.z;

        // Second light
	lightDir = normalize(LBDir);
	lightPos = LBPos;
	lightDistance = length(lightPos - fs_pos);

	// point light direction
	pointLightDir = normalize(lightPos - fs_pos);
	pointLightColor = clamp(LBColor * pow(LBTarget/lightDistance, LBDecay), 0.0, 1.0);

	// spot light direction and color
	spotLightDir = lightDir;
	cosAlpha = dot(pointLightDir, spotLightDir);
	spotLightColor = LBColor * pow(LBTarget/lightDistance, LBDecay) * clamp( (cosAlpha - LBConeOut)/(LBConeIn - LBConeOut),0.0, 1.0) ;
	
	// compute different diffuse components
	// directionalLight
	dirLambertDiffuseColor = applyLambertDiffuse(lightDir, LBColor, normalVec, mDiffColor.rgb);
	// pointLight 
	pointLambertDiffuseColor =applyLambertDiffuse(pointLightDir, pointLightColor, normalVec, mDiffColor.rgb);
	// spotLight
	spotLambertDiffuseColor = applyLambertDiffuse(spotLightDir, spotLightColor, normalVec, mDiffColor.rgb);

	vec3 lambertDiffuseColor2 = dirLambertDiffuseColor * LBType.x +
						pointLambertDiffuseColor * LBType.y +
						spotLambertDiffuseColor * LBType.z;


	// lambert diffuse without specular
	outColor = clamp(vec4(lambertDiffuseColor1 * LAOn + lambertDiffuseColor2 * LBOn, mDiffColor.a),0.0, 1.0);
	
}
