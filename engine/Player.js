const standardMoveSpeed		= 0.2;
const sprintMoveSpeed		= 0.6;

class Player extends Object3D
{
	constructor(mesh, shader)
	{
		super(mesh, shader);
		this.changeBBColor = true;
		this.boundingBox.setColor([1, 1, 0, 1]);
		this.boundingBox.setScaleCorrection(1.1, 1.1, 1.1);
		this.enableGravity(true);

		this.moveSpeed = 0.4;
	}

	handleInput()
	{
		//sprint
		if(Input.isKeyDown(Input.SHIFT_KEY))
			this.moveSpeed = sprintMoveSpeed;
		else
			this.moveSpeed = standardMoveSpeed;

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
		else
			this.setSpeed(0, this.speedY, 0);

		//rotations
		if(Input.isKeyDown(Input.A_KEY))
			this.rotate(-2.0, 0, 0);
		else if(Input.isKeyDown(Input.D_KEY))
			this.rotate(2.0, 0, 0);

		//jump
		if(Input.isKeyClicked(Input.SPACE_KEY))
			this.setSpeed(this.speedX, 0.6, this.speedZ);
	}
}