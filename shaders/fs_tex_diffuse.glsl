#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos; 
in vec2 uv_coord;
out vec4 outColor;
uniform sampler2D uTexture;


uniform vec3 LADir;		
uniform vec3 LAPos;	
uniform vec3 LAColor;	
uniform float LAConeIn;
uniform float LAConeOut;
uniform float LADecay;
uniform float LATarget;
uniform vec3 cameraPos;
uniform vec3 LAType; // x is for directional, y for point and z for spot


uniform vec4 mDiffColor;
uniform vec4 mEmitColor;



vec3 applyLambertDiffuse(vec3 lightDir, vec3 lightCol, vec3 normalVec, vec3 diffColor) {
  vec3 diffuseLambert = lightCol * clamp(dot( lightDir, normalVec),0.0,1.0) * diffColor;
     return  diffuseLambert;
}





void main() {
	vec3 normalVec = normalize(fsNormal);
	vec2 flippedUv = vec2(uv_coord.x, 1.0 - uv_coord.y);
	vec4 texColor =  texture(uTexture, flippedUv);

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
	vec3 spotLightColor = clamp(LAColor * pow(LATarget/lightDistance, LADecay) * clamp( (cosAlpha - LAConeOut)/(LAConeIn - LAConeOut),0.0, 1.0), 0.0, 1.0) ;

	vec3 eyeDirVec = normalize(	- fs_pos);
	
	
	// compute different diffuse components
	// directionalLight
	vec3 dirLambertDiffuseColor = applyLambertDiffuse(lightDir, LAColor, normalVec, texColor.rgb);

	// pointLight 
	vec3 pointLambertDiffuseColor =applyLambertDiffuse(pointLightDir, pointLightColor, normalVec, texColor.rgb);
	// spotLight
	vec3 spotLambertDiffuseColor = applyLambertDiffuse(spotLightDir, spotLightColor, normalVec, texColor.rgb);

	
	// select correct diffuse component
	vec3 lambertDiffuseColor = dirLambertDiffuseColor * LAType.x +
						pointLambertDiffuseColor * LAType.y +
						spotLambertDiffuseColor * LAType.z;


	// lambert diffuse without specular
	  outColor = clamp(vec4(lambertDiffuseColor, texColor.a),0.0, 1.0);

	  

}