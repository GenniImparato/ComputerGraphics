var keys = [];
var clickedKeys = [];

var Input =
{
	UP_KEY: 		38,
	DOWN_KEY: 		40,
	LEFT_KEY: 		37,
	RIGHT_KEY: 		39,

	SPACE_KEY:      32,
	SHIFT_KEY:      16,

	B_KEY:          66,

	init: function()
	{
		window.addEventListener("keyup", Input.keyUp, false);
		window.addEventListener("keydown", Input.keyDown, false);
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
	
}