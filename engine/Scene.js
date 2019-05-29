var camera;
var objects = [];
var playerObj;

var angle = 0;
var anglecam = 0;

var Scene = 
{
	init: function()
	{
		//load shader
		var shader = new Shader("vs.glsl", "fs.glsl");

		//load mesh
		var plantMesh = Mesh.loadFromOBJFile("plant.obj");
		var houseMesh = Mesh.loadFromOBJFile("house.obj");
		var cubeMesh  = Mesh.loadFromOBJFile("cube.obj");

		//creates objects
		objects[0] = new Object(plantMesh, shader);
		objects[1] = new Object(plantMesh, shader);
		objects[2] = new Object(houseMesh, shader);
		playerObj  = new Object(cubeMesh, shader);

		objects[0].setPosition(5, 0, 3);
		objects[1].setPosition(5, 0, -3);
		objects[2].setPosition(-5, 0, 0);
		objects[2].scale = 0.4;
		playerObj.setPosition(10, 0, 0);

		//creates camera
		camera = new LookAtCamera();
		camera.setLookRadius(20.0);
		camera.setElevation(45.0);
		camera.setLookPoint(0, 0, 0);

	},

	render: function()
	{
		gl.clear(gl.COLOR_BUFFER_BIT);
		angle += 1.5;
		anglecam += 0.5;

		//move player cube
		if(Input.isKeyPressed(Input.UP_KEY))
		{
			playerObj.z -= 0.5 * Math.cos(utils.degToRad(playerObj.rotx));
			playerObj.x -= 0.5 * Math.sin(utils.degToRad(-playerObj.rotx));
		}
		else if(Input.isKeyPressed(Input.DOWN_KEY))
		{
			playerObj.z += 0.5 * Math.cos(utils.degToRad(playerObj.rotx));
			playerObj.x += 0.5 * Math.sin(utils.degToRad(-playerObj.rotx));
		}

		if(Input.isKeyPressed(Input.LEFT_KEY))
			playerObj.rotx -= 2;
		else if(Input.isKeyPressed(Input.RIGHT_KEY))
			playerObj.rotx += 2;

		//set camera to follow player
		camera.setAngle(playerObj.rotx);
		camera.setLookPoint(playerObj.x, playerObj.y, playerObj.z);
		camera.look();
		
		//rotates plants
		objects[0].rotx = angle;
		objects[1].rotx = -angle;


		objects[0].render();
		objects[1].render();
		objects[2].render();
		playerObj.render();
	
		window.requestAnimationFrame(Scene.render);
	},
}