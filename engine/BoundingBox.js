class BoundingBox
{
	//position
	x = 0.0;
	y = 0.0;
	z = 0.0;

	//offset
	offX = 0.0;
	offY = 0.0;
	offZ = 0.0;

	//original dimensions
	dx_ = 1.0;
	dy_ = 2.0;
	dz_ = 1.0;

	//actual dimension (after scaling)
	dx = 0.0;
	dy = 0.0;
	dz = 0.0;

	//box coords
	minX = 0.0; 
	maxX = 0.0;
	minY = 0.0; 
	maxY = 0.0;
	minZ = 0.0;
	maxZ = 0.0;

	color = [1.0, 0.0, 0.0, 1.0];

	constructor(offX, offY, offZ, minX, maxX, minY, maxY, minZ, maxZ)
	{
		this.offX = offX;
		this.offY = offY;
		this.offZ = offZ;

		this.dx_ = maxX-minX;
		this.dy_ = maxY-minY;
		this.dz_ = maxZ-minZ;
		this.dx = this.dx_;
		this.dy = this.dy_;
		this.dz = this.dz_;

		this.minX = minX;
		this.minY = minY;
		this.minZ = minZ;
		this.maxX = maxX;
		this.maxY = maxY;
		this.maxZ = maxZ;

	}

	update(x, y, z, scale)
	{
		this.x = x + this.offX*scale;
		this.y = y + this.offY*scale;
		this.z = z + this.offZ*scale;

		//computes and scale bound coords
		this.dx = this.dx_*scale;
		this.dy = this.dy_*scale;
		this.dz = this.dz_*scale;

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