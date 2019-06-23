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
var house1Mesh;
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
var ghostTongueMesh;
var bombMesh;
var keyHoleMesh;
var keyMesh;
var lavaMesh;
var lanternMesh;
var lanternInteriorMesh;
var finalDestMesh;
var windmillBaseMesh;
var windmillWheelMesh;
var flashlightMesh;

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
var house1Tex;
var rocksTex;
var rock1Tex;
var stone0Tex;
var tree0LeafsTex;
var tree0TrunkTex;
var skyboxTex;
var woodenDoorTex;
var woodenCrateTex;
var ghostMaterial;
var ghostDamagedMaterial;
var ghostTongueMaterial;
var keyMaterial;
var lavaMaterial;
var lanternTex;
var windmillTex;
var flashlightTex;
///_________________________________________________________


var objects = [];
var lights = []; // should have maximum 3 lights
var materials = [];

//collision group 1
var rocksCratesCollGroup = [];

var firstPersonCamera;
var lookAtCamera;
var currCamera;
var camAnimator;

var player;
var endCredits = true;

var lanterns = [];

var lava;


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
		house1Mesh				= Mesh.loadFromOBJFile("house1.obj");
		tree0TrunkMesh			= Mesh.loadFromOBJFile("tree0_trunk.obj");
		tree0LeafsMesh 			= Mesh.loadFromOBJFile("tree0_leafs.obj");
		doorMesh				= Mesh.loadFromOBJFile("wooden_door.obj");
		castleExteriorMesh		= Mesh.loadFromOBJFile("castle_exterior.obj", "castle_exterior_bBoxes.obj");
		castleInteriorMesh		= Mesh.loadFromOBJFile("castle_interior.obj", "castle_interior_bBoxes.obj");
		castleTowersMesh		= Mesh.loadFromOBJFile("castle_towers_doors.obj", "castle_towers_doors_bBoxes.obj");
		castleDoorRMesh			= Mesh.loadFromOBJFile("castle_doorR.obj");
		castleDoorLMesh			= Mesh.loadFromOBJFile("castle_doorL.obj");
		castleDungeonWallsMesh	= Mesh.loadFromOBJFile("castle_dungeon_walls.obj", "castle_dungeon_bBoxes.obj");
		castleFloorMesh			= Mesh.loadFromOBJFile("castle_floor.obj");
		floorMesh				= Mesh.loadFromOBJFile("floor.obj");
		skyboxMesh				= Mesh.loadFromOBJFile("skybox.obj");
		ghostMesh				= Mesh.loadFromOBJFile("ghost.obj");
		ghostTongueMesh			= Mesh.loadFromOBJFile("ghost_tongue.obj");
		bombMesh				= Mesh.loadFromOBJFile("bomb.obj");
		keyHoleMesh				= Mesh.loadFromOBJFile("keyhole.obj");
		keyMesh					= Mesh.loadFromOBJFile("key.obj");
		lavaMesh				= Mesh.loadFromOBJFile("lava.obj");
		lanternMesh				= Mesh.loadFromOBJFile("lantern.obj");
		lanternInteriorMesh		= Mesh.loadFromOBJFile("lantern_interior.obj");
		windmillBaseMesh		= Mesh.loadFromOBJFile("windmill_base.obj");
		windmillWheelMesh		= Mesh.loadFromOBJFile("windmill_wheel.obj");
		flashlightMesh			= Mesh.loadFromOBJFile("flashlight.obj");
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
		materials.push(terrain0Tex				= new TextureDiffuse("terrain0.jpg"));
		materials.push(terrain1Tex				= new TextureDiffuse("terrain1.jpg"));
		materials.push(house0Tex 				= new TextureDiffuse("house0.jpg"));
		materials.push(house1Tex 				= new TextureDiffuse("house1.png"));
		materials.push(rocksTex 				= new TextureDiffuse("rocks.jpg"));
		materials.push(rock1Tex 				= new TextureDiffuse("rock1.jpg"));
		materials.push(stone0Tex 				= new TextureDiffuse("stone0.jpg"));
		materials.push(tree0LeafsTex 			= new TextureDiffuse("tree0_leafs.png"));
		materials.push(tree0TrunkTex 			= new TextureDiffuse("tree0_trunk.jpg"));
		materials.push(skyboxTex				= new TextureMaterial("skybox.jpg"));
		materials.push(woodenDoorTex			= new TextureDiffuse("wooden_door.png"));
		materials.push(woodenCrateTex			= new TextureDiffuse("wood_crate.png"));
		materials.push(ghostMaterial 			= new TextureDiffuse("ghost.png"));
		materials.push(ghostDamagedMaterial 	= new TextureDiffuse("ghost_damaged.png"));
		materials.push(ghostTongueMaterial 		= new DiffuseMaterial( 200, 0 , 0, 140));
		materials.push(keyMaterial 				= new SpecularMaterial(200, 200, 0, 255));
		materials.push(lavaMaterial 			= new LiquidTexture("lava.png"));
		materials.push(lanternTex 				= new TextureDiffuse("lantern_violet.jpg"));
		materials.push(windmillTex 				= new TextureWithNormals("windmill.jpg", "windmill_normals.jpg"));
		windmillTex.disableSpecular();
		materials.push(flashlightTex 			= new TextureDiffuse("flashlight.jpg"));

		for(var i=0; i<materials.length; i++)
		{
			materials[i].setAmbientColor(12, 4, 25, 255);
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
		//remove from scene
		for(var i=0; i<objects.length; i++)
			if(objects[i] == object)
				objects.splice(i, 1);

		//remove from collision group
		for(var i=0; i<rocksCratesCollGroup.length; i++)
			if(rocksCratesCollGroup[i] == object)
				rocksCratesCollGroup.splice(i, 1);
			
	},

	switchLights_Extern()
	{	
		//delete old lights
		lights.splice(0, lights.length);

	    lights.push(new SpotLight('LA', 0, 20, 30, 0, -0.05, 1, 50, 0.8));	//player flashlight
	    lights.push(new PointLight('LB', 0, 10, 200, 35, 0.5 ));			//castle lantern light
	    lights.push(new PointLight('LC', 0, 10, 350, 30, 1.5 )); 			//yellow light
	    lights.push(new PointLight('LD', 0, 10, 350, 30, 1.5 )); 			//blue lantern light
	    lights[0].setCone(20, 50);
	    lights[0].setColor(255, 255, 255);
	    lights[1].setColor(255, 0, 0);
	    lights[2].setColor(255, 255, 0);
	    lights[3].setColor(0, 100, 255);

	    //castle lantern
	    var lantern = new Lantern3D(lanternMesh, lanternInteriorMesh, lanternTex, lights[1]);
	    lantern.setPosition(0, 12, 100);
	    var lanternPath = new BezierCurve();
	    lanternPath.addPoint(new KeyFrame(0, 0, 0));
	    lanternPath.addPoint(new KeyFrame(60, 40, -20));
	    lanternPath.addPoint(new KeyFrame(50, 30, -20));
	    lanternPath.addPoint(new KeyFrame(0, 5, -100));
	    lantern.animator.addAnimation(new Animation(lanternPath, 400));

	    lanternPath = new BezierCurve();
	    lanternPath.addPoint(new KeyFrame(0, 5, -100));
	    lanternPath.addPoint(new KeyFrame(-60, 30, -20));
	    lanternPath.addPoint(new KeyFrame(-35, 40, -20));
	    lanternPath.addPoint(new KeyFrame(0, 0, 0));
	    lantern.animator.addAnimation(new Animation(lanternPath, 400));
	    lantern.animator.play(false);
	    lantern.animator.instance = lantern.animator;
	    lantern.animator.onStop = function(inst){inst.play(false); inst.currTime=0;};
	    lantern.addToScene();

	    //blue lantern
	    lantern = new Lantern3D(lanternMesh, lanternInteriorMesh, lanternTex, lights[3]);
	    lantern.setPosition(-20, 10, 250);
	    lanternPath = new BezierCurve();
	    lanternPath.addPoint(new KeyFrame(0, 0, -15));
	    lanternPath.addPoint(new KeyFrame(+30, +20, 0));
	    lanternPath.addPoint(new KeyFrame(0, 0, +15));
	    lantern.animator.addAnimation(new Animation(lanternPath, 300));
	    lantern.animator.play(true);
	    lantern.addToScene();

	    lantern = new Lantern3D(lanternMesh, lanternInteriorMesh, lanternTex, lights[2]);
	    lanternPath = new BezierCurve();
	    lantern.setPosition(-20, 10, 320);
	    lanternPath.addPoint(new KeyFrame(0, -3, 0));
	    lanternPath.addPoint(new KeyFrame(0, +3, 0));
	    lantern.animator.addAnimation(new Animation(lanternPath, 100));
	    lantern.animator.play(true);
	    lantern.addToScene();

	    Light.moveAllLights(viewMatrix);

	    lava.material.setWaveHeight(10);
	    lava.setPosition(0, -10, 0);
	},

	switchLights_Dungeon()
	{
		//delete old lights
		lights.splice(0, lights.length);

	    lights.push(new SpotLight('LA', 0, 20, 30, 0, 0.05, 1, 50, 0.8));
	    lights.push(new PointLight('LB', -115, -8, -61, 30, 10));
	    lights.push(new PointLight('LC', -1, 6, -180, 30, 0.8 )); // lava light
	    lights[0].setCone(20, 50);
	    lights[0].setColor(255, 255, 255);
	    lights[1].setColor(100, -1, 255);
	    lights[2].setColor(255, 0, 0);
	    Light.moveAllLights(viewMatrix);

	    var lantern = new Lantern3D(lanternMesh, lanternInteriorMesh, lanternTex, lights[1]);
	    lantern.setPosition(-60, -1, -61);
	    lantern.addToScene();

	    lava.material.setWaveHeight(8);
	    lava.setPosition(0, -16, 0);
	},

	clearObjects()
	{
		for(var i=0; i<objects.length; i++)
			objects[i] = null;
		objects = [];

		//clear collision group
		for(var i=0; i<rocksCratesCollGroup.length; i++)
			rocksCratesCollGroup[i] = null;
		rocksCratesCollGroup = [];
	},

	createObjects()
	{
		////		CREATE OBJECTS 3D
		////__________________________________

		//player
		player  = new Player(unitCubeTexMesh, textureMaterial, rock1Mesh, rock1Tex);
		player.setPosition(25, 30, 360);
		//player.setPosition(-1, 5, -100);
		player.setRotation(0, -90, 0);
		player.hasKey = true;
		player.enableCollisionWith(objects);
		player.addToScene();

		//lava
		lava = new Lava3D(lavaMesh, lavaMaterial);
		lava.setPosition(0, -10, 0);
		lava.setScale(3, 2, 3);
		rocksCratesCollGroup.push(lava);
		lava.addToScene();

		//trigger for falling rocks/boxes
		var trigg = new GravityTrigger3D(35, 35, 35);
		trigg.setPosition(0, 10, 40);
		trigg.addToScene();

		//rocks with gravity
		var tmpObj = new Object3D(stone0Mesh, stone0Tex);
		tmpObj.setPosition(-38, 150, 0);
		tmpObj.setScale(0.3, 0.35, 0.4);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);
		rocksCratesCollGroup.push(tmpObj);

		var tmpObj = new Object3D(stone0Mesh, stone0Tex);
		tmpObj.setPosition(-45, 150, 35);
		tmpObj.setScale(0.2, 0.2, 0.3);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);
		rocksCratesCollGroup.push(tmpObj);

		//destroyable wood boxes
		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-25, 50, 40);
		tmpObj.setScale(2, 2, 2);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);
		rocksCratesCollGroup.push(tmpObj);

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-23, 80, 40);
		tmpObj.setScale(2, 3, 2);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);
		rocksCratesCollGroup.push(tmpObj);

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-38, 105, 0);
		tmpObj.setScale(3, 3, 3);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);
		rocksCratesCollGroup.push(tmpObj);

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-45, 100, 35);
		tmpObj.setScale(4, 3, 5);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);
		rocksCratesCollGroup.push(tmpObj);

		//second trigger for falling rocks/boxes
		var trigg = new GravityTrigger3D(15, 15, 15);
		trigg.setPosition(-70, 35, -15);
		trigg.addToScene();

		var tmpObj = new DestroyableObject3D(woodBox, woodenCrateTex, redMaterial);
		tmpObj.setPosition(-75, 100, -60);
		tmpObj.setScale(2, 2, 2);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);
		rocksCratesCollGroup.push(tmpObj);

		var tmpObj = new Object3D(stone0Mesh, stone0Tex);
		tmpObj.setPosition(-75, 150, -60);
		tmpObj.setScale(0.2, 0.2, 0.3);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();
		trigg.registerObject3D(tmpObj);
		rocksCratesCollGroup.push(tmpObj);

		//destroyable door (castle top)
		var tmpObj = new DestroyableObject3D(doorMesh, woodenDoorTex, redMaterial);
		tmpObj.setPosition(-0.9, 49, -43);
		tmpObj.setScale(2.5, 1.5, 2);
		tmpObj.addToScene();

		//mobile wood boxes in dungeon
		var tmpObj = new MobileObject3D(woodBox, woodenCrateTex);
		tmpObj.setPosition(-1, -2.5, -183);
		tmpObj.setScale(3, 4, 3);
		tmpObj.enablePhysics(true);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();

		//big rock to block path
		var tmpObj = new Object3D(stone0Mesh, stone0Tex);
		tmpObj.setPosition(-1, 100, -170);
		tmpObj.setScale(1.9, 0.9, 1.3);
		tmpObj.enablePhysics(true);
		tmpObj.enableGravity(true);
		tmpObj.enableCollisionWith(rocksCratesCollGroup);
		tmpObj.addToScene();
		rocksCratesCollGroup.push(tmpObj);


		//castle
		var tmpObj = new Castle3D(castleExteriorMesh, castleExteriorTex, 
						castleInteriorMesh, castleInteriorTex, 
						castleTowersMesh, castleDoorsTex,
						castleDoorRMesh, castleDoorLMesh, keyHoleMesh, keyMesh, keyMaterial, 
						castleFloorMesh, terrain1Tex, floorMesh, terrain0Tex,
						castleDungeonWallsMesh, castleDungeonWallsTex);
		tmpObj.setPosition(0, 0, 8);
		tmpObj.setScale(3, 3, 3);
		tmpObj.addToScene();

		//adds castle floor, exterior and dungeon, to rock/boxes collisions group
		rocksCratesCollGroup.push(tmpObj.objects[3]);
		rocksCratesCollGroup.push(tmpObj.objects[0]);
		rocksCratesCollGroup.push(tmpObj.objects[5]);

		//key
		var tmpObj = new Key3D(keyMesh, keyMaterial);
		tmpObj.setPosition(-0.9, 50, -59);
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

		//houses
		var tmpObj = new Object3D(house0Mesh, house0Tex);
		tmpObj.setPosition(40, 0, 200);
		tmpObj.setScale(0.5, 0.5, 0.5);
		tmpObj.addToScene();
		
		var tmpObj = new Object3D(house1Mesh, house1Tex);
		tmpObj.setPosition(-30, 0, 350);
		tmpObj.setScale(0.25, 0.25, 0.25);
		tmpObj.addToScene();

		//windmill
		var base = new Object3D(windmillBaseMesh, windmillTex);
		base.setPosition(-40, 0, 250);
		base.setScale(0.25, 0.25, 0.25);
		base.setRotation(0, -90, 0);
		base.addToScene();

		var wheel = new Object3D(windmillWheelMesh, windmillTex);
		wheel.setPosition(0.3, 174.1, 53.4);
		//wheel.setScale(0.25, 0.25, 0.25);
		wheel.setParent(base);
		wheel.addToScene();
		wheel.preUpdate = function(){wheel.rotate(0, 0, 1);};


		//ghost spawner
		var tmpObj = new GhostSpawner3D();
		tmpObj.addToScene();

		//trees
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(40, 0, 240);
		tmpObj.setScale(8, 8, 8);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(-10, 0, 200);
		tmpObj.setScale(7, 10, 4);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(5, 0, 300);
		tmpObj.setScale(10, 9, 10);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(-30, 0, 210);
		tmpObj.setScale(5, 5, 5);
		tmpObj.addToScene();
		var tmpObj = new Tree3D(tree0TrunkMesh, tree0TrunkTex, tree0LeafsMesh, tree0LeafsTex);
		tmpObj.setPosition(25, 0, 250);
		tmpObj.setScale(3, 4, 5);
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
		tmpObj.setRotation(0, 90, 0);
		tmpObj.objects[0].setScale(1.8, 1.5, 1);
		tmpObj.addToScene();

		var tmpObj = new Door3D(doorMesh, woodenDoorTex, true, false);
		tmpObj.setPosition(-129, -13, -91);
		tmpObj.setRotation(0, 90, 0);
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

		//second bridge with rocks
		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, rocksTex);
		tmpObj.setPosition(0, -15, -245);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, rocksTex);
		tmpObj.setPosition(-10, -10, -265);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, rocksTex);
		tmpObj.setPosition(-25, -5, -262);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(40, 100, 40, rock0Mesh, rocksTex);
		tmpObj.setPosition(-45, -2, -261);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
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

		currCamera = firstPersonCamera;

		//end credits animation
		camAnimator = new CameraAnimator(lookAtCamera);
		var cameraPath = new CameraBezierCurve();
		cameraPath.addPoint(new CameraKeyFrame(150, 0, 280, 10, 90, 5));
		cameraPath.addPoint(new CameraKeyFrame(140, 2, 275, 0, 0, 20));
		cameraPath.addPoint(new CameraKeyFrame(20, 80, 250, -20, 0, 35));
		cameraPath.addPoint(new CameraKeyFrame(-50, 20, 250, -80, 0, 30));
		cameraPath.addPoint(new CameraKeyFrame(-10, 0, 250, -150, 0, 20));
		cameraPath.addPoint(new CameraKeyFrame(0, 80, 240, -100, 20, 10));
		cameraPath.addPoint(new CameraKeyFrame(0, 70, 50, -20, 0, 20));
		cameraPath.addPoint(new CameraKeyFrame(0, 20, -20, 0, 10, 10));
		cameraPath.addPoint(new CameraKeyFrame(-50, 150, -30, 70, 0, 25));
		cameraPath.addPoint(new CameraKeyFrame(-100, 190, -150, 70, 60, 25));
		cameraPath.addPoint(new CameraKeyFrame(-250, 200, -30, 90, 80, 50));
		cameraPath.addPoint(new CameraKeyFrame(-380, 80, 100, 180, 110, 25));
		cameraPath.addPoint(new CameraKeyFrame(-220, 20, 120, 180, 60, 10));
		cameraPath.addPoint(new CameraKeyFrame(20, 35, 150, 180, -5, 15));
		cameraPath.addPoint(new CameraKeyFrame(100, 40, 250, 150, -15, 25));
		cameraPath.addPoint(new CameraKeyFrame(120, 20, 450, 100, 10, 15));
		cameraPath.addPoint(new CameraKeyFrame(130, 10, 350, 20, 85, 5));
		cameraPath.addPoint(new CameraKeyFrame(150, 0, 280, 10, 90, 5));
		camAnimator.addAnimation(new Animation(cameraPath, 4000));

		camAnimator.play(true);

		//lights
		Scene.switchLights_Extern();
	},


	start: function()
	{		
		//LOAD ASSETS
		Scene.loadMeshes();
		Scene.loadMaterials();
		InterfaceOverlay.init();

		//CREATE SCENE
		Scene.createObjects();
		
		window.requestAnimationFrame(Scene.waitsForTextures);
	},

	waitsForTextures()
	{
		//waits for all textures to load
		var waiting = true;
		for(var i=0; i<materials.length; i++)
		{
				waiting = waiting && materials[i].isLoaded();
		}
		waiting = !waiting;

		if(waiting)
			window.requestAnimationFrame(Scene.waitsForTextures);
		else	
			window.requestAnimationFrame(Scene.render);
	},

	render: function()
	{
		gl.clear(gl.COLOR_BUFFER_BIT);

		Canvas.makePerspectiveMatrix();

		if(player)
			player.handleInput();

		if(endCredits)
			player.setPosition(lookAtCamera.x, lookAtCamera.y, lookAtCamera.z);

		//physics and collisions
		for(var i=0; i<objects.length; i++)
		{
			objects[i].solveCollisions();		//only solve collisions with enabled objects
			objects[i].update();
		}

		if(endCredits)
		{
			lights[0].setColor(0, 0, 0, 0);
			camAnimator.update();
			lookAtCamera.look();
		}
		else if(player)	
		{
			if(cameraMode)
			{
				firstPersonCamera.setAngle(player.roty);
				firstPersonCamera.setPosition(player.x, player.y+5, player.z);
		    	firstPersonCamera.look();
		    	//flashlight rotation alligned to camera
		    	lights[0].setRotation(firstPersonCamera.angle, firstPersonCamera.elevation);
			}
			else
			{
				lookAtCamera.setAngle(player.roty);
				lookAtCamera.setLookPoint(player.x, player.y, player.z);
				lookAtCamera.look();
				//flashlight rotation alligned to camera
		    	lights[0].setRotation(lookAtCamera.angle, lookAtCamera.elevation);
			}

			//flashlight position alligned to player's flashlight
			lights[0].setPosition(player.x, player.y+4, player.z);		
		}

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

		//game over screen
		if(this.gameOver)
		{
			InterfaceOverlay.renderGameOver();

			//respawn
			if(Input.isMouseDown())
			{
				Scene.createObjects();
				this.gameOver = false;
			}
		}
		//player just died
		else if(player.health <= 0.0 && !endCredits)
		{
			Scene.clearObjects();
			player = null;
			this.gameOver = true;			
		}
		else if(!endCredits)
			InterfaceOverlay.render();
		else
			InterfaceOverlay.renderCredits();


		window.requestAnimationFrame(Scene.render);
	},
}
