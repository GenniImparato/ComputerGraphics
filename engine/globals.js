var gl;
var canvas;
var aspectRatio;

var OBJModelsDir 	= "http://127.0.0.1:8887/models/";
var shaderDir 		= "http://127.0.0.1:8887/shaders/";
const textureDir = "http://127.0.0.1:8887/textures/"

//global matrices
var perspectiveMatrix;
var viewMatrix;
var projectionMatrix;

//global mesh of a cube with unitary dimensions
var unitCubeMesh;			//loaded in Scene.init()

//global shader for bounding boxes

//flag to show/hide bounding boxes of every object in the scene
var showBoundingBoxes = false;

var gravityAccelY = -0.02;

// utility to avoid CORS problems
function requestCORSIfNotSameOrigin(img, url) {
  if ((new URL(url)).origin !== window.location.origin) {
    img.crossOrigin = "";
  }
}	