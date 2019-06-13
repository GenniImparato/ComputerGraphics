class Lava3D extends Object3D
{
	constructor(mesh, material)
	{
		super(mesh, material);
	}

	collisionHandler(object)
	{
		object.colliding = true;
		object.collisionY = true;
		object.collisionYUp = true;

		if(object == player)
			object.damage(0.01);
	}
}