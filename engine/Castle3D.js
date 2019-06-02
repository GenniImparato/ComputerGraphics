class Castle3D extends GroupObject3D
{
	constructor(towerMesh, wallMesh, scaleX, scaleY, scaleZ)
	{	
		super();
		
		this.currX = this.x;
		this.currY = this.y;
		this.currZ = this.z;

		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.scaleZ = scaleZ;

		this.towerMesh = towerMesh;
		this.wallMesh = wallMesh;
	}

	//creates count walls int the given direction
	//valid directions are "U", "D", "L", "R"
	insertWalls(count, direction)
	{
		if(direction == "U")
		{
			if(this.objectsCount > 0)
				this.currZ += this.objects[this.objectsCount-1].boundingBox.dz;
		}
		else if(direction == "D")
		{
			if(this.objectsCount > 0)
				this.currZ -= this.objects[this.objectsCount-1].boundingBox.dz;
		}
		else if(direction == "L")
		{
			if(this.objectsCount > 0)
				this.currX -= this.objects[this.objectsCount-1].boundingBox.dz;
		}
		else if(direction == "R")
		{
			if(this.objectsCount > 0)
				this.currX += this.objects[this.objectsCount-1].boundingBox.dz;
		}

		for(var i=0; i<count; i++)
		{
			var tmp = new Object3D(this.wallMesh);
			tmp.setScale(this.scaleX, this.scaleY, this.scaleZ);
			tmp.setPosition(this.currX, this.currY, this.currZ);
			this.addObject3D(tmp);

			//computes next position
			if(direction == "R")
			{
				if(i < count-1)
					this.currX += tmp.boundingBox.dz;
				else
					this.currX += tmp.boundingBox.dz/2;

				tmp.setRotation(90, 0, 0);
			}
			else if(direction == "L")
			{
				if(i < count-1)
					this.currX -= tmp.boundingBox.dz;
				else
					this.currX -= tmp.boundingBox.dz/2;

				tmp.setRotation(-90, 0, 0);
			}
			else if(direction == "U")
			{
				if(i < count-1)
					this.currZ += tmp.boundingBox.dz;
				else
					this.currZ += tmp.boundingBox.dz/2;
			}
			else if(direction == "D")
			{
				if(i < count-1)
					this.currZ -= tmp.boundingBox.dz;
				else
					this.currZ -= tmp.boundingBox.dz/2;
			}
		}

		this.insertTower();
	}

	insertTower()
	{
		var tmp = new Object3D(this.towerMesh);
		tmp.setScale(this.scaleX, this.scaleY, this.scaleZ);
		tmp.setPosition(this.currX, this.currY, this.currZ);
		this.addObject3D(tmp);
	}
}