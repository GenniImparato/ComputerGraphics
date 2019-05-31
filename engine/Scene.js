var camera;
var directionalLight;

//stores all Objects3D in the scene
var objects = [];
var objectsCount = 0;

var player;


var Scene = 
{
	addObject3D: function(object)
	{
		objects[objectsCount] = object;
		objectsCount++;
	},

	loadGlobalAssets()
	{
		boundingBoxShader	= new Shader("boundingBox_vs.glsl", "boundingBox_fs.glsl");
		unitCubeMesh  		= Mesh.loadFromOBJFile("u_cube.obj");
	},

	init: function()
	{
		Scene.loadGlobalAssets();
		
		var shader 			= new Shader("vs.glsl", "fs_2.glsl");

		var plantMesh 		= Mesh.loadFromOBJFile("plant.obj");
		var houseMesh 		= Mesh.loadFromOBJFile("house.obj");

		//creates objects
		Scene.addObject3D(new Object3D(plantMesh, shader));
		Scene.addObject3D(new Object3D(plantMesh, shader));
		Scene.addObject3D(new Object3D(houseMesh, shader));

		//wall
		var tmpObj = new Box3D(2, 10, 8, shader);
		tmpObj.setPosition(0, 5, -10);
		Scene.addObject3D(tmpObj);

		//floor
		var tmpObj = new Box3D(50, 1, 50, shader);
		tmpObj.setPosition(0, -0.5, 0);
		Scene.addObject3D(tmpObj);

		//trigger
		var tmpObj = new TriggerBox3D(20, 20, 20, shader);
		tmpObj.setPosition(-20, 10, 20);
		Scene.addObject3D(tmpObj);

		//first plant
		objects[0].setPosition(5, 0, 5);
		objects[0].boundingBox.setScaleCorrection(0.2, 1, 0.3);
		objects[0].boundingBox.setPositionCorrection(-0.1, 0, -0.5);

		//second plant
		objects[1].setPosition(5, 0, -5);
		objects[1].setScale(2, 2, 2);
		objects[1].boundingBox.setScaleCorrection(0.2, 1, 0.3);
		objects[1].boundingBox.setPositionCorrection(-0.1, 0, -0.5);

		//house
		objects[2].setPosition(-7, 0, 0);
		objects[2].setScale(0.4, 0.6, 0.5);
		objects[2].boundingBox.setScaleCorrection(0.95, 1, 0.95);

		//player
		player  = new Player(unitCubeMesh, shader);
		player.setPosition(10, 50, 0);
		player.enableCollisionWith(objects);
		
		//creates camera
		camera = new LookAtCamera();
		camera.setLookRadius(15.0);
		camera.setElevation(25.0);
		camera.setLookPoint(0, 0, 0);

		//creates first light 
		directionalLight = new DirectionalLight('LA', 0.0, 0.5, 1.0, shader);
		directionalLight.setColor(1.0, 1.0, 1.0, 1.0);
		directionalLight.bind();

	},

	render: function()
	{
		gl.clear(gl.COLOR_BUFFER_BIT);

		//rotates plants
		objects[0].rotate(1.5, 0, 0);
		objects[1].rotate(-1.5, 0, 0);

		player.handleInput();

		//physics and collisions
		player.solveCollisions();		//only solve collisions with enabled objects
		player.updatePhysics();
		for(var i=0; i<objectsCount; i++)
		{
			objects[i].solveCollisions();		//only solve collisions with enabled objects
			objects[i].updatePhysics();
		}

		//set camera to follow player
		camera.setAngle(player.rotx);
		camera.setLookPoint(player.x, player.y, player.z);
		camera.look();

		//toggle showing of bounding boxes
		if(Input.isKeyClicked(Input.B_KEY))
			showBoundingBoxes = !showBoundingBoxes;


		for(var i=0; i<objectsCount; i++)
			objects[i].render();

		player.render();
	
		window.requestAnimationFrame(Scene.render);
	},
}