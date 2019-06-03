#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos;			

// Final color is returned into:

uniform vec4 mColor;


out vec4 outColor;


void main() 
{
	  outColor = clamp(mColor ,0.0, 1.0);
	
}
