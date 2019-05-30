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
		this.color = [1.0, 0.0, 0.0, 1.0];

		//scale and position corrections
		this.scaleCX 	= 1.0;
		this.scaleCY 	= 1.0;
		this.scaleCZ 	= 1.0;
		this.posCX 		= 0.0;
		this.posCY 		= 0.0;
		this.posCZ 		= 0.0;

	}

	update(x, y, z, scaleX, scaleY, scaleZ)
	{
		this.x = x + (this.offX + this.posCX) * scaleX;
		this.y = y + (this.offY + this.posCY) * scaleY;
		this.z = z + (this.offZ + this.posCZ) * scaleZ;

		//computes and scale bound coords
		this.dx = this.dx_ * scaleX * this.scaleCX;
		this.dy = this.dy_ * scaleY * this.scaleCY;
		this.dz = this.dz_ * scaleZ * this.scaleCZ;

		this.minX = this.x - this.dx/2.0;
		this.minY = this.y - this.dy/2.0;
		this.minZ = this.z - this.dz/2.0;
		this.maxX = this.x + this.dx/2.0;
		this.maxY = this.y + this.dy/2.0;
		this.maxZ = this.z + this.dz/2.0;
	}

	setColor(color)
	{
		this.color = color;
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

		boundingBoxShader.use();
		gl.uniform4f(boundingBoxShader.getColorLocation(), this.color[0], this.color[1], this.color[2], this.color[3]);
		unitCubeMesh.render(boundingBoxShader, bBoxMatrix);
	}

	checkCollision(bBox)
	{
		return 	(this.minX <= bBox.maxX && this.maxX >= bBox.minX) &&
         		(this.minY <= bBox.maxY && this.maxY >= bBox.minY) &&
         		(this.minZ <= bBox.maxZ && this.maxZ >= bBox.minZ);
	}
}