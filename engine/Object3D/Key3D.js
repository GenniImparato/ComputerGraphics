class Key3D extends Object3D
{
	constructor(mesh, material)
	{
		super(mesh, material);
		this.setRotation(0, 90, 0);
	}

	collisionHandler(object)
	{
		if(object == player)
		{
			object.hasKey = true;
			this.removeFromScene();
		}
	}

	preUpdate()
	{
		this.rotate(0, 0, 1);
	}
}