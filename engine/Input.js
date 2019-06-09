var keys = [];
var clickedKeys = [];
var mouseState = false;
var lastMouseX = 0;
var lastMouseY = 0;
var mouseDx = 0;
var mouseDy = 0;
var mouseWheelD = 0;

var pointerLocked = 'pointerLockElement' in document ||
    				'mozPointerLockElement' in document ||
    				'webkitPointerLockElement' in document;

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
	C_KEY:          67,

	init: function()
	{
		window.addEventListener("keyup", Input.keyUp, false);
		window.addEventListener("keydown", Input.keyDown, false);
		/*canvas.addEventListener("mousedown", Input.mouseDown, false);
		canvas.addEventListener("mouseup", Input.mouseUp, false);
		canvas.addEventListener("mousemove", Input.mouseMove, false);
		canvas.addEventListener("mousewheel", Input.mouseWheel, false);*/

		Input.enableMousePointerLock();
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
		mouseDx = event.movementX || event.mozMovementX || 0;
		mouseDy = event.movementY || event.mozMovementY || 0;
	},

 	mouseWheel: function(event) 
 	{
		mouseWheelD = event.wheelDelta/100;
	},

	//mouse pointer lock
	enableMousePointerLock()
	{
		canvas.onclick = function() 
		{
  			canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;
            canvas.requestPointerLock();
		}

		document.addEventListener('pointerlockchange', lockChangeAlert, false);
		document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

		function lockChangeAlert() 
		{
 			if(document.pointerLockElement == canvas ||
  				document.mozPointerLockElement == canvas) 
 			{
    			document.addEventListener("mousedown", Input.mouseDown, false);
				document.addEventListener("mouseup", Input.mouseUp, false);
				document.addEventListener("mousemove", Input.mouseMove, false);
				document.addEventListener("mousewheel", Input.mouseWheel, false);
  			} 
  			else
  			{
  				document.removeEventListener("mousedown", Input.mouseDown, false);
				document.removeEventListener("mouseup", Input.mouseUp, false);
				document.removeEventListener("mousemove", Input.mouseMove, false);
				document.removeEventListener("mousewheel", Input.mouseWheel, false);
  			}
 		}
		
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

	isMouseClicked()
	{
		var ret = mouseState;
		mouseState = false;
		return ret;
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