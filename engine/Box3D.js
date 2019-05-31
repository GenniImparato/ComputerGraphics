class Box3D extends Object3D
{
	//construct a box by given dimensions
	constructor(dimX, dimY, dimZ, shader)
	{
		super(unitCubeMesh, shader);
		this.setScale(dimX, dimY, dimZ);
		this.boundingBox.setScaleCorrection(1, 1, 1);
	}
}


class TriggerBox3D extends Box3D
{
	//creates an invisible box objects that uses collisions to trigger actions
	constructor(dimX, dimY, dimZ, shader)
	{
		super(dimX, dimY, dimZ, shader);
		this.boundingBox.nonCollidedColor = [0, 1, 0, 1];
		this.setVisible(false);

		this.triggered = false;
		this.colliding = false;
	}

	update()
	{
		if(!this.colliding && this.triggered)
		{
			this.triggered = false;
			this.onUntrigger();
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
			this.onTrigger();
		}
		
		this.onCollide();
	}

	onTrigger()
	{
		console.log("triggered");
	}

	onUntrigger()
	{
		console.log("un-triggered");
	}

	onCollide()
	{}
}