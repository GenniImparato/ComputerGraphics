class AutomaticBridge3D extends GroupObject3D
{
	constructor(triggDx, triggDy, triggDz, mesh, material)
	{ 
		super();

		//main object
		this.mainObj = new Object3D(mesh, material);
		this.addObject3D(this.mainObj);

		//animation
		this.animator = new LinearAnimator(this.mainObj);
		this.animator.addKeyFrame(0, -30, 0);
		this.animator.addKeyFrame(0, 0, 0);

		//trigger
		this.trigger = new TriggerBox3D(this.boundingBox.dx+triggDx, this.boundingBox.dy+triggDy, this.boundingBox.dz+triggDz, this);
		this.addObject3D(this.trigger);

		this.trigger.onTrigger = this.activate;
		this.trigger.onUntrigger = this.deactivate;
	}

	update()
	{
		this.animator.update();
	}

	activate(instance)
	{
		instance.animator.playAnimation();
	}

	deactivate(instance)
	{
		instance.animator.playReverseAnimation();
	}
}