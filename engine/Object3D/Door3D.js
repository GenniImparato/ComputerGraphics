class Door3D extends GroupObject3D
{
	constructor(mesh, material, automatic, openFromRight)
	{ 
		super();

		var doorPar = new GroupObject3D(null, material);
		
		//door object
		var door = new Object3D(mesh, material);
		door.setParent(doorPar);

		if(!openFromRight)
			door.setPosition(-door.boundingBoxes[0].dx/2, 0, 0);
		else
			door.setPosition(door.boundingBoxes[0].dx/2, 0, 0);

		doorPar.addObject3D(door);
		this.addObject3D(doorPar);

		if(automatic)
		{
			//triggers
			this.frontTrigger = new TriggerBox3D(door.boundingBoxes[0].dx*3, door.boundingBoxes[0].dy, door.boundingBoxes[0].dx*2, this);
			this.frontTrigger.setPosition(-door.boundingBoxes[0].dx/2, door.boundingBoxes[0].dy/2, door.boundingBoxes[0].dx);
			this.frontTrigger.boundingBoxes[0].setScaleCorrection(1.1, 1.1, 1.1);
			this.addObject3D(this.frontTrigger);

			this.backTrigger = new TriggerBox3D(door.boundingBoxes[0].dx*3, door.boundingBoxes[0].dy, door.boundingBoxes[0].dx*2, this);
			this.backTrigger.setPosition(-door.boundingBoxes[0].dx/2, door.boundingBoxes[0].dy/2, -door.boundingBoxes[0].dx);
			this.backTrigger.boundingBoxes[0].setScaleCorrection(1.1, 1.1, 1.1);
			this.addObject3D(this.backTrigger);

			this.frontTrigger.onTrigger = function(inst)	
			{	inst.open();	}
		
			this.frontTrigger.onUntrigger = function(inst)	
			{	inst.close();	}

			this.backTrigger.onTrigger = function(inst)
			{	inst.open();	}
		
			this.backTrigger.onUntrigger = function(inst)
			{	inst.close();	}
		}
		
		this.animator = new Animator(doorPar);
		var doorPath = new BezierCurve();

		doorPath.addPoint(new KeyFrame(0, 0, 0, 0, 0, 0));

		if(!openFromRight)
			doorPath.addPoint(new KeyFrame(0, 0, 0, 0, -90, 0));
		else
			doorPath.addPoint(new KeyFrame(0, 0, 0, 0, 90, 0));
  
		this.animator.addAnimation(new Animation(doorPath, 50));
		this.animator.enablePositionAnimation(false);
		this.animator.enableScaleAnimation(false);

	}

	preUpdate()
	{
		this.animator.update();
	}

	open()
	{
		this.animator.play(false);
	}

	close()
	{
		this.animator.playReverse(false);
	}
}

