const standardMoveSpeed		= 0.2;
const sprintMoveSpeed		= 0.6;

const idleGearRotSpeed		= 0.2;
const moveGearRotSpeed		= 1.5;
const sprintGearRotSpeed	= 3;

class Player extends Object3D
{
	constructor(mainMesh, gearMesh, shader, material)
	{
		super(mainMesh, shader, material);
		this.changeBBColor = true;
		this.boundingBox.setColor([1, 1, 0, 1]);
		this.boundingBox.setScaleCorrection(1.1, 1.1, 1.1);
		this.enableGravity(true);
		this.setScale(2, 2, 2);

		//child Object3D in hierarchy
		this.gear = new Object3D(gearMesh, shader);
		this.gear.setParent(this);
		this.gear.setPosition(0, 1, 0);
		this.gear.setScale(2, 2, 2);
		this.gear.boundingBox.setScaleCorrection(0, 0, 0);

		this.moveSpeed = standardMoveSpeed;
		this.gearRotSpeed = idleGearRotSpeed;
	}

	handleInput()
	{
		//sprint
		if(Input.isKeyDown(Input.SHIFT_KEY))
		{
			this.moveSpeed = sprintMoveSpeed;
			this.gearRotSpeed = sprintGearRotSpeed;
		}
		else
		{
			this.moveSpeed = standardMoveSpeed;
			this.gearRotSpeed = moveGearRotSpeed;
		}

		//move in the forward direction
		if(Input.isKeyDown(Input.W_KEY))
		{
			this.setSpeed(-this.moveSpeed * Math.sin(utils.degToRad(-this.rotx)),
								this.speedY,
								-this.moveSpeed * Math.cos(utils.degToRad(this.rotx)));
			this.gear.rotate(-this.gearRotSpeed, 0, 0);
		}
		//move in the backward direction
		else if(Input.isKeyDown(Input.S_KEY))
		{
			this.setSpeed(this.moveSpeed * Math.sin(utils.degToRad(-this.rotx)),
								this.speedY,
								this.moveSpeed * Math.cos(utils.degToRad(this.rotx)));
			this.gear.rotate(this.gearRotSpeed, 0, 0);
		}
		else
		{
			this.setSpeed(0, this.speedY, 0);
			this.gear.rotate(idleGearRotSpeed, 0, 0);
		}

		//rotations
		if(Input.isKeyDown(Input.A_KEY))
			this.rotate(-2.0, 0, 0);
		else if(Input.isKeyDown(Input.D_KEY))
			this.rotate(2.0, 0, 0);

		//jump
		if(Input.isKeyClicked(Input.SPACE_KEY))
			this.setSpeed(this.speedX, 0.5, this.speedZ);
	}

	//override
	render()
	{
		this.gear.render();
		super.render();
	}
}