#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			// Position of the point in 3D space

uniform vec3 LAPos;			// Position of first (or single) light
uniform vec3 LADir;			// Direction of first (or single) light
uniform float LAConeOut;		// Outer cone (in degree) of the light (if spot)
uniform float LAConeIn;		// Inner cone (in percentage of the outher cone) of the light (if spot)
uniform float LADecay;		// Decay factor (0, 1 or 2)
uniform float LATarget;		// Target distance
uniform vec4 LAlightColor;	// color of the first light
uniform bool directionalLight;
uniform bool pointLight;
uniform bool spotLight;
		

uniform vec4 ambientLightColor;		// Ambient light color. For hemispheric, this is the color on the p
uniform vec4 ambientLightLowColor;	// For hemispheric ambient, this is the bottom color
uniform vec3 ADir;					// For hemispheric ambient, this is the up direction

uniform float SpecShine;				// specular coefficient for both blinn and phong
uniform float DToonTh;				// Threshold for diffuse in a toon shader
uniform float SToonTh;				// Threshold for specular in a toon shader

uniform vec4 diffColor;				// diffuse color
uniform vec4 ambColor;				// material ambient color
uniform vec4 specularColor;			// specular color
uniform vec4 emit;					// emitted color
	
uniform vec3 eyedirVec;				// looking direction


// Final color is returned into:

out vec4 outColor;

void main() 
{
	vec4 diffColor = vec4(0.1, 0.9, 1.0, 1.0);
	if(directionalLight) {
		float cosAlphaAngle = dot(fsNormal, LADir);
	    out_color = clamp(LAlightColor *  diffColor * clamp(cosAlphaAngle, 0.0, 1.0), 0.0, 1.0);

	} else if (pointLight) {
		vec3 differenceVector = LAPos - fs_pos;
		float differenceLength = length(differenceVector);
		float decayFactor = pow( (LATarget / differenceLength), LADecay);	
		float cosAlphaAngle = clamp(dot(differenceVector/differenceLength, LADir), 0.0, 1.0);
		out_color = clamp(LAlightColor * decayFactor * diffColor * cosAlphaAngle, 0.0, 1.0);

	} else if (spotLight) {
		vec3 differenceVector = LAPos - fs_pos;
		float differenceLength = length(differenceVector);
		float cosAlphaAngle = clamp(dot(differenceVector/differenceLength, LADir), 0.0, 1.0);
		float coneLight = clamp( (cosAlphaAngle - LAConeOut) / ( LAConeIn - LAConeOut) ,0.0, 1.0);
		float lightDecay =  pow( LATarget / differenceLength , LADecay);
		vec4 lightComponent  = LAlightColor *  lightDecay * coneLight; 
		vec3 halfVector = normalize(LADir + eyedirVec);
		vec4 diffuseComponent =  diffColor * clamp(cosAlphaAngle, 0.0, 1.0);
		out_color = clamp(lightComponent * diffuseComponent, 0.0, 1.0);

	} else {
	  // no light 
	}
	 

	vec4 lambertColor = diffColor * LAColor * dot(normalize(fsNormal), LADir);
  	outColor = (clamp(lambertColor, 0.0, 1.0));
}