var gl;
var aspectRatio;

var OBJModelsDir 	= "http://127.0.0.1:8887/models/";
var shaderDir 		= "http://127.0.0.1:8887/shaders/";

//global matrices
var perspectiveMatrix;
var viewMatrix;
var projectionMatrix;

//global mesh of a cube with unitary dimensions
var unitCubeMesh;			//loaded in Scene.init()

//global shader for bounding boxes
var boundingBoxShader;		//loaded in Scene.init()

//flag to show/hide bounding boxes of every object in the scene
var showBoundingBoxes = true;