class Lantern3D extends GroupObject3D
{
	constructor(mesh, interiorMesh, material, light)
	{
		super();
		
		var mainObj = new Object3D(mesh, material);
		mainObj.setScale(2, 2, 2);
		this.addObject3D(mainObj);
		this.linkLight(light);

		this.addObject3D(new Object3D(interiorMesh, new SimpleMaterial(light.Rcolor*255, light.Gcolor*255, light.Bcolor*255, 255)));

		this.animator = new Animator(mainObj);
		this.animator.enablePositionAnimation(true);
		this.animator.enableRotationAnimation(false);
		this.animator.enableScaleAnimation(false);

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
		this.objects[1].setParent(this.objects[0]);

		var worldPos = this.objects[0].getWorldPosition();
		this.linkedLight.setPosition(worldPos[0], worldPos[1], worldPos[2]);
		if(this.animator.duration > 0)
			this.animator.update();
	}
}