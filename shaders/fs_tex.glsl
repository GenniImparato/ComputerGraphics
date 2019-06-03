#version 300 es

precision mediump float;

in vec3 fsNormal;
in vec3 fsPosition; 
in vec2 uvFS;
out vec4 outColor;
uniform sampler2D u_texture;


uniform vec3 mDiffColor; //material diffuse color 
uniform vec3 mSpecColor; //material specular color
uniform float mSpecPower; //power of specular ref

uniform vec3 lightDirection; // directional light direction vec
uniform vec3 lightColor; //directional light color 


void main() {

  vec3 nEyeDirection = normalize(eyePosition - fsPosition);
  vec3 nLightDirection = - normalize(lightDirection);
  vec3 nNormal = normalize(fsNormal);
  
  vec3 diffuse = mDiffColor * lightColor * clamp(dot(nLightDirection,nNormal), 0.0, 1.0);
  
  vec3 r = 2.0f * dot(nLightDirection,nNormal) * nNormal - nLightDirection;
  
  vec3 phongSpecular = mSpecColor * lightColor * pow(clamp(dot(nNormal,r), 0.0, 1.0), mSpecPower);
  
  vec4 textureCol = texture(u_texture, uvFS * vec2(1, -1)); 
  outColor = vec4(min(textureCol.xyz + diffuse + phongSpecular, vec3(1.0, 1.0, 1.0)),1.0);
}
