class MobileObject3D extends Object3D
{
	//construct a box by given dimensions
	constructor(mesh, material)
	{
		super(mesh, material);

		this.movingX = 0;
		this.movingY = 0;
		this.movingZ = 0;
	}

	//override default collision handler
	collisionHandler(object)
	{
		object.penetrationZ = 0;

		//collision from x++
		if(object.boundingBoxes[0].maxX >= this.boundingBoxes[0].maxX	&& 	object.boundingBoxes[0].minX <= this.boundingBoxes[0].maxX	&&	object.speedX<0)
		{
			object.collisionX = true;
			this.movingX = -1;
		}
		//collision from x--
		if(object.boundingBoxes[0].maxX >= this.boundingBoxes[0].minX	&& 	object.boundingBoxes[0].minX <= this.boundingBoxes[0].minX	&&	object.speedX>0)
		{
			object.collisionX = true;
			this.movingX = +1;
		}

		//collision from z++
		if(object.boundingBoxes[0].maxZ >= this.boundingBoxes[0].maxZ	&& 	object.boundingBoxes[0].minZ <= this.boundingBoxes[0].maxZ	&&	object.speedZ<0)
		{
			object.collisionZ = true;
			this.movingZ = -1;
		}

		//collision from z--
		if(object.boundingBoxes[0].maxZ >= this.boundingBoxes[0].minZ	&& 	object.boundingBoxes[0].minZ <= this.boundingBoxes[0].minZ	&&	object.speedZ>0) 
		{
			object.collisionZ = true;
			this.movingZ = +1;
		}

		//collision from y++
		if(object.boundingBoxes[0].maxY >= this.boundingBoxes[0].maxY	&& 	object.boundingBoxes[0].minY <= this.boundingBoxes[0].maxY	&& object.speedY<0)
		{
			object.collisionY = true;
			object.penetrationY = this.boundingBoxes[0].maxY - object.boundingBoxes[0].minY;
			this.movingY = -1;
		}

		//collision from y--
		if(object.boundingBoxes[0].maxY >= this.boundingBoxes[0].minY	&& 	object.boundingBoxes[0].minY <= this.boundingBoxes[0].minY 	&& object.speedY>0) 
		{
			object.collisionY = true;
			this.movingY = +1;
		}
	}

	preUpdate()
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