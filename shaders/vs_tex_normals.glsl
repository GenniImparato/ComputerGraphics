#version 300 es

in vec3 inPosition;
in vec3 inNormal;
in vec2 inUV;
out vec3 fsNormal;
out vec3 fs_pos;
out vec2 uv_coord;

uniform mat4 worldProjectionMatrix; 
uniform mat4 nMatrix;
uniform mat4 worldViewMatrix;
uniform float uvTime;
uniform sampler2D uNormalMap;

void main() 
{
  vec4 nTex = texture(uNormalMap, inUV);
  fsNormal = mat3(nMatrix) * vec3(2.0 * nTex.r  - 1.0, 2.0 * nTex.g  - 1.0, 2.0 * nTex.b  - 1.0); 
  fs_pos = (worldViewMatrix * vec4(inPosition, 1.0)).xyz;
  gl_Position = worldProjectionMatrix * vec4(inPosition, 1.0);
  uv_coord = vec2(inUV.x + uvTime*0.001, inUV.y + uvTime*0.001);
}
