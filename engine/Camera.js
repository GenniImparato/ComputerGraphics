class LookAtCamera
{
	lookRadius	= 10.0;
	angle 		= 0.0;
	elevation 	= 0.0;

	xLook 		= 0.0;
	yLook		= 0.0;
	zLook 	    = 0.0;

	setLookRadius(radius)
	{
		this.lookRadius = radius;
	}

	setLookPoint(x, y, z)
	{
		this.xLook = x;
		this.yLook = y;
		this.zLook = z;
	}

	setAngle(angle)
	{
		this.angle = angle;
	}

	setElevation(elevation)
	{
		this.elevation = elevation;
	}

	look()
	{
		//computes camera position
		this.z = this.lookRadius * Math.cos(utils.degToRad(-this.angle)) * Math.cos(utils.degToRad(this.elevation));
		this.x = this.lookRadius * Math.sin(utils.degToRad(-this.angle)) * Math.cos(utils.degToRad(this.elevation));
		this.y = this.lookRadius * Math.sin(utils.degToRad(this.elevation));

		//move camera towards the looking point
		this.x += this.xLook;
		this.y += this.yLook;
		this.z += this.zLook;

		viewMatrix = utils.MakeView(this.x, this.y, this.z, -this.elevation, this.angle);
		projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewMatrix);
	}
}