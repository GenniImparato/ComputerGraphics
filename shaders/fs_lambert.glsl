#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			

uniform vec3 LADir;		
uniform vec3 LAPos;	
uniform vec3 LAColor;	
uniform float LAConeIn;
uniform float LAConeOut;
uniform float LADecay;
uniform float LATarget;
uniform vec3 cameraPos;
uniform vec3 LAType; // x is for directional, y for point and z for spot

// Final color is returned into:

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
	vec3 lambertDiffuseColor = dirLambertDiffuseColor * LAType.x +
						pointLambertDiffuseColor * LAType.y +
						spotLambertDiffuseColor * LAType.z;


	// lambert diffuse without specular
	  outColor = clamp(vec4(lambertDiffuseColor, mDiffColor.a),0.0, 1.0);
	
}
