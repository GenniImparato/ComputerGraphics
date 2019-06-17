class Tree3D extends GroupObject3D
{
	constructor(trunkMesh, trunkMaterial, leafsMesh, leafsMaterial)
	{ 
		super();

		//trunk
		this.addObject3D(new Object3D(trunkMesh, trunkMaterial));

		//leafs
		var leafs = new Object3D(leafsMesh, leafsMaterial);
		//disble leafs bounding box
		leafs.boundingBoxes[0].setScaleCorrection(0, 0, 0);
		this.addObject3D(leafs);

		var leafs = new Object3D(leafsMesh, leafsMaterial);
		//disble leafs bounding box
		leafs.boundingBoxes[0].setScaleCorrection(0, 0, 0);
		leafs.setRotation(0, 35, 0);
		this.addObject3D(leafs);

		var leafs = new Object3D(leafsMesh, leafsMaterial);
		//disble leafs bounding box
		leafs.boundingBoxes[0].setScaleCorrection(0, 0, 0);
		leafs.setRotation(0, 140, 0);
		this.addObject3D(leafs);
	}
}