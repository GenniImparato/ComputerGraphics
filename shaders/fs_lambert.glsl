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
uniform vec4 mAmbientColor;
uniform vec4 mEmitColor;



out vec4 outColor;


vec3 applyLambertDiffuse(vec3 lightDir, vec3 lightCol, vec3 normalVec, vec3 diffColor) {
  vec3 diffuseLambert = lightCol * clamp(dot( lightDir, normalVec),0.0,1.0) * diffColor;
     return  diffuseLambert;
}


vec3 compLightDir(vec3 LDir, vec3 LPos, vec3 LType) {
  vec3 directDir = normalize(LDir);
  vec3 pointDir = normalize(LPos - fs_pos);
  vec3 spotDir = normalize(LDir);
  return directDir * LType.x +
    pointDir * LType.y +
    spotDir * LType.z;
}

vec3 compLightColor (vec3 LColor, vec3 LDir, float LTarget, vec3 LPos, float LDecay, float LConeIn, float LConeOut, vec3 LType) {
  vec3 directColor = LColor;

  vec3 lightDir = normalize(LPos - fs_pos);
  float lightDistance = length(LPos - fs_pos);
  vec3 pointColor = clamp(LColor * pow(LTarget / lightDistance, LDecay) , 0.0, 1.0);

  float lightConeIn = cos(radians(LConeIn) / 2.0);
  float lightConeOut = cos(radians(LConeOut) / 2.0);
  float cosAlpha = dot(lightDir, LDir);
  vec3 spotColor = clamp(LColor * pow(LTarget/lightDistance, LDecay) * clamp( (cosAlpha - lightConeOut) / (lightConeIn - lightConeOut), 0.0, 1.0), 0.0, 1.0);

  return directColor * LType.x +
    pointColor * LType.y +
    spotColor * LType.z;
  
}


void main() 
{
 	vec3 normalVec = normalize(fsNormal);

 	// move light to camera space
	vec3 lightDir = normalize(LADir);
	vec3 lightPos = LAPos;
	float lightDistance = length(lightPos - fs_pos);
	vec3 eyeDirVec = normalize(	- fs_pos);

	// first light
	vec3 lightADir = compLightDir(LADir, LAPos, LAType);
	vec3 lightAColor = compLightColor(LAColor, LADir, LATarget, LAPos, LADecay, LAConeIn, LAConeOut, LAType);
	
	// first light diffuse component
	vec3 lambertDiffuseColor1 = applyLambertDiffuse(lightADir, lightAColor, normalVec, mDiffColor.rgb);
        // Second light
	vec3 lightBDir = compLightDir(LBDir, LBPos, LBType);
	vec3 lightBColor = compLightColor(LBColor, LBDir, LBTarget, LBPos, LBDecay, LBConeIn, LBConeOut, LBType);
	

	vec3 lambertDiffuseColor2 = applyLambertDiffuse(lightBDir, lightBColor, normalVec, mDiffColor.rgb);


	// lambert diffuse without specular
	outColor = clamp(vec4(lambertDiffuseColor1 * LAOn + lambertDiffuseColor2 * LBOn + mAmbientColor.rgb + mEmitColor.rgb, mDiffColor.a),0.0, 1.0);
	
}
