var camera;
var light;
//stores all Objects3D in the scene
var objects = [];
var objectsCount = 0;


var player;
var bot;


var Scene = 
{
	addObject3D: function(object)
	{
		objects[objectsCount] = object;
		objectsCount++;
	},

	addObjects3D: function(objects)
	{
		for(this.objectsCount; this.objectsCount<objects.length; this.objectsCount++)
			objects[objectsCount] = object;
	},

	loadGlobalAssets()
	{
		boundingBoxShader	= new Shader("boundingBox_vs.glsl", "boundingBox_fs.glsl");
		unitCubeMesh  		= Mesh.loadFromOBJFile("u_cube.obj");
	},

	init: function()
	{
		Scene.loadGlobalAssets();
		var shader 			= new Shader("vs_2.glsl", "fs_dir.glsl");

		var plantMesh 		= Mesh.loadFromOBJFile("plant.obj");
		var houseMesh 		= Mesh.loadFromOBJFile("house.obj");
		var gearMesh 		= Mesh.loadFromOBJFile("gear.obj");
		var castleTowerMesh	= Mesh.loadFromOBJFile("castle_tower.obj");
		var castleWallMesh	= Mesh.loadFromOBJFile("castle_wall.obj");

		//creates objects
		Scene.addObject3D(new Object3D(plantMesh, shader));
		Scene.addObject3D(new Object3D(plantMesh, shader));
		Scene.addObject3D(new Object3D(houseMesh, shader));

		//wall
		var tmpObj = new Box3D(2, 10, 8, shader);
		tmpObj.setPosition(0, 5, -10);
		Scene.addObject3D(tmpObj);

		//floor
		var tmpObj = new Box3D(500, 1, 500, shader);
		tmpObj.setPosition(0, -0.5, 0);
		Scene.addObject3D(tmpObj);

		//trigger
		var tmpObj = new TriggerBox3D(20, 20, 20, shader);
		tmpObj.setPosition(-20, 12, 20);
		Scene.addObject3D(tmpObj);

		//boxes with gravity
		var tmpObj = new MobileBox3D(5, 5, 5, shader);
		tmpObj.setPosition(15, 30, -10);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(objects);
		Scene.addObject3D(tmpObj);

		var tmpObj = new Box3D(7, 5, 3, shader);
		tmpObj.setPosition(15, 60, -10);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(objects);
		Scene.addObject3D(tmpObj);

		var tmpObj = new MobileBox3D(3, 5, 3, shader);
		tmpObj.setPosition(25, 60, -10);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(objects);
		Scene.addObject3D(tmpObj);

		var tmpObj = new Box3D(2, 5, 5, shader);
		tmpObj.setPosition(30, 60, -10);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(objects);
		Scene.addObject3D(tmpObj);

		//creates castle
		var maker = new WallsMaker(castleTowerMesh, castleWallMesh, shader,
									-10, 0, 10, 		12, 12, 12);
		maker.insertWalls(5, "U");
		maker.insertWalls(2, "L");
		maker.insertWalls(3, "D");
		maker.insertWalls(2, "L");
		maker.insertWalls(1, "D");
		maker.insertWalls(4, "R");

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
		player  = new Player(unitCubeMesh, gearMesh, shader);
		player.setPosition(-20, 40, 82);
		player.enableCollisionWith(objects);
		
		//creates camera
		camera = new LookAtCamera(shader);
		camera.setLookRadius(15.0);
		camera.setElevation(35.0);
		camera.setLookPoint(0, 0, 0);
		camera.look();

		//creates first light 
	        light = new DirectionalLight('LA', 0.2, 0.2, 1, shader);
	    light.setColor(1.0, 1.0, 1.0);
	    light.moveToCameraSpace(viewMatrix);

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

	    light.moveToCameraSpace(viewMatrix);
	    light.bind();

		//toggle showing of bounding boxes
		if(Input.isKeyClicked(Input.B_KEY))
			showBoundingBoxes = !showBoundingBoxes;


		for(var i=0; i<objectsCount; i++)
			objects[i].render();

		player.render();
		
	
		window.requestAnimationFrame(Scene.render);
	},
}
