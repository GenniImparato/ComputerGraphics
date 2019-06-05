const standardMoveSpeed		= 0.2;
const sprintMoveSpeed		= 0.6;

const idleGearRotSpeed		= 0.2;
const moveGearRotSpeed		= 1.5;
const sprintGearRotSpeed	= 3;

class Player extends Object3D
{
	constructor(mainMesh, gearMesh, material)
	{
		super(mainMesh, material);
		this.changeBBColor = true;
		this.boundingBoxes[0].setColor([255, 255, 0, 255]);
		this.boundingBoxes[0].setScaleCorrection(1.1, 1.1, 1.1);
		this.enableGravity(true);
		this.enablePhysics(true);
		this.setScale(2, 2, 2);

		//child Object3D in hierarchy
		var shiningMaterial = new SpecularMaterial( 20, 20, 20, 255);
		shiningMaterial.setSpecularShine(10);
		this.gear = new Object3D(gearMesh, shiningMaterial);
		this.gear.setParent(this);
		this.gear.setPosition(2, 1, 0);
		this.gear.setScale(2, 2, 2);
		this.gear.boundingBoxes[0].setScaleCorrection(0, 0, 0);

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
		/*if(Input.isKeyDown(Input.A_KEY))
			this.rotate(-2.0, 0, 0);
		else if(Input.isKeyDown(Input.D_KEY))
			this.rotate(2.0, 0, 0);*/

		this.rotate(Input.getMouseDiffX() * 0.2, 0, 0);

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
