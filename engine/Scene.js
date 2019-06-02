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
		////		LOAD ASSETS
		////_________________________________

		Scene.loadGlobalAssets();
		var shader 			= new Shader("vs_2.glsl", "fs_2.glsl");

		var plantMesh 		= Mesh.loadFromOBJFile("plant.obj");
		var houseMesh 		= Mesh.loadFromOBJFile("house.obj");
		var gearMesh 		= Mesh.loadFromOBJFile("gear.obj");
		var castleTowerMesh	= Mesh.loadFromOBJFile("castle_tower.obj");
		var castleWallMesh	= Mesh.loadFromOBJFile("castle_wall.obj");
		var woodBox			= Mesh.loadFromOBJFile("wood_box.obj");

		////		CREATE OBJECTS 3D
		////__________________________________
		var greenMaterial = new SimpleMaterial(0.0, 0.9, 0.1, 1.0,  shader);
		var redMaterial = new SimpleMaterial(1.0, 0.2, 0.2, 1.0, shader);
		var brownMaterial = new SimpleMaterial(	0.5, 0.3, 0.31, 1.0, shader);
		var yellowMaterial = new SimpleMaterial( 0.2, 0.8, 0.9, 1.0, shader);

		//small plant
		var tmpObj = new Object3D(plantMesh, shader, greenMaterial);
		tmpObj.setPosition(5, 0, 5);
		tmpObj.boundingBox.setScaleCorrection(0.2, 1, 0.3);
		tmpObj.boundingBox.setPositionCorrection(-0.1, 0, -0.5);
		tmpObj.addToScene();

		//big plant
		var tmpObj = new Object3D(plantMesh, shader, greenMaterial);
		tmpObj.setPosition(5, 0, -5);
		tmpObj.setScale(2, 2, 2);
		tmpObj.boundingBox.setScaleCorrection(0.2, 1, 0.3);
		tmpObj.boundingBox.setPositionCorrection(-0.1, 0, -0.5);
		tmpObj.addToScene();

		//house
		var tmpObj = new Object3D(houseMesh, shader, redMaterial);
		tmpObj.setPosition(-7, 0, 0);
		tmpObj.setScale(0.4, 0.6, 0.5);
		tmpObj.addToScene();
		tmpObj.boundingBox.setScaleCorrection(0.95, 1, 0.95);

		//wall
		var tmpObj = new Box3D(2, 10, 8, shader);
		tmpObj.setPosition(0, 5, -10);
		tmpObj.addToScene();

		//floor
		var tmpObj = new Box3D(500, 1, 500, shader);
		tmpObj.setPosition(0, -0.5, 0);
		tmpObj.addToScene();

		//trigger
		var tmpObj = new TriggerBox3D(20, 20, 20, shader);
		tmpObj.setPosition(-20, 12, 20);
		tmpObj.addToScene();


		var tmpObj = new Box3D(7, 5, 3, shader);
		tmpObj.setPosition(15, 60, -10);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();


		//mobile wood boxes
		var tmpObj = new MobileObject3D(woodBox, shader, brownMaterial);
		tmpObj.setPosition(-25, 50, 50);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new MobileObject3D(woodBox, shader, brownMaterial);
		tmpObj.setPosition(-23, 80, 50);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new MobileObject3D(woodBox, shader, brownMaterial	);
		tmpObj.setPosition(-45, 100, 45);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		//castle
		var tmpObj = new Castle3D(castleTowerMesh, castleWallMesh, shader, 12, 12, 12);
		tmpObj.setPosition(-10, 0, 10);
		tmpObj.insertWalls(5, "U");
		tmpObj.insertWalls(2, "L");
		tmpObj.insertWalls(3, "D");
		tmpObj.insertWalls(2, "L");
		tmpObj.insertWalls(1, "D");
		tmpObj.insertWalls(4, "R");
		tmpObj.addToScene();

		//player
		player  = new Player(unitCubeMesh, gearMesh, shader);
		player.setPosition(-20, 40, 82);
		player.setMaterial(yellowMaterial);
		player.enableCollisionWith(objects);
		
		///			CAMERA
		///_______________________

		camera = new LookAtCamera(shader);
		camera.setLookRadius(15.0);
		camera.setElevation(35.0);
		camera.setLookPoint(0, 0, 0);
		camera.look();

		///			LIGHTS
		///___________________________

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
