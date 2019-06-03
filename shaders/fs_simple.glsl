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

uniform vec4 mColor;


out vec4 outColor;


void main() 
{
	  outColor = clamp(mColor ,0.0, 1.0);
	
}
