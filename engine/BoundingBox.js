class BoundingBox
{



	constructor(offX, offY, offZ, minX, maxX, minY, maxY, minZ, maxZ)
	{

			//position
		this.x = 0.0;
		this.y = 0.0;
		this.z = 0.0	;
		//offset
		this.offX = offX || 0.0;
		this.offY = offY || 0.0;
		this.offZ = offZ || 0.0;

		this.minX = minX || 0.0;	
		this.minY = minY || 0.0;
		this.minZ = minZ || 0.0;
		this.maxX = maxX || 0.0;
		this.maxY = maxY || 0.0;
		this.maxZ = maxZ || 0.0;
		//original dimensions	
		this.dx_ = (maxX-minX) != 0 ? (maxX - minX) : 1.0;
		this.dy_ = (maxY-minY) != 0 ? (maxY - minY) : 2.0;
		this.dz_ = (maxZ-minZ) != 0 ? (maxZ - minZ) : 1.0;
		//actual dimension (after scaling)
		this.dx = this.dx_;
		this.dy = this.dy_;
		this.dz = this.dz_;
		this.color = [1.0, 0.0, 0.0, 1.0];

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