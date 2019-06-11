class Lava3D extends Box3D
{
	constructor(dimX, dimY, dimZ, material)
	{
		super(dimX, dimY, dimZ, material);
	}

	collisionHandler(object)
	{
		object.colliding = true;
		object.collisionY = true;

		if(object == player)
			object.damage(0.01);
	}
}