class Lava3D extends Box3D
{
	constructor(dimX, dimY, dimZ, material)
	{
		super(dimX, dimY, dimZ, material);
	}

	collisionHandler(object)
	{
		object.setPosition(0, 40, 200);
	}
}