var gl;
var canvas;
var aspectRatio;

var basePath = window.location.href;
var OBJModelsDir 	= basePath + "/models/";
var shaderDir 		= basePath + "/shaders/";
const textureDir = basePath + "/textures/"

//global matrices
var perspectiveMatrix;
var viewMatrix;
var projectionMatrix;

//global shader for bounding boxes

//flag to show/hide bounding boxes of every object in the scene
var showBoundingBoxes = false;
//flag to toggle fpcamera/lookatcamera, first person = true;
var cameraMode = true;

var gravityAccelY = -0.02;

// utility to avoid CORS problems
function requestCORSIfNotSameOrigin(img, url) {
  if ((new URL(url)).origin !== window.location.origin) {
    img.crossOrigin = "";
  }
}	