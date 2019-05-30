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
		var lightTypeLoc = this.shader.getUniformLocation('lightType');
		gl.uniform3iv(lightTypeLoc, new Int32Array([1,0,0]));
		var directionLoc = this.shader.getUniformLocation(this.name + 'Dir');
		var colorLoc = this.shader.getUniformLocation(this.name + 'Color');
		console.log("binding directionLoc " + directionLoc);
		gl.uniform4fv(colorLoc, new Float32Array([this.Rcolor, this.Gcolor, this.Bcolor, this.Acolor]));
		console.log("binding colorLoc " + colorLoc);
		
		gl.uniform3fv(directionLoc, new Float32Array([this.dirx, this.diry, this.dirz]));
	}

}

class PointLight extends Light {
	constructor(name, x, y, z, target, decay, shader) {
		super(name, x, y, z, shader);
		this.targetDistance = target;

	}

	bind() { // bind gl variables 
		var lightTypeLoc = this.shader.getUniformLocation('lightType');
		gl.uniform3iv(lightTypeLoc, new Int32Array([0,1,0]));
		var directionLoc = this.shader.getUniformLocation(this.name + 'Dir');
		var colorLoc = this.shader.getUniformLocation(this.name + 'Color');
		var targetLoc = this.shader.getUniformLocation(this.name + 'Target');
		var positionLoc = this.shader.getUniformLocation(this.name + 'Pos');
		var decayLoc = this.shader.getUniformLocation(this.name + 'Decay');
		gl.uniform4fv(colorLoc, new Float32Array([this.Rcolor, this.Gcolor, this.Bcolor, this.Acolor]));	
		gl.uniform3fv(directionLoc, new Float32Array([this.dirx, this.diry, this.dirz]));
		gl.uniform1f(targetLoc, this.targetDistance);
		gl.uniform1f(decayLoc, this.decay);
		gl.uniform3fv(positionLoc, new Float32Array([this.x, this.y, this.z]));
	}

}

class SpotLight extends Light {
	constructor(name, x, y, z, dirx, diry, dirz,  shader) {
		super(name, x,y,z, shader);
		this.dirx = dirx;
		this.diry = diry;
		this.dirz = dirz;
		this.targetDistance = 1;
		this.coneIn = 0.5;
		this.coneOut = 0.5;
	}

	setDecay(decay) {
		this.decay = decay;
	}

	setTarget(target) {
		this.targetDistance = target;
	}

	setCone(coneIn, coneOut ) {	
		this.coneIn = coneIn;
		this.coneOut = coneOut;
	}


	bind() { // bind gl variables 
		var lightTypeLoc = this.shader.getUniformLocation('lightType');
		gl.uniform3iv(lightTypeLoc, new Int32Array([0,1,0]));
		var directionLoc = this.shader.getUniformLocation(this.name + 'Dir');
		var colorLoc = this.shader.getUniformLocation(this.name + 'Color');
		var targetLoc = this.shader.getUniformLocation(this.name + 'Target');
		var positionLoc = this.shader.getUniformLocation(this.name + 'Pos');
		var coneInLoc = this.shader.getUniformLocation(this.name + 'ConeIn');
		var coneOutLoc = this.shader.getUniformLocation(this.name + 'ConeOut');
		var decayLoc = this.shader.getUniformLocation(this.name + 'Decay');
		gl.uniform4fv(colorLoc, new Float32Array([this.Rcolor, this.Gcolor, this.Bcolor, this.Acolor]));	
		gl.uniform3fv(directionLoc, new Float32Array([this.dirx, this.diry, this.dirz]));
		gl.uniform3fv(positionLoc, new Float32Array([this.x, this.y, this.z]));
		gl.uniform1f(targetLoc, new Float32(this.targetDistance));
		gl.uniform1f(coneInLoc, new Float32(this.coneIn));
		gl.uniform1f(coneOutLoc, new Float32(this.coneOut));
		gl.uniform1f(decayLoc, new Float32(this.decay));
		
	}

}

