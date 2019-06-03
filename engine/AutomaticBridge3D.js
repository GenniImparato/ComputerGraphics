var block;

class AutomaticBridge3D extends GroupObject3D
{
	constructor(blokcsCount, length, material)
	{ 
		super();

		for(var i=0; i<3; i++)
		{
			block = new Box3D(12, 18, 15, material);
			block.setPosition(0, -10, i*20);
			this.addObject3D(block);
		}

		var trigger1 = new TriggerBox3D(20, 10, 20);
		trigger1.setPosition(0, 0, -20);
		this.addObject3D(trigger1);

		trigger1.onTrigger = this.activate;
	}

	activate()
	{
		block.enableGravity(true);
	}
}