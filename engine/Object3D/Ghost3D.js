const ghostMoveSpeed = 0.12;

class Ghost3D_ extends Object3D
{
	constructor(mesh, material)
	{
		super(mesh, material);	

		this.damagedMaterial = new DiffuseMaterial(255, 0, 0, 200);
		this.standardMaterial = material;
		this.damagedTime = 0;
	}

	collisionHandler(object)
	{
		object.colliding = true;

		if(object == player)
		{
			object.damage(0.4);
			this.removeFromScene();
		}
	}

	preUpdate()
	{
		this.damagedTime++;

		if(this.damagedTime > 15)
		{
			this.setMaterial(this.standardMaterial);
		}
	}

	damage(val)
	{
		this.setMaterial(this.damagedMaterial);
		this.damagedTime = 0;

		this.health -= val;
		if(this.health < 0)
			this.health = 0;
	}
}


class Ghost3D extends GroupObject3D
{
	constructor(mesh, material)
	{
		super();

		this.enablePhysics(true);
		this.enableGravity(false);

		var mainObj = new Ghost3D_(mesh, material);
		this.addObject3D(mainObj);

		this.animator = new LinearAnimator(mainObj);
		this.animator.enablePositionAnimation(true);
		this.animator.enableRotationAnimation(false);
		this.animator.enableScaleAnimation(true);

		this.animator.addKeyFrame(0, -2.5, 0, 0, 0, 0, 0.8, 0.8, 0.8);
		this.animator.addKeyFrame(0, +2.5, 0, 0, 0, 0, 1.2, 1.2, 1.2);
		this.animator.playAnimation(150, true);
	}

	preUpdate()
	{
		//distance from player
		var distX = player.x - this.x;
		var distY = player.y - this.y;
		var distZ = player.z - this.z;

		//normalize
		var dist = Math.sqrt(distX*distX + distZ*distZ + distY*distY);	
		distX = distX/dist;
		distZ = distZ/dist;
		distY = distY/dist;

		if(dist<100 && dist>15)
		{
			//follow player
			this.setSpeed(distX*ghostMoveSpeed, distY*ghostMoveSpeed, distZ*ghostMoveSpeed);
			this.setRotation((180/Math.PI* Math.atan2(distZ, distX))-90, 0, 0);
		}
		else
			this.setSpeed(0, 0, 0);


		this.animator.update();

		if(this.objects[0].health == 0)
			this.removeFromScene();
	}

}