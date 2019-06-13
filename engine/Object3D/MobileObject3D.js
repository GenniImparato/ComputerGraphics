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
	collisionHandler(object, bboxNum)
	{
		object.penetrationZ = 0;
		object.colliding = true;

		//collision from y++
		if(object.boundingBoxes[0].maxY >= this.boundingBoxes[bboxNum].maxY	&& 	object.boundingBoxes[0].minY <= this.boundingBoxes[bboxNum].maxY	&& object.speedY<=0)
		{
			object.collisionY = true;
			object.collisionYUp = true;
			object.penetrationY = this.boundingBoxes[bboxNum].maxY - object.boundingBoxes[0].minY;
		}
		else
		{
			//collision from x++
			if(object.boundingBoxes[0].maxX >= this.boundingBoxes[bboxNum].maxX	&& 	object.boundingBoxes[0].minX <= this.boundingBoxes[bboxNum].maxX	&&	object.speedX<0) 
			{
				object.collisionX = true;
				this.movingX -= 5;
			}
			//collision from x--
			if(object.boundingBoxes[0].maxX >= this.boundingBoxes[bboxNum].minX	&& 	object.boundingBoxes[0].minX <= this.boundingBoxes[bboxNum].minX	&&	object.speedX>0)
			{
				object.collisionX = true;
				this.movingX += 5;
			}

			//collision from z++
			if(object.boundingBoxes[0].maxZ >= this.boundingBoxes[bboxNum].maxZ	&& 	object.boundingBoxes[0].minZ <= this.boundingBoxes[bboxNum].maxZ	&&	object.speedZ<0)
			{
				object.collisionZ = true;
				this.movingZ -= 5;
			}

			//collision from z--
			if(object.boundingBoxes[0].maxZ >= this.boundingBoxes[bboxNum].minZ	&& 	object.boundingBoxes[0].minZ <= this.boundingBoxes[bboxNum].minZ	&&	object.speedZ>0)
			{ 
				object.collisionZ = true;
				this.movingZ += 5;
			}
		}
		
			//collision from y--
			if(object.boundingBoxes[0].maxY >= this.boundingBoxes[bboxNum].minY	&& 	object.boundingBoxes[0].minY <= this.boundingBoxes[bboxNum].minY 	&& object.speedY>0) 
				object.collisionY = true;
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