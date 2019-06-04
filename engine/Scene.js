var camera;
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

		var plantMesh 		= Mesh.loadFromOBJFile("plant.obj");
		var houseMesh 		= Mesh.loadFromOBJFile("house.obj");
		var gearMesh 		= Mesh.loadFromOBJFile("gear.obj");
		var castleTowerMesh	= Mesh.loadFromOBJFile("castle_tower.obj");
		var castleWallMesh	= Mesh.loadFromOBJFile("castle_wall.obj");
		var woodBox			= Mesh.loadFromOBJFile("wood_box.obj");
		var rock0Mesh		= Mesh.loadFromOBJFile("rock0.obj");
		var house0Mesh 		= Mesh.loadFromOBJFile("house0.obj", "house0_bBox.obj");
		var house0MeshNB	= Mesh.loadFromOBJFile("house0.obj");

		var unitCubeTexMesh = Mesh.loadFromOBJFile("u_cube_tex.obj");


		////		CREATE MATERIALS
		////__________________________________
		var greenSpecMaterial = new SpecularMaterial(0.0, 255, 10, 255);
	    var greenMaterial = new DiffuseMaterial(0.0, 255, 10, 255);
		var redMaterial = new DiffuseMaterial(255, 50, 50, 255);
		var brownMaterial = new DiffuseMaterial(255, 200, 50, 255);
		var yellowMaterial = new DiffuseMaterial( 255, 255 , 0, 255);


		////		CREATE OBJECTS 3D
		////__________________________________

		//small plant
		var tmpObj = new Object3D(plantMesh, greenSpecMaterial);
		tmpObj.setPosition(5, 0, 5);
		tmpObj.boundingBoxes[0].setScaleCorrection(0.2, 1, 0.3);
		tmpObj.boundingBoxes[0].setPositionCorrection(-0.1, 0, -0.5);
		tmpObj.addToScene();

		//big plant
		var tmpObj = new Object3D(plantMesh, greenSpecMaterial);
		tmpObj.setPosition(5, 0, -5);
		tmpObj.setScale(2, 2, 2);
		tmpObj.boundingBoxes[0].setScaleCorrection(0.2, 1, 0.3);
		tmpObj.boundingBoxes[0].setPositionCorrection(-0.1, 0, -0.5);
		tmpObj.addToScene();

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
		var tmpObj = new Castle3D(castleTowerMesh, yellowMaterial, castleWallMesh, yellowMaterial, 12, 12, 12);
		tmpObj.setPosition(-10, 0, 10);
		tmpObj.insertWalls(5, "U");
		tmpObj.insertWalls(2, "L");
		tmpObj.insertWalls(3, "D");
		tmpObj.insertWalls(2, "L");
		tmpObj.insertWalls(1, "D");
		tmpObj.insertWalls(4, "R");
		tmpObj.addToScene();

		//bridge
		var tmpObj = new AutomaticBridge3D(30, 100, 30, rock0Mesh, brownMaterial);
		tmpObj.setPosition(0, -6, 140);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(30, 100, 30, rock0Mesh, brownMaterial);
		tmpObj.setPosition(10, -5, 130);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(30, 100, 30, rock0Mesh, brownMaterial);
		tmpObj.setPosition(4, -6, 120);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		var tmpObj = new AutomaticBridge3D(30, 100, 30, rock0Mesh, brownMaterial);
		tmpObj.setPosition(5, -5, 110);
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
		tmpObj.setRotation(0, 0, 0);
		tmpObj.boundingBoxes[0].setPositionCorrection(-1, 0, 0);
		tmpObj.addToScene();

		//player
		player  = new Player(unitCubeMesh, gearMesh);
		player.setPosition(0, 40, 200);
		player.setMaterial(yellowMaterial);
		player.enableCollisionWith(objects);

		
		///			CAMERA
		///_______________________

		camera = new LookAtCamera();
		camera.setLookRadius(15.0);
		camera.setElevation(35.0);
		camera.setLookPoint(0, 0, 0);
		camera.look();

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

		//set camera to follow player
		camera.setAngle(player.rotx);
		camera.setLookPoint(player.x, player.y, player.z);
		camera.look();
		light.setLightPosition(player.x, player.y+10, player.z);
 	    light.moveToCameraSpace(viewMatrix);

		//toggle showing of bounding boxes
		if(Input.isKeyClicked(Input.B_KEY))
			showBoundingBoxes = !showBoundingBoxes;


		for(var i=0; i<objectsCount; i++)
			objects[i].render();

		player.render();
		
	
		window.requestAnimationFrame(Scene.render);
	},
}
