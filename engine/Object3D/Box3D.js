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