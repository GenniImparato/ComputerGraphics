var doorToDungeonL;
var doorToDungeonR;

class Castle3D extends GroupObject3D
{
	constructor(exteriorMesh, exteriorMaterial, 
		interiorMesh, interiorMaterial, 
		towersMesh, towersMaterial, 
		doorRMesh, doorLMesh, keyHoleMesh, keyMesh, keyHoleMaterial,
		floorMesh, floorMaterial, floor1Mesh, floor1Material,
		dungeonWallsMesh, dungeonWallsMaterial)
	{
		super();
		this.addObject3D(new Object3D(exteriorMesh, exteriorMaterial));
		this.addObject3D(new Object3D(interiorMesh, interiorMaterial));
		this.addObject3D(new Object3D(towersMesh, towersMaterial));
		this.addObject3D(new Object3D(floorMesh, floorMaterial));
		this.addObject3D(new Object3D(floor1Mesh, floor1Material));
		this.addObject3D(new Object3D(dungeonWallsMesh, dungeonWallsMaterial));

		//main doors
		var doorL = new Door3D(doorLMesh, towersMaterial, true, true);
		doorL.setPosition(-3.6, 0, 22.5);
		this.addObject3D(doorL);

		var doorR = new Door3D(doorRMesh, towersMaterial, true, false);
		doorR.setPosition(2.85, 0, 22.5);
		this.addObject3D(doorR);

		//doors to dungeon
		doorToDungeonL = new Door3D(doorLMesh, towersMaterial, false, true);
		doorToDungeonL.setPosition(-2.1, 0, -9);
		doorToDungeonL.setScale(0.56, 0.76, 0.5);
		this.addObject3D(doorToDungeonL);

		doorToDungeonR = new DoorKey3D(doorRMesh, towersMaterial, keyHoleMesh, keyMesh, keyHoleMaterial, doorToDungeonL, false);
		doorToDungeonR.setPosition(1.5, 0, -9);
		doorToDungeonR.setScale(0.56, 0.76, 0.5);
		this.addObject3D(doorToDungeonR);
	}
}