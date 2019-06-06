class Castle3D extends GroupObject3D
{
	constructor(exteriorMesh, exteriorMaterial, 
		interiorMesh, interiorMaterial, 
		towersMesh, towersMaterial, 
		doorRMesh, doorLMesh, doorMaterial)
	{
		super();
		this.addObject3D(new Object3D(exteriorMesh, exteriorMaterial));
		this.addObject3D(new Object3D(interiorMesh, interiorMaterial));
		this.addObject3D(new Object3D(towersMesh, towersMaterial));

		var doorL = new Door3D(doorLMesh, doorMaterial, true);
		doorL.setPosition(-3.6, 0, 22.5);
		this.addObject3D(doorL);

		var doorR = new Door3D(doorRMesh, doorMaterial, false);
		doorR.setPosition(2.85, 0, 22.5);
		this.addObject3D(doorR);
	}
}
