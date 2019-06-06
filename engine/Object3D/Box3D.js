class Box3D extends Object3D
{
	//construct a box by given dimensions
	constructor(dimX, dimY, dimZ, material)
	{
		super(unitCubeMesh, material);
		this.setScale(dimX, dimY, dimZ);
		this.boundingBoxes[0].setScaleCorrection(1, 1, 1);
	}
}

class TriggerBox3D extends Box3D
{
	//creates an invisible box objects that uses collisions to trigger actions
	constructor(dimX, dimY, dimZ, instance)
	{
		super(dimX, dimY, dimZ);
		this.boundingBoxes[0].nonCollidedColor = [0, 255, 0, 255];
		this.setVisible(false);

		this.triggered = false;
		this.colliding = false;

		this.instance = instance;
	}

	preUpdate()
	{
		if(!this.colliding && this.triggered)
		{
			this.triggered = false;
			this.onUntrigger(this.instance);
		}

		this.colliding = false;
	}

	//override default collision handler
	//doensn't stop the collider
	collisionHandler(object)
	{
		this.colliding = true;

		if(!this.triggered)
		{
			this.triggered = true;
			this.onTrigger(this.instance);
		}
		
		this.onCollide(this.instance);
	}

	onTrigger(instance)
	{
		console.log("triggered");
	}

	onUntrigger(instance)
	{
		console.log("un-triggered");
	}

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