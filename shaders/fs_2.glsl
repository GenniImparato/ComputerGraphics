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
uniform float LAdirectionalBool;
uniform float LApointBool;
uniform float LAspotBool;
					
uniform vec4 mDiffColor;
uniform vec4 mSpecColor; 

// Final color is returned into:

out vec4 outColor;

void main() 
{
	vec4 diffColor = vec4(0.1, 0.9, 1.0, 1.0);
	// directional light

	vec3 dirLightDir = normalize(LADir) ;
	vec4 dirLightColor = LAColor ;

	//point light
	vec3 pointLightDir = normalize(LAPos - fs_pos) ;
	vec4 pointLightColor = LAColor * pow( (LATarget / length(LAPos - fs_pos)), LADecay) ;	
	
	// spot light
	vec3 spotLightDir = normalize(LAPos - fs_pos) ;
	float cosAngle = dot(spotLightDir, LADir);
	vec4 spotLightColor = LAColor *  pow( (LATarget / length(LAPos - fs_pos)), LADecay) * 
								clamp((cosAngle - LAConeOut)/(LAConeIn - LAConeOut) , 0.0, 1.0) ; 

	vec3 lightDir = vec3(1.0, 1.0, 1.0);
	vec4 lightColor = vec4(0.0, 0.0, 0.0, 1.0);

	lightDir = dirLightDir;
	lightColor = dirLightColor;


	// lambert diffuse without specular
	outColor = clamp(lightColor * diffColor *  clamp(dot(fsNormal, lightDir), 0.0, 1.0), 0.0, 1.0);
}