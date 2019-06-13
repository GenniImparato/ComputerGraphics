////	GLOBAL ASSETS  ///
////____________________________________________

///MESHES
var unitCubeMesh;
var unitCubeTexMesh;
var castleTowerMesh;
var castleWallMesh
var woodBox;
var rock0Mesh;
var rock1Mesh;
var stone0Mesh;
var house0Mesh;
var house0MeshNB;
var tree0TrunkMesh;
var tree0LeafsMesh;
var doorMesh;
var castleExteriorMesh;
var castleInteriorMesh;
var castleTowersMesh;
var castleDoorRMesh;
var castleDoorLMesh;
var castleDungeonWallsMesh;
var castleFloorMesh;
var skyboxMesh;
var ghostMesh;
var bombMesh;
var keyHoleMesh;
var keyMesh;
var lavaMesh;
var lanternMesh;
var finalDestMesh;

///MATERIALS
var greenSpecMaterial;
var greenMaterial;
var redMaterial;
var brownMaterial;
var yellowMaterial;
var textureMaterial;
var castleInteriorTex;
var castleExteriorTex;
var castleDoorsTex;
var castleDungeonWallsTex;
var grassTex;
var house0Tex;
var rocksTex;
var rock1Tex;
var stone0Tex;
var tree0LeafsTex;
var tree0TrunkTex;
var skyboxTex;
var woodenDoorTex;
var woodenCrateTex;
var ghostMaterial;
var keyMaterial;
var lavaMaterial;
var lanternTex;
///_________________________________________________________


var objects = [];
var lights = []; // should have maximum 3 lights
var materials = [];

var firstPersonCamera;
var lookAtCamera;
var camAnimator;

var player;
var endCredits = false;


