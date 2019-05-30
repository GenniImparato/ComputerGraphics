var camera;
var objects = [];
var playerObj;


var Scene = 
{
	init: function()
	{
		//load shader
		boundingBoxShader	= new Shader("boundingBox_vs.glsl", "boundingBox_fs.glsl");	//global var
		var shader 			= new Shader("vs.glsl", "fs.glsl");

		//load mesh
		 unitCubeMesh  		= Mesh.loadFromOBJFile("u_cube.obj");	//global var
		var plantMesh 		= Mesh.loadFromOBJFile("plant.obj");
		var houseMesh 		= Mesh.loadFromOBJFile("house.obj");
		

		//creates objects
		objects[0] = new Object3D(plantMesh, shader);
		objects[1] = new Object3D(plantMesh, shader);
		objects[2] = new Object3D(houseMesh, shader);
		playerObj  = new Object3D(unitCubeMesh, shader);

		objects[0].setPosition(5, 0, 5);
		objects[1].setPosition(5, 0, -5);
		objects[2].setPosition(-7, 0, 0);
		objects[2].setScale(0.4, 0.6, 0.5);
		playerObj.setPosition(10, 0, 0);

		//creates camera
		camera = new LookAtCamera();
		camera.setLookRadius(25.0);
		camera.setElevation(45.0);
		camera.setLookPoint(0, 0, 0);

	},

	render: function()
	{
		gl.clear(gl.COLOR_BUFFER_BIT);

		//move player cube
		if(Input.isKeyDown(Input.UP_KEY))
		{
			playerObj.setSpeed(-0.25 * Math.sin(utils.degToRad(-playerObj.rotx)),
								0,
								-0.25 * Math.cos(utils.degToRad(playerObj.rotx)));
		}
		else if(Input.isKeyDown(Input.DOWN_KEY))
		{
			playerObj.setSpeed(0.25 * Math.sin(utils.degToRad(-playerObj.rotx)),
								0,
								0.25 * Math.cos(utils.degToRad(playerObj.rotx)));
		}
		else
			playerObj.setSpeed(0, 0, 0);

		if(Input.isKeyDown(Input.LEFT_KEY))
			playerObj.rotate(-2.0, 0, 0);
		else if(Input.isKeyDown(Input.RIGHT_KEY))
			playerObj.rotate(2.0, 0, 0);

		//rotates plants
		objects[0].rotate(1.5, 0, 0);
		objects[1].rotate(-1.5, 0, 0);

		//collisions
		playerObj.boundingBox.setColor([0, 1, 0, 1]);
		for(var i=0; i<3; i++)
		{
			if(playerObj.checkCollision(objects[i]))
			{
				playerObj.solveCollision(objects[i]);
				playerObj.boundingBox.setColor([0, 0, 1, 1]);
			}
		}

		playerObj.updatePhysics();

		//set camera to follow player
		camera.setAngle(playerObj.rotx);
		camera.setLookPoint(playerObj.x, playerObj.y, playerObj.z);
		camera.look();

		//toggle showing of bounding boxes
		if(Input.isKeyClicked(Input.B_KEY))
			showBoundingBoxes = !showBoundingBoxes;


		objects[0].render();
		objects[1].render();
		objects[2].render();
		playerObj.render();
	
		window.requestAnimationFrame(Scene.render);
	},
}