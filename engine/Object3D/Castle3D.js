class Castle3D extends GroupObject3D
{
	constructor(exteriorMesh, exteriorMaterial, 
		interiorMesh, interiorMaterial, 
		towersMesh, towersMaterial, 
		doorRMesh, doorLMesh, keyHoleMesh, keyMesh, keyHoleMaterial,
		floorMesh, floorMaterial,
		dungeonWallsMesh, dungeonWallsMaterial)
	{
		super();
		this.addObject3D(new Object3D(exteriorMesh, exteriorMaterial));
		this.addObject3D(new Object3D(interiorMesh, interiorMaterial));
		this.addObject3D(new Object3D(towersMesh, towersMaterial));
		this.addObject3D(new Object3D(floorMesh, floorMaterial));
		this.addObject3D(new Object3D(dungeonWallsMesh, dungeonWallsMaterial));
		this.objects[4].boundingBoxes[0].setScaleCorrection(0, 0, 0);

		//main doors
		var doorL = new Door3D(doorLMesh, towersMaterial, true, true);
		doorL.setPosition(-3.6, 0, 22.5);
		this.addObject3D(doorL);

		var doorR = new Door3D(doorRMesh, towersMaterial, true, false);
		doorR.setPosition(2.85, 0, 22.5);
		this.addObject3D(doorR);

		//doors to dungeon
		var doorL = new Door3D(doorLMesh, towersMaterial, false, true);
		doorL.setPosition(-2.1, 0, -9);
		doorL.setScale(0.56, 0.76, 0.5);
		this.addObject3D(doorL);

		var doorR = new DoorKey3D(doorRMesh, towersMaterial, keyHoleMesh, keyMesh, keyHoleMaterial, doorL, false);
		doorR.setPosition(1.5, 0, -9);
		doorR.setScale(0.56, 0.76, 0.5);
		this.addObject3D(doorR);
	}
}