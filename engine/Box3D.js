class Box3D extends Object3D
{
	//construct a wall by given dimensions
	constructor(dimX, dimY, dimZ, shader)
	{
		super(unitCubeMesh, shader);
		this.setScale(dimX, dimY, dimZ);
		this.boundingBox.setScaleCorrection(1, 1, 1);
	}
}