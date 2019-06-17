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
uniform float wavePeriod;
uniform float waveHeight;

void main() 
{
  fsNormal = mat3(nMatrix) * inNormal; 
  vec3 newPos = vec3(inPosition.x, inPosition.y  + waveHeight / 2.0 * sin(wavePeriod * inPosition.x + uvTime * 0.01 ) - waveHeight / 2.0 * cos(wavePeriod * inPosition.z + uvTime * 0.01 )  , inPosition.z);
  fs_pos = (worldViewMatrix * vec4(newPos, 1.0)).xyz;	
  gl_Position = worldProjectionMatrix * vec4(newPos, 1.0);
  uv_coord = vec2(inUV.x + uvTime*0.001, inUV.y + uvTime*0.001);
}
