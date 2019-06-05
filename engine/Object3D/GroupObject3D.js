//Object with no mesh acting as a container
//all objects in the group are linked in hieararchy to the group
class GroupObject3D extends Object3D
{
	constructor()
	{
		super(null);

		this.objects = [];
		this.objectsCount = 0;
	}

	addObject3D(object)
	{
		this.objects[this.objectsCount] = object;
		this.objects[this.objectsCount].setParent(this);
		this.objectsCount++;
	}

	
	//override
	addToScene()
	{
		Scene.addObject3D(this);

		for(var i=0; i<this.objectsCount; i++)
			this.objects[i].addToScene();
	}
}