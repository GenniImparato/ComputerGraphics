var keys = [];

var Input =
{
	UP_KEY: 		38,
	DOWN_KEY: 		40,
	LEFT_KEY: 		37,
	RIGHT_KEY: 		39,

	init: function()
	{
		window.addEventListener("keyup", Input.keyUp, false);
		window.addEventListener("keydown", Input.keyDown, false);
	},

	keyUp: function(e)
	{
		if(keys[e.keyCode]) 
  			keys[e.keyCode] = false;
  	},

	keyDown: function(e)
	{
		if(!keys[e.keyCode]) 
  			keys[e.keyCode] = true;
	},

	isKeyPressed(key)
	{
		return keys[key];
	},
	
}