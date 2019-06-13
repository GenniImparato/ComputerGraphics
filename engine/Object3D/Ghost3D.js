const 	ghostMoveSpeed = 0.12;
var		ghostCount	= 0;

class Ghost3D_ extends Object3D
{
	constructor(mesh, material)
	{
		super(mesh, material);	

		this.damagedMaterial = new DiffuseMaterial(255, 0, 0, 200);
		this.standardMaterial = material;
		this.damagedTime = 0;
	}

	collisionHandler(object)
	{
		object.colliding = true;

		if(object == player)
		{
			object.damage(0.4);
			this.health = 0;
		}
	}

	preUpdate()
	{
		this.damagedTime++;

		if(this.damagedTime > 15)
		{
			this.setMaterial(this.standardMaterial);
		}
	}

	damage(val)
	{
		this.setMaterial(this.damagedMaterial);
		this.damagedTime = 0;

		this.health -= val;
		if(this.health < 0)
			this.health = 0;
	}
}


class Ghost3D extends GroupObject3D
{
	constructor(mesh, material)
	{
		super();

		this.enablePhysics(true);
		this.enableGravity(false);

		var mainObj = new Ghost3D_(mesh, material);
		this.addObject3D(mainObj);

		//idle animation
		this.idleAnim = new LinearAnimator(mainObj);
		this.idleAnim.enablePositionAnimation(true);
		this.idleAnim.enableRotationAnimation(false);
		this.idleAnim.enableScaleAnimation(true);

		this.idleAnim.addKeyFrame(0, 0, 0, 0, 0, 0, 0.8, 0.8, 0.8);
		this.idleAnim.addKeyFrame(0, +2.5, 0, 0, 0, 0, 1.2, 1.2, 1.2);

		//spawn animation
		this.spawnAnim = new LinearAnimator(mainObj, this);
		this.spawnAnim.enablePositionAnimation(false);
		this.spawnAnim.enableRotationAnimation(false);
		this.spawnAnim.enableScaleAnimation(true);

		this.spawnAnim.addKeyFrame(0, 0, 0, 0, 0, 0, 0, 0, 0);
		this.spawnAnim.addKeyFrame(0, 0, 0, 0, 0, 0, 0.8, 0.8, 0.8);

		this.currAnim = this.spawnAnim;
		this.spawnAnim.playAnimation(100, false);

		this.spawnAnim.onStop = function(inst)
			{
				inst.currAnim = inst.idleAnim;
				inst.idleAnim.playAnimation(150, true);
			};
	}

	preUpdate()
	{
		//distance from player
		var distX = player.x - this.x;
		var distY = player.y - this.y;
		var distZ = player.z - this.z;

		//normalize
		var dist = Math.sqrt(distX*distX + distZ*distZ + distY*distY);	
		distX = distX/dist;
		distZ = distZ/dist;
		distY = distY/dist;

		if(dist<100	&& this.spawnAnim.playing == false)
		{
			//follow player
			this.setSpeed(distX*ghostMoveSpeed, distY*ghostMoveSpeed, distZ*ghostMoveSpeed);
			this.setRotation((180/Math.PI* Math.atan2(distZ, distX))-90, 0, 0);
		}
		else
			this.setSpeed(0, 0, 0);


		this.currAnim.update();

		if(this.objects[0].health == 0)
		{
			this.removeFromScene();
			ghostCount--;
		}
	}

}

class GhostSpawner3D extends Object3D
{
	constructor()
	{
		super();
		this.currTime = 0;
		this.ghostCount = 0;
	}

	preUpdate()
	{
		this.currTime++;

		if(this.currTime >= 500		&&		ghostCount < 3)
		{
			this.currTime = 0;

			//spawn ghost
			var ghost = new Ghost3D(ghostMesh, ghostMaterial);

			//random spawning angle with respect to player (in range of 180 degrees)
			var spawnAngle = player.rotx;
			spawnAngle += (Math.random()-0.5)*180;

			//random spawn distance
			var spawDist = 20 + Math.random() * 30;

			ghost.setPosition(player.x - spawDist*Math.sin(utils.degToRad(-spawnAngle)),
								player.y + 5,
								player.z - spawDist*Math.cos(utils.degToRad(spawnAngle)));
			ghost.addToScene();

			ghostCount++;
		}
	}
}