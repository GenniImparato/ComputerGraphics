class Castle3D extends GroupObject3D
{
	constructor(exteriorMesh, exteriorMaterial, 
		interiorMesh, interiorMaterial, 
		towersMesh, towersMaterial, 
		doorRMesh, doorLMesh,
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

		var doorL = new Door3D(doorLMesh, towersMaterial, true);
		doorL.setPosition(-3.6, 0, 22.5);
		this.addObject3D(doorL);

		var doorR = new Door3D(doorRMesh, towersMaterial, false);
		doorR.setPosition(2.85, 0, 22.5);
		this.addObject3D(doorR);
	}
}
