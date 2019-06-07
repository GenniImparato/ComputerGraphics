#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fs_pos; 
in vec2 uv_coord;
out vec4 outColor;
uniform sampler2D uTexture;



uniform vec3 mDiffColor; //material diffuse color 
uniform vec3 mSpecColor; //material specular color
uniform float mSpecPower; //power of specular ref




void main() {

     vec2 flippedUv = vec2(uv_coord.x, 1.0 - uv_coord.y);

  outColor = texture(uTexture, flippedUv);  

}