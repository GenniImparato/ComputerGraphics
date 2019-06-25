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
var treasureMesh;

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
var treasureMaterial;
///_________________________________________________________


var objects = [];
var lights = []; // should have maximum 3 lights
var lanterns = [];
var materials = [];

//collision group 1
var rocksCratesCollGroup = [];

var firstPersonCamera;
var lookAtCamera;
var currCamera;
var camAnimator;

var player;
var endCredits = false;

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
		treasureMesh 			= Mesh.loadFromOBJFile("treasure_chest.obj");
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
		materials.push(windmillTex 				= new TextureDiffuse("windmill.jpg"));
		materials.push(flashlightTex 			= new TextureDiffuse("flashlight.jpg"));
		materials.push(treasureMaterial         = new SpecularMaterial(255, 255, 0, 255));
		treasureMaterial.setSpecularShine(50);

		for(var i=0; i<materials.length; i++)
		{
			materials[i].setMaterialAmbient(10, 10, 10, 255);
			materials[i].setAmbientLowColor(150, 10, 10, 255);
			materials[i].setAmbientHighColor(0, 0, 77, 255);
			materials[i].setAmbientDirection(0, 1, 0);
		}
		lavaMaterial.setAmbientLowColor(200, 0, 0, 255);	
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

	clearLanterns()
	{
		for(var i=0; i<lanterns.length; i++)
			lanterns[i] = null;
		lanterns = [];
	},


	switchLights_Extern(createLantern)
	{	
		//delete old lights
		this.clearLanterns();
		lights.splice(0, lights.length);
		player.hasKey = false;

	    lights.push(new SpotLight('LA', 0, 20, 30, 0, -0.05, 1, 50, 0.8));	//player flashlight
	    lights.push(new PointLight('LB', 0, 10, 200, 35, 0.5 ));			//castle lantern light
	    lights.push(new PointLight('LC', 0, 10, 350, 30, 1.5 )); 			//yellow light
	    lights.push(new PointLight('LD', 0, 10, 350, 30, 1.5 )); 			//blue lantern light
	    lights[0].setCone(20, 50);
	    lights[0].setColor(255, 255, 255);
	    lights[1].setColor(30, 180, 0);
	    lights[2].setColor(255, 255, 0);
	    lights[3].setColor(0, 100, 255);

	    if(createLantern)  {
	    //castle lantern
	    lanterns.push( new Lantern3D(lanternMesh, lanternInteriorMesh, lanternTex, lights[1]));
	    lanterns[0].setPosition(0, 12, 100);
	    var lanternPath = new BezierCurve();
	    lanternPath.addPoint(new KeyFrame(0, 0, 0));
	    lanternPath.addPoint(new KeyFrame(60, 40, -20));
	    lanternPath.addPoint(new KeyFrame(50, 30, -20));
	    lanternPath.addPoint(new KeyFrame(0, 5, -100));
	    lanterns[0].animator.addAnimation(new Animation(lanternPath, 400));

	    lanternPath = new BezierCurve();
	    lanternPath.addPoint(new KeyFrame(0, 5, -100));
	    lanternPath.addPoint(new KeyFrame(-60, 30, -20));
	    lanternPath.addPoint(new KeyFrame(-35, 40, -20));
	    lanternPath.addPoint(new KeyFrame(0, 0, 0));
	    lanterns[0].animator.addAnimation(new Animation(lanternPath, 400));
	    lanterns[0].animator.play(false);
	    lanterns[0].animator.instance = lanterns[0].animator;
	    lanterns[0].animator.onStop = function(inst){inst.play(false); inst.currTime=0;};
	    lanterns[0].addToScene();

	    //blue lantern
	    lanterns.push(new Lantern3D(lanternMesh, lanternInteriorMesh, lanternTex, lights[3]));
	    lanterns[1].setPosition(-20, 10, 250);
	    lanternPath = new BezierCurve();
	    lanternPath.addPoint(new KeyFrame(0, 0, -15));
	    lanternPath.addPoint(new KeyFrame(+30, +20, 0));
	    lanternPath.addPoint(new KeyFrame(0, 0, +15));
	    lanterns[1].animator.addAnimation(new Animation(lanternPath, 300));
	    lanterns[1].animator.play(true);
	    lanterns[1].addToScene();

	    lanterns.push(new Lantern3D(lanternMesh, lanternInteriorMesh, lanternTex, lights[2]));
	    lanternPath = new BezierCurve();
	    lanterns[2].setPosition(-20, 10, 320);
	    lanternPath.addPoint(new KeyFrame(0, -3, 0));
	    lanternPath.addPoint(new KeyFrame(0, +3, 0));
	    lanterns[2].animator.addAnimation(new Animation(lanternPath, 100));
	    lanterns[2].animator.play(true);
	    lanterns[2].addToScene();
		}

	    Light.moveAllLights(viewMatrix);

	    lava.material.setWaveHeight(10);
	    lava.setPosition(0, -10, 0);
	},

	switchLights_Dungeon(createLantern)
	{
		//delete old lights
		this.clearLanterns();
		lights.splice(0, lights.length);
		player.hasKey = false;

	    lights.push(new SpotLight('LA', 0, 20, 30, 0, 0.05, 1, 50, 0.8));
	    lights.push(new PointLight('LB', -115, -8, -61, 30, 10));
	    lights.push(new PointLight('LC', -1, 6, -180, 30, 0.8 )); // lava light
	    lights[0].setCone(20, 50);
	    lights[0].setColor(255, 255, 255);
	    lights[1].setColor(100, -1, 255);
	    lights[2].setColor(255, 0, 0);
	    Light.moveAllLights(viewMatrix);

	    if(createLantern) {
	    lanterns.push(new Lantern3D(lanternMesh, lanternInteriorMesh, lanternTex, lights[1]));
	    lanterns[0].setPosition(-10, -5, -30);
	    lanternPath = new BezierCurve();
	    lanternPath.addPoint(new KeyFrame(-10, -1, -30));
	    lanternPath.addPoint(new KeyFrame(-80, -1, -30));
	    lanterns[0].animator.addAnimation(new Animation(lanternPath, 300));
	    lanterns[0].animator.play(true);
	    lanterns[0].addToScene();
		}
	    lava.material.setWaveHeight(6);
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
		player.hasKey = false;
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
		var tmpObj = new Object3D(treasureMesh, treasureMaterial);
		tmpObj.setPosition(-1, 25, -170);
		tmpObj.setScale(1, 1, 1);
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
							Scene.switchLights_Dungeon(true);
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

		var endGameTrigger = new TriggerBox3D(5, 5, 5);
		endGameTrigger.setPosition(-1, 25, -170);
		endGameTrigger.oneShot = true;
		endGameTrigger.onTrigger = function(inst)
						{
							Scene.switchLights_Extern(false);
							var dungeonLightsTrigg = new TriggerBox3D(10, 20, 10);
							dungeonLightsTrigg.setPosition(0, -5, -40);
							dungeonLightsTrigg.oneShot = true;
							dungeonLightsTrigg.onTrigger = function(inst)
							{
							Scene.switchLights_Dungeon(false);
							doorToDungeonL.close();
							doorToDungeonR.close();
							};
							dungeonLightsTrigg.addToScene();
							endCredits = true;
						};
		endGameTrigger.addToScene();

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
	        // Pass through windmill wheel
		cameraPath.addPoint(new CameraKeyFrame(100, 0, 250, 0, 90, 0));
		cameraPath.addPoint(new CameraKeyFrame(50, 80, 300, 90, 0, 10));
		cameraPath.addPoint(new CameraKeyFrame(-100, 50, 200, 110, 0, 20));
		camAnimator.addAnimation(new Animation(cameraPath, 500));
	        cameraPath = new CameraBezierCurve();
	        // // look backward
		cameraPath.addPoint(new CameraKeyFrame(-100, 50, 200, 110, 0, 20));
		cameraPath.addPoint(new CameraKeyFrame(-60, 40, 190, 180, 0, 20));
		cameraPath.addPoint(new CameraKeyFrame(0, 15, 150, 180, 0, 20));
		camAnimator.addAnimation(new Animation(cameraPath, 300));
	        cameraPath = new CameraBezierCurve();
	        // enter the castle
		cameraPath.addPoint(new CameraKeyFrame(0, 15, 150, 180, 0, 20));
		cameraPath.addPoint(new CameraKeyFrame(0, 5, 80, 0, 0, 0));

		camAnimator.addAnimation(new Animation(cameraPath, 250));
	        cameraPath = new CameraBezierCurve();

	        // look into castle garden
		cameraPath.addPoint(new CameraKeyFrame(0, 5, 80, 0, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, 5, 40, -90, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, 5, -10, 0, 0, 0));
		camAnimator.addAnimation(new Animation(cameraPath, 500));

	        cameraPath = new CameraBezierCurve();
	        // // enter the dungeon
		cameraPath.addPoint(new CameraKeyFrame(0, 5, -10, 0, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, 6, -30, -10, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, -13, -50, -90, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, -10, -70, 0, 0, 0));
	    camAnimator.addAnimation(new Animation(cameraPath, 500));
	    
	     //pass through the door
	        cameraPath = new CameraBezierCurve();
		cameraPath.addPoint(new CameraKeyFrame(0, -10, -70, 0, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, -5, -130, 0, 0, 0));
		camAnimator.addAnimation(new Animation(cameraPath, 200));

	     // traverse the tunnel
	        cameraPath = new CameraBezierCurve();
		cameraPath.addPoint(new CameraKeyFrame(0, -5, -130, 0, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(-25, 7, -160, 120, 50, 0));

		cameraPath.addPoint(new CameraKeyFrame(-25, 15, -200, 150, 50, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, 0, -250, 0, 0, 0));
		camAnimator.addAnimation(new Animation(cameraPath, 800));
	     // exit the tunnel
	        cameraPath = new CameraBezierCurve();
		cameraPath.addPoint(new CameraKeyFrame(0, 0, -250, 0, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, 0, -300, -100, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, 50 , -280, -180, 0, 0));
		camAnimator.addAnimation(new Animation(cameraPath, 500));

	    // up to the sky
	        cameraPath = new CameraBezierCurve();
		cameraPath.addPoint(new CameraKeyFrame(0, 50 , -280, -180, 0, 0));
		cameraPath.addPoint(new CameraKeyFrame(0, 150 , -280, -180, 20, 10));
		camAnimator.addAnimation(new Animation(cameraPath, 500));

		camAnimator.play(true);

		//lights
		Scene.switchLights_Extern(true);
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
