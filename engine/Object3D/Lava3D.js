class Lava3D extends Object3D
{
	constructor(mesh, material)
	{
		super(mesh, material);
		this.animTime = 0.0;
	}

	collisionHandler(object)
	{
		object.colliding = true;
		object.collisionY = true;
		object.collisionYUp = true;

		if(object == player)
			object.damage(0.01);
	}

	preUpdate()
	{
		this.animTime--;
		this.material.setUvTime(this.animTime);
		this.material.setWaveHeight(10);
		this.material.setWavePeriod(100);
	}
}