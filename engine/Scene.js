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

		var gearMesh 			= Mesh.loadFromOBJFile("gear.obj");
		var castleTowerMesh		= Mesh.loadFromOBJFile("castle_tower.obj");
		var castleWallMesh		= Mesh.loadFromOBJFile("castle_wall.obj");
		var woodBox				= Mesh.loadFromOBJFile("wood_box.obj");
		var rock0Mesh			= Mesh.loadFromOBJFile("rock0.obj");
		var rock1Mesh			= Mesh.loadFromOBJFile("rock1.obj");
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
		var skyboxMesh			= Mesh.loadFromOBJFile("skybox.obj");
		var ghostMesh			= Mesh.loadFromOBJFile("ghost.obj");
		var bombMesh			= Mesh.loadFromOBJFile("bomb.obj");


		////		CREATE MATERIALS
		////__________________________________
		var greenSpecMaterial 	= new SpecularMaterial(0.0, 255, 10, 255);
	    var greenMaterial 		= new DiffuseMaterial(0.0, 255, 10, 255);
		var redMaterial 		= new DiffuseMaterial(255, 50, 50, 255);
		var lavaMaterial 		= new SimpleMaterial(255, 0, 0, 255);
		var brownMaterial 		= new DiffuseMaterial(255, 200, 50, 255);
		var yellowMaterial 		= new DiffuseMaterial( 255, 255 , 0, 255);
		var textureMaterial 	= new TextureMaterial("crate.png");
		var castleInteriorTex 	= new TextureDiffuse("castle_interior.jpg");
		var castleExteriorTex 	= new TextureDiffuse("castle_exterior.jpg");
		var castleDoorsTex 		= new TextureDiffuse("castle_towers_doors.jpg");
		var house0Tex 			= new TextureDiffuse("house0.jpg");
		var rocksTex 			= new TextureDiffuse("rocks.jpg");
		var rock1Tex 			= new TextureDiffuse("rock1.jpg");
		var tree0LeafsTex 		= new TextureDiffuse("tree0_leafs.png");
		var tree0TrunkTex 		= new TextureDiffuse("tree0_trunk.jpg");
		var skyboxTex			= new TextureMaterial("skybox.jpg");
		var woodenDoorTex		= new TextureDiffuse("wooden_door.png");
		var woodenCrateTex		= new TextureDiffuse("wood_crate.png");
		var ghostMaterial 		= new DiffuseMaterial( 200, 200 , 200, 140);
		var bombMaterial 		= new SpecularMaterial(100, 100, 100, 255);

	    console.log("Loaded texture");

	    InterfaceOverlay.init();

		////		CREATE OBJECTS 3D
		////__________________________________

		//player
		player  = new Player(unitCubeTexMesh, textureMaterial, rock1Mesh, rock1Tex);
		player.setPosition(0, 40, 170);
		player.enableCollisionWith(objects);
		player.addToScene();

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
		var tmpObj = new MobileObject3D(woodBox, woodenCrateTex);
		tmpObj.setPosition(-25, 50, 40);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new MobileObject3D(woodBox, woodenCrateTex);
		tmpObj.setPosition(-23, 80, 40);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		var tmpObj = new MobileObject3D(woodBox, woodenCrateTex);
		tmpObj.setPosition(-45, 100, 35);
		tmpObj.enableGravity(true);
		tmpObj.enablePhysics(true);
		tmpObj.enableCollisionWith(objects);
		tmpObj.addToScene();

		//castle
		var tmpObj = new Castle3D(castleExteriorMesh, castleExteriorTex, 
						castleInteriorMesh, castleInteriorTex, 
						castleTowersMesh, castleDoorsTex,
						castleDoorRMesh, castleDoorLMesh);
		tmpObj.setPosition(0, 0, 8);
		tmpObj.setScale(3, 3, 3);
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
		tmpObj.setScale(350, 350, 350);
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
