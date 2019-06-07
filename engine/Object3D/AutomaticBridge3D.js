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
		this.animator.addKeyFrame(0, -50, 0, 0, 0, 0, 1.6, 1.6, 1.6);
		this.animator.addKeyFrame(0, 0, 0, 0, 0, 0, 1.6, 1.6, 1.6);

		//trigger
		this.trigger = new TriggerBox3D(this.boundingBoxes[0].dx+triggDx, this.boundingBoxes[0].dy+triggDy, this.boundingBoxes[0].dz+triggDz, this);
		this.addObject3D(this.trigger);

		this.trigger.onTrigger = this.activate;
		this.trigger.onUntrigger = this.deactivate;
	}

	preUpdate()
	{
		this.animator.update();
	}

	activate(instance)
	{
		instance.animator.playAnimation(50, false);
	}

	deactivate(instance)
	{
		instance.animator.playReverseAnimation(50, false);
	}
}