class MobileObject3D extends Object3D
{
	//construct a box by given dimensions
	constructor(mesh, shader, material)
	{
		super(mesh, shader, material);

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
			this.setSpeed(this.movingX*0.05, this.speedY, 0);
		/*if(this.movingY != 0)
			this.move(0, this.movingY*0.05, 0);*/
		if(this.movingZ != 0)
			this.setSpeed(0, this.speedY, this.movingZ*0.05);

		if(!this.movingZ && !this.movingX)
			this.setSpeed(0, this.speedY, 0);

		this.movingX = 0;
		this.movingY = 0;
		this.movingZ = 0;
	}
}