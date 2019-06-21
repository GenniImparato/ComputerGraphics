const 	ghostMoveSpeed = 0.12;
var 	ghostCount = 0;

class Ghost3D_ extends GroupObject3D
{
	constructor(mesh, material, tongueMesh, tongueMaterial)
	{
		super(mesh, material);	

		this.damagedMaterial = ghostDamagedMaterial;
		this.standardMaterial = material;
		this.damagedTime = 0;

		this.addObject3D(new Object3D(tongueMesh, tongueMaterial));
		this.objects[0].boundingBoxes[0].setScaleCorrection(0, 0, 0);
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

		if(this.damagedTime > 20)
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
	constructor(mesh, material, tongueMesh, tongueMaterial)
	{
		super();

		this.enablePhysics(true);
		this.enableGravity(false);

		var mainObj = new Ghost3D_(mesh, material, tongueMesh, tongueMaterial);
		this.addObject3D(mainObj);

		//idle animation
		this.idleAnim = new Animator(mainObj);
		this.idleAnim.enablePositionAnimation(true);
		this.idleAnim.enableRotationAnimation(false);
		this.idleAnim.enableScaleAnimation(true);

		var idlePath = new BezierCurve();
		idlePath.addPoint(new KeyFrame(0, 0, 0, 0, 0, 0, 0.8, 0.8, 0.8));
		idlePath.addPoint(new KeyFrame(0, +2.5, 0, 0, 0, 0, 1.2, 1.2, 1.2));
		this.idleAnim.addAnimation(new Animation(idlePath, 150));

		//spawn animation
		this.spawnAnim = new Animator(mainObj, this);
		this.spawnAnim.enablePositionAnimation(false);
		this.spawnAnim.enableRotationAnimation(false);
		this.spawnAnim.enableScaleAnimation(true);

		var spawnPath = new BezierCurve();
		spawnPath.addPoint(new KeyFrame(0, 0, 0, 0, 0, 0, 0.1, 0.1, 0.1));
		spawnPath.addPoint(new KeyFrame(0, 0, 0, 0, 0, 0, 0.8, 0.8, 0.8));
		this.spawnAnim.addAnimation(new Animation(spawnPath, 100));

		this.currAnim = this.spawnAnim;
		this.spawnAnim.play(false);

		this.spawnAnim.onStop = function(inst)
			{
				inst.currAnim = inst.idleAnim;
				inst.idleAnim.play(true);
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

		this.setRotation(0, (180/Math.PI* Math.atan2(distZ, distX))-90, 0);

		if(dist<100	&& this.spawnAnim.playing == false)
			//follow player
			this.setSpeed(distX*ghostMoveSpeed, distY*ghostMoveSpeed, distZ*ghostMoveSpeed);
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
		ghostCount = 0;
		this.nextSpawnTime = Math.random()*800 + 200;
	}

	preUpdate()
	{
		this.currTime++;

		if(this.currTime >= this.nextSpawnTime		&&		ghostCount < 3)
		{
			this.currTime = 0;

			//spawn ghost
			var ghost = new Ghost3D(ghostMesh, ghostMaterial, ghostTongueMesh, ghostTongueMaterial);

			//random spawning angle with respect to player (in range of 90 degrees)
			var spawnAngle = player.roty;
			spawnAngle += (Math.random()-0.5)*90;

			//random spawn distance
			var spawDist = 20 + Math.random() * 30;

			ghost.setPosition(player.x - spawDist*Math.sin(utils.degToRad(-spawnAngle)),
								player.y + 5,
								player.z - spawDist*Math.cos(utils.degToRad(spawnAngle)));
			ghost.addToScene();

			//random time for next spawn
			this.nextSpawnTime = Math.random()*800 + 200;

			ghostCount++;
		}
	}
}