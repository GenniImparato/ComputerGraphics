class AutomaticBridge3D extends GroupObject3D
{
	constructor(triggDx, triggDy, triggDz, mesh, material)
	{ 
		super();

		//main object
		this.mainObj = new Object3D(mesh, material);
		this.addObject3D(this.mainObj);
		this.mainObj.setScale(1.5, 1.5, 1.5);

		//animation
		this.animator = new Animator(this.mainObj);

		var path = new BezierCurve();

		path.addPoint(new KeyFrame(0, -50, 0));
		path.addPoint(new KeyFrame(0, 0, 0));
  
		this.animator.addAnimation(new Animation(path, 60));
		this.animator.enablePositionAnimation(true);
		this.animator.enableScaleAnimation(false);

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
		instance.animator.play(false);
	}

	deactivate(instance)
	{
		instance.animator.playReverse(false);
	}
}