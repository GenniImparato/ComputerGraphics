class BoundingBox
{
	constructor(offX, offY, offZ, minX, maxX, minY, maxY, minZ, maxZ)
	{
		//position
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0;

		//offset
		this.offX = offX || 0.0;
		this.offY = offY || 0.0;
		this.offZ = offZ || 0.0;

		//bounding coords
		this.minX = minX || 0.0;	
		this.minY = minY || 0.0;
		this.minZ = minZ || 0.0;
		this.maxX = maxX || 0.0;
		this.maxY = maxY || 0.0;
		this.maxZ = maxZ || 0.0;

		//original dimensions	
		this.dx_ = (maxX-minX);
		this.dy_ = (maxY-minY);
		this.dz_ = (maxZ-minZ);

		//actual dimension (after scaling)
		this.dx = this.dx_;
		this.dy = this.dy_;
		this.dz = this.dz_;
		

		//scale and position corrections
		this.scaleCX 	= 1.0;
		this.scaleCY 	= 1.0;
		this.scaleCZ 	= 1.0;
		this.posCX 		= 0.0;
		this.posCY 		= 0.0;
		this.posCZ 		= 0.0;

		//colors
		this.collidedColor = [255, 0, 0, 100];			//red
		this.nonCollidedColor = [0, 0, 255, 100];		//blue
		this.material = new SimpleMaterial(0, 100, 0, 100);

	}

	update(x, y, z, scaleX, scaleY, scaleZ, rotY)
	{
		this.x = x + (this.offX + this.posCX) * scaleX;
		this.y = y + (this.offY + this.posCY) * scaleY;
		this.z = z + (this.offZ + this.posCZ) * scaleZ;

		//invert bb axis at 90 degrees
		rotY = Math.abs(rotY)%360;
		if((rotY >= 45 && rotY <= 135) || (rotY <= -45 && rotY >= -135))
		{
			//swap dx/dz
			this.dx = this.dz_ * scaleZ * this.scaleCZ;
			this.dy = this.dy_ * scaleY * this.scaleCY;
			this.dz = this.dx_ * scaleX * this.scaleCX;
		}
		else
		{
			//computes and scale bound coords
			this.dx = this.dx_ * scaleX * this.scaleCX;
			this.dy = this.dy_ * scaleY * this.scaleCY;
			this.dz = this.dz_ * scaleZ * this.scaleCZ;
		}

		this.minX = this.x - this.dx/2.0;
		this.minY = this.y - this.dy/2.0;
		this.minZ = this.z - this.dz/2.0;
		this.maxX = this.x + this.dx/2.0;
		this.maxY = this.y + this.dy/2.0;
		this.maxZ = this.z + this.dz/2.0;
	}

	setColor(color)
	{
		this.material.setDiffuseColor(color[0], color[1], color[2], color[3]);
	}

	setScaleCorrection(x, y, z)
	{
		this.scaleCX = x;
		this.scaleCY = y;
		this.scaleCZ = z;
	}

	setPositionCorrection(x, y, z)
	{
		this.posCX = x;
		this.posCY = y;
		this.posCZ = z;
	}

	render()
	{

		var bBoxMatrix = utils.MakeWorld_(this.x, this.y, this.z, 
											0, 0, 0, 
											this.dx, this.dy, this.dz);

		this.material.bindShader();
		
	    unitCubeMesh.render(bBoxMatrix, this.material.shader);
	}

	checkCollision(bBox)
	{
		return 	(this.minX <= bBox.maxX && this.maxX >= bBox.minX) &&
         		(this.minY <= bBox.maxY && this.maxY >= bBox.minY) &&
         		(this.minZ <= bBox.maxZ && this.maxZ >= bBox.minZ);
	}
}
