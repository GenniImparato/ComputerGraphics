function shaders() {
// The shader can find the required informations in the following variables:

//vec3 fs_pos;			// Position of the point in 3D space
//
//vec3 LAPos;			// Position of first (or single) light
//vec3 LADir;			// Direction of first (or single) light
//float LAConeOut;		// Outer cone (in degree) of the light (if spot)
//float LAConeIn;		// Inner cone (in percentage of the outher cone) of the light (if spot)
//float LADecay;		// Decay factor (0, 1 or 2)
//float LATarget;		// Target distance
//vec4 LAlightColor;	// color of the first light
//		
//vec3 LBPos;			// Same as above, but for the second light
//vec3 LBDir;
//float LBConeOut;
//float LBConeIn;
//float LBDecay;
//float LBTarget;
//vec4 LBlightColor;
//
//vec3 LCPos;			// Same as above, but for the third one
//vec3 LCDir;
//float LCConeOut;
//float LCConeIn;
//float LCDecay;
//float LCTarget;
//vec4 LClightColor;
//
//vec4 ambientLightColor;		// Ambient light color. For hemispheric, this is the color on the top
//vec4 ambientLightLowColor;	// For hemispheric ambient, this is the bottom color
//vec3 ADir;					// For hemispheric ambient, this is the up direction
//
//float SpecShine;				// specular coefficient for both blinn and phong
//float DToonTh;				// Threshold for diffuse in a toon shader
//float SToonTh;				// Threshold for specular in a toon shader
//
//vec4 diffColor;				// diffuse color
//vec4 ambColor;				// material ambient color
//vec4 specularColor;			// specular color
//vec4 emit;					// emitted color
//	
//vec3 normalVec;				// direction of the normal vecotr to the surface
//vec3 eyedirVec;				// looking direction
//
//
// Final color is returned into:
//vec4 out_color;

// Single directional light, Lambert diffuse only: no specular, no ambient, no emission
var S1 = `
    float cosAlphaAngle = dot( normalize(LADir), normalize(normalVec));
	out_color = clamp(LAlightColor *  diffColor * clamp(cosAlphaAngle, 0.0, 1.0), 0.0, 1.0);
`;

// Single point light with decay, Lambert diffuse, Blinn specular, no ambient and no emission
var S2 = `
	vec3 differenceVector = normalize(LAPos - fs_pos);
	float differenceLength = length(LAPos - fs_pos);
	float decayFactor = pow( (LATarget / differenceLength), LADecay);	
	float cosAlphaAngle = dot(differenceVector, normalize(normalVec));

	vec4 lightColor = LAlightColor * decayFactor ;
	vec4 diffuseComponent  = diffColor * clamp(cosAlphaAngle, 0.0, 1.0);

	vec3 halfVector = normalize(LADir + eyedirVec);
	vec4 specularComponent = specularColor * pow(clamp(dot(normalize(normalVec), halfVector), 0.0, 1.0), SpecShine);

	out_color = clamp(lightColor * diffuseComponent + lightColor * specularComponent, 0.0, 1.0) ;
`;

// Single directional light, Lambert diffuse, Phong specular, constant ambient and emission
var S3 = `
	float cosAlphaAngle = max(dot(LADir, normalize(normalVec) ), 0.0);
	vec3 reflectionDir = -reflect(LADir, normalize(normalVec));
	float specularIntensity = pow(
									clamp(dot(eyedirVec, reflectionDir), 0.0, 1.0), 
									SpecShine); 

	vec4 diffuseComponent =  diffColor * clamp(cosAlphaAngle, 0.0, 1.0); 
	vec4 specularComponent = specularColor * specularIntensity;
	out_color = clamp(
						LAlightColor * (diffuseComponent + specularComponent) + ambientLightColor * ambColor + emit ,
						0.0, 1.0)	;
`;

// Single spot light (with decay), Lambert diffuse, Blinn specular, no ambient and no emission
var S4 = `
	vec3 differenceVector = normalize(LAPos - fs_pos);
	float differenceLength = length(LAPos - fs_pos);
	float cosAlphaLight = max(dot(differenceVector, LADir), 0.0);
 	float lightConeOut = cos(radians(LAConeOut) / 2.0);
 	float lightConeIn = cos(radians(LAConeIn * LAConeOut) / 2.0);
	float coneLight = clamp( (cosAlphaLight - lightConeOut) /(lightConeIn - lightConeOut),0.0, 1.0);
	float lightDecay =  pow( LATarget / differenceLength , LADecay);
	vec4 lightComponent  = LAlightColor *  lightDecay * coneLight; 


	float cosAlphaAngle = max(dot(differenceVector, normalize(normalVec)), 0.0);
	vec4 diffuseComponent =  diffColor * cosAlphaAngle;
	
	vec3 halfVector = normalize(differenceVector + eyedirVec);
	vec4 specularComponent = specularColor * pow(clamp(dot(normalVec, halfVector), 0.0, 1.0), SpecShine);
	out_color = clamp(lightComponent * (diffuseComponent + specularComponent), 0.0, 1.0);
`; // Check the result

// Single directional light, Cartoon diffuse, Cartoon specular, no ambient but emission
var S5 = `
	float cosAlphaAngle = clamp(dot(normalize(normalVec), LADir), 0.0, 1.0);
	vec3 reflectionDir = -reflect(LADir, normalize(normalVec));
	float specularIntensity = clamp( dot(eyedirVec, reflectionDir), 0.0, 1.0);
	vec4 diffuseComponent;
	vec4 specularComponent;
	vec4 toonOffset = vec4(0.5, 0.5, 0.5, 0.00);
	if (cosAlphaAngle >= DToonTh) {
		diffuseComponent = diffColor;
	}
	else {
		diffuseComponent = vec4(0.0, 0.0, 0.0, 1.0);
	}
	if (specularIntensity >= SToonTh) {
		specularComponent = specularColor;
	}
	else {
		specularComponent = vec4(0.0, 0.0, 0.0, 1.0);
	}
	out_color = clamp(LAlightColor * ( specularComponent + diffuseComponent) + emit, 0.0, 1.0);
`;

// Single directional light, no diffuse, phong specular, hemispheric ambient and no emission
var S6 = `

	
	
	float specularIntensity = pow(
									clamp(dot(eyedirVec, reflectionDir), 0.0, 1.0), 
									SpecShine); 
	vec4 hemisphericUp = ambientLightColor * (dot(normalVec, ADir) + 1.0)/2.0 :
	vec4 hemisphericDown = ambientLightLowColor * (1.0 - dot(normalVec, ADir))/2.0;
	vec4 hemisphericColor = hemisphericUp + hemisphericDown;

	vec3 reflectionDir = normalVec * 2.0 * dot(LADir , normalVec) - LADir;

	vec4 specularComponent = specularColor * clamp(pow(clamp(dot(reflectionDir, eyedirVec), 0.0, 1.0), SpecShine), 0.0, 1.0);
    
	out_color = clamp( LAlightColor * specularComponent + hemisphericColor * ambColor,0.0, 1.0);
`;

// Three lights: a directional, a point and a spot. Lambert diffuse, phong specular, constant ambient and no emission
var S7 = `
	out_color = vec4(1.0, 1.0, 1.0, 1.0);
`;
	return [S1, S2, S3, S4, S5, S6, S7];
}

