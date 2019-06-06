class Castle3D extends GroupObject3D
{
	constructor(exteriorMesh, exteriorMaterial, interiorMesh, interiorMaterial, towersMesh, towersMaterial)
	{
		super();
		this.addObject3D(new Object3D(exteriorMesh, exteriorMaterial));
		this.addObject3D(new Object3D(interiorMesh, interiorMaterial));
		this.addObject3D(new Object3D(towersMesh, towersMaterial));
	}
}

/*class Castle3D extends GroupObject3D
{
	constructor(towerMesh, towerMaterial, wallMesh, wallMaterial, scaleX, scaleY, scaleZ)
	{	
		super();
		
		this.currX = this.x;
		this.currY = this.y;
		this.currZ = this.z;

		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.scaleZ = scaleZ;

		this.towerMesh = towerMesh;
		this.towerMaterial = towerMaterial;
		this.wallMesh = wallMesh;
		this.wallMaterial = wallMaterial;

	}

	//creates count walls int the given direction
	//valid directions are "U", "D", "L", "R"
	insertWalls(count, direction)
	{
		if(direction == "U")
		{
			if(this.objectsCount > 0)
				this.currZ += this.objects[this.objectsCount-1].boundingBoxes[0].dz;
		}
		else if(direction == "D")
		{
			if(this.objectsCount > 0)
				this.currZ -= this.objects[this.objectsCount-1].boundingBoxes[0].dz;
		}
		else if(direction == "L")
		{
			if(this.objectsCount > 0)
				this.currX -= this.objects[this.objectsCount-1].boundingBoxes[0].dz;
		}
		else if(direction == "R")
		{
			if(this.objectsCount > 0)
				this.currX += this.objects[this.objectsCount-1].boundingBoxes[0].dz;
		}

		for(var i=0; i<count; i++)
		{
			var tmp = new Object3D(this.wallMesh, this.wallMaterial);
			tmp.setScale(this.scaleX, this.scaleY, this.scaleZ);
			tmp.setPosition(this.currX, this.currY, this.currZ);
			this.addObject3D(tmp);

			//computes next position
			if(direction == "R")
			{
				if(i < count-1)
					this.currX += tmp.boundingBoxes[0].dz;
				else
					this.currX += tmp.boundingBoxes[0].dz/2;

				tmp.setRotation(90, 0, 0);
			}
			else if(direction == "L")
			{
				if(i < count-1)
					this.currX -= tmp.boundingBoxes[0].dz;
				else
					this.currX -= tmp.boundingBoxes[0].dz/2;

				tmp.setRotation(-90, 0, 0);
			}
			else if(direction == "U")
			{
				if(i < count-1)
					this.currZ += tmp.boundingBoxes[0].dz;
				else
					this.currZ += tmp.boundingBoxes[0].dz/2;
			}
			else if(direction == "D")
			{
				if(i < count-1)
					this.currZ -= tmp.boundingBoxes[0].dz;
				else
					this.currZ -= tmp.boundingBoxes[0].dz/2;
			}
		}

		this.insertTower();
	}

	insertTower()
	{
		var tmp = new Object3D(this.towerMesh, this.towerMaterial);
		tmp.setScale(this.scaleX, this.scaleY, this.scaleZ);
		tmp.setPosition(this.currX, this.currY, this.currZ);
		this.addObject3D(tmp);
	}
}*/