var Scene = 
{
	loadMeshes()
	{
		unitCubeMesh 			= Mesh.loadFromOBJFile("u_cube.obj");
		unitCubeTexMesh 		= Mesh.loadFromOBJFile("u_cube_leather.obj");
		gearMesh 				= Mesh.loadFromOBJFile("gear.obj");
		castleTowerMesh			= Mesh.loadFromOBJFile("castle_tower.obj");
		castleWallMesh			= Mesh.loadFromOBJFile("castle_wall.obj");
		woodBox					= Mesh.loadFromOBJFile("wood_box.obj");
		rock0Mesh				= Mesh.loadFromOBJFile("rock0.obj");
		rock1Mesh				= Mesh.loadFromOBJFile("rock1.obj");
		stone0Mesh				= Mesh.loadFromOBJFile("stone0.obj");
		house0Mesh 				= Mesh.loadFromOBJFile("house0.obj", "house0_bBox.obj");
		house0MeshNB			= Mesh.loadFromOBJFile("house0.obj");
		tree0TrunkMesh			= Mesh.loadFromOBJFile("tree0_trunk.obj");
		tree0LeafsMesh 			= Mesh.loadFromOBJFile("tree0_leafs.obj");
		doorMesh				= Mesh.loadFromOBJFile("wooden_door.obj");
		castleExteriorMesh		= Mesh.loadFromOBJFile("castle_exterior.obj", "castle_exterior_bBoxes.obj");
		castleInteriorMesh		= Mesh.loadFromOBJFile("castle_interior.obj", "castle_interior_bBoxes.obj");
		castleTowersMesh		= Mesh.loadFromOBJFile("castle_towers_doors.obj", "castle_towers_doors_bBoxes.obj");
		castleDoorRMesh			= Mesh.loadFromOBJFile("castle_doorR.obj");
		castleDoorLMesh			= Mesh.loadFromOBJFile("castle_doorL.obj");
		castleDungeonWallsMesh	= Mesh.loadFromOBJFile("castle_dungeon_walls.obj", "castle_dungeon_bBoxes.obj");
		castleFloorMesh			= Mesh.loadFromOBJFile("castle_floor.obj", "castle_floor.obj");
		skyboxMesh				= Mesh.loadFromOBJFile("skybox.obj");
		ghostMesh				= Mesh.loadFromOBJFile("ghost.obj");
		bombMesh				= Mesh.loadFromOBJFile("bomb.obj");
		keyHoleMesh				= Mesh.loadFromOBJFile("keyhole.obj");
		keyMesh					= Mesh.loadFromOBJFile("key.obj");
		lavaMesh				= Mesh.loadFromOBJFile("lava.obj");
		lanternMesh				= Mesh.loadFromOBJFile("lantern.obj");
		finalDestMesh			= Mesh.loadFromOBJFile("final_dest.obj", "final_dest.obj");
	},

	loadMaterials()
	{
		materials.push(greenSpecMaterial 		= new SpecularMaterial(0.0, 255, 10, 255));
	    materials.push(greenMaterial 			= new DiffuseMaterial(0.0, 255, 10, 255));
		materials.push(redMaterial 				= new DiffuseMaterial(255, 50, 50, 255));
		materials.push(lavaMaterial 			= new SimpleMaterial(255, 0, 0, 255));
		materials.push(brownMaterial 			= new DiffuseMaterial(255, 200, 50, 255));
		materials.push(yellowMaterial 			= new DiffuseMaterial( 255, 255 , 0, 255));
		materials.push(textureMaterial 			= new TextureMaterial("crate.png"));
		materials.push(castleInteriorTex 		= new TextureDiffuse("castle_interior.jpg"));
		materials.push(castleExteriorTex 		= new TextureDiffuse("castle_exterior.jpg"));
		materials.push(castleDoorsTex 			= new TextureDiffuse("castle_towers_doors.jpg"));
		materials.push(castleDungeonWallsTex	= new TextureDiffuse("bricks1.jpg"));
		materials.push(grassTex					= new TextureDiffuse("terrain1.jpg"));
		materials.push(house0Tex 				= new TextureDiffuse("house0.jpg"));
		materials.push(rocksTex 				= new TextureDiffuse("rocks.jpg"));
		materials.push(rock1Tex 				= new TextureDiffuse("rock1.jpg"));
		materials.push(stone0Tex 				= new TextureDiffuse("stone0.jpg"));
		materials.push(tree0LeafsTex 			= new TextureDiffuse("tree0_leafs.png"));
		materials.push(tree0TrunkTex 			= new TextureDiffuse("tree0_trunk.jpg"));
		materials.push(skyboxTex				= new TextureMaterial("skybox.jpg"));
		materials.push(woodenDoorTex			= new TextureDiffuse("wooden_door.png"));
		materials.push(woodenCrateTex			= new TextureDiffuse("wood_crate.png"));
		materials.push(ghostMaterial 			= new DiffuseMaterial( 200, 200 , 200, 140));
		materials.push(keyMaterial 				= new SpecularMaterial(200, 200, 0, 255));
		materials.push(lavaMaterial 			= new TextureMaterial("lava.png"));
		materials.push(lanternTex 				= new TextureDiffuse("lantern_violet.jpg"));

		for(var i=0; i<materials.length; i++)
		{
			materials[i].setAmbientColor(5, 5, 10, 255);
		}
		lavaMaterial.setAmbientColor(200, 0, 0, 255);
	},

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

	switchLights_Extern()
	{
		//delete old lights
		lights.splice(0, lights.length);

	    lights.push(new SpotLight('LA', 0, 20, 30, 0, -0.12, 1, 50, 0.8));
	    lights.push(new PointLight('LB', 0, 10, 100, 35, 0.8 ));
	    lights.push(new PointLight('LC', 0, 10, 350, 50, 0.8 )); // Moon light
	    lights[0].setCone(20, 50);
	    lights[0].setColor(255, 255, 255);
	    lights[1].setColor(255, 60, 0);
	    lights[2].setColor(255, 60, 0);
	    Light.moveAllLights(viewMatrix);
	},

	switchLights_Dungeon()
	{
		//delete old lights
		lights.splice(0, lights.length);

	    lights.push(new SpotLight('LA', 0, 20, 30, 0, -0.12, 1, 50, 0.8));
	    lights.push(new PointLight('LB', -115, -8, -61, 30, 10));
	    lights.push(new PointLight('LC', -1, 6, -180, 30, 0.8 )); // lava light
	    lights[0].setCone(20, 50);
	    lights[0].setColor(255, 255, 255);
	    lights[1].setColor(100, -1, 255);
	    lights[2].setColor(255, 0, 0);
	    Light.moveAllLights(viewMatrix);

	    var lantern = new Lantern3D(lanternMesh, lanternTex, lights[1]);
	    lantern.setPosition(-60, -1, -61);
	    lantern.addToScene();
	},

	makeScene()
	{
		////		CREATE OBJECTS 3D
		////__________________________________

		//player
		player  = new Player(unitCubeTexMesh, textureMaterial, rock1Mesh, rock1Tex);
		player.setPosition(0, 20, 0);
		player.hasKey = true;
		player.enableCollisionWith(objects);
		player.addToScene();

		var tmpObj = new Object3D(finalDestMesh, castleDungeonWallsTex);
		tmpObj.addToScene();
		tmpObj.setPosition(-200, 0, -100);

		//lava
		var tmpObj = new Lava3D(lavaMesh, lavaMaterial);
		tmpObj.setPosition(0, -5, 0);
		tmpObj.setScale(3, 2, 3);
		tmpObj.addToScene();

		//trigger for falling rocks/boxes
		var trigg = new GravityTrigger3D(35, 35, 35);
		trigg.setPosition(0, 10, 40);
		trigg.addToScene();

		//rocks with gravity
		var tmpObj = new Object3D(stone0Mesh, stone0Tex);
		tmpObj.setPosition(-38, 150, 0);
		tmpObj.setScale(0.3, 0.35, 0.4);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);

		var tmpObj = new Object3D(stone0Mesh, stone0Tex);
		tmpObj.setPosition(-45, 150, 35);
		tmpObj.setScale(0.2, 0.2, 0.3);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);

		//destroyable wood boxes
		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-25, 50, 40);
		tmpObj.setScale(2, 2, 2);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-23, 80, 40);
		tmpObj.setScale(2, 3, 2);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-38, 105, 0);
		tmpObj.setScale(3, 3, 3);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-45, 100, 35);
		tmpObj.setScale(4, 3, 5);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);

		//second trigger for falling rocks/boxes
		var trigg = new GravityTrigger3D(15, 15, 15);
		trigg.setPosition(-70, 35, -15);
		trigg.addToScene();

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-75, 100, -60);
		tmpObj.setScale(2, 2, 2);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);

		var tmpObj = new Object3D(stone0Mesh, stone0Tex);
		tmpObj.setPosition(-75, 150, -60);
		tmpObj.setScale(0.2, 0.2, 0.3);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);


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
		tmpObj.setPosition(0, 55, -55);
		tmpObj.setScale(15, 15, 15);
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

		//trigger to switch lights
		var dungeonLightsTrigg = new TriggerBox3D(10, 20, 10);
		dungeonLightsTrigg.setPosition(0, -5, -40);
		dungeonLightsTrigg.oneShot = true;
		dungeonLightsTrigg.onTrigger = function(inst)
						{
							Scene.switchLights_Dungeon();
							doorToDungeonL.close();
							doorToDungeonR.close();
						};
		dungeonLightsTrigg.addToScene();

		//dungeon doors
		var tmpObj = new Door3D(doorMesh, woodenDoorTex, true, false);
		tmpObj.setPosition(-135, -13, -57);
		tmpObj.setRotation(90, 0, 0);
		tmpObj.objects[0].setScale(1.8, 1.5, 1);
		tmpObj.addToScene();

		var tmpObj = new Door3D(doorMesh, woodenDoorTex, true, false);
		tmpObj.setPosition(-129, -13, -91);
		tmpObj.setRotation(90, 0, 0);
		tmpObj.objects[0].setScale(1.6, 1.5, 1);
		tmpObj.addToScene();

		var tmpObj = new DoorKey3D(doorMesh, woodenDoorTex, keyHoleMesh, keyMesh, keyMaterial, null, false);
		tmpObj.setPosition(0.85, -12, -75);
		tmpObj.objects[0].setScale(1.6, 1.55, 1);
		tmpObj.addToScene();

		//second key
		var tmpObj = new Key3D(keyMesh, keyMaterial);
		tmpObj.setPosition(-109, -5, -94);
		tmpObj.setScale(15, 15, 15);
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

		//end credits animation
		camAnimator = new LinearCameraAnimator(lookAtCamera);
		camAnimator.addKeyFrame(30, 10, 250, 90, 10, 10);
		camAnimator.addKeyFrame(0, 2, 200, 0, 0, 10);
		camAnimator.addKeyFrame(0, 80, 100, 0, 40, 40);
		camAnimator.addKeyFrame(0, 80, 80, 180, 40, 50);
		camAnimator.addKeyFrame(0, 20, 0, 360, 30, 30);
		camAnimator.addKeyFrame(0, -5, -80, 0, 20, 5);
		camAnimator.playAnimation(500, true);

		//lights
		Scene.switchLights_Extern();
	},


	start: function()
	{
		////LOAD ASSETS
		Scene.loadMeshes();
		Scene.loadMaterials();

		//load interface
	    InterfaceOverlay.init();

	    Scene.makeScene();
	    window.requestAnimationFrame(Scene.render);
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

		if(endCredits)
		{
			camAnimator.update();
			lookAtCamera.look();
		}
		else if(cameraMode)
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

		if(!endCredits)
			InterfaceOverlay.render();
		else
			InterfaceOverlay.renderCredits();

		console.log(player.x);
		console.log(player.y);
		console.log(player.z);
	
		if(player.health > 0.0)
			window.requestAnimationFrame(Scene.render);
	},
}
