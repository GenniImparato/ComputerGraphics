//trigger to create falling objects 
class GravityTrigger3D extends TriggerBox3D
{
	constructor(dimX, dimY, dimZ, instance)
	{
		super(dimX, dimY, dimZ, instance);
		this.objects = [];

		this.oneShot = true;
	}

	//registered objects are activated by the trigger
	registerObject3D(object)
	{
		object.setVisible(false);
		object.enablePhysics(false);
		object.enableGravity(false);
		this.objects.push(object);
	}

	onTrigger(inst)
	{
		for(var i=0; i<this.objects.length; i++)
		{
			this.objects[i].setVisible(true);
			this.objects[i].enablePhysics(true);
			this.objects[i].enableGravity(true);
		}
	}
}