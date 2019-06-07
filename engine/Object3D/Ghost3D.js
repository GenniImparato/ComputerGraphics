const ghostMoveSpeed = 0.12;

class Ghost3D extends GroupObject3D
{
	constructor(mesh, material)
	{
		super();

		this.enablePhysics(true);
		this.enableGravity(false);

		var mainObj = new Object3D(mesh, material);
		this.addObject3D(mainObj);

		this.animator = new LinearAnimator(mainObj);
		this.animator.enablePositionAnimation(true);
		this.animator.enableRotationAnimation(false);
		this.animator.enableScaleAnimation(true);

		this.animator.addKeyFrame(0, -2.5, 0, 0, 0, 0, 0.8, 0.8, 0.8);
		this.animator.addKeyFrame(0, +2.5, 0, 0, 0, 0, 1.2, 1.2, 1.2);
		this.animator.playAnimation(150, true);
	}

	preUpdate()
	{
		//distance from player
		var distX = player.x - this.x;
		var distY = player.y - this.y;
		var distZ = player.z - this.z;

		//normalize
		var distXZ = Math.sqrt(distX*distX + distZ*distZ);	
		distX = distX/distXZ;
		distZ = distZ/distXZ;

		if(distXZ<100 && distXZ>5)
		{
			//follow player
			this.setSpeed(distX*ghostMoveSpeed, 0, distZ*ghostMoveSpeed);
			this.setRotation((180/Math.PI* Math.atan2(distZ, distX))-90, 0, 0);
		}
		else
			this.setSpeed(0, 0, 0);


		this.animator.update();
	}
}