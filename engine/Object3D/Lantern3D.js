class Lantern3D extends GroupObject3D
{
	constructor(mesh, material, light)
	{
		super();

		var mainObj = new Object3D(mesh, material);
		mainObj.setScale(2, 2, 2);
		this.addObject3D(mainObj);
		this.linkLight(light);

		this.animator = new BezierAnimator(mainObj);
		this.animator.enablePositionAnimation(true);
		this.animator.enableRotationAnimation(false);
		this.animator.enableScaleAnimation(false);
		this.animator.addKeyFrame(+10, 0, 0, 0, 0, 0);
		this.animator.addKeyFrame(0, 0, +10, 0 , 50, 0);
		this.animator.addKeyFrame(-10, 0, 0, 0 , 0 , 0);
		this.animator.playAnimation(500, true);
	}

	linkLight(light)
	{
		this.linkedLight = light;
	}

	collisionHandler(object)
	{
		
	}


	preUpdate()
	{
		var worldPos = this.objects[0].getWorldPosition();
		this.linkedLight.setPosition(worldPos[0], worldPos[1], worldPos[2]);
		this.animator.update();
	}
}