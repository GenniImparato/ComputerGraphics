class Object
{
	//reference to a loaded mesh
	mesh = null;
	//reference to a loaded shader
	shader = null;

	//position
	x = 0;
	y = 0;
	z = 0;

	//rotation
	rotx = 0;
	roty = 0;
	rotz = 0;

	//scale
	scale = 1.0;

	constructor(mesh, shader)
	{
		this.mesh = mesh;
		this.shader = shader;
	}

	setPosition(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	render()
	{
		this.mesh.render(this.shader, utils.MakeWorld(this.x, this.y, this.z, 
														this.rotx, this.roty, this.rotz, 
														this.scale));
	}

}