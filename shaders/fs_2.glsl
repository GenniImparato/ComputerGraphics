#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			

uniform vec3 LAPos;			
uniform vec3 LADir;			
uniform float LAConeOut;	
uniform float LAConeIn;		
uniform float LADecay;		
uniform float LATarget;		
uniform vec4 LAColor;	
uniform vec3 lightType;
		

uniform vec4 ambientLightColor;		
uniform vec4 ambientLightLowColor;	
uniform vec3 ADir;					

uniform float SpecShine;				
uniform float DToonTh;				
uniform float SToonTh;				
		
				
	
uniform vec3 eyedirVec;				


// Final color is returned into:

out vec4 outColor;

void main() 
{
	vec4 diffColor = vec4(0.1, 0.9, 1.0, 1.0);
	// directional light
	
	vec3 dirLightDir = LADir;
	vec4 dirLightColor = LAColor;

	//point light
	vec3 pointLightDir = normalize(LAPos - fs_pos);
	vec4 pointLightColor = LAColor * pow( (LATarget / length(LAPos - fs_pos)), LADecay);	
	
	// spot light
	vec3 spotLightDir = normalize(LAPos - fs_pos);
	float cosAngle = dot(spotLightDir, LADir);
	vec4 spotLightColor = LAColor *  pow( (LATarget / length(LAPos - fs_pos)), LADecay) * 
								clamp((cosAngle - LAConeOut)/(LAConeIn - LAConeOut) , 0.0, 1.0);


	vec3 lightDir = dirLightDir * lightType.x +
					pointLightDir * lightType.y + 
					spotLightDir  * lightType.z;

	vec4 lightColor = dirLightColor * lightType.x +
					pointLightColor * lightType.y + 
					spotLightColor  * lightType.z;

	// lambert diffuse without specular
	outColor = clamp(lightColor * diffColor *  clamp(dot(fsNormal, lightDir), 0.0, 1.0), 0.0, 1.0);
}