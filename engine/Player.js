const standardMoveSpeed		= 0.2;
const sprintMoveSpeed		= 0.6;

class Player extends GroupObject3D
{
	constructor(mainMesh, material)
	{
		super(mainMesh, material);
		this.changeBBColor = true;
		this.boundingBoxes[0].setColor([255, 255, 0, 255]);
		this.boundingBoxes[0].setScaleCorrection(1.1, 1.1, 1.1);
		this.enableGravity(true);
		this.enablePhysics(true);
		this.setScale(2, 2, 2);

		this.moveSpeed = standardMoveSpeed;
		this.health = 1.0;
		this.energy = 1.0;
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
			this.setSpeed(-this.moveSpeed * Math.sin(utils.degToRad(-this.rotx)),
								this.speedY,
								-this.moveSpeed * Math.cos(utils.degToRad(this.rotx)));
		}
		//move in the backward direction
		else if(Input.isKeyDown(Input.S_KEY))
		{
			this.setSpeed(this.moveSpeed * Math.sin(utils.degToRad(-this.rotx)),
								this.speedY,
								this.moveSpeed * Math.cos(utils.degToRad(this.rotx)));
		}
		//move left
		else if(Input.isKeyDown(Input.A_KEY))
		{
			this.setSpeed(this.moveSpeed * Math.sin(utils.degToRad(-this.rotx-90)),
								this.speedY,
								this.moveSpeed * Math.cos(utils.degToRad(this.rotx+90)));
		}
		//move right
		else if(Input.isKeyDown(Input.D_KEY))
		{
			this.setSpeed(-this.moveSpeed * Math.sin(utils.degToRad(-this.rotx-90)),
								this.speedY,
								-this.moveSpeed * Math.cos(utils.degToRad(this.rotx+90)));
		}		
		else
			this.setSpeed(0, this.speedY, 0);

		

		this.rotate(Input.getMouseDiffX() * 0.2, 0, 0);

		//jump
		if(Input.isKeyClicked(Input.SPACE_KEY))
			this.setSpeed(this.speedX, 0.5, this.speedZ);
	}

	preUpdate()
	{
	}
}
