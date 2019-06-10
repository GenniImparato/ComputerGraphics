class DestroyableObject3D extends Object3D
{
	constructor(mesh, material, damagedMaterial)
	{
		super(mesh, material);	

		this.damagedMaterial = damagedMaterial;
		this.standardMaterial = material;
		this.damagedTime = 0;
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
		if(this.health <= 0)
		{
			this.removeFromScene();
		}
	}
}