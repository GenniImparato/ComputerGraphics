class Box3D extends Object3D
{
	//construct a box by given dimensions
	constructor(dimX, dimY, dimZ, material)
	{
		super(unitCubeTexMesh, material);
		this.setScale(dimX, dimY, dimZ);
	}
}

class TriggerBox3D extends Box3D
{
	//creates an invisible box objects that uses collisions to trigger actions
	constructor(dimX, dimY, dimZ, instance)
	{
		super(dimX, dimY, dimZ);
		this.boundingBoxes[0].nonCollidedColor = [0, 255, 0, 240];
		this.setVisible(false);
		this.avoidProjectiles = true;
		this.oneShot = false;

		this.triggered = false;
		this.instance = instance;
	}

	enableOneShot(bool)
	{
		this.oneShot = bool;
	}

	preUpdate()
	{
		if(!this.collided && this.triggered)
		{
			this.triggered = false;
			this.onUntrigger(this.instance);
		}

		this.collided = false;
	}

	//override default collision handler
	collisionHandler(object)
	{
		if(object != player)
			return;

		this.collided = true;
		object.colliding = true;

		if(!this.triggered)
		{
			this.triggered = true;
			this.onTrigger(this.instance);
			if(this.oneShot)
				this.removeFromScene();
		}
		
		this.onCollide(this.instance);
	}

	onTrigger(instance)
	{}

	onUntrigger(instance)
	{}

	onCollide(instance)
	{}

	isTriggered()
	{
		return this.triggered;
	}

	isColliding()
	{
		return this.colliding;
	}
}