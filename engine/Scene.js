var firstPersonCamera;
var lookAtCamera;

var lights = []; // should have maximum 3 lights
//stores all Objects3D in the scene
var objects = [];
var objectsCount = 0;

var player;

var Scene = 
{
	//add at the end
	addObject3D: function(object)
	{
		objects.push(object);
	},

	//add at the beginning
	addObject3D_: function(object)
	{
		objects.unshift(object);
	},

	removeObject3D: function(object)
	{
		for(var i=0; i<objects.length; i++)
			if(objects[i] == object)
				objects.splice(i, 1);
	},

	loadGlobalAssets()
	{
		unitCubeMesh 		= Mesh.loadFromOBJFile("u_cube.obj");
		unitCubeTexMesh 	= Mesh.loadFromOBJFile("u_cube_leather.obj");
	},

	init: function()
	{
		////		LOAD ASSETS
		////_________________________________

		Scene.loadGlobalAssets();

		var gearMesh 				= Mesh.loadFromOBJFile("gear.obj");
		var castleTowerMesh			= Mesh.loadFromOBJFile("castle_tower.obj");
		var castleWallMesh			= Mesh.loadFromOBJFile("castle_wall.obj");
		var woodBox					= Mesh.loadFromOBJFile("wood_box.obj");
		var rock0Mesh				= Mesh.loadFromOBJFile("rock0.obj");
		var rock1Mesh				= Mesh.loadFromOBJFile("rock1.obj");
		var stone0Mesh				= Mesh.loadFromOBJFile("stone0.obj");
		var house0Mesh 				= Mesh.loadFromOBJFile("house0.obj", "house0_bBox.obj");
		var house0MeshNB			= Mesh.loadFromOBJFile("house0.obj");
		var tree0TrunkMesh			= Mesh.loadFromOBJFile("tree0_trunk.obj");
		var tree0LeafsMesh 			= Mesh.loadFromOBJFile("tree0_leafs.obj");
		var doorMesh				= Mesh.loadFromOBJFile("wooden_door.obj");
		var castleExteriorMesh		= Mesh.loadFromOBJFile("castle_exterior.obj", "castle_exterior_bBoxes.obj");
		var castleInteriorMesh		= Mesh.loadFromOBJFile("castle_interior.obj", "castle_interior_bBoxes.obj");
		var castleTowersMesh		= Mesh.loadFromOBJFile("castle_towers_doors.obj", "castle_towers_doors_bBoxes.obj");
		var castleDoorRMesh			= Mesh.loadFromOBJFile("castle_doorR.obj");
		var castleDoorLMesh			= Mesh.loadFromOBJFile("castle_doorL.obj");
		var castleDungeonWallsMesh	= Mesh.loadFromOBJFile("castle_dungeon_walls.obj", "castle_dungeon_bBoxes.obj");
		var castleFloorMesh			= Mesh.loadFromOBJFile("castle_floor.obj", "castle_floor.obj");
		var skyboxMesh				= Mesh.loadFromOBJFile("skybox.obj");
		var ghostMesh				= Mesh.loadFromOBJFile("ghost.obj");
		var bombMesh				= Mesh.loadFromOBJFile("bomb.obj");
		var keyHoleMesh				= Mesh.loadFromOBJFile("keyhole.obj");
		var keyMesh					= Mesh.loadFromOBJFile("key.obj");
		var lavaMesh				= Mesh.loadFromOBJFile("lava.obj");


		////		CREATE MATERIALS
		////__________________________________
		const ambientColor = [0, 0, 20, 1.0]
		var greenSpecMaterial 		= new SpecularMaterial(0.0, 255, 10, 255);
		greenSpecMaterial.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
	    var greenMaterial 			= new DiffuseMaterial(0.0, 255, 10, 255);
	    greenMaterial.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var redMaterial 			= new DiffuseMaterial(255, 50, 50, 255);
		redMaterial.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var lavaMaterial 			= new SimpleMaterial(255, 0, 0, 255);
		lavaMaterial.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var brownMaterial 			= new DiffuseMaterial(255, 200, 50, 255);
		brownMaterial.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var yellowMaterial 			= new DiffuseMaterial( 255, 255 , 0, 255);
		yellowMaterial.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var textureMaterial 		= new TextureMaterial("crate.png");
		textureMaterial.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var castleInteriorTex 		= new TextureDiffuse("castle_interior.jpg");
		castleInteriorTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var castleExteriorTex 		= new TextureDiffuse("castle_exterior.jpg");
		castleExteriorTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var castleDoorsTex 			= new TextureDiffuse("castle_towers_doors.jpg");
		castleDoorsTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var castleDungeonWallsTex	= new TextureDiffuse("bricks1.jpg");
		castleDungeonWallsTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var grassTex				= new TextureDiffuse("terrain1.jpg");
		grassTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var house0Tex 				= new TextureDiffuse("house0.jpg");
		house0Tex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var rocksTex 				= new TextureDiffuse("rocks.jpg");
		rocksTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var rock1Tex 				= new TextureDiffuse("rock1.jpg");
		rock1Tex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var stone0Tex 				= new TextureDiffuse("stone0.jpg");
		stone0Tex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var tree0LeafsTex 			= new TextureDiffuse("tree0_leafs.png");
		tree0LeafsTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var tree0TrunkTex 			= new TextureDiffuse("tree0_trunk.jpg");
		tree0TrunkTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var skyboxTex				= new TextureMaterial("skybox.jpg");
		skyboxTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var woodenDoorTex			= new TextureDiffuse("wooden_door.png");
		woodenDoorTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var woodenCrateTex			= new TextureDiffuse("wood_crate.png");
		woodenCrateTex.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var ghostMaterial 			= new DiffuseMaterial( 200, 200 , 200, 140);
		ghostMaterial.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var keyMaterial 			= new SpecularMaterial(200, 200, 0, 255);
		keyMaterial.setAmbientColor(ambientColor[0], ambientColor[1], ambientColor[2], ambientColor[3]);
		var lavaMaterial 			= new TextureMaterial("lava.png");
		lavaMaterial.setAmbientColor(100, 0, 0, 255);


	    console.log("Loaded texture");

	    InterfaceOverlay.init();

		////		CREATE OBJECTS 3D
		////__________________________________

		//player
		player  = new Player(unitCubeTexMesh, textureMaterial, rock1Mesh, rock1Tex);
		player.setPosition(0, 40, 40);
		player.enableCollisionWith(objects);
		player.addToScene();

		//lava
		var tmpObj = new Lava3D(lavaMesh, lavaMaterial);
		tmpObj.setPosition(0, -5, 0);
		tmpObj.setScale(10, 2, 10);
		tmpObj.addToScene();

		//rocks with gravity
		var tmpObj = new Object3D(stone0Mesh, stone0Tex);
		tmpObj.setPosition(-38, 150, 0);
		tmpObj.setScale(0.3, 0.35, 0.4);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new Object3D(stone0Mesh, stone0Tex);
		tmpObj.setPosition(-45, 150, 35);
		tmpObj.setScale(0.2, 0.2, 0.3);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		//destroyable wood boxes
		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-25, 50, 40);
		tmpObj.setScale(2, 2, 2);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-23, 80, 40);
		tmpObj.setScale(2, 3, 2);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-38, 105, 0);
		tmpObj.setScale(3, 3, 3);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-45, 100, 35);
		tmpObj.setScale(4, 3, 5);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		//castle
		var tmpObj = new Castle3D(castleExteriorMesh, castleExteriorTex, 
						castleInteriorMesh, castleInteriorTex, 
						castleTowersMesh, castleDoorsTex,
						castleDoorRMesh, castleDoorLMesh, keyHoleMesh, keyMesh, keyMaterial, 
						castleFloorMesh, grassTex,
						castleDungeonWallsMesh, castleDungeonWallsTex);
		tmpObj.setPosition(0, 0, 8);
		tmpObj.setScale(3, 3, 3);
		tmpObj.addToScene();

		//key
		var tmpObj = new Key3D(keyMesh, keyMaterial);
		tmpObj.setPosition(10, 2, 30);
		tmpObj.setScale(12, 12, 12);
		tmpObj.addToScene();

		//bridge with rocks
		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, rocksTex);
		tmpObj.setPosition(0, -15, 140);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, rocksTex);
		tmpObj.setPosition(10, -10, 130);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, rocksTex);
		tmpObj.setPosition(4, -4, 115);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, rocksTex);
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

		//door
		var tmpObj = new Door3D(doorMesh, woodenDoorTex);
		tmpObj.setPosition(3, 0, 190);
		tmpObj.addToScene();

		//ghost
		var tmpObj = new Ghost3D(ghostMesh, ghostMaterial);
		tmpObj.setPosition(-20, 5, 170);
		tmpObj.addToScene();
		var tmpObj = new Ghost3D(ghostMesh, ghostMaterial);
		tmpObj.setPosition(-10, 8, 230);
		tmpObj.addToScene();
		var tmpObj = new Ghost3D(ghostMesh, ghostMaterial);
		tmpObj.setPosition(25, 5, 109);
		tmpObj.addToScene();
		var tmpObj = new Ghost3D(ghostMesh, ghostMaterial);
		tmpObj.setPosition(50, 5, 250);
		tmpObj.addToScene();

		//trees
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(40, 0, 240);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(-10, 0, 200);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(5, 0, 300);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(-30, 0, 210);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(25, 0, 250);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(-50, 0, 200);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(50, 0, 280);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();

		//skybox
		var tmpObj = new Object3D(skyboxMesh, skyboxTex);
		tmpObj.addToScene();
		tmpObj.setScale(350, 350, 450);
		tmpObj.boundingBoxes[0].setScaleCorrection(0, 0, 0);

		
		///			CAMERA
		///_______________________

		lookAtCamera = new LookAtCamera();
		lookAtCamera.setLookRadius(15.0);
		lookAtCamera.setElevation(35.0);
		lookAtCamera.setLookPoint(0, 0, 0);

		firstPersonCamera = new FirstPersonCamera();
		firstPersonCamera.setElevation(0.0);
		firstPersonCamera.setPosition(0, 0, 0);
		firstPersonCamera.look();

		///			LIGHTS
		///___________________________

		//creates first light 

	    lights.push(new SpotLight('LA', 0, 20, 30, 0, -0.12, 1, 50, 0.8));
	    lights.push(new PointLight('LB', 0, 20, 30, 50, 0.7 ));
	    //lights.push(new DirectionalLight('LB', 0, 0.5, 1));
	    lights[0].setCone(20, 50);
	    lights[0].setColor(255, 255, 255);
	    lights[1].setColor(255, 100, 0);
	    Light.moveAllLights(viewMatrix);

	},

	render: function()
	{
		gl.clear(gl.COLOR_BUFFER_BIT);

		Canvas.makePerspectiveMatrix();

		player.handleInput();

		//physics and collisions
		for(var i=0; i<objects.length; i++)
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

		//render all the objects in the scene
		for(var i=0; i<objects.length; i++)
			objects[i].render();	

		InterfaceOverlay.render();
	
		if(player.health > 0.0)
			window.requestAnimationFrame(Scene.render);
	},
}
