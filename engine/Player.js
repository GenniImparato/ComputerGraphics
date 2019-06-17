const standardMoveSpeed		= 0.2;
const sprintMoveSpeed		= 0.6;

const projectileSpeed		= 1.2;

class Player extends GroupObject3D
{
	constructor(mainMesh, material, projectileMesh, projectileMaterial)
	{
		super(mainMesh, material);
		this.changeBBColor = true;
		this.boundingBoxes[0].setColor([255, 255, 0, 255]);
		this.boundingBoxes[0].setScaleCorrection(3.7, 6.5, 3.7);
		this.enableGravity(true);
		this.enablePhysics(true);
		this.setVisible(false);

		this.projectileMesh = projectileMesh;
		this.projectileMaterial = projectileMaterial;

		this.moveSpeed = standardMoveSpeed;
		
		this.energy = 1.0;
		this.hasKey = false;

		this.damagedTime = -1;

		//flashlight
		this.flashlight = new Object3D(flashlightMesh, flashlightTex);
		this.flashlight.setPosition(0, 4, 0.1);
		this.flashlight.setScale(0.25, 0.25, 0.25);
		this.flashlight.boundingBoxes[0].setScaleCorrection(0, 0, 0);
		this.addObject3D(this.flashlight);

	}

	handleInput()
	{
		//sprint
		if(Input.isKeyDown(Input.SHIFT_KEY) && this.energy > 0.1)
		{
			this.moveSpeed = sprintMoveSpeed;
			this.energy -= 0.015;
		}
		else if(Input.isKeyDown(Input.SHIFT_KEY) && this.energy > 0.0)
		{
			this.moveSpeed = standardMoveSpeed;
			this.energy -= 0.015;
		}
		else
		{
			this.moveSpeed = standardMoveSpeed;
			this.energy += 0.010;
			if(this.energy > 1.0)	
				this.energy = 1.0;
		}


		//move in the forward direction
		if(Input.isKeyDown(Input.W_KEY))
		{
			this.setSpeed(-this.moveSpeed * Math.sin(utils.degToRad(-this.roty)),
								this.speedY,
								-this.moveSpeed * Math.cos(utils.degToRad(this.roty)));
		}
		//move in the backward direction
		else if(Input.isKeyDown(Input.S_KEY))
		{
			this.setSpeed(this.moveSpeed * Math.sin(utils.degToRad(-this.roty)),
								this.speedY,
								this.moveSpeed * Math.cos(utils.degToRad(this.roty)));
		}
		//move left
		else if(Input.isKeyDown(Input.A_KEY))
		{
			this.setSpeed(this.moveSpeed * Math.sin(utils.degToRad(-this.roty-90)),
								this.speedY,
								this.moveSpeed * Math.cos(utils.degToRad(this.roty+90)));
		}
		//move right
		else if(Input.isKeyDown(Input.D_KEY))
		{
			this.setSpeed(-this.moveSpeed * Math.sin(utils.degToRad(-this.roty-90)),
								this.speedY,
								-this.moveSpeed * Math.cos(utils.degToRad(this.roty+90)));
		}		
		else
			this.setSpeed(0, this.speedY, 0);
		

		this.rotate(0, Input.getMouseDiffX() * 0.2, 0);

		//jump
		if(Input.isKeyClicked(Input.SPACE_KEY) && this.collisionYUp)
			this.setSpeed(this.speedX, 0.5, this.speedZ);
		this.collisionYUp = false;

		//fire
		if(Input.isMouseClicked())
		{
			var projectile = new Projectile3D(this.projectileMesh, this.projectileMaterial, 10);
			projectile.setPosition(this.x, this.y+5, this.z);
			projectile.setScale(2, 2, 2);
			projectile.setSpeed(-projectileSpeed * Math.sin(utils.degToRad(-this.roty)), 
							-projectileSpeed * Math.sin(utils.degToRad(firstPersonCamera.elevation)), 
							-projectileSpeed * Math.cos(utils.degToRad(this.roty)));
			projectile.enableCollisionWith(objects.slice(1, objects.length));
			Scene.addObject3D_(projectile);
		}
	}

	preUpdate()
	{
		super.preUpdate();
		
		if(this.damagedTime >= 30)
			this.damagedTime = -1;
		else if(this.damagedTime >= 0)
			this.damagedTime++;

		//regen health
		if(this.health <= 0)
			this.health = 0;
		else
			this.health += 0.0003;

		if(this.health > 1.0)
			this.health = 1.0;	
	}

	damage(val)
	{
		this.damagedTime = 0;

		this.health -= val;
		if(this.health < 0)
			this.health = 0;
	}
}
