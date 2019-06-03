var block;

class AutomaticBridge3D extends GroupObject3D
{
	constructor(mesh, material)
	{ 
		super();

		//main object
		this.addObject3D(new Object3D(mesh, material));

		//trigger
		this.trigger = new TriggerBox3D(this.boundingBox.dx+30, this.boundingBox.dy+30, this.boundingBox.dz+30);
		this.addObject3D(this.trigger);

		this.trigger.onTrigger = this.activate;
	}

	activate()
	{
		
	}
}