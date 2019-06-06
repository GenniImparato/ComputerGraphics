var firstPersonCamera;
var lookAtCamera;

var light;
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

	addObjects3D: function(objects)
	{
		for(this.objectsCount; this.objectsCount<objects.length; this.objectsCount++)
			objects[objectsCount] = object;
	},

	loadGlobalAssets()
	{
		unitCubeMesh = Mesh.loadFromOBJFile("u_cube.obj");
	},

	init: function()
	{
		////		LOAD ASSETS
		////_________________________________

		Scene.loadGlobalAssets();

		var plantMesh 			= Mesh.loadFromOBJFile("plant.obj");
		var houseMesh 			= Mesh.loadFromOBJFile("house.obj");
		var gearMesh 			= Mesh.loadFromOBJFile("gear.obj");
		var castleTowerMesh		= Mesh.loadFromOBJFile("castle_tower.obj");
		var castleWallMesh		= Mesh.loadFromOBJFile("castle_wall.obj");
		var woodBox				= Mesh.loadFromOBJFile("wood_box.obj");
		var rock0Mesh			= Mesh.loadFromOBJFile("rock0.obj");
		var house0Mesh 			= Mesh.loadFromOBJFile("house0.obj", "house0_bBox.obj");
		var house0MeshNB		= Mesh.loadFromOBJFile("house0.obj");
		var tree0TrunkMesh		= Mesh.loadFromOBJFile("tree0_trunk.obj");
		var tree0LeafsMesh 		= Mesh.loadFromOBJFile("tree0_leafs.obj");
		var doorMesh			= Mesh.loadFromOBJFile("wooden_door.obj");

		var castleExteriorMesh	= Mesh.loadFromOBJFile("castle_exterior.obj");
		var castleInteriorMesh	= Mesh.loadFromOBJFile("castle_interior.obj");
		var castleTowersMesh	= Mesh.loadFromOBJFile("castle_towers_doors.obj");

		var unitCubeTexMesh 	= Mesh.loadFromOBJFile("u_cube_leather.obj");


		////		CREATE MATERIALS
		////__________________________________
		var greenSpecMaterial = new SpecularMaterial(0.0, 255, 10, 255);
	    var greenMaterial = new DiffuseMaterial(0.0, 255, 10, 255);
		var redMaterial = new DiffuseMaterial(255, 50, 50, 255);
		var brownMaterial = new DiffuseMaterial(255, 200, 50, 255);
		var yellowMaterial = new DiffuseMaterial( 255, 255 , 0, 255);
		var textureMaterial = new TextureMaterial("crate.png");

	    console.log("Loaded texture");

		////		CREATE OBJECTS 3D
		////__________________________________


		//house
		var tmpObj = new Object3D(houseMesh, redMaterial);
		tmpObj.setPosition(-7, 0, 0);
		tmpObj.setScale(0.4, 0.6, 0.5);
		tmpObj.addToScene();
		tmpObj.boundingBoxes[0].setScaleCorrection(0.95, 1, 0.95);

		//wall
		var tmpObj = new Box3D(2, 10, 8);
		tmpObj.setPosition(0, 5, -10);
		tmpObj.addToScene();

		//floors
		var tmpObj = new Box3D(200, 10, 190, greenMaterial);
		tmpObj.setPosition(0, -5, 0);
		tmpObj.addToScene();

		var tmpObj = new Box3D(200, 10, 200, greenMaterial);
		tmpObj.setPosition(0, -5, 250);
		tmpObj.addToScene();


		//mobile wood boxes
		var tmpObj = new MobileObject3D(woodBox, brownMaterial);
		tmpObj.setPosition(-25, 50, 50);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new MobileObject3D(woodBox, brownMaterial);
		tmpObj.setPosition(-23, 80, 50);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new MobileObject3D(woodBox, brownMaterial);
		tmpObj.setPosition(-45, 100, 45);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		//castle
		var tmpObj = new Castle3D(castleExteriorMesh, yellowMaterial, castleInteriorMesh, redMaterial, castleTowersMesh, greenSpecMaterial);
		tmpObj.setPosition(-10, 0, 10);
		tmpObj.addToScene();

		//bridge
		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, brownMaterial);
		tmpObj.setPosition(0, -15, 140);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, brownMaterial);
		tmpObj.setPosition(10, -10, 130);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, brownMaterial);
		tmpObj.setPosition(4, -4, 115);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, brownMaterial);
		tmpObj.setPosition(1, -9, 103);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		//house0 with custom bbox
		var tmpObj = new Object3D(house0Mesh, redMaterial);
		tmpObj.setPosition(40, 0, 200);
		tmpObj.setScale(0.5, 0.5, 0.5);
		tmpObj.setRotation(0, 0, 0);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();
		
		//house0 with default bbox
		var tmpObj = new Object3D(house0MeshNB, redMaterial);
		tmpObj.setPosition(40, 0, 300);
		tmpObj.setScale(0.5, 0.5, 0.5);
		tmpObj.addToScene();

		//trees
		var tmpObj = new Tree3D(tree0TrunkMesh, brownMaterial, tree0LeafsMesh, greenMaterial);
		tmpObj.setPosition(40, 0, 240);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, brownMaterial, tree0LeafsMesh, greenMaterial);
		tmpObj.setPosition(-10, 0, 200);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, brownMaterial, tree0LeafsMesh, greenMaterial);
		tmpObj.setPosition(5, 0, 300);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, brownMaterial, tree0LeafsMesh, greenMaterial);
		tmpObj.setPosition(-30, 0, 210);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, brownMaterial, tree0LeafsMesh, greenMaterial);
		tmpObj.setPosition(25, 0, 250);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, brownMaterial, tree0LeafsMesh, greenMaterial);
		tmpObj.setPosition(-50, 0, 200);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, brownMaterial, tree0LeafsMesh, greenMaterial);
		tmpObj.setPosition(50, 0, 280);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();

		//door
		var tmpObj = new Door3D(doorMesh, redMaterial);
		tmpObj.setPosition(3, 0, 190);
		tmpObj.addToScene();

		//player
		player  = new Player(unitCubeTexMesh, gearMesh);
		player.setPosition(0, 40, 170);
		player.setMaterial(textureMaterial);
		player.enableCollisionWith(objects);

		
		///			CAMERA
		///_______________________

		lookAtCamera = new LookAtCamera();
		lookAtCamera.setLookRadius(15.0);
		lookAtCamera.setElevation(35.0);
		lookAtCamera.setLookPoint(0, 0, 0);

		firstPersonCamera = new FirstPersonCamera();
		firstPersonCamera.setElevation(35.0);
		firstPersonCamera.setPosition(0, 0, 0);
		firstPersonCamera.look();

		///			LIGHTS
		///___________________________

		//creates first light 
	    light = new DirectionalLight('LA', -1, 1, 1 );

	    //light = new PointLight('LA', 0, 20, 30, 50, 0.7 );
	    light.setColor(255, 255, 255);
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
		player.update();
		for(var i=0; i<objectsCount; i++)
		{
			objects[i].solveCollisions();		//only solve collisions with enabled objects
			objects[i].update();
		}

		if(cameraMode)
		{
			firstPersonCamera.setAngle(player.rotx);
			firstPersonCamera.setPosition(player.x, player.y+5, player.z);
			firstPersonCamera.look();
		}
		else
		{
			lookAtCamera.setAngle(player.rotx);
			lookAtCamera.setLookPoint(player.x, player.y, player.z);
			lookAtCamera.look();
		}

		light.setLightPosition(player.x, player.y+10, player.z);
 	    light.moveToCameraSpace(viewMatrix);
		

		//toggle showing of bounding boxes
		if(Input.isKeyClicked(Input.B_KEY))
			showBoundingBoxes = !showBoundingBoxes;

		//toggle camera modes
		if(Input.isKeyClicked(Input.C_KEY))
			cameraMode = !cameraMode;


		for(var i=0; i<objectsCount; i++)
			objects[i].render();

		player.render();
		
	
		window.requestAnimationFrame(Scene.render);
	},
}
