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

class MobileBox3D extends Box3D
{
	//construct a box by given dimensions
	constructor(dimX, dimY, dimZ, shader)
	{
		super(dimX, dimY, dimZ, shader);

		this.movingX = 0;
		this.movingY = 0;
		this.movingZ = 0;
	}

	//override default collision handler
	collisionHandler(object)
	{
		object.penetrationZ = 0;

		//collision from x++
		if(object.boundingBox.maxX >= this.boundingBox.maxX	&& 	object.boundingBox.minX <= this.boundingBox.maxX	&&	object.speedX<0)
		{
			object.collisionX = true;
			this.movingX = -1;
		}
		//collision from x--
		if(object.boundingBox.maxX >= this.boundingBox.minX	&& 	object.boundingBox.minX <= this.boundingBox.minX	&&	object.speedX>0)
		{
			object.collisionX = true;
			this.movingX = +1;
		}

		//collision from z++
		if(object.boundingBox.maxZ >= this.boundingBox.maxZ	&& 	object.boundingBox.minZ <= this.boundingBox.maxZ	&&	object.speedZ<0)
		{
			object.collisionZ = true;
			this.movingZ = -1;
		}

		//collision from z--
		if(object.boundingBox.maxZ >= this.boundingBox.minZ	&& 	object.boundingBox.minZ <= this.boundingBox.minZ	&&	object.speedZ>0) 
		{
			object.collisionZ = true;
			this.movingZ = +1;
		}

		//collision from y++
		if(object.boundingBox.maxY >= this.boundingBox.maxY	&& 	object.boundingBox.minY <= this.boundingBox.maxY	&& object.speedY<0)
		{
			object.collisionY = true;
			object.penetrationY = this.boundingBox.maxY - object.boundingBox.minY;
			this.movingY = -1;
		}

		//collision from y--
		if(object.boundingBox.maxY >= this.boundingBox.minY	&& 	object.boundingBox.minY <= this.boundingBox.minY 	&& object.speedY>0) 
		{
			object.collisionY = true;
			this.movingY = +1;
		}
	}

	update()
	{
		if(this.movingX != 0)
			this.move(this.movingX*0.05, 0, 0);
		/*if(this.movingY != 0)
			this.move(0, this.movingY*0.05, 0);*/
		if(this.movingZ != 0)
			this.move(0, 0, this.movingZ*0.05);

		this.movingX = 0;
		this.movingY = 0;
		this.movingZ = 0;
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