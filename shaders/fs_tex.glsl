#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fsPosition; 
in vec2 uv_coord;
out vec4 outColor;
uniform sampler2D u_texture;


uniform vec3 mDiffColor; //material diffuse color 
uniform vec3 mSpecColor; //material specular color
uniform float mSpecPower; //power of specular ref

uniform vec3 lightDirection; // directional light direction vec
uniform vec3 lightColor; //directional light color 


void main() {

  outColor = texture(u_texture, uv_coord);

}