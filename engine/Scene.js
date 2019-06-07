var firstPersonCamera;
var lookAtCamera;

var lights = []; // should have maximum 3 lights
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

		var castleExteriorMesh	= Mesh.loadFromOBJFile("castle_exterior.obj", "castle_exterior_bBoxes.obj");
		var castleInteriorMesh	= Mesh.loadFromOBJFile("castle_interior.obj", "castle_interior_bBoxes.obj");
		var castleTowersMesh	= Mesh.loadFromOBJFile("castle_towers_doors.obj", "castle_towers_doors_bBoxes.obj");
		var castleDoorRMesh		= Mesh.loadFromOBJFile("castle_doorR.obj");
		var castleDoorLMesh		= Mesh.loadFromOBJFile("castle_doorL.obj");

		var ghostMesh			= Mesh.loadFromOBJFile("ghost.obj");

		var unitCubeTexMesh 	= Mesh.loadFromOBJFile("u_cube_leather.obj");


		////		CREATE MATERIALS
		////__________________________________
		var greenSpecMaterial = new SpecularMaterial(0.0, 255, 10, 255);
	    var greenMaterial = new DiffuseMaterial(0.0, 255, 10, 255);
		var redMaterial = new DiffuseMaterial(255, 50, 50, 255);
		var lavaMaterial = new SpecularMaterial(255, 0, 0, 255);
		var brownMaterial = new DiffuseMaterial(255, 200, 50, 255);
		var yellowMaterial = new DiffuseMaterial( 255, 255 , 0, 255);
		var textureMaterial = new TextureMaterial("crate.png");
		var castleInteriorTex = new TextureDiffuse("castle_interior.jpg");
		var castleExteriorTex = new TextureDiffuse("castle_exterior.jpg");
		var castleDoorsTex = new TextureDiffuse("castle_towers_doors.jpg");
		var house0Tex = new TextureDiffuse("house0.jpg");

	    console.log("Loaded texture");

		////		CREATE OBJECTS 3D
		////__________________________________


		//floors
		var tmpObj = new Box3D(200, 100, 190, greenMaterial);
		tmpObj.setPosition(0, -50, 0);
		tmpObj.addToScene();

		var tmpObj = new Box3D(200, 100, 200, greenMaterial);
		tmpObj.setPosition(0, -50, 250);
		tmpObj.addToScene();

		//lava
		var tmpObj = new Lava3D(1000, 25, 1000, lavaMaterial);
		tmpObj.setPosition(0, -25, 0);
		tmpObj.addToScene();

		//mobile wood boxes
		var tmpObj = new MobileObject3D(woodBox, brownMaterial);
		tmpObj.setPosition(-25, 50, 40);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new MobileObject3D(woodBox, brownMaterial);
		tmpObj.setPosition(-23, 80, 40);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new MobileObject3D(woodBox, brownMaterial);
		tmpObj.setPosition(-45, 100, 35);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		//castle
		var tmpObj = new Castle3D(castleExteriorMesh, castleExteriorTex, 
						castleInteriorMesh, castleInteriorTex, 
						castleTowersMesh, castleDoorsTex,
						castleDoorRMesh, castleDoorLMesh, redMaterial);
		tmpObj.setPosition(0, 0, 8);
		tmpObj.setScale(3, 3, 3);
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
		tmpObj.setPosition(-8, -9, 108);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		//house0 with custom bbox
		var tmpObj = new Object3D(house0Mesh, house0Tex);
		tmpObj.setPosition(40, 0, 200);
		tmpObj.setScale(0.5, 0.5, 0.5);
		tmpObj.setRotation(0, 0, 0);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();
		
		//house0 with default bbox
		var tmpObj = new Object3D(house0MeshNB, house0Tex);
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

		//ghost
		var tmpObj = new Ghost3D(ghostMesh, redMaterial);
		tmpObj.setPosition(-20, 5, 170);
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

	    lights.push(new SpotLight('LA', 0, 20, 30, 0, 0.5, 1, 50, 0.7 ));
	    lights.push(new PointLight('LB', 0, 20, 30, 50, 0.7 ));
	    //lights.push(new DirectionalLight('LB', 0, 0.5, 1));
	    lights[0].setCone(0.4, 0.2)
	    lights[0].setColor(255, 255, 255);
	    lights[1].setColor(255, 255, 255);
	    Light.moveAllLights(viewMatrix);

	},

	render: function()
	{
		gl.clear(gl.COLOR_BUFFER_BIT);

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
		    lights[0].setRotation(firstPersonCamera.angle, firstPersonCamera.elevation);
		}
		else
		{
			lookAtCamera.setAngle(player.rotx);
			lookAtCamera.setLookPoint(player.x, player.y, player.z);
			lookAtCamera.look();
		        lights[0].setRotation(lookAtCamera.angle, lookAtCamera.elevation);
		}

		lights[0].setPosition(player.x, player.y+5, player.z);
	    Light.moveAllLights(viewMatrix);
		

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
