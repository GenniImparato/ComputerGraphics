class Camera
{
	constructor() 
	{
		this.angle 		= 0.0;
		this.elevation 	= 0.0;
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
	}

}

class LookAtCamera extends Camera
{
	constructor() 
	{	
		super();

		this.lookRadius	= 10.0;

		this.xLook 		= 0.0;
		this.yLook		= 0.0;
		this.zLook 	    = 0.0;
	}
	
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

	handleInput()
	{
		this.elevation += Input.getMouseDiffY() * 0.2;
		this.lookRadius -= Input.getMouseWheelDiff() * 0.6;
	}

	look()
	{
		if(!endCredits)
			this.handleInput();

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

		player.flashlight.setRotation(-this.elevation, 0, 0);
	}
}

class FirstPersonCamera  extends Camera
{
	constructor() 
	{	
		super();

		this.angle 		= 0.0;
		this.elevation 	= 0;

		this.x		= 0.0;
		this.y		= 0.0;
		this.z 	    = 0.0;
	}

	setPosition(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}
	
	setAngle(angle)
	{
		this.angle = angle;
	}

	setElevation(elevation)
	{
		if(elevation < 90) {
			if(elevation > -90)
		   		this.elevation = elevation;		
		   	else 
		   		this.elevation = -90;
		} else {
			this.elevation = 90;
		}
	}

	handleInput()
	{
		this.setElevation(this.elevation + Input.getMouseDiffY() * 0.2);
	}

	


	look()
	{
		this.handleInput();


		viewMatrix = utils.MakeView(this.x, this.y, this.z, -this.elevation, this.angle);
		projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewMatrix);

		player.flashlight.setRotation(-this.elevation, 0, 0);
	}
}
