class Lava3D extends Object3D
{
	constructor(mesh, material)
	{
		super(mesh, material);
		this.animTime = 0.0;

		this.material.setWaveHeight(10);
		this.material.setWavePeriod(6);
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
		this.animTime-=1.7;
		this.material.setUvTime(this.animTime);
	}
}