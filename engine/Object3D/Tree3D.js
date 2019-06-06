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
	}

	setScale(scaleX, scaleY, scaleZ)
	{
		this.objects[0].setScale(scaleX, scaleY, scaleZ);
		this.objects[1].setScale(scaleX, scaleY, scaleZ);
	}
}