class DoorKey3D extends GroupObject3D
{
	constructor(mesh, material, keyHoleMesh, keyMesh, keyHoleMaterial, linkedDoor, openFromRight)
	{ 
		super();

		var doorPar = new GroupObject3D(null, material);
		
		//door object
		var door = new Object3D(mesh, material);
		door.setParent(doorPar);

		if(!openFromRight)
			door.setPosition(-door.boundingBoxes[0].dx/2, 0, 0);
		else
			door.setPosition(door.boundingBoxes[0].dx/2, 0, 0);

		doorPar.addObject3D(door);

		//keyhole object
		var keyhole = new Object3D(keyHoleMesh, keyHoleMaterial);
		keyhole.setScale(5, 5, 5);
		keyhole.boundingBoxes[0].setScaleCorrection(0, 0, 0);
		if(!openFromRight)
			keyhole.setPosition(-door.boundingBoxes[0].dx + keyhole.boundingBoxes[0].dx + 0.5, 
							door.boundingBoxes[0].dy/2 - keyhole.boundingBoxes[0].dy/2 - 0.5, 
							door.boundingBoxes[0].dz/2);
		else
			keyhole.setPosition(door.boundingBoxes[0].dx - keyhole.boundingBoxes[0].dx - 0.5, 
							door.boundingBoxes[0].dy/2 - keyhole.boundingBoxes[0].dy/2  - 0.5, 
							door.boundingBoxes[0].dz/2);
		
		doorPar.addObject3D(keyhole);

		//key object
		this.key = new Object3D(keyMesh, keyHoleMaterial);
		this.key.setScale(5, 5, 5);
		this.key.setPosition(keyhole.x, 
						keyhole.y, 
						keyhole.z+2);
		this.key.setRotation(-90, 0, 0);
		this.key.setVisible(false);
		this.key.boundingBoxes[0].setScaleCorrection(0, 0, 0);

		//key animator
		this.keyAnim = new Animator(this.key, this);
		this.keyAnim.enablePositionAnimation(true);
		this.keyAnim.enableRotationAnimation(true);
		this.keyAnim.enableScaleAnimation(false);

		// movement
		var tempPath = new BezierCurve();
		tempPath.addPoint(new KeyFrame(keyhole.x, keyhole.y, keyhole.z+2.5, 0, 0, 0));
		tempPath.addPoint(new KeyFrame(keyhole.x, keyhole.y, keyhole.z+0.5, 0, 0, 0));
		this.keyAnim.addAnimation(new Animation(tempPath, 40));
		
		//rotation
		tempPath = new BezierCurve();
		tempPath.addPoint(new KeyFrame(keyhole.x, keyhole.y, keyhole.z+0.5, 0, 0, 0));
		tempPath.addPoint(new KeyFrame(keyhole.x, keyhole.y, keyhole.z+0.5, 0, 0, 90));
		this.keyAnim.addAnimation(new Animation(tempPath, 40));

		//rotation back
		tempPath = new BezierCurve();
		tempPath.addPoint(new KeyFrame(keyhole.x, keyhole.y, keyhole.z+0.5, 0, 0, 90));
		tempPath.addPoint(new KeyFrame(keyhole.x, keyhole.y, keyhole.z+0.5, 0, 0, 0));
		this.keyAnim.addAnimation(new Animation(tempPath, 40));


		//open door after key animation
		this.keyAnim.onStop = function(inst) {inst.open();	if(linkedDoor)linkedDoor.open();};
		
		doorPar.addObject3D(this.key);

		this.addObject3D(doorPar);

		//triggers
		this.frontTrigger = new TriggerBox3D(door.boundingBoxes[0].dx*3, door.boundingBoxes[0].dy, door.boundingBoxes[0].dx*2, this);
		this.frontTrigger.setPosition(-door.boundingBoxes[0].dx/2, door.boundingBoxes[0].dy/2, door.boundingBoxes[0].dx);
		this.frontTrigger.boundingBoxes[0].setScaleCorrection(1.1, 1.1, 1.1);
		this.addObject3D(this.frontTrigger);

		this.animator = new Animator(doorPar);
		var doorPath = new BezierCurve();

		doorPath.addPoint(new KeyFrame(0, 0, 0, 0, 0, 0));

		if(!openFromRight)
			doorPath.addPoint(new KeyFrame(0, 0, 0, 0, -90, 0));
		else
			doorPath.addPoint(new KeyFrame(0, 0, 0, 0, 90, 0));
  
		this.animator.addAnimation(new Animation(doorPath, 50));
		this.animator.enablePositionAnimation(false);
		this.animator.enableScaleAnimation(false);

		this.frontTrigger.onTrigger = function(inst)	
		{	
			//plays key animation
			if(player.hasKey)
			{
				inst.key.setVisible(true);
				inst.keyAnim.play(false);	
				player.hasKey = false;
				inst.frontTrigger.removeFromScene();
			}
			
		}
	}

	preUpdate()
	{
		this.animator.update();
		this.keyAnim.update();
	}

	open()
	{
		this.animator.play(false);
	}

	close()
	{
		this.animator.playReverse(false);
	}
}