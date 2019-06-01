var keys = [];
var clickedKeys = [];
var mouseState = false;
var lastMouseX = -100;
var lastMouseY = -100;
var mouseDx = 0;
var mouseDy = 0;
var mouseWheelD = 0;

var Input =
{
	UP_KEY: 		38,
	DOWN_KEY: 		40,
	LEFT_KEY: 		37,
	RIGHT_KEY: 		39,

	W_KEY: 			87,
	S_KEY: 			83,
	A_KEY: 			65,
	D_KEY: 			68,

	SPACE_KEY:      32,
	SHIFT_KEY:      16,

	B_KEY:          66,

	init: function()
	{
		window.addEventListener("keyup", Input.keyUp, false);
		window.addEventListener("keydown", Input.keyDown, false);
		canvas.addEventListener("mousedown", Input.mouseDown, false);
		canvas.addEventListener("mouseup", Input.mouseUp, false);
		canvas.addEventListener("mousemove", Input.mouseMove, false);
		canvas.addEventListener("mousewheel", Input.mouseWheel, false);
	},

	keyUp: function(e)
	{
		if(keys[e.keyCode]) 
		{
  			keys[e.keyCode] = false;
  			clickedKeys[e.keyCode] = false;
		}
  	},

	keyDown: function(e)
	{
		if(!keys[e.keyCode])
		{
			keys[e.keyCode] = true;
			clickedKeys[e.keyCode] = true;
		} 
  			
	},

	mouseDown: function(event) 
	{
		lastMouseX = event.pageX;
		lastMouseY = event.pageY;
		mouseState = true;
	},


	mouseUp: function(event) 
	{
		lastMouseX = -100;
		lastMouseY = -100;
		mouseState = false;
	},

	mouseMove: function(event) 
	{
		mouseDx = event.pageX - lastMouseX;
		mouseDy = lastMouseY - event.pageY;
		lastMouseX = event.pageX;
		lastMouseY = event.pageY;
	},

 	mouseWheel: function(event) 
 	{
		mouseWheelD = event.wheelDelta/100;
	},


	//getters
	isKeyDown(key)
	{
		return keys[key];
	},

	isKeyClicked(key)
	{
		var ret = clickedKeys[key];

		if(clickedKeys[key])
			clickedKeys[key] = false;

		return ret;
	},

	isMouseDown()
	{
		return mouseState;
	},

	getMouseDiffX()
	{
		var ret = mouseDx;
		mouseDx = 0;
		return ret;
	},

	getMouseDiffY()
	{
		var ret = mouseDy;
		mouseDy = 0;
		return ret;
	},

	getMouseWheelDiff()
	{
		var ret = mouseWheelD;
		mouseWheelD = 0;
		return ret;
	},
	
}