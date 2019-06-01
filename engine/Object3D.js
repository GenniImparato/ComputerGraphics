class Object3D
{
	constructor(mesh, shader)
	{
		//reference to a loaded mesh
		this.mesh = mesh;
		//reference to a loaded shader
		this.shader = shader;

		//position
		this.x = 0;
		this.y = 0;
		this.z = 0;

		//rotation
		this.rotx = 0;
		this.roty = 0;
		this.rotz = 0;

		//scale
		this.scaleX = 1.0;
		this.scaleY = 1.0;
		this.scaleZ = 1.0;

		//speed
		this.speedX = 0;
		this.speedY = 0;
		this.speedZ = 0;

		//boolean flags
		this.enGravity			= false;
		this.visible			= true;
		this.changeBBColor		= false; //must be only active on one objects

		//Object3D list
		this.collisionObjects = [];

	

		//bounding box coordinates
		var minX = mesh.positions[0];
		var maxX = mesh.positions[0];
		var minY = mesh.positions[1];
		var maxY = mesh.positions[1];
		var minZ = mesh.positions[2];
		var maxZ = mesh.positions[2];
		//computes bounding box coords
		for(var i=0; i<mesh.positions.length; i+=3)
		{
			if(mesh.positions[i]<minX)
				minX = mesh.positions[i];
			if(mesh.positions[i]>maxX)
				maxX = mesh.positions[i];

			if(mesh.positions[i+1]<minY)
				minY = mesh.positions[i+1];
			if(mesh.positions[i+1]>maxY)
				maxY = mesh.positions[i+1];

			if(mesh.positions[i+2]<minZ)
				minZ = mesh.positions[i+2];
			if(mesh.positions[i+2]>maxZ)
				maxZ = mesh.positions[i+2];
		}
		//computes center of the mesh (in case it's not the origin)
		var cX = (maxX-minX)/2.0 + minX;
		var cY = (maxY-minY)/2.0 + minY;
		var cZ = (maxZ-minZ)/2.0 + minZ;

		this.boundingBox = new BoundingBox(cX, cY, cZ, 
											minX, maxX, minY, maxY, minZ, maxZ);
		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

	////
	////		SETTERS/GETTERS
	////____________________________

	setPosition(x, y, z)
	{
		this.x = x;		this.y = y;		this.z = z;
		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

	move(x, y, z)
	{
		this.x += x;	this.y += y;	this.z += z;
		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

	setRotation(x, y, z)
	{
		this.rotx = x;	this.roty = y;	this.rotz = z;
	}

	rotate(x, y, z)
	{
		this.rotx += x;	this.roty += y;	this.rotz += z;
	}

	setScale(x, y, z)
	{
		this.scaleX = x; this.scaleY = y; this.scaleZ = z;
		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

	setSpeed(x, y, z)
	{
		this.speedX = x;	this.speedY = y;	this.speedZ = z;
	}

	enableGravity(boolean)
	{
		this.enGravity = boolean;
	}

	setVisible(boolean)
	{
		this.visible = boolean;
	}

	///______________________________

	render()
	{
		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
		
		//renders bounding box
		if(showBoundingBoxes)
			this.boundingBox.render();

		//doesn't render invisible objects
		if(this.visible)
		{
			//renders object
			var worldMatrix = utils.MakeWorld_(this.x, this.y, this.z, 
										this.rotx, this.roty, this.rotz, 
										this.scaleX, this.scaleY, this.scaleZ);
				
			this.mesh.render(this.shader, worldMatrix);
		}
	}

	////
	////		COLLISIONS AND PHYSICS
	////____________________________

	//boolean collision check
	checkCollision(object)
	{
		return this.boundingBox.checkCollision(object.boundingBox);
	}

	enableCollisionWith(objects)
	{
		this.collisionObjects = objects;
	}

	//must be called in render func
	solveCollisions()
	{
		for(var i=0; i<this.collisionObjects.length; i++)
		{
			//doens't collide with itself
			if(this.collisionObjects[i] != this)
			{
				if(this.changeBBColor)
						this.collisionObjects[i].boundingBox.setColor(this.collisionObjects[i].boundingBox.nonCollidedColor);	

				if(this.checkCollision(this.collisionObjects[i]))
				{
					this.solveCollision(this.collisionObjects[i]);

					if(this.changeBBColor)
					this.collisionObjects[i].boundingBox.setColor(this.collisionObjects[i].boundingBox.collidedColor);				
				}	
			}
		}
	}


	//solve the collision for this object using the handler of the collided object
	solveCollision(object)
	{
		object.collisionHandler(this);
	}

	//defines the reponse of this object when another objects collides with it
	//can be override
	//default acts as a rigid body that stops colliding objects
	collisionHandler(object)
	{
		object.penetrationZ = 0;

		//collision from y++
		if(object.boundingBox.maxY >= this.boundingBox.maxY	&& 	object.boundingBox.minY <= this.boundingBox.maxY	&& object.speedY<0)
		{
			object.collisionY = true;
			object.penetrationY = this.boundingBox.maxY - object.boundingBox.minY;
		}
		else
		{
			//collision from x++
			if(object.boundingBox.maxX >= this.boundingBox.maxX	&& 	object.boundingBox.minX <= this.boundingBox.maxX	&&	object.speedX<0) 
				object.collisionX = true;
			//collision from x--
			if(object.boundingBox.maxX >= this.boundingBox.minX	&& 	object.boundingBox.minX <= this.boundingBox.minX	&&	object.speedX>0)
				object.collisionX = true;

			//collision from z++
			if(object.boundingBox.maxZ >= this.boundingBox.maxZ	&& 	object.boundingBox.minZ <= this.boundingBox.maxZ	&&	object.speedZ<0)
				object.collisionZ = true;

			//collision from z--
			if(object.boundingBox.maxZ >= this.boundingBox.minZ	&& 	object.boundingBox.minZ <= this.boundingBox.minZ	&&	object.speedZ>0) 
				object.collisionZ = true;
		}
		

			//collision from y--
			if(object.boundingBox.maxY >= this.boundingBox.minY	&& 	object.boundingBox.minY <= this.boundingBox.minY 	&& object.speedY>0) 
				object.collisionY = true;
	}

	//to override
	update()	
	{
	}

	//update physics
	updatePhysics()
	{
		this.update();
		
		//gravity
		if(this.enGravity)
		{
			this.speedY += gravityAccelY;
		}
		
		//collisions
		if(this.collisionX)
			this.speedX = 0;
		if(this.collisionY)
		{
			this.speedY = 0;
			this.y += this.penetrationY;
		}
		if(this.collisionZ)
			this.speedZ = 0;

		this.collisionX = false;
		this.collisionY = false;
		this.collisionZ = false;

		//update position
		this.x += this.speedX;
		this.y += this.speedY;
		this.z += this.speedZ;

		this.boundingBox.update(this.x, this.y, this.z, 
								this.scaleX, this.scaleY, this.scaleZ);
	}

}

