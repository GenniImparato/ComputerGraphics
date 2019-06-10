class ProjectileFragment3D extends Object3D
{
	constructor(mesh, material, duration)
	{
		super(mesh, material);
		this.enablePhysics(true);
		this.enableGravity(true);

		this.currTime = 0;
		this.duration = duration;
	}

	//override
	collisionHandler(object, bboxNum)
	{

	}

	//override
	preUpdate()
	{
		this.currTime++;
		//removes fragment after duration
		if(this.currTime>this.duration)
			this.removeFromScene();
	}
}

class Projectile3D extends Object3D
{
	constructor(mesh, material, fragmentsCount)
	{
		super(mesh, material);
		this.enablePhysics(true);
		this.enableGravity(true);

		this.fragmentsCount = fragmentsCount;
	}

	//override
	solveCollision(object, bBoxNum)
	{
		object.collisionHandler(this, bBoxNum);

		if(this.colliding && !object.avoidProjectiles && object!= player)
		{
			//creates fragments
			for(var i=0; i<this.fragmentsCount; i++)
			{
				var frag = new ProjectileFragment3D(this.mesh, this.material, 50);
				frag.setPosition(this.x, this.y+1, this.z);
				frag.setScale(1, 1, 1);

				//random speed direction
				var angle = Math.random()*360;
				var sy = Math.random()-0.5;
				frag.setSpeed(0.1 * Math.sin(utils.degToRad(angle)), 
							sy, 
							0.1 * Math.cos(utils.degToRad(angle)));
				frag.enableCollisionWith(objects);
				Scene.addObject3D_(frag);
			}

			object.damage(0.3);

			//removes projectile
			this.removeFromScene();	
		}
	}

	//override
	collisionHandler(object, bboxNum)
	{}
}