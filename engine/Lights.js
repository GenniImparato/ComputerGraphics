class Light {
	
	constructor(name, x, y, z, shader) {
		this.name = name;// prefix used in gl variables
		this.x = x;
		this.y = y;
		this.z = z;
		this.Rcolor = 1.0;
		this.Gcolor = 1.0;
		this.Bcolor = 1.0;
		this.Acolor = 1.0;
		this.shader = shader;
	}	

	setColor(red, green, blue, alpha) {
		this.Rcolor = red;
		this.Gcolor = green;
		this.Bcolor = blue;
		this.Acolor = alpha;
	}

	getLightColor4() {return [this.Rcolor, this.Gcolor, this.Bcolor, this.Acolor];}

	getLightColor3() {return [this.Rcolor, this.Gcolor, this.Bcolor];}

	bind() {  // Binds variables in gl program
		return;
	}

}

class DirectionalLight extends Light {
	constructor(name, dirx, diry, dirz, shader) {
		super(name, 0.0, 0.0, 0.0, shader);
		this.dirx = dirx;
		this.diry = diry;
		this.dirz = dirz; 
	}

	bind() { // bind gl variables 
		var directionLoc = this.shader.getUniformLocation(this.name + 'Dir');
		var colorLoc = this.shader.getUniformLocation(this.name + 'Color');
		console.log("binding directionLoc " + directionLoc);
		gl.uniform4fv(colorLoc, new Float32Array([this.Rcolor, this.Gcolor, this.Bcolor, this.Acolor]));
		console.log("binding colorLoc " + colorLoc);
		
		gl.uniform3fv(directionLoc, new Float32Array([this.dirx, this.diry, this.dirz]));
	}

}

class PointLight extends Light {
	constructor(name, x, y, z, target, shader) {
		super(name, x, y, z, shader);
		this.targetDistance = target;
	}

	bind() { // bind gl variables 
		var directionLoc = this.shader.getUniformLocation(this.name + 'Dir');
		var colorLoc = this.shader.getUniformLocation(this.name + 'Color');
		console.log("binding directionLoc " + directionLoc);
		gl.uniform4fv(colorLoc, new Float32Array([this.Rcolor, this.Gcolor, this.Bcolor, this.Acolor]));
		console.log("binding colorLoc " + colorLoc);
		
		gl.uniform3fv(directionLoc, new Float32Array([this.dirx, this.diry, this.dirz]));
	}

}

class SpotLight extends Light {
	constructor(name, x, y, z, dirx, diry, dirz, target, coneIn, coneOut , shader) {
		super(name, x,y,z, shader);
		this.dirx = dirx;
		this.diry = diry;
		this.dirz = dirz; 
		this.target = target;
		this.coneIn = coneIn;
		this.coneOut = coneOut;
	}

